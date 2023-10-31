import Elysia from "elysia"
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs"

console.info("[LIT] Initializing...")

const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
  alertWhenUnauthorized: false,
  litNetwork: "cayenne",
  debug: false,
})

export const connectToLitNetwork = async () => {
  await litNodeClient.connect()
}

export const litMiddleware = new Elysia({ name: "lit" }).decorate(
  "lit",
  litNodeClient
)
