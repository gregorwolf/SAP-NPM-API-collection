# Application Modeler

The application modeler extension allows you to visualize and change the page routing of SAP Fiori elements applications (Page Map), and to configure individual pages via manifest settings, annotation properties, and UI flexibility changes (Page Editor).

Starting as of version 1.10.1, the Page Editor supports adding and maintaining properties of [SAP Fiori elements building blocks](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview) for OData V4-based applications. This feature is currently an experimental one and is subject to changes and enhancements based on customer feedback.

## Migration

Applications created with the SAP Fiori Tools (see "Integration with the Fiori: Application Generator" topic below) are automatically enabled for application modeler. In order to migrate an existing project, which is already present in your workspace, execute the command `Fiori: Migrate Project for use in Fiori tools` from the Command Palette.
Supported project types:

- SAP Fiori elements for V2
- SAP Fiori elements for V4
- SAPUI5 freestyle
- SAPUI5 Adaptation Project (only on SAP Business Application Studio)
- Extension Project (only on SAP Business Application Studio)

### Usage

1. The SAP Fiori project cloned from a repository or filesystem has to be in your workspace.
1. Execute the command `Fiori: Migrate Project for use in Fiori tools` from the Command Palette.
1. Select your project(s) in project list
1. Select a SAP System for your project's service (and reuse libraries in applicable) from the dropdown list , 
or select `Manual Input` to enter backend "Hostname" URL and SAP Client manually
1. If the application has no backend service no input in needed.
1. Click on "Start Migration" to upgrade the selected project(s).

The migration will update the `package.json`, `ui5*.yaml`, and `test\*.html` files in your project folder.

## Page Map

### Features

The **SAP Fiori Tools - Page Map** provides a visual representation of the application's pages, navigations, and the service entities that it uses. The developer can add new navigations and pages, delete pages, and navigate to corresponding editing tools.

The Page Map extension reads and updates the `app.json` file containing the navigation and pages information in a compact and technology independent notation. The file also serves as a simple text-based interface. It is generated on demand and can be accessed from the application modeler tree view from SAP Fiori sidebar view by selecting the `Show Source Code` option from the `Map` node's right-click context menu. The application descriptor (`webapp/manifest.json`) of the application will be updated automatically when the `app.json` is saved, and changes to the `webapp/manifest.json` will be converted to `app.json`. The `app.json` is virtual and will not be written to the project folder.

#### Supported Templates of SAP Fiori Elements

* List Report Page with OData V2 and OData V4
* Worklist Page with OData V2 and OData V4
* Analytical List Page with OData V2 and OData V4
* Overview Page with OData V2 and OData V4
* From Entry Object Page with OData V4
* Custom Page with OData V4

### How to use Page Map

Select the root folder of your app or any folder in your workspace within Explorer, right-click and choose `Show Page Map`. If the project can't be determined from your selection, you will be presented with a quick pick to select the project.

OR

Left-click on the `Map` node in application modeler tree view for the project from SAP Fiori side bar view.

OR

In the text editor of the virtual `app.json` file choose the `Show Page Map` icon in the Editor Title menu

OR

From the Command Palette execute the command `Fiori: Show Page Map`

### Notes

* Undo/redo via menu options is not supported in SAP Application Studio

### Prerequisites

* [NodeJS](https://nodejs.org/en/download/) Version 18.14.2 or higher

## Page Editor

### Features

The **SAP Fiori Tools - Page Editor** provides an outline view of the configurable elements on the selected page. Settings can be changed within a property panel which opens on click on an element. The property panel displays the editable properties, provides a search filter option, info texts for properties, and via `Edit in source code` the option to see and edit the property directly in the associated file.

The Page editor reads and writes `pages/*.json` files containing the applicable manifest and UI5 flexibility based settings in a compact and technology independent notation. The files also serve as a simple text-based interface. They are generated on demand and can be accessed from the application modeler tree view from SAP Fiori sidebar view by selecting the `Show Source Code` option from the respective page's node's right-click context menu. Each page in your app has its own `json` file. The virtual files will be automatically synchronized with the `webapp/manifest.json` and UI5 flex changes in the `webapp/changes` folder.

#### Annotation Support

Starting as of version 1.4.1 of the application modeler and [`@sap/ux-specification`](https://www.npmjs.com/package/@sap/ux-specification) with the versions 1.84.25, 1.90.14 or higher, the Page Editor allows the creation and maintenance of the most common annotation-based UI elements for OData V4-based List report Object page and Form entry page applications. With this addition, the application modeler further strengthens the goal of SAP Fiori tools to ease and speed up the application development.

#### Building Block Support

Starting as of version 1.10.1 of the application modeler and [`@sap/ux-specification`](https://www.npmjs.com/package/@sap/ux-specification) 1.108.8, 1.96.41 or higher, the Page Editor supports adding and maintaining the properties of [SAP Fiori elements building blocks](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview) for OData V4-based applications. Building blocks within a custom page or custom section can be shown in the outline and their properties be modified in the property panel. The building blocks for the chart, filter bar, and table can be created from the outline using a link to the corresponding feature guides in the Guided Development tool.

This feature is currently experimental and subject to changes and enhancements based on customer feedback.

#### Supported Templates of SAP Fiori Elements

* List Report Page with OData V2 and OData V4
* Worklist Page with OData V2 and OData V4
* Analytical List Page with OData V2 and OData V4
* Overview Page with OData V2 and OData V4
* From Entry Object Page with OData V4

### How to use Page Editor

Select the root folder of your app or any folder in your workspace within Explorer, right-click and choose `Show Page Map`. Choose a page you want to configure and click the pencil icon.

OR

Left-click on the respective page's node in application modeler tree view for the project from the SAP Fiori side bar view.

OR

In the text editor of the virtual JSON file of the page choose the `Show Page Editor` icon in the Editor Title menu.

## How to Preview the Application

Provided by [`@sap/ux-ui5-tooling`](https://www.npmjs.com/package/@sap/ux-ui5-tooling) the application modeler also comprises a live preview in a browser for non-CAP applications (for CAP the preview is handled via CDS tools), which is automatically refreshed when application project files are changed. The live preview starts an HTTP local server at default port 8080 (additional apps start at subsequent ports), where the application is run.

Select the root folder of your app or any app-related folder within the Explorer, right-click, and choose `Preview Application` to start the app in your default browser.

OR

From the Command Palette execute the command `Fiori: Preview Application`

OR

From the application modeler tree view for the project from the SAP Fiori sidebar view right-click on any folder, and choose `Preview Application`.

If the application can't be determined from your selection, you will receive a quick pick to select it from. Next, you receive a list of start scripts from the `package.json` with options on how you want the preview to be executed. The default options are:

* `start` - starts the application with real service data
* `start-mock` - starts the application with mock data
* `start-local` - starts the application with mock data and a local copy of the SAPUI5 resources for offline work
* `start-noflp` - starts the applications without the sandbox SAP Fiori launchpad

The preview command also offers the existing run configurations for the applications to start. Preview via run configurations gives the developer more flexibility in maintaining multiple preview setups and run with debugger attached. The command `Fiori: Open Run Configuration` allows you to create a new run configuration in VSCode. In SAP Business Application Studio the functionality is available also via the action `Create Configuration` under `View` -> `Run configurations`.

### Enable App-to-App Navigation Preview

To enable the preview of app-to-app navigation for applications in the same workspace execute the command `Fiori: Enable App-to-App Navigation` from the Command Palette. It will ask you for a source and target application. Upon completion a new configuration `appconfig\fioriSandboxConfig.json` is written to the source application folder. Navigations from source to target application are now available in preview.

### Preview an Application in External Fiori Launchpad

This feature provides the user with the ability to test an application run without its redeployment. Running an application on the existing Fiori Launchpad requires the application to be deployed once and configured, so it is visible on the target Fiori Launchpad. The feature needs to be configured once with the command `Fiori: Add FLP Embedded Configuration`. Then a new start script `start-embedded` becomes available. Note that the SAP Launchpad service on SAP BTP does not support the use of this feature currently.

Prerequisite: [`@sap/ux-ui5-tooling`](https://www.npmjs.com/package/@sap/ux-ui5-tooling) version 1.3.1 or higher

### Developer variant creation

This feature provides the user with the ability to create variants which are delivered together with the application. The variants are stored as SAPUI5 flexibility changes in the project's `webapp/changes` folder and packaged with the application during the build step. The feature is delivered with the `@sap/ux-ui5-tooling` node module and its preview feature.

Developer variant creation is supported from the SAPUI5 version 1.90 (OData V2 based applications) and 1.84 (OData V4 based applications). Currently, `@sap/ux-ui5-tooling` supports only ABAP service-based projects. The feature can be started from "Preview Application" context menu via the script `start-variants-management`. The script and necessary configuration are added with the palette command `Fiori: Add Configuration for Variants Creation`.

Prerequisite: [`@sap/ux-ui5-tooling`](https://www.npmjs.com/package/@sap/ux-ui5-tooling) version 1.4.0 or higher

## Documentation of Configuration Features

The manifest and UI5 flexibility properties of the respective SAP UI5 version shown in Page map and Page editor are provided by the `@sap/ux-specification` node module installed on project creation or migration. The version of the module is determined by the `minUI5Version` of the application project stored in the `manifest.json` file. The full list and documentation of available properties for the application, and the application's individual pages can be accessed independently from the Page Map and Page Editor via the right-click context menus in the application modeler tree view.

## Integration with the SAP Fiori Tools - Application Generator

### Installation

Installing the **Application Modeler** extension adds support for the application generator tool. The Application Generator allows the user to generate an application based on a number of different templates.

### How to use Application Generator

From the Command Palette execute the command `Fiori: Open Application Generator`

This will launch the application generator tool if installed.  If the application generator is not yet installed, it will install it the first time this command is executed.

### Prerequisites

* [NodeJS](https://nodejs.org/en/download/) Version 18.14.2 or higher

## Application Information Page

After application generation an information page will be automatically opened. This page comprises sections with information, links to tools and further actions.

* Project Details - information like the title, the path, the pages, and type of application
* Application Status - showing the status of required libraries
* What you can do - a collection of tiles to access useful tools within the context of the application
* What you can learn - resources for further reading

The information page can also be opened with the command `Fiori: Open Application Info`.

## Data Editor

Previewing the application using 'npm run start-mock' generates mock-data on the fly. If you want to generate mock-data and store it in the `.json` file format, you can right-click on your project and launch `Open Data Editor`. Once generated, the mock-data is stored in the `.json` files under the `/webapp/localService/mockdata` folder. 

Data Editor reads the `metadata.xml` file and generates mock-data. Data can be edited in the canvas by either double-clicking the cells of the Data Editor or changing the `.json` files directly.

## Support

Join the [SAP Fiori Tools Community](https://community.sap.com/search/?by=updated&ct=blog&mt=73555000100800002345). Ask Questions, Read the Latest Blogs, Explore Content.
Please assign tag: _SAP Fiori tools_.

To log an issue with SAP Fiori Tools, please see [Contact SAP Support](https://help.sap.com/viewer/1bb01966b27a429ebf62fa2e45354fea/Latest/en-US).

## Documentation
- Visit **SAP Help Portal** for [SAP Fiori Tools](https://help.sap.com/viewer/product/SAP_FIORI_tools/Latest/en-US) documentation.

## License
<details>
    <summary>SAP DEVELOPER LICENSE AGREEMENT</summary>
    <p/>
    Please scroll down and read the following Developer License Agreement carefully ("Developer Agreement").  By clicking "I Accept" or by attempting to download, or install, or use the SAP software and other materials that accompany this Developer Agreement ("SAP Materials"), You agree that this Developer Agreement forms a legally binding agreement between You ("You" or "Your") and SAP SE, for and on behalf of itself and its subsidiaries and affiliates (as defined in Section 15 of the German Stock Corporation Act) and You agree to be bound by all of the terms and conditions stated in this Developer Agreement. If You are trying to access or download the SAP Materials on behalf of Your employer or as a consultant or agent of a third party (either "Your Company"), You represent and warrant that You have the authority to act on behalf of and bind Your Company to the terms of this Developer Agreement and everywhere in this Developer Agreement that refers to 'You' or 'Your' shall also include Your Company. If You do not agree to these terms, do not click "I Accept", and do not attempt to access or use the SAP Materials.
    <p/>
    1.  LICENSE:
    <br/>SAP grants You a non-exclusive, non-transferable, non-sublicensable, revocable, limited use license to copy, reproduce and distribute the application programming interfaces ("API"), documentation, plug-ins, templates, scripts and sample code ("Tools") on a desktop, laptop, tablet, smart phone, or other appropriate computer device that You own or control (any, a "Computer") to create new applications ("Customer Applications"). You agree that the Customer Applications will not: (a) unreasonably impair, degrade or reduce the performance or security of any SAP software applications, services or related technology ("Software"); (b) enable the bypassing or circumventing of SAP's license restrictions and/or provide users with access to the Software to which such users are not licensed; (c) render or provide, without prior written consent from SAP, any information concerning SAP software license terms, Software, or any other information related to SAP products; or (d) permit mass data extraction from an SAP product to a non-SAP product, including use, modification, saving or other processing of such data in the non-SAP product. In exchange for the right to develop Customer Applications under this Agreement, You covenant not to assert any Intellectual Property Rights in Customer Applications created by You against any SAP product, service, or future SAP development.
    <p/>
    2.  INTELLECTUAL PROPERTY:
    <br/>(a) SAP or its licensors retain all ownership and intellectual property rights in the APIs, Tools and Software. You may not: a) remove or modify any marks or proprietary notices of SAP, b) provide or make the APIs, Tools or Software available to any third party, c) assign this Developer Agreement or give or transfer the APIs, Tools or Software or an interest in them to another individual or entity, d) decompile, disassemble or reverse engineer (except to the extent permitted by applicable law) the APIs Tools or Software, (e) create derivative works of or based on the APIs, Tools or Software, (f) use any SAP name, trademark or logo, or (g) use the APIs or Tools to modify existing Software or other SAP product functionality or to access the Software or other SAP products' source code or metadata.
    <br/>(b) Subject to SAP's underlying rights in any part of the APIs, Tools or Software, You retain all ownership and intellectual property rights in Your Customer Applications.
    <p/>
    3. FREE AND OPEN SOURCE COMPONENTS:
    <br/>The SAP Materials may include certain third party free or open source components ("FOSS Components"). You may have additional rights in such FOSS Components that are provided by the third party licensors of those components.
    <p/>
    4. THIRD PARTY DEPENDENCIES:
    <br/>The SAP Materials may require certain third party software dependencies ("Dependencies") for the use or operation of such SAP Materials. These dependencies may be identified by SAP in Maven POM files, product documentation or by other means. SAP does not grant You any rights in or to such Dependencies under this Developer Agreement. You are solely responsible for the acquisition, installation and use of Dependencies. SAP DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES IN RESPECT OF DEPENDENCIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND OF FITNESS FOR A PARTICULAR PURPOSE. IN PARTICULAR, SAP DOES NOT WARRANT THAT DEPENDENCIES WILL BE AVAILABLE, ERROR FREE, INTEROPERABLE WITH THE SAP MATERIALS, SUITABLE FOR ANY PARTICULAR PURPOSE OR NON-INFRINGING.  YOU ASSUME ALL RISKS ASSOCIATED WITH THE USE OF DEPENDENCIES, INCLUDING WITHOUT LIMITATION RISKS RELATING TO QUALITY, AVAILABILITY, PERFORMANCE, DATA LOSS, UTILITY IN A PRODUCTION ENVIRONMENT, AND NON-INFRINGEMENT. IN NO EVENT WILL SAP BE LIABLE DIRECTLY OR INDIRECTLY IN RESPECT OF ANY USE OF DEPENDENCIES BY YOU.
    <p/>
    5.  WARRANTY:
    <br/>a)  If You are located outside the US or Canada: AS THE API AND TOOLS ARE PROVIDED TO YOU FREE OF CHARGE, SAP DOES NOT GUARANTEE OR WARRANT ANY FEATURES OR QUALITIES OF THE TOOLS OR API OR GIVE ANY UNDERTAKING WITH REGARD TO ANY OTHER QUALITY. NO SUCH WARRANTY OR UNDERTAKING SHALL BE IMPLIED BY YOU FROM ANY DESCRIPTION IN THE API OR TOOLS OR ANY AVAILABLE DOCUMENTATION OR ANY OTHER COMMUNICATION OR ADVERTISEMENT. IN PARTICULAR, SAP DOES NOT WARRANT THAT THE SOFTWARE WILL BE AVAILABLE UNINTERRUPTED, ERROR FREE, OR PERMANENTLY AVAILABLE.  FOR THE TOOLS AND API ALL WARRANTY CLAIMS ARE SUBJECT TO THE LIMITATION OF LIABILITY STIPULATED IN SECTION 4 BELOW.
    <br/>b)  If You are located in the US or Canada: THE API AND TOOLS ARE LICENSED TO YOU "AS IS", WITHOUT ANY WARRANTY, ESCROW, TRAINING, MAINTENANCE, OR SERVICE OBLIGATIONS WHATSOEVER ON THE PART OF SAP. SAP MAKES NO EXPRESS OR IMPLIED WARRANTIES OR CONDITIONS OF SALE OF ANY TYPE WHATSOEVER, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND OF FITNESS FOR A PARTICULAR PURPOSE. IN PARTICULAR, SAP DOES NOT WARRANT THAT THE SOFTWARE WILL BE AVAILABLE UNINTERRUPTED, ERROR FREE, OR PERMANENTLY AVAILABLE.  YOU ASSUME ALL RISKS ASSOCIATED WITH THE USE OF THE API AND TOOLS, INCLUDING WITHOUT LIMITATION RISKS RELATING TO QUALITY, AVAILABILITY, PERFORMANCE, DATA LOSS, AND UTILITY IN A PRODUCTION ENVIRONMENT.
    <p/>
    6.  LIMITATION OF LIABILITY:
    <br/>a)  If You are located outside the US or Canada: IRRESPECTIVE OF THE LEGAL REASONS, SAP SHALL ONLY BE LIABLE FOR DAMAGES UNDER THIS AGREEMENT IF SUCH DAMAGE (I) CAN BE CLAIMED UNDER THE GERMAN PRODUCT LIABILITY ACT OR (II) IS CAUSED BY INTENTIONAL MISCONDUCT OF SAP OR (III) CONSISTS OF PERSONAL INJURY. IN ALL OTHER CASES, NEITHER SAP NOR ITS EMPLOYEES, AGENTS AND SUBCONTRACTORS SHALL BE LIABLE FOR ANY KIND OF DAMAGE OR CLAIMS HEREUNDER.
    <br/>b)  If You are located in the US or Canada: IN NO EVENT SHALL SAP BE LIABLE TO YOU, YOUR COMPANY OR TO ANY THIRD PARTY FOR ANY DAMAGES IN AN AMOUNT IN EXCESS OF $100 ARISING IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE TOOLS OR API OR IN CONNECTION WITH SAP'S PROVISION OF OR FAILURE TO PROVIDE SERVICES PERTAINING TO THE TOOLS OR API, OR AS A RESULT OF ANY DEFECT IN THE API OR TOOLS. THIS DISCLAIMER OF LIABILITY SHALL APPLY REGARDLESS OF THE FORM OF ACTION THAT MAY BE BROUGHT AGAINST SAP, WHETHER IN CONTRACT OR TORT, INCLUDING WITHOUT LIMITATION ANY ACTION FOR NEGLIGENCE. YOUR SOLE REMEDY IN THE EVENT OF BREACH OF THIS DEVELOPER AGREEMENT BY SAP OR FOR ANY OTHER CLAIM RELATED TO THE API OR TOOLS SHALL BE TERMINATION OF THIS AGREEMENT. NOTWITHSTANDING ANYTHING TO THE CONTRARY HEREIN, UNDER NO CIRCUMSTANCES SHALL SAP AND ITS LICENSORS BE LIABLE TO YOU OR ANY OTHER PERSON OR ENTITY FOR ANY SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR INDIRECT DAMAGES, LOSS OF GOOD WILL OR BUSINESS PROFITS, WORK STOPPAGE, DATA LOSS, COMPUTER FAILURE OR MALFUNCTION, ANY AND ALL OTHER COMMERCIAL DAMAGES OR LOSS, OR EXEMPLARY OR PUNITIVE DAMAGES.
    <p/>
    7.  INDEMNITY:
    <br/>You will fully indemnify, hold harmless and defend SAP against law suits based on any claim: (a) that any Customer Application created by You infringes or misappropriates any patent, copyright, trademark, trade secrets, or other proprietary rights of a third party, or (b) related to Your alleged violation of the terms of this Developer Agreement.
    <p/>
    8.  EXPORT:
    <br/>The Tools and API are subject to German, EU and US export control regulations. You confirm that: a) You will not use the Tools or API for, and will not allow the Tools or API to be used for, any purposes prohibited by German, EU and US law, including, without limitation, for the development, design, manufacture or production of nuclear, chemical or biological weapons of mass destruction; b) You are not located in Cuba, Iran, Sudan, Iraq, North Korea, Syria, nor any other country to which the United States has prohibited export or that has been designated by the U.S. Government as a "terrorist supporting" country (any, an "US Embargoed Country"); c) You are not a citizen, national or resident of, and are not under the control of, a US Embargoed Country; d) You will not download or otherwise export or re-export the API or Tools, directly or indirectly, to a US Embargoed Country nor to citizens, nationals or residents of a US Embargoed Country; e) You are not listed on the United States Department of Treasury lists of Specially Designated Nationals, Specially Designated Terrorists, and Specially Designated Narcotic Traffickers, nor listed on the United States Department of Commerce Table of Denial Orders or any other U.S. government list of prohibited or restricted parties and f) You will not download or otherwise export or re-export the API or Tools , directly or indirectly, to persons on the above-mentioned lists.
    <p/>
    9.  SUPPORT:
    <br/>Other than what is made available on the SAP Community Website (SCN) by SAP at its sole discretion and by SCN members, SAP does not offer support for the API or Tools which are the subject of this Developer Agreement.
    <p/>
    10.  TERM AND TERMINATION:
    <br/>You may terminate this Developer Agreement by destroying all copies of the API and Tools on Your Computer(s). SAP may terminate Your license to use the API and Tools immediately if You fail to comply with any of the terms of this Developer Agreement, or, for SAP's convenience by providing you with ten (10) day's written notice of termination (including email). In case of termination or expiration of this Developer Agreement, You must destroy all copies of the API and Tools immediately.  In the event Your Company or any of the intellectual property you create using the API, Tools or Software are acquired (by merger, purchase of stock, assets or intellectual property or exclusive license), or You become employed, by a direct competitor of SAP, then this Development Agreement and all licenses granted in this Developer Agreement shall immediately terminate upon the date of such acquisition.
    <p/>
    11.  LAW/VENUE:
    <br/>a)  If You are located outside the US or Canada: This Developer Agreement is governed by and construed in accordance with the laws of the Germany. You and SAP agree to submit to the exclusive jurisdiction of, and venue in, the courts of Karlsruhe in Germany in any dispute arising out of or relating to this Developer Agreement.
    <br/>b)  If You are located in the US or Canada: This Developer Agreement shall be governed by and construed under the Commonwealth of Pennsylvania law without reference to its conflicts of law principles. In the event of any conflicts between foreign law, rules, and regulations, and United States of America law, rules, and regulations, United States of America law, rules, and regulations shall prevail and govern. The United Nations Convention on Contracts for the International Sale of Goods shall not apply to this Developer Agreement. The Uniform Computer Information Transactions Act as enacted shall not apply.
    <p/>
    12. MISCELLANEOUS:
    <br/>This Developer Agreement is the complete agreement for the API and Tools licensed (including reference to information/documentation contained in a URL). This Developer Agreement supersedes all prior or contemporaneous agreements or representations with regards to the subject matter of this Developer Agreement. If any term of this Developer Agreement is found to be invalid or unenforceable, the surviving provisions shall remain effective. SAP's failure to enforce any right or provisions stipulated in this Developer Agreement will not constitute a waiver of such provision, or any other provision of this Developer Agreement.

</details>
