import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"

import { hcaptchaService } from "./services/hcaptcha"
import { namespaceService } from "./services/namespace"

//import { cargoRoutes } from "./routes/cargo"
import { npmRoutes } from "./routes/npm"

const httpServer = new Elysia().use(hcaptchaService()).use(namespaceService())

httpServer.use(cors())

//httpServer.use(cargoRoutes)
httpServer.use(npmRoutes)

console.info("[HTTP] Initializing endpoints:")
console.info("[HTTP]   POST /registration")
httpServer.post("/registration", async (context) => {
  const body = await context.request.json()
  const captchaValid = await context.hcaptcha.check(body["h-captcha-response"])

  if (!captchaValid)
    return new Response(JSON.stringify({ message: "Invalid captcha." }), {
      status: 400,
    })

  const userExists = await context.namespace.isAddressAllowed(body.address)

  if (userExists)
    return new Response(
      JSON.stringify({ message: "Address already registered." }),
      { status: 400 }
    )

  await context.namespace.addUser(body.address)

  return new Response(JSON.stringify({ message: "Registration successful." }), {
    status: 201,
  })
})

httpServer.onError((context) => {
  console.error(`[HTTP] -> ${context.request.method} ${context.path}`)
  console.error("[HTTP] <- " + context.error.message)
  return new Response(context.error.message, {
    status: 404,
  })
})

httpServer.listen(3000)

console.info(
  `[HTTP] ꙮ running on ${httpServer.server?.hostname}:${httpServer.server?.port}`
)
