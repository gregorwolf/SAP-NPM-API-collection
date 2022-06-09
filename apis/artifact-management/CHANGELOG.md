## 1.12.1 - 8 June, 2022
### Fixed
* Adjust the banner image for preview & launchpad.
* Reference higher ui5 version for launchpad to enable latest features from FE app.
## 1.12.0 - 27 May, 2022
### Added
* Added new CLI api `get-data-info` to support parsing data file (csv, xml)
### Changed
* Refactor mta.yaml to support CI/CD service
## 1.11.1 - 17 May, 2022
### Fixed
* Reference ui5 with specific version for preview & launchpad.
## 1.11.0 - 26 April, 2022
### Added
* Enable application logs service.
## 1.10.0 - 7 April, 2022
### Changed
* Changed logic to identify PDM entities and service.
### Fixed
* Fixed Delta Deployment failure on first deploy issue.
* Fixed the error thrown in getProjectInfo API when result is undefined.
## 1.9.0 - 24 March, 2022
### Added
* Added support to create destination to workflow instance on deploy.
## 1.8.1 - 17 March, 2022
### Fixed
* Duplicate MDK UI apps fixed.
## 1.8.0 - 10 March, 2022
### Added
* Added support for Delta-build.
* Added support for Delta-deploy.
### Fixed
* Fixed Deploy failure issue when MDK Task UI app uses Document FormCell control.
* Fixed issue where wrong MDK display name was returned to homepage.
* Fixed issue where incorrect description of role is added to mta.yaml.
* Fixed Deploy failure issue if Role Collection already exists in this subaccount.

## 1.7.0 - 24 February, 2022
### Added
* Added support for Personal Data Manager.
### Fixed
* Fixed Deploy failure issue due to missing xsappname from xs-security.json.
* Fixed issue with generating new role on Cloud Foundry if the project is already deployed.

## 1.6.0 - 10 February, 2022
### Added
* Added immutability/read-only view to Project-API result object data structures.
### Changed
* Removed in-memory cache for project summary.
### Fixed
* Fixed roles issue when xs-security.json is absent.

## 1.5.0 - 28 January, 2022
### Added
* Support capability to return the user roles for LCAP application.
### Changed
* Enhanced taskUi item name to use name of the app instead of `TaskUI`.
### Fixed
* Fixed issue related to persistence of links even when dependency was deleted.
* Fixed issue where click on the application tile in preview page was unresponsive.

## 1.4.0 - 07 January, 2022
### Added
* Added new API getApplicationDeploymentSummary() which provides information about project overview url and the time of last successful deployment time in UTC format.
### Fixed
* Fixed UI issues on preview and application overview pages.
* Fixed the issue where sample data for external service was not read immediately after creation.

## 1.3.0 - 22 December, 2021
### Added
* Support dependency relationship between entity and sample data.
* Support version deployment as per the version in project.
* Support sample data for external services.
* Added support for reading full name of external entity.
* Set default runtime allocation for LCAP apps.
### Changed
* Updated open source libraries to newer versions. 
* Handling references from artifact-management and it's corresponding types.
* Enhanced `getProjectOverviewURL` cache.
### Fixed
* Improved performance w.r.t. watch functionality.
* Fixed launching of Fiori app while link opened without launchpad.
* Fixed issue w.r.t. project in subfolder structure.

## 1.2.0 - 24 November, 2021
### Added
* Added workflow section containing workflow apps such as My Inbox, Workflow Definitions and Workflow Instances in `Application overview page`.
* Added cache implementation for `getProjectOverviewURL` api.
* Enhanced info message codes to indicate the source module in case of exceptions.
* Added item links between workflow and taskUi app, workflow and service entity, and two db entities.
### Changed
* Force update mdk module during deployment.
* Enhanced the mechanism to identify the workflow folder.
### Fixed
* Fixed issue related to concurrent access to `readItems` api.


## 1.1.2 - 16 November, 2021
### Fixed
* Fixed deploy issue with respect to launchpad.

## 1.1.1 - 15 November, 2021
### Changed
* Changed the title of landing page after deployment from `Project Preview` to `Application Overview`.

### Fixed
* Fixed Fiori application deployement issue by adding @ui5/cli dependency for HTML5 module in mta.yaml.
* Handled scenarios where CDS returns empty folders map.
* Fixed import issues in artifact-management-types by adding correct references to artifact-management-base-types.

## 1.1.0 - 25 October, 2021
### Added
* Added new api `getManifest` and corresponding CLI command `show-manifest` to get contents of mta.yaml.
* Added new api `getProjectOverviewURL` and corresponding CLI command `get-projectoverview-url` to get the url of project overview page on CF.

* Created separate package `@sap/artifact-management-types` for declaration files.
* Created separate package `@sap/artifact-management-base` which contains helper classes and methods that are used by `@sap/artifact-management` and plugins.

* Added `workflowTaskEnabled` tag to service entity which corresponds to the data model annotated as workflow task enabled.
* Added `db` and `srv` tags to identify db and srv modules distinctly.

* Added support of port option in run api.
* Added support of identifying and reading projects when present in subfolders of given path.
* Added support of info messages in project data which describe reasons for missing data or errors.
* Added resource for connectivity in mta.yaml to support external services.

### Changed
* Enhanced mta.yaml creation to add workflow service only when workflow module is present in project.
* Enhanced `run` and `deploy` api to generate project overview page which showcases web applications and services in a new UI.
* Remove enum types from project.
* Made tags non-optional.

### Fixed
* Removed log comments from CLI output
* Fixed failure of logging to console even when debug option was provided in CLI command.
* Fixed failure of `build` api when called for more than one project.


----

## 1.0.1 - 20 August, 2021
### Added
* Added support to package the library with webpack.

### Changed
* Removed workflow application from html5 app container of local run and Cloud Foundry deploy.

### Fixed
* Fixed failure of watch items when content of any file is invalid.

----
## 1.0.0 - 03 August, 2021
* Initial release.
