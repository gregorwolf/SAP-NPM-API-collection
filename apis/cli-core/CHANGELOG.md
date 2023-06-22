# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2023.11.0

### Changed

- When using the CLI as a dependency in your Node.js project, calling a command now returns the result directly, if there's any. You don't need to provide a custom logger function anymore to catch the `output` logs. You can now write the following code to work with the result of a command:

  ```
  import cli from "@sap/dwc-cli";

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
