# Changelog

All notable changes to this project SAP Data Warehouse Cloud Command-Line Interface (DWC CLI) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2023.24.0

### Fixed

- Trailing single quotes (`'`) were removed from option values even though there was no leading single quote. This version contains a fix that trailing single quotes are only removed if there is a leading single quote.

  Trailing single quote is not removed: `some 'value'` stays `some 'value'`.

  Trailing single quote is removed: `'some value'` becomes `some value`.

- The help output did not mention the correct CLI name. Instead the output showed the name 'terminal'.

  ```javascript
  Usage: terminal [options] [command]

  Command-Line Interface for SAP Data Warehouse Cloud.
  ...
  ```

  Since this version, the name is shown correctly.

  ```javascript
  Usage: dwc [options] [command]

  Command-Line Interface for SAP Data Warehouse Cloud.
  ...
  ```

## 2023.18.0

### Added

- Support for managing multiple logins/secrets for different tenants in parallel. The `dwc login` and `dwc logout` commands have been updated, allowing you to login to multiple tenants in parallel. When running a command, the CLI uses the secret matching the currently maintained tenant URL via the `-H, --host` option or set via `dwc config host set <host>`. You now must specify the host which you are logging in to using option `-H, --host`, or by setting the host globally first by calling `dwc config host set <host>`, to allow the CLI to store the secret for the defined tenant URL.

  You can list all locally stored secrets by running `dwc config secrets show`.

  ```javascript
  $ dwc config secrets show
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

  In order to logout again, the `dwc logout` command allows you to optionally specify the ID of the login/secret to remove using option `-l, --login-id <id>`.

  ```javascript
  dwc logout --help
  Usage: dwc logout [options]

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
  $ dwc spaces read --help
  Usage: dwc spaces read [options]
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
  $ dwc spaces read --help
  Usage: dwc spaces read [options]
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
  $ dwc spaces read --help
  Usage: dwc spaces read [options]

  fetch space details for a specified space

  Options:
    -n, --no-pretty       do not pretty-format JSON responses (optional)
    -h, --help            display help for command
  ```

  When calling a command that supports the `-P, --pretty` option you can explicitly specify to pretty-print the result.

  `$ dwc spaces read --pretty true`

  To disable pretty-printing, set `-P, --pretty` to `false`.

  `$ dwc spaces read --pretty false`

  Calling a command without specifying the `-P, --pretty` option explicitly yields the same output as when calling the command with `--pretty true`.

- A new top-level command `config` has been introduced. This command groups all the CLI configuration-related commands such as `cache`, `secrets`, `host`, ...

  **Old Structure**

  ```bash
  $ dwc
  Usage: dwc [options] [command]

  Command-Line Interface for SAP Data Warehouse Cloud.

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
  $ dwc
  Usage: dwc [options] [command]

  Command-Line Interface for SAP Data Warehouse Cloud.

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

- The environment variable `DWC_CLI_PORT` changed to `CLI_HTTP_PORT`.

### Fixed

- Values entered for the _Authorization URL_ and _Token URL_ could be entered including query parameters like `https://some.authorization.url?some.parameter=some.value`. The CLI did not remove the query parameters when using the URLs to retrieve the temporary code. This has been changed, the query parameters are now removed. The CLI changes an URL from `https://some.authorization.url?some.parameter=some.value` to `https://some.authorization.url` to retrieve the temporary code.

## 2023.12.0

> **DEPRECATION NOTICE**
>
> This package is deprecated and will be removed end of 2023 from [npmjs.com](https://npmjs.com). Following the release of SAP Datasphere, a new package [@sap/datasphere-cli](https://www.npmjs.com/package/@sap/datasphere-cli) is available on [npmjs.com](https://npmjs.com). Please switch to this package as soon as possible.

## 2023.3.0

### Added

- [`dotenv`](https://www.npmjs.com/package/dotenv) module support.

### Changed

- Previously, when using OAuth Client authentication, the CLI expected the _Redirect URI_ entered when creating the OAuth Client to end with port `8080`. The CLI starts a HTTP server on this port. This can lead to errors in environments where port `8080` is already used. Users can now set the environment variable `DWC_CLI_PORT` to, for example, `8081`, or any other port.

### Fixed

- Running `dwc cache clean` logs out any previously logged in user. Also, if you set the host globally using `dwc host set`, the host was reset.

## 2023.2.0

### Added

- Multi-service support.

### Changed

- Command `dwc host clear` changed to `dwc host clean`.

### Fixed

- When being asked whether to delete an entity, the CLI effectively ignored the answer _No_.

## 2022.25.0

### Fixed

- When running a command, the CLI issues a warning in case the local cache is outdated. The instructions to update the cache as part of the warning message mentioned a wrong command.

## 2022.24.0

### Added

- The CLI requires only a refresh token, authorization URL, and token URL, to retrieve a new access token when using OAuth Interactive Usage.

## 2022.23.0

### Fixed

- A globally set host using the `dwc host set` command was ignored when executing commands.
- When initializing the local CLI cache using the `dwc cache init` command for multiple SAP Data Warehouse Cloud tenants in the same landscape, for example EU10, the local cache contained only one single discovery file. The local CLI cache failed to handle multiple tenants in the same landscape.

## 2022.22.0

### Added

- Option `--options-file` has been added to the root `dwc` and `login` commands.

### Fixed

- If an options file was used using option `--options-file`, an error was written to the command output for all options which are required, but which are not mentioned in the options file. This error message has been converted into a trace message since it's not required to show to the user.
- Tenant URLs not ending with `.sap`, were not treated correctly, leading to a wrongly calculated host to sent requests to.
- Access token hasn't been refreshed if the first HTTP request returns with `401 Unauthorized` and OAuth-based authentication is used.
- Access tokens provided through an options file weren't considered.
- Values for option `--file-path` weren't considered if provided through an options file.

## 2022.21.0

### Fixed

- **Option value decoding:** Option values were not properly decoded. For example, when passing an encoded option value including the string _%24_ (_\$_ in decoded form), the value was not decoded to _\$_, but kept as _%24_. This causes issues when, for example, passing the client ID and client secret in encoded form to the DWC CLI using the respective options _--client-id_ and _--client-secret_.

- **Tenant URLs including upper case letters not recognized:** When providing a value for option _--host_ including capital letters, for example *https://mytenant.eu10.cloud.sap/dwaas-ui/index.html#/databuilder&/db/MYSPACE*, the DWC CLI failed to strip off the correct host *https://mytenant.eu10.cloud.sap*.

## 2022.20.0

### Added

- **OAuth Interactive Usage Authentication**: Besides using passcodes, you can now use OAuth-based authentication for interactive usage using OAuth clients created in your SAP Data Warehouse Cloud tenant to authenticate any command executed through the DWC CLI. See the [README](README.md#oauth-interactive-usage) for details.

- **Options can be supplied through options, environment variables, options file**: See the [README](README.md#options-handling) for details.

### Changed

- **Option` -s, --space` replaced by `-S, --space`**: The short flag for option `--space` changed from `-s` to `-S`.

- **Option` -d, --definitions` replaced by `-D, --definitions`**: The short flag for option `--definitions` changed from `-d` to `-D`.

- **Correlation ID handling**: Correlation IDs are always logged in verbose mode. Before, correlation IDs were only logged in verbose mode in case an error occurred.

- **dwc cache-... commands**: Commands to work with the local DWC CLI cache like `cache-init`, `cache-clean` and `cache-show` have been renamed to `cache init`, `cache clean` and `cache show`.

## 2022.16.0

### Added

- **New command 'host <set|get|remove> <host>'**: You can now set the host (SAP Data Warehouse Cloud tenant) to connect to globally. By calling `dwc host set yourhost` (replace `yourhost` with the URL of your SAP Data Warehouse Cloud tenant) you can omit option `--host, -H` when running any other command afterwards, for example `dwc spaces read -s <space>` (without option `--host, -H`). You can show the currently maintained global host by running `dwc host show`. To update the global host, run `dwc host set yourhost` again. To remove the global setting, run `dwc host remove`.

## 2022.13.0

### Added

- **Option --pretty**: You can now control whether to pretty-format the output. For all commands that return content you can optionally specify option `--pretty` to `JSON.stringify(content, null, 2)` the output. If omitted, the content will be returned as is. This also changes the default behavior when not specifying option `--output`, but showing the content directly in the terminal. Previously, the content was always formatted when printed to the terminal. Now, you have to explicitly add option `--pretty` in this case, too.

## 2022.9.1

### Fixed

- **Local cache issue**: After initializing the DWC CLI using `cache-init`, no additional commands like `spaces` was available. The downloaded discovery document for the tenant in question was effectively ignored.

## 2022.9.0

### Fixed

- **Respect HTTP protocol of tenant entered by user**: No matter what the protocol of the tenant (`https` or `http`), the HTTP request send to the backend service of the respective tenant was always using `https`. This can cause issues if the client using the DWC CLI is hidden behind a HTTP proxy which only allows for `http` requests. This addresses cases where commands failed with errors like _"self signed certificate in certificate chain"_.
- **The DWC CLI could not be used as a regular Node.js dependency** using the `requires` or `import` syntax within a Node.js project. Users of the DWC CLI always had to use Node.js' `exec` functionality to work with the DWC CLI. For more information, see [_As a Node.js module dependency_](README.md#as-a-nodejs-module-dependency).
