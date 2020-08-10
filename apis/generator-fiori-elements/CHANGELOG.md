# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.0.8] - 2020-07-21
### Fixed
- Generated application now contains the correct versions of the `@sap/ux-specification` and `@sap/ux-ui5-tooling` libraries that conform to semantic versioning.

### Known issues
- VSCode version 1.47.2 and above introduces a breaking change on Windows environments where the launch configuration entries added for your generated projects will not work.  As a workaround:

  - Go to `preferences` > `settings`
  - Search for `debug preview` and uncheck the `Use the new in-preview JavaScript debugger for Node.js and Chrome` option in both user and workspace

## [1.0.7] - 2020-07-07
### Fixed
- Generating an OVP application now uses the correct global filter dropdown selection.
- Service URL in lowercase now retrieves correct backend annotations.

### Added
- Support for the Run Configuration panel in SAP Business Application Studio for any generated applications.
- Namespace field is now optional during generation.

## [1.0.5] - 2020-06-24
### Fixed
- No longer permitted to generate an application without choosing a valid service.
- Updated name of generated annotation.xml for a worklist application to correctly reflect the manifest entry.

### Added
- Added tooltips for Analytical template fields to better describe their meaning
- Add more SAP System information to the generated Readme.md

## [1.0.4] - 2020-06-18
### Fixed
- Explicitly set @sap scope for generated projects to ensure installation completes successfully.

## [1.0.0] - 2020-06-16
Release status: GA 
We are pleased to announce the official GA of the SAP Fiori elements application Yeoman templates

## [0.2.9] - 2020-05-06
### Fixed
- Generated metadata alias for local annotation file
- Updated template titles and description to be consistent.

### Added
- Readme.md file in generated application now contains details of the options chosen to generate the application.

## [0.2.8] - 2020-04-22
### Fixed
- Module name with '.' fails to load with mock data.

### Added
- Added support for Analytical List Page / Object Page Fiori Elements template.
- Added support for Work List Fiori Elements template.

## [0.2.5] - 2020-04-08
### Fixed
- The entry "Latest" is now present at the top of the drop down list for the UI5 version, and only versions of UI5 from 1.65 and above will be presented as options.  Previous versions are not supported.
- Naming for the generated annotation file has been updated.  It has been renamed from `annotation0.xml` to `annotation.xml`.
- Ensure generated annotation file supports multiple schemas from metadata.

## [0.2.4] - 2020-03-25
### Fixed
- Overview Page manifest generation contains invalid annotations entry 

### Added
- Visual Enhancement, show list of entities in alphabetical order during generation
- Ensure versions of UI5 that are presented during generation are up to date


## [0.2.1] - 2020-03-12
### Fixed
- Start parent folder selector at selected folder instead of workspace root
- Allow multiple applications to be run simultaneously
- Improved error messaging when OData Service URL cannot be accessed
- Removed unnecessary `@sap` NPM reference in generated app `.npmrc` file
- OData Url placeholder text (`http://<hostname>:<port>/path/to/odata/service`) should disappear on focus

### Added
- Wait for install to complete before closing App Generator
- Remove V4 template option for Beta customers.  V4 templates are not yet ready for beta
- Default to the latest version of UI5 when no specific version is selected

## [0.0.717] - 2020-02-27
### Fixed
- Removed invalid entry from generated `.npmrc` files
- Handle query parameters in OData Service URL

### Added
- CHANGELOG.md documenting changes

## [0.0.720] - 2020-02-19
### Added
- Initial version
