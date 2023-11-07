import { Elysia } from "elysia"

import { cargoRoutes } from "./routes/cargo"
import { npmRoutes } from "./routes/npm"

const httpServer = new Elysia()

httpServer.use(cargoRoutes)
httpServer.use(npmRoutes)

httpServer.onError((context) => {
  console.error(`[HTTP] -> ${context.request.method} ${context.path}`)
  console.error("[HTTP] <- " + context.error.message)
  return new Response(context.error.message, {
    status: 404,
  })
})

httpServer.listen(3000)

console.info(
  `[HTTP] ꙮmnitory running on ${httpServer.server?.hostname}:${httpServer.server?.port}`
)
