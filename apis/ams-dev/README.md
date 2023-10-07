# cloud-authorization-nodejs-development

NodeJS development library which contains scripts to help developing with the AMS library.<br/>
One of the scripts uses a DCL compiler and creates [Rego files](https://www.openpolicyagent.org/docs/latest/policy-language/).<br/>
This can be useful if DCL policies want to be tested locally.<br/>
Further more this library contains two scripts for starting and stopping the the custom [OPA](https://github.wdf.sap.corp/CPSecurity/cas-opa-sap) (Open Policy Agent) in server mode.

### Sample base DCL
Every application has to define and provide their application specific so-called base DCLs. A `*.dcl` file has to be saved in a named package e.g. "ams" under ``root/$DCL_SRC_DIR/ams``.
```
SCHEMA {
    salesOrder: {
            type: number
    },
    CountryCode: String
}

POLICY readAll {
    GRANT read ON * WHERE CountryCode IS NOT RESTRICTED;
}

POLICY readAll_Europe {
    USE readAll RESTRICT CountryCode IN ('AT', 'BE', 'BG', ...);
}

POLICY adminAllSales {
    GRANT read, write, delete, activate ON salesOrders, salesOrderItems;
}

POLICY anyActionOnSales {
    GRANT * ON salesOrders, salesOrderItems;
}

POLICY readSalesOrders_Type {
    GRANT read ON salesOrders WHERE salesOrder.type BETWEEN 100 AND 500;
}
```
There is an official [DCL documentation](https://help.sap.com/docs/BTP/8c9e07421c8b4c108e67ab62e663d32a/ac128d5634ee4f19a65a3173be6c5e54.html) and also an interal [document](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLLanguage.md).

## Setup
There are different many ways this library can be used:<br/>
### npm global
```
npm install -g @sap/ams-dev
```
The advantage of this approach is that the scripts are available everywhere and nothing more needs to be done.<br/>
You can check if evrything works by calling:
```
compile-dcl
```
### npm project
Or you can install it on project level.<br/>
Inside your project run:
```
npm config set @sap:registry https://int.repositories.cloud.sap/artifactory/api/npm/build-releases-npm/
npm install @sap/ams-dev --save-dev
```
In addition the package.json can be extended by adding the desired scripts, e.g.:
```json
"scripts": {
    "compile-dcl": "compile-dcl -s (DCL_SRC_PATH) -t (REGO_PATH)",
    "start-opa": "start-opa -r (REGO_PATH) -p 8181 -d true",
    "stop-opa": "stop-opa"
}
```
Now inside of your project folder the command `npm run start-opa` can be executed.
Instead of defining the script command in the package.json one can make use `npx` to directly start the scripts.<br/>
For example:
```
npx compile-dcl -d dcl-src -r dcl-target
```

### config
Instead of setting the log-level for every cli command it's possible to define a global log-level by creating the file *$HOME/.ams/config.json*.
```json
{
  "log": "debug"
}
```
Furthermore as long as the folder *$HOME/.ams* exists all temporary files like the information which processes are running background are stored there.

## Documentation

### DCL compilation
The folder *resources/dcl-compiler* contains a file `dcl.jar` which is executed by the compile-dcl script.</br>
To update the compiler set the correct version in `package.json` and start the update script.

#### Usage

The dcl-compilation script requires both a source and a target directory as parameter.</br>
We highly recommend to always use the flag `--failOn warning` although default is `--failOn error` in order get notified if for example features become deprecated in future dcl versions.</br>
For more information on how to execute, the dcl-compilation script run `compile-dcl --help`:
```
Usage: compile-dcl --dcl [DCL_SRC_DIR] --rego [DCL_TARGET_DIR]

Options:
      --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
  -d, --dcl        path to DCL source directory              [string] [required]
  -r, --rego       path to REGO target directory             [string] [required]
  -l, --log-level  log level
        [string] [choices: "debug", "info", "warn", "error", "silent"] [default:
                                                                        "error"]
  -f, --failOn     fail on error, deprecation or warning
        [string] [choices: "error", "deprecation", "warning"] [default: "error"]

Examples:
  compile-dcl -d dcl-src/ -r rego/
```
*Example globally*:</br>
```
compile-dcl -s dcl-src -t dcl-target
```
*Example npx*:</br>
```
npx compile-dcl -s dcl-src -t dcl-target
```
*Example in module*:</br>
```
npm run dcl-compile
```

### DCL tests
A useful feature of DCL is [testing of policies](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLLanguage.md#testing-of-policies).</br>
From version 0.3.1 this library supports dcl tests which are automatically executed within the [DCL compilation](#dcl-compilation) script.</br>
The output of all tests is printed to the console:
```
> compile-dcl -d test/integration/dcl-resources -r test/dcl-target
...
.../dcl-target/procurement/procurement_test_dcl_test.rego:
data.procurement.test_procurement_test_dcl_CanReadPurchaseRequestGermany: PASS (11.18601ms)
data.procurement.test_procurement_test_dcl_CanUpdatePurchaseRequestGermany: PASS (3.429217ms)
data.procurement.test_procurement_test_dcl_CanInsertPurchaseRequestGermany: PASS (3.25077ms)
data.procurement.test_procurement_test_dcl_CanReadPurchaseRequestUK: PASS (6.008628ms)
data.procurement.test_procurement_test_dcl_CanReadPurchaseRequestAll: PASS (1.711102ms)

.../dcl-target/sales/sales_test_dcl_test.rego:
data.sales.test_sales_test_dcl_readAllSalesOrdersTest: PASS (639.761µs)
data.sales.test_sales_test_dcl_readSalesOrdersUserCountryCode: PASS (376.242µs)
--------------------------------------------------------------------------------
PASS: 7/7
```
If the dcl tests fail the dcl-compile script returns with a non zero exit code.</br>
For local dcl testing we recommend the following `package.json` structure:
```json
{
  "scripts": {
    "compile-dcl": "compile-dcl -d (DCL_PATH) -r (REGO_PATH)",
    "start-opa": "start-opa -r (REGO_PATH)",
    "pretest": "npm run compile-dcl && npm run start-opa",
    "test": "...",
    "posttest": "stop-opa && rm -rf (REGO_PATH)"
  }
}
```
This pretest ensures that your dcl code contains no errors and all the dcl tests succeed before executing the actual tests.</br>
If this library is installed globally via `npm install -g .` just run the following statement to test your dcl code:
```sh
compile-dcl -d (DCL_PATH) -r (REGO_PATH)
```

### Start/Stop local opa
The folder *resources/opa* currently has three sap custom opa executable binaries for the operating systems mac, darwin and linux.</br>
There's also a VERSION file to keep track of the current opa version.</br>
When executing the start-opa or stop-opa script the operating system is automatically detected by `process.platform`.

#### Usage

**Start Opa Server:**</br>
Run `start-opa --help` to check the usage:
```
Usage: start-opa -r [REGO_PATH] -u [USER_TO_POLICY_FILE] -p [PORT]

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -r, --rego         path to rego policies folder         [string] [default: ""]
  -u, --user2policy  optional path to a json file which maps policies to users
                                                          [string] [default: ""]
  -p, --port         port of the opa server           [string] [default: "8181"]
  -d, --daemonize    starts the opa as detached background process
                                                       [boolean] [default: true]
  -n, --name         gives the opa process a name which can be used to stop it
                                                          [string] [default: ""]
  -l, --log-level    log level
        [string] [choices: "debug", "info", "warn", "error", "silent"] [default:
                                                                        "error"]
  -w, --watch        starts OPA in watch mode          [boolean] [default: true]
  -c, --config-file  start opa with a config file                       [string]

Examples:
  start-opa -r rego/ -u user2policies.json
```
The only required option is the path to the directory which contains the compiled dcl files (rego).</br>
Therefore the most simple option is to call:
```
start-opa -r ""
```
This will start the opa server in the background on 127.0.0.1:8181 but without any policies.</br>
Opening the browser on http://127.0.0.1:8181 should show the opa landing page.</br>
Because the opa runs now in a detached background process the script will store the it's pid.
When the [stop-opa script](#stop-opa-server) is executed this pid will be taken to shutdown the all opa servers running in the background.</br>
Alternatively the opa server can be started with daemonize set to false which will then **not** run in background and forward all opa logs to the console:
```
start-opa -r "" -d false
```
To stop the opa one can just press *Control+C* and **no** stop-opa script has to be executed</br>.
In order to test the opa with the own DCL policies one can pass the relative path to the rego files, e.g.:
```
start-opa -r ./REGO_DIR -u ./user2policy.json
```
The policies can be verified by calling http://127.0.0.1:8181/v1/policies.</br>
For the assignment of policies to users a data.json file is used:
```json
{
    "principal2policies": {
        "TEST_ZONE": {
            "TEST_USR": [
                "sales.readAllSalesOrders"
            ],
            "CONDITION_USR": [
                "sales.readAllSalesOrdersCondition"
            ]
        }
    }
}
```
The path of this file must be specified:
```
start-opa -r ./REGO_DIR/ -u ./data.json -i true
```
It can be verified by calling http://127.0.0.1:8181/v1/data.

**Stop Opa Server:**</br>
Run `stop-opa --help` to check the usage:
```
Usage: stop-opa -p [PORT] -n [NAME]

Options:
      --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
  -p, --port       stops the opa process running on this port           [string]
  -n, --name       stops the opa process with this given name           [string]
  -l, --log-level  log level
        [string] [choices: "debug", "info", "warn", "error", "silent"] [default:
                                                                        "error"]
  -d, --dry-run    list running instances to delete   [boolean] [default: false]

Examples:
  stop-opa -p 8181  stopps opa on port 8181
```
This script is used to stop opa servers running in **background**.</br>
If no parameters are passed all opa background processes will be killed:
```
stop-opa
```

## Tests
Tests are implemented with mocha and chai.
```
npm test
```
Tests:
- Unit tests that verify dcl to rego compilation
- Integration test that validates functionality of the launch opa script

## Updating the library
In order to update the opa or dcl-compiler version all you have to do is to specify the version in the package.json file:
```json
{
  "version": "0.2.3",
  "config": {
    "opaVersion": "0.47.2-sap-0.3.0",
    "dclCompilerVersion": "0.12.2"
  },
}
```
When checking out the repo initially there's no dcl-compiler or opa binary.</br>
To download them use `npm run update` or `npm test`.</br>
The logic for updating all binaries is in **src/updateBins.ts**.</br>
To publish a never version in the internal npm repo go to jenkins and enable the option release when starting the pipeline.

## Nodejs lib with typescript
I basically followed this tutorial: https://blog.logrocket.com/publishing-node-modules-typescript-es-modules/
