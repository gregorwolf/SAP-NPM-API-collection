<!-- This is the README for npmjs -->

# @sap/ams-dev

This module provides tooling support for extending applications which authenticate users via the [SAP Cloud Identity Services](https://help.sap.com/docs/identity-authentication?locale=en-US) with [authorization checks](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies?locale=en-US) via AMS (Authorization Management Service).

For non-CAP applicatons, the primary functionality provided by this module is enabling tests on local *DCL* (Data Control Language) bundles. To this end, it provides a compilation script that produces files for the *ADC* (Authorization Decision Controller) of AMS. Current versions of the AMS client libraries use an in-process engine as ADC that runs on *DCN* (Data Control Notation) files.

## CAP integration

For [CAP](https://cap.cloud.sap/docs/guides/authorization) (Cloud Application Programming Model)  applications, this module provides an *AMS* dev-time cds plugin that provides a [custom build task](https://cap.cloud.sap/docs/guides/deployment/custom-builds#custom-build-plugins) for DCL compilation that is called *ams*. It is integrated into both *cds watch* and *cds build*. Furthermore, the plugin integrates nicely into *mocked* auth and hybrid environments which allows developing local applications with AMS bound to SAP Identity service instances on SAP BTP.

For details, refer to the documentation of [@sap/ams](https://www.npmjs.com/package/@sap/ams).

## DCL compilation
This module provides a *bin* script called `compile-dcl` which compiles `.dcl` files to `.dcn` files which serve as input for running an application using AMS on the *DCL* bundle locally, e.g. for unit tests.

```markdown
 **Info:** As the DCL compiler is written in Java, the script requires a Java installation.
```

If you install this module globally via npm, you can call the `compile-dcl` CLI script from any shell. If you install it locally in a project, you can run it via `npx compile-dcl`.

#### compile-dcl
The script requires both a source and an output directory as parameter in addition to some optional parameters (see `compile-dcl --help`):

```
Usage: compile-dcl --dcl [DCL_SRC_ROOT_DIR] --output [DCN_OUTPUT_ROOT_DIR]

Options:
      --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
  -d, --dcl        path to DCL root directory                [string] [required]
  -o, --output     path to DCN output root directory         [string] [required]
  -l, --log-level  log level
                [string] [choices: "info", "error", "silent"] [default: "error"]
  -f, --failOn     fail on error, deprecation or warning
        [string] [choices: "error", "deprecation", "warning"] [default: "error"]

Examples:
  compile-dcl -d src/dcl -o build/dcn  compiles DCL in root directory src/dcl to
                                       DCN in output root directory build/dcn
```

We highly recommend the use of `--failOn warning` to not miss out on potential future deprecation warnings regarding the DCL syntax.

## Testing with a local DCL bundle

To test your application on the DCL bundle locally, follow these steps:

1. Compile the DCL bundle to DCN before running the application
1. Set environment variable `AMS_DCN_ROOT` to the DCN output root folder
1. Create a `data.json` file in which you assign policies to mock users
1. Run the application
1. In @sap/ams versions > 1.16, when creating a `PolicyDecisionPoint` without the new constructor argument for passing an explicit bundle loader, it will automatically load the bundle located at `AMS_DCN_ROOT` when its value has been set

Inside the `data.json` file in which you can mock policy assignments to users based on the SAP Identity Service `app_tid` (*tenant*) and `user_uuid` from the user's (mocked) `tokenInfo`.

```json
{
    "principal2policies": {
        "tenant1": {
            "user1": [
              "sales.readAllSalesOrders"
            ],
            "user2": [
              "sales.readAllSalesOrders",
              "sales.writeAllSalesOrders"
            ]
        },
        "tenant2": {
            "user1": [
              "sales.readAllSalesOrders",
              "sales.writeAllSalesOrders"
            ]
        }
    }
}
```

In your `package.json`, you could set-up the `pretest` and `posttest` lifecycle scripts to perform the necessary DCL compilation before the tests and cleanup the DCN output afterwards.
If you use a `data.json` for mock policy assignments, copy it to the DCN root folder after compilation.
Make sure to run the tests with the correct `AMS_DCN_ROOT`.

This is an example `package.json` for an application using *jest* as test framework but any other framework can be used:

```json
"config": {
  "dcn_root": "test/dcn"
},
"scripts": {
    "compile-dcl": "npx compile-dcl -d test/dcl -o $npm_package_config_dcn_root && cp test/dcl/data.json $npm_package_config_dcn_root/data.json",
    "pretest": "npm run compile-dcl",
    "jest": "AMS_DCN_ROOT=$npm_package_config_dcn_root jest", // or any other framework
    "test": "npm run jest",
    "posttest": "rm -rf $npm_package_config_dcn_root"
  }
```
