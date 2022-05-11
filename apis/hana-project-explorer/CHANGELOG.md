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
