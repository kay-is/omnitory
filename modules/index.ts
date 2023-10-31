import { Elysia } from "elysia"

import { cargoRoutes } from "./adapters/cli.cargo"
import { npmRoutes } from "./adapters/cli.npm"
import { connectToLitNetwork } from "./lit"

const httpServer = new Elysia()

httpServer.use(cargoRoutes)
httpServer.use(npmRoutes)

httpServer.onError((context) => {
  console.error(`[SERVER] -> ${context.request.method} ${context.path}`)
  console.error("[SERVER] <- " + context.error.message)
  return new Response(context.error.message, {
    status: 404,
  })
})

await connectToLitNetwork()

httpServer.listen(3000)

console.info(
  `[SERVER] ꙮ running on ${httpServer.server?.hostname}:${httpServer.server?.port}`
)
