# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2023.19.0

### Fixed

- Logging in failed if required information such as the client ID or client secret were provided via interactive input prompt. When the information were provided using a secrets file or via options, the login worked as expected.

## 2023.18.0

### Added

- Support for managing multiple logins/secrets for different tenants in parallel. The `<cli> login` and `<cli> logout` commands have been updated, allowing you to login to multiple tenants in parallel. When running a command, the CLI uses the secret matching the currently maintained tenant URL via the `-H, --host` option or set via `<cli> config host set <host>`. You now must specify the host which you are logging in to using option `-H, --host`, or by setting the host globally first by calling `<cli> config host set <host>`, to allow the CLI to store the secret for the defined tenant URL.

  You can list all locally stored secrets by running `<cli> config secrets show`.

  ```javascript
  $ <cli> config secrets show
  [
    {
      "id": 0,
      "client_id": "sb-0d85e619...",
      "client_secret": "1dcc0522-...",
      "tenantUrl": "https://somehost.eu10.cloud.sap",
      ...
    },
    {
      "id": 1,
      "client_id": "sb-0d85e619...",
      "client_secret": "1dcc0522-...",
      "tenantUrl": "https://somehost.us10.cloud.sap",
      ...
    }
  ]
  ```

  In order to logout again, the `<cli> logout` command allows you to optionally specify the ID of the login/secret to remove using option `-l, --login-id <id>`.

  ```javascript
  <cli> logout --help
  Usage: <cli> logout [options]

  log out from your account

  Options:
    -l, --login-id <id>  specifies the login ID (optional) (choices: "0", default: "0")
    -h, --help           display help for command
  ```

  By default, when you omit option `-l, --login-id <id>`, the login/secret with ID _0_ is removed.

  You cannot login to the same tenant with different _access tokens_ at the same time. There can only be a single login/secret per tenant, but you can login into multiple tenants in parallel. If you need to login with different users into the same tenant, you have to logout first, then login again with a different user.

- Support for predefined OAuth clients where the client ID _does not_ start with the term `sb-`. When using a predefined OAuth client where the client ID _does not_ start with the term `sb-`, the CLI uses a different default port `65000` to retrieve the temporary code to retrieve the access token and refresh token. The port can be changed using the environment variable mentioned in the [README.md](README.md) file.

- Improved OAuth authorization URL and token URL support. You do not have to specify the options for the _OAuth Client Authorization URL_ and _Token URL_ anymore, if you specify the tenant URL using the _-H, --host_ option. The CLI calculates the required authorization and token URLs automatically based on the given _Client ID_, _Client Secret_, and _Tenant URL_. You can still use the respective options to provide values for the authorization URL and token URL to override the calculated values.

### Changed

- Generic options are hidden for all commands. Before, all options where shown, including generic options applicable to any command.

  ```bash
  $ <cli> spaces read --help
  Usage: <cli> spaces read [options]
  fetch space details for a specified space
  Options:
    -V, --verbose                    print detailed log information to console (optional)
    -O, --options-file <file>        path to options file (optional)
    -H, --host <host>                specifies the url where the tenant is hosted (optional)
    -c, --client-id <id>             client id for interactive oauth session authentication (optional)
    -C, --client-secret <secret>     client secret for interactive oauth session authentication (optional)
    -a, --access-token <token>       access token for interactive oauth session authentication (optional)
    -r, --refresh-token <token>      refresh token for interactive oauth session authentication (optional)
    -b, --code <code>                code for oauth token retrieval (optional)
    -t, --token-url <url>            token url for interactive oauth session authentication (optional)
    -A, --authorization-url <url>    authorization url for interactive oauth session authentication (optional)
    -p, --passcode <passcode>        passcode for interactive session authentication (optional)
    -s, --secrets-file <file>        path to secrets file (optional)
    -e, --expires-in <expires>       expires in information for interactive oauth session authentication (optional)
    -o, --output <output>            specifies the file to store the output of the command (optional)
    -P, --pretty                     pretty-formats JSON responses (optional)
    -S, --space <space>              space ID (optional)
    -N, --no-space-definition        do not read space definition (optional)
    -m, --definitions [definitions]  read definitions (optional)
    -q, --connections [connections]  read connections (optional)
    -h, --help                       display help for command
  ```

  Now, only command-specific options are shown.

  ```bash
  $ <cli> spaces read --help
  Usage: <cli> spaces read [options]
  fetch space details for a specified space
  Options:
  -S, --space <space> space ID (optional)
  -N, --no-space-definition do not read space definition (optional)
  -m, --definitions [definitions] read definitions (optional)
  -q, --connections [connections] read connections (optional)
  -h, --help display help for command
  Only command-specific options are listed here. To learn more about available generic options, visit https://your.generic.options.help.url
  ```

- Option `-P, --pretty` changes to `-n, --no-pretty`. You can now supply option `-n, --no-pretty` to not pretty-format the response of a command. By default, the response of a command is pretty-formatted. When adding the option `-h, --help` to any command, the help tells you about the possible uses.

  ```bash
  $ <cli> spaces read --help
  Usage: <cli> spaces read [options]

  fetch space details for a specified space

  Options:
    -n, --no-pretty       do not pretty-format JSON responses (optional)
    -h, --help            display help for command
  ```

  When calling a command that supports the `-P, --pretty` option you can explicitly specify to pretty-print the result.

  `$ <cli> spaces read --pretty true`

  To disable pretty-printing, set `-P, --pretty` to `false`.

  `$ <cli> spaces read --pretty false`

  Calling a command without specifying the `-P, --pretty` option explicitly yields the same output as when calling the command with `--pretty true`.

- A new top-level command `config` has been introduced. This command groups all the CLI configuration-related commands such as `cache`, `secrets`, `host`, ...

  **Old Structure**

  ```bash
  $ <cli>
  Usage: <cli> [options] [command]

  <Your CLI description>

  Options:
    -v, --version              output the current version
    -H, --host <host>          specifies the url where the tenant is hosted (optional)
    -O, --options-file <file>  path to options file (optional)
    -h, --help                 display help for command

  Commands:
    cache                      work with the local CLI cache
    dbusers [options]          manage and orchestrate database users
    help [command]             display help for command
    host                       configure host properties
    login [options]            log in to your account using interactive OAuth authentication
    logout                     log out from your account
    marketplace [options]      manage and orchestrate your SAP Data Marketplace
    passcode-url [options]     display the passcode url
    secrets                    work with the locally stored secrets
    spaces [options]           manage and orchestrate spaces
    tasks [options]            manage tasks
  ```

  **New Structure**

  ```bash
  $ <cli>
  Usage: <cli> [options] [command]

  <Your CLI description>

  Options:
    -v, --version              output the current version
    -H, --host <host>          specifies the url where the tenant is hosted (optional)
    -O, --options-file <file>  path to options file (optional)
    -h, --help                 display help for command

  Commands:
    config                     configure your CLI
    dbusers [options]          manage and orchestrate database users
    help [command]             display help for command
    login [options]            log in to your account using interactive OAuth authentication
    logout                     log out from your account
    marketplace [options]      manage and orchestrate your SAP Data Marketplace
    spaces [options]           manage and orchestrate spaces
    tasks [options]            manage tasks
  ```

### Fixed

- Values entered for the _Authorization URL_ and _Token URL_ could be entered including query parameters like `https://some.authorization.url?some.parameter=some.value`. The CLI did not remove the query parameters when using the URLs to retrieve the temporary code. This has been changed, the query parameters are now removed. The CLI changes an URL from `https://some.authorization.url?some.parameter=some.value` to `https://some.authorization.url` to retrieve the temporary code.

## 2023.11.0

### Changed

- When using the CLI as a dependency in your Node.js project, calling a command now returns the result directly, if there's any. You don't need to provide a custom logger function anymore to catch the `output` logs. You can now write the following code to work with the result of a command:

  ```bash
  import cli from "@sap/<cli>";

  const commands = await cli.getCommands("https://somehost.eu10.cloud.sap");
  const result = await commands["some command"](options);
  ```

## 2023.9.0

### Added

- Possibility to flag a package as deprecated.

## 2023.7.0

### Fixed

- When the server responds with a redirect, the module again follows the given redirect. The underlying issue with `axios` had been solved, see [github.com/axios](https://github.com/axios/axios/pull/4731).

## 2023.6.0

`@sap/cli-core` has been published.

### Changed

- Environment variable `DWC_CLI_PORT` changed to `CLI_HTTP_PORT`.
- The local CLI cache was created in the installation directory of the CLI. This can cause issues if the user calling the CLI does not have write permissions on the installation directory. From now on, the CLI creates the local cache in the executing user's home directory by default. The previous behavior to use the installation directory instead, can be enabled by setting environment variable `CLI_LEGACY_CACHE_LOCATION` to `"true"`.
