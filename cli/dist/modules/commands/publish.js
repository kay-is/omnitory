import fs from "fs";
import childProcess from "child_process";
import fetch from "node-fetch";
import { rimrafSync } from "rimraf";
import { getAddress, getArweaveGatewayUrl, getOmnitoryApiUrl, getIrysGatewayUrl, getKeyPath, } from "../config.js";
import { namespace } from "../services/namespace.js";
import { getIrys } from "../services/irys.js";
import { getTarballShasum } from "../utilities.js";
const OMNITORY_DIRECTORY = ".omnitory";
export const publish = async () => {
    console.info("Publishing to ꙮmnitory...");
    console.info(`Key location: ${await getKeyPath()}\n  Address: ${await getAddress()}`);
    console.info("NPM project location:", process.cwd());
    console.info("Checking if address is registered in ꙮmnitory...");
    const isKeyRegistered = await namespace.addressIsRegistered(await getAddress());
    if (!isKeyRegistered) {
        console.error("Address not registered in ꙮmnitory!");
        console.error("Check your key or go to https://omnitory.org to register!");
        process.exit(1);
    }
    const packageJson = JSON.parse(fs.readFileSync("package.json", { encoding: "utf-8" }));
    console.info("Package name:", packageJson.name);
    console.info("Package version:", packageJson.version);
    console.info("Checking ꙮmnitory for existing versions...");
    const packageDomain = await namespace.resolve(packageJson.name);
    if (packageDomain) {
        console.info("Existing version found!");
        const arweaveAddress = await getAddress();
        if (packageDomain.owner !== arweaveAddress) {
            console.error("Previous version published by a different package owner: " +
                packageDomain.owner);
            console.error("Check your key!");
            process.exit(1);
        }
        const response = await fetch(getArweaveGatewayUrl() + packageDomain.tx_id);
        const existingMetadata = await response.json();
        const versionAlreadyPublished = Object.keys(existingMetadata.versions).includes(packageJson.version);
        if (versionAlreadyPublished) {
            console.error("Package version already published: " + packageJson.version);
            console.error("Change version in " + process.cwd() + "/package.json");
            process.exit(1);
        }
    }
    rimrafSync(OMNITORY_DIRECTORY);
    fs.mkdirSync(OMNITORY_DIRECTORY);
    console.info("Creating new archive version...");
    childProcess.execSync("npm pack --pack-destination " + OMNITORY_DIRECTORY);
    console.info("Uploading archive to Arweave...");
    const tarballFilePath = `${OMNITORY_DIRECTORY}/${packageJson.name}-${packageJson.version}.tgz`;
    const tarballUploadResult = await getIrys().uploadFile(tarballFilePath);
    const newPackageVersion = {
        ...packageJson,
        id: tarballUploadResult.id,
        npmVersion: packageJson.engines?.npm || "",
        nodeVersion: packageJson.engines?.node || "",
        maintainers: [packageJson.author || ""],
        dist: {
            shasum: await getTarballShasum(tarballFilePath),
            tarball: getArweaveGatewayUrl() + tarballUploadResult.id,
        },
    };
    let metadata;
    if (!packageDomain) {
        console.info("Creating new metadata from scratch...");
        const created = new Date().toISOString();
        metadata = {
            name: packageJson.name,
            license: packageJson.license || "",
            "dist-tags": {
                latest: packageJson.version,
            },
            maintainers: [packageJson.author || ""],
            time: {
                created,
                modified: created,
                [packageJson.version]: created,
            },
            versions: {
                [packageJson.version]: newPackageVersion,
            },
        };
    }
    else {
        console.info("Adding new version to existing metadata...");
        const response = await fetch(getIrysGatewayUrl() + packageDomain.tx_id);
        const previousMetadata = (await response.json());
        const modified = new Date(tarballUploadResult.timestamp).toISOString();
        metadata = {
            ...previousMetadata,
            license: packageJson.license || previousMetadata.license || "",
            "dist-tags": {
                latest: packageJson.version,
            },
            maintainers: [packageJson.author || ""],
            time: {
                ...previousMetadata.time,
                modified,
                [packageJson.version]: modified,
            },
            versions: {
                ...previousMetadata.versions,
                [newPackageVersion.version]: newPackageVersion,
            },
        };
    }
    const metadataTags = [
        { name: "Data-Protocol", value: "Omnitory-Test" },
        { name: "Package-Manager", value: "npm" },
        { name: "Package-Name", value: packageJson.name },
        { name: "Package-Version", value: packageJson.version },
        { name: "Package-Creator", value: await getAddress() },
        { name: "Package-Archive", value: tarballUploadResult.id },
    ];
    console.info("New version tags:\n" +
        metadataTags.map(({ name, value }) => `  ${name}: ${value}`).join("\n"));
    console.info("Uploading metadata to Arweave...");
    const metadataString = JSON.stringify(metadata);
    const metadataUploadResult = await getIrys().upload(metadataString, {
        tags: [
            ...metadataTags,
            { name: "Content-Type", value: "application/json" },
        ],
    });
    if (!packageDomain) {
        console.info("Creating new package in ꙮmnitory...");
        await namespace.mint(packageJson.name, metadataUploadResult.id);
    }
    else {
        console.info("Updating existing package in ꙮmnitory...");
        await namespace.update(packageJson.name, metadataUploadResult.id);
    }
    fs.writeFileSync(`${OMNITORY_DIRECTORY}/${packageJson.name}-${packageJson.version}-${metadataUploadResult.id}.json`, metadataString);
    console.info("ꙮmnitory URL: " + getOmnitoryApiUrl() + "npm/" + packageJson.name);
    console.info("Arweave URL: " + getArweaveGatewayUrl() + metadataUploadResult.id);
};
