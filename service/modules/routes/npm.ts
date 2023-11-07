import path from "node:path"
import { Elysia } from "elysia"

import { configMiddleware } from "../config"
import { namespaceMiddleware } from "../services/namespace"

console.info("[NPM] Initializing...")

export const npmRoutes = new Elysia({ prefix: "/npm" })
  .use(configMiddleware)
  .use(namespaceMiddleware)

// Metadata Endpoint
npmRoutes.get("/:packageName", async (context) => {
  console.info("[NPM] -> GET " + context.path)

  const domain = await context.namespace.resolve(context.params.packageName)

  if (!domain) {
    return new Response(`Package "${context.params.packageName}" not found.`, {
      status: 404,
    })
  }

  const arweaveLocation = context.config.gateways[0] + domain.tx_id

  console.info("[NPM] <- Redirecting to " + arweaveLocation)
  return new Response(null, {
    status: 301,
    headers: {
      Location: arweaveLocation,
    },
  })
})
