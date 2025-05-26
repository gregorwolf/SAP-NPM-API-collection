## 1.17.0

### New Features
- Modules can be bound to an SAP HANA Cloud tenant
- Deployment parameters can be configured during module creation

## 1.16.0

### New Features
- Support headless module generation

## 1.15.0

### New Features
- Support Fabric Virtual Table (hdbfabricvirtualtable) in new projects
- Support Collection Adjacency Index (hdbcollectionadjindex) in new projects
- Support Structured Filter (hdbstructuredfilter) in new projects

### Fixes
- Security fixes

## 1.14.0

### Fixes
- Security fixes

## 1.13.0

### Fixes
- Security fixes

## 1.12.0

### New Features
- HDI Deployer v5 in new HANA Database modules
- Updated SAP Developer License

## 1.11.0

### New Features
- Added a hint how to set the database ID in XS Advanced projects

### Fixes
- Service key creation fails in XS Advanced

## 1.10.0

### New Features
- A database ID can be entered manually when binding the module to a service instance

### Fixes
- Renamed the database versions to their official names

## 1.9.0

### New Features
- The configuration of new projects now includes a mapping for hdbeshconfig
- Switch to Node 16

## 1.8.0

### New Features
- Login to Cloud Foundry is delegated to the Cloud Foundry Tools Visual Studio Code extension if available

## 1.7.0

### New Features
- The configuration of new projects now includes a mapping for hdbschedulerjob

## 1.6.0

### Fixes
- User-provided services are not shown as binding services

## 1.5.2

### Fixes
- The correct CF API endpoint is selected in extension landscapes

## 1.5.1

### Fixes
- Support CF CLI version 8
- Improved database selection in trial accounts

## 1.5.0

### Fixes
- The HDI namespace validation has been relaxed
- Parsing of .env files has been improved

## 1.4.0

### Fixes
- Generation could fail because the Cloud Foundry space was not set correctly

## 1.3.0

### New Features
- The configuration of new projects now includes a mapping for hdbcollectionindex

### Fixes
- Upgrade Yeoman generator version from 4 to 5
- Use Cloud Foundry API version 3
- Usability improvements

## 1.2.0

### Fixes
- Fix generated .hdiconfig file to remove deployment warning
- Set the correct permissions for generated .env files
- The home directory is now found correctly on Windows
- The "bind-local" Cloud Foundry CLI plugin is no longer required

## 1.1.0

### New Features
- A .gitignore file is created on the project level when called from a project generator

### Fixes
- Update dependencies

## 1.0.1

### Fixes
- Fixed module .gitignore entry for the node_modules folder
- Updated version of @sap/hdi-deploy in generated package.json

## 1.0.0

Initial release