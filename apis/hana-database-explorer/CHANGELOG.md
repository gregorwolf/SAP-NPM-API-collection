## 1.9.0

### New Features
- A SELECT or CALL statement can be generated for database objects via the context menu of the database objects in the catalog browser. By default the statement will be opened in a new SQL console. As an additional option the statement can be immediately executed via the "Open Data" option.

### Fixes
- CREATE statements are generated correctly for objects with lower-case or mixed-case names.

## 1.8.0

### New Features
- A SQL console can be opened in administrator mode for SAP HANA Database Explorer HDI container connections.

### Fixes
- Icons in the database tree could be displayed incorrectly.
- Database switching was not possible when not logged in to Cloud Foundry.
- Database objects are now grouped by schema in the catalog browser.
- The list of schemas in the catalog browser's schema filter is now sorted.

## 1.7.0

### New Features
- Database selection in the SQL console is now possible across database connection types (local connections, SAP HANA Database Explorer connections).
- SQL files can be opened directly in the SQL console via "Open in SAP HANA SQL Console" from the context menu.

### Fixes
- Auto-save was not working correctly in the SQL console under certain circumstances.
- When editing a local database connection the database information could be incomplete.
- Connections to SAP HANA Database Explorer databases are kept open to reduce the number of reconnects.
- SAP HANA Data Lake Files connections are displayed correctly in the database list.

## 1.6.0

### New Features
- The SQL console can execute statements with parameters. When a statement with parameters is encountered, a new tab is shown that allows the user to enter the parameter values and then execute the parameterized statement.
- The current connection's auto-commit state can be set from the SQL console via an icon in the menu bar.
- The name and full name (schema + object name) of database objects can be copied to the clipboard via the context menu of the database objects in the catalog browser.
- A CREATE statement can be generated for database objects via the context menu of the database objects in the catalog browser. By default the CREATE statement will be opened in a new SQL console. As an additional option the CREATE statement can also be copied to the clipboard.

### Fixes
- The font size of the SQL console can be set via the setting "editor.fontSize"
- Scalar results were not displayed if a statement returned additional result sets
- The database list displays folders defined for SAP HANA Database Explorer connections
- The database list displays SAP HANA Data Lake connections in the SAP HANA Database Explorer connection list
- Performance optimizations for creating database connections

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