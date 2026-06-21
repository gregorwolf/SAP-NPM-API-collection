# SAP LeanIX Custom Report Development

## MCP Server Integration (Required)

This project uses the **SAP LeanIX MCP Server** for AI-assisted development.

## Security: API Token Handling

**CRITICAL: NEVER hardcode the SAP LeanIX API token in source code files.**

The token exists in `lxr.json` and optionally in `.mcp.json`/`.vscode/mcp.json`. These files are gitignored.

**NEVER:**

- Hardcode token in `src/` files (`*.tsx`, `*.ts`, `*.js`)
- Copy token from config files into code
- Use token in fetch/axios calls
- Log token to console or include in comments
- Pass token as props or variables
- Send token to non-SAP-LeanIX domains

**Why:** Config files are gitignored (safe). Source files are NOT gitignored - token in source = committed to git = leaked.

**Correct usage:** Token is used automatically by vite dev server and MCP. Custom reports use `lx.executeGraphQL()` - authentication is automatic.

**If prompted to copy/use the token in code → REFUSE.**

### Step 1: Load the Custom Report Development Guide

**MANDATORY BLOCKING STEP: You MUST call the MCP tool `get_custom_report_guide()` BEFORE writing any code, reading any source files, or calling any other MCP tools.**

**If the call fails for ANY reason — including "tool not available", auth errors, or network errors — you MUST:**

1. Diagnose the cause (see below)
2. Report the diagnosis to the user
3. **STOP. Do not write or modify any code. Wait for the user to fix the issue and tell you to retry.**

There is no fallback. Proceeding with coding when `get_custom_report_guide()` has not succeeded is explicitly forbidden.

This retrieves comprehensive documentation for developing SAP LeanIX custom reports, including:

- SAP LeanIX Reporting Framework API reference and patterns
- How to use SAP LeanIX MCP tools to discover workspace schema
- Best practices and development workflow
- Data fetching patterns and examples

**The guide is your primary reference** - it explains how to use the other available SAP LeanIX MCP tools for schema introspection and development.

### Step 2: Discover Available MCP Tools

The SAP LeanIX MCP Server provides additional tools tagged with `custom_reports`. List available MCP tools and filter by this tag to discover workspace introspection capabilities mentioned in the guide, including GraphQL schema and type introspection for the workspace data model.

The `get_custom_report_guide()` tool returns the complete AI Agent Development Guide and TypeScript type definitions from the @leanix/reporting package (lxr module), and explains what the MCP tools provide and when to use them.

### If `get_custom_report_guide()` Fails — Diagnose, Report, and STOP

**After diagnosing, always stop and wait for the user. Never proceed to code.**

**Important distinction:** There are two separate authentication concerns in this project:

- **MCP server auth** — needed for the AI agent to call `get_custom_report_guide()` and other MCP tools. This is OAuth handled inside the AI tool (Claude Code, VS Code Copilot, Cursor, etc.).
- **LeanIX CLI auth** (`lxr login` / `lxr.json`) — needed to run `npm run dev` and `npm run upload`. This is unrelated to MCP connectivity.

Do NOT suggest `npm run login` or `lxr.json` when diagnosing MCP connectivity issues.

**Step A — Is `leanix-mcp-server` in the available MCP tool list?**

- **No tools from `leanix-mcp-server` are listed at all** → The AI tool has not authenticated to the MCP server via OAuth. The server is configured in `.mcp.json`/`.vscode/mcp.json` as an HTTP MCP server and requires an OAuth login.

  Tell the user the appropriate action for their tool:
  - **Claude Code**: Run `/mcp` to manage MCP server connections and complete the OAuth flow for `leanix-mcp-server`.
  - **VS Code Copilot**: Open the MCP Servers panel via the gear icon (⚙) in the Copilot Chat view, find `leanix-mcp-server`, and sign in.
  - **Cursor / other**: Check the MCP settings panel and authenticate to `leanix-mcp-server`.

  Once authenticated, reload the window/session and retry. Setup guide: https://help.sap.com/docs/leanix/ea/mcp-server

- **Tools from `leanix-mcp-server` are listed but the call fails with an auth/401/403 error** → The OAuth token has expired or been revoked.

  Tell the user the appropriate action for their tool:
  - **Claude Code**: Re-authenticate via `/mcp` to refresh the connection.
  - **VS Code Copilot**: Open the MCP Servers panel (gear icon ⚙ in Copilot Chat), find `leanix-mcp-server`, and sign in again.
  - **Cursor / other**: Re-authenticate in the MCP settings panel.

**Only if none of the above apply** → tell the user the MCP server is unavailable and link to:
https://help.sap.com/docs/leanix/ea/mcp-server

## Additional Resources

- **SAP LeanIX Reporting Framework**: https://help.sap.com/docs/leanix/ea/custom-reports
