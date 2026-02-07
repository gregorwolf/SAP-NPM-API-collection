# Joule Studio Command Line Interface

The Joule Studio Command Line Interface can be used to interact with the Joule assistant and provides capabilities to

-   Compile the designtime artifact into a runtime artifact
-   Deploy a digital assistant via its runtime artifact
-   Get a list of all deployed digital assistants
-   Delete deployed digital assistants
-   Launch deployed digital assistants
-   Run static lint checks

## Installation

You can install Joule Studio Command Line Interface globally using npm.

### Requirements

- Node.js v20.12.0 – v24
- For Linux: libsecret or a compatible keyring (for secure credential storage)

### Install

`npm install -g @sap/joule-studio-cli`


## Update

`npm install -g -f @sap/joule-studio-cli`

## Uninstall

`npm uninstall -g @sap/joule-studio-cli`

## Usage
### Important Security Notice
**The Joule Studio Command Line Interface is designed solely for testing and development purposes and is not intended to manage personal or confidential data. Users should ensure that any content provided for testing contains only non-real, non-sensitive information to maintain security and privacy.**
### Available Commands

| Command                             | Description                                     |
| ----------------------------------- |-------------------------------------------------|
| `joule compile <source> <target>`   | Compile a DTA folder into an RTA artifact       |
| `joule deploy <assistant>`          | Deploy a digital assistant to Joule             |
| `joule list`                        | List all deployed assistants                    |
| `joule get <assistant>`             | Retrieve details of deployed assistant          |
| `joule launch <assistant>`          | Launch the Web Client for a deployed assistant  |
| `joule delete <assistant>`          | Delete a deployed assistant                     |
| `joule update <assistant>`          | Update a deployed capability                    |
| `joule remove <assistant>`          | Delete a deployed capability                    |
| `joule lint <path>`                 | Run the static linter                           |
| `joule status`                      | Display current login status                    |
| `joule logout`                      | Log out from the CLI                            |

Run `joule help` or `joule <command> --help` for full usage details.

### Global options
| Option | Description                                                   |
| -------|---------------------------------------------------------------|
| -V, --version | Print the CLI version number                           |
| -d, --debug | Generate a debug file in the current directory           |
| -w, --no-color | Disable colorized output                              |
| -h, --help | Print usage information for the CLI or a specific command |

### Login

To log in to a production landscape, run:

  `joule login`

The API URL will be automatically determined based on the authentication URL provided.
To connect to a custom API URL, use:

  `joule login --apiurl <apiurl>`.

## Example Workflow
- Log in to Joule:

  `joule login`

- Compile designtime artifacts into runtime artifacts:

  `joule compile`

- Deploy the digital assistant:

  `joule deploy ./da.sapdas.yaml`

- Launch it in the web client:

  `joule launch my_assistant_name`

## Documentation

Full product documentation is available at: [SAP Help Portal – Joule Studio Tools](https://help.sap.com/docs/joule/joule-editor-user-guide/)

## License

Copyright © SAP SE


This project is licensed under the [SAP Developer License](LICENSE)
