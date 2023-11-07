import Irys from "@irys/sdk";
import { getIrysGatewayUrl, getKey } from "../config.js";
const irys = new Irys({
    url: getIrysGatewayUrl(),
    token: "arweave",
    key: await getKey(),
});
export const getIrys = () => irys;
