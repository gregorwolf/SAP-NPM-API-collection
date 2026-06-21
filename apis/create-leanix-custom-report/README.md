# @sap/create-leanix-custom-report

## Creating Your First SAP LeanIX Custom Report

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

All projects are created using **React with TypeScript**, providing a modern, type-safe development experience with excellent IDE support and maintainability.

## Non-Interactive / CI Usage

Every interactive prompt can be bypassed by passing the corresponding flag. This is useful for
CI pipelines, automation scripts, or any environment where stdin is not a TTY. Consider using
environment variables for passing the apitoken as the token might be persisted in your shell
history otherwise.

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --id net.leanix.myreport \
  --author "SAP LeanIX" \
  --title "My Report" \
  --description "A custom report" \
  --packageName my-report \
  --host demo-eu.leanix.net \
  --apitoken <your-api-token> \
  --overwrite
```

Use `--v2` for the new creation flow, which uses the npm package name as the report identity
and authenticates via OAuth (browser) instead of an API token. `--id` is not required in this mode:

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --v2 \
  --author "SAP LeanIX" \
  --title "My Report" \
  --description "A custom report" \
  --packageName my-report \
  --overwrite
```

To skip SAP LeanIX authentication entirely (e.g. for offline creation):

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --skipAuth \
  --id net.leanix.myreport \
  --author "SAP LeanIX" \
  --title "My Report" \
  --description "A custom report"
```

### All available flags

| Flag            | Type       | Description                                                                                      |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `project-name`  | positional | Directory name for the new project (default: `leanix-custom-report`)                             |
| `--id`          | string     | Unique report id in Java package notation (e.g. `net.leanix.barcharts`); not used in `--v2` mode |
| `--author`      | string     | Report author (e.g. `SAP LeanIX`)                                                                |
| `--title`       | string     | Title shown in SAP LeanIX when the report is installed                                           |
| `--description` | string     | Short description of the report                                                                  |
| `--packageName` | string     | npm package name (default: derived from project-name)                                            |
| `--host`        | string     | SAP LeanIX host (default: `demo-eu.leanix.net`); not used in `--v2` mode (resolved via OAuth)    |
| `--apitoken`    | string     | API token for authentication; not used in `--v2` mode                                            |
| `--proxyURL`    | string     | HTTP/S proxy URL — also suppresses the proxy toggle prompt                                       |
| `--overwrite`   | boolean    | Overwrite target directory if it already exists                                                  |
| `--skipAuth`    | boolean    | Skip SAP LeanIX authentication entirely                                                          |
| `--v2`          | boolean    | Use the new creation flow: OAuth browser login, package name as report identity, no report ID    |
| `--help`        | boolean    | Print this flag reference and exit                                                               |

Any flag that is omitted will fall back to its interactive prompt, so partial automation is
fully supported.

## Authentication and `lxr.json`

Credentials are stored in `lxr.json`. The tools look for this file at two levels:

1. **Project-level** (`./lxr.json` in the current working directory) — takes precedence. Useful for workspace-specific credentials.
2. **User-level** (`~/.leanix/lxr.json` on macOS/Linux, `%APPDATA%\leanix\lxr.json` on Windows) — shared across all reports on the machine.

The `login` command (v2 flow) always writes to the user-level file. If a project-level `lxr.json` is present, it is used instead for all operations in that directory.

Always add `lxr.json` to your `.gitignore` — the file contains OAuth tokens, client secrets, and/or API tokens.
