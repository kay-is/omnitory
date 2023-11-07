# The ꙮmnitory CLI

Use this CLI to publish packages to ꙮmnitory.

## Installation

Install the CLI via the ꙮmnitory registry:

    $ npm -g config set @omnitory:registry=https://localhost:3000/npm
    $ npm -g install @omnitory/omnitory-cli

## Usage

The `init` command generates a new key, which is used to sign packages before uploading them to ꙮmnitory. It also creates a `omni.json` for configuration and a `.omnitory` directory where packages are stored before publishing.

    $ omni init

The `publish` command packages your project, generates metadata for your package manager, and uploads both to Arweave and registers the uploads at ꙮmnitory.

    $ omni publish
