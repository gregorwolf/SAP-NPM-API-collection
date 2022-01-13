# @sap/dwc-cli

Command-Line Interface (CLI) for SAP Data Warehouse Cloud.

## Content

1. [Installation](#installation)
2. [Update the CLI](#update-the-cli)
3. [Versioning](#versioning)
4. [Authentication](#authentication)
5. [Usage](#usage)
6. [Help & Documentation](#help-documentation)
7. [Community & Feedback](#community--feedback)
8. [License](#license)

## Installation

```bash
$ npm install -g @sap/dwc-cli
```

or

```bash
$ yarn global add @sap/dwc-cli
```

## Update the CLI

See [Installation](#installation).

In case of structural changes applied to the service document (see [Initialize the CLI](#initialize-the-cli)) with a new version of Data Warehouse Cloud you need to update the CLI. In this case, after you executed a command, the CLI issues a warning:

```bash
$ dwc <command>
Your local CLI installation is outdated. Run 'npm install @sap/dwc-cli [-g]' to update
```

## Versioning

The semantic versioning of the CLI is handled according to SAP Data Warehouse Cloud versions and follows the same structure for major and minor versions.

```bash
$ dwc -v
2021.21.0
```

For an in-depth explanation see the blog post on [blogs.sap.com](https://blogs.sap.com/2021/09/21/new-command-line-for-sap-data-warehouse-cloud-code-way-to-the-cloud/).

## Authentication

Passcodes are used for authenticating commands sent from the CLI to your SAP Data Warehouse Cloud tenant. Passcodes can be provided explicitly using the `-p, --passcode` option in case the URL to retrieve a passcode is known, or implictly using an interactive session by omitting the `-p, --passcode` option.

When omitting the `-p, --passcode` option the CLI prompts you to provide a passcode by navigating to the passcode authentication URL for your tenant. The URL is calculated based on the provided `-H, --host` value.

```bash
$ dwc cache-init -H https://mytenant.eu10.hcs.cloud.sap/
✔ Do you want to retrieve a passcode from https://mytenant.authentication.eu10.hana.ondemand.com/passcode? … yes
✔ Enter your temporary authentication code: … **********
...
```

The displayed URL can be used for retrieving more passcodes by refreshing the page when sending multiple commands which can then be fed to the `-p, --passcode` option.

You can retrieve the URL directly by running the `passcode-url` command:

```bash
$ dwc passcode-url -H https://mytenant.eu10.hcs.cloud.sap/
https://mytenant.authentication.eu10.hana.ondemand.com/passcode
```

## Usage

### Initialize the CLI

Before you can list and run commands against your SAP Data Warehouse Cloud tenant you need to initialize the CLI first. When initializing the CLI a service document is downloaded from your SAP Data Warehouse Cloud tenant which describes the commands your tenant is able to understand. To initialize the CLI run

```bash
$ dwc cache-init -H https://mytenant.eu10.hcs.cloud.sap/ -p somepasscode
```

You can refresh the local copy of the service document by running the `cache-init` command again.

After you executed a command the CLI issues a warning in case the local version of the service document is outdated. In that case, run the `cache-init` command again.

```bash
$ dwc <command>
Your local CLI cache is outdated. Run 'dwc cache-init' to update
```

### List available commands

To list available commands and required or optional options attach the `-h, --help` to the top-level `dwc` command or any subcommand of `dwc`:

```bash
$ dwc -h
Usage: dwc [options] [command]

Command-Line Interface for SAP Data Warehouse Cloud.

Options:
  -v, --version           output the current version
  -H, --host <host>       specifies the url host where the tenant is hosted
  -h, --help              display help for command

Commands:
  cache-clean             clean the local CLI cache
  cache-init [options]    initialize the local CLI cache
  passcode-url [options]  print the passcode url
  help [command]          display help for command
```

To list commands for a tenant for which the CLI was initialized, add the `-H, --host` option (notice the additional command `spaces`):

```bash
$ dwc -H https://mytenant.eu10.hcs.cloud.sap/ -h
Usage: dwc [options] [command]

Command-Line Interface for SAP Data Warehouse Cloud.

Options:
  -v, --version           output the current version
  -H, --host <host>       specifies the url host where the tenant is hosted
  -h, --help              display help for command

Commands:
  cache-clean             clean the local CLI cache
  cache-init [options]    initialize the local CLI cache
  spaces                  manage and orchestrate spaces
  passcode-url [options]  print the passcode url
  help [command]          display help for command
```

To show available subcommands for a top-level command, run eg:

```bash
$ dwc spaces -H https://mytenant.eu10.hcs.cloud.sap/ -h
Usage: dwc spaces [options] [command]

manage and orchestrate spaces

Options:
  -H, --host <host> specifies the url host where the tenant is hosted
  -h, --help        display help for command

Commands:
  create [options]  creates or updates space details based on an import file
  read [options]    fetches space details for a specified space
  delete [options]  delete an existing space
  help [command]    display help for command
```

```bash
$ dwc spaces create -H https://mytenant.eu10.hcs.cloud.sap/ -h
Usage: dwc spaces create [options]

creates or updates space details based on an import file

Options:
  -f, --filePath <filePath>  specifies the file to use as input for the command
  -V, --verbose              print detailed log information to console (optional)
  -H, --host <host>          specifies the url host where the tenant is hosted
  -p, --passcode <passcode>  passcode for interactive session authentication (optional)
  -h, --help                 display help for command
```

The list of available commands differs based on the content of the service document you downloaded when running `cache-init`.

## Help Documentation

Find the full documentation on [help.sap.com](https://help.sap.com/viewer/9f804b8efa8043539289f42f372c4862/cloud/en-US/5eac5b71e2d34c32b63f3d8d47a0b1d0.html), check out the blog post on [blogs.sap.com](https://blogs.sap.com/2021/09/21/new-command-line-for-sap-data-warehouse-cloud-code-way-to-the-cloud/) or use option `-h, --help`:

```bash
$ dwc <command> -h
```

## Community & Feedback

SAP Community provides a forum where you can ask and answer questions, and comment and vote on the questions of others and their answers.

See [SAP Data Warehouse Cloud community](https://community.sap.com/topics/data-warehouse-cloud) for more details and use the tag _dwc-cli_ for questions concerning the CLI.

## License

This package is provided under the terms of the [SAP Freeware License Agreement](https://tools.hana.ondemand.com/sap-freeware-license.txt).
