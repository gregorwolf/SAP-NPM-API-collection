# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2022.21.0

### Added

- **OAuth Interactive Usage Authentication**: Besides using passcodes, you can now use OAuth-based authentication for interactive usage using OAuth clients created in your SAP Data Warehouse Cloud tenant to authenticate any command executed through the CLI. See the [README](README.md#oauth-interactive-usage) for details.

- **Options can be supplied through options, environment variables, options file**: See the [README](README.md#options-handling) for details.

### Changed

- **Option` -s, --space` replaced by `-S, --space`**: The short flag for option `--space` changed from `-s` to `-S`.

- **Option` -d, --definitions` replaced by `-D, --definitions`**: The short flag for option `--definitions` changed from `-d` to `-D`.

- **Correlation ID handling**: Correlation IDs are always logged in verbose mode. Before, correlation IDs were only logged in verbose mode in case an error occurred.

- **dwc cache-... commands**: Commands to work with the local CLI cache like `cache-init`, `cache-clean` and `cache-show` have been renamed to `cache init`, `cache clean` and `cache show`.

## 2022.16.0

### Added

- **New command 'host <set|get|remove> <host>'**: You can now set the host (SAP Data Warehouse Cloud tenant) to connect to globally. By calling `dwc host set yourhost` (replace `yourhost` with the URL of your SAP Data Warehouse Cloud tenant) you can omit option `--host, -H` when running any other command afterwards, for example `dwc spaces read -s <space>` (without option `--host, -H`). You can show the currently maintained global host by running `dwc host show`. To update the global host, run `dwc host set yourhost` again. To remove the global setting, run `dwc host remove`.

## 2022.13.0

### Added

- **Option --pretty**: You can now control whether to pretty-format the output. For all commands that return content you can optionally specify option `--pretty` to `JSON.stringify(content, null, 2)` the output. If omitted, the content will be returned as is. This also changes the default behavior when not specifying option `--output`, but showing the content directly in the terminal. Previously, the content was always formatted when printed to the terminal. Now, you have to explicitly add option `--pretty` in this case, too.

## 2022.9.1

### Fixed

- **Local cache issue**: After initializing the CLI using `cache-init`, no additional commands like `spaces` was available. The downloaded discovery document for the tenant in question was effectively ignored.

## 2022.9.0

### Fixed

- **Respect HTTP protocol of tenant entered by user**: No matter what the protocol of the tenant (`https` or `http`), the HTTP request send to the backend service of the respective tenant was always using `https`. This can cause issues if the client using the CLI is hidden behind a HTTP proxy which only allows for `http` requests. This addresses cases where commands failed with errors like _"self signed certificate in certificate chain"_.
- **The CLI could not be used as a regular Node.js dependency** using the `requires` or `import` syntax within a Node.js project. Users of the CLI always had to use Node.js' `exec` functionality to work with the CLI. For more information, see [_As a Node.js module dependency_](README.md#as-a-nodejs-module-dependency).
