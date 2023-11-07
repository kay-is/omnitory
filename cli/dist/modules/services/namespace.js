import { readState, writeContract } from "./mem.js";
const resolve = async (domain) => {
    const state = await readState();
    return state.domains.find((d) => d.domain === domain);
};
const addressIsRegistered = async (address) => {
    const state = await readState();
    const found = state.allow_list.findIndex((a) => a === address);
    return state.admin_address === address || found !== -1;
};
const mint = async (domain, tx_id) => {
    return await writeContract({ function: "mint", domain, tx_id });
};
const update = async (domain, tx_id) => {
    return await writeContract({ function: "update", domain, tx_id });
};
export const namespace = {
    addressIsRegistered,
    resolve,
    mint,
    update,
};
