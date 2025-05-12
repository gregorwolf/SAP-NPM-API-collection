## 1.29.1

### Fixes

- Show tenant names in addition to tenant IDs when binding to an SAP HANA Cloud tenant
- Fixed the file extension for properties files created by the database artifact creation wizard
- The end of input values could be removed in some editors
- The virtual table editor did not update the input fields correctly for some remote sources
- Special characters in .env files were not handled correctly in some cases

## 1.29.0

### New Features

- The virtual table editor supports defining columns for a virtual table

### Fixes

- The grants editor did not clear errors after 'Delete unsupported content' was clicked
- HDI container management UI improvements

## 1.28.0

### New Features

- Upgrade .hdiconfig to the latest version from the context menu

### Fixes

- Invalid schema name generated when makeUniqueName is true
- Refresh list of databases in SQL Notebook
- Welcome page doesn't display image
- Cannot pick object name in Virtual Table
- Help documentation URL for "hdbfabricvirtualtable", "hdbcollectionadjindex", and "hdbstructuredfilter"

## 1.27.0

### New Features

- SQL notebooks: reuse connection over multiple cells
- Modules can be bound to SAP HANA Cloud tenants

### Fixes

- The grants editor does not work for CAP projects
- Support mode export improvements and bug fixes
- Fixed a command naming conflict when running in a productivity tools dev space

## 1.26.0

### New Features

- Fabric virtual tables (hdbfabricvirtualtable) can be created by the artifact creation wizard
- Collection adjacency indexes (hdbcollectionadjindex) can be created by the artifact creation wizard
- Structured filters (hdbstructuredfilter) can be created by the artifact creation wizard
- New SAP HANA welcome page layout
- The grants editor supports multiple services in one file

### Fixes

- An out of memory error can happen when performing a support mode export
- Only SAP HANA Cloud database connections are listed in SQL notebooks
- The schema is set correctly when connecting via the credentials in a .env file in SQL notebooks
- Deleting a database connection in a CAP project results in an error message when binding to a service

## 1.25.0

### New Features

- GenAI assisted project generation

## 1.24.0

### New Features

- Support SQL Notebooks
- HDI Container Content Management

### Fixes

- hdbgrants editor - can not add the second item under Object Privileges
- Binding cross-container does not add proxy for XS advanced

## 1.23.0

### New Features

- Graphical editor for hdbgrants files

## 1.22.0

### New Features

- SAP HANA Artifact creation wizard shows additional hint for various table types
- Parameter com.sap.hana.di.table/try_fast_table_migration is set to true for each deployment
- Manage users and roles from the context menu of database connection in SAP HANA Project Explorer extension
- Show error in the "Problems" tab of SAP Business Application Studio if deployer version >= 5 is used without SAP HANA Database client
- Updated SAP Developer License

### Fixes

- Deployment status synchronisation
- Procedure inputs i.e. schema and schema does not appear after choosing "Create a procedure grantor" while creating UPS

## 1.21.0

### New Features

- Code Toggle for Virtual Table to switch between graphical and text editor

### Fixes

- Improved UI labels in Support mode export
- Configuration settings have "Workspace" scope
- DB modules of a CAP project are not visible

## 1.20.0

### New Features

- A SQL console can be opened for database modules
- Roles on a bound HDI container can be granted via a graphical wizard
- An SAP HANA-specific welcome page with useful information about SAP HANA development is displayed on startup

### Fixes

- Changes saved during deployment are not considered

## 1.19.0

### New Features

- Schema privileges on a bound HDI container can be granted via a graphical wizard

### Fixes

- The location ID for XSA connections was determined incorrectly
- The artifact recovery wizard works with XSA projects
- Track which application has originally generated the calculation view XML
- A confirmation message is shown after creating an HDI container service instance
- The cloud foundry login screen may incorrectly be opened for an XSA project

## 1.18.0

### New Features

- HDI service instances can be created via a wizard.

### Fixes

- The deployment status of files changed during a deployment is set correctly

## 1.17.0

### New Features

- Bound modules in an XS Advanced development scenario can be opened in the Database Explorer

### Fixes

- Fixed the names of the available database versions
- Artifact recovery works when bound to a schema service
- The deployment status of files changed during a deployment is set correctly

## 1.16.0

### New Features

- New database connections can be bound to application-managed service instances
- The artifact creation wizard supports enterprise search configurations (hdbeshconfig)
- Database connections can be deleted from the SAP HANA PROJECTS tab

### Fixes

- The list of HDI containers in a service manager instance could be empty in BAS
- Binding a target container to a schema service should not be possible
- Fixed a bug in the HDI deployer version check

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
