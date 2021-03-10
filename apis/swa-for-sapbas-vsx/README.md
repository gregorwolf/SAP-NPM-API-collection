[![Build Status](https://gkedevxlondon.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=swa_ci/master)](https://gkedevxlondon.jaas-gcp.cloud.sap.corp/job/swa_ci/job/master/)
[![Quality Gate Status](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=alert_status)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)
[![Coverage](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=coverage)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)
[![Rating](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=sqale_rating)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)
[![Bugs](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=bugs)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)
[![Code Smells](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=code_smells)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)
[![Duplicated Lines Density](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=duplicated_lines_density)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)
[![Security Vulnerabilities](https://sonar.wdf.sap.corp/api/project_badges/measure?project=swa-for-sapbas-vsx&metric=vulnerabilities)](https://sonar.wdf.sap.corp/dashboard?id=swa-for-sapbas-vsx)


# SAP Web Analytics npm package for Visual Code Extensions
Wrapper for SWA meant to be used in Visual code and SAP Application Studio.

## Usage

### Installation
npm install @sap/swa-for-sapbas-vsx

### ENV
Everything in the environment should be set up, if using in AppStudio please make sure [swa-chart](https://github.wdf.sap.corp/app-studio/swa-chart) is installed as a ws-ext

### API
There are only two functions to call for usage

#### Import
```js
import { SWATracker } from '@sap/swa-for-sapbas-vsx';
```

#### Constructor
Has 3 params that are detailed in the constructor call:  
```js
/**
 * constructor
 * @param vsxPublisher should be publisher in package.json
 * @param vsxPackageName should be extension package.json name
 * @param errorListener callback for error, one such callback for all the errors we receive via all the track methods err can be string (err.message) or number (response.statusCode)
 */
var myErrorListener = (err) => { myErrorHandling(err); }
swa = new SWATracker("My Vscode Ext Publisher","My Package name", myErrorListener)
```
---
**NOTE**

The vsxPublisher and vsxPackageName values passed to SWA Tracker constructor must be exact strings as they appear in the extension package.json. Otherwise, the usage data is not reported when extension is running in VS Code.

---

#### Track
After creating a new swa class as detailed above usage is pretty simple  
```js
/**
 * Send event to SWA for tracking
 * @param eventType string detailing what event are you looking to track (ex. "Generator Success!") 
 * @param {string[]} [custom_events] Optional, can accept up to 4, any more will be ignored
 * @param {int[]} [numericEvents] Optional, can accept up to 2, any more will be ignored
 */
swa.track("myEvent", ["custom event 1", "custom event 2", "This array is optional"],[1,2]); // numeric events is also optional
```

#### Example
```js
import * as vscode from 'vscode';
import {SWATracker} from "@sap/swa-for-sapbas-vsx";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
    const swa = new SWATracker("SAP", "vscode-close-editor", (err : string|number) => {console.log(err);});
    let cmd_closeActiveEditor = vscode.commands.registerCommand('extension.closeActiveEditor', () => {
        
        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
        // Note that I don't have any custom events so I don't send an extra array
        swa.track("Close Active Editor");
    });
...
...
```

### Usage Comments
1. If running in Appstudio and SWA chart is not enabled code will throw error into console log that it is unable to track.  
2. Please take note that if environment is not configured correctly with privacy settings code will not send any tracking.  

## Enable usage analytics reporting from VS Code
If you have a VS Code extension that is released to VS Code marketplace and you would like to collect its usage when it runs in VS Code, do the following:

1. **Make sure that the vsxPublisher and vsxPackageName parameters initializing SWATracker object are correct.** 
The vsxPublisher and vsxPackageName values passed to SWA Tracker constructor must be exact strings as they appear in the extension package.json.

```js
/**
 * constructor
 * @param vsxPublisher should be publisher in package.json
 * @param vsxPackageName should be extension package.json name
 * @param errorListener callback for error, one such callback for all the errors we receive via all the track methods err can be string (err.message) or number (response.statusCode)
 */
var myErrorListener = (err) => { myErrorHandling(err); }
swa = new SWATracker("My Vscode Ext Publisher","My Package name", myErrorListener)

```

---
**NOTE**

If you need to change vsxPublisher and vsxPackageName values after you already have SWA reports presenting the usage data, do not forget to adjust these reports considering the changed publisher info.
For example, if you use “Custom event parameter 10” in report filter definition, you should specify both old and new values to see the data from the extension.

---

2. **In “configuration” section of your VS code extension** add the settings for user to enable/disable sending the reports. Replace the placeholders with the relevant strings.

```json
...
"<Your package name>.enableSapWebAnalytics": {
					"type": "boolean",
					"default": true,
					"description": "Enable collecting usage analytics data for <Your Tool Name>.  If enabled, non-personally identifiable information is used to help understand the product usage and improve the tool.",
					"scope": "resource"
				}
...
```
3. **In README file of your extension**, add the following paragraph (do not forget replace the \<Tool Name\> placeholder with your tool name!) :

The tool collects non-personally identifiable information about your usage of the tool to improve its services.
If you do not want the tool to collect your usage data, you can set the "Enable Sap Web Analytics" setting to "false".
Go to File > Preferences > Settings (macOS: Code > Preferences > Settings) > Extensions > \<Tool Name\>, and deselect the "Enable Sap Web Analytics" checkbox.

## SWA Reports and Parameter Mapping
The following fields can be used for creating SWA reports:  

| SWA Field  | Origin |
| ------------- | ------------- |
| **eventType**  | The "myEvent" parameter sent via track API    |
| **user**  | Hashed user ID unless privacy is activated, then "na"    |
| **Custom event parameter 1**  | Event additional data 1, "custom event 1" sent via track API    |
| **Custom event parameter 2**  | Event additional data 2, "custom event 2" sent via track API    |
| **Custom event parameter 3**  | Event additional data 3, "custom event 3" sent via track API    |
| **Custom event parameter 4**  | Event additional data 4, "custom event 4" sent via track API    |
| **Custom event parameter 5**  | Event additional data 5, "custom event 5" sent via track API    |
| **Custom event parameter 6**  | IAAS (aws,ali,azure), set by the lib automatically   |
| **Custom event parameter 7**  | Datacenter (stg10.int, cry10.int, ap21, prd40), set by the lib automatically    |
| **Custom event parameter 8**  | Version (currently not supported), set by the lib automatically    |
| **Custom event parameter 9**  | Is SAP User where allowed, empty overwise, set by the lib automatically    |
| **Custom event parameter 10**  | The unique caller ID "vsxPublisher.vsxPackageName", set by lib automatically  |
| **Numeric event parameter 1** | Event additional numeric data 1, "numeric event 1" sent via tack API |
| **Numeric event parameter 2** | Event additional numeric data 2, "numeric event 2" sent via tack API |

## Contribution
1. Add a PR with changes to package version (and package-lock)
2. Add a PR in https://github.wdf.sap.corp/NPMJS/NODE_SWA_FOR_VSC_EXT-1.0 see [example PR](https://github.wdf.sap.corp/NPMJS/NODE_SWA_FOR_VSC_EXT-1.0)
3. ask project npm project admins (ido goren, asaf dulberg) to approve the PRs
4. new version should be released soon to npmjs on https://www.npmjs.com/package/@sap/swa-for-sapbas-vsx
