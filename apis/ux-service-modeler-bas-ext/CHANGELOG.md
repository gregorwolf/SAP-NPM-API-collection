# Change Log
All notable changes to this project are documented in this file.
​
This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.11.0] - 2023-09-06
### Changed
- Changed the message appearing if no eligible app is found at the start of Service Manager or Annotation File Manager from a modal popup to a notification to be in line with the behavior of other tools

### Fixed
- Fixed several small UI inconsistencies in Service Manager and Annotation File Manager

## [1.9.6] - 2023-05-03
### Added
- Added deprecation message for Compact and Expanded views; these views will be deprecated in future

### Changed
- Updated the tab name of the webview, it now displays the name of the project and service

### Fixed
- Fixed an issue in the Service Manager, the "Refresh & Save" option for metadata doesn't overwrite manifest model entries anymore
- Fixed an issue in the Service Manager, adding a new service as the data source is now possible also in case a corresponding model entry already exists in manifest
- Fixed an issue where the Service manager threw an error even if "Refresh & Save" was successful because the same data source was used in multiple models

## [1.9.2] - 2023-03-09
### Added
- Added annotation copy and annotation file handling support for freestyle applications
- Added missing tooltips for action icons in Service Manager and Annotation File Manager
- Added a messsage that destination changes in Service Manager will only take effect on (re)start of preview
- Added support for adding a fist service in Service Manager if none is bound to the project

### Fixed
- Fixed an issue in Service Manager with service metadata refresh when multiple backend entries exist in the yaml file
- Fixed various servive source compatibility issues
- Fixed minor usability issues

## [1.8.6] - 2023-01-26
### Changed
- Changed the presented order of annotation files in Annotation File Manager to be the same as in `manifest.json`

### Fixed
- Fixed an issue with a change of the service destination within Service Manager not being reflected in `ui5.yaml` and therefore not being considered during preview

## [1.7.2] - 2022-08-25
### Fixed
- Fixed an issue with metadata refresh not working in Service Manager on SAP Business Application Studio when using service destinations 
- Fixed various accessibility, usability and UI issues in Service Manager and Annotation Manager
- Fixed various compatibility issues of Service Manager and Annotation Manager with migrated projects
- Fixed various functional and stability issues in Service Manager and Annotation Manager

## [1.0.26] - 2021-01-14
### Fixed
- In SAP Business Application Studio, if current active tab is a local annotation xml file, an error is shown when Service Modeler button is clicked

## [1.0.23] - 2020-11-18
### Fixed
- Opening Service Modeler from context menu does not work when right-clicked on a folder which contains dot in the name

## [1.0.22] - 2020-11-04
### Fixed
- From Service Manager, syncing Northwind OData service throws an error

## [1.0.20] - 2020-10-21
### Added
- For OVP projects, Service Manager can now be used to add an OData service from a steampunk system
- For Freestyle projects, Service Manager can be used to add OData service using steampunk system or OData url 

## [1.0.17] - 2020-09-23
### Added
- Ability to sync services of Freestyle projects

## [1.0.16] - 2020-09-10
### Added
- Ability to copy, delete and view source code for annotations in CAP projects
- Visual enhancements for consistenty and usability of Annotation List View

### Changed
- Namespace is no longer a required field when creating local annotation files from Annotation File Manager
- When clicked on View Source button in Annotation List View, the highlighted code is now positioned in the center

### Fixed
- Clicking on Goto Annotation Modeler from SM toolbar throws an error
- Annotation Detail View panel is visible when button to slide panel into view is clicked


## [1.0.14] - 2020-08-27
### Added
- Ability to delete annotation terms from any local source
- Service Manager and Annotation File Manager are not accessible for CAP projects

### Fixed
- When creating a new annotation file the accordion for the newly created annotation is collapsed on the Annotation List view 

## [1.0.13] - 2020-08-12
### Added
- When annotations are copied they now appear in the target annotation source highlighted
- Ability to sync V4 services in the Service Manager
- Ability to view source code in code editor open in read-only mode, for annotation terms coming from backend sources

### Fixed
- Icons representing services and projections in the List View are not displayed


## [1.0.10] - 2020-07-29
### Added
- Ability to select a target like Entity Types, Entity Sets, etc through a breadcrumb navigation in Annotation View

### Fixed
- Annotation Term Common.ValueList when present in source metadata.xml does not display in Annotation View
- Annotation or Service Manager once opened for one project, does not open for another project present in the same workspace

## [1.0.8] - 2020-07-14
### Added
- Annotation File now opens to the side of the Service Modeler when the 'Show in Source' icon is clicked which enables 
  side-by-side development
- Ability to change annotation target like Entity Types, Function Imports, Entity Sets in the Annotation List View
- Ability to sync to a steampunk service

### Fixed
- Poor Performance in the Annotation List View and the Annotation File Manager when they are side-by-side
- 'Copy locally' icon is not removed in the Annotation List View when all local annotation files are deleted or disabled
- All annotation sources are expanded when an annotation is selected in the Annotation List View

## [1.0.6] - 2020-07-01
### Added
- Annotation Description is now provided via tool tip in the Annotation List View and Annotation Detail view
- Ability to search for annotation in the Annotation list View
- Ability to a open service via command palette for projects that conatins multiple services
- Ability to open service via the right click context menu from any directory in the project

### Fixed
- For workspace having mix of LROP and OVP projects, re-launching Service Modeler does not work once it has been launched and closed previously
- Navigate to Annotation Modeler button in Service Modeler toolbar gives error when used in an OVP project having multiple services

## [1.0.4] - 2020-06-17
### Added
- Navigation to Annotaion View is now possible by clicking on the View Annotations icon `@` next to the projections in Service Modeler List View mode.

### Fixed
- For workspace having more than one project, project selection dropdown in command pallete to open Service Modeler does not close after a project is selected
- Actions like create and delete in Annotation File Manager causes error when opened side-by-side with Annotation View
- For OVP projects containing multiple services, command to open Service Modeler does not show services option in SAP Business Application Studio
- A new Service Modeler tab is opened everytime when launching Service Modeler, even though its already opened
- No annotation icon is shown in the side panel when the service node is selected 

## [1.0.0] - 2020-06-16
Release status: GA 
We are pleased to announce the official GA of the SAP Fiori tools - Service Modeler extension

## [0.0.734] - 2020-06-03
### Added
- Command to launch Service Modeler from Command Palette now shows the option to select a service when multiple services are present in an OVP project

### Changed
- Annotation terms and types will now appear without the namespace in the Annotation View

### Fixed
- Adding a new service when existing metadata.xml file is open generates errors
- Copy pop up does not show up when more than one local annotation file is present during copying of annotation term
- Deleting of local annotation file from Annotation File Manager caused error when opened side-by-side with Annotation View
- Local annotation file when created from Annotation File Manager did not show up in Annotation List View when open side-by-side

​
## [0.0.733] - 2020-04-22
### Added
- Ability to copy annotations from backend and local annotation files in the new wider annotation view
- List View is now the default view of the service model

## [0.0.732] - 2020-04-22
### Added
- Ability to add additional services to OVP projects
- Ability to sync metadata files for an existing services
- New annotation detail view for UI.LineItem annotations

### Fixed
- Annotation files not associated to the service being viewed are showing in Annotation List View

## [0.0.729] - 2020-04-08
### Added
- Ability to see list of annotation files for a particular service.
- Ability to view annoations and go to text editor for a particular annotation in the new wider annotation view.
- Automatical update the Annotation List View panel with any changes that happen in the Annotation File Manager.

### Fixed
- Service Manager and Annotation File Manager doesn't appear well in VS light theme 
- Annotation File Manager table doesn't scroll
- An unneccesary Active column displaying in Service table in Service Manager
- Deleting an inactive Annotation File from Annotation File Manager throws an error 
- Switching between Annotation File Manager and Service Manager does not retain changes made on Annotation File Manager

## [0.0.728] - 2020-03-25
### Added
- New tabbed view to manage data sources such as Services and Annotation files
- To launch Service Manager, right click on `manifest.json` and select `Open Service Manager`
- Ability to see list of services in Service Manager
- Ability to delete local annotation files in Annotation File Manager
- New larger view for listing annotations
- New (initial) approach to render graph. Improvements include curved lines between nodes, faster initial load time, top to bottom diagram orientation, association lines only shown on node selection

### Fixed
- Path to parent directory in Annotation File Manager incorrectly shows slashes in two directions (Windows)
- Incorrect update of data sources in `manifest.json` when two local annotation files with same name are created
- Incorrect priority order between Service Manager annotation list view and `manifest.json` when some files are enabled/disabled from Annotation File Manager

## [0.0.725] - 2020-03-11
### Added
- Annotation File Manager. To launch, Right click on manifest.json and select `Manage Annotation Files`
- Ability to create a new local annotation file
- Ability to drag and drop to change hierarchy of annotation source files
- Ability to enable and disable any annotation source file
​
## [0.0.722] - 2020-02-27
### Fixed
- Service Modeler does not load when underlying service have invalid annotations
- Service Modeler crashes when annotation icon @ is clicked
- Order of local annotation files is not correct in the Annotation List View
​
### Added
- New Annotation List view introduced which shows annotations from each source for a target
- Ability to copy backend annotation to a local annotation file
- Ability to jump to local annotation source file from Annotation List view
- CHANGELOG.md documenting changes
​
## [0.0.721] - 2020-02-19
### Added
- Initial version
