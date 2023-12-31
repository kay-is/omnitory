import { Elysia } from "elysia"

import { namespaceService } from "../services/namespace"

console.info("[NPM ] Initializing endpoints:")

const { ARWEAVE_GATEWAY_URL } = process.env

const NPM_PREFIX = "/npm/"
const OMNITORY_SCOPE_A = "@omnitory%252f"
const OMNITORY_SCOPE_B = "@omnitory%2f"

export const npmRoutes = new Elysia({ prefix: "/npm" }).use(namespaceService)

// Metadata Endpoint
console.info("[NPM ]   GET /npm/:packageName")
npmRoutes.get("/*", async (context) => {
  console.info("[NPM ] -> GET " + context.path)

  const packageName =
    "npm-" +
    context.path
      .replace(NPM_PREFIX, "")
      .replace(OMNITORY_SCOPE_A, "")
      .replace(OMNITORY_SCOPE_B, "")

  const domain = await context.namespace.resolve(packageName)

  if (!domain) {
    return new Response(`Package "${packageName}" not found.`, {
      status: 404,
    })
  }

  const arweaveLocation = ARWEAVE_GATEWAY_URL + domain.tx_id

  console.info("[NPM ] <- Redirecting to " + arweaveLocation)
  return new Response(null, {
    status: 301,
    headers: {
      Location: arweaveLocation,
    },
  })
})
