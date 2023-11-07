import { useState } from "preact/hooks"
import HCaptcha from "@hcaptcha/react-hcaptcha"

export function Registration() {
  const [registrationResult, setRegistrationResult] = useState("")
  const [captchaSolved, setCaptchaSolved] = useState(false)

  function handleVerificationSuccess() {
    setCaptchaSolved(true)
  }

  async function handleRegistration(event: Event) {
    event.preventDefault()
    setCaptchaSolved(false)

    // @ts-expect-error
    const data = new FormData(event.target)
    const entries = [...data.entries()]

    const credentials = entries.reduce((cred: any, field: any) => {
      cred[field[0]] = field[1]
      return cred
    }, {})

    const response = await fetch(
      "https://friendly-garbanzo-wpvqp7p5x3949j-3000.app.github.dev/registration",
      {
        method: "post",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const result = await response.json()

    setRegistrationResult(result.message)
  }

  return (
    <>
      {registrationResult.length > 0 && (
        <div class="alert my-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info shrink-0 w-6 h-6"
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

      <form onSubmit={handleRegistration} class="pb-10">
        <div class="join w-full">
          <div class="form-control w-full">
            <input
              value="Enter Arweave address..."
              name="address"
              type="text"
              placeholder="Arweave Address"
              class="input input-bordered w-full"
            />
          </div>
          <br />
          {/* @ts-expect-error */}
          <HCaptcha
            sitekey="19cddd56-75c2-4c8f-b78d-dd5c56dbd358"
            onVerify={handleVerificationSuccess}
          />
        </div>
        <br />
        <button
          type="submit"
          class="btn btn-primary btn-block"
          disabled={!captchaSolved}
        >
          Submit
        </button>
      </form>
    </>
  )
}
