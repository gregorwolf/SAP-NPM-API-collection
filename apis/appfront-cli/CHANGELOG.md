# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.5.1] - 2025-02-16

### Fixed
- Error message for not supported Node.js version
- Documentation of `--force` option for `delete` command
- The `download` command regression fixed

## [1.5.0] - 2025-02-06

### Added
- Support application directories with `xs-app.json` in the parent folder

### Changed
- Delete of application or version now requires confirmation or `-f` flag

### Fixed
- Error message for `403` (policy -> role)

## [1.4.0] - 2025-02-02

### Added
- Always display deployment logs in case of failure

### Fixed
- Format of the deployment logs on failure
- Fix the `--logs` option of `push` command

## [1.3.0] - 2025-01-22

### Added
- Support of `delete application version`
- Open Source Legal Notice

### Fixed
- Fix SSO login flow to avoid IAS limit for parallel refresh tokens

## [1.2.0] - 2024-12-01

### Added
- Support of `download` command
- Support of `install` command
- Support of `uninstall` command

## [1.0.4] - 2024-09-17

### Added
- The `--logs` option added to `push` command
- Print user friendly messages for common HTTP errors (401, 403)

## [1.0.3] - 2024-09-11

### Fixed
- Fix dynamic import URLs for `win32` platform

## [1.0.2] - 2024-09-11

### Fixed
- Fix admin user validation on `win32` platform
- Fix prompt

## [1.0.0] - 2024-09-11

### Added
- Support of `activate` command
- Support of `config` command
- Support of `curl` command
- Support of `delete` command
- Support of `list` command
- Support of `login` command
- Support of `logout` command
- Support of `logs` command
- Support of `push` command
