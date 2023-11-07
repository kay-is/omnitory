import Arweave from "arweave"
import { signMessage } from "../utilities"

const arweave = Arweave.init({
  protocol: "https",
  host: "arweave.net",
  port: 443,
})

const MEM_CONTRACT_ID = "ypi-DzrJqZDxTnlhmbfNFjdSO73zHC6lHD7GUFhllx0"
const MEM_API_BASE_URL = "https://api.mem.tech/api"
const MEM_READ_STATE_URL = MEM_API_BASE_URL + "/state/" + MEM_CONTRACT_ID
const MEM_READ_TXS_URL = MEM_API_BASE_URL + "/transactions"

console.info("[MEM ] Initializing with contract ID:")
console.info("[MEM ]  ", MEM_CONTRACT_ID)

export const readState = async () => {
  console.info("[MEM ] Reading state...")
  const response = await fetch(MEM_READ_STATE_URL)
  const state = await response.json()
  return state
}

export const writeContract = async (input: { [key: string]: string }) => {
  console.info("[MEM] Writing contract...")
  const auth = await createAuth()
  const response = await fetch(MEM_READ_TXS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      functionId: MEM_CONTRACT_ID,
      inputs: [{ input: { ...auth, ...input } }],
    }),
  })
  const result = await response.json()
  console.info("[MEM] Result: " + result.status)
  return result
}

const createAuth = async () => {
  const wallet = JSON.parse(process.env.ARWEAVE_KEY || "")
  const caller = await arweave.wallets.jwkToAddress(wallet)
  const message = "verify-" + Date.now()
  const signature = await signMessage(wallet, message)
  return { caller, signature, message }
}
