# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
