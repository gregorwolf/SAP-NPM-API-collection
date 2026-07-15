# @sap/create-leanix-custom-report

## Creating Your First SAP LeanIX Custom Report

> **Compatibility Note:**
> Requires [Node.js](https://nodejs.org/en/) `>=22.0.0` (excluding `26.0.0`).

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

Authentication uses OAuth via a browser login — no API token required. The npm package name doubles as the report identity in your workspace.

## Non-Interactive / CI Usage

Every interactive prompt can be bypassed by passing the corresponding flag. This is useful for
CI pipelines, automation scripts, or any environment where stdin is not a TTY.

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --title "My Report" \
  --description "A custom report" \
  --overwrite
```

To skip SAP LeanIX authentication entirely (e.g. for offline creation):

```bash
npm create @sap/leanix-custom-report@latest my-report \
  --skipAuth \
  --title "My Report" \
  --description "A custom report"
```

### All available flags

| Flag            | Type       | Description                                                |
| --------------- | ---------- | ---------------------------------------------------------- |
| `project-name`  | positional | Directory name for the new project                         |
| `--title`       | string     | Title shown in SAP LeanIX when the report is installed     |
| `--description` | string     | Short description of the report                            |
| `--proxyURL`    | string     | HTTP/S proxy URL — also suppresses the proxy toggle prompt |
| `--overwrite`   | boolean    | Overwrite target directory if it already exists            |
| `--skipAuth`    | boolean    | Skip SAP LeanIX authentication entirely                    |
| `--help`        | boolean    | Print this flag reference and exit                         |

Any flag that is omitted will fall back to its interactive prompt, so partial automation is
fully supported.

## Authentication and `lxr.json`

Credentials are stored in `lxr.json`. The tools look for this file at two levels:

1. **Project-level** (`./lxr.json` in the current working directory) — takes precedence. Useful for workspace-specific credentials.
2. **User-level** (`~/.leanix/lxr.json` on macOS/Linux, `%APPDATA%\leanix\lxr.json` on Windows) — shared across all reports on the machine.

The `login` command always writes to the user-level file. If a project-level `lxr.json` is present, it is used instead for all operations in that directory.

Always add `lxr.json` to your `.gitignore` — the file contains OAuth tokens and client secrets.
