## 1.5.0

### New Features
- The extension can now be used with local database connections on ARM platforms. Note that the limitations of the SAP HANA "hdb" Node.js client apply, i.e. SAP HANA User Store connections are not available

### Fixes
- Queries that return multiple result sets are displayed correctly
- The SQL console asks whether to save the current content before opening a file
- The SQL console auto-save behavior can be controlled via the Visual Studio Code setting "files.autoSave". Supported modes are "off" and "afterDelay". All other values default to "afterDelay".
- The list of SAP HANA Database Explorer connections more closely reflects the list shown in SAP HANA Database Explorer
- Removed a superflous button in the file overwrite confirmation dialog
- The SQL console respects the setting "SAP HANA Database Explorer" > "Max Sql Result Size" for local connections

## 1.4.0

### New Features
- The catalog browser shows the list of objects. The objects can be filtered by schema. The (filtered) list of objects can be further searched via the standard Visual Studio Code functionality for tree views
- The SAP HANA Database Explorer on the SAP Business Technology Platform can be opened from each SAP HANA Database Explorer connection
- The SQL console can open content from and save content to files
- The list of SAP HANA Database Explorer connections can be hidden via the setting "SAP HANA Database Explorer" > "Show Database Explorer Connections"
- Local connections can be added using credentials from the SAP HANA User Store, if installed

### Fixes
- Fixed a warning that could occur when adding a new local database connection
- Fixed an issue that could cause local encrypted connection to fail if no certificate was provided
- The deletion of local database connections has to be confirmed
- The extension loads correctly on ARM platforms including Apple M1; note that local database connections will not be available on these platforms

## 1.3.4

### Fixes
- Better error handling if the command "cf.login" does not exist

## 1.3.0

### New Features
- The extension now provides an SQL console that can be used to execute SQL directly from the IDE

## 1.2.0

### Fixes
- Update dependencies

## 1.1.0

### Fixes
- Update dependencies

## 1.0.0

Initial release