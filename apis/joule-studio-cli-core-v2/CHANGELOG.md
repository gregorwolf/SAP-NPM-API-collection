# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-23

### Added

- Initial release of `@sap/joule-studio-cli-core-v2`, the Core V2 library for the [Joule Studio CLI](https://www.npmjs.com/package/@sap/joule-studio-cli)
- Solution lifecycle commands: `create`, `validate`, `build`, `deploy`, `undeploy`, `delete`
- `jl solution clone` — Git pull-to-local for Engagement Layer solutions
- `jl solution traces` — view solution trace logs
- `jl solution deploy --wait` flag to poll until deployment completes
- `jl solution deploy` warns on quota limits before deploying
- `jl solution list-models` and `@agent_model` validation
- Asset management commands: `create`, `delete` across all supported asset types (agents, MCP servers, workflows, etc.)
- Per-asset-type subcommands with plugin-declared options
- Per-solution plugin scoping with `--global` opt-in; plugin dispatch and plugin interface contract
- Pro-code project scaffolding via `jl init`
- MCP server interaction: `list`, inspect tools, call tools
- Agent-to-agent messaging via `jl a2a`
- Feature flags inspection via `jl feature-flags`
- Health checks for Node.js, backend, and `cds-dk` via `jl info`
- `jl login --switch` flag for endpoint switching
- OAuth 2.0 PKCE browser login flow
- JSON Schema validation pipeline (AJV 8, draft-07)
- CLI telemetry tracking `solutionId` and `jobId` on backend requests
