# @sap/datasphere-cli

Command-Line Interface (CLI) for SAP Datasphere.

[![Node Version](https://img.shields.io/badge/node-18.xx.x-brightgreen)](https://nodejs.org/dist/latest-v18.x/docs/api/#) [![Node Version](https://img.shields.io/badge/node-19.xx.x-brightgreen)](https://nodejs.org/dist/latest-v19.x/docs/api/#) [![Node Version](https://img.shields.io/badge/node-20.xx.x-brightgreen)](https://nodejs.org/dist/latest-v20.x/docs/api/#) [![Node Version](https://img.shields.io/badge/node-21.xx.x-brightgreen)](https://nodejs.org/dist/latest-v21.x/docs/api/#) [![Node Version](https://img.shields.io/badge/node-22.xx.x-brightgreen)](https://nodejs.org/dist/latest-v22.x/docs/api/#) [![npm version](https://badge.fury.io/js/@sap%2Fdatasphere-cli.svg)](https://badge.fury.io/js/@sap%2Fdatasphere-cli) [![Documentation](https://img.shields.io/badge/docs-online-ff69b4.svg)](https://help.sap.com/docs/SAP_DATASPHERE/d0ecd6f297ac40249072a44df0549c1a/3f9a42ccde6b4b6aba121e2aab79c36d.html) [![Command help pages](https://img.shields.io/badge/command-help-lightgrey.svg)](#usage) ![NPM](https://img.shields.io/npm/l/@sap/datasphere-cli?color=%23FFFF00)

## Content

1. [Installation](#installation)
1. [Available Commands](#available-commands)
1. [Update the CLI](#update-the-cli)
1. [Versioning](#versioning)
1. [Authentication](#authentication)
   1. [OAuth Interactive Usage](#oauth-interactive-usage)
   1. [Passcodes](#passcodes)
1. [Usage](#usage)
   1. [From the command line](#from-the-command-line)
   1. [As a Node.js module dependency](#as-a-nodejs-module-dependency)
   1. [Options Handling](#options-handling)
   1. [Environment Variables](#environment-variables)
1. [Help & Documentation](#help-documentation)
1. [Community & Feedback](#community--feedback)
1. [License](#license)

## Installation

```bash
npm install [-g] @sap/datasphere-cli[@latest]
```

or

```bash
yarn [global] add @sap/datasphere-cli[@latest]
```

## Available Commands

Find the full overview of available commands on [help.sap.com](https://help.sap.com/docs/SAP_DATASPHERE/d0ecd6f297ac40249072a44df0549c1a/3f9a42ccde6b4b6aba121e2aab79c36d.html). See [Usage](#usage) below for instructions how to use the commands in the CLI.

## Update the CLI

See [Installation](#installation).

In case of structural changes applied to the service document (see [Initialize the CLI](#initialize-the-cli)) with a new version of SAP Datasphere you need to update the CLI. In this case, after you executed a command, the CLI issues a warning:

```bash
$ datasphere <command>
Your local CLI installation is outdated. Run 'npm install @sap/datasphere-cli@latest [-g]' to update
```

## Versioning

The semantic versioning of the CLI is handled according to SAP Datasphere versions and follows the same structure for major and minor versions.

```bash
$ datasphere -v
2021.21.0
```

For an in-depth explanation see the blog post on [blogs.sap.com](https://community.sap.com/t5/technology-blogs-by-sap/new-command-line-interface-for-sap-datasphere-code-your-way-to-the-cloud/ba-p/13513481).

## Authentication

### OAuth Interactive Usage

You can create an [OAuth Client for Interactive Usage](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/3f92b46fe0314e8ba60720e409c219fc.html) and authenticate using the provided _Client ID_ and _Client Secret_. After you created an OAuth Client for Interactive Usage, you can log in once and run multiple commands without the need to authenticate again for the next 720 hours.

To log in, run the `login` command and provide the _Client ID_, _Client Secret_, _Authentication URL_, and _Token URL_, available from your SAP Datasphere tenant ([SAP Help](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/3f92b46fe0314e8ba60720e409c219fc.html)).

```bash
$ datasphere login [--authorization-flow client_credentials|authorization_code]
✔ Please enter your client ID: … <Client ID>
✔ Please enter your client secret: … ****
✔ Please enter your authorization URL: … <Authorization URL>
✔ Please enter your token URL: … <Token URL>
```

To remove any data stored by running the `login` command, log out again:

```bash
datasphere logout
```

To display the locally stored secrets, run the `secrets show` command:

```bash
$ datasphere secrets show
{
  "client_id": "...",
  "client_secret": "...",
  "authorization_url": "...",
  "token_url": "...",
  "access_token": "...",
  "token_type": "...",
  "id_token": "...",
  "refresh_token": "...",
  "expires_in": ...,
  "scope": "...",
  "jti": "...",
  "expires_after": ...
}
```

If you do not want to log in and have the CLI store the secrets in the CLI cache locally, you can also provide the _access_token_ directly on the command line:

```bash
datasphere config cache init --host <my host> --access-token <access token>
```

Alternatively, you can provide the _access_token_ through a `secrets.json` file:

```bash
datasphere config cache init --host <my host> -secrets-file /path/to/secrets.json
```

The `secrets.json` file must at least contain the properties `access_token`, or `refresh_token` and `client_id` and `client_secret`, as well as the `tenantUrl`, or `authorization_url` and `token_url`.

```json
// secrets.json

{
  "tenantUrl": "https://mytenant.eu10.hcs.cloud.sap",
  "access_token": "<access token>"
}
```

### Passcodes

It is recommended to use the [OAuth Interactive Usage](#oauth-interactive-usage) login instead of Passcodes. Passcodes are used for authenticating commands sent from the CLI to your SAP Datasphere tenant. Passcodes can be provided explicitly using the `-p, --passcode` option in case the URL to retrieve a passcode is known, or implicitly using an interactive session by omitting the `-p, --passcode` option.

When omitting the `-p, --passcode` option the CLI prompts you to provide a passcode by navigating to the passcode authentication URL for your tenant. The URL is calculated based on the provided `-H, --host` value.

```bash
$ datasphere config cache init -H https://mytenant.eu10.hcs.cloud.sap/
✔ Do you want to retrieve a passcode from https://mytenant.authentication.eu10.hana.ondemand.com/passcode? … yes
✔ Enter your temporary authentication code: … **********
...
```

The displayed URL can be used for retrieving more passcodes by refreshing the page when sending multiple commands which can then be fed to the `-p, --passcode` option.

You can retrieve the URL directly by running the `passcode-url` command:

```bash
$ datasphere passcode-url -H https://mytenant.eu10.hcs.cloud.sap/
https://mytenant.authentication.eu10.hana.ondemand.com/passcode
```

## Usage

You can either use the CLI from the terminal or command line, or use the module as a regular dependency in your code of your Node.js project.

### From the command line

#### Initialize the CLI

You can omit this step when using the [OAuth Interactive Usage](#oauth-interactive-usage) login. This step is only required when working with [Passcodes](#passcodes). Before you can list and run commands against your SAP Datasphere tenant you need to initialize the CLI first. When initializing the CLI a service document is downloaded from your SAP Datasphere tenant which describes the commands your tenant is able to understand. To initialize the CLI run

```bash
datasphere config cache init -H https://mytenant.eu10.hcs.cloud.sap/ -p somepasscode
```

You can refresh the local copy of the service document by running the `config cache init` command again.

After you executed a command the CLI issues a warning in case the local version of the service document is outdated. In that case, run the `config cache init` command again.

```bash
$ datasphere <command>
Your local CLI cache is outdated. Run 'datasphere config cache init' to update
```

#### List available commands

To list available commands and required or optional options attach the `-h, --help` to the top-level `datasphere` command or any subcommand of `datasphere`:

```bash
$ datasphere -h
Usage: datasphere [options] [command]

Command-Line Interface for SAP Datasphere.

Options:
  -v, --version           output the current version
  -H, --host <host>       specifies the url host where the tenant is hosted where the tenant is hosted
  -h, --help              display help for command

Commands:
  cache clean             clean the local CLI cache
  config cache init [options]    initialize the local CLI cache
  passcode-url [options]  print the passcode url
  help [command]          display help for command
```

To list commands for a tenant for which the CLI was initialized, add the `-H, --host` option (notice the additional command `spaces`):

```bash
$ datasphere -H https://mytenant.eu10.hcs.cloud.sap/ -h
Usage: datasphere [options] [command]

Command-Line Interface for SAP Datasphere.

Options:
  -v, --version           output the current version
  -H, --host <host>       specifies the url where the tenant is hosted
  -h, --help              display help for command

Commands:
  cache clean             clean the local CLI cache
  config cache init [options]    initialize the local CLI cache
  spaces                  manage and orchestrate spaces
  passcode-url [options]  print the passcode url
  help [command]          display help for command
```

To show available subcommands for a top-level command, run eg:

```bash
$ datasphere spaces -H https://mytenant.eu10.hcs.cloud.sap/ -h
Usage: datasphere spaces [options] [command]

manage and orchestrate spaces

Options:
  -H, --host <host> specifies the url where the tenant is hosted
  -h, --help        display help for command

Commands:
  create [options]  creates or updates space details based on an import file
  read [options]    fetches space details for a specified space
  delete [options]  delete an existing space
  help [command]    display help for command
```

```bash
$ datasphere spaces create -H https://mytenant.eu10.hcs.cloud.sap/ -h
Usage: datasphere spaces create [options]

creates or updates space details based on an import file

Options:
  -f, --filePath <filePath>  specifies the file to use as input for the command
  -V, --verbose              print detailed log information to console (optional)
  -H, --host <host>          specifies the url where the tenant is hosted
  -p, --passcode <passcode>  passcode for interactive session authentication (optional)
  -h, --help                 display help for command
```

The list of available commands differs based on the content of the service document you downloaded when running `config cache init`.

### As a Node.js module dependency

Require the module as usual. You can also use it in your TypeScript project using the `import` syntax.

```javascript
const datasphere = require("@sap/datasphere-cli");
```

#### Work with commands

The module exports a `getCommands` function which returns a map of available commands. Make sure to always specify the `host` to receive `host`-specific commands. Otherwise, when omitting the `host` information, you will only get the list of general commands like `cache clean`, `config cache init`, ...

```javascript
const MY_HOST = "https://mytenant.eu10.hcs.cloud.sap/";

const commands = await datasphere.getCommands(MY_HOST);

console.log(commands);
// {
//   datasphere: [AsyncFunction],
//   'cache clean': [AsyncFunction],
//   'config cache init': [AsyncFunction],
//   'passcode-url': [AsyncFunction],
//   'cache show': [AsyncFunction]
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

await commands["config cache init"](options);
```

`options` is a map of available options for the respective command. You have to supply either the short flag or long name of the option, including `-` or `--` for the short flag or long name.

When running a command which creates an entity where the CLI would print the command to retrieve the result when running the command to create the entity in the terminal, for example:

```bash
datasphere spaces create -H https://mytenant.eu10.hcs.cloud.sap/ -f ./MY_SPACE.json
Use datasphere spaces read --space-id MY_SPACE to retrieve the entity you just created
```

the CLI now returns the command to execute as an object:

```bash
const retrieveCommand = await commands["spaces create"]({
  "--file-path": "MY_SPACE.json",
  "--host": "https://mytenant.eu10.hcs.cloud.sap/",
});

console.log(retrieveCommand);
// {
//   command: "spaces read",
//   options: {
//     "--space-id": "MY_SPACE"
//   },
// }
```

You can use the returned response to immediately issue the command to read the entity:

```bash
const retrieveCommand = await commands["spaces create"]({
  "--file-path": "MY_SPACE.json",
  "--host": "https://mytenant.eu10.hcs.cloud.sap/",
});

const response = await commands[retrieveCommand.command]({
  ...retrieveCommand.options,
  "--host": "https://mytenant.eu10.hcs.cloud.sap/",
});

console.log(response);
// {
//   MY_SPACE: {
//     version: "1.0.4",
//     ...
//   }
// }
```

#### Handle errors during command execution

If the command fails, an error is thrown you can catch and process as usual:

```javascript
try {
  await commands["cache show"]();
} catch (err) {
  // ops, the command failed!
  console.log(err);
}
```

#### Work with command results

The result of executing a command is returned from the function call.

```javascript
const result = await commands["spaces read"]({
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

#### Provide custom logger function

Any output of a command you execute is forwarded to the `logger.output` function. To handle the result yourself, you can provide a custom `logger.output` function implementation:

```javascript
let result = [];
const output = (...args) => result.push(args);
datasphere.configure({ customLogger: { output } });

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

You can also provide a custom passcode retrieval function which is called every time before a command is executed. The function is expected to return a promise resolving into a string, the passcode. This way you can, for example, make use of programmatic passcode retrieval as described in [this blog](https://community.sap.com/t5/technology-blogs-by-sap/automatically-add-members-to-spaces-in-sap-datasphere-using-sap-datasphere/ba-p/13512444) using a headless browser and can omit the `--passcode` option when executing commands. The function needs to be configured only once before executing the first command.

```javascript
const logger = {
  customLogger: { output: console.log },
};

const passcodeFunction = () => {
  // instantiate headless browser, retrieve passcode, return it
};

datasphere.configure(logger, passcodeFunction);

// no --passcode option required
await commands["spaces read"]({
  "--space": "MYSPACE",
  "--host": "https://mytenant.eu10.hcs.cloud.sap/",
});
```

### Options Handling

No matter how you use the CLI ([from the command-line](#from-the-command-line) or [as a Node.js module dependency](#as-a-nodejs-module-dependency)), you can supply values for options in different ways. To get an overview of the existing options per command, run `datasphere <command> --help`:

```bash
$ datasphere config cache init --help

Usage: datasphere config cache init [options]

initialize the local CLI cache

Options:
  -V, --verbose                  print detailed log information to console (optional)
  -O, --options-file <file>      path to options file (optional)
  -H, --host <host>              specifies the url where the tenant is hosted (optional)
  -p, --passcode <passcode>      passcode for interactive session authentication (optional)
  -s, --secrets-file <file>      path to secrets file (optional)
  -c, --client-id <id>           client id for interactive oauth session authentication (optional)
  -C, --client-secret <secret>   client secret for interactive oauth session authentication (optional)
  -a, --authorization-url <url>  authorization url for interactive oauth session authentication (optional)
  -t, --token-url <url>          token url for interactive oauth session authentication (optional)
  -A, --access-token <token>     access token for interactive oauth session authentication (optional)
  -r, --refresh-token <token>    refresh token for interactive oauth session authentication (optional)
  -e, --expires-in <expires>     expires in information for interactive oauth session authentication (optional)
  -h, --help                     display help for command
```

#### On the command-line

You can use the short flag or long name to supply an option value on the command-line:

```bash
datasphere config cache init --host <host>
```

#### Using environment variables

To provide an option value, the option's long name is translated to CONSTANT_CASE. For example, the option `client-id` can also be provided as follows:

```bash
CLIENT_ID='<my client id>' HOST='my-host' datasphere config cache init
```

#### Provide options file

You can provide a JSON file with a map of options, using the option's long names, and point the CLI to it using the [On the command-line](#on-the-command-line) or [Using environment variables](#using-environment-variables) way. Define the file as follows:

```json
// options-file.json

{
  "host": "my-host",
  "client-id": "my client id"
}
```

Then, supply it to the CLI:

```bash
datasphere config cache init --options-file /path/to/options-file.json
```

### Environment Variables

The CLI supports the following environment variables. You can set the environment variables when calling the CLI according to your local environment.

#### Mac

See [support.apple.com](https://support.apple.com/de-de/guide/terminal/apd382cc5fa-4f58-4449-b20a-41c53c006f8f/mac).

```bash
<env>=<value> datasphere <command>
```

Example:

```bash
LOG_LEVEL=6 datasphere login
```

#### Windows (Powershell)

See [learn.microsoft.com](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.4).

```bash
$Env:<env>=<value>
datasphere <command>
```

Example:

```bash
$Env:LOG_LEVEL=6
datasphere login
```

#### On Windows (CMD)

See [learn.microsoft.com](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1).

```bash
set <env>=<value>
datasphere <command>
```

Example:

```bash
set LOG_LEVEL=6
datasphere login
```

In addition, the CLI supports the [`dotenv`](https://www.npmjs.com/package/dotenv#usage) module, allowing you to place a `.env` file in the CLI working directory.

#### `CLI_HTTP_PORT`

Defines the port the CLI starts the HTTP server at when logging in when using OAuth clients for authentication.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | no       | 8080    |

#### `LOG_LEVEL`

Sets the log level when running commands.

| Type   | Required | Default | Allowed Values                                                       |
| ------ | -------- | ------- | -------------------------------------------------------------------- |
| number | no       | 1       | 1 (Inactive), 2 (Error), 3 (Warning), 4 (Info), 5 (Debug), 6 (Trace) |

## Help Documentation

Find the full documentation on [help.sap.com](https://help.sap.com/docs/SAP_DATASPHERE/d0ecd6f297ac40249072a44df0549c1a/3f9a42ccde6b4b6aba121e2aab79c36d.html), check out the blog post on [blogs.sap.com](https://community.sap.com/t5/technology-blogs-by-sap/sap-datasphere-cli-command-line-interface-for-sap-datasphere-overview/ba-p/13531596) or use option `-h, --help`:

```bash
datasphere <command> -h
```

Issues experienced with the CLI can be reported in the [SAP Support Launchpad](https://launchpad.support.sap.com/#incident/create) using component **DS-API-CLI**. When creating an incident, please attach a full trace log by enabling the [`LOG_LEVEL environment variable`](#log_level) before running the command (log level is 6 (trace)).

## Community & Feedback

SAP Community provides a forum where you can ask and answer questions, and comment and vote on the questions of others and their answers.

See [SAP Datasphere community](https://pages.community.sap.com/topics/datasphere) for more details and use the tag _datasphere-cli_ for questions concerning the CLI.

## License

This package is provided under the terms of the [SAP Freeware License Agreement](https://tools.hana.ondemand.com/sap-freeware-license.txt).
