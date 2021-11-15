# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.4.1] - 2021-11-11
#### Added
- Generating an Analytical List Page application with an OData V4 data source will now default to a table type of `AnalyticalTable`, and the user will no longer be asked to choose a table type.  The user can change this table type after generation using the Page Editor tool.

#### Changed
- Fiori generator for application type `SAPUI5 freestyle` now consumes the open source Freestyle templates published [here](https://github.com/SAP/open-ux-tools).

### Fixed
- Saved SAP systems should not ask the user to re-authenticate when being used with the Fiori generator in VSCode, unless needed.

## [1.4.0] - 2021-10-28
#### Added
- UUA Authentication is now supported during deployment without launching a browser, as long as the relevant authentication parameters are supplied. See the SAP Fiori tools help portal for full details.

### Fixed
- Generating an application into a CAP project no longer adds unnecessary npm dependencies.
- Destinations in SAP Business Application Studio are now filtered to show only those that can be used in the generator.

## [1.3.7] - 2021-10-14
#### Added
- A new npm script for ABAP deployment configuration has been added, `deploy-test`.  Using this target will allow you to validate your deployment configuration without actually deploying.

## [1.3.6] - 2021-10-07
### Fixed
- OData services that require a querystring parameter in the URL are now supported.

## [1.3.5] - 2021-09-30
#### Added
- The Fiori command line tools now has help context information available.  Typing `npx fiori help` will give the user a list of commands that the Fiori command line tools support.  Help text for individual Fiori commands can also be displayed, e.g. `npx fiori add help`.

### Fixed
- Adding deployment configuration to a Fiori application with an existng MTA project should now successfully update the `mta.yaml` and `package.json` files in the parent folder.
- Fixed standalone deployment configuration for Cloud Foundry destinations.
- The Fiori generator no longer crashes if the Cloud Foundry account does not match that configured in SAP Business Application Studio.

## [1.3.3] - 2021-09-16
#### Added
- The generator now supports optionally adding eslint validation to the generated project.  Choosing this option from the advanced options of the generator will add the eslint libraries and a new target `npm run lint` to perform the validation.
- ABAP deployment now allows the user to provide a project ZIP file from either the local filesystem or from a remote URL.
- Successful deployment to Cloud Foundry will provide instructions on how to retreive the URL of the deployed application.
- Using the `CF Application Router Generator` for generating a multi-targeted application no longer asks for the version of the MTA, but will default to `0.0.1` in the generated `mta.yaml` file.

### Fixed
- Better handling for destinations with SAML authentication.
- Deployment logic updated to ensure only files in the `dist` folder are uploaded.
- Better support for long MTA identifier names during Cloud Foundry deployment.
- Improved support for project folders with spaces with the generator.

## [1.3.2] - 2021-09-02
#### Added
- Added ability to optionally include UI5 code assistance libraries to the generated application by choosing it in the advanced options of the generator.
- Using a Saved System in VSCode will now ask the user to re-authenticate if the saved credentials are no longer valid.

### Fixed
- Fixed an issue which caused the Fiori generator to crash when connecting to a Cloud Foundry service if the SAP Business Application Studio subaccount is not the same as the Cloud Foundry organisation.

## [1.3.1] - 2021-08-19
#### Added
- Added support for generating Fiori applications using the SAP API Business Hub from the Service Center in Business Application Studio.
- Non identifiable and optional telemetry data has been added for deployment.

### Fixed
- The `minUI5Version` version in the generated `manifest.json` file now details the UI5 version used during generation.
- Improved support for detecting Reuse libraries in the local workspace.

## [1.3.0] - 2021-07-28
### Fixed
- Fixed an issue which caused the Fiori generator to crash due to presence of multiple schemas in the metadata file
- Fixed an issue where generated project was missing undeploy script when deploy config was created for Cloud Foundry environment
- Fixed an issue where the cloned reuse library with missing description in i18 file was not being listed for being added as a reference


## [1.2.5] - 2021-07-22
#### Added
- Added support for Cloud Foundry deployment configuration during non-interactive generation.

### Fixed
- Better support for determining if pre-requisite `mta` library is installed before attempting to add Cloud Foundry deployment configuration.
- Removed erroneous telemetry error messages when using the generator from the command line.
- Fixed the deployment name character restrictions for ABAP deployment. 

## [1.2.4] - 2021-07-08
#### Added
- Destinations configured with a service URL endpoint, or a hostname, can now be used with the Fiori generator in Business Application Studio.
- Reuse components and libraries in the local workspace can now be added to your project.  Use the command palette entry `Fiori: Add Reference to SAP Fiori Reusable Libraries` to invoke this functionality.

### Fixed
- In Business Application Studio, the Cloud Foundry Destination dropdown in the Deployment Configuration step of the Generator should now successfully return all available destinations.

## [1.2.3] - 2021-06-24
#### Added
- Deploying to a system that requires authentication will now prompt for a username and password if a local `.env` file with the credentials is not present.
- Installing the generator in a custom location is now supported.

### Fixed
- Freestyle applications generated for a CAP project will no longer contain invalid test artefacts.
- The `start-local` npm target now works with the SAP Belize theme.
- Deleting a saved SAP system from VSCode now also deletes the authentication token from the secure storage.
- Deployed Fiori elements applications now correctly display the application title.

## [1.2.1] - 2021-06-10
#### Added
- Added support for the Service Center in Business Application Studio.  Services selected in the Service Center can now be used with the Fiori generator and the user will not be asked to provide a data source during generation, the selected service from the Service Center will be used instead.
- Added support for Destinations in Business Application Studio that have been configured with a service endpoint URL rather than a catalog service.

### Fixed
- Requesting authentication for a saved system in VSCode no longer launches multiple browsers to authenticate. Only one browser should now open.
- Browser title for deployed applications now correctly displays the application title.
- Upgraded UI5 libraries to resolve security vulnerabilities.

## [1.2.0] - 2021-05-28
### Fixed
- The Fiori generator will be automatically installed if it is invoked from the command palette in VSCode and not already installed.
- Projects migrated from WebIDE to Business Application Studio can now be deployed.
- Migrated projects now include an OPA test script where applicable.

## [1.1.11] - 2021-05-14
#### Added
- Added support to include undeployment script (check `undeploy` script in package.json) when deployment configuration is generated for ABAP systems.

#### Fixed
- To ensure consistency, all generated V2, V4 or CAP applications will now have a header bar and preview will launch the application in a browser directly without showing Fiori launchpad first

## [1.1.10] - 2021-04-29
#### Added
- Improved the destination catalog service request to ensure the list of services returned is filtered to those suitable for Fiori applications.  Note: the catalog service needs to also be updated to accommodate this change, if not, the existing list is returned.

#### Fixed
- The Fiori migration wizard on Business Application Studio no longer asks for the client field.

## [1.1.9] - 2021-04-15
#### Added
- Fiori elements applications generated with the following floor plans now have simple OPA automated tests generated with the project:
	- List Report Object Page (with either a V2 or V4 OData service)
	- Analytical List Page (with an V4 OData service)
- Added Ability to generate a Fiori freestyle application from the command line in a non-interactive mode.
- Floor plan icons in the generator have been updated.
- The deployment configuration questions have been reduced where system information can already be determined.
- The generator now requires [MTA](https://www.npmjs.com/package/mta) Node.js package (version 1.0 or higher) to be installed globally.  Please ensure you have updated by executing `npm install -g mta`.

#### Fixed
- Navigating back and forwards within the wizard should not lose previously completed steps.
- The generator will no longer suggest the first folder in a workspace to generate the application into.
- Better handling of long module names for deployment
- The generator README.MD file now correctly details the floor plan used.

## [1.1.7] - 2021-04-01
#### Added
- Uploading a metadata document for V4 OData services is now supported.
- Better error messaging when the destination in Business Application Studio is not available.

#### Fixed
- The freestyle floor plans now correctly generate for a CAP project.
- Going back from deployment to the project attributes step in the wizard now retains the data between steps.
- Adding launchpad config on the command line can now overwrite existing configuration if desired.

## [1.1.6] - 2021-03-26
#### Fixed
- Adding Cloud Foundry deployment configuration in Business Application Studio during generation no longer results in an error.

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
