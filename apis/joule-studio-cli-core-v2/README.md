# @sap/joule-studio-cli-core-v2

Core V2 library for the [Joule Studio Command Line Interface](https://www.npmjs.com/package/@sap/joule-studio-cli).

This package provides shared utilities, API clients, and base functionality used internally by `@sap/joule-studio-cli`. It is not intended to be installed or used independently — it is automatically installed as a dependency of `@sap/joule-studio-cli`.

---

## Usage

Install and use [`@sap/joule-studio-cli`](https://www.npmjs.com/package/@sap/joule-studio-cli) instead:

```bash
npm install -g @sap/joule-studio-cli
```

---

## Capabilities

The Joule Studio CLI (`jl`) lets you:

- Create and manage solutions composed of typed assets (agents, MCP servers, workflows, etc.)
- Set up pro-code projects for AI coding agents
- Validate and build solution artifacts
- Deploy solutions to Joule Studio runtime
- Manage assets (create, delete) across all supported asset types
- Interact with MCP servers (list, inspect tools, call tools)
- Send agent-to-agent messages

---

## Example Workflow

```bash
jl login <joule-studio-url>

jl solution create --name my-solution
jl asset create agent --name my-agent

jl solution validate
jl solution build
jl solution deploy
```

See the **[CLI Reference](https://help.sap.com/docs/joule-studio/joule-studio/joule-studio-for-cli-pro-code-development-in-joule-studio)** for all commands and options.
