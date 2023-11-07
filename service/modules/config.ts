import Elysia from "elysia"

const configFile = await Bun.file(import.meta.dir + "/../config.json")
const config = await configFile.json()

export const configMiddleware = new Elysia({ name: "config" }).decorate(
  "config",
  config
)
