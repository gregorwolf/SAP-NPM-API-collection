# SAP HANA SQL Analyzer for Visual Studio Code

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

HANA SQL Analyzer for Visual Studio Code is a brand new software that we are developing from the scratch to help users analyze the performance of HANA SQL queries. This repository will be the only single source for the development plan, code, development status, release information, downloadable package, analysis know-hows, and bug reporting.

## Why Another SQL Analysis Tool?

First of all, you might have a question why we are developing another tool in addtion to the existing PlanViz in Studio and SQL Analyzer in HANA Cockpit. Some answers are:

- Bascially it is to make developers happier (developer experience).
- With the deprecation of Studio, we couldn't bring new features anymore to PlanViz in Studio.
- New WebIDE (official name: [SAP Business Application Studio](https://help.sap.com/viewer/p/SAP%20Business%20Application%20Studio)) is built on [Eclipse Theia](https://theia-ide.org/), which is based on [Visual Studio Code](https://code.visualstudio.com/), which is based on [Electron.js](https://electronjs.org/) new cross platform to build web-based desktop apps, which is based on Google Chrome(actually [Chromium](https://www.chromium.org/)) browser and [Node.js](https://nodejs.org/). So, VSCode extension app can be plugged into new WebIDE, which is aligned with new developer tooling strategy for both cloud and on-prem.
- PlanViz has been built in 2011, and it required big refactoring to accomodate multiple SQL engines. We decided to build from the scratch for this major change.

## Features

SQL Analyzer for Visual Studio Code is still under heavy development. Here are some highlighted features:

- Live connection support (Note: connection details will be stored in [SecretStorage](https://code.visualstudio.com/updates/v1_53#_secrets-api).)
- Load multiple PLV files and keep the history
- Visualize query plans in PLV into plan graph
- Quick analysis support
- Critical path visualization
- Bookmark and sharing (Note: Personal data can be anonymized and the comments can be deleted by users.)
- Recommendations
- SQL Plan Execution Monitor for real-time analysis
- Advanced UX

## How To Install

1. Install [Visual Studio Code](https://code.visualstudio.com) if not installed already (>= 1.53.0 is required because the extension is relying on the APIs from that version).
1. Open VSCode and click Extensions tab (puzzle icon) from the left side menu bar
1. Search for 'SAP HANA SQL Analyzer' and install Visual Studio Code Extension file (vsc-extension-sa-<ver>.vsix) of this new SQL Analyzer from [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=SAPSE.vsc-extension-sa).
1. Once the installation is completed, the new SQL Analyzer icon will be added in the left side menu.

## How To Use

1. Go to SQL Analyzer extension (by clicking the last extension icon from the left side menu)
1. Click (+) icon from the top PLAN GRAPHS section in the left side panel.
1. Select a PLV file from the file open dialog to show the visualized plan.

## Documentation

[SQL Analyzer Extension](https://help.sap.com/docs/HANA_SQL_ANALYZER) - SAP Help Portal

## Feedbacks

Please provide your feedbacks thru "SAP HANA SQL Analyzer <hana_sql_analyzer@sap.com>"

# CHANGELOG

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
- A new SQL analyzer view is shown when a PLV file is opened through the file menu or by dragging.
- More information is provided for inner plans of SQLScript (for example, compilation summary, peak memory, and so on).

### Fixes

- Logical inner plan of column search did not open.
- Several PLV files were hanging and did not open.

## 1.3.9

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
