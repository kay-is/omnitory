import fs from "fs"
import crypto from "crypto"
import util from "util"
import Arweave from "arweave"

export const getTarballShasum = async (tarballPath: string) => {
  const tarballFile = fs.readFileSync(tarballPath)
  return crypto.createHash("sha1").update(tarballFile).digest("hex")
}

export async function signMessage(message: string) {
  const { getKey } = await import("./config.js")
  // @ts-expect-error
  const { subtle } = crypto
  const privateKey = await subtle.importKey(
    "jwk",
    await getKey(),
    { name: "RSA-PSS", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const encodedMessage = new util.TextEncoder().encode(message)
  const hash = await subtle.digest("SHA-256", encodedMessage)

  const signature = await subtle.sign(
    { name: "RSA-PSS", saltLength: 32 },
    privateKey,
    hash
  )

  return Buffer.from(signature).toString("base64")
}

const arweave = Arweave.init({})
export const jwkToAddress = arweave.wallets.jwkToAddress.bind(arweave.wallets)
export const createKey = arweave.wallets.generate.bind(arweave.wallets)
