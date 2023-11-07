import { useState } from "preact/hooks"
import HCaptcha from "@hcaptcha/react-hcaptcha"

export function App() {
  const [verified, setVerified] = useState(false)

  function handleVerificationSuccess(_token: string, _ekey: string) {
    setVerified(true)
  }

  function handleSubmission(event: Event) {
    event.preventDefault()
    // @ts-expect-error
    const data = new FormData(event.target)
    console.log([...data.entries()])
  }

  return (
    <div
      class="flex h-screen"
      style={{ maxWidth: 700, margin: "0 auto 0 auto" }}
    >
      <div class="m-auto">
        <h1 class="font-bold text-8xl text-center">ꙮMNITORY</h1>
        <h2 class="font-bold text-3xl text-center">
          The Perpetual Package Registry
        </h2>
        <h3 class="font-bold text-2xl pt-5 pb-2">
          Installing Packages from ꙮmnitory
        </h3>
        <p class="pb-2">
          You can install NPM packages by adding ꙮmnitory as a scoped registry
          to your <code>.npmrc</code>.
        </p>
        <code class="pl-10">@omnitory:registry=https://locahost:8000/</code>
        <p class="pt-3">
          All packages on ꙮmnitory are now accessible via the
          <code> @omnitory</code> scope.
        </p>
        <br />
        <pre class="pl-10">
          <code>
            {`"dependencies": {
   "@omnitory/<PACKAGE_NAME>": "<PACKAGE_VERSION>"
},`}
          </code>
        </pre>
        <h3 class="font-bold text-2xl pt-5 pb-2">
          Publishing Packages to ꙮmnitory
        </h3>
        <p>
          To publish packages, you need to install the ꙮmnitory CLI, initialize
          it in your project directory. It will create a new Arweave key for
          you, but you can also use an existing one.
        </p>
        <p>To publish packages, you need to register your Arweave address.</p>
        <br />
        <br />
        <form onSubmit={handleSubmission}>
          <div class="form-control w-full max-w-xs">
            <input
              name="address"
              type="text"
              placeholder="Arweave Address"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
          <br />
          {/* @ts-expect-error */}
          <HCaptcha
            sitekey="19cddd56-75c2-4c8f-b78d-dd5c56dbd358"
            onVerify={(token: string, ekey: string) =>
              handleVerificationSuccess(token, ekey)
            }
          />
          <br />
          <button
            type="submit"
            class="btn btn-primary btn-block"
            disabled={!verified}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
