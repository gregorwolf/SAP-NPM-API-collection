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