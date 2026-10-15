# jl — Joule Studio Dev CLI (Internal)

> This document is for contributors to `@sap/joule-studio-cli-core-v2`. For end-user documentation, see [`@sap/joule-studio-cli`](https://www.npmjs.com/package/@sap/joule-studio-cli).

---

## Installation

### Requirements

- Node.js ≥ 24

The following are required depending on which skills you use after running `jl init <agent>`:

| Requirement                                       | Skills that need it                                        |
| ------------------------------------------------- | ---------------------------------------------------------- |
| **Python 3**                                      | `sap-agent-bootstrap` — scaffold and run Python A2A agents |
| **`@sap/cds` CLI** (`npm install -g @sap/cds-dk`) | `cap-development` — build and run CAP Node.js applications |

### Install

> **Note:** Use the `@prerelease` tag to install the most recent alpha release version

```bash
npm install -g @sap/joule-studio-cli-core-v2@prerelease
```

### Update

```bash
npm install -g -f @sap/joule-studio-cli-core-v2@prerelease
```

### Uninstall

```bash
npm uninstall -g @sap/joule-studio-cli-core-v2
```

---

## Usage

```bash
jl login <joule-studio-url>                        # log in
jl solution create --name <name>                   # create a solution
jl solution validate                               # validate
jl solution build                                  # build zip
jl solution deploy                                 # deploy to backend
```

---

## Example Workflow

Log in to the backend:

```bash
jl login 'https://my-backend.cfapps.eu12.hana.ondemand.com?issuerUrl=https://myias.accounts.cloud.sap&clientId=<client-id>&appTid=<app-tid>'
```

> **Where do I find this URL?** In your Joule Studio tenant, go to **Settings → Develop** and copy the URL shown there.

Create a solution and add an asset:

```bash
jl solution create --name my-solution
jl asset create agent --name my-agent
```

Validate, build, and deploy:

```bash
jl solution validate
jl solution build
jl solution deploy
```

Check deployment status:

```bash
jl solution deploy status
jl solution deploy logs --tail 100
```

See the **[CLI Reference](https://help.sap.com/docs/joule-studio/joule-studio/joule-studio-for-cli-pro-code-development-in-joule-studio)** for all commands and options.
