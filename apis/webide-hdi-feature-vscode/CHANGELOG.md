## 1.14.0

### Fixes
- Data preview on multi-join node
- Snapshot interface - Parameter type should be static list
- Renamed columns do not get updated in definition tab

## 1.13.0

### New Features
- Calculation views can define a snapshop view for a specific query

### Fixes
- When executing the debug query, the error message is now selectable for copy/paste
- The "add-table-function" item is displayed properly 
- Restricted column that have been renamed can be copied
- Variable extraction of shared dimension in star join retains reference column
- Mapping of an input parameter to a table function is prevented
- Currency conversion allows the selection of a calculated columns from dimensions
- The detail column panel allows multiple column selection
- Generated timetable has no content and leads to deployment failure when the namespace is not empty
- Rename input parameter and adjust references causes build failure when the impacted objects are hdbroles

## 1.12.0

### New Features
- Median as aggregation function
- Session variables can be mapped into data sources

### Fixes
- Performance Analysis shows incorrect info about the datasource
- Auto Parameter Mapping does not propagate parameter's type
- Error message is not clear for time table creation when is not logged-in to Cloud Foundry
- Mass synonym creation requires at least one external service to work
- Variable extraction from underlying view does not work
- "Red X" is shown when XML modified by GUI for dimensions having column with dot sign in star join
- Creation of Pruning configuration table fails with no content in ".hdbtable" file
- Currency conversion semantics of a measure goes off when calculation view is closed and re-opened in BAS
- Copying multi-join node loses copied data information that results into inconsistent XML
- ComboBox list becomes uneditable after selecting median aggregation
- Incorrect alias proposal causes build failure
- Auto mapping parameter hangs on redoing the auto mapping

## 1.11.0

### Fixes
- Remove superfluous Input ID in properties of data sources in Union nodes
- The option "Mass Import of Synonyms" filters out schemas
- Improve the filter selection in data preview
- Relax fiscal calendar variant type format for more tolerance towards whitespaces
- Auto Parameter Mapping Issue
- Change default hierarchy type to SQL
- "Maintain Time Tables" not working in Business Application Studio

## 1.10.0

### New Features
- Prune data sources that do not contribute to requested measures in a union
- Objects referecing an input parameter, variable, calculated column, or restricted column can be displayed

### Fixes
- Show errors if virtual table parameters cannot be retrieved
- Fixed an error that could lead to an empty parameter pane
- Fixed an error that could lead to an empty details pane
- Data preview could fail if multiple views with the same name exist
- Usability improvements

## 1.9.0

### New Features
- The data preview can show hierarchies
- Parameter mappings can be managed when replacing a data source

### Fixes
- The replace data source dialog contained unexpected steps
- A user-friendly message is shown if a connection to Cloud Foundry cannot be established
- The data type of count columns is displayed correctly
- The synonym editor did not fill-in schema name when using target container service
- The calculation view editor details pane shows content when more than 3 editors are open

## 1.8.2

### Fixes
- External objects are now shown when adding data sources in the synonym editor
- Time data generation now works when generating fiscal data with variants

## 1.8.1

### Fixes
- The configuration option to explicitly configure whether a data preview query should be automatically executed did not work correctly under some circumstances

## 1.8.0

### New Features
- Improved usability and user experience of the find objects dialog
- A new configuration option was added to explicitly configure whether a data preview query should be automatically executed
- The data preview allows the preview of hierarchies on SAP HANA Cloud

### Fixes
- The input parameter/variable mapping dialog is refreshed correctly
- The non-equi-join cardinality is set correctly
- An error message is shown if the generation of time data fails
- Fixed the conversion of graphical restricted columns to expressions
- Fixed the data preview after reordering dimensions
- Fixed the display of the parameter pane when multiple calculation view editor instances are open
- Time data is generated correctly if the project is inconsistent
- Fixed the aggregatable flag for count distinct columns
- Stacking multi-join nodes could lead to erratic behavior
- Spatial join information could be lost in XML or wrong

## 1.7.0

### New Features
- Calculation views can be configured to use the session user when evaluating masked data
- Improved value help for calculation view execution hints

### Fixes
- Improved message if a debug query fails
- Fixed the deletion of a hiarchical privilege in the analytical privilege editor
- Fixed an error when mapping fuzzy search parameters

## 1.6.0

### New Features
- Additional keyboard shortcuts
- Roles can be chosen graphically when creating a synonym
- Calculated columns, input parameters, and restricted columns can be filtered
- The default join in a star join is set to left-outer instead of referential
- Improved usability when debugging a calculation view
- Enable data preview using a different database user
- Input parameters of calculation views can be mapped to input parameters of SQL views

### Fixes
- It is now possible to show the source service when creating a synonym
- Improved usability when copying a variable with a filter
- Opening a dimension calculation view when debugging a start join works as expected
- It is now possible to set a client column when the data source is a calculation view
- The default values for generating time tables are no longer invalid
- Expressions in non-equi-joins are validated correctly
- The expressions for new default values of input parameters and variables are now marked as SQL
- Warn when assigning a variable to an attribute that already has a variable assigned
- Fixed an inconsistency when replacing a data source with a node
- Fix shortcuts on MacOS

## 1.5.0

### New Features
- It is now possible to display the name of the service through which an external object is accessible when adding an object

### Fixes
- Fix an issue that could lead to orphaned table nodes in multi-join node models
- Fixed replace with data source in star join models
- User-provided services using the target container credentials are handled correctly
- Set "Aggregate All nodes" to true by default
- Column remapping works now if the DEL key is used to remove the old mapping
- Fixed an issue that could lead to an inconsistency between the model in the file and the model in memory
- Fixed incorrect display of SQL and column engine functions
- Removed the field "Default Member" from node "Semantics" --> "General"
- Fix quoting of numeric input parameters
- Add the "Like" operator to the expression editor
- Function keys are now working correctly when used as shortcuts
- Include notes when copying a parameter

## 1.4.0

### New Features
- Add keyboard shortcuts for commmon modeling actions
- Keep join type and cardinality in the properties view when a non-equi-join uses an expression
- Enable copy and paste of input parameters, variables, calculated columns, restricted columns, and hierarchies

### Fixes
- Fix an issue that could lead to deployment failures when using non-equi joins
- Fix an issue where changes in a calculation view are not saved after deploying
- Add infobox information to flags under Semantics --> Advanced
- Fix generated XML for variables of type "Single Value" that use an expression as default value
- Add "aggregate all nodes" option for migrated calculation views
- Fix an issue where filter expressions on a multi-join node could disappear after closing the editor
- Fix an issue where the validation of a newly added filter expression on a multi-join node fails
- Fix an issue where adding an expression to a multi-join nodes results in deployment failure for the calculation view
- Fix an issue where changes to column "Label" could be lost
- Fix wrong expression when creating a non-equi join
- Add missing cancel button in non-equi join "Create Constant" dialog
- Fix value help dialog for "Single Value" parameter value
- Remove deprecated field "Count Star Column" from Semantics --> General

## 1.3.0

### New Features
- Reordering of variables and parameters in the semantics node
- Replace a data source with an existing node
- Improved "Replace data source" dialog

### Fixes
- Fix editor conflicts by consuming new UI library version
- The result column is no longer offered as a sort column in rank nodes
- Further reduced size of headers of requests sent to the backend
- Refactoring improvements
- The "Dynamic Ordering" or "Dynamic Partitioning" flags could be lost after reopening the editor
- The synonym editor now allows selecting multiple synonyms for deletion
- The settings of a non-equi join node could be lost after reopening the editor
- A column engine expression in calculated columns can now be switched to an SQL expression
- Fixed an error where no information is displayed in aggregation nodes if a column has a defined currency conversion
- Non-equi-join nodes now display all nodes
- Join expressions display all columns
- It is now possible to manually enter a restriction value for an analytical privilege
- The to_alphanum expression is not available in SAP HANA Cloud

## 1.2.0

### New Features
- Calculation view refactoring
- Data preview of calculation views

### Fixes
- Reduced size of headers of requests sent to the backend

## 1.1.0

### New Features
- Intermediate data preview from calculation view nodes

### Fixes
- Long analytical privilege names are no longer cut off in the analytical privilege editor
- Fixed an issue with the background color in the analytical privilege dialog
- Fixed the auto-creation of temporal data when starting from an empty calculation view file

## 1.0.0

Initial release
