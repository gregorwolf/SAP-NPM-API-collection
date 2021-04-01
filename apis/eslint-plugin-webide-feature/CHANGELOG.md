# Changelog for Eslint Plugin Web IDE Feature

All notable changes to this project will be documented in this file.

## 1.3.22 - 14/03/2019

### Added

- Added support for service aliases.

## 1.3.21 - 28/11/2018

### Fixed

- The rule "no-private-apis" was fixed to show errors when service is private and uses a method.

## 1.3.20 - 25/11/2018

### Fixed

- The rule "plugin-provides-valid" was fixed to reduce the number of false positive warnings

## 1.3.19 - 28/10/2018

### Fixed

- The rule "no-private-apis" was fixed to reduce the number of false positive warnings

## 1.3.17 - 14/08/2018

### Fixed

- Fixed relative url in configs files.

## 1.3.16 - 09/08/2018

### Added

- Added recommended-new.json - only webide-eslint related checks

## 1.3.15 - 26/04/2018

### Updated

- Update package version.

## 1.3.14 - 26/04/2018

### Updated

- Update Web IDE package version in dev-dependencies.

## 1.3.13 - 28/02/2018

### Fixed

- The rule "no-private-apis" reports errors with empty service name: 'error The "" service is a "private" service'.
- The rule "no-private-methods" crashes with error: "Cannot read property 'startsWith' of undefined".
- The rule "feature-description-valid" severity has changed from "error" to "warn".
- The rule "unicorn/prefer-starts-ends-with" is turned off.

## 1.3.12 - 15/02/2018

### Added

- Added recommended-internal.json - the recommended rules configuration for internal webide feature developers.

### Fixed

- Tied the SDK version used by no-private-apis rule to the latest Web IDE version.

## 1.3.7 - 31/01/2018

### Fixed

- Fixed bundled-uris-valid - added validity checks for more use cases (for example, uris with white spaces)
- Fixed consistent-ids - fixed consistency check of bundled features ids
- Fixed no-unused-required-services - added check for not used required services (via oContext.service and not via this.context.service)
- Fixed handling of ignored paths
- Formatting rules were excluded from recommended config

## 1.3.4 - 16/01/2018

### Added

- Added no-private-apis to rules library
- Added bundled-uris-valid to rules library
- Added no-deprecated-fields to rules library
- Added homepage-url-valid to rules library
- Added consistent-ids to rules library
- Added no-optional-features to rules library
- Added feature-author-valid to rules library
- Added webide-dependencies-consistent to rules library
- Added plugin-name-valid to rules library
- Added plugin-provides-valid to rules library
- Added valid-json-files to rules library
- Added no-unused-required-services to rules library

### Removed

- Removed plugin-path from rules library
- Removed requires-services from rules library

### Renamed

- Renamed packagejson-description to feature-description-valid in rules library
- Renamed packagejson-exists to package-json-exists in rules library
- Renamed packagejson-name to feature-name-valid in rules library
- Renamed packagejson-version to feature-version-valid in rules library

### Fixed

- Problem with "Unused required service" rule - dot service names
- services/methods implemented within my feature are all flagged as private
- .eslintignore not working good with linter

## 1.2.3 - 20/12/2017

This is the initial version of Eslint Plugin Web IDE Feature. It contains a set of eslint rules for static code checks to be used by Web IDE feature developers.

### Added

- Added no-private-methods to rules library
- Added packagejson-description to rules library
- Added packagejson-exists to rules library
- Added packagejson-name to rules library
- Added packagejson-version to rules library
- Added plugin-path to rules library
- Added requires-services to rules library
