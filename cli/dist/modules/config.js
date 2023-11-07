import fs from "fs";
import { join } from "path";
import { jwkToAddress } from "./utilities.js";
const config = JSON.parse(fs.readFileSync(join(process.cwd(), "omni.json"), {
    encoding: "utf-8",
}));
export const getOmnitoryApiUrl = () => config.omnitoryApiUrl;
export const getIrysGatewayUrl = () => config.irysGatewayUrl;
export const getArweaveGatewayUrl = () => config.arweaveGatewayUrl;
export const getKeyPath = () => join(process.cwd(), config.key.path);
export const getKey = async () => {
    const key = fs.readFileSync(getKeyPath(), { encoding: "utf-8" });
    return JSON.parse(key);
};
export const getAddress = async () => {
    const key = await getKey();
    return await jwkToAddress(key);
};
