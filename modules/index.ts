import { Elysia } from "elysia"

import { cargoRoutes } from "./adapters/cli.cargo"
import { npmRoutes } from "./adapters/cli.npm"

const httpServer = new Elysia()

httpServer.use(cargoRoutes)
httpServer.use(npmRoutes)

httpServer.all("/*", async (context) => {
  console.info(`[SERVER] -> ${context.request.method} ${context.path}`)

  console.info(`[SERVER] <- 404`)
  return {
    status: 404,
    body: {
      message: "Not Found",
    },
  }
})

httpServer.listen(3000)

console.info(`[SERVER] Ready!`)
