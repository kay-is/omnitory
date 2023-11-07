import Elysia from "elysia"
import { readState, writeContract } from "./mem"

const resolve = async (
  domain: string
): Promise<{ domain: string; owner: string; tx_id: string } | undefined> => {
  const state = await readState()
  return state.domains.find((d: any) => d.domain === domain)
}

const addUser = async (address: string) => {
  await writeContract({ function: "addUser", address })
}

const isAddressAllowed = async (address: string) => {
  const state = await readState()
  return state.allow_list.includes(address)
}

const pauseUnpauseContract = async () => {
  await writeContract({ function: "pauseUnpauseContract" })
}

export const namespaceService = () =>
  new Elysia({ name: "namespace" }).decorate("namespace", {
    addUser,
    isAddressAllowed,
    pauseUnpauseContract,
    resolve,
  })
