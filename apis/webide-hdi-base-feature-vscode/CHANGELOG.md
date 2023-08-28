## 1.23.0

### New Features
- Multiple output parameters can be listed in the UDF tab of the expression editor

### Fixes
- Add "previous" and "next" buttons to associations dialog
- Fixed incorrect filter behavior for types in the "Add data source" dialog
- Unable to search database artifact in calculation view edit with connection to service manager

## 1.22.0

### New Features
- Business context information is shown if available when modeling joins.

### Fixes
- Only offer side-effect free procedures for input parameters derived by procedure

## 1.21.0

### Fixes
- More than two data sources can be added to a non-equi join node

## 1.20.0

### New Features
- User-defined functions support in SQL Expressions (filter & calculated attributes)

## 1.19.0

### Fixes
- Able to add same data source multiple times in projection node
- Create synonym button does not work in add data source dialog

## 1.18.0

### Fixes
- Fetching roles while creating synonym throws service error
- Mass generation of synonyms creates synonyms also in unselected schemas

## 1.17.0

### Fixes
- Internal hierarchy views are listed for modelling
- Unable to add the table while creating a calculation view when the table name is of only one character
- Service name is blank in find and add dialog of nodes

## 1.16.0

### Fixes
- The calculation view editor could hang when running in VS Code
- Creating a synonym for a synonym in the Add Data Source dialog could lead to a deployment error

## 1.15.0

### Fixes
- Adaptations for running in VS Code

## 1.14.0

### Fixes
- Manage joins wizard is blank on replacing dimension in star join
- Unexpected warning message when creating synonym to the object in an HDI container

## 1.13.0

### Fixes
- Table generation through "Maintain Time Tables" does not show table syntax and shows build error


## 1.12.0

### New Features
- Calculation views can define a snapshop view for a specific query

## 1.11.0

### Fixes
- Schema filter on "Add Data Source" dialog
- "Add data source" dialog does not display objects with same name as calculation view without any warning
- Table function nodes should also allow searching for synonyms
- Table function in another hdi-container is not found in the "Add Data Source" dialog if only a container service is selected

## 1.10.0

### Fixes
- The column metadata is not read when creating synonym in the "Add Data Source" dialog

## 1.9.0

### Fixes
- The "create synonym" dialog could hang when adding a data source if external objects are referenced
- The synonym editor added the schema name for target objects that are in the same container

## 1.8.0

### New Features
- Parameter mappings can be managed when replacing a data source

### Fixes
- Object types are displayed consistently in the "Add Data Source" dialog

## 1.7.1

### Fixes
- The analytical privilege editor displays the procedure correctly when selecting dynamic analytical privileges
- External objects are now shown when adding data sources in the synonym editor

## 1.7.0

### New Features
- Improved usability and user experience of the find objects dialog

### Fixes
- The "Finish" button is enabled when only one item is selected
- Fixed an issue when opening the "Find data sources" dialog in the analytical privileges dialog

## 1.6.0

### Fixes
- The add data source dialog displays a warning message when adding objects with same name as a calculation view

## 1.5.0

### New Features
- Roles can be chosen graphically when creating a synonym

### Fixes
- Filtering columns when adding a data source could lead to unexpected behavior
- A synonym created when adding a data source could be missing the schema field
- Columns of an external object could be missing
- The "Finish" button could be enabled if a synonym already exists

## 1.4.0

### New Features
- It is now possible to display the name of the service through which an external object is accessible when adding an object

### Fixes
- User-provided services using the target container credentials are handled correctly

## 1.3.0

### Fixes
- The search result now shows synonyms as expected when "Target Container Service" is selected with external service(s)
- The option "use existing synonym" is no longer enabled by default for synonym creation
- The schema name is now set correctly in generated hdbsynonymconfig files

## 1.2.0

### New Features
- Simplify using objects outside of a project
- Improved "replace data source" dialog

### Fixes
- Mass import of synonyms now filters by the selected schema
- Further reduced size of headers of requests sent to the backend
- Fix an issue where wrong results could be displayed in the search box
- Updated the UI library
- Metadata of synonyms whose names start with a whitespace is displayed correctly
- The "Create Synonym" button is disabled if there is no data

## 1.1.0

### Fixes
- Reduced size of headers of requests sent to the backend
- Fixed a bug in the Import elements dialog which caused the editor to hang

## 1.0.0

Initial release
