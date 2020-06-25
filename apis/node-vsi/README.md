@sap/node-vsi
=============

This project contains the VSI binding for node.js. It also includes the native libraries to run on Windows/Linux.
If you need another platforms, please create a SAP support ticket to BC-SEC.

## Installation
The module has moved to sap-internal npm registry. Ultimately all SAP modules will be there soon. Requests for opensource modules will be proxied to the official npmjs.org registry.

In order to configure the sap-internal registry you need to issue the following command:

```
npm config set @sap:registry=https://npm.sap.com
npm install @sap/node-vsi
```

Afterwards you can add the module "sap-node-vsi" to the dependencies section of your package.json.

# Platforms

Supported platforms: **Windows** | **Linux** | **MacOS**

#### Hello world

This standard example uses the eicar from www.eicar.org which all AV scanners has to find and detect as test virus.

```javascript
var vsi = require('@sap/node-vsi');
var vsiProfile = vsi.vsiProfile;
var v = new vsiProfile("");
v.scanBytes("eicar.txt","X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*", 68);
console.log("\nResult of eicar scan is rc " + v.getLastErrorCode() + " (" + v.getScanErrorName() + ") with error message: \n" + v.getLastError() + "\n" );
```

# Getting started

From your project directory, run (see below for requirements):

```
$ var vsi = require('@sap/node-vsi');
```


