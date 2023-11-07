export const main = async () => {
  const command = process.argv[2]
  switch (command) {
    case "init":
      const { init } = await import("./commands/init.js")
      init()
      break
    case "publish":
      const { publish } = await import("./commands/publish.js")
      publish()
      break
    default:
      console.info("ꙮmnitory commands:")
      console.info("- omni init")
      console.info("- omni publish")
      process.exit(1)
  }
}
