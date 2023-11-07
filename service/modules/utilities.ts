export async function signMessage(jwk: JsonWebKey, message: string) {
  const { subtle } = globalThis.crypto

  const privateKey = await subtle.importKey(
    "jwk",
    jwk,
    { name: "RSA-PSS", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const encodedMessage = new TextEncoder().encode(message)
  const hash = await subtle.digest("SHA-256", encodedMessage)

  const signature = await subtle.sign(
    { name: "RSA-PSS", saltLength: 32 },
    privateKey,
    hash
  )

  return Buffer.from(signature).toString("base64")
}
