# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).


## [1.11.3] - 2023-10-18
### Changed
- Updated the generator to automatically select the default value in a dropdown list of options if only one option is available, thereby decreasing the number of clicks the user needs to perform
- The generator should now warn the user if Node.js is not installed before use
- Updated the manifest for OData V4 services using UI5 version 1.94 or higher to now use the `contextPath` instead of `entitySet`.

### Fixed
- The FLP configuration wizard no longer writes out the value `{{flpSubtitle}}` in the launchpad if the optional subtitle for FLP is not provided.

## [1.11.2] - 2023-10-04
### Changed
- Changed the Basic template generated to also generate Typescript OPA tests when the user chooses to generate their application with Typescript support

### Fixed
- Fixed an issue with the latest version of VSCode (1.83) not supporting storing and retrieving credentials from secure storage of the operating system for use with SAP saved systems
- Fixed an issue with CAP projects not using a valid version of the `cds-ui5-plugin` library when choosing to use npm workspaces during generation
- Fixed an issue where using uppercase characters for the project namespace during generation would lead to invalid applications that could not be previewed

## [1.11.1] - 2023-09-21
### Changed
- Removed the experimental warning that was being displayed when choosing TypeScript during generation

### Fixed
- Fixed an issue where generating an SAP Fiori app as part of the `Full-Stack Application Using Productivity Tools` Dev Space in SAP Business Application Studio could generate an invalid `manifest.json` file
- Fixed an issue where some local CAP projects were not being correctly detected as valid data sources during generation
- Fixed an issue with generating an invalid key in the `manifest.json` file if the data source contained forward slashes
- Fixed an issue where ABAP deployment was incorrectly requesting authentication details when being deployed in a CI/CD environment

## [1.11.0] - 2023-09-07
### Added
- Added the ability to generate a SAP Fiori app in VSCode with a self-signed or untrusted root CA

### Fixed
- Fixed an issue when running SAP Fiori application resulted in an error due to missing `sap.cloud` property in manifest.json
- Fixed an issue when Reuse Library Reference generator crashes when reference to a library is added to an exisitng library type project
- Fixed an issue with generator which was launching app info page instead of page map in Low-Code-Base Full-Stack Cloud Application type dev space

## [1.10.6] - 2023-08-24
### Added
- Added ability to retain developer personalization settings for local preview on refresh or restart.

### Changed
- Updated deprecation message for Fiori freestyle templates to indicate when they will be removed.
- The Fiori module name suggested during generation will now increment if the default suggested name already exists.  For example, the suggested module name will increment from `project1` to `project2` if  the module `project1` already exists.
- Changed the data source name `SAP API Business Hub` to be `SAP Business Accelerator Hub` to reflect the branding change in SAP Business Application Studio.

### Fixed
- Fixed an issue where deploying a TypeScript application to an ABAP system would not include the TypeScript source artifacts in the deployed BSP.
- Adding deployment configuration after generation using the wizard now correctly displays the already answered questions in the side panel.
- Fixed an issue where the list of transport requests could not be retrieved during deployment configuration if the repository name or package name contained a namespace.

## [1.10.5] - 2023-08-10
### Added
- Added option to create Fiori launchpad configuration after generation using a wizard style approach rather than needing to use the command line.  Users can use the command palette option `Fiori: Add Fiori Launchpad Configuration` to launch the wizard.
- Added Guided Answers link for deployment failures due to an invalid SSL certificate being used.

### Changed
- Updated error messages to more clearly detail when you cannot use a V2 catalog service with the choosen SAP Fiori template.
- Updated `cds-ui5-plugin` library version in generated CAP projects to support CDS V7.

### Fixed
- Fixed an issue with deployment not using credentials supplied with the command line deploy target.
- Fixed an issue where the deployment configuration wizard would not launch if the application was configured with managed app router support.
- Fixed an issue with the un-deploy command not using credentials in local `.env` file.
- Fixed an invalid URL link in the `readme.md` generated for an SAP Fiori application in a CAP project.

## [1.10.4] - 2023-07-27
### Added
- Added abililty for users to create an ABAP transport request during deployment.
- Added option to generate UI annotations during generation if there are none already available for a Java CAP project.
- Added a new VS Code command `Fiori: Deploy Application` to allow users to deploy their application from the command palette.  

### Fixed
- Fixed an issue where deployment could fail even when the correct credentials were passed as command line arguments.

## [1.10.3] - 2023-07-13
### Added
- Added support for @sap/cds version 7.

### Fixed
- Fixed issue where failed ABAP deployment would not exit with an error code.
- Fixed an issue where the list of transport requests provided during deployment configuration could fail if the package name contains a forward slash.

### Changed
- The Fiori generator now consumes ABAP deployment logic from open source, which is published [here](https://github.com/SAP/open-ux-tools).

## [1.10.2] - 2023-06-29
### Fixed
- Fixed an issue where reference to a local Reuse Library was added as an absolute path rather than relative path to an existing Fiori project.

### Changed
- SAP Fiori projects generated in dev space type `Full-Stack Application Using Productivity Tools` will now have the `minUI5Version` as 1.108.7.

## [1.10.1] - 2023-06-15
### Added
- Added option for generating SAP Fiori applications in a CAP project with TypeScript support.
- Added ability to create new reusable libraries that can be referenced in SAP Fiori applications.  Users can launch this generator from the command palette entry `Fiori: Open Reusable Library Generator`.

## [1.10.0] - 2023-06-01
### Added
- Added a warning when choosing to automatically add table columns during generation if the metadata service is larger than 1Mb, as this can significantly increase the time it takes to generate the application.

### Fixed
- Fixed an issue where the list of local CAP projects available as the data source in the Fiori generator would sometimes show an invalid CAP project.

## [1.9.7] - 2023-05-18
### Added
- Added ability for customers to create a sub-generator that allows them to customize some of the project attributes and add their own steps and writing logic to the generated Fiori application.  For more details, please see https://github.com/SAP-samples/fiori-tools-samples/sample-fiori-gen-ext.
- Added support for migrating extension projects that were generated with WebIDE personal edition.

### Changed
- Migrating re-use libraries no longer launches the SAP Fiori application information page, as this was invalid for these type of applications.

### Fixed
- Fixed an issue with linting failures for applications generated with TypeScript support.
- Fixed an issue with invalid custom controller TypeScript files being generated for the Custom Page template. 
 
## [1.9.6] - 2023-05-03
### Added
- Added the description of the transport request alongside the transport request number when configuring your application for ABAP deployment.
- Added warning message when choosing to generate an application with TypeScript support (requires version 1.11.1 or higher of the Application Wizard).

### Fixed
- Fixed an issue where applications deployed using a service from the API Business Hub Enterprise would not be found in the BTP cockpit.
- Fixed an issue where SAP Fiori freestyle projects being generated for CAP applications were being incorrectly identified as SAP Fiori elements projects.

## [1.9.5] - 2023-04-19
### Changed
- When selecting a CAP project using the SAP Fiori generator, if multiple CAP projects with the same name exist in the workspace, these projects will be prefixed with their folder path for easier identification.
- Deployment long text console output that are clickable links will now have a message to say that the link can be clicked for more information.

### Fixed
- Fixed an issue with generated SAP Fiori projects having eslint errors.
- Fixed support for the managed application router with SAP Fiori applications generated using the API Business Hub Enterprise on SAP Business Application Studio.

## [1.9.4] - 2023-04-05
### Added
- Adding ABAP deployment configuration can now optionally retrieve the list of packages from the backend ABAP system.  Users can still manually provide a package if the list cannot be fetched from the ABAP system.  Note: This feature requires version 1.10.9 or higher of the Application Wizard, lower versions will require the user to manually provide the package name as currently.

### Changed
- The `locate-reuse-lib.js` file, used to find any custom reuse libraries referenced in the manifest file, has been moved to the `webapp\test` folder.

### Fixed
- Fixed identified security vulnerabilities in the generated `locate-reuse-lib.js` file.
- Fixed issue when adding Cloud Foundry deployment configuration to a generated project where the destination option of `None` was incorrectly displayed.

## [1.9.3] - 2023-03-23
### Changed
- The SAP Fiori freestyle templates `SAP Fiori Worklist Application` and `SAP Fiori List-Detail Application` have been deprecated and are now reorganised into a `Deprecated Templates` section when choosing your template type.  The Basic `SAPUI5 Application` template has been renamed to `Basic` and is the first template available within the SAP Fiori templates.

### Fixed
- Fixed an issue where adding Cloud Foundry deployment configuration in VS Code to an existing SAP Fiori application could incorrectly display the service URL as the deployment target.

## [1.9.2] - 2023-03-09
### Added
- Adding deployment configuration for ABAP targets using the `npm run deploy-config` command line option will now allow you to select the package from the backend instead of having to type it manually.

### Changed
- Changed deployment configuration for extension projects to only support ABAP targets.
- Updated the version of `@ui5/cli` to version 3.  Generated projects now require Node.js version 16.18 or higher.

### Fixed
- Fixed issue with local preview for the SAP Fiori freestyle List-Detail application when generating with TypeScript support.

## [1.9.1] - 2023-02-23
### Added
- Added answers to the side panel of the Fiori generator so users can easily see the already answered questions.
- Added Cloud Foundry support for instance based destinations defined locally in the project `mta.yaml` file.

### Changed
- Filtered services from the catalog request that are not suitable for generating a Fiori application. 

### Fixed
- Fixed an issue with previewing Fiori freestyle applications that were generated using TypeScript.
- Fixed Fiori generator crash when handling an OData source with invalid metadata.

## [1.9.0] - 2023-02-09
### Added
- Added option to generate SAP Fiori freestyle applications with TypeScript support (experimental).

### Changed
- Updated the Fiori deployment configuration wizard to support editing existing deployment configuration.
- Improved the error message for CAP project compilation failure using the generator.

### Fixed
- Fixed an issue where users could generate their SAP Fiori application with a manifest ID greater than the permitted 70 characters.
 
## [1.8.6] - 2023-01-26
### Added
- Added option to generate SAP Fiori elements applications with TypeScript support (experimental).

### Changed
- Updated ABAP deployment to support displaying debug log messages when either archiving the project for deployment, or from the backend service during deployment.
- Updated error message if undeployment of an application fails.  The new message mentions that the application may have already been undeployed.
- Removed the unneeded `annotation.xml` file generated as part of a Fiori application in a CAP project.

### Fixed
- Fixed an issue with using the deployment configuration generator for projects previously generated with the API Business Enterprise Hub in Business Application Studio.

## [1.8.5] - 2023-01-12
### Added
- Added ability to automatically detect local CAP projects in your workspace when choosing CAP as the data source during Fiori generation.
- Added an option to create deployment configuration for an existing Fiori application using a wizard style approach rather than needing to use the command line.  Users can use the command palette option `Fiori: Add Deployment Configuration` to launch the wizard.
- Added links to launch SAP Guided Answers for common issues found during generation to help customers troubleshoot issues.

## [1.8.4] - 2022-12-16
### Fixed
- Fixed an issue where project path was incorrectly added to telemetry data.

## [1.8.3] - 2022-12-01
### Added
- Generator will now show its name and version at the header level of YUI wizard for easy access of information.

### Fixed
- Fixed an issue where creation of deployment configuration was incorrectly allowed for steampunk system not configured as Extensibility Development system.

## [1.8.2] - 2022-11-17
### Added
- Added an option to create a transport request when adding ABAP deployment configuration to an SAP Fiori project.

### Fixed
- Fixed an issue where adding a saved system was not available when adding deployment configuration during generation.
- Adding TypeScript support and Javascript Code Assist support in the same project no longer causes the preview to fail.
- Fixed issue with launch configuration not being created when adding an SAP Fiori project to a workspace with an existing MTA project.
- Fixed issue where SAPUI5 ABAP Repository name was being reset when the package name was provided during deployment configuration.

## [1.8.1] - 2022-11-03
### Added
- Added ability to directly launch SAP Guided Answers and display the relevant guide for some errors that occur during generation.

### Fixed
- Fixed an issue where adding deployment configuration to an existing SAP Fiori application from the command line would fail in VS Code.

## [1.8.0] - 2022-10-20
### Added
- Added an option `Enable TypeScript` under `Advanced Configuration` to create an SAPUI5 application with TypeScript support.
- Added ability to choose a saved system in VSCode when selecting a deployment target environment.

### Changed
- Updated the name and description of templates to improve the presentation of respective project types being generated.

### Fixed
- Fixed an issue where `$tmp` instead of blank is displayed as default deployment package name for SAP BTP ABAP Environment.

## [1.7.6] - 2022-10-06
### Added
- Added a check to determine if the OData source provided during generation uses a self-signed certificate and, if so, we display a more meaningful error message.

### Changed
- Removed the `generateManifestBundle` task from build scripts created with the SAP Fiori generator, since it's no longer needed.
- Updated SAP Fiori applications generated using the flexible programming model to incorporate the `sap.fe.macros` namespace. 

## [1.7.5] - 2022-09-22
### Added
- Added an option to create an SAP Fiori elements application based on the flexible programming model approach.
- Added support for generating and deploying SAP Fiori applications from the API Business Hub Enterprise in SAP Business Application Studio.

### Changed
- Updated the local preview of an application to use latest released SAPUI5 version if the choosen version in the project is not available on NPM.

### Fixed
- Fixed an issue that potentially resulted in the migration tool getting stuck during the migration of SAP Fiori projects.
- Fixed issue causing the SAP Fiori generator to crash when choosing the Form Entry Object Page floorplan with a data source from a project-specific destination in SAP Business Application Studio.

## [1.7.4] - 2022-09-08
### Added
- Added option to choose your transport request during ABAP deployment configuration from a list of available requests when applicable.

### Fixed
- Fixed issue with ABAP deployment where the deployment description could not include special characters.

### Changed
- Updated floorplan icons in SAP Fiori generator to reflect latest Horizon theme.

## [1.7.3] - 2022-08-25
### Fixed
- Fixed an issue where some CAP Java projects were not being correctly identified as Java projects in the Fiori generator.

## [1.7.1] - 2022-08-10
### Added
- Added links to Guided Answers for easier troubleshooting of deployment issues arising due to unavailability of SAPUI5 ABAP Repository service.

### Fixed
- Fixed an issue where Form Entry Object Page (FEOP) could not be selected from a V4 service in the SAP Business Application Studio Service Centre.

## [1.7.0] - 2022-07-27
### Added
- Added two new SAPUI5 themes - `Morning Horizon` and `Evening Horizon` with `Morning Horizon` as a default theme if Minimum SAPUI5 version selected is 1.102 and above.
- Added links to Guided Answers for easier troubleshooting of generator issues arising due to misconfiguration of SAP BTP destinations.

### Fixed
- Fixed issue where generator crashed without internet connection.
- Fixed issue where invalid input was allowed for SAPUI5 ABAP Repository field during deployment config generation.

## [1.6.7] - 2022-07-21
### Changed
- Generating an SAP Fiori application with Cloud Foundry deployment configuration into a NodeJS or JAVA CAP project will now add Cloud Foundry build and deploy commands to the root `package.json` if not already present.

## [1.6.6] - 2022-07-07
### Added
- Added ability to import and export saved ABAP On-premise SAP Systems when using VSCode. Credential information is not exported and users therefore need to re-authenticate when importing.

### Fixed
- Fixed issue where saving an SAP System in VSCode would crash if the system name was not provided.
- Fixed issue with back navigation when adding deployment configuration in SAP Business Application Studio.
 
## [1.6.4] - 2022-06-23
### Added
- Added a check when using a destination in SAP Business Application Studio with the Fiori generator to ensure that the destination catalog service(s) can be found.

#### Changed
- Changed deployment configuration with clear text and hints whilst enforcing transport request validation where applicable.

### Fixed
- Fixed issue where an invalid saved SAP System in Windows was not displaying the correct error message.
- Fixed ABAP deployment issue where user could be asked to re-authenticate against backend even if they had already authenticated successfully.

## [1.6.3] - 2022-06-09
### Added
- The list of minimum SAPUI5 versions available during project generation are now grouped into `maintained versions` and `out of maintenance versions` for easy reference.
- Added a check when deploying to an existing SAPUI5 ABAP repository with a new SAP App ID.  Previously the deployment would overwrite the existing one, now the user is asked to confirm the overwrite.

### Fixed
- Fixed an issue where the CDS watch script for an SAP Fiori application in a Node.js CAP project was not getting created.
- Fixed an issue where the previews are failing for a Fiori Freestyle application when created with Data Source as `None`.
- Fixed an issue where the reuse library referenced in an existing project was not being loaded from the local workspace.

## [1.6.1] - 2022-05-26
### Added
- Added unique non-identifable `toolsId` identifer to the manifest.json file for generated projects to support telemetry.

#### Changed
- Updated validation of Node.js CAP data sources to detail if the compilation of the services failed.
- Improved the error message when an OData service URL provided does not reference an OData service.

### Fixed
- Fixed issue when using API Business Hub in SAP Business Application Studio with local preview.
- Fixed issue where the Generator would not follow http redirects for an OData service URL.

## [1.6.0] - 2022-05-12
### Added
- Added support for the SAP Fiori elements Overview Page floorplan with an OData V4 data source.
- Added Ability to generate Cloud Foundry deployment configuration for an existing SAP Fiori project in a non-interactive mode.

#### Changed
- Updated the launch targets generated for a SAP Fiori application in VSCode to remove those allowing you to specify an SAPUI5 version at runtime.  Please use the Fiori Run Configurations tool to change the version of SAPUI5 needed.
 
### Fixed
- Fixed issue where adding an SAP Fiori application to a JAVA Cap Project may fail to start if the relevant plugins and configuration were not already present in the project. These updates are now added as part of generation if needed.
- Fixed the Form Entry Object Page floorplan to only accept OData V4 services.

## [1.5.5] - 2022-04-28
### Added
- Added support for the SAP Fiori elements Worklist floorplan with an OData V4 data source.

#### Changed
- Adding a new system during generation will now display the username of the user after authentication to the system.
- The deployment name is no longer automatically populated from the module name when adding deployment configuration.

### Fixed
- Fixed CAP services retrieval to support services defined in nested folders in CAP projects.

## [1.5.4] - 2022-04-14
### Added
- Added support for instance based destinations in deployment configuration for local Node.js CAP projects in SAP Business Application Studio.

#### Changed
- Fiori generator for application type `SAP Fiori elements` now consumes the open source SAP Fiori elements templates published [here](https://github.com/SAP/open-ux-tools).

### Fixed
- Fixed bug where VSCode launch configuration would not start the project correctly in certain situations.
- Fixed issue where the Fiori generator would allow the user to continue if the mandatory navigation entity was not selected.

## [1.5.3] - 2022-03-31
### Added
- Added support for creating new saved SAP systems in VSCode.  Users can click on the '+' icon and select to create an ABAP on Premise or ABAP Environment on SAP Business Technology Platform saved system.  Users must test the connection to validate it connects before saving.

#### Changed
- Determining if telemetry data is to be captured during generation is now determined from the global SAP Fiori tools setting in the command palette: `Fiori: Change Telemetry Settings`.

### Fixed
- Fixed bug where message longtexts were not displayed in the console for ABAP deployment errors.  These can be copied and pasted into the browser for more details.
- Fixed bug where the SAP Fiori generator could crash if the project folder location was read-only.
- Fixed error where SAP Fiori freestyle projects with an uploaded metadata file were not being validated correctly.

## [1.5.2] - 2022-03-17
### Fixed
- Fixed invalid xs-security.json file location when using generator in non-interactive mode for CAP projects.
- Fixed launch configurations in VSCode when the Fiori project is generated inside an MTA subfolder.
- Fixed bug where App Router configuration needed to be added to an MTA.yaml file before Fiori deployment configuration.
- Fixed issue with deployment errors containing longtext messages that did not have the associated URL clickable.

## [1.5.1] - 2022-03-03
#### Added
- Added warning during deployment if deploying to an ABAP system that uses a lower version of SAPUI5 than that specified as the minimum SAPUI5 version in the SAP Fiori project being deployed.

#### Changed
- Added entity selection details to the `README.md` file for a generated SAP Fiori application.

### Fixed
- Fixed issue with generated applications not working with SAPUI5 versions greater than or equal to 1.100.0
- The `start-variants-management` script will not be available if the SAP Fiori project was generated by uploading a metadata document rather than using a live service.

## [1.5.0] - 2022-02-17
#### Added
- Added support for editing saved SAP systems in VSCode by selecting the saved system from the SAP Systems list and updating as needed.  Users must test the connection to validate it connects before saving.
- Added support for matching the suggested minimum SAPUI5 version with the backend ABAP system, where applicable.  The SAPUI5 version dropdown will now default to the same version of SAPUI5 if the data source provided is an ABAP backend and the SAPUI5 version can be determined. 

#### Changed
- Removed the `Latest` label from the list of minimum SAPUI5 versions.  The version of SAPUI5 choosen during generation will now be a fixed version from that selected.
- Generated applications with a OData V2 data source now use an external mockserver for mock support, rather than the SAPUI5 client side mock.

### Fixed
- The generated `README.md` file now correctly details if the application was generated with the Fiori elements or Fiori freestlye generator.

## [1.4.7] - 2022-02-03
#### Changed
- Updated the `Analytical List Page` floorplan, when used with an V4 OData service, to now only support version 1.90 and above of SAPUI5.  This enables the generated project to adhere to the latest recommended configuration.
- Updated the local preview `npm` targets to not use the browser cache to ensure the latest updates are being reflected in the browser.
- Removed unneeded i18n references from the generated manifest file.

### Fixed
- Fixed an issue where the Fiori generator would crash if attempting to connect to an on-premise system using SAML in VSCode.

## [1.4.6] - 2022-01-20
#### Added
- Generating an SAP Fiori freestyle application will launch the `Application Info` page for that application after generation completes. 

#### Changed
- The SAP Fiori freestyle template `SAP Fiori Master-Detail Application` has been renamed `SAP Fiori List-Detail Application`.

### Fixed
- Starting your SAP Fiori application from the launch/debug configuration with a specified version of UI5 will now use that specific version of UI5.
- Fixed linting errors displayed after application is deployed.
- SAP Fiori freestyle applications generated with a CAP project no longer identify as SAP Fiori elements applications within the SAP Fiori tools suite.

## [1.4.4] - 2021-12-09
#### Added
- Added support for the experimental SAP Horizon theme, as long as a supported version of UI5 is selected during generation.

#### Changed
- Choosing the UI5 version for your application is no longer under `Advanced Options` and is now directly on the `Project Attributes` step for better visibility.

### Fixed
- Selecting a Fiori freestyle SAPUI5 template with no datasource no longer crashes the generator.
- Performing a test deployment no longer reports the result as an error unless the test deployment fails.

## [1.4.3] - 2021-11-25
#### Added
- A new SAP Fiori elements floor plan is now available.  The `Form Entry Object Page` floor plan for V4 OData sources allows you to create an SAP Fiori application with an object page for data entry.
- The `List Report Object Page` floor plan and the new `Form Entry Object Page` floor plan can now optionally generate UI annotations during generation if there are none already available in the supplied data source.  **Note:** This is an experimental feature and can be switched off by disabling the `Sap › Ux › Application Modeler: Enable Experimental Features` option in the settings.

#### Changed
- Generated applications now use the Fiori CLI in the generated launch configuration to start the application.

### Fixed
- Fixed crash in the `CF Application Router` generator if an MTA ID with invalid characters is provided.
- Using the SAP Fiori generator from the command line in Business Application Studio now supports data sources using the API Business Hub.
- Generating a SAP Fiori freestyle application into a CAP project with an `mta.yaml` file should now launch successfully.
- Using a Java CAP project with the SAP Fiori generator no longer requires a `package.json` file in the root folder.

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
