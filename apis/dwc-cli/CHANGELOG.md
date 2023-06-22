# Changelog

All notable changes to this project SAP Data Warehouse Cloud Command-Line Interface (DWC CLI) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
