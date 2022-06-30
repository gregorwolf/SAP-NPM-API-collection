# @sap/dwc-cli

Command-Line Interface (CLI) for SAP Data Warehouse Cloud.

## Content

1. [Installation](#installation)
2. [Update the CLI](#update-the-cli)
3. [Versioning](#versioning)
4. [Authentication](#authentication)
5. [Usage](#usage)
   1. [From the command line](#from-the-command-line)
   2. [As a Node.js module dependency](#as-a-nodejs-module-dependency)
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

You can either use the CLI from the terminal or command line, or use the module as a regular dependency in your code of your Node.js project.

### From the command line

#### Initialize the CLI

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

#### List available commands

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

### As a Node.js module dependency

Require the module as usual. You can also use it in your TypeScript project using the `import` syntax.

```javascript
const dwc = require("@sap/dwc-cli");
```

#### Work with commands

The module exports a `getCommands` function which returns a map of available commands. Make sure to always specify the `host` to receive `host`-specific commands. Otherwise, when omitting the `host` information, you will only get the list of general commands like `cache-clean`, `cache-init`, ...

```javascript
const MY_HOST = "https://mytenant.eu10.hcs.cloud.sap/";

const commands = await dwc.getCommands(MY_HOST);

console.log(commands);
// {
//   dwc: [AsyncFunction],
//   'cache-clean': [AsyncFunction],
//   'cache-init': [AsyncFunction],
//   'passcode-url': [AsyncFunction],
//   'cache-show': [AsyncFunction]
//   'spaces create': [AsyncFunction]
//   'spaces read': [AsyncFunction]
//   'spaces delete': [AsyncFunction]
// }
```

You can call any available command and provide required options as follows:

```javascript
const MY_HOST = "https://mytenant.eu10.hcs.cloud.sap/";

const options = {
  "--host": MY_HOST,
  "--passcode": "somepasscode",
};

await commands["cache-init"](options);
```

`options` is a map of available options for the respective command. You have to supply either the short flag or long name of the option, including `-` or `--` for the short flag or long name.

#### Handle errors during command execution

If the command fails, an error is thrown you can catch and process as usual:

```javascript
try {
  await commands["cache-show"]();
} catch (err) {
  // ops, the command failed!
  console.log(err);
}
```

#### Provide custom logger function

Any output of a command you execute is forwarded to the `logger.output` function. To handle the result yourself, you can provide a custom `logger.output` function implementation:

```javascript
let result = [];
const output = (...args) => result.push(args);
dwc.configure({ customLogger: { output } });

await commands["spaces read"]({
  "--space": "MYSPACE",
  "--host": "https://mytenant.eu10.hcs.cloud.sap/",
  "--passcode": "mypasscode",
});

console.log(result);
// [
//   [
//     '{\n' +
//       '  "MYSPACE": {\n' +
//       '    "spaceDefinition": {\n' +
//       '      "version": "1.0.4",\n' +
// ...
//       '    }\n' +
//       '  }\n' +
//       '}'
//   ]
// ]
```

#### Provide custom passcode retrieval function

You can also provide a custom passcode retrieval function which is called every time before a command is executed. The function is expected to return a promise resolving into a string, the passcode. This way you can, for example, make use of programmatic passcode retrieval as described in [this blog](https://blogs.sap.com/2021/09/27/automatically-add-members-to-spaces-in-sap-data-warehouse-cloud-using-sap-dwc-cli/) using a headless browser and can omit the `--passcode` option when executing commands. The function needs to be configured only once before executing the first command.

```javascript
const logger = {
  customLogger: { output: console.log },
};

const passcodeFunction = () => {
  // instantiate headless browser, retrieve passcode, return it
};

dwc.configure(logger, passcodeFunction);

// no --passcode option required
await commands["spaces read"]({
  "--space": "MYSPACE",
  "--host": "https://mytenant.eu10.hcs.cloud.sap/",
});
```

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
