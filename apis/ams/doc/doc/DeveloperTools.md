# NodeJS AMS Developer Tools

## Custom Opa
For the evaluation of the from DCL compiled Rego files a Open Source Software called [OPA](https://www.openpolicyagent.org/) (Open Policy Agent) is used.<br/>
To fullfil our requirements we integrated some additional features on top of the standard OPA version which can be found in this [repository](https://github.wdf.sap.corp/CPSecurity/cas-opa-sap).

## AMS development library
The [AMS development library](https://github.wdf.sap.corp/CPSecurity/cloud-authorization-nodejs-development) is especially useful for testing DCL policies locally.<br/>
The main feature of the AMS development library is the compile script of DCL to Rego files via Java DCL compiler.<br/>
It also contains a script to start and stop a opa server locally.

## Visual Studio Code extensions
When developing with the AMS library there are some Visual Studio extensions which can be useful for syntax highlighting, DCL to Rego compilation, auto completion and more.

### Installation of DCL plugin
- Run this [download script](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/etc/scripts/downloadVSCodeExtension.sh)
- This creates a file language-server-vscode.vsix in the current directory.
- Open this file in VSCODE in the extension management using "Install from VSIX"

Note: per default auto compilation from DCL to Rego is activated in this extension.
To turn it off go into the extension settings.

### Installation of Rego plugin
The Visual Studio Code Rego extension can either be installed via the extension marketplace or [downloaded](https://marketplace.visualstudio.com/items?itemName=tsandall.opa) directly.<br/>
Some of the main features are Syntax highlighting, formatting and package evaluation.