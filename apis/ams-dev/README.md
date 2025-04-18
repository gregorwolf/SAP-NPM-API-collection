<!-- This is the README for npmjs -->

# @sap/ams-dev

This module provides tooling support for extending applications which authenticate users via the [SAP Cloud Identity Services](https://help.sap.com/docs/identity-authentication?locale=en-US) with AMS (Authorization Management Service) [authorization checks](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies?locale=en-US).

The primary functionality provided by this module is enabling tests on local *DCL* (Data Control Language) bundles. To this end, it provides the `compile-dcl` script to produce *DCN* (Data Control Notation) files for the *ADC* (Authorization Decision Controller) used in `@sap/ams` versions >= 1.17.0.

## CAP integration

For [CAP](https://cap.cloud.sap/docs/guides/authorization) (Cloud Application Programming Model)  applications, the plugin integrates nicely into *mocked* auth and hybrid environments which allows developing local applications with AMS bound to SAP Identity service instances on SAP BTP. In both cases, it reacts to changes of DCL files. During *mocked* auth, it compiles them to DCN files. When using *ias* auth, it provides a feature to push the policies to the AMS server from the SAP Identity service binding.

For details, refer to the documentation of [@sap/ams](https://www.npmjs.com/package/@sap/ams).

## DCL compilation
This module provides a *bin* script called `compile-dcl` which compiles `.dcl` files to `.dcn` files which serve as input for running an application using AMS on the *DCL* bundle locally, e.g. for unit tests.

```markdown
 **Info:** As the DCL compiler is written in Java, the script requires a Java installation.
```

If you install this module globally via npm, you can call the `compile-dcl` CLI script from any shell. If you install it locally in a project, you can run it via `npx compile-dcl` (or `npx --package=@sap/ams-dev compile-dcl` to make 100% sure you are running the `compile-dcl` script from this module).

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

We recommend the use of `--failOn warning` to not miss out on potential future deprecation warnings regarding the DCL syntax.

## Testing with a local DCL bundle

To test your application with local DCL policy files and mocked policy assignments, follow these steps depending on the `@sap/ams` version of your project.

### @sap/ams 3.x

1. Compile the DCL bundle to DCN before running the application
1. Use **`AuthorizationManagementService#fromLocalDcn(dcnRoot, config)`** to create the `AuthorizationManagementService` singleton with the following `config`:
  - `dcnRoot` (string) the root directory of the DCN compilation.  
  - `config.assignments` (string | PolicyAssignments, optional) a path to a `PolicyAssignments` JSON file or an in-memory `PolicyAssignments` object.  

In `PolicyAssignments`, the assignments are based on the SAP Identity Service `app_tid` (*tenant*) and `scim_id` from the user's (mocked) token.

```json
{
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
```

In your `package.json`, you could set-up the `pretest` and `posttest` lifecycle scripts to perform the necessary DCL compilation before the tests and cleanup the DCN output afterwards.

This is an example `package.json` for an application using *jest* as test framework but any other framework can be used:

```json
"config": {
  "dcn_root": "test/dcn"
},
"scripts": {
    "pretest": "npx --package=@sap/ams-dev compile-dcl -d test/dcl -o $npm_package_config_dcn_root",
    "jest": "AMS_DCN_ROOT=$npm_package_config_dcn_root jest", // or any other framework
    "test": "npm run jest",
    "posttest": "rm -rf $npm_package_config_dcn_root"
  }
```

### @sap/ams 2.x

1. Compile the DCL bundle to DCN before running the application
1. Set environment variable `AMS_DCN_ROOT` to the DCN output root folder
1. Create a `data.json` file in which you assign policies to mock users
1. Run the application
1. In @sap/ams versions >= 1.17, when creating a `PolicyDecisionPoint` without the new constructor argument for passing an explicit bundle loader, it will automatically load the bundle located at `AMS_DCN_ROOT` when its value has been set

Inside the `data.json` file you can mock policy assignments to users based on the SAP Identity Service `app_tid` (*tenant*) and `scim_id` from the user's (mocked) token.

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
    "compile-dcl": "npx --package=@sap/ams-dev compile-dcl -d test/dcl -o $npm_package_config_dcn_root && cp test/dcl/data.json $npm_package_config_dcn_root/data.json",
    "pretest": "npm run compile-dcl",
    "jest": "AMS_DCN_ROOT=$npm_package_config_dcn_root jest", // or any other framework
    "test": "npm run jest",
    "posttest": "rm -rf $npm_package_config_dcn_root"
  }
```