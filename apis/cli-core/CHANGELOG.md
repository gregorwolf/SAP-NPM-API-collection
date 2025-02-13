# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2025.2.0

### Fixed

- URL path parameters are not correctly URI-encoded following the example of [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent). This can lead to issues when using a command which requires an option value with special characters, such as `/`, as a path parameter in the API URL.

## 2024.24.0

### Added

- Support for Node v22.

- New command `<cli> config secrets check` has been added to the CLI. This command allows you to verify whether the secrets file used to run commands is consistent.

  Examples for inconsistent secrets files:

  ```bash
  $ datasphere config secrets check
  ✔ Please enter the path to the secrets file: … secrets.json
  the provided secrets file is not consistent. the secrets file is missing either property access_token or properties refresh_token, client_id and client_secret
  Failed to check secrets file consistency
  ```

  ```bash
  $ datasphere config secrets check
  ✔ Please enter the path to the secrets file: … secrets.json
  the provided secrets file is not consistent. the secrets file is missing either property tenantUrl or properties authorization_url and token_url
  Failed to check secrets file consistency
  ```

  Example for consistent secrets file:

  ```bash
  $ datasphere config secrets check
  ✔ Please enter the path to the secrets file: … secrets.json
  the secrets file is consistent
  ```

- Support for the authorization flow `client_credentials`. When logging in, users can now explicitly use the `client_credentials` flow. The help shows the available option to specify the authorization flow.

  ```bash
  % datasphere login --help
  Usage: datasphere login [options]

  log in to your account using interactive OAuth authentication

  Options:
    -H, --host <host>                              specifies the url where the tenant is hosted (optional)
    -A, --authorization-url <url>                  authorization url for interactive oauth session authentication (optional)
    -t, --token-url <url>                          token url for interactive oauth session authentication (optional)
    -c, --client-id <id>                           client id for interactive oauth session authentication (optional)
    -C, --client-secret <secret>                   client secret for interactive oauth session authentication (optional)
    -a, --access-token <token>                     access token for interactive oauth session authentication (optional)
    -b, --code <code>                              code for oauth token retrieval (optional)
    -r, --refresh-token <token>                    refresh token for interactive oauth session authentication (optional)
    -s, --secrets-file <file>                      path to secrets file (optional)
    -B, --browser <browser>                        specifies the browser to open (optional) (choices: "chrome", "firefox", "edge", default: "chrome")
    -d, --authorization-flow <authorization-flow>  specifies the authorization flow to use (optional) (choices: "authorization_code", "client_credentials", default: "authorization_code")
    -h, --help                                     display help for command

  Only command-specific options are listed here. To learn more about available generic options, visit https://tinyurl.com/yck8vv4w
  ```

  There's a new option `-d, --authorization-flow <authorization-flow>  specifies the authorization flow to use (optional) (choices: "authorization_code", "client_credentials", default: "authorization_code")`.

  By default, the authorization flow `authorization_code` is used which was also the implicit default before. If users create a technical OAuth client, they must set the authorization flow to `client_credentials` explicitly.

  `% datasphere login --authorization-flow client_credentials ...`

- When using option `--secrets-file` and the file containing the secrets does not exist or is not in a valid JSON format, the CLI now shows an error to the user: `The secrets file at location /path/to/secrets.json could not be read and JSON.parse'd. Does the file exist and is it a valid JSON file?`

## 2024.22.0

### Fixed

- Issues with option `--input` which would not set the request body correctly. As a workaround, option `--file-path` can be used.

## 2024.17.0

### Added

- Support for binary files. Binary files can be specified as input for a command. The content is send as a buffer to the server. The `Content-Type` header is set to `multipart/form-data`.

## 2024.15.0

### Changed

- When running `<cli> --version` in the past, the CLI exited with exit code `1`. Since this version the CLI now exits with exit code `0` instead.

### Fixed

- When using option `--input` with sequential commands and an array is provided as a value, the previous provided array is not overridden, but the previous data was merged with the current data.

## 2024.11.0

### Added

- Support for deprecated commands. If a command is to be deprecated, this can be specified in the discovery by setting `deprecated: true` for a given operation object. Also, you can use the following custom properties to provide information about the final version after which the command is removed, a new command to be used, and a link to the respective SAP Help page. Example:

  ```json
  {
    "paths": {
      "/your/api/path": {
        "get": {
          "operationId": "command",
          "deprecated": true,
          "x-deprecated-with-wave": "2024.11",
          "x-decommissioned-after-wave": "2024.12",
          "x-deprecation-new-command": "new command",
          "x-deprecation-sap-help-url": "https://www.help.sap.com/some/help/page"
        }
      }
    }
  }
  ```

  When a user runs a deprecated command, a warning is shown:

  ```bash
  WARNING: The command 'command' is deprecated from wave 2024.11 onwards. It will be removed after version 2024.11. Please start using the new command 'new command'. See https://www.help.sap.com/some/help/page for more information.
  ```

- Support for deprecated properties. If a property is deprecated but still used by a client, the server can include the custom response header `x-dsp-api-deprecated-properties` with the following `JSON.stringify`d value:

  ```json
  [
    {
      "name": "deprecated property name",
      "deprecatedWithWave": "2024.11",
      "decommissionedAfterWave": "2024.12",
      "sapHelpUrl": "https://www.help.sap.com/some/help/page",
      "customMessage": "some custom message."
    },
    {
      ...
    }
  ]
  ```

  All properties are optional except the `name`. When a user sends a deprecated property to the server and the server includes the header `x-dsp-api-deprecated-properties` in the response, the following warning is shown to the user:

  ```bash
  WARNING: the following properties are deprecated:
    deprecated property name. Deprecated since version 2024.11. Decommissioned after version 2024.12. See the SAP Help documentation at https://www.help.sap.com/some/help/page for more information. some custom message.
  ```

### Fixed

- No short flag could be calculated for an option even though for the command owning the option not all short flags were used.

## 2024.10.0

### Added

- Added a new command `<cli> config secrets refresh` which can be used to refresh the access token of the host defined via option `--host` or set as the global host via `<cli> config host set <host>`.

- Added option `--purge-all` to command `<cli> config cache clean` to enable clients to remove the whole cache if required.

### Fixed

- In case the login failed, the CLI would still store the inconsistent secret information to the CLI cache. This caused issues as following login attempts failed without a good reason. With this version, whenever a login fails, the CLI does not store inconsistent secrets to enable the user to run additional login attempts successfully. Also, the CLI prints a verbose message when the `--verbose` option is added in case an expired access token cannot be refreshed.

- The CLI used the same short flag for different options. For example, the short flag `-f` was used twice for the two different options `--force-definition-deployment` and `--file-path`:

```bash
Options:
  -f, --force-definition-deployment     force redeployment of definitions (optional)
  -n, --no-async                        do not run deployment asynchronously (optional)
  -e, --enforce-database-user-deletion  to allow deletion of Database users (optional)
  -f, --file-path <path>                specifies the file to use as input for the command (optional)
  -i, --input <input>                   specifies input as string to use for the command (optional)
  -h, --help                            display help for command
```

With this version the CLI ensures that a short flag is only used once.

```bash
Options:
  -f, --force-definition-deployment     force redeployment of definitions (optional)
  -n, --no-async                        do not run deployment asynchronously (optional)
  -e, --enforce-database-user-deletion  to allow deletion of Database users (optional)
  -F, --file-path <path>                specifies the file to use as input for the command (optional)
  -i, --input <input>                   specifies input as string to use for the command (optional)
  -h, --help                            display help for command
```

- When using an access token from another tenant, where the user the access token belongs to is not existing in the target tenant, the CLI now prints a warning saying that the used access token is invalid. The login credentials have to be refreshed in this case and a valid access token must be used.

## 2024.8.0

### Fixed

- Fixed two issues about the message `Your local CLI installation is outdated. Run 'npm install @sap/datasphere-cli [-g]' to update`. First, the command to install the latest version was not correct and changed from `npm install @sap/datasphere-cli [-g]` to `npm install @sap/datasphere-cli@latest [-g]`. Second, the error message was shown even though the CLI was already updated.

## 2024.5.0

### Fixed

- Fixed an issue with parsing the discovery document if more than 52 distinct options are defined. Now, the short flags are calculated per command. This allows for having up to 52 options per command. However, the same option used across different commands might not share the same short flag depending on other available options for the commands. It is recommended to always use the option's long name as the long name remains stable.

## 2024.4.0

### Added

- Support for Node versions `18`, `19`, `20`, `21`.

- When using the CLI as a [As a Node.js module dependency](README.md#as-a-nodejs-module-dependency) and running a command which creates an entity where the CLI would print the command to retrieve the result when running the command to create the entity in the terminal, for example:

  ```bash
  <cli> spaces create -H https://mytenant.eu10.hcs.cloud.sap/ -f ./MY_SPACE.json
  Use <cli> spaces read --space-id MY_SPACE to retrieve the entity you just created
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

- The CLI core module now supports retrieving the discovery documents from multiple endpoints for the same tenant. This allows you to define a list of endpoints from which the discovery documents should be retrieved. Multiple services, reachable through the same tenant, can expose their own, distinct discovery documents. There is no need to have a single service expose the full document for the tenant. The retrieved discovery documents are merged into a single document. All commands are shown to the user, not distinguished by endpoint or service. Only OAuth authentication is supported when specifying multiple endpoints.

### Fixed

- When the host is globally configured via the command `<cli> config host set <host>`, any other host specified via option `-H, --host` was ignored when running a command. This often led to confusion when users specify the host explicitly via option `-H, --host`, but are not aware that the host was globally configured, too. Now, option `-H, --host` always takes precedence over the globally configured host.

## 2024.2.0

### Changed

- The required version of `npm` changes from `^9` to `^10`.

## 2024.1.0

### Fixed

- The `--browser` option introduced with version `2023.25.0` did not apply the default correctly in case the option `--browser` was not explicitly specified.

## 2023.25.0

### Added

- A check for the correct node version environment when using the CLI. In case the node version does not satisfy the minimum node version required by the CLI to function correctly, a warning is printed to the console.

- When printing the help information for the `login` command, the list of options now includes the login-specific options such as `--authorization-url` and `--token-url`. Previously the help showed the following options:

  ```bash
  <CLI> login --help
  Usage: <CLI> login [options]
  log in to your account using interactive OAuth authentication
  Options:
    -H, --host <host>  specifies the url where the tenant is hosted (optional)
    -h, --help         display help for command
  ```

  With this version, the help looks like this:

  ```bash
  <CLI> login --help
  Usage: <CLI> login [options]
  log in to your account using interactive OAuth authentication
  Options:
    -H, --host <host>              specifies the url where the tenant is hosted (optional)
    -A, --authorization-url <url>  authorization url for interactive oauth session authentication (optional)
    -t, --token-url <url>          token url for interactive oauth session authentication (optional)
    -c, --client-id <id>           client id for interactive oauth session authentication (optional)
    -C, --client-secret <secret>   client secret for interactive oauth session authentication (optional)
    -a, --access-token <token>     access token for interactive oauth session authentication (optional)
    -b, --code <code>              code for oauth token retrieval (optional)
    -r, --refresh-token <token>    refresh token for interactive oauth session authentication (optional)
    -s, --secrets-file <file>      path to secrets file (optional)
    -h, --help                     display help for command
  Only command-specific options are listed here. To learn more about available generic options, visit https://tinyurl.com/yck8vv4w
  ```

- Added the option `--browser <browser>` to the login command. Users can now choose explicitly which browser to open when logging in to a tenant. By default the system's default browser is used.

### Fixed

- The HTTPS proxy support introduced with `2023.24.0` did not respect the underlying `axios` module configuration need to disable the native proxy handling by passing `proxy: false` to the request configuration.

### Changed

- Previously, when running the `logout` command but no secrets existed anymore, the command would fail with exit code 1 and an error message. Now, when running the `logout` command but there are no secrets to logout from, the command fails silently.

## 2023.24.0

### Fixed

- The defined HTTP protocol was not applied to calculated authorization URL and token URL. No matter which HTTP protocol (`http` or `https`) was used, the automatically calculated authorization URL and token URL always used the `https` protocol.

### Added

- HTTPS proxy support via environment variable `https_proxy`. When using an HTTPS proxy to communicate with the public internet, you can configure the environment variable `https_proxy`. The CLI uses the value from the environment variable to establish a correct connection to the HTTPS proxy.

- Support for response header `x-sap-datasphere-cli-file-name`. When the user adds option `--output` and provides a path to a file location, this value is always used to store the response data, no matter whether response header `x-sap-datasphere-cli-file-name` is present. If the user adds option `--output` without providing a path to a file location and the response header `x-sap-datasphere-cli-file-name` is present, the response data is stored in the location mentioned in `x-sap-datasphere-cli-file-name`. In all other cases, the response data is printed to the console.

## 2023.23.0

### Fixed

- Trailing single quotes (`'`) were removed from option values even though there was no leading single quote. This version contains a fix that trailing single quotes are only removed if there is a leading single quote.

  Trailing single quote is not removed: `some 'value'` stays `some 'value'`.

  Trailing single quote is removed: `'some value'` becomes `some value`.

- The help output did not mention the correct CLI name. Instead the output showed the name 'terminal'.

  ```javascript
  Usage: terminal [options] [command]

  Command-Line Interface for <product name>.
  ...
  ```

  Since this version, the name is shown correctly.

  ```javascript
  Usage: <cli> [options] [command]

  Command-Line Interface for <product name>.
  ...
  ```

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
