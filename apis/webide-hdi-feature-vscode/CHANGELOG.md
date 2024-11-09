## 1.35.0

### New Features
- The vector functions COSINE_SIMILARITY and L2DISTANCE are available in the expression editor.
- Ability to add a workload-class hint with the dialog "Select Execution Hint from List", with only hints attached to the topmost calculation view as effective
- Modeling help in Joule (only available in SAP Build Code)

### Fixes
- Some menus and buttons might not work
- Functions/Operatore/UDFs should change to enable state in Restricted Columns for Expression
- Validate Syntax fails for a correct statement in Window Function node
- Column names unique dialog pops up when no propagations are needed
- Columns are added more than once during propagating
- Columns are wrongly added if a column forks then joins after different depths
- Wrong dimensionUri written to XML for source Currency
- Sort columns can't be updated

## 1.34.0

### New Features
- Graphical editor for structured filters
- When propagating columns to semantics it can be chosen how to make the column names unique
- Nodes can be dragged and dropped into another node replacing the existing source
- Improved labels for empty union behavior
- Improved labels of union node properties

### Fixes
- Synonym refactoring can fail if a calculation view name contains a space or hyphen
- Database connections are not automatically connected when displaying the connection list
- Generating documents on folder level does not display all folders
- Selection of parent folder without all children should be prevented when generating documents on folder level
- Calculated columns of type ST_GEOMETRY could produce an error out after changing type back to attribute
- Fail to validate expression syntax using column engine
- Replace existing source doesn't work when the target node is NonEquiJoin node

## 1.33.0

### New Features
- Deleting nodes in a flow should not break mapping
- Show aggregation type of calculated measure if no "Enable client side aggregation" is selected
- Transparent filter should be automatically propagated to Semantics
- Allow space and hyphen for names and document space

### Fixes
- Join cardinality not cleared after changing node
- Cannot modify frame if there are multiple window functions
- Unable to click on the Create Join In Hana Calculation View
- Join mappings are not correctly created when replacing data source with node
- Cannot open Window Function Pane
- Remove data types that are not supported by HC, and sort the list of data types alphabetically
- Allow generation of documents on folder level
- Replace with node not working reliably
- Validate syntax does not accept (input parameter) for (input parameter>) of type multiple entries
- Referential join with referential integrity Left not recognized initially for MDS Cube blocking decision
- Table item of Mass Import in Synonym Editor is dark on dark mode
- Replace node - search loses focus
- Copy and Paste a calculated column fails if it is removed before Pasting
- Replace with node join maintenance issue
- Error: Adding element with duplicate id 'aggregation-attributes-multiInput-dialog'
- Remove existing parameter mappings for the replaced data source when it is replaced by a view node
- Can not delete one node
- After changing the name of the newly created input parameter, the input parameters of the function node of the function node cannot be correctly mapped
- When filtering UDFs with multiple return values these return values are not shown
- Procedure mode in generated document has wrong description
- Generated currency columns cannot be added as Dimension attributes to MDS Cubes
- Nothing happens when clicked on generate documents on src folder at the second time
- Disable buttons of Input Parameters in read-only mode
- Creation of calculation views of type time fails if time table has non-standard name

## 1.32.0

### New Features
- Calculated columns can be copied to other nodes within the same calculation view
- Expressions containing user-defined functions can be validated
- Enhanced information in generated calculation view documents
- Use "engineAggregation" if "xscCompatibilityMode" is set to "true" and the view is not a star-join
- Use frames to flexibly select scope of window function calculation

### Fixes
- The data type of mapped calculated columns not updated correctly
- "Where Used Outside Current View" for input parameter could hang
- No attributes are displayed for views added in analytic privilege
- Unable to add parent and child nodes in hierarchy function node in a calculation view when the the type is updated to generated.
- Fix spacing in "Generate Rank Column :" in rank node Definition
- Multi-join node: filter expressions not saved when sources are not connected
- Calculation view field mapping search loses focus
- Cannot select input parameter for the Target Value in Rank node
- Conversion date (referenceDate) is lost after re-open
- Can't add new column from input with alias in Mapping pane
- Input parameters and calculated columns should not offer Length and Scale for SMALLDECIMAL
- Remove option to propose join cardinality from non equi joins
- Execution Hint tab under Extract Semantics should show Value instead of New Name
- Column Renaming not working reliably for larger set of columns

## 1.31.0

### New Features
- In window function list, buttons for add duplicate and where used
- Support for 'Structured Filter'
- Refresh Calculation View using configurable keyboard shortcut
- Update node icon based on join type
- Update SAP Developer License
- Option to set target value of rank nodes to all
- Dark Mode Support(Experimental)
- Validation for non-equi-join expressions

### Fixes
- Propagation in the consumed view is not allowed if it has multiple parameters and one of those is a mapped parameter
- Renaming of Calculation View in MDSCube
- Cardinality for spatial joins are updatable when the properties are disabled
- Joins can be created for than 2 inputs
- Incorrectly set cardinality for spatial join results into deployment error
- "Propagate Adding an Element" fails when the impacted Calculation View has intersect node
- Propagation of renaming input parameter does not work properly
- Show tooltip "Where Used Inside Calculation View"
- Do not show Filter Mapping for select join
- Mandatory data type should not be blank for successful deployment
- Counter section is not marked as mandatory when defining a counter
- Cannot assign MIN/MAX as aggregation option for columns of datatype SECONDDATE
- Icons are not updated when changing join type and cardinality
- Improved dialog when changing the display currency
- Several issues with non-equi join node
- Copying a node breaks calculated fields
- Cannot add new column in Node Mapping pane
- Cannot open expression editor in hierarchy function node
- Incorrect tooltip message in rank node


## 1.30.0

### New Features
- Propagate adding,deleting, and renaming input parameters through all dependent views
- Multiple window functions in one window function node
- Code Toggle for Calculation View and Synonym editors to switch between graphical and text editor

### Fixes
- While checking column impact across external Analytic Privileges shows Calculation View name instead of Analytic Privilege name
- Restricted express for a restricted column gets duplicated after rendering
- Length of string datatype is not propagated on mapping input paramters in a Calculation View from a parameterized SQL view
- Extract semantic does not work with union node

## 1.29.0

### New Features
- Propose pre and post fix to make column names unique
- New option "deprecate and block queries"
- The impact of columns is shown across external analytic privileges

### Fixes
- 'Add to output' option does not work if the source name contains '/'
- Fix descriptions of execution hint buttons
- Scale values of decimal datatype is not propagated while mapping input parameters from a user-defined function in a calculation view
- Refreshing metadata doesn't work in the target view when the changes are made via recursive propagation to the consuming view.
- The "Where Used" dialog cannot be opened anymore when closed via escape key
- Fix aggregation attributes hint text
- Fix some issues deleting nodes in calc view editor

## 1.28.1

### Fixes
- Cleaned up refactoring dialog
- The check impact operation of hangs when propagating renaming a calculation view
- Disable "where used outside of the calculation view" when multiple parameters are selected
- Switch the positions of the rename icon with the generate label icon.
- The message strip for the system time is too wide
- Remove TEXT and VARBINARY from list of input parameter data types
- For some data sources the option "Replace With Node" is not visible in the mapping pane, and it is always not visible in the join definition
- The dialog does not appear when clicking "Replace With Node" option in the mapping pane
- Refactor dialog doesn't show impacted input parameter in external hdi container
- Renaming a column without recursive refactoring leads to inconsistent state
- Output column name may contain colons
- The editor could generate many popup html element when click validation info button for UDFs
- Prevent mapping of columns of type VECTOR or BLOB in an aggregation or star-join
- Option "Evaluate Early" should only be shown when connected to a HANA Cloud database
- Check calc view name across schema when renaming calc view
- Fixed more situations where a context menu may display out of bounds of the window
- Disable scale for String data type
- Fix texts in column name unique dialog
- Unclear hint for label generation failure when CF token is expired
- Info for generate currency column should be improved in non-semantic nodes
- Duplicate entries for Timestamp datatype in input parameter datatypes list of Calculation view
- Renaming parameter does not correctly adjust filter expression
- The Duplicate icon button should be disable when there is no data for Restrictions
- Replace node breaks join
- Joins on constants in non-equi-joins do not write operator information to XML
- Add Data Source dialog of star-join nodes shows also synonyms that point to non-calculation views
- Propagate Adding fail for the Star Join node

## 1.28.0

### New Features
- External objects are included when showing column impact across objects

### Fixes
- A column label may not be saved
- SQL execution failure does not show error details
- No hint for label generation failure when logged out of Cloud Foundry
- A snapshot is lost if mdsCubes is not empty
- Buttons disappear for larger number of parameters
- Removing a column from a node created on a link is not working correctly
- Set the calculation view editor as 'read only' when the XML includes the embedded moonlight
- Propagate the deletion of a node doesn't work correctly
- Fixed some issues with propagating recursively adding/deleting columns
- Track which application has originally generated the XML
- Cannot add result column for newly created window function nodes
- Auto layout with join node is not saved
- The context menu can be out of bounds
- The length and scale of variables are sometimes set to NaN

## 1.27.0

### New Features
- Adding and deleting a column can be propagated through all dependent views
- Filter mapping is also possible for non-equi joins
- Data sources can be refreshed while a calculation view is open
- Labels for columns can be generated automatically
- Reference information in the references dialog is grouped

### Fixes
- The synonym editor displays a "*.configure" column
- Variant cannot be fetched when generating fiscal time data
- Unclear message when parsing calculation view fails
- Line comments are not correct for filters and in the expression editor
- Removing a mapping can fail when mapping three columns to one
- Deployments could fail after undo
- The "keep" flag cannot be set for one attribute of a shared dimension
- Icons are not shown when connecting columns in non-equi join node for the first time
- Window function arguments not updated after renaming columns
- Dynamic join does not work with technical join
- Filter expressions are not saved when sources are not connected in a multi-join node
- Buttons disappear for larger number of parameters
- Window function result column validation message is inconsistent
- Change "star join" to "non-equi join" in warning message
- Removing a column from a node created on link is not working correctly
- Window function result column is available in expression editor
- The target value field of rank node behaves inconsistently

## 1.26.0

### New Features
- Removal of outlier values before aggregation in restricted columns
- Multiple nodes can be selected in a calculation view

### Fixes
- Special characters are allowed in window function in result column
- Text fixes
- "restrictionExpressionLanguage" was added redundantly to the XML
- Rename of column in hierarchy function node causes build failure
- Nonexistent standard tables are getting auto-populated in quantity with unit of measure semantics dialog
- Data preview in XS Advanced projects does not work
- Provide Where Used Outside Current View functionality also for input parameters and variables
- Auto synonym generation does not work in time table generation in BAS
- 'Where Used outside current view' does not work when the column is used in expression and reference
- 'Cancel' button looks disabled in rename dialog of analytic privilege

## 1.25.0

### New Features
- Allow selecting specific T009/T009B tables or synonyms pointing to T009/T009B as an alternative when generating fiscal timetable data
- Renaming a column is propagated through all dependent views
- Column impact can be displayed in addition to column lineage
- Multiple output parameters can be listed in the UDF tab of the expression editor

### Fixes
- The deployment with input parameters is not working
- Restricted column aggregation behavior lists both attributes and columns
- Able to remove data source in read only debug mode
- Greedy pruning setting doesnt work in Non equi join node
- Fixed a warning message when opening the parameters pane
- Value help for synonyms in analytic privilege uses wrong schema
- Proposed cardinality is 0..0 when there is no data in the underlying data source
- Replace With Node doesn't work
- The editor remains in busy state after extracting a variable
- Reading data from a hierarchy could fail
- Unable to search database artifact in calculation view edit with connection to service manager
- Dragging a view node onto a link is not working
- Unable to set the first level in hierarchy node of leveled function generation
- Unexpected text 'Adjust the expression manually' appears when checking where-used of a column
- When replacing data source, remove mapping option doesn't work in the step manage mappings
- Window Function output column data type not populated
- Set "Execute in SQL Engine" as default for new calculation views created via new-file dialog
- Join Definition can't be shown after switch table

## 1.24.0

### New Features
- Business context information is shown if available when modeling joins.

### Fixes
- Hierarchy data in the analytic privilege editor could be missing
- Fixed some inconsistent behaviour when no value is selected for restricted columns
- A null value could be mapped to a calculated column
- Regular columns can show reference information
- The filter icon could be shown for nodes after the removal of a filter
- The filter mapping was not saved in star joins if no join was defined
- The dialog for currency conversion does not open for already defined measures
- Refactor of column used in analytic privilege doesn't work
- The expression editor for temporal tables allows columns and calculated columns as inputs
- A misleading join validation message could be displayed in debug mode
- Only offer side-effect free procedures for input parameters derived by procedure

## 1.23.0

### New Features
- The default view of the data preview can be set via the setting "Calculation View Editor > Data Preview: Default Display Option".
- A new object type filter "table type" is available.
- Filter mappings can be maintained graphically, similar to join mappings.
- Exception aggregation attributes are checked for consistency.
- An SQL Editor can be opened from the context menu of calculation view nodes.
- The join cardinality and optimize join column can be set for non-equi-joins.
- Support "between/and" and "from/to" option for system-versioned tables.

### Fixes
- The hierarchy could be missing in the data preview if a calculation view has input parameters
- Always generate technical join in join node
- The value help of "associated attribute restrictions" could be empty in the analytic privilege editor
- Integrity constraint should not be filled for joins other than referential joins
- Rank nodes could be edited in read only mode
- Cannot remove rank column by unselecting "Generate Rank Column" checkbox
- Fields are wrongly marked as mandatory in add constant dialog of union node
- Renaming dialog does not show reason why renaming fails
- Rank node of type "Rank" could be created with wrong XML initially
- The data preview could fail if called from a CAP project
- Debug query does not contain Fuzzy Search input parameters
- Refactoring dialog changes cursor positions if temporarily an invalid namespace is typed in
- Unable to add data source into Minus node
- Debugging a calcuation view with input parameters proposes wrong input value
- The mapping pane could show an incorrect tooltip
- A grey rectangle appears if the working area is too small
- The text of the selected items in the mapping control pane is displayed in bold font to make the selection more visible

## 1.22.0

### New Features
- Support modify (drag/drop) link symbol in join editor
- Allow reordering of sources in each node
- User-defined functions support in SQL Expressions (filter & calculated attributes)
- Allow selecting the direction of filter mappings
- Offer exception aggregation for (calculated) measures that is written to BIMC

### Fixes
- The variant could be missing in the generated data for fiscal time tables
- No option to change the column type of the result_column of a window function
- The deployment could fail after replace with data source
- Rename column and adjust reference doesnt work if the column is used in variable
- Renaming analytic privilege adds a namespace
- Input parameter mapping to multiple table functions doesn't work correctly
- Text joins only allow 1:1 cardinalities but N:1 should also be supported
- Validation procedure wrongly called for column engine expressions

## 1.21.0

### Fixes
- Output columns could show incorrect error status.
- A message is displayed if a dynamic join is used in a calculation view
- Unrelated files could get corrupted when refactoring calculation views
- SQL views were shown as calculation views in the data lineage view
- The Data Preview Button was not displayed for window functions
- Added missing up/down buttons
- Expression in non-equi join is not flushed after data source replacement
- The value help for Currency does not show any value.
- Graphical changes to join columns in non-equi-joins are not persisted
- Join node definition drag issue when a join node got more than two inputs
- Add missing space between list box and label
- Fixed tooltip for remove button in synonym editor
- Removing columns that feed into join nodes with filter mapping leads to an inconsistent XML
- Improve dialog messages for filter mapping
- SQL comment is not removed correctly when validating an expression

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
