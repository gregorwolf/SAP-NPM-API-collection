# LeanIX Custom Report Development

## MCP Server Integration (Required)

This project uses the **LeanIX MCP Server** for AI-assisted development.

### Step 1: Load the Custom Report Development Guide

**Before starting any work, call the MCP tool: `get_custom_report_guide()`**

This retrieves comprehensive documentation for developing LeanIX custom reports, including:

- LeanIX Reporting Framework API reference and patterns
- How to use LeanIX MCP tools to discover workspace schema
- Best practices and development workflow
- Data fetching patterns and examples

**The guide is your primary reference** - it explains how to use the other available LeanIX MCP tools for schema introspection and development.

### Step 2: Discover Available MCP Tools

The LeanIX MCP Server provides additional tools tagged with `custom_reports`. List available MCP tools and filter by this tag to discover workspace introspection capabilities mentioned in the guide, such as:

- GraphQL schema introspection (SDL format)

The `get_custom_report_guide()` tool returns the complete AI Agent Development Guide and TypeScript type definitions from the @leanix/reporting package (lxr module), and explains what the MCP tools provide and when to use them.

### If the LeanIX MCP Server is Not Available

**The LeanIX MCP Server is required for custom report development.**

**Setup**: Follow instructions at https://help.sap.com/docs/leanix/ea/mcp-server

## Additional Resources

- **LeanIX Reporting Framework**: https://help.sap.com/docs/leanix/ea/custom-reports
