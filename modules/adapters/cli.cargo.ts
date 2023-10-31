import path from "node:path"
import { Elysia } from "elysia"

/**
 * The Cargo CLI accesses endpoints in the following order:
 * 1. GET /index/config.json
 *    To get the download URL.
 * 2. GET /index/.../:packageName
 *    To get the package metadata.
 * 3. GET /crates/:packageName/:packageVersion/download
 *    To get the actual package as tarball.
 */

console.info("[CARGO] Initializing...")

const CARGO_FIXTURE_DIRECTORY = path.resolve(
  path.join(import.meta.dir, "..", "..", "fixtures", "cargo")
)

export const cargoRoutes = new Elysia({ prefix: "/cargo" })

cargoRoutes.get("/index/config.json", (context) => {
  console.info("[CARGO] -> GET " + context.path)

  const hostname =
    context.request.headers.get("x-forwarded-host") ||
    context.request.headers.get("host")

  const cratesPath = path
    .join(context.path, "crates")
    .replace("/index/config.json", "")

  const registryEndpoint = `https://${hostname}${cratesPath}`

  console.info("[CARGO] dl endpoint: " + registryEndpoint)
  const registryIndex = { dl: registryEndpoint, api: registryEndpoint }

  console.info("[CARGO] <- registry index")
  return registryIndex
})

cargoRoutes.get("/index/*", async (context) => {
  console.info("[CARGO] -> GET " + context.path)

  const packageName = context.path.split("/").pop()

  const metadataFilePath = path.join(
    CARGO_FIXTURE_DIRECTORY,
    `${packageName}.metadata.jsonl`
  )

  console.info("[CARGO] Reading metadata at " + metadataFilePath)
  const file = await Bun.file(metadataFilePath)

  console.info("[CARGO] <- metadata")
  return file
})

cargoRoutes.get(
  "/crates/:packageName/:packageVersion/download",
  async (context) => {
    console.info("[CARGO] -> GET " + context.path)

    const crateFilePath = path.join(
      CARGO_FIXTURE_DIRECTORY,
      `${context.params.packageName}-${context.params.packageVersion}.crate`
    )

    console.info("[CARGO] Reading crate at " + crateFilePath)
    const file = await Bun.file(crateFilePath)

    console.info("[CARGO] <- crate")
    return file
  }
)
