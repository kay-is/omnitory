import { readState, writeContract } from "./mem.js"

const resolve = async (
  domain: string
): Promise<{ domain: string; owner: string; tx_id: string } | undefined> => {
  const state: any = await readState()
  return state.domains.find((d: any) => d.domain === domain)
}

const mint = async (domain: string, tx_id: string) => {
  return await writeContract({ function: "mint", domain, tx_id })
}

const update = async (domain: string, tx_id: string) => {
  return await writeContract({ function: "update", domain, tx_id })
}

export const namespace = {
  resolve,
  mint,
  update,
}
