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