# SAP HANA SQL Analyzer for Visual Studio Code


[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

HANA SQL Analyzer for Visual Studio Code is a brand new software that we are developing from the scratch to help users analyze the performance of HANA SQL queries. This repository will be the only single source for the development plan, code, development status, release information, downloadable package, analysis know-hows, and bug reporting.

## Why Another SQL Analysis Tool?

First of all, you might have a question why we are developing another tool in addtion to the existing PlanViz in Studio and SQL Analyzer in HANA Cockpit. Some answers are:
* Bascially it is to make developers happier (developer experience).
* With the deprecation of Studio, we couldn't bring new features anymore to PlanViz in Studio.
* SQL Analyzer in Cockpit is mainly for DBAs, and has limitations in its performance due to its multi-layered microservice architecture, different data model stored in DB (not direct XML manipulation), and slow SAPUI5 library.
* New WebIDE (official name: [SAP Business Application Studio](https://help.sap.com/viewer/p/SAP%20Business%20Application%20Studio)) is built on [Eclipse Theia](https://theia-ide.org/), which is based on [Visual Studio Code](https://code.visualstudio.com/), which is based on [Electron.js](https://electronjs.org/) new cross platform to build web-based desktop apps, which is based on Google Chrome(actually [Chromium](https://www.chromium.org/)) browser and [Node.js](https://nodejs.org/). So, VSCode extension app can be plugged into new WebIDE, which is aligned with new developer tooling strategy for both cloud and on-prem.
* PlanViz has been built in 2011, and it required big refactoring to accomodate multiple SQL engines. We decided to build from the scratch for this major change.

## Features

SQL Analyzer for Visual Studio Code is still under heavy development. You can find the full feature parity table in wiki from this repository. Here are some highlighted features. Please note that currently we only support offline analysis of PLV file, which can be exported from the existing PlanViz or SQL Analyzer in Cockpit and does not support online connection to HANA systems yet.

* Load multiple PLV files and keep the history
* Visualize query plans in PLV into plan graph
* Quick analysis support
* Critical path visualization
* Bookmark and sharing
* Recommendations
* Advanced UX

## Known Limitations

The following features are NOT impleneted yet:

* SQL editor (Database Explorer is not available in VSCode yet)
* Connection to HANA system for online analysis
* Plan Trace view
* Plan Comparison view

## How To Install

Until we release this software via [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/VSCode) this year, you need to install the extension file manually.

1. Install [Visual Studio Code](https://code.visualstudio.com) if not installed already (>= 1.46.0 is required because the extension is relying on the APIs from that version).
1. Open VSCode and click Extensions tab (puzzle icon) from the left side menu bar
1. Search for 'SAP HANA SQL Analyzer' and install Visual Studio Code Extension file (vsc-extension-sa-<ver>.vsix) of this new SQL Analyzer from [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=SAPSE.vsc-extension-sa).
1. Once the installation is completed, the new SQL Analyzer icon will be added in the left side menu.

## How To Use

1. Go to SQL Analyzer extension (by clicking the last extension icon from the left side menu)
1. Click (+) icon from the top PLAN GRAPHS section in the left side panel.
1. Select a PLV file from the file open dialog to show the visualized plan.

For the detailed usage, refer to [wiki](https://github.wdf.sap.corp/HANA-Perf-Mgmt-Tools/vsc-extension-sa/wiki) pages in this repository.

## Release Notes

Here is the brief history of releases.

### 1.0.3

First official release
