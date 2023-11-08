import { useState } from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import {
  ConnectButton,
  useActiveAddress,
  useConnection,
} from "arweave-wallet-kit"

export function Registration() {
  const selectedAddress = useActiveAddress()
  const arweaveConnection = useConnection()
  const [registrationResult, setRegistrationResult] = useState("")
  const [captchaToken, setCaptchaToken] = useState("")

  function handleVerificationSuccess(token: string) {
    setCaptchaToken(token)
  }

  async function handleRegistration() {
    setCaptchaToken("")

    const response = await fetch("https://registry.omnitory.org/registration", {
      method: "post",
      body: JSON.stringify({
        "h-captcha-response": captchaToken,
        address: selectedAddress,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json()

    setRegistrationResult(result.message)
  }

  return (
    <>
      {registrationResult.length > 0 && (
        <div className="alert my-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{registrationResult}</span>
        </div>
      )}

      <div className="join w-full pb-20">
        <ConnectButton showBalance={false} style={{ width: 300 }} />
        <HCaptcha
          sitekey="19cddd56-75c2-4c8f-b78d-dd5c56dbd358"
          onVerify={handleVerificationSuccess}
        />
        <button
          onClick={handleRegistration}
          type="submit"
          className="btn btn-primary btn-wide"
          disabled={captchaToken === "" || !arweaveConnection.connected}
          style={{ height: 74 }}
        >
          Register
        </button>
      </div>
    </>
  )
}
