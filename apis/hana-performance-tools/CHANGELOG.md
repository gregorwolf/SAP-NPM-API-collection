## 1.4.1

### Timeline Tab (Enhanced)
- Usability has been significantly improved, resulting in quicker interactions when an operator is clicked from the Plan Graph or the lists on the left sidebar.
- The previous design had the legend overlapping a portion of the Timeline Chart. It has been replaced with a static display at the top to keep the chart unobstructed. If not required, the legend can easily be deactivated using the Toggle button.
- By default, the Timeline Tab is now displayed at the bottom after loading the PLV file.
- Previously, the Timeline Tab was omitted if the Prepared Plan did not provide timeline information or if the Timeline feature was turned off. Now, even under these conditions, the Timeline Tab persists, but with a guide message. You can manage the Timeline feature in VS Code's settings.
- In order to skip the timeline information, check 'Skip Timeline Parsing' in the Visual Studio Code settings, reload the window and open the file again.

### Additional Enhancements
- The updated version now supports complete functionality in Safari.
- Due to security concerns, the Parameter Values Table information, previously displayed in the SQL Tab, will no longer be provided.
- If a Logical operator had time information before, it was displayed in the Plan Graph via a bar chart. To simplify the identification of Logical Operators, the time bar chart feature for these operators has been removed.

### Bug Fixes
- The enhancements detailed above have effectively resolved several bugs related to interactions within the timeline.
- A bug that prevented the first screen of the SQL Plan Execution Monitor view from rendering properly has been fixed.
- Another bug fix addresses the issue in the Plan Graph where only one edge was displayed even when multiple edges existed.

## 1.3.18
### Overview Tab (Enhanced)
- Removed the bar graph that previously visualized "Compilation Time", "Execution Time", or "CPU Time" in the Execution Summary card. Instead, these time values are now presented as numerical values under the titles: "Compilation Time", "Execution Time (Elapsed)", and "Execution Time (CPU)", respectively. This enhancement improves the clarity of time-related information in the Execution Summary card.
- Added tooltips to the “Execution Time (Elapsed)” and “Execution Time (CPU)” entries in the Execution Summary card. These tooltips offer additional explanations upon clicking, ensuring that users can access detailed information within the tool.
- Enhanced the display of bar graph color in the Dominant Plan Operators card. Previously, the color remained consistent regardless of the selected time mode. However, it's now dynamically presented based on the chosen time mode. In Inclusive Wall Time mode, the self-execution time is represented in red, while in CPU Time mode, it appears in yellow. This alignment also mirrors the way execution time is depicted on the Plan Graph.
- Updated the system response when the thread limit is exceeded during query execution. A more relevant explanation is now displayed in the “SQL Performance Recommendations” card of the Overview tab. The original message has been revised, and distinct messages are now shown depending on whether the peak thread limit is associated with the workload class setting or the default_statement_concurrency_limit, along with relevant SAP Note link.

### Plan Graph Tab (Enhanced)
- Adjusted the CPU time bar chart size in the Plan Graph to be based on the total query execution CPU time rather than the physical container CPU time. This makes it easier to compare time values across different nodes.
- Enhanced the time bar in our node interface and sidebar for HEX plans, offering comprehensive insights into query execution times. The time bar now includes both the operator's CPU time (yellow) and the physical operator group CPU time (light blue), making it easier for you to identify the most time-consuming aspects of your queries.

### Timeline Tab (Enhanced)
- In the HEX query plan, the timeline tab now displays “Pop” instead of “Open” for executed operations in CPU Time mode, enhancing consistency and clarity in representing operations.

### Bug Fixes
- Fixed an issue where the Re-Execute feature in the SQL Tab wasn't functioning properly. Furthermore, you'll soon be able to use the re-execute feature with the HRTT connection once the new version of the SAP HANA database explorer is released.

## 1.3.16
- The node colors in the Plan Graph have been changed to improve readability.
- Fixed an issue where the session context information of the inner plan was not being displayed in the SQL tab.
- The following improvements and bug fixes have been made in the Timeline view:
  - Enhanced hover pop-up design for improved readability.
  - Fixed an issue where navigating to the operator tree column was not functioning when selecting an operator from the Top 5 Dominant Operators or Top 10 Critical Path Operators in the Sidebar.
  - Fixed an issue where the width of the operator tree column was not adjustable, allowing users to change the column width as needed.

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

## 1.3.8

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
