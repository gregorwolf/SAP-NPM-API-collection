## 1.20.0

### New Features
- Deploy/undeploy interface calculation view for snapshots
- Allow changing the sequence of mapped columns in the mapping pane
- Added an option to apply filters to both partners of a join

### Fixes
- Fixed a Javascript error reported in performance mode
- The limit for start and end year is not correct in Maintain Time Tables
- Undo/Redo not synchronized with display for temporal table entries
- Navigation Tab bottom border changed to 2 bold lines
- Add a reload button when not logged in to Cloud Foundry
- Fixed a console error "menubutton cannot be child of sap.ui.common.toolbar"
- Restricted column editors offer wrong types of input parameters
- Removed the modeling commands from the command palette
- Red error indicator of Static list parameters doesn't go off in calculation view
- Wrong expression type for graphically modeled restricted columns
- Mass generation of synonyms creates synonyms also in unselected schemas
- Deployment of Calculation view with HDI_REQUIRES_1 Execution Hint fails.

## 1.19.0

### New Features
- Search functionality for columns in the "Columns" tab
- The impact editor displays a dedicated icon for synonyms

### Fixes
- Switching from column to expression in non equi join doesn't work if one of the data source is an alias
- Display folder dialog doesn't list all the attributes
- Error when changing output column used as window function partition
- Can't copy/paste NonEquiJoin node
- Join node in Cal View corrupted after removing incorrect mapping
- Fixed an issue with undo renaming view node
- Able to add operators in filter expression in read only mode
- Replace node option does not appear for nodes that are used more than once
- No Validation is set for Variant Table and Variant field while creating FISCAL calendar Table
- Calculation views could become corrupted
- The suffix name displayed on the object definition tab is incorrect
- Inline data preview failed on a function data source
- Rank node: input parameters cannot be selected as option to provide value for field Offset
- Consuming table function via synonyms doesn't give expected result
- Only one value comes up for Hierarchy value help for variable
- Offset is not copied while copying rank node

## 1.18.0

### New Features
- The calculation view editor allows undo and redo of actions with history

### Fixes
- Impact analysis doesn't work after refactoring
- Could not able to unselect selected 'Client Column' in Properties Section of a data source
- Optimized the memory consumption of modeling objects
- Order by in Window function node changes to other column when it is not available
- Fix "SAP HANA Modeling: Maintain Time Tables" command for VS Code
- Data Preview Doesn't Work in VS Code
- Input parameter used in rank node goes off
- Window function node can't work for copy/paste
- Don't include applicationTime1 for hdbsystemversioning
- Error while creating Raw view in BAS
- Fix SQL hierarchies for value help on HANA Cloud
- Shortcuts don't work in VS Code
- Can't save mapping after replace with data source in new BAS with VS Code
- Cannot remove output columns used as order attributes in window function or rank nodes
- Replace node changes properties of join
- Refactor page is blank when rename one calculation file name in VS Code
- Maintain Time Table doesn't work on VS Code
- Able to add more than two data sources in non equi join node
- Propagate to Semantics option does not work after renaming of column

## 1.17.0

### New Features
- Pruning option "Greedy Pruning"
- Enhanced execution hints with greedy pruning options
- System versioning and application time tables as data sources
- Lineage and impact analysis are shown across HDI container boundaries

### Fixes
- Opening a calculation view or analytic privilege was not possible when the database module was not bound
- The calculation view editor could hang while opening a calculation view
- A warning message was displayed when opening the semantics "Advanced" tab
- All temporal fields are kept after replacing data source
- The calculation view editor could hang while executing a debug query
- Removed option to map variable to parameter of function that is used in an input parameter derived by function
- Opening the value help on dimensional calculation view columns in a calculated column of a star calculation view could hang the whole model
- Rename and refactor of calculation views works in read only mode
- Variable warning message has null as table name
- Input parameters could not be shown

## 1.16.0

### Fixes
- Optimize join column flag goes off when set in join dialog
- Manage joins wizard is blank on replacing dimension in star join
- Cannot remove apply filter column from variable if column comes from dimension view
- Join information is lost in the new copied node after swapping the table
- Create Constant dialog in Union node offers VARCHAR per default which should be replaced by NVARCHAR
- Value help does not work for input parameters under certain circumstances
- Input parameter should not have single quotes in SVT expressions
- Union pruning configuration table not created in same folder like calculation view
- The search function does not work in value help under certain circumstances
- The data type could be missing in details columns pane
- One node can connect to join node multiple times
- Cannot search name in Add Execution Hints dialog
- Don't delete all filters in Apply Filter for Variable
- Renamed calculated column not updated in expressions of e.g., filters and other calculated columns
- Undo after adding a node does not work completely
- NonEquiJoin show red error marker if you add its source node after NonEquiJoin node
- Input parameter mapping dialog maps wrong views and mappings cannot be removed
- Check for allowed years in generate time data is too strict
- Rank not copied correctly
- The Rank Partition Column can not be replaced after renaming the column

## 1.15.0

### Fixes
- Node deletion combined with mapping leads to an inconsistent XML
- Clear the previous query result set for a new query in snapshot
- Multi-join node connection to more than one nodes causes invalid view and broken relationships
- Renaming of Calculation view design-time artifact shows invalid snapshot procedure during deployment
- Table icon disappears on entering performance analysis mode when consuming partitioned tables.
- For snapshot interface use run-time snapshot table
- A join node having more than 2 input can not save note text
- Incorrect icon for .hdbviews when consumed in a Calculation View
- No warning is shown when apply filter column is not populated
- Union configuration table can not edited
- In filter expression renaming an input parameter changes take place after re-opening the view and filter expression language is changed to "Column Engine"

## 1.14.0

### Fixes
- Data preview on multi-join node
- Snapshot interface - Parameter type should be static list
- Renamed columns do not get updated in definition tab
- Virtual table icon is missing for virtual tables created via Non-HANA remote sources
- Rename/adjust references of input parameter does not work when input is provided via find and replace option
- Rename of input parameter in a Calculation View does not reflect changes in the filter expression editor tab
- "defaultExpressionLanguage" is missing when multiple expressions for input parameter default value is defined
- Analytic Privilege editor does not allow adding more than six rows
- Renamed calculated column not updated in expressions of filters, and other calculated columns
- "Value Help" of input parameter leads to metadata call failure when defined on a synonym
- Analytic Privilege deployment in "SAP Business Application Studio" is unstable
- Window functions are not in the alphabetic order
- Client column is not visible for some data sources
- Non-equal join does not reflect renaming
- Rank node of type "Sum" requires "Sort Column" and it is not marked as mandatory
- Join reordering leads to inconsistency in join definition

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
