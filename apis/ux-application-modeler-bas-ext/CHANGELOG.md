# Change Log
All notable changes to this project are documented in this file.

Items marked as [experimental] are subject to change.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.11.4] - 2023-11-01
### Added
- Added an information panel to the activity bar item of SAP Fiori tools

### Changed 
- Enhanced the validation check for the creation of OData V2-based custom columns ensuring that an existing fragment is reused for further columns
- Enhanced the performance for the application modeler tree view: in the case of multiple apps in the project, a lazy load mechanism prevents the generation of all page configurations and schemas right from the start

### Fixed
- Fixed an issue with selected item focus in dropdown menus
- Fixed an issue with touch events outside the menu not closing the dropdown
- Fixed an issue with error messages shown on Page Map not disappearing after correcting the root cause
- Fixed an issue with an empty string being considered invalid for `ValueListForValidation` annotation preventing the creation of new pages in the Page Map
- Fixed an issue with the filter icon becoming invisible when resizing the Page Map
- Fixed an issue with the Add Custom Column dialog that offered to select existing functions for a newly created handler file
- Fixed an issue with reuse libraries being wrongly offered for run configurations
- Fixed an issue with sections being displayed in selection dialogs for anchors showing the i18n key instead of the text
- Fixed an issue with SAPUI5 flexibility changes created for contact person details on object page subsections of OData V2-based applications

## [1.11.3] - 2023-10-18
### Added
- Enabled adding and maintaining filter fields based on associated properties
- Added an enhanced visualization of error situations to the Page Map and Page Editor

### Changed
- Changed the minimum required [NodeJS](https://nodejs.org/en/download) version to 18.14.2 or higher

### Fixed
- Fixed an issue with the warning indicator missing in the application modeler tree view
- Fixed an issue with dropdown boxes auto-selecting the wrong entry
- Fixed an issue with extensions being allowed to be anchored on itself on creation
- Fixed several issues with navigation to source code when working with building blocks (experimental)
- Fixed an issue with a missing key property for action group building blocks (experimental)
- Fixed an issue with an incorrect tab key being written to manifest when setting the tab key to empty in the Page Editor property panel
- Fixed an issue with the Page Map being able to add pages for the same navigation property multiple times
- Fixed an issue with the Page Editor losing selection focus when refreshing on manual external changes in the source file
- Fixed an issue with scrolling via touch screen in the Page Editor property panel
- Fixed several minor UX issues in dropdown boxes 

## [1.11.2] - 2023-10-04
### Added
- Added the support for custom header sections for OData V4-based applications in conjunction with `@sap/ux-specification` versions 1.84.75, 1.96.49, 1.108.16 or higher
- Added the support for custom filter fields for OData V4-based applications in conjunction with `@sap/ux-specification` versions 1.84.75, 1.96.49, 1.108.16 or higher
- Added the support for standard actions (like "Share") and their properties for OData V2-based applications in conjunction with `@sap/ux-specification` versions 1.71.95, 1.84.75, 1.96.49, 1.108.16 or higher
- Added tiles for test deployment and undeploy features of libraries to their Application Information Page
- Added the support for launching the Application Info page after migrating a reusable library to be compatible with SAP Fiori tools

### Fixed
- Fixed an issue with an already used custom column fragment not being presented as the only valid option to store new custom columns for OData V2-based applications

## [1.11.1] - 2023-09-20
### Fixed
- Fixed an issue with the dropdown control for the Add Contact Column dialog in the Page Editor
- Fixed an issue with Unicode characters not being shown correctly in the application modeler tree view
- Fixed an issue where moving multiple custom columns per drag & drop to the first position didn't work with the Page Editor and OData V2-based applications
- Fixed issues with adding custom columns not being successful with Page Editor and OData V2-based applications in conjunction with `@sap/ux-specification` versions 1.71.94, 1.84.74, 1.96.48, 1.108.14 or higher
- Fixed an issue with custom pages as root pages of an application not offering the correct navigation targets for creating new pages in the Page Map
- Fixed an issue with the minimum SAPUI5 version not being considered when the version of `@sap/ux-specification` that should be installed on the Application Info page is being determined

## [1.11.0] - 2023-09-06
### Added
- Added support for projects of the type library to the Application Information Page; renamed the labels to reduce redundancy and make them sound more general
- Added the run configuration to the preview command, hence developers can now access all preview options for an application in one place
- Migration view now informs if Node.JS is not installed when migrating SAP Fiori projects in VSCode
- Enabled adding, maintaining, and deleting the semantically connected fields in Form and Identification sections residing in the content area of the Object Pages

### Fixed
- Fixed an issue with missing tiles for test deployment and undeployment operations on the Application Information Page
- Fixed an issue with the preview throwing an error when trying to start an SAPUI5 freestyle application via the preview command
- Fixed an issue in the migration view when deleted projects are not removed from the migration table after refresh

## [1.10.6] - 2023-08-23
### Added
- Added feature tiles `Maintain Mockdata` and `Manage XML Annotations` to the Application Info Page of SAPUI5 freestyle applications

### Changed
- Enhanced the version picker of the command `Fiori: Change the Minimum SAPUI5 Version` to separate between still-maintained and out-of-maintenance versions
- Allow properties that were selected as part of the header section to be added to the body section of an Object Page and vice versa
- Updated the Application Info Page being launched after the migration of a project to show the status of the node modules being installed

### Fixed
- Fixed an issue with new manifest entries for custom views not considering the namespace of the application
- Fixed an issue with the first-time installation of `@sap/ux-specification` for a project that required a dev environment reload. The reload is still required for an upgrade to take effect
- Fixed an issue with the Application Info Page incorrectly offering an `@sap/ux-specification` upgrade to a higher version than the one that matches the defined minimum SAPUI5 version for the application
- Fixed an issue with the local preview of migrated SAP Fiori applications not loading font icons
 
## [1.10.5] - 2023-08-09
### Added
- Enabled static and dynamic hiding of UI elements such as table columns, sections, and section fields

### Fixed
- Fixed an issue with the context menu not being shown in the file explorer for projects that were newly added to the workspace
- Fixed an issue with the application's pages not being displayed in the Application Info Page after `@sap/ux-specification` was installed for the first time for the project
- Fixed an issue with new pages that were added to OData V2-based applications via Page Map not being visualized
- Fixed an issue with the Page Editor outline not having a maximum width
- Fixed an issue with the Page Editor coming back up when quickly navigating to the Page Map after a property change
- Fixed an issue with action divider colors in the Page Editor
- Fixed an issue with the info tooltip icon being shown although no tooltip was defined in the table dialog of the property panel
- Fixed various inconsistencies related to UI texts

## [1.10.4] - 2023-07-27
### Added
- Enabled enhancing visual filters with fixed values based on properties of numeric, string, and boolean data types 
- Added support for building blocks that were defined using default aggregations (experimental)
- Added support for multiple building block namespaces (experimental)
- Added support for the creation of custom columns/sections for cases when there are no previous annotation-based columns/sections
- Added a warning message for inconsistently defined building blocks in the Page Editor outline (experimental) 

### Changed
- Harmonized error and validation messages across Application Modeler UIs
- Enabled all navigation types in the Page Map in case the source is a custom page
- Increased tolerance of Application Modeler against inconsistencies in the service metadata, e.g., duplicate alias definitions

### Fixed
- Fixed an issue with changes not being saved if the app's name is the prefix of another app's name in the same CAP project
- Fixed an issue with the Light High Contrast theme usage in the Page Map
- Fixed an issue with not being able to create multiple navigations from a **List Report** for multiple views
- Fixed an issue with navigation links not working in the project validation results list
- Fixed an issue with multi-select attempts in the Page Editor always opening the property panel
- Fixed an issue with commands from Application Info Page tiles being started twice when the page was restored after a reload
- Fixed an issue with the context menu not working for a project which is newly added to the workspace

## [1.10.3] - 2023-07-12
### Added
- Added support in the Page Editor for reordering table columns and actions based on building blocks (experimental)
- Added support for the generation of a new method code for custom actions in TypeScript-enabled projects
- Added an option to the Page Map and Page Editor to open the "Output" panel showing the status messages from the Application Modeler to follow up on issues more easily

### Changed
- Changed the functionality of "Go to Code" for building blocks in the outline: it now navigates to the XML source only (experimental)

### Fixed
- Fixed an issue with manually-created action methods not being selectable in a custom action dialog when the dialog was already open in SAP Business Application Studio
- Fixed an issue with missing icons for nodes representing table and chart views in the Page Editor outline view
- Fixed an issue with incorrect context path generation in the Page Map for pages navigating out of a custom page
- Fixed an issue with not showing the edit link in the property panel for value helps after inserting the annotation manually
- Fixed an issue where editing properties of a custom column could result in the removal of another custom column
- Fixed an issue with the `Fiori: Archive Project` command, mistakenly including the `.git` folder

## [1.10.2] - 2023-06-29
### Added
- Added the capability to the Application Info page, Page Map, and Page Editor webviews to restore their previous content when the development environment is reloaded
- Added a `force` flag to the command `Fiori: Delete Application from CAP Project` so programmatic callers can suppress the confirmation dialog
- Added the option in the migration views to **Go Back** (from the **Results** view) and **Refresh** (the project list) so that the migration view doesn't need to be refreshed each time after project migrations

### Fixed
- Fixed an issue with custom sections not showing their `i18n` translated label text in the outline
- Fixed an issue with the **Show Page Editor** button being displayed in toolbars of unrelated webviews
- Fixed an issue with the failing deletion of a Visual Filter

## [1.10.1] - 2023-06-15
### Added
- Added support for building blocks in custom pages and custom sections in OData V4-based applications (experimental)
- Added support of controller artifacts using TypeScript in OData V2-based applications 
- Added support for custom (sub-)sections as part of group sections for OData V4-based applications
- Added `contextPath` support for custom pages in OData V4-based applications
- Added support for CAP projects using workspaces to organize applications and node modules
- Enabled setting the label for default Value Help

### Fixed
- Fixed an issue with drag and drop of multiple items in the Page Editor outline not expanding the target node on hover
- Fixed an issue with the command to change the minimum SAPUI5 version not working for CAP applications

## [1.10.0] - 2023-06-01
### Added
- Added support for `contextPath` in page routing definitions for OData V4-based applications in conjunction with `@sap/ux-specification` versions 1.96.40, 1.108.7 or higher
- Enabled external (outbound) navigation to a different app via the properties "Semantic Object Name" and "Semantic Object Property Mapping" for basic fields and columns. Note: launchpad configuration and inbound navigation in target app must be configured separately.
- Added message when additional value help variants are defined besides the default one 

### Changed
- Enhanced the error messages when starting Page Map or Page Editor to be more helpful in case required node modules are not installed
- Refactored the outline tree of the Page Editor to become a reusable UI component

### Fixed
- Fixed an issue with context menu and command palette entries for preview not available for extension projects

## [1.9.7] - 2023-05-17
### Added
- Enabled the ability to add external navigation actions to tables and sections. This assumes launchpad configuration for app-to-app navigation and inbound configuration in the target app are provided.
- Added support for migrating extension projects that were generated with the personal edition of WebIDE

### Changed
- Enhanced the process for choosing properties from drop-down lists by enabling the ability to search for path segments. Type `/` to start searching for the next segment. Searching by property name remains supported.
- Migrating reuse libraries no longer launches the SAP Fiori application information page, as this was invalid for these types of applications

### Fixed
- Fixed an issue with the display of Page Map tiles when using Light and Dark Modern color themes
- Fixed an issue with Page Editor not working with multiple views on the list report in OData V2-based applications

## [1.9.6] - 2023-05-03
### Added
- Enabled setting default sorting for the Result List table in the value help dialog

### Changed
- Changed the wording in the Application Modeler tree view in case no suitable applications could be found to be in line with other tools

### Fixed
- Fixed an issue with the Application Modeler tree view loading infinitely in case there is a project in the workspace with erroneous files
- Fixed an issue with the `Fiori: Archive Project` command, that an empty `node_modules` folder is not included in the archive anymore

## [1.9.5] - 2023-04-19
### Fixed
- Fixed an issue with the detection of missing node modules in the Application Info Page
- Fixed an issue with the error message not being displayed on "Test Connection" when incomplete data is entered for a new "ABAP On Premise" system

## [1.9.4] - 2023-04-05
### Changed
- Changed the entries of the context menu for the features of SAP Fiori tools to be context-sensitive and grouped. Only entries that are relevant for the project, folder, or file will be shown

### Fixed
- Fixed an issue where the migration of SAP Fiori projects would fail if the manifest file did not contain a `sap.ui5` section

## [1.9.3] - 2023-03-23
### Added
- Enabled defining fields from associated entities in the result list of the value help
- Enabled defining dependent fields in the result list of the value help

### Fixed
- Fixed an issue with the search function not finding properties by their display name
- Fixed an issue with newly created local annotation files missing the xmlns reference
- Fixed an issue with run configurations in SAP Business Application Studio wrongly showing the "Configure Environment" context action
- Fixed placeholder texts for several dropdown boxes to reflect that they don't allow custom values

## [1.9.2] - 2023-03-09
### Changed
- Changed the behaviour of dropdown menus, they now close also on click outside of the modal dialog, and the focus is restored to the input field

### Fixed
- Fixed an issue with incorrect manifest entries, for a new custom action on a multiple entity sets table
- Fixed an issue with erroneous code being created when creating a new controller extension for an object page
- Fixed an issue with some SAP Fiori projects not been correctly identified for migration to support SAP Fiori tools

## [1.9.1] - 2023-02-23
### Added
- Enabled adding, maintaining, and deleting visual filters based on the line chart for properties of types `Edm.Date`, `Edm.Time`, `Edm.DateTime`, and `Edm.DateTimeOffset`
- Enabled adding a custom view as first additional view, thus converting a table into multiple views mode
- Added more tooltips for Page Map tiles

### Changed
- Removed the copy of the app descriptor (manifest) schema in favor of using the one dynamically provided by the UI5 language assistant

### Fixed
- Fixed an issue with the `Fiori: Archive Project` command downloading the wrong file when executed on a project located at the root of a workspace in SAP Business Application Studio
- Fixed an issue with Application Info Page status section showing node modules as missing if the modules are loaded from monorepo
- Fixed an issue with the search input field on Page editor not being cleared when switching pages 

## [1.9.0] - 2023-02-09
### Added
- Enabled setting the display type (value help, text area) for table column values
- Enabled setting the restrictions (mandatory, optional, read only) for table column values
- Added text and text arrangement for chart and visual filter dimensions
- Added page names from manifest to the Page Map tiles
- Added ability to copy the environment check results to clipboard using the command `Fiori: View and Copy results` 

### Changed
- Renamed the "Project Type" property in Application Info Page to "CAP Project Type" and only display it for CAP projects to better fit its intended meaning

### Fixed
- Fixed an issue with cleanup feature not available when an empty extensions section exists in manifest
- Added a missing input check for an already existing handler file if `Create New File` is choosen for a new custom action
- Added a missing input check for duplicate IDs when creating a new custom action
- Fixed the mouse over icon of draggable controller extension entries in Page Map 

## [1.8.6] - 2023-01-26
### Added
- Enabled defining unit of measure or currency, scaling factor and number of fractional digits for the visual filters
- Added support for the creation of multiple outgoing navigations from list reports in Page Map

### Changed
- Lifted the experimental state of annotation support for OData V4 based applications in Application Modeler

### Fixed
- Fixed an issue with reordering of contact column addresses not being reflected correctly in Page Editor
- Fixed an issue with the error message for missing property on create contact column not disappearing after value was set

## [1.8.5] - 2023-01-12
### Added
- Enabled adding, deleting and modifying basic visual filters for analytical apps in conjunction with `@sap/ux-specification` versions 1.96.30, 1.102.15 or higher (experimental)
- Enabled sorting charts and visual filters by measures based on transformation aggregations (experimental)
- Added new action "Add Mockserver Config" (using command `npx @sap-ux/create add mockserver-config`) to Application Info Page
- Added support of custom actions in list report page header
- Added ability to migrate an Extension project so that SAP Fiori tools could be used
- Enabled Environment Check for saved systems in the SAP Systems panel in VSCode
- Added links to SAP Guided Answers to help troubleshoot when using saved systems in the SAP Systems panel

### Changed
- Changed default folder location of controller files for custom actions to `webapp/ext` to be consistent with other generated extension code
- Harmonized the "Add Chart" and "Add Chart View" creation UIs
- Increased screen content stability when toggling descriptions on/off and when using search

### Fixed
- Fixed issues with deletion or reordering of custom actions that could lead to an inconsistent application
- Fixed an issue with keyboard command like ctrl/cmd+c not working for texts in input fields
- Fixed an issue with combo boxes not opening on click in input field content area
- Fixed an issue with tree dropdown input fields select and search

## [1.8.3] - 2022-12-01
### Added
- Added support for creation and maintenance of custom views in list report using OData V4 in conjunction with `@sap/ux-specification` versions 1.96.29, 1.102.14 or higher
- Migration view will now allow adding project(s) manually via `Add Project` button, if the project is not shown in current migration list

### Changed
- Changed label text "Module Name"  to "Application Identifier" in order to be in sync with the content from `manifest.json` being displayed
- Changed outline so that the "Add Chart View" action is now immediately available when the service fulfills the pre-requisites like with the "Add Chart" action on top level
- Improved robustness of run configuration command handling other entries in `launch.json`

### Fixed
- Fixed an issue with the only one available aggregate method not being selectable for virtual measure properties (experimental)
- Fixed various issues, where scroll positions in property panel and outline were not updated or preserved correctly after actions
- Fixed an issue which allowed a developer to use a space character as part of the ID of new custom actions
- Fixed an issue where `dist` folders containing manifest were incorrectly shortlisted for migration
- Fixed an issue where `rootIntent` value was lost from respective FLP html file(s) post migration
- Fixed an issue where adding new SAP systems in VSCode showed warning to test connection even if it was performed earlier

## [1.8.2] - 2022-11-17
### Added
- Added support for charts with measures based on transformation aggregations (experimental)
- Added tooltips to disabled context menu items (experimental)
- Added support of custom actions in object page header and footer
- Added a new icon in Application Modeler tree view indicating the project/application type
- Added ability to migrate SAP Fiori projects that do not have a `webapp` folder to support SAP Fiori tools

### Changed
- Updated SAP saved systems so that users do not need to validate the system connection before saving
- Updated the text for the `Fiori: Open Environment Check` options to better reflect their meaning

### Fixed
- Fixed an issue that allowed the creation of subsequent object pages from an overview page application within Application Modeler tree view
- Fixed an issue with a new fragment file for a custom element overwriting an existing one; the first character of the filename has to be always uppercase now as required by the `@sap-ux/fe-fpm-writer`
- Fixed an issue where migrating an SAP Fiori project more than once would overwrite the original scripts on the second and subsequent time

## [1.8.1] - 2022-11-03
### Changed
- Updated SAP Fiori migration tool to show a loading indicator when looking for projects to migrate and display a message if no suitable projects were found.
- Enhanced the update feature for `@sap/ux-specification` node module in the Application Info Page "Application Status" section to consider the app's minimum SAPUI5 version, and to offer a reload to bring the change into effect

## [1.8.0] - 2022-10-20
### Added
- Added support of controller artefacts using typescript, if an application is enabled for it
- Added support of custom actions in object page form sections

### Changed
- Added tooltips to icons for page types in Page Map; introduced a new icon for custom pages which are enabled for the flexible programming model approach

### Fixed
- Fixed toast message on add/delete custom page

## [1.7.6] - 2022-10-06
### Added
- Added an indicator for properties with unsuitable data types in Page Editor, that means a warning is shown if a Boolean is used where a numeric value is expected, for example (experimental)
- Added support for the command `Fiori: Open Environment Check` when using VS Code so that users can retrieve details on their development environment for support cases

### Fixed
- Fixed an issue with wrong routing information generated in manifest by Page Map for 3rd level pages

## [1.7.5] - 2022-09-22
### Added
- Added the Page Map ability to create and manage controller extensions for the page types list report and object page using OData V4, in conjunction with `@sap/ux-specification` versions 1.96.24, 1.102.9 or higher
- Added support for SAP Fiori elements applications based on the flexible programming model approach, in conjunction with `@sap/ux-specification` versions 1.96.24, 1.102.9 or higher
- Added support for `@sap-ux/ui5-middleware-fe-mockserver` to Application Info Page
- Added the ability to show and hide individual properties displayed in the table in Data Editor; certain property groups are hidden by default and can be shown using the new 'Show Properties' functionality

### Changed
- Enhanced the usability for the Text Arrangement property: it's now always visible and is automatically preset once you choose the same Text property as defined for the value help (experimental)
- Enhanced the Page Map to be able to handle applications based on OData V4 without defined pages and to assist with creating the first page, in conjunction with `@sap/ux-specification` versions 1.96.24, 1.102.9 or higher

### Fixed
- Fixed an issue that potentially resulted in the migration tool getting stuck during the migration of SAP Fiori projects

## [1.7.4] - 2022-09-08
### Added
- Added tooltips for some of the the disabled context menu items (experimental)
- Added a new command `Fiori: Change the Minimum SAPUI5 Version` to modify the app's required version and to update the `@sap/ux-specification` node module version accordingly

### Changed
- Updated dialogs for generating bullet micro chart columns and header sections to prompt for the fixed maximum value rather than property (path). Maximum value can still be changed to property (path) in the Properties pane once the chart is generated (experimental)

### Fixed
- Fixed an issue with wrong preview html file path generated for run configurations on some applications
- Fixed an issue with Application Modeler tree not refreshing on project or parent folder renames
- Fixed an issue with some Reuse libraries being detected for migration after they have already been migrated

## [1.7.2] - 2022-08-25
### Added
- Added ability to use the properties from 1:many associations in basic table columns to display multiple values per cell (experimental)
- Added support for custom pages in Application Modeler tree view when using `@sap/ux-specification` versions 1.96.20, 1.102.5 or higher
- Added a visualization of the configuration documentation (manifest and UI5 flexibility changes) delivered with `@sap/ux-specification` node module; access options are added to the Application Info Page, and the right-click menus in the Application Modeler tree view
- Added new field to the Migration tool that details the type of SAP Fiori project being migrated

### Fixed
- Fixed an issue showing `schema is invalid` message when using mass `i18n` reference generation in Page Editor
- Fixed an issue with warning messages not being shown for invalid properties of OVP applications
- Fixed an issue with global view properties being maintainable and not being removed even if multi table view mode is disabled
- Fixed an issue with missing refresh when selection presentation variant annotations are changed  

## [1.7.1] - 2022-08-11
### Added
- Added ability to filter properties in the property panel of Page Map And Page Editor by category
- Added ability to define table grouping (experimental)
- Added ability to define texts and text arrangement for table grouping nodes (experimental)
- Added markers and information to outline and property panel about elements referring to invalid service properties (experimental)

### Fixed
- Fixed an issue with existing custom views being deleted when creating new table views 
- Fixed an issue with manifest properties for the view being deleted when removing the Selection Presentation Variant for the first table view using Page Editor
- Fixed an issue with faulty navigation routing being created in the manifest for a new custom detail page following an initial List Report page
- Fixed an issue with migration where Reuse library project's root during migration was wrongly identified

## [1.7.0] - 2022-07-28
### Added
- Added ability to set default filters in list report tables, unless used with analytical chart (experimental)
- Added ability to define Line and Area micro charts in table columns and object page header sections (experimental)
- Added support for extension-based custom table toolbar actions; requires `@sap/ux-specification` versions 1.96.18, 1.102.3 or higher
- Added the descriptions as tooltip to elements in the property panel when Show Descriptions is set to off  
- Added ability to migrate a Reuse Library project to support deployment to ABAP environment using SAP Fiori tools

### Changed
- Removed unnecessary dropdown options in the Presentation Variant property for charts and tables (experimental)
- Changed the visualization of custom table columns in OData V2 based applications, which do not match the currently selected table type, to show as a valid state, and allow editing of their properties

### Fixed
- Fixed the take over button not showing in value help dialog (experimental) 

## [1.6.7] - 2022-07-14
### Added
- Added ability to sort table data in object page and form sections (experimental)
- Added ability to sort chart data in object page and form sections (experimental)

### Changed
- Changed display of table type property to be in line with other properties, `ResponsiveTable` is not shown as default value anymore even if no explicit value was set as this was not always correct

### Fixed
- Fixed icon style of checkmarks in Application Info Page on SAP Business Application Studio
- Fixed an issue with the command `Fiori: Delete Application from CAP Project` not finding existing apps to delete
- Fixed an issue with an invalid data source warning after migration if the project did not contain a data source
- Improved detection of SAP Fiori projects that can be migrated to support SAP Fiori tools

## [1.6.6] - 2022-06-29
### Added
- Added ability to sort table data in list report pages (experimental)
- Added ability to configure multi input fields in object page sections (experimental)

## [1.6.4] - 2022-06-16
### Added
- Enabled adding and maintaining chart sections based on to many associated entities analytically enabled with custom aggregate (experimental)
- Added a busy loader for undo/redo operations
- Added warning during migration of SAP Fiori tools projects if the project has no local copy of the metadata.xml file for use with SAP Fiori tools
- Added the ability to search for data in Data Editor
- Enabled keyboard navigation for Data Editor

### Changed
- Disabled editing elements defined in other applications within a CAP project to prevent cross references between apps (experimental)
- Removed the old property panel layout code and the fallback option

### Fixed
- Fixed the resolution of extension columns in case of multiple table views with OData V4 applications
- Enhanced the support for custom project structures
- Fixed an issue with page name displayed in Application Modeler tree view after creating or deleting pages
- Fixed an issue with infinite busy loader display when Page editor is closed while a changed field is focused
- Fixed an issue with extension columns not assigned to the correct view when multiple table views is used
- Fixed an issue with incorrect boolean values for the `visible` property in Page Editor
- Fixed an issue with empty entries left in `manifest.json` when the last element inside was deleted

## [1.6.3] - 2022-06-02
### Added
- Added logging of cleaned up annotations (experimental)

### Changed
- Improved performance of change operations in Page Map and Page Editor within SAP Business Application Studio 

### Fixed
- Fixed an issue with all table view settings deleted in manifest if one view is deleted
- Fixed more issues with a stuck loading indicator
- Fixed an issue with annotation changes not updating in Page Editor
- Fixed an issue with drop-down menus stuck open when underlying dialog window is moved
- Fixed an issue with `i18n` text resolution not happening in anchor column selection of custom column dialog

## [1.6.1] - 2022-05-19
### Added
- Enabled adding and maintaining table views in list report pages (experimental)
- Enabled adding and maintaining chart views based on the entities with custom aggregations in list report pages (experimental)
- Enabled sorting data in analytical charts and chart views in list report pages (experimental)
- Enhanced cleanup to remove unused annotations with qualifier, such as `UI.DataPoint`, `UI.Chart`, `UI.LineItem`, `UI.FieldGroup`, `UI.PresentationVariant`, `UI.SelectionPresentationVariant`, `UI.SelectionVariant` (experimental)
- Enhanced migration tool to pre-select the relevant `SAP System` if found in the `neo-app.json` of the project to be migrated
- Added support for downloading the SAPUI5 sources to custom run configurations

### Changed
- Disabled cleanup functionality for applications with extensions (experimental)
- Changed tooltips to use native VSCode tooltips whenever possible
- Prevent deletion of the last table column if it is used as anchor for extensions in OData V4 applications

### Fixed
- Fixed issues with dialogs not closing after changes, and loading indicators not stopping in Page Editor
- Fixed various smaller UI issues in Page Editor

## [1.6.0] - 2022-05-05
### Added
- Enabled adding and maintaining micro chart sections in the object page and form header (experimental)

### Fixed
- Fixed an issue with outline and property panel not refreshing after add/delete actions
- Fixed an issue with infinite loaders showing after add and re-order actions
- Fixed an issue with wrong object reference showing in confirmation popup for add custom page action
- Fixed an issue with app-to-app preview feature not configured in `ui5-mock.yaml` file

## [1.5.5] - 2022-04-21
### Added
- Enabled adding and maintaining data point sections in the object page and form header (experimental)
- Enabled maintaining additional properties of analytical chart: title and labels for measures/dimensions (experimental)
- Added a marking text to table columns in Page Editor outline which are of type inline action

### Changed
- Improved the stability of add and delete operations by waiting and blocking the UI until the full sync cycle finished

### Fixed
- Fixed an issue with incorrectly created custom page routing when the custom page is the first detail page
- Fixed an issue with artifact type not displayed for array-like properties
- Fixed an issue with too big clickable areas on Application Info Page and the UI for maintaining run configurations
- Fixed an issue with run configurations not using the set SAPUI5 version if the `ui5.yaml` file doesn't contain a "version" entry 

## [1.5.4] - 2022-04-07
### Added
- Added a warning message to the command `Fiori: Open Run Configurations` if no runnable application is found in the current workspace 
- Enabled adding analytical chart to list report pages based on aggregated entity (experimental)
- Enabled maintaining basic properties of analytical chart (experimental)
- Enabled adding and maintaining rating sections in the object page and form header (experimental)
- Enabled adding and maintaining progress sections in the object page and form header (experimental)

### Changed
- Updated `Test Connection` for SAP Saved Systems so that it details if the OData V2 and V4 catalog service requests were successful
- Improved suggested min SAPUI5 version when migrating an existing SAP Fiori application with a `neo-app.json` file

### Fixed
- Fixed an issue with SAPUI5 version evaluation on preview operation when using `ui5-local.yaml`
- Fixed an issue with multiple undo steps leading to an empty Page Map
- Fixed an issue with scroll position incorrectly resetting to previous field over change completion when the user does a change in Page Editor and immediately focus to another field
- Fixed an issue with missing resolution of `i18n` texts for application title and description
- Fixed an issue with extension table columns without type, they now display as "unknown"

## [1.5.3] - 2022-03-24
### Added
- Added a new command to toggle the telemetry setting for the whole SAP Fiori tools suite `Fiori: Change Telemetry Settings`
- Added the support for the annotation property to toggle whether a subsection is only displayed on demand (experimental)
- Added a greatly enhanced run configuration UI with the command `Fiori: Open Run Configurations` replacing the simple quick-pick dialog in conjunction with `@sap/ux-ui5-tooling` release 1.5.3 or higher
- Added "flexEnabled" property for OData V4 based applications to the Page map in conjunction with latest `@sap/ux-specification` releases
- Added the support for multiple services to Data Editor with the Overview Page floorplan
- Added a warning message to the Application Modeler tree view in case it can't be opened due to issues during schema generation

### Changed
- Removed the Application Modeler specific setting "Enable Telemetry", which is replaced by a central SAP Fiori tools setting in the command palette: `Fiori: Change Telemetry Settings`
- Enhanced adding fields, columns, and other property selection dialogs to support deeply nested structures; now you can choose properties via the navigation paths consisting of more than 2 elements (experimental)
- New icons for quick actions on Application Modeler tree view nodes

### Fixed
- Fixed an issue with the migration of SAP Fiori applications incorrectly overwriting the `minUI5Version` in the `manifest.json` in some cases
- Fixed an issue with undo incorrectly requiring two attempts to undo the creation of a new page in Page Map
- Fixed an issue with moving multiple custom table columns when moving to the end of the table
- Fixed an issue with infinite repeat of value change in virtual files, when using both Page Editor and file edit
- Fixed an issue where undo/redo could incorrectly change local annotation files for OData V2 applications

## [1.5.2] - 2022-03-10
### Added
- Added the display of the column type for inline actions in tables
- Added the option to start the Data Editor to the Application Info Page of OData v2 applications
- Added the navigation to source code for inline actions in tables of OData v4 applications (experimental)

### Changed
- Changed some label texts for custom column and custom section dialogs for better consistency

### Fixed
- Fixed an issue with `i18n` key resolution in Page Map with multi-app CAP projects
- Fixed an issue with Page Map not starting when a manifest-defined entity set is unknown, now a warning is displayed in Page Map   
- Fixed an issue with custom columns created with Page Editor in OData V4 applications disappearing when using SAP Business Application Studio
- Fixed an issue with the deletion of the `changes` folder not triggering an update in Page Editor UI

## [1.5.1] - 2022-02-24
### Added
- Documentation of `@sap/ux-specification` provided features can be accessed from Application Modeler tree view
- "Add New Page" operation can now be triggered from page nodes in the Application Modeler tree view
- Added support for OData V2 projects in Data Editor
- Added the support of creation and configuration for contact quick views on table columns and form fields in OData v4 applications (experimental)
- Added the support of tooltip configuration for rating and progress indicator table columns in OData v4 applications (experimental)

### Changed
- Removed the possibility to choose unsupported 1:1 navigation attributes when creating a new page via "Add New Page" command in Page Map, and show a warning if such a routing is found in the application
- Changed behavior of keyboard navigation to source code to follow the VSCode paradigm, enter key opens the file and sets focus, space key opens the file, but focus is preserved

### Fixed
- Fixed a bug where tabbing using keyboard navigation in Page Map skips the first property in the property panel
- Fixed an issue with invisible icons in Page Map when using SAP Business Application Studio with Chrome
- Fixed an issue with creating array-formatted properties of custom columns

## [1.5.0] - 2022-02-10
### Added
- Added custom table column support for OData V4 based List report and Object page applications (using `@sap/ux-specification` version 1.96.4 or higher)
- Added a new command `Fiori: Open Environment Check` enabling the user to zip a project, and check the environments connectivity for support cases (check feature is SAP Business Application Studio only)
- Added `Importance` property for the table columns representing actions in OData v4 applications (experimental)

### Changed
- Unified the property panel UX of Page Map and Page Editor
- Changed the search which now requires at least two characters of a search string to start filtering
- Removed the shortcut to open local annotation XML files from Application Info Page for CAP CDS based projects
- Changed the right-click option "Show Page Map" for non-eligable apps now also showing a quick-pick first in case only one eligable app is in the workspace

### Fixed
- Fixed an issue with buttons not appearing in Page Map after using zoom function with VSCode on Mac systems
- Fixed positioning of custom sections when inserting two custom sections with the same anchor and relative position

## [1.4.7] - 2022-01-27
### Added
- Enabled navigation to the source code from most of the annotation-based outline nodes, such as Filter Fields, Header, Sections, etc. (experimental)
- Added the artefact type information (Manifest or UI5 Flexibility) for configuration properties in Page Editor
- Added OData V2 application settings `statePreservationMode` and `draftDiscardConfirmationSettings` to the Page Map property panel (supported starting `@sap/ux-specification` version 1.96.3)
- Support `template` manifest property alternatively to `name` for custom sections in OData V4 applications
- Added launch of the Application Information page when migrating SAPUI5 freestyle applications

### Changed
- Changed the Value Help configuration dialog "Display as Dropdown" checkbox to use a switch control with the same name and impact (experimental) 
- Changed the padding of all dialog boxes, also dialog boxes can be moved now
- Changed the option to choose an existing fragment for a custom page to be disabled in case no fragments are found in the project

### Fixed
- Fixed an issue with long texts in dropdown menus
- Fixed an issue with overlapping content in Page Editor property panel
- Fixed the usage of properties from manifest which are variables, they are now resolved via an existing `pom.xml` file if available
- Fixed an issue with migration of OData V4 applications where the versions of SAPUI5 being offered was not restricted to those supporting OData V4

## [1.4.6] - 2022-01-13
### Added
- Enabled defining measures and currencies for numeric fields and column values (experimental)
- Enabled defining text and text arrangement for filter fields (experimental)
- Enabled taking over text and text arrangement settings from the field to the value help and vice versa (experimental)
- Enabled configuring results list table for value help (experimental)
- Added the option to toggle descriptions in Page Editor property panel
- Added UI loading indicators for Application Modeler views
- Added ability to add and delete rows in Data Editor
- Enabled adding and deleting rows in Data Editor

### Changed
- Removed technical navigation entities from page create dialog
- Changed quick pick method for projects
- Moved type indicators as tags after the entity name in Page Editor property panel
- Unified source code navigation icons across Application Modeler views
- Disable 'Use Existing' option if no files to select exist in custom column dialog

### Fixed
- Fixed incorrect `@sap/ux-specification` library version being added during project migration
- Fixed an issue where older versions of UI5 could not be used during migration
- Fixed an issue with manifest not being updated when multiple tables point to the same entity set (use `@sap/ux-specification` versions 1.96.2,1.90.17,1.84.28,1.71.48)
- Fixed an issue where invalid values were written regardless of failed verification
- Fixed an issue with opening an OVP application with Page Editor
- Fixed an issue with Page Editor showing a blank page when deleting an `i18n` enabled text field
- Fixed keyboard navigation issues in Page Editor property panel
- Fixed issues with overlapping content in Page Editor property panel
- Fixed issues with placement of icons and scroll bars

## [1.4.4] - 2021-12-02
### Added
- Enabled configuring criticality for section fields in OData V4 applications (experimental)
- Added task bar notifications for annotation file changes

### Fixed
- Fixed the moving of columns and sections with relationship to custom columns and sections
- Fixed an issue with Page Editor when trying to modify the `i18n` key of a field after using search/filter

## [1.4.3] - 2021-11-18
### Added
- Added type information and navigation to the source code in the properties panel for section fields and table columns based on annotations (experimental) 
- Enabled configuring image, icon, and initials in the object page header (experimental)
- Enabled synchronizing text and text arrangement values for fields defined with value help (experimental) 

### Fixed
- Fixed an issue where the wrong component name is written to the `ui5.yaml` file after migration
- Fixed an issue where modifying the root `package.json` in a CAP project would incorrectly cause the migration prompt to appear
- Fixed custom section creation for OData V4 applications to not accept reference sections without facet ID anymore
- Fixed various issues in the Page Editor with no default themes

## [1.4.2] - 2021-11-16
### Fixed
- Fixed an issue with deleting empty lines and comments when updating annotation files (experimental)

## [1.4.1] - 2021-11-04
### Added
- Added an experimental feature in Page Editor for adding and maintaining the annotation-based UI elements in OData v4 applications
- Added the ability to multi-select and drag & drop annotation-based elements like fields, columns and sections
- Application Information page now supports SAPUI5 freestyle applications

### Changed
- Changed the Page map's property panel to now remember it's open/closed state

### Fixed
- Fixed scrolling using keyboard for multi-select comboboxes
- Fixed add dialog now closing properly after pressing "Add" for array-like properties in Page editor
- Fixed file formatting of newly inserted `i18n` keys
- Fixed section extension fragments now correctly using the `i18n` key when a new key for section title is created
- Fixed an issue with the migration view table alignment when listing projects for migration

## [1.4.0] - 2021-10-21
### Added
- Added the ability to generate mock data for Freestyle V4 application
- Added keyboard support for Page map, Page editor, and Application Information page
- Added a new option to create delivery variants/views, which can be configured with the command `Fiori: Add Configuration for Variants Creation` and executed with a new start script `start-variants-management` (ux-ui5-tooling version 1.4.0 and higher)

### Fixed
- Fixed high contrast theme rendering in Page map and Page editor
- Fixed application modeler tree, now updating correctly when deleting/adding CAP applications
- Fixed an issue with Application Information page, now not showing the application quick-pick anymore

## [1.3.7] - 2021-10-07
### Added
- Added "Title", "Description" and "flexEnabled" properties to the Page map in conjunction with newest `@sap/ux-specification` release
- Added a new command `Fiori: Delete Application from CAP Project` to remove an application inside an multi-app CAP project and it's references cleanly
- Enhanced the context menu of the Application modeler tree view entries for direct access to the application information page, the `manifest.json` and `package.json`
- Added an ability to generate and edit mock-data, new command `Fiori: Open Data Editor`
- Added automatic detection and notification for migration eligibility of Adaptation projects present in the workspace
- Added ability to view details of a saved systems in VSCode and test its connection
- Application Information page will now open post successful migration of SAP Fiori Elements project
- Option to open Application Information page added from the migration results view

### Changed
- Removed the additional "Apply" step from Page map properties panel to simplify the usage flow
- Refactored the run configuration script schema to be OS independent and enable easier future enhancements

### Fixed
- Fixed focus and selection of nodes to be now in sync between outline and property panel of the Page editor
- Fixed Page map zoom in SAP Business Application Studio to work independent from browser zoom
- Fixed seach box clearance in page editor not working
- Fixed Application modeler tree virtual file generation for CAP OData V4 applications now working again

## [1.3.5] - 2021-09-23
### Changed
- Improved support for migrating SAP Fiori applications with an OData V4 source to accommodate SAP Fiori tools

### Fixed
- Fixed an issue with application information page not showing title and page information for CAP based projects in VSCode on Microsoft Windows
- Fixed an issue with Page map throwing an error message on quick navigate back, when the user switched pages before using the Application Modeler tree view

## [1.3.3] - 2021-09-09
### Added
- Added a new option to preview an application within an external Fiori launchpad, which can be configured with the command `Fiori: Add FLP Embedded Configuration` (ux-ui5-tooling version 1.3.1 and higher)
- Added a new application information page that is automatically displayed after generation or can be manually triggered with the command `Fiori: Open Application Info`
- Migration now supports migrating Adaptation Projects to support the Visual Editor in SAP Business Application Studio

### Fixed
- Fixed an issue with the Page map not centered in the new canvas when splitting the screen

## [1.3.2] - 2021-08-26
### Added
- All new properties panel in Page Editor. Improved page outline, scroll and search through all properties in one panel

### Changed
- There is a new syntax for OData V4 custom pages in `manifest.json` (SAPUI5 versions >= 1.90). Use new syntax for new custom pages, existing remain untouched
- During migration, value of minUI5Version `"minUI5Version": "${sap.ui5.dist.version}"` in manifest.json will now be replaced with the UI5 version selected in the migration view
### Fixed
- For projects with newer version of UI5 (>= 1.90, determined by installed module `@sap/ux-specification`) a new OData V4 custom page controller template with dependency to `sap/fe/core/PageController` is used. This will fix error "Cannot read property 'onBeforeBinding' of undefined"

## [1.3.1] - 2021-08-12
### Added
- Added support of the UI5 independent i18n key format `{{key}}` in the Page editor where applicable
- Added support for generating run configurations when migrating Fiori projects

### Changed
- Migrated projects now update the existing package.json if present, rather than replace it
- Existing SAP Fiori elements projects that already support SAP Fiori tools will not be detected for migration by default

### Fixed
- Fixed i18n icon display
- Fixed an issue with the app-to-app navigation test displaying the source application twice on the local launchpad
- Fixed a bug in the Migration window where column values were not scrolling as expected when user scrolled the window

## [1.3.0] - 2021-07-29
### Added
- Added an input validation to the common configuration property `visible` in Page editor
- In migration view, new columns `Destination` and `ui5 version` added to allow users to change their values before migration

### Changed
- Changed the preview default to not use the persistent iAppState in order to have source code changes always applied at auto-refresh (ux-ui5-tooling version 1.3.0 and higher)
- Changed the search input field dialog to be consistent with other Fiori tools
- Migration view will now not show the Fiori tools enabled projects. This can be changed via extension settings - `Show Fiori Tools Projects In Migration View`

### Fixed
- Fixed an issue which prevents older supported SAP UI5 versions to be selectable in run configuration create dialog

## [1.2.5] - 2021-07-15
### Added
- Added an error message when trying to create a new custom column in a different fragment file than was used before in OData V2 based apps
- Added support for multiple root workspaces when migrating projects for Fiori tools

### Changed
- Changed icon of the i18n key creation function into a symbolic globe to better reflect its purpose
- Changed the text of delete page information popup to match that of add page information style

### Fixed
- Fixed an issue with undo/redo not preserving the history correctly when editing the JSON configuration file
- Fixed multiple issues with icon visibility and selection highlighting behaviour
- Fixed a synchronization issue between JSON file changes and Page editor view when selecting values for `enum` types
- Fixed an issue with drop-down menu rendering on small screens
- Fixed an issue with the `Show Page Map` sometimes disappearing on click in SAP Business Application Studio
- Fixed an issue with undo/redo not properly restoring custom column definitions
- Fixed an issue with file extension not changed for UI5 flexibility changes when the type is changed
- Fixed an issue with scaling text in the `Global Page Settings` panel
- Fixed an issue with creating a run configuration for a Fiori Freestyle project

## [1.2.4] - 2021-07-01
### Changed
- Changed icon of the handle to drag and move custom sections in the Page editor outline for better recognizability 

### Fixed
- Fixed an issue with Application modeler tree not recognizing a new project after `npm install` was executed 

## [1.2.3] - 2021-06-17
### Changed
- Simplified the Application modeler tree view and added more descriptive tooltips
- Changed the Application modeler toggle setting `Show JSON schemas` to immediately apply without reload 

## [1.2.1] - 2021-06-03
### Added
- Added new UX for migration that can support the migration of multiple projects

### Fixed
- Fixed highligting in comboboxes
- Fixed issue with i18n properties not being written into the i18n file

## [1.2.0] - 2021-05-20
### Changed
- Changed the min UI5 version allowed to 1.84.0 for the command `Fiori: Add Launch Config` in case of OData V4

### Fixed
- Fixed and issue with the binding state of run configuations in SAP Business Application Studio when selecting `latest` as UI5 version

## [1.1.11] - 2021-05-06
### Changed
- Updated the icons used for Application modeler tree view items for a better readability 

### Fixed
- Resolved an issue resulting in entity type schema not found when the entity type name doesn't contain the word "type"

## [1.1.10] - 2021-04-22
### Fixed
- Resolved an issue resulting in an error message if no destination systems are stored in VSCode

## [1.1.9] - 2021-04-08
### Added
- Added new individual icons to Application modeler view entries
- Added support to access virtual configuration files via the respective source code icon on mouseover in the Application modeler view entries

### Changed
- Changed view of projects in the Application modeler, which are now alphabetically sorted

### Fixed
- Fixed the navigation to i18n property files from the Page Editor so that it now works correctly with multi-application projects
- Resolved an issue with the values of array-like properties so that they can once again be reordered and deleted in the outline of the Page Editor

## [1.1.7] - 2021-03-25
### Fixed
- When creating a custom column or section with i18n key as title in Page editor, `Apply` now correctly creates the corresponding entries
- Undo history is now correctly reset when switching pages in Page editor
- OData V4: Routing for 3rd level pages is now correctly created in Page map
- Migration of Fiori applications can now accommodate a configurable webapp path

## [1.1.5] - 2021-03-11
### Added
- Support i18n key handling in Page editor
- V4: Support new Object page type "Form page"
- Preview can be started also from right-click menu of folders in Application modeler view
- Migration of Fiori applications now supports loading reuse libraries from the Front-End server defined under "sap.ui5"."dependencies"."libs" in the manifest.json 

### Changed
- Moved Application modeler view default position to "SAP Fiori" view container
- Default actions for virtual configuration files now open Page map and Page editor respectively instead of file editor, files can be opened via right-click menu

### Fixed
- Issue with adding new pages after deleting a page

## [1.1.4] - 2021-02-25
### Added
- V4: Support applications which start with an Object page instead of List report

### Changed
- When scroll bars are visible in Page map, mouse scroll moves vertically, `shift`+scroll moves horizontally, `ctrl`+scroll zooms
- Further usability improvements to Page map and Page editor

### Fixed
- When using bind/unbind to change an existing run configuration in SAP Business application studio the windows.args are correctly updаted


## [1.1.2] - 2021-02-11
### Added
- Existing run configurations for Fiori tools projects in SAP Business application studio can be modified
- V4: Support table columns properties in Page editor
- V4: Support properties of OData V4 based cards in OVP apps

### Changed
- Various smaller enhancements to the readbility of Page map and Page editor UI
- Page editor: search only in name and value to make results more significant
- Harmonized the UI for add run configuration in SAP Business application studio and the command `Fiori: Add Launch Config`

### Fixed
- V4: Custom section creation with existing fragment
- Date range filter creation
- V4: Reordering of custom sections

## [1.1.0] - 2021-01-28
### Added
- Page editor supports create, delete and move entries within array-like properties
- V4: Migration of OData V4 Fiori applications is now supported
- Migration of Fiori applications without a datasource in the `manifest.json`
- Migration of a Fiori applications without a `package.json` or `pom.xml` (requires a `neo-app.json` file)

### Changed
- Fragments and view files are now discovered from all locations

### Fixed
- V4: Page map now correctly updates the routing when switching back from flexible to standard layout
- V4: Re-ordering of custom sections now works correctly
- Existing `propertyBindingChange` flexibility changes are now handled correctly
- Run configurations are now working independently from chosen terminal shell
- Virtual configuration files are now updated correctly when multiple projects start with the same name
- The plus action on outline entries in Page editor is now always accessible regardless of the window size

## [1.0.26] - 2021-01-14
### Added
- V2: Page editor supports creation and modification of custom table columns on Object Page tables (ux-specification version 1.84.1, 1.78.16, 1.71.22, 1.60.9 and higher)
- New command `Fiori: Validate project`
- Fiori projects in your workspace that need to be migrated to support the Fiori tools are now auto-detected.

### Changed
- Quick pick for app-to-app navigation test configuration always asks for source and target applications

### Fixed
- Change of table type now disables invalid custom columns in Page editor outline
- Launch configurations work with Windows PowerShell as default shell type
- Backspace in Page map popup doesn't delete characters in open `app.json` file
- V4: deleting custom sections doesn't lead to invalid applications anymore

## [1.0.24] - 2020-12-03
### Added
- V2: Support for Overview page in Page editor's outline and property panel

### Fixed
- Command `Fiori: Show Page Editor` now asks for the page to open instead of opening the Page map

## [1.0.23] - 2020-11-18
### Added
- V4: Support for List Report, Object Page, and Analytical List Page with OData V4 services (SAPUI5 version 1.84 and higher)
- V4: Page editor allows creation of custom pages for List Report and Analytical List Page projects (SAPUI5 version 1.84 and higher)
- V2: Page editor supports creation and modification of custom table columns on List Report (ux-specification version 1.78.14, 1.71.20, 1.60.7, 1.52.5 and higher)
- Support testing of app-to-app navigation in workspace
- Support preview of applications bound to SAP API Business Hub services in SAP Business Application Studio (ux-ui5-tooling version 1.0.25 and higher)
- Support for selecting a pre-defined destination when migrating a project

### Fixed
- Search in Page editor is not cleared anymore when a property value is changed

### Changed
- Currently not applicable properties are now disabled in Page editor instead of hidden

## [1.0.22] - 2020-11-04
### Fixed
- Page map now correctly works with Safari browser
- Page map now correctly updates when changes are made directly to `manifest.json` or changes files
- Fixed the issue with search wrongly filtering out some Fiori tools projects in the workspace
- Undo/redo buttons now work correctly with Autosave enabled in SAP Business Application Studio

## [1.0.20] - 2020-10-21
### Added
- Create new run configuration for Fiori tools projects in SAP Business application studio
- New command `Fiori: Add Launch Config` for VSCode

### Changed
- Renamed command `SAP Fiori tools - Application Generator: Launch` to `Fiori: Open Application Generator`
- Renamed command `SAP Fiori tools - Application Modeller: Show Page Map` to `Fiori: Show Page Map`
- Renamed command `SAP Fiori tools - Application Modeller: Preview Application` to `Fiori: Preview Application`
- Renamed command `SAP Fiori tools - Application Modeller: Refresh Application Modeler config tree` to `Fiori: Refresh Application Modeler View`
- Renamed command `SAP Fiori tools - Application Modeller: Show Page Editor` to `Fiori: Show Page Editor`
- Renamed command `SAP Fiori tools - Migrate Web IDE Project for use in Fiori tools` to `Fiori: Migrate Web IDE Project for use in Fiori tools`

### Fixed
- Page now correctly opens when no sections are present in application
- Performance improvements when starting Page map
- Virtual configuration files are now correctly refreshed when updated programmatically

## [1.0.19] - 2020-10-07
### Changed
- Page map's property panel will now be open per default and remember its status per project
- Page editor's property panel shows property names with spaces for better readability
- Page editor's property panel shows properties in alphabetical order

### Fixed
- Page map icon does not vanish anymore on `app.json` file editor when Page map is closed
- Command "Preview Application" now works properly with CAP based projects

## [1.0.17] - 2020-09-23
### Added
- Page editor allows creation, and positioning of custom sections in Object pages
- Command "Preview Application" supports SAP Fiori tools freestyle applications

### Fixed
- Page map undo in SAP Business application studio only undos one step at a time again
- Page map properly updates when changes are made in manifest by source control actions
- Various issues during the migration process when using `SAP Fiori tools - Migrate Web IDE Project for use in Fiori tools` from the command palette 

## [1.0.16] - 2020-09-09
### Added
- New Page editor for application configuration of List report, Object page, and Analytical list page

### Fixed
- Sometimes newly created pages in Page map were not written into the manifest

## [1.0.14] - 2020-08-26
### Changed
- The list of navigation properties is now sorted when adding a new page in Page map 
- Mandatory input fields are now marked with `*` in Page map
- Application modeler tree view shows messages when searching for SAP Fiori projects and if no projects are found 

### Fixed
- Quick picks list projects only once, even if their root folders are visible multiple times in the workspace

## [1.0.13] - 2020-08-13
### Added
- Support for flexible column layout settings in Page map
- A warning message is displayed for projects if the Application modeler version requires a newer version of ux-specification module than the one installed
- When the window gets split by opening the source file from Page map, the Page map tree is moved to the new visible area
- Configuration json files support binding changes for object page header actions (ux-specification version 1.78.6, 1.76.18, 1.71.13 and higher)

### Changed
- Command "Preview Application" let's you pick which start script to use (ux-ui5-tooling version 1.0.13 and higher, Application generator version 1.0.14 or higher)

### Fixed
- Button to open the Page map from source file is not shown anymore on Page map window itself
- Migration command doesn't show an error message anymore if one or more not supported projects are in the user's workspace
- Migration command shows an error message if the selected project is not supported

## [1.0.9] - 2020-07-29
### Changed
- Renamed "Preview in Browser" context menu entry and palette command to "Preview Application"
- Added quick-pick information texts to palette commands 

### Fixed
- Page map visualization is centered again on window split avoiding occlusion by new window
- Deletion of files from project's changes folder now updates configuration json files properly
- Migration command now works correctly with new ui5 cli

## [1.0.7] - 2020-07-15
### Fixed
- Quick pick entries are now sorted alphabetically

## [1.0.6] - 2020-07-01
### Fixed
- Page map confirmation popup on delete correctly shows the text instead of the key value
- Quick pick correctly closes after the application is selected and Page map is opened
- Overview page applications migrated from Web IDE now preview correctly
- Various fixes for command "SAP Fiori tools - Migrate Web IDE Project for use in Fiori tools"

## [1.0.4] - 2020-06-17
### Changed
- Update templates for migrate command

### Fixed
- Open Page map in SAP Application Studio now always works on first attempt

## [1.0.0] - 2020-06-16
Release status: GA

We are pleased to announce the official GA of the SAP Fiori tools - Application Modeler extension.

## [0.0.27] - 2020-06-03
### Added
- New command "SAP Fiori tools - Migrate Web IDE Project for use in Fiori tools"
- Support Analytical list page applications (ux-specification version 1.76.11 and higher)
- Integration with Application Generator, new command "SAP Fiori tools - Application Generator: Launch"

### Changed
- Using new API for reading and writing UI5 flexibility changes to increase UI5 compatibility
- Rename "Edit Page" to "Configure Page" in Page map to better reflect the meaning

### Fixed
- "Open Preview in Browser" in SAP Application Studio directly opens the application
- Automatic application preview refresh on changes is working with "Open Preview in Browser" and SAP Application Studio
- In SAP Application Studio undo/redo via keyboard shortcuts in Page map now works on Mac

## [0.0.26] - 2020-05-20
### Added
- In Page map clicking on the pencil icon on the page tiles opens the corresponding configuration json file
- Support for Worklist applications

### Changed
- Application modeler internal used texts are now translatable

### Fixed
- Preview of UI5 flexibility changes

## [0.0.25] - 2020-05-06
### Added
- Application modeler collects usage statistics
- Open Preview in Browser downloads the UI5 version specified in the `ui5-local.yaml` file (ux-ui5-tooling version 0.0.85 and higher)

### Changed
- Configuration json files (`app.json`, `pages/*.json`) are generated on demand and stored in a virtual filesystem
- Removed obsolete `src` folder within projects

### Fixed
- Old version of UI5 was used for Open Preview in Browser
- Configuration of OData V4 applications
- Json files generation

## [0.0.24] - 2020-04-22
### Added
- Selection dialog for navigation properties in Page map now has manual input and typeahead search
- Destinations support in SAP Business Application Studio for application preview (ux-ui5-tooling version 0.0.82 and higher)

### Changed
- Syntax for table configuration settings simplified (ux-specification version 1.76.7 and higher)

### Fixed
- Show Page map command now correctly recognizes the current project
- Page configuration files are now created correctly for Overview page applications
- Session cookies are now properly cleaned up for application preview when using different backends (ux-ui5-tooling version 0.0.82 and higher)
- CSRF token validation and refresh in application preview (ux-ui5-tooling version 0.0.82 and higher) 

## [0.0.21] - 2020-04-09
### Added
- Undo/redo buttons in Page map toolbar
- Logging of events to output view "SAP Fiori tools - Application Modeler"
- Added support of more UI5 flexibility and manifest configurations options for List report, Object page and Overview page 
- UI5 flexibility and manifest configuration support for V4 apps [experimental]

### Changed
- Using new ux-specification npm module providing the schemas for manifest and UI5 flexibility changes
- Page map command is now also available on context menu of folders

### Fixed
- Page map in SAP Application Studio now supports undo/redo functionality via toolbar buttons (limitation: undo/redo via menu, and keyboard shortcuts on Mac don't work)
- Invalid projects in workspace do not break `src` folder handling in other projects anymore

## [0.0.20] - 2020-03-25
### Added
- Flexible column layout support in Page map for V4 apps [experimental]
- ALP preview support

### Changed
- Removed VSCode internal preview (due to limited functionality), browser based preview is used in future
- Add button for new pages in Page map is now disabled if no further navigation targets are available

### Fixed
- Code highlighting in conjunction with Guided help
- `src` folder content is now working with layered lineitem annotations

## [0.0.17] - 2020-03-11
### Added
- CAP project support in Page map [experimental]

### Changed
- Rework UI design of Page map (first iteration)
- Update readme file

### Fixed
- `src` and `pages` folders will not be be recreated as a whole but only obsolete files

## [0.0.14] - 2020-02-27
### Added
- Use UI5 tooling (ui5 serve, middlewares) for Page Editor preview
- Ability to create custom pages for V4 apps [experimental]
- Basic support of page map for V4 LP/OP pages [experimental]
- CHANGELOG.md documenting changes

## [0.0.13] - 2020-02-19
### Added
- Initial version
