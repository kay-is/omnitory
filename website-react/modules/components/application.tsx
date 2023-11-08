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
        <div
          className="tooltip tooltip-open tooltip-right"
          data-tip="PRE-ALPHA"
        >
          <h1 className="font-bold text-8xl">ꙮMNITORY</h1>
        </div>
        <h2 className="font-bold text-3xl pb-5">
          The Perpetual Package Registry
        </h2>
        <p className="pb-2">
          ꙮmnitory is a package registry that stores packages permanently on
          decentralized infrastructure worldwide.
        </p>
        <p className="pb-2">
          <i>Currently only NPM packages are supported.</i>
        </p>
        <h3 className="font-bold text-2xl pt-5 pb-2">Installing Packages</h3>
        <p className="pb-2">
          You can use ꙮmnitory packages by linking directly to the archive or by
          using a scoped registry.
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
   "<PACKAGE_NAME>": "https://g8way.io/<ARCHIVE_ID>"
},`}
          </code>
        </pre>

        <p className="pb-2">
          You can replace <code>https://g8way.io/</code> with{" "}
          <a
            className="underline"
            target="_blank"
            href="https://gateways.g8way.io/"
          >
            a gateway of your choice
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
          <code>@omnitory:registry=https://registry.omnitory.org/npm/</code>
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
          could break in the future, but the archive URLs in your
          <code> package-lock.json</code> will point directly to a gateway so
          running <code>npm ci</code> will always work.
        </p>

        <p>
          If a gateway shuts down, you can update the URLs with{" "}
          <a
            className="underline"
            target="_blank"
            href="https://gateways.g8way.io/"
          >
            a different gateway
          </a>
          .
        </p>

        <h4 className="font-bold text-xl pt-5 pb-2">Package Search</h4>

        <p className="pb-2">
          This search queries the ꙮmnitory for registered package versions.
          <b> It only supports exact matches right now.</b>
        </p>

        <Search />

        <h3 className="font-bold text-2xl pt-5 pb-2">Publishing Packages</h3>
        <p className="pb-2">
          To publish packages, you need the ꙮmnitory CLI and and Arweave
          address.
        </p>

        <h4 className="font-bold text-xl pt-5 pb-2">Setting Up the CLI</h4>

        <p className="pb-2">
          First, you must install the CLI with the following commands:
        </p>
        <pre className="pl-10 py-5">
          <code>
            npm -g config set
            @omnitory:registry=https://registry.omnitory.org/npm/
            <br />
            npm -g install @omnitory/omnitory-cli
          </code>
        </pre>
        <p className="pb-2">
          Then you run the <code>init</code> command inside your NPM project
          directory:
        </p>
        <pre className="pl-10 py-5">
          <code>omni init</code>
        </pre>

        <p className="pb-2">
          This will create a <code>key.json</code> file inside the project
          directory.
        </p>

        <p className="pb-2">
          To use the generated keyfile, you can import it into your Arweave
          wallet and then connect with it to this website. You can replace it
          with another JWK file if you like, but make sure that you register the
          correct one.
        </p>

        <p className="pb-2">
          If you don't have an Arweave wallet,{" "}
          <a
            className="underline"
            target="_blank"
            href="https://www.arconnect.io/download"
          >
            download an ArConnect browser extension
          </a>
          .
        </p>

        <h4 className="font-bold text-xl pt-5 pb-2">Register Address</h4>

        <p className="pb-2">
          When you have the same key inside your project as in your wallet, you
          can register the address here.
        </p>

        <p className="pb-2">
          You can check the active key for your project by running:
        </p>

        <pre className="pl-10 py-5">
          <code>omni info</code>
        </pre>

        <Registration />
      </div>
    </div>
  )
}
