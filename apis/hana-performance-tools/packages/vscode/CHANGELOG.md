## 1.3.14

- The Plan Graph remains accessible for files that are too large to open because of an excessive number of operators. However, the critical path and timeline information will not be displayed.
- "Not Started" operators are now displayed in the Plan Graph and offer more visibility into the execution plan.
- The exclusive time in the Plan Graph now precisely reflects the execution plan’s time values with no recalculation.
- This release features the following enhancements and bug fixes for the Timeline view:
  - The Timeline view now shows a yellow-highlighted line to easily distinguish the selected row/operator.
  - Fixed an issue where the operator tree table and the timeline chart were not properly displayed.
  - Fixed an issue with expanding and scrolling through the operator tree table.
  - Fixed an issue with navigating to an operator in the Plan Graph from the Timeline view.

## 1.3.12

### New Features
- The design of the plan graph side panel has been enhanced.
- The property of an operator is now displayed in the side panel.
- The color used for CPU time has changed.
- The operator color used for real-time running statements has changed.
- The HANA DB Connections extension has been deprecated. The SQL Analyzer now integrates with the SAP HANA Database Explorer extension (https://marketplace.visualstudio.com/items?itemName=SAPSE.hana-database-explorer).

### Fixes
- The SQL Analyzer was not activated on M1 MacBook.

## 1.3.10

### New Features

- A progress bar has been added for post-processing.
- All tabs are now shown on the property pane by default.
- A new SQL Analyzer view is shown when a PLV file is opened through the file menu or by dragging.
- More information is provided for inner plans of SQLScript (for example, compilation summary, peak memory, and so on).

### Fixes

- Logical inner plan of column search did not open.
- Several PLV files were hanging and did not open.

## 1.3.10

### Fixes

- Fixed a SQL Comparison issue of Plan Comparison Report
- Stop/Start automatic data refresh works depends on the status of tab(select/hide/close)

### 1.3.6

- Support SQL Plan execution monitor
- Improve planGraph layout
- Enable skipping timeline in configuration

### 1.3.4

- Support real-time analysis
- Support plan comparison report

### 1.3.0

- Improve layout algorithm
- Upgrade timeline chart library to prevent vulnerability

### 1.2.20

- Fix plv parsing pausing issue when it has jeReduction plan

### 1.2.16

- Restore badge displaying, file exporting feature
- Fix config panel option selection issue

### 1.2.12

- Replace parser from node-expat to sax
- Enable column filter and search feature in operator list

### 1.2.10

- Supprot electron v13 for Mac

### 1.2.8

- Recover lost edges in specific cases

### 1.2.4

- Support electron v13 which is enabled from vscode 1.59

### 1.2.2

- Provide CPU Time based analysis for HEX Plan.
- Support side panel to describe node/edge properties. Callout is deprecated
- Auto expanding initial nodes when opening plv file.
- Allow plv extension to export plangraph.
- Support SessionVariable tag parsing. It will be shown in SQL pane.

### 1.1.9

- For VScode market place
- -Update TimelineChart to handle multiple compile time that each innper plan has.
- -Support file export of inner plan with communication data.
- -Filter access table which shows outmost operator among same table name

### 1.0.3

- First official release
