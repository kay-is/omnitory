import path from "node:path"
import { Elysia } from "elysia"
import { litMiddleware } from "../lit"

console.info("[NPM] Initializing...")

export const npmRoutes = new Elysia({ prefix: "/npm" }).use(litMiddleware)

const NPM_FIXTURE_DIRECTORY = path.resolve(
  path.join(import.meta.dir, "..", "..", "fixtures", "npm")
)

// Metadata Endpoint
npmRoutes.get("/:packageName", async (context) => {
  console.info("[NPM] -> GET " + context.path)

  const TX_ID = `yC2I3S0QkqGYMOU5rnT6-uR-OJD-jb27kt8f7LG0cNU`

  const arweaveLocation = `https://arweave.net/${TX_ID}/${packageName}.metadata.jsonl`

  console.info("[NPM] <- Redirect " + arweaveLocation)
  return new Response(null, {
    status: 301,
    headers: {
      Location: arweaveLocation,
    },
  })
})

// Tarball Endpoint
npmRoutes.get("/:packageName/-/:packageName", async (context) => {
  console.log("[NPM] -> GET " + context.path)

  const TX_ID = `yC2I3S0QkqGYMOU5rnT6-uR-OJD-jb27kt8f7LG0cNU`

  console.info("[NPM] Arweave TX ID" + TX_ID)

  console.info("[NPM] <- redirecting to Arweave")
  return new Response(null, {
    status: 301,
    headers: {
      Location: `https://arweave.net/${TX_ID}/${context.params.packageName}`,
    },
  })
})
