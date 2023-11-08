import { ArweaveWalletKit } from "arweave-wallet-kit"

import { Search } from "./search"
import { Registration } from "./registration"

export function Application() {
  return (
    <ArweaveWalletKit theme={{ radius: "none" }}>
      <App />
    </ArweaveWalletKit>
  )
}

function App() {
  return (
    <div className="flex max-w-5xl mx-auto">
      <div className="m-auto">
        <div className="tooltip tooltip-open tooltip-right" data-tip="ALPHA">
          <h1 className="font-bold text-8xl">ꙮMNITORY</h1>
        </div>
        <h2 className="font-bold text-3xl pb-5">
          The Perpetual Package Registry
        </h2>
        <p className="pb-2">
          ꙮmnitory is a package registry that stores packages on Arweave,
          ensuring that you can always install them.
        </p>
        <h3 className="font-bold text-2xl pt-5 pb-2">Installing Packages</h3>
        <p className="pb-2">
          You can use ꙮmnitory packages by linking directly to the archive on
          Arweave, or by using a scoped registry.
        </p>
        <h4 className="font-bold text-xl pt-5 pb-2">
          Installing via Archive URL
        </h4>
        <p className="pb-2">
          If you don't need version resolution, you can use the archive URLs
          directly. These URLs will give you the same package version forever.
        </p>
        <pre className="py-5 pl-10">
          <code>
            {`"dependencies": {
   "<PACKAGE_NAME>": "https://arweave.net/<ARCHIVE_ID>"
},`}
          </code>
        </pre>

        <p className="pb-2">
          You can replace <code>https://arweave.net</code> with{" "}
          <a
            className="underline"
            target="_blank"
            href="https://gateways.arweave.dev/"
          >
            an Arweave gateway of your choice
          </a>
          .
        </p>

        <h4 className="font-bold text-xl pt-5 pb-2">
          Installing via Scoped Registry
        </h4>
        <p className="pb-2">
          If you want your package manager to perform version resolution, you
          must add ꙮmnitory as a scoped registry to your
          <code> .npmrc</code>:
        </p>
        <pre className="pl-10 py-5">
          <code>@omnitory:registry=https://registry.omnitory.org/</code>
        </pre>
        <p className="pb-2">
          This makes packages on ꙮmnitory available via the
          <code> @omnitory</code> scope inside your <code>package.json</code>:
        </p>
        <pre className="pl-10 py-5">
          <code>
            {`"dependencies": {
   "@omnitory/<PACKAGE_NAME>": "<PACKAGE_VERSION>"
},`}
          </code>
        </pre>
        <p className="pb-2">
          These packages are resolved via a central registry namespace, and
          could break in the future. But the archive URLs in your
          <code> package-lock.json</code> will point directly to an Arweave
          gateway so running <code>npm ci</code> will always work.
        </p>

        <h4 className="font-bold text-xl pt-5 pb-2">Package Search</h4>

        <Search />

        <h3 className="font-bold text-2xl pt-5 pb-2">Publishing Packages</h3>
        <p className="pb-2">
          To publish packages, you must install the ꙮmnitory CLI and initialize
          it in your project directory. It will create a new Arweave key for
          you, but you can also use an existing one.
        </p>
        <p className="pb-2">
          You also must register your Arweave address of they key you're using
          with the ꙮmnitory CLI.
        </p>

        <h4 className="font-bold text-xl pt-5 pb-3">Registration</h4>
        <Registration />
      </div>
    </div>
  )
}
