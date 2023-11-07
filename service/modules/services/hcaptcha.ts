import Elysia from "elysia"

const { HCAPTCHA_SECRET } = process.env

const checkCaptchaResponse = async (token: string) => {
  const url = `https://hcaptcha.com/siteverify?secret=${HCAPTCHA_SECRET}&response=${token}`
  const response = await fetch(url, { method: "post" })
  const data = await response.json()
  return data.success
}

export const hcaptchaService = () =>
  new Elysia({ name: "hcaptcha" }).decorate("hcaptcha", {
    check: checkCaptchaResponse,
  })
