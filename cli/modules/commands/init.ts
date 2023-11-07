import fs from "fs"
import { join } from "path"
import url from "url"

import { createKey } from "../utilities.js"

const OMNITORY_DIRECTORY = ".omnitory"

const SRC_DIR = url.fileURLToPath(new URL(".", import.meta.url))

const CONFIG_FILE_PATH = join(process.cwd(), "omni.json")
const CONFIG_TEMPLATE_FILE_PATH = join(
  SRC_DIR,
  "..",
  "..",
  "..",
  "config.template.json"
)
const KEY_FILE_PATH = join(process.cwd(), "key.json")

export const init = async () => {
  console.info("Initializing ꙮmnitory: " + process.cwd() + "\n")

  if (fs.existsSync(KEY_FILE_PATH) === false) {
    console.info("Creating key:\n  " + KEY_FILE_PATH)
    const key = await createKey()
    fs.writeFileSync(KEY_FILE_PATH, JSON.stringify(key))
  } else {
    console.info("Skipping key creation.")
  }

  if (fs.existsSync(CONFIG_FILE_PATH) === false) {
    console.info("Creating config:\n  " + CONFIG_FILE_PATH)
    fs.copyFileSync(CONFIG_TEMPLATE_FILE_PATH, CONFIG_FILE_PATH)
    console.info("If you already have a key, add it to the config.")
  } else {
    console.info("Skipping config creation.")
  }

  if (fs.existsSync(OMNITORY_DIRECTORY) === false) {
    console.info("Creating distribution directory:\n  " + OMNITORY_DIRECTORY)
    fs.mkdirSync(OMNITORY_DIRECTORY, { recursive: true })
  } else {
    console.info("Skipping distribution directory creation.")
  }

  console.warn("\nBack up your key file and add it to the .gitignore!")
  console.info("\nRun 'omni publish' to publish this project to ꙮmnitory!")
}
