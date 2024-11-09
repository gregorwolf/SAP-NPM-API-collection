<!-- This is the README for npmjs -->

# @sap/ams-dev

This module provides tooling support for extending applications which authenticate users via the [SAP Cloud Identity Services](https://help.sap.com/docs/identity-authentication?locale=en-US) with AMS (Authorization Management Service) [authorization checks](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies?locale=en-US).

For non-CAP applications, the primary functionality provided by this module is enabling tests on local *DCL* (Data Control Language) bundles. To this end, it provides the `compile-dcl` script to produce *DCN* (Data Control Notation) files for the *ADC* (Authorization Decision Controller) in `@sap/ams` versions >= 1.17.0.

Furthermore, it provides the [deploy-dcl](#deploy-dcl-1) script which deploys a DCL bundle to the AMS server.

## CAP integration

For [CAP](https://cap.cloud.sap/docs/guides/authorization) (Cloud Application Programming Model)  applications, this module provides an *AMS* dev-time cds plugin that provides a [custom build task](https://cap.cloud.sap/docs/guides/deployment/custom-builds#custom-build-plugins) for DCL compilation that is called *ams*. It is integrated into both *cds watch* and *cds build*. Furthermore, the plugin integrates nicely into *mocked* auth and hybrid environments which allows developing local applications with AMS bound to SAP Identity service instances on SAP BTP.

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

We highly recommend the use of `--failOn warning` to not miss out on potential future deprecation warnings regarding the DCL syntax.

## Testing with a local DCL bundle

To test your application on the DCL bundle locally, follow these steps:

1. Compile the DCL bundle to DCN before running the application
1. Set environment variable `AMS_DCN_ROOT` to the DCN output root folder
1. Create a `data.json` file in which you assign policies to mock users
1. Run the application
1. In @sap/ams versions >= 1.17, when creating a `PolicyDecisionPoint` without the new constructor argument for passing an explicit bundle loader, it will automatically load the bundle located at `AMS_DCN_ROOT` when its value has been set

Inside the `data.json` file you can mock policy assignments to users based on the SAP Identity Service `app_tid` (*tenant*) and `user_uuid` from the user's (mocked) `tokenInfo`.

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

## Deploy DCL

The DCL bundle is typically deployed together with the application to ensure the application's authorization checks are always done with the most current set of policies.

### DCL Deployer Application
The recommended way to deploy DCL, is by deploying a minimal Node.js\* application along with your application that contains the DCL bundle and has a service binding to the target SAP Identity Service instance.

This module provides a ready-to-use [package.json](./ams-dcl-content-deployer/package.json) for such an application:

```js 
{
  "name": "ams-dcl-content-deployer",
  "version": "1.0.0",
  "dependencies": {
    "@sap/ams-dev": "^1"
  },
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "start": "npx --package=@sap/ams-dev deploy-dcl"
  }
}
```

It expects to find the DCL bundle in a folder called `dcl` next to the package.json. As you can see, the application's start script simply calls the [deploy-dcl](#deploy-dcl-1) script of this module. Afterwards, it exits with exit code 0 (*success*) or 1 (*error*).

\* *A Node.js installation is not required during development, so this method also works nicely for applications written in other languages such as Java.*

#### Building the DCL Deployer Application
1. Create a new folder for the Deployer application with the ready-to-use [package.json](./ams-dcl-content-deployer/package.json).
2. Extend your build script to copy your DCL root folder to the `dcl` folder of your Deployer application

#### Deploying the DCL Deployer Application
It depends on the target platform and deployment method how best to deploy the DCL Deployer Application alongside your application.
Below is a list of templates for the most common scenarios.

Make sure to always bind the DCL deployer to the Identity service instance with a **certificate-based** service binding because this is required by the AMS server for authentication.


<details><summary>MTA</summary>

\
The following entry defines a module that registers and executes a CF task to deploy the DCL bundle and shuts down on success to free resources.

mta.yaml
```yaml
modules:
  # ...

  # -----------------------------------------------------------------------------------
  # AMS Policies Content Deployer App
  # -----------------------------------------------------------------------------------
  - name: {{appName}}-ams-policies-deployer
      type: javascript.nodejs
      path: {{dclDeployerAppFolder}}
      parameters:
        buildpack: nodejs_buildpack
        no-route: true
        no-start: true
        tasks:
          - name: deploy-dcl
            command: npm start
            memory: 512M
      requires:
        - name: {{identityServiceInstanceName}}
          parameters:
            config:
              credential-type: X509_GENERATED
              app-identifier: {{appName}}
      env:
        AMS_APP_NAME: {{appName}}-ams-policies-deployer
```
</details>



<details><summary>CF Manifest</summary>

\
Unlike MTAs, CF manifests do not support the execution of CF tasks and CF considers applications as crashed, even when their process exits with status code 0. For this reason, the deployer application needs to idle and be manually stopped after the DCL deployment. It will report about success or failure in its logs.

manifest.yml
```yaml
applications:
  # ...

  # -----------------------------------------------------------------------------------
  # AMS Policies Content Deployer App
  # -----------------------------------------------------------------------------------
  - name: {{appName}}-ams-policies-deployer
    path: {{dclDeployerAppFolder}}
    no-route: true
    health-check-type: none
    memory: 256M
    instances: 1
    buildpack: nodejs_buildpack
    command: (npm start && echo "This application may now be stopped to free resources." || echo "AMS Policy Deployment unsuccessful.") && sleep infinity
    services:
      - name: {{identityServiceInstanceName}}
        parameters:
          credential-type: X509_GENERATED
          app-identifier: {{appName}}
    env:
      AMS_APP_NAME: {{appName}}-ams-policies-deployer
```
</details>



<details><summary>Unified Runtime Helm Charts</summary>
Build and deploy an image from your Application deployer and replace {{YourAmsDclDeployerImage}} below with its URL.

\
Charts.yaml
```yml
dependencies:
    # ...

  - name: content-deployment
    alias: ams-policies-deployer
    version: ">0.0.0"
```

values.yaml
```yml
# ...

ams-policies-deployer:
    image:
        repository: {{YourAmsDclDeployerImage}}
    bindings:
        identity:
            serviceInstanceName: {{identityServiceInstanceName}}
            parameters:
                credential-type: X509_GENERATED
                app-identifier: {{appName}}
    env:
        AMS_APP_NAME: {{appName}}-ams-policies-deployer
```
</details>



<details><summary>Kubernetes Job</summary>
Build and deploy an image from your Application deployer and replace {{YourAmsDclDeployerImage}} below with its URL.

\
ams-dcl-deployer.yml
```yml
apiVersion: batch/v1
kind: Job
metadata:
  name: {{appName}}-ams-policies-deployer
spec:
  completions: 1
  parallelism: 1
  ttlSecondsAfterFinished: 1209600
  template:
    spec:
      imagePullSecrets:
        - name: {{imagePullSecret}}
      containers:
      - image: {{YourAmsDclDeployerImage}}
        name: ams-policies-deployer
        env:
        - name: SERVICE_BINDING_ROOT
          value: /bindings
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          runAsNonRoot: true
          readOnlyRootFilesystem: false
        volumeMounts:        
        - mountPath: /bindings/identity/
          name: identity-binding
          readOnly: true
      restartPolicy: OnFailure
      volumes:      
      - name: identity-binding
        secret:
          secretName: {{certBasedIdentityBinding}}
```
</details>

### deploy-dcl

The script pushes a DCL bundle (including schema.dcl, DCL root package and all subpackages) to the Identity Service instance from the environment (see `deploy-dcl --help`):

```
Usage: deploy-dcl -d [DCL_ROOT_DIR] -c [CREDENTIALS_FILE] -n [DEPLOYER_APP_NAME]

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -d, --dcl          [optional] path to the directory that contains the DCL root
                     package. If a path is provided via environment variable
                     AMS_DCL_ROOT, it overrides this option.
                                                       [string] [default: "dcl"]
  -c, --credentials  [optional] path to a JSON file containing the credentials
                     object of an Identity Service binding. If omitted, will try
                     to find and use an Identity Service binding from the
                     process environment.                               [string]
  -n, --name         [optional] a descriptive name of this deployer application
                     to trace back the currently deployed DCL bundle on the AMS
                     server to its source when DCL is deployed from more than
                     one source. If a name is provided directly via environment
                     variable AMS_APP_NAME or indirectly as application_name via
                     VCAP_APPLICATION on Cloud Foundry, it overrides this
                     option.       [string] [default: "@sap/ams-dev:deploy-dcl"]

Examples:
  deploy-dcl                                Pushes the DCL content in ./dcl
                                            (including schema.dcl, DCL root
                                            package and all subpackages) to the
                                            identity service instance from the
                                            environment.
  deploy-dcl -d src/dcl -c config/ias.json  Pushes the DCL content from
  -n bookshop-dcl-deployer                  ./src/dcl using the Identity Service
                                            credentials in ./config/ias.json.
                                            The deployer app name for this
                                            upload will be set to
                                            "bookshop-dcl-deployer" to be able
                                            to trace back the upload source to
                                            this deployer.
```