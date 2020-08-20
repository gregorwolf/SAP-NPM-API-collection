# Changelog

## Version 1.1.7 - 2020-08-17

### Fixed
- The optional `keytar` package is now resolved if it's installed globally.  See the [documentation](https://cap.cloud.sap/docs/guides/extensibility#save-authentication-token-for-simplified-workflow) for more.

## Version 1.1.6 - 2020-08-03

### Added

- Login/logout: Support saving authentication token to desktop keyring (needs additional user-installed Node.js module)
- Login/logout: Automatic token refresh without the need to provide passcode again
- Login/logout: Suggest app URLs from Cloud-Foundry org and space currently logged in to (if applicable) if no app URL is supplied
- Login/logout: Determine missing subdomain from Cloud Foundry if possible
- Login/logout: Option to clear all invalid settings (where project folder does not exist)

### Changed

- Login/logout: Improved logging
- Login/logout: Renamed command-line options for clarity
- Login/logout: Changed location of settings files to adhere to platform standards

### Fixed

- Activate: Corrected exclusion of files from upload


## [1.1.4] - 2020-07-23

- JWT tokens for user authentication are no longer saved by default.
- Provide `login` and `logout` commands to fetch/refresh, provide, and delete authentication tokens and project settings,
  thus simplifying usage of `extend` and `activate` commands
- Changed API of `extend` and `activate` commands for reasons of unification


## [1.1.3]
- Activate command now uses asynchronous API to handle long-running jobs

## [1.1.2]
- Bug fixes

## [1.1.1]
- Fix for template download: never download templates by default if extension is active
- Fix for folder determination: use subdomain as folder if no folder was specified

## [1.1.0] - 23.08.2019
### Added
- Support of I18N files for extensions added
- Support of template files
- Support of custom file up- and download
- Support of passcode authentication
### Changed
### Fixed
### Removed

## [1.0.0] - 19.07.2019
Initial release version