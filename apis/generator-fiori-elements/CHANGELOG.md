# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.0.28] - 2021-02-05
#### Added
- The Fiori elements generator has been deprecated. Please use the `@sap/generator-fiori` generator which combines the Fiori elements and Fiori freestyle generators.

## [1.0.27] - 2021-01-22
### Added
- Added ability to generate an application without user interaction by passing a json payload of the relevant answers to the Yeoman command line.
- Added support for destinations in SAP Business Application Studio that have been defined on the instance level rather than account level.
- In VSCode, moved non-confidential information for saved SAP systems out of the operating system secure storage.
- Added SAP Systems panel in VSCode to allow users delete previously saved systems.
- Generated Fiori applications for a CAP project can now add deployment configuration.

### Fixed
- Improved UX and description when needing to add missing service keys for a generated application at run time.

## [1.0.25] - 2020-12-10
### Added
- The generator now supports the SAP API Business Hub for data source selection when using VSCode.

### Fixed
- Ensure correct manifest version is generated for corresponding UI5 version

## [1.0.24] - 2020-11-25
### Added
- Support for OData V4 data sources for the List Report Object Page and Analytical List Page floorplans.
- The generator now supports the API Business Hub for data source selection in the SAP Business Application Studio.

### Fixed
- Adding a new SAP system in VSCode now only gets saved when the application is being generated.  Previously this was happening when proceeding from the data source step.

## [1.0.23] - 2020-11-13
### Added
- Snapshot versions of UI5 now supported on Business Application Studio for internal users.
- Supports generating deployment configuration for Cloud Foundry where the parent folder contains an MTA file.
- Support for launching from CAP project explorer in Business Application Studio.

### Fixed
- Changing the SAP System to use before generation now correctly resets the proceeding fields.

## [1.0.21] - 2020-10-27
### Added
- Dropdown selections for services and entities are now sorted alphabetically.
- Module name now allows dash and underscore characters.

### Fixed
- The suggested project folder to use for generating the application in VSCode now defaults to the open workspace folder.


## [1.0.20] - 2020-10-13
### Added
- The associated NPM libraries are now installed in the background after the generator closes for better performance.

### Fixed
- Sorted SAP system connections alphabetically.
- The `Readme` file generated for each application is now correctly detailed the selected floorplan.
- Fixed warning messages from the generated `manifest.json` file.

## [1.0.19] - 2020-09-26
### Fixed
- Updated support for SAP system connections.

## [1.0.18] - 2020-09-25
### Fixed
- Performance improvements to the generation time.

### Added
- 'Select Qualifier' dropdown not displayed for the Analytical List Page floorplan unless the chosen main entity supports it.
- Mandatory fields in the generator are now represented with a red asterisk.
- When no optional namespace is provided, the generated annotations file will use the default namespace of 'local'.
- List report pages now have the 'useDateRange' manifest property set to 'true' by default.  See https://sapui5.hana.ondemand.com/#/topic/fef65d03d01a4b2baca28983a5449cf7.html for further details.
- Object pages now have the 'defaultLayoutTypeIfExternalNavigation' set to 'MidColumnFullScreen' by default.  See https://sapui5.hana.ondemand.com/#/topic/1d4a0f94bfee48d1b50ca8084a76beec.html for further details.

## [1.0.17] - 2020-09-10
### Fixed
- The navigation property for a Worklist template now correctly supported.
- Fixed issue in SAP Business Application Studio where generating an application without a workspace open would display an error.

### Added
- The Analytical List Page floorplan now provides a dropdown list of suitable qualifiers, rather than a free text input.
- Connection error messaging improved in SAP Business Application Studio.

## [1.0.16] - 2020-09-08
### Fixed
- Data source connections for Cloud URLs in SAP Business Application Studio support basic authentication.

## [1.0.15] - 2020-08-31
### Fixed
- Data source discovery for Cloud URLs in SAP Business Application Studio no longer requires the ping service to be exposed.

### Added
- A default saved system name will now be suggested when adding a new SAP system.
- The List Report Object Page V2 and V4 template options have been merged.  The generator now detects the version of the service provided and generates the required application type.
- The minimum version of UI5 supported for V4 applications has been updated to 1.81.0

## [1.0.14] - 2020-08-20
### Fixed
- The Launch configuration entries for generated projects in VSCode should now work on Windows.  Please ensure you have updated to version 1.48.0 of Microsft Visual Studio Code.

### Added
- Generated application now includes a `.gitignore` file.
- Support for V4.01 OData services.
- Support for discovering connected Cloud Foundry systems.
- Updated to latest version of `@ui5/cli`.

## [1.0.13] - 2020-08-13
### Added
- When generating an application for an existing OData V4 CAP project you can now choose whether to add an associated `annotations.cds` file in the advanced options.

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
