<img src="images/MDK_icon.png" width=75px align="right" alt="SAP MDK icon">

# Welcome to @sap/mdk-mcp-server

[![REUSE status](https://api.reuse.software/badge/github.com/sap/mdk-mcp-server)](https://api.reuse.software/info/github.com/sap/mdk-mcp-server)


## What is MCP server for mobile development kit?
This open-source server provides AI agents with comprehensive MDK knowledge and tools. By combining best practice guidelines, project-aware context information, templates for creating new projects, and access to the MDK CLI tools, the MDK MCP server transforms AI agents into MDK development experts.

## What is mobile development kit?
The SAP Mobile Development Kit (MDK) is a powerful framework that enables developers to build cross-platform mobile applications using a metadata-driven approach. It is part of SAP Business Technology Platform and integrates tightly with SAP Mobile Services. 
Some of SAP’s larger and complex mobile apps are built using MDK. An example is [SAP Service and Asset Manager](https://www.sap.com/sea/products/scm/asset-manager.html).

> [!NOTE]
> This MCP server is an early release version of the MDK. You may encounter bugs or unfinished features. We'd love your feedback to make it better! Please report issues or share suggestions via [GitHub issues](https://github.com/sap/mdk-mcp-server/issues).

## Table of Contents

- [Setup](#setup)
- [Available Tools](#available-tools)
- [Support, Feedback, Contributing](#support-feedback-contributing)
- [Security / Disclosure](#security--disclosure)
- [Code of Conduct](#code-of-conduct)
- [Licensing](#licensing)
- [Acknowledgments](#acknowledgments)


## Setup

1. Install [node.js](https://nodejs.org/en).

2. Install [Yeoman](https://yeoman.io/).

    ```bash
    npm i -g yo@4.3.1
    ```

3. For installing the MDK MCP server, we offer two options:

    a. Use npm to install it from the public npmjs registry at [@sap/mdk-mcp-server](https://www.npmjs.com/package/@sap/mdk-mcp-server). 
  
      ```bash
      npm install -g @sap/mdk-mcp-server 
      ``` 

    b. Clone the open-source code repository at https://github.com/SAP/mdk-mcp-server, and use `npm` to install.  

      ```bash 
      git clone https://github.com/SAP/mdk-mcp-server.git 
      cd mdk-mcp-server 
      npm i --include=optional 
      npm run build
      npm i -g @sap/mdk-mcp-server@. 
      ```

4. Configure your MCP client (AI agent) to connect to the server. Configuration will vary depending on the AI agent used.

    **Cline in VS Code:** Example using the [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev). 
    
    - With Cline open, look below the prompt box and click **Manage MCP Servers**.
    - In the dialog, click **Settings**. The MCP Servers page opens.
    - Click **Configure MCP Servers**. This will open the `cline_mcp_settings.json` file in your editor.
    - In the JSON settings file, add a configuration block for MDK MCP server within the `mcpServers` section, and save the file. The supported schema versions include 25.9(default), 25.6, 24.11, and 24.7.

    ```
    {
      "mcpServers": {
        "mdk-mcp": {
          "type": "stdio",
          "command": "mdk-mcp",
          "args": ["--schema-version", "25.9"]
        }
      }
    }
    ```

    > **Note:**  
    > If the MCP server does not listed with its available tools in the Cline extension immediately, restart VS Code.

    <details>
      <summary><b>Expand:</b> Usage in OpenCode</summary>

    Example using [OpenCode](https://github.com/sst/opencode):

    ```
    {
      "mcp": {
        "mdk-mcp": {
          "type": "local",
          "command": ["mdk-mcp", "--schema-version", "25.9"],
          "enabled": true
        }
      }
    }
    ```
    </details>

    <details>
      <summary><b>Expand:</b> Usage in Cursor</summary>

    Edit the file `~/.cursor/mcp.json`:

    ```
    {
      "mcpServers": {
        "mdk-mcp": {
          "command": "mdk-mcp",
          "args": ["--schema-version", "25.9"]
        }
      }
    }
    ```
    </details>

    Once configured, your AI agent will have access to the MDK MCP server. Depending on your IDE settings, you may need to approve initial tool calls.

5. **Create a Rule File**: To ensure your AI coding assistant uses the MCP servers appropriately for your project, define rules and guidelines in a file named [`AGENTS.md`](https://agents.md/). In the Cline extension for VS Code, click the **Manage Cline Rules & Workflows** icon below the prompt box, click **+** to create a new rule file (e.g., `AGENTS.md`) and add the above contents. 

    Example rules to guide agent behavior:

    ```markdown
    - Don't generate `.service.metadata` file.
    - Don't generate `.xml` file in the `Services` folder.
    - Don't change `.project.json` file.
    ```

6. Verify your LLM Provider and AI model.
 
    When you add Cline to VS Code, it uses Cline as the default API provider. You can choose a different LLM provider, such as SAP AI core.
    To add an SAP AI Core API provider in the Cline extension for VS Code, follow these steps:
      - With Cline open, look below the prompt box and click **Select Model / API Providers**.
      - Choose your API provider (such as SAP AI Core) and enter your details. See the instructions [here](https://docs.cline.bot/provider-config/sap-aicore#sap-ai-core) for detailed setup.
      - Select your preferred AI model.

7. **Integration with SAP Mobile Services:** For creating a new MDK application, the MCP server uses the Cloud Foundry CLI and a `.service.metadata` file containing:
    - The mobile application defined in the SAP Mobile Services instance. 
      - Mobile Services API Endpoint
      - Mobile Services App ID
    - Mobile Destinations including OData service metadata.

    We include a tool to help with creating or updating this file as part of our **VS Code extension: Mobile development kit extension for VS Code**. This is how you can use this tool to create or update the `.service.metadata` file:

      1.	Install the [Mobile development kit extension for VS Code](https://marketplace.visualstudio.com/items?itemName=SAPSE.vsc-extension-mdk) version 1.32.0 or later.
      2.	Install the [Cloud Foundry CLI](https://help.sap.com/docs/btp/sap-business-technology-platform/download-and-install-cloud-foundry-command-line-interface).
      3.	Log in to your SAP BTP Cloud Foundry environment. For more details you can refer to [this help documentation](https://help.sap.com/docs/btp/sap-business-technology-platform/log-on-to-cloud-foundry-environment-using-cloud-foundry-command-line-interface).

      ```bash
      cf login <your target endpoint> --sso
      ```

      4. Create an empty folder on your machine and open it in VS Code.
      5. Open the Command Palette in VS Code and select **MDK: Open Mobile App Editor**.
      6. Create a new or select an existing mobile app.
      7. Select a destination.
      8. Click **Add App to Project**.

8. Your environment is now ready for the MDK development with MCP server. You can now enter a prompt to:

    - Generate a new MDK project displaying OData entities information.
    - Enhance an existing project adding additional UI controls on a given page.
    - Validate your current MDK project schema.
    - Migrate old MDK projects to latest schema.
    - Deploy your MDK project.
    - Generate onboarding QR code.
    - Explain specific properties. 
    - Find information about control properties or any aspect of the documentation.

## Available Tools

> [!NOTE]
> Tools are meant to be used by AI models and do not constitute a stable API.

This release of the MDK MCP server includes the following tools, which can be accessed by your AI agent:

| Tools     | Description | Parameters      |
|----------|-----|-----------|
| `mdk-gen-project`    | Generates a new MDK project in the current directory.  | - `folderRootPath:` The path of the current project root folder. <br> -`templateType:` The type of the template to be used. <br> -`oDataEntitySets:` The OData entity sets are relevant to the user prompt, separated by commas. <br> -`offline:` Whether to generate the project in offline mode, set to false unless offline is explicitly specified.  |
| `mdk-gen-i18n`    | Returns a prompt to be used for generating i18n files for the MDK application. You can describe texts, labels, messages.  | - `folderRootPath:` The path of the current project root folder. |
| `mdk-gen-databinding-page`    | Returns a prompt to be used for generating a databinding-enabled MDK page. Using the prompt, a .page file is created that describes the page layout, controls and data bindings.  | - `folderRootPath:` The path of the current project root folder. <br> -`controlType:` The type of the control to be used in the MDK page. |
| `mdk-gen-layout-page`    | Generates a layout-based MDK page. You can describe the page layout, controls. It saves the response to `.page` file.  | - `folderRootPath:` The path of the current project root folder. <br> -`layoutType:` The type of the layout to be used in the MDK page. |
| `mdk-gen-entity`    | Generates CRUD or List Detail template metadata for a new entity set.  | - `folderRootPath:` The path of the current project root folder. <br> -`templateType:` The type of the entity template to be used. <br> -`oDataEntitySets:` The OData entity sets are relevant to the user prompt, separated by commas. |
| `mdk-gen-action`    | Returns a prompt to be used for generating an MDK action. Using the prompt, an `.action` file will be created that describes the action type and data bindings.  | - `folderRootPath:` The path of the current project root folder. <br> -`actionType:` The type of the action. |
| `mdk-manage`    | Comprehensive MDK project management tool that handles build, deploy, validate, migrate, show QR code, and mobile app editor operations.  | - `folderRootPath:` The path of the current project root folder. <br> -`operation:` The operation to perform on the MDK project. Available operations:<br>• `build`: Build an MDK project<br>• `deploy`: Deploy an MDK project to the Mobile Services<br>• `validate`: Validate an MDK project<br>• `migrate`: Migrate an MDK project to the latest MDK version<br>• `show-qrcode`: Show QR code for an MDK project<br>• `open-mobile-app-editor`: Instruct how to open the Mobile App Editor to create .service.metadata file |
| `mdk-docs`    | Unified tool for accessing MDK documentation including search, component schemas, property details, and examples.  | - `operation:` The type of documentation operation to perform:<br>• `search`: Returns the top N results from MDK documentation by semantic search, sorted by relevance<br>• `component`: Returns the schema of an MDK component based on the name of the component<br>• `property`: Returns the documentation of a specific property of an MDK component<br>• `example`: Returns an example usage of an MDK component <br> -`folderRootPath:` The path of the current project root folder. Used to determine the appropriate MDK schema version. <br> -`query:` Search query string (required for 'search' operation). <br> -`component_name:` Name of the component (required for 'component', 'property', and 'example' operations). <br> -`property_name:` Name of the property (required for 'property' operation). <br> -`N:` Number of results to return for search operation (default: 5). |

## Support, Feedback, Contributing

This project is open to feature requests/suggestions, bug reports, and so on, via [GitHub issues](https://github.com/sap/mdk-mcp-server/issues). Contribution and feedback are encouraged and always welcome. 

These instructions help contributors set up, test, and maintain code quality for this project. All commands should be run from your project folder in a terminal.

- **Test:** `npm test`
- **Build:** `npm run build`  
- **Lint:** `npm run lint:all`

For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).



## Security / Disclosure

If you find any bug that may be a security problem, please follow our instructions at [in our security policy](https://github.com/sap/mdk-mcp-server/security/policy) on how to report it. Please don't create GitHub issues for security-related doubts or problems.



## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](https://github.com/cap-js/.github/blob/main/CODE_OF_CONDUCT.md) at all times.



## Licensing

Copyright 2025 SAP SE or an SAP affiliate company. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [![REUSE status](https://api.reuse.software/badge/github.com/SAP/mdk-mcp-server)](https://api.reuse.software/info/github.com/SAP/mdk-mcp-server).



## Acknowledgments

- **@huggingface/transformers.js** is used to compare the output of the WordPiece tokenizer.
- **@modelcontextprotocol/sdk** provides the SDK for MCP.
