import path from "node:path"
import { Elysia } from "elysia"

console.info("[NPM] Initializing...")

export const npmRoutes = new Elysia({ prefix: "/npm" })

const NPM_FIXTURE_DIRECTORY = path.resolve(
  path.join(import.meta.dir, "..", "..", "fixtures", "npm")
)

// Metadata Endpoint
npmRoutes.get("/:packageName", async (context) => {
  console.info("[NPM] -> GET " + context.path)

  const metadataFilePath = path.join(
    NPM_FIXTURE_DIRECTORY,
    `${context.params.packageName}.metadata.json`
  )
  console.info("[NPM] Reading metadata at " + metadataFilePath)
  const file = await Bun.file(metadataFilePath)
  const metadata = await file.json()

  console.info("[NPM] <- metadata")
  return metadata
})

// Tarball Endpoint
npmRoutes.get("/:packageName/-/:fileName", async (context) => {
  console.log("[NPM] -> GET " + context.path)

  const tarballFilePath = path.join(
    NPM_FIXTURE_DIRECTORY,
    `${context.params.fileName}`
  )

  console.info("[NPM] Reading tarball at " + tarballFilePath)
  const file = await Bun.file(tarballFilePath)

  console.info("[NPM] <- tarball")
  return file
})
