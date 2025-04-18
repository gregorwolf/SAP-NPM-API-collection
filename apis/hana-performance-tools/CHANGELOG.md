# SAP HANA SQL Analyzer Changelog

## Version 1.6.0
The SQL analyzer tool version 1.6.0 includes the following improvements and bug fixes.

### Improvements

- **Plan Graph Tab**
  - Updated the Plan Graph edges to visually represent output cardinality, with thicker edges indicating higher values. Edges exceeding 50% of the maximum cardinality are highlighted in purple, and edge transparency ensures the operators remain visible and their details clear, even when overlapping with edges.
  - Added Operator Property information to the Details pane for easier access.
  - Summary and Operator Property information in the Details pane can now be viewed in a separate view, allowing full display of long summaries or operator property details.
  - The Details pane now shows Physical instead of Physical-Simple for non-HEX plans in Physical mode, reflecting that Physical Simple/Expert modes apply only to HEX plans.
  - Added table names to operators when zoomed out between 50% and 70%, if available.
  - Added location-based color coding for operators in single-node queries to ensure consistent visual feedback.

- **Execution Time Mode and UI Updates**
  
  Enabled CPU Time mode by default for both HEX and non-HEX plans. While full CPU time calculations and visualizations such as time-based bar charts and percentages remain exclusive to HEX plans, this improvement lets you explore CPU Time mode for non-HEX plans that include inner HEX plans.

  When a non-HEX plan is opened in CPU Time mode, the Execution Summary in the Overview tab shows Execution Time (CPU) as n/a. Related time-based bar charts—such as those in the Dominant Plan Operators card of the Overview tab and within the Plan Graph—are either empty or display CPU time where available. The Top 10 Critical Path Operators view in the sidebar is also empty if no CPU time data is available. In the Plan Graph, bar charts will show CPU time where it is available, while operators without CPU time remain empty. Additionally, the execution time section and bar chart in the Details pane are hidden.

- **Performance Trace Tab**
  
  The Operator List now displays only operators with available detailed metrics, inner plans, service call data, or function profiler metrics. The search functionality has also been improved with placeholder text to guide you on searchable criteria such as name, ID, location, or execution time.

- **Statement Statistics Tab**
  
  Updated the Statement Statistics tab with improved labels for better clarity and consistency. Show Deep Dive is now Open Inner Plan, Copy SQL Command with Comments has been changed to Copy SQL Statement with Comments, and Line No. is now Line Number. Added More buttons for SQL Statement, Plan, and Comments columns to view full content in pop-ups. Introduced new icons and repositioned some labels to create a more intuitive and streamlined layout. 

### Bug Fixes
- Fixed an issue where timeline data was missing when opening inner plans in a new tab.
- Fixed an issue where parameter values were not displayed in the SQL tab.
- Fixed an issue where timeline data appeared empty or failed to expand when the outermost operator lacked timestamp information. A placeholder row is now added to handle these cases, allowing the timeline to expand as expected.
- Fixed an issue where the SQL analyzer tool for SAP HANA was not activating in certain Windows Terminal System environments due to incorrect global storage path generation. The directory creation logic has been corrected.
- Fixed an issue where the information in the Property tab did not appear expanded by default.

## 1.5.1

### Bug Fixes

- Improved Plan Graph Layout: Fixed an issue that caused operator overlaps in the plan graph when expanding or collapsing container nodes.
- Enhanced File Handling: Implemented a notification system to alert users when attempting to open unavailable files (deleted or inaccessible UNC paths). This resolves the issue of the tool seemingly hanging in such scenarios.
- Plan Graph Panel Reliability: Addressed a problem that prevented the plan graph panel from opening or reloading correctly when attempting to open another plan graph panel.

## 1.5.0

### Overview Tab (Enhanced)
- Renamed the "Dominant Plan Operators" section to "Dominant Plan Operators (CPU Time)" for HEX execution plans, providing clearer insight into the time mode used to determine dominant operators.
- Updated the "Peak Memory" label to "Total Allocated Memory" in the Execution Summary section for greater accuracy in reflecting the displayed information.

### Plan Graph Tab (Enhanced)
- Removed the critical paths for HEX execution plans.

### Timeline Tab (Enhanced)
- Renamed the "Pop" (Plan Operator) operation to "Process" for improved clarity.
- Excluded sleep time from inclusive time calculations to offer more accurate query performance insights.
- Resolved discrepancies in exclusive time between the Top 5 Dominant Operators and Top 10 Critical Path Operators views and the Plan Graph, ensuring consistent exclusive time across all views.

### SQL Analyzer Tool Configuration via VS Code Settings (Enhanced)
- Introduced new parsing options: "Skip Operator and Edge Detailed Information" and "Skip Execution Time Calculation", to improve performance with large PLV files. When enabled, you are notified that these processes have been bypassed. This enhancement addresses previous issues that prevented large files from opening, streamlining the handling of complex plan visualizations.

### Bug Fixes
- Improved CSV export for the operator list, enhancing readability and compatibility with external tools.
- Updated placeholder text in the search fields of several tabs (Operators, Properties, Recommendations, Compilation) to reduce confusion with other filtering options.

## 1.4.3

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
