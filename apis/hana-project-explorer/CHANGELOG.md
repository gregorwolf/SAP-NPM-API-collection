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
