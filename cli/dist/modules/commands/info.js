import { readFileSync } from "fs";
import { getAddress, getKeyPath } from "../config.js";
export const info = async () => {
    const packageJson = JSON.parse(readFileSync(process.cwd() + "/package.json", { encoding: "utf-8" }));
    console.info("Active project:");
    console.info("  Name    : " + packageJson.name);
    console.info("  Version : " + packageJson.version);
    console.info("  Location: " + process.cwd());
    console.info("\nActive key:");
    console.info("  Location: " + (await getKeyPath()));
    console.info("  Address : " + (await getAddress()));
};
