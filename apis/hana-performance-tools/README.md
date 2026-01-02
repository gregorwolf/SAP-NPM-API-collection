# SAP HANA SQL Analyzer for Visual Studio Code

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest)](https://github.com/facebook/jest)

The SQL analyzer tool for SAP HANA is a performance analysis tool that helps developers visualize and understand SQL execution plans. Designed for query tuning and optimization, it offers detailed insights into how queries run within the SAP HANA database.

This extension replaces earlier tools like PlanViz in SAP HANA studio and the SQL analyzer in SAP HANA cockpit, delivering a more integrated and flexible experience directly in Visual Studio Code.

The GitHub repository is the central hub for development updates, release notes, downloads, usage guides, and issue tracking.

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

## Telemetry and Data Collection

This extension collects usage data to help improve SAP products and enhance the user experience. The collected data is sent to SAP in accordance with our Privacy Statement.

If you prefer not to share usage data, you can disable telemetry by setting `sapbas.telemetryEnabled` to false in your VS Code settings. 

## Feedbacks

Please provide your feedback through [ServiceNow](https://itsm.services.sap/now/workspace/agent/record/u_sap_component/b1b0603e1bb3d4d0ddab74049b4bcbda/params/selected-tab-index/3) using the component HAN-BAS-SA.

## License  
This extension is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3_2.txt).
