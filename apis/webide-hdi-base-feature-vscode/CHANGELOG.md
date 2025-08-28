## 1.39.0

### Fixes
- Persist the last choice of data source types in the  "Replace With Data Source" dialog

## 1.38.0

### Fixes
- Security fixes

## 1.37.0

### Fixes
- When filtering UDFs with multiple return values these return values are not shown

## 1.36.0

### New Features
- Allow selecting feature versions of a certain cloud release

## 1.35.0

### Fixes
- Security fixes

## 1.34.0

### New Features
- Support wildcards in analytic privileges

## 1.33.0

### Fixes
- Security fixes

## 1.32.0

### Fixes
- Security fixes

## 1.31.0

### Fixes
- When filtering UDFs with multiple return values these return values are not shown
- Duplicate synonym is not detected during Add Data Source dialog if target container service is not added

## 1.30.0

### New Features
- The last choice of data source types used in the "Add Data Source" dialog is persisted

### Fixes
- Synonyms created for Scalar functions are also getting listed as datasource in CV though they are not supported

## 1.29.0

### New Features
- Updated SAP Developer License

## 1.28.0

### Fixes
- Minor bug fixes

## 1.27.0

### New Features
- The impact of columns is shown across external analytic privileges

### Fixes
- The "find data sources" dialog filter does not work reliably
- Rechecking the "generate grants files" option removes the roles assignment while creating synonym during cross container access
- Not able to select user-defined functions without input parameters in the calculated column expression editor of a calculation view

## 1.26.1

### Fixes
- Synonym name is not added in the hdbsynonym file if generate hdbsynonymconfig is checked during synonym
- HTTP request url is truncated when search string contains at least one '#'
- hdbgrants file that is generated during the Add Data Source dialog using an HDI-service does not reference via the service key
- In Add Data Source dialog when generating hdbgrants file: value help for roles uses application user instead of hdi-service user even in HDI service context

## 1.26.0

### New Features
- External objects are included when showing column impact across objects

## 1.25.0

### New Features
- Group objects by schema in find data sources dialog

### Fixes
- Don't list tables in Find Data Sources for Star Join
- Opening editors should not be blocked if the editor cannot find a .hdiconfig file
- The deployment is not triggered when the 'Create synonym configuration file' option is checked.

## 1.24.0

### Fixes
- Namespaces could be generated as "null" in the synonym editor
- A synonym could be used instead of a user-defined function in the expression editor

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
