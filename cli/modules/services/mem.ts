import fetch from "node-fetch"

import { getAddress } from "../config.js"
import { signMessage } from "../utilities.js"

const MEM_CONTRACT_ID = "ypi-DzrJqZDxTnlhmbfNFjdSO73zHC6lHD7GUFhllx0"
const MEM_API_BASE_URL = "https://api.mem.tech/api"
const MEM_READ_STATE_URL = MEM_API_BASE_URL + "/state/" + MEM_CONTRACT_ID
const MEM_READ_TXS_URL = MEM_API_BASE_URL + "/transactions"

export async function readState() {
  const response = await fetch(MEM_READ_STATE_URL)
  return await response.json()
}

export const writeContract = async (input: { [key: string]: string }) => {
  const auth = await createAuth()
  const response = await fetch(MEM_READ_TXS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      functionId: MEM_CONTRACT_ID,
      inputs: [{ input: { ...auth, ...input } }],
    }),
  })
  return await response.json()
}

const createAuth = async () => {
  const caller = await getAddress()
  const message = "verify-" + Date.now() + Math.random()
  const signature = await signMessage(message)
  return { caller, signature, message }
}
