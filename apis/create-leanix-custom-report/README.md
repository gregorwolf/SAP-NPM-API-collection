# @sap/create-leanix-custom-report

## Scaffolding Your First SAP LeanIX Custom Report

> **Compatibility Note:**
> Requires [Node.js](https://nodejs.org/en/) version >=24.0.0.

With NPM:

```bash
$ npm create @sap/leanix-custom-report@latest
```

With Yarn:

```bash
$ yarn create @sap/leanix-custom-report
```

With PNPM:

```bash
$ pnpm create @sap/leanix-custom-report
```

Then follow the prompts!

You can also directly specify the project name via command line:

```bash
# npm
npm create @sap/leanix-custom-report@latest my-custom-report

# yarn
yarn create @sap/leanix-custom-report my-custom-report

# pnpm
pnpm create @sap/leanix-custom-report my-custom-report
```

All projects are scaffolded using **React with TypeScript**, providing a modern, type-safe development experience with excellent IDE support and maintainability.

## Non-Interactive / CI Usage

Every interactive prompt can be bypassed by passing the corresponding flag. This is useful for
CI pipelines, automation scripts, or any environment where stdin is not a TTY. Consider using
environment variables for passing the apitoken as the token might be persisted in your shell
history otherwise.

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --id net.leanix.myreport \
  --author "LeanIX GmbH" \
  --title "My Report" \
  --description "A custom report" \
  --packageName my-report \
  --host demo-eu.leanix.net \
  --apitoken <your-api-token> \
  --overwrite
```

To skip LeanIX authentication entirely (e.g. for offline scaffolding):

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --skipAuth \
  --id net.leanix.myreport \
  --author "LeanIX GmbH" \
  --title "My Report" \
  --description "A custom report"
```

### All available flags

| Flag | Type | Description |
|---|---|---|
| `project-name` | positional | Directory name for the new project (default: `leanix-custom-report`) |
| `--id` | string | Unique report id in Java package notation (e.g. `net.leanix.barcharts`) |
| `--author` | string | Report author (e.g. `LeanIX GmbH`) |
| `--title` | string | Title shown in LeanIX when the report is installed |
| `--description` | string | Short description of the report |
| `--packageName` | string | npm package name (default: derived from project-name) |
| `--host` | string | LeanIX host (default: `demo-eu.leanix.net`) |
| `--apitoken` | string | API token for authentication |
| `--proxyURL` | string | HTTP/S proxy URL — also suppresses the proxy toggle prompt |
| `--overwrite` | boolean | Overwrite target directory if it already exists |
| `--skipAuth` | boolean | Skip LeanIX authentication entirely |
| `--setupMcpServers` | boolean | Generate MCP server config files (requires feature flag) |
| `--no-setupMcpServers` | boolean | Skip MCP server config generation without prompting |
| `--help` | boolean | Print this flag reference and exit |

Any flag that is omitted will fall back to its interactive prompt, so partial automation is
fully supported.
