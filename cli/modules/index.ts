import fs from "fs"
import path from "path"
import { getAddress, getKeyPath } from "./config.js"

// will be omnitory-cli/dist/modules/commands
const __dirname = new URL(".", import.meta.url).pathname

const PACKAGE_JSON_FILE_PATH = path.join(__dirname, "..", "..", "package.json")

const command = process.argv[2]

export const main = async () => {
  switch (command) {
    case "init":
      const { init } = await import("./commands/init.js")
      await init()
      process.exit(0)
    case "publish":
      const { publish } = await import("./commands/publish.js")
      await publish()
      process.exit(0)
    default:
      const packageJson: any = JSON.parse(
        fs.readFileSync(PACKAGE_JSON_FILE_PATH, { encoding: "utf-8" })
      )
      console.info("ꙮmnitory CLI " + packageJson.version)
      console.info("Active key:")
      console.info("  Location: ", await getKeyPath())
      console.info("  Address:", await getAddress())

      console.info("Available commands:")
      console.info(
        "  omni init: Creates .omnitory directory, key.json, and omni.json in the current directory."
      )
      console.info(
        "  omni publish: Packages the project and publishes it to ꙮmnitory"
      )
      process.exit(1)
  }
}
