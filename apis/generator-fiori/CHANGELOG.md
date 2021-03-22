# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.1.5] - 2021-03-18
#### Added
- Freestyle SAPUI5 floor plan now supports OData V4 services.
- The analytical list page floor plan with OData V4 service now supports navigation entities.
- Adding deployment configuration for Cloud Foundry now supports the managed application router.
- Using the `CF Application Router Generator` for generating a multi-targeted application now supports the managed application router.

#### Fixed
- Applications deployed to the managed application router cannot resolve the ui5 destination.
- In some cases, validation messages for invalid OData service URLs were not being displayed.

## [1.1.4] - 2021-03-04
#### Added
- Added support for the central Fiori Launchpad for managed app router configurations.
- Generated projects no longer contain a `.npmrc` file and use the global settings.
- Project generation time has been improved.

#### Fixed
- The Fiori generator no longer has a conflict with the SAP Mobile Development Kit VSCode extension.
- Fixed invalid 401 error for OData service URL endpoints.
- Project folder is no longer created before generation starts.
- Deployment to Cloud Foundry now supports Org name with spaces.
- Updating an existing MTA file with deployment configuration on Windows is now supported.

## [1.1.2] - 2021-02-19
#### Added
- Support for adding project deployment configuration to an existing managed app router.
- Project paths in generated launch configuration are now relative.
- Migrating an existing application now prompts for system client.
- In SAP Business Application Studio, the destination name for MTA deployment configuration is now a dropdown of available destinations rather than a free text field.
- For ABAP deployment configuration, the user can now optionally provide a deployment description.

#### Fixed
- Standalone deployment to Cloud Foundry no longer returns an error.

## [1.1.0] - 2021-02-05
#### Added
- Initial Version
- Consolidated the existing `Fiori elements` and `Fiori freestyle` generators into one. The first step of the combined generator will ask you to choose which type of application you would like to generate.
- Added support for deployment configuration as part of generation. Users can now choose to add either Cloud Foundry or ABAP deployment configuration using the generator if they wish.
- Added support for Fiori launch pad (FLP) configuration as part of generation.  
- Added a new `Cloud Foundry Application Router Generator` that allows the user to generate generic Cloud Foundry configuration which can then be used with subsequent Fiori projects.
- Added support for custom paths for folder locations in CDS projects.
- The authenticated username is now displayed alongside the saved system name when using VSCode.
