# SAP HANA Database Explorer Change Log

## 1.34.0

### New Features
- SAP HANA Cloud trace files are listed in the database list and can be anlysed via the trace file viewer.
- SQL statements can be optmized via Joule. This feature is only available in SAP Build.

### Fixes
- The generation of SELECT and INSERT Statements for JSON collections was missing
- The Joule commands were missing in SAP Build Code
- SQL statement results in Joule are formatted correctly
- Improved error reporting in Joule
- Deleting a table takes a long time after inserting AI generated test data

## 1.33.0

### New Features
- SQL statements can be generated via Joule. This feature is only available in SAP Build.

### Fixes
- Object dependencies are not shown correctly in the dependency viewer for calculation views of type "cube".
- Test data generation via GenAI did not work correctly in some cases for auto-generated column values
- Test data generation via GenAI did not work correctly in some cases for vector columns
- Test data generation via GenAI did not work correctly in some cases for calculated columns
- Test data generation via GenAI did not work correctly in some cases for virtual tables
- The run option "Explain Statement via AI" was incorrectly shown in Visual Studio Code
- Adding a local HDI container connection asks for a user name after while adding the connection
- The SQL analysis section was sometimes missing from the "run" menu in the SQL console
- Adding a database connection was not possible if the connection user was required to change its password
- The data preview of calculation views (column views) of type "dimension" did not work correctly

## 1.32.1

### Fixes
- The SQL console doesn't set row limit and byte limit from the Visual Studio Code settings
- SQL console tabs could cause high CPU load
- The database filter doesn't work correctly for HDI container connections

## 1.32.0

### New Features
- Running queries on local connections can be canceled.
- "SAP HANA Database Explorer" connections can be deleted.
- Test data can be generated for one or more tables via GenAI. This feature is only available in SAP Build.
- Analytic data preview for calculation views (column views).

### Fixes
- Dependency viewer performance improvements

## 1.31.0

### New Features
- All schemas can be collapsed or expanded at once via buttons in the toolbar in the dependency viewer.
- The schema filter in the catalog browser is saved across sessions.

### Fixes
- Performance improvements

## 1.30.1

### Fixes
- SQL console performance improvements
- Fixed an error that the database type "NAMED_USER" is not supported
- The database list could be modified unintentionally by a SQL console
- Analyzing an executed plan could fail in certain scenarios
- The dependency viewer shows too many indirect dependencies

## 1.30.0

### New Features
- New settings for the SQL console: auto-pair characters, display null values as, maximum number of open results, command separator.
- Local connections can be organized into folders.

### Fixes
- The table metadata dialog could not open in some situations.
- SAP HANA XS Advanced connections could not work when using a self-signed certificate.
- Changing the password of a database user could fail silently.
- Adding a remote database connection fails with "Parameter validation failed".
- The dependency viewer did not show analytical privileges in some situations.
- UX improvements for the dependency viewer.
- Metadata dialog performance improvements.

## 1.29.0

### New Features
- New connections can be added to "SAP HANA Database Explorer Connections" and "SAP HANA XS Advanced Connections" in the database list
- Show EPM query sources and EPM models in the catalog browser
- Create and analyze prepared plans of SQL queries for "SAP HANA Database Explorer Connections"

### Fixes
- Error "Statement library is not found" occurs after SAP Business Application Studio is refreshed
- SQL formatting causes performance issues in the SQL console editor
- Table metadata dialog filter does not work correctly

## 1.28.1

### Fixes
- SAP HANA XS Advanced connection were not loaded correctly
- The database list could be loaded multiple times in certain situations when using SAP HANA XS Advanced connections
- Running "Explain Plan" of a parameterized SQL select statement did not work correctly
- Minor UI improvements

## 1.28.0

### Fixes
- Statement explanations should be wrapped to fit into the available SQL console space.
- The SAP HANA Database Explorer web application can be opened via an icon at the top of the database list.
- Vector data is shown as a string instead of binary values in result sets in the SQL console.
- When the session variables are captured in a plan graph, they should be set before re-executing the query.

## 1.27.0

### New Features
- The database list can be sorted via the setting "SAP HANA Database Explorer.DatabaseListSortOrder".
- The combined schema and object filter in the catalog browser has been split into separate filters for schemas and objects, respectively.

### Fixes
- Performance improvements.
- Fixed an issue that could lead to users not being able to connect if a password change is required.
- "Open" context menu entry is missing for tables and indexes.
- New SQL consoles are opened backed by a file without a path.
- The type of indexes shown in the dependency viewer is wrong.
- The colums of database objects in the dependency viewer is in the same order as in the metadata dialog.
- Some objects were missing metadata in the dependency viewer.
- Objects in the dependency viewer under the minimap area can't be moved.

## 1.26.0

### New Features
- Objects shown in the dependency viewer can be set as the root object via the object's details pane

### Fixes
- SQL files can be opened with the SQL console
- Add an option to disable result formatting in the SQL console

## 1.25.0

### New Features
- The dependency viewer can check for cycles in a dependency graph
- The graph direction can be configured in the dependency viewer
- The dependency viewer graph can be limited to a single schema

### Fixes
- Table metadata link not shown in dependency viewer
- SQL statements are deleted unexpectedly
- The cursor could jump to the end of the SQL console
- The SQL console result format settings are more consistent
- The SQL Plan Execution Monitor is opened only once
- Improved zoom settings in the dependency viewer

## 1.24.0

### New Features
- The metadata of tables and indexes can be visualized graphically by clicking on a table or index in the catalog browser.

### Fixes
- Dependency Viewer: Auto-collapse external dependencies by default
- The SQL console correctly displays SQLScript print output for local connections

## 1.23.0
### New Features
- Updated SAP Developer License

### Fixes
- Several minor SQL console fixes.
- SQL Console is opened first time via SAP HANA Project Explorer extension

## 1.22.0

### Fixes
- All the schemas are not listed under schema filter
- Tooltip for the export icon in Dependency Viewer

## 1.21.0

### New Features
- The maximum graph depth can be set for the dependency viewer.
- The dependency viewer indicates how many objects are shown based on settings like filters and graph depth.
- The dependency viewer allows saving graph snapshots as an SVG image.

### Fixes
- The mini map was not showing after graph size is changed in the dependency viewer.
- User name and password can be saved after entering the credentials for a SQL console or database connection.
- User name and password will be read from the settings if present and stored in the secure store.
- The statement execution time was calculated incorrectly in some situations.
- Improved error messages when loading SAP HANA Database Explorer connections.
- Empty query parameters were handled incorrectly in some situations.

## 1.20.0

### New Features
- Object metadata can be displayed from the dependency viewer.

## 1.19.0

### New Features
- When executing multiple statements in the SQL console, failed executions can be handled individually per statement.
- Objects in the dependency viewer are grouped by schema. Schemas can be collapsed or expanded to make the graph easier to view.
- Objects in the dependency viewer can be filtered by object type.
- HDI containers can be added as local database connections.
- The metadata of views can be visualized graphically by clicking on a view in the catalog browser.
- An INSERT statement can be generated for tables via the context menu of the database objects in the catalog browser. The INSERT statement will be opened in a new SQL console.
- Local database connections can be added by providing the connection information in a JSON format, for example, from a Cloud Foundry service key.
- Local database connections can be configured to use Kerberos authentication.

### Fixes
- Scheduler jobs were not loaded correctly.

## 1.18.0

### Fixes
- Several minor SQL console fixes.
- Updated SAP HANA clients.

## 1.17.0

### New Features
- Database objects can be visualized via a dependency viewer.
- The metadata of procedures and functions can be visualized graphically by clicking on a procedure or function in the catalog browser.
- The size of large object (LOB) column data in a result set can be configured via the setting "SAP HANA Database Explorer.LargeObjectSizeLimit".

### Fixes
- Opening the data of a table could fail in some scenarios.
- Opening a SQL console as admin did not work correctly.
- Fixed a misleading error message when downloading SQL plan files.
- SQL plan files were not downloaded correctly.
- The cursor in a SQL console could jump to the end of the text editor in some circumstances.
- CALL statements generated via the UI are not executed automatically.

## 1.16.0

### New Features
- This change log is shown after each upgrade.

### Fixes
- An error could occur if no workspace folder was opened.
- Significantly reduced the size of the extension.

## 1.15.0

### New Features
- Database connections can be filtered by name via a dedicated filter functionality in the database list.
- Database objects can be filtered by name via a dedicated filter functionality in the catalog browser.
- The database list and the catalog browser support SAP HANA job scheduler objects.

### Fixes
- SQL plan graphs can directly be opened in the SAP HANA SQL Analyzer extension without needing to save them first.
- Loading SAP HANA Database Explorer Connections does not require a Cloud Foundry org or space to be set.
- Available SAP HANA userstore entries are listed correctly when adding a database connection.
- Long-running SQL statements can be canceled in the SQL console.
- SAP HANA Database Explorer connections are not shown in the database selection list if they have been disabled via the settings.

## 1.14.0

### Fixes
- The database list in the SQL console does not show connections in subfolders.
- Application-managed database connections were not shown in the database tree.
- Opening a SQL console with an admin connection did not work correctly.

## 1.13.0

### New Features
- The SQL console is now a custom editor.

### Fixes
- A hint was added to the catalog browser to indicate if a schema filter is active.
- Virtual tables are shown with a dedicated icon in the catalog browser to distinguish them from standard tables.
- When adding a new database connection the "schema" parameter is supported in addition to "currentSchema" as an advanced option to set the connection's default schema.
- The SQL console considers the auto save delay.

## 1.12.0

### New Features
- Data from a result set can be viewed in detail by double-clicking a cell in the result set view.

### Fixes
- When executing a parameterized statement the value input box could stay enabled even if the NULL value checkbox was checked.

## 1.11.0

### Fixes
- Generating SELECT statements for tables with ARRAY type columns could fail in some circumstances
- The option of generating CREATE statements has been removed from database artifact types that do not support generating CREATE statements

## 1.10.0

### Fixes
- An error could occur when browsing database objects without a schema filter.
- Large CREATE statements are displayed correctly.
- The SAP HANA SQL Analyzer extension wasn't found in some circumstances.

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