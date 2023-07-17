## 1.15.0

### New Features

- A warning is issued if a project is using an outdated HDI deployer version
- The artifact creation wizard supports application-time and system versioned tables

### Fixes

- CAP projects without CDS files are displayed correctly
- The SAP HANA Database Explorer URL is calculated correctly if a custom URL is configured

## 1.14.0

### New Features

- The deployment sets the "stop_on_error" parameter to collect as many errors as possible
- The "Add database connection" wizard allows binding to a "schema" service
- Database modules can be bound to application-managed services

### Fixes

- CAP project improvements
- The deployment state is set correctly for CAP projects

## 1.13.0

### New Features

- Deployment traces can be configured via a setting
- Scheduler jobs (hdbschedulerjob) can be created by the artifact creation wizard
- Schema service instances can be bound to non-target modules

### Fixes

- Supported file suffixes are considered case-insensitive
- Unable to create virtual table using virtual table editor in BAS for RMS remote source

## 1.12.0

### Fixes

- An error could occur if a virtual table file was opened after it was created via the artifact creation wizard
- Artifact creation wizard doesn't detect project if hidden folders are present
- The getting started scenario doesn't open
- The .env file variable expansion incorrectly expands simple variables

## 1.11.0

### Fixes

- Disable tracking via SAP Web Analytics
- Resolve placeholders in .env files
- Virtual Table Editor with setting Auto save: afterDalay - causes text to be deleted while typing
- Support Mode Export hits an error "NO REMOTE DATA option"

## 1.10.0

### New Features

- The virtual table editor was renamed from "Advanced Virtual Table Editor" to "Virtual Table Editor"

### Fixes

- Fixed a typo in the guided development scenario
- The virtual table editor did not work correctly with the SDI HanaAdapter
- The virtual table editor did not escape identifiers correctly
- The virtual table editor did not use the correct database connection in some scenarios

## 1.9.0

### New Features

- When working with migration tables the project explorer can automatically set the development mode

### Fixes

- Files from tree are opened in text the graphical editor in VS Code
- Adjustments for the Cloud Foundry CLI version 8
- The advanced virtual table editor did not show the data correctly in some scenarios

## 1.8.0

### New Features

- Resources of type "org.cloudfoundry.managed-service" are supported as database modules
- The SAP HANA Cloud, SAP HANA Database Deployment Infrastructure (HDI) Reference guide can be opened from each HDI artifact editor

### Fixes

- The getting started wizard creates the calculation view of the correct type
- The new virtual table editor can edit virtual table files specifying advanced options
- The images of the getting started wizard are shown correctly

## 1.7.0

### New Features

- Artifacts can be reverse-engineered into the workspace from the deployed artifacts of an HDI container exposed as a user-provided service.
- New editor for virtual tables
- A procedure grantor can be created when adding a new database connection

### Fixes

- The extension description was not shown correctly
- The database ID can be entered manually when running a support-mode import

## 1.6.0

### New Features

- A warning is displayed if services bound to a database modules do not match the database ID defined in the mta.yaml file.
- Artifacts can be reverse-engineered into the workspace from the deployed artifacts of an HDI container.
- Multiple files can be deployed at the same time.
- The deployment state of a database module can be synchronized with the deployment state from the database
- The database artifact creation and guided development are now part of the project explorer extension.

## 1.5.0

### New Features

- A database module can be bound to a user-provided service
- A warning is displayed if services bound to a database modules do not match the current Cloud Foundry space. Users can choose to automatically unbind these services via a setting.

### Fixes

- Improved the UI for creating a new database connection
- Improved validation of service instance names when creating a new database connection
- Don't show services that are already bound when creating a new database connection

## 1.4.0

### New Features

- Support Mode Export: for troubleshooting purposes database artifacts can be selectively exported to be analyzed individually
- Create an hdbgrants file when adding a user provided service as a new database connection

### Fixes

- Show more information in the warning message when binding a module to a service
- Fix an issue where the SAP HANA Database Explorer could not be opened

## 1.3.0

### New Features

- The bind operation considers the schema name of the service to be bound to determine whether to show the confirmation dialogs

### Fixes

- An error message is shown if a service can't be bound because of an invalid MTA configuration

## 1.2.0

### New Features

- Multiple services can be bound or unbound via a single button
- A warning is displayed if .env files are not included in a module's .gitignore file

## 1.1.0

### New Features

- A new option for binding to the default service is shown when binding a module to a service

### Fixes

- Binding a module works if the module name is different from the module path

## 1.0.0

### New Features

- Warn when binding a module to an existing service
- Add a setting for clearing the deployment log when a new deployment is started
- The database connection details can be validated when adding a new database connection to a project
- Confirm if auto-undeploy should be disabled when binding to an existing container
- HDI configuration files are shown in the file tree

### Fixes

- Improved error message if a service already exists
