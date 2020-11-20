# @sap/ux-ui5-tooling

The SAP Fiori tools - UI5 Tooling contains a selection of custom [middlewares](https://sap.github.io/ui5-tooling/pages/extensibility/CustomServerMiddleware/) that can be used with the command `ui5 serve` as well as custom [tasks](https://sap.github.io/ui5-tooling/pages/extensibility/CustomTasks/) that can be used with the command `ui5 build`. 
Furthermore, the module expose the cli `fiori` offering e.g. the [`fiori run`](#run) command is a wrapper of the `ui5 serve` commands and provides some additional parameters as well as `fiori add deploy-config` and `fiori add flp-config` to extend an existing project.

## **Middlewares**

SAP Fiori tools use the capabilities of custom middlewares to start and preview Fiori elements applications, e.g. to enable auto refresh, to switch the version of UI5 sources or to serve static resources.

### **1. Application Reload**

The application reload middleware allows developers to preview Fiori elements applications while developing/configuring them. Whenever a file relevant for Fiori elements is changed, the application reload middleware will refresh the application preview.

#### Example Configuration

Executing `npx fiori run` in your project with the configuration below in a `ui5.yaml` would start the application reload middleware with its default settings.

```
server:
  customMiddleware:
  - name: fiori-tools-appreload
    afterMiddleware: compression
```

#### Configuration options

The application reload middleware does not require any configuration parameters. However, there are optional parameters that can be used if the project structure differs from standard Fiori elements projects.

#### path

- `<string>` (default: `webapp`)
Path that is to be watched. By default the standard UI5 `webapp` folder is used

#### ext

- `<string>` (default: `html,js,json,xml,properties,change`)
Change this parameter to select a custom set of file extensions that are to be watched

#### port

- `<int>` (default: `35729`)
Port to be used to communicate file system changes

#### debug

- `<boolean>` (default: `false`)
Set this parameter to get more log information.

### **2. Proxy**

The proxy middleware provides you with the capabilities to connect to diffent back-end systems or to switch the UI5 version of the application.

### Configuration Examples

#### Connecting to a back-end system

Executing `npx fiori run` in your project with the configuration below in the `ui5.yaml` file would forward any request starting with the `path` parameter to the provided back-end `url`.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.backend.com:1234
```

If the back-end is hidden behind a destination then you can also provide the `destination` in the configuration.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.backend.com:1234
      destination: my_backend
```

You can also connect to multiple back-end systems like this.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /northwind
      url: https://my.backend_2.com:1234
    - path: /sap
      url: https://my.backend.com:1234
```

If you want to connect to an ABAP Environment on SAP Cloud Platform then you will need to set the optional property `scp` to `true`. For any other target, remove this property or set it to `false`.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.steampunk.com:1234
      scp: true
```

#### UI5

By using the proxy configuration one can also change the UI5 version, which is used to preview the application. With the application generation also the initial ui5 configuration for the proxy is created. It looks e.g. like this.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    ui5:
      path:
      - /resources
      - /test-resources
      url: https://sapui5.hana.ondemand.com
      version: 1.78.0
```

By using the `version` parameter one can choose the UI5 version which will used when `npx fiori run` is executed.

### **3. Serve Static**

The serve static middleware provides the capability to serve any static resources locally from your machine. E.g. you can serve UI5 locally or any other resources.


#### Example Configuration for serving locally UI5

**Pre-requisites:**
SAPUI5 SDK version is downloaded and extracted locally on the machine. One can download UI5 resources from <https://tools.hana.ondemand.com/#sapui5>

Executing `npx fiori run` in your project with the configuration below in a `ui5.yaml` file would serve the UI5 sources from your machine. Any request starting with the `path` parameter will be forwarded to the local path provided in the `src` parameter.

```
server:
  customMiddleware:
  - name: fiori-tools-servestatic
    afterMiddleware: compression
    configuration:
      paths:
        - path: /resources|/test-resources
          src: "Path/To/SAPUI5-SDK"
```

#### Example Configuration for serving any resources locally
Executing `npx fiori run` in your project with the configuration below in a `ui5.yaml` file would serve resources from your machine. Any request starting with the `path` parameter will be forwarded to the local path provided in the `src` parameter.

```
server:
  customMiddleware:
  - name: fiori-tools-servestatic
    afterMiddleware: compression
    configuration:
      paths:
        - path: /images
          src: "Path/To/images"
        - path: /libs
          src: "Path/To/libs"
```

## **Tasks**

SAP Fiori tools use the capabilities of custom tasks to deploy the Fiori elements projects to ABAP servers.

### Deployment to ABAP

The deployment to ABAP task allows deploying Fiori applications to SAP systems using the [SAPUI5 Repository OData service](https://sapui5.hana.ondemand.com/#/topic/a883327a82ef4cc792f3c1e7b7a48de8.html).

**Pre-requisites:**

* SAP component SAP_UI 7.53 or higher is installed in your SAP system
* Service needs to be enabled and accessible from your development environment ([how to check this](https://help.sap.com/viewer/68bf513362174d54b58cddec28794093/7.52.5/en-US/bb2bfe50645c741ae10000000a423f68.html))
* For operations on a SAPUI5 ABAP repository, you need the S_DEVELOP authorization.

**Limitations:**

* the task does not create ABAP transports, therefore, it requires an existing transport if the target ABAP package requires a transport
* only Basic Authentication (user/password based authentication) as well as OAuth2 with the SAP Cloud Platform

## Example Configuration

Executing `ui5 build --config ui5-deploy.yaml` in your project with the configuration below in a `ui5-deploy.yaml`, manually added to the project, would deploy all files of your `dist` folder except files ending with `.test.js` and the `internal.md` file. The target system is XYZ with client 200. Username and password for authentication will be read from the environment variables `XYZ_USER` and `XYZ_PASSWORD`.

Based on this example, the application will be created/updated as `/TEST/SAMPLE_APP` in package `/TEST/UPLOAD` and all changes will be recorded in transport request `XYZQ300582`.

Content of `ui5-deploy.yaml`

```
builder:
  customTasks:
  - name: deploy-to-abap
    afterTask: replaceVersion
    configuration:
      target:
        url: https://XYZ.sap-system.corp:44311
        client: 200
        auth: basic
      credentials:
        username: env:XYZ_USER
        password: env:XYZ_PASSWORD
      app:
        name: /TEST/SAMPLE_APP
        package: /TEST/UPLOAD
        transport: XYZQ300582
      exclude:
      - .*\.test.js
      - internal.md
```

### Command to create the ui5-deploy.yaml file

A newly created project does not contain a deployment configuration (`ui5-deploy.yaml`) but you can create it by executing `npx fiori add deploy-config`. You will be prompted for required information and then the file will be created based on your input and the content of the existing `ui5.yaml` file used for the preview. In addition to creating the configuration, the create deployment command will also update your `package.json` so that you can execute `npm run deploy` afterwards to deploy your application.

### Setting environment variables in a .env file

If you prefer to keep the environment variables in a file, an option can be to create ```.env``` file at the root of your project which contains the environment variables that can be referenced in the ui5.yaml file.

IMPORTANT: The username and password property will **only** accept environment variable references in the ```ui5-deploy.yaml```.

```
XYZ_USER=[MY_USER_NAME]
XYZ_PASSWORD=[MY_PASSWORD]
```

## Command to deploy

After completing the changes in the configuration files, execute the command `npm run deploy`. The deployment task is by default interactive and requires that the user confirms the deploy configuration. If such a confirmation is not required or desired then it can be disable by adding `-- -y` to the `deploy` script e.g. `ui5 build preload --config ui5-deploy.yaml -- -y`

### Accessing the deployed app

Based on the sample configurations above, after deploying the app, you can access the app using URL: <https://XYZ.sap-system.corp:44311/sap/bc/ui5-ui5/test/sample_app/index.html?sap-client=200#app-preview>

## Documentation on the Configuration options

In addition to defining parameters in the main yaml file, every parameter can also be defined as environment variable that is referenced in yaml. Using the `dotenv` module, the task also supports project specific environment variables defined in a `.env` file in the root of your project. To reference an environment variable the pattern `env:VAR_NAME` must be used.

### target

The target object contains properties identifying your target SAP system.

#### url

- `<string> pattern <protocol>://<hostname>[:<port>]` (required)
- This parameter must contain a url pointing to your target SAP system

#### client

- `<number> range [0..999]` (optional)
- The client property is used to identify the SAP client that is to be used in the backend system. It translates to the url parameter `sap-client=<client>` If the client parameter is not provide, the default client will be used.

#### scp

- `<boolean>` (default: `false`)
- By default the deployment task will use basic authentication when connecting to the backend. If the target system is ABAP Environment on SAP Cloud Platform, this parameter needs to be set to `true`.

#### service

- `<string>` (default: `/sap/opu/odata/UI5/ABAP_REPOSITORY_SRV`)
- Path pointing to the SAPUI5 ABAP repository OData service in your target system. This parameter only needs to be used if the service is exposed at a different path in your backend system e.g. via alias.

### credentials (optional)

The credentials object is mainly required for CI/CD based deployments and it needs to contain the required parameters to authenticate at your target system. It is only possible to use references to environment variables e.g. `env:MY_VARIABLE` here, plain username and password are not supported.

For local usage, we recommend to not use the credentials object at all. As result, the deployment task will utilize the operating systems secure storage maintain credentials.

#### username

- `<string>` (required)
- SAP business user for the target system. The user requires authorizations to create/update the target ABAP development object.

#### password

- `<string>` (required)
- Password required to authenticate the previously configured user. IMPORTANT: while technically possible to add the password to your config, we strongly DISCOURAGE that but recommend instead the use of environment variables.

### app

The app object describes the backend object that is created/updated as result of the deployment.

#### name

- `<string>` (required)
- Unique name of the application. The name is used as part of the application url as well as the name of the ABAP development object used as container for the app.

#### package

- `<string>` (required for new apps)
- Name of an existing ABAP package that is used as parent of the deployed application. The parameter is required for the creation of the application in the backend. Any following deployment updating the application does not require the package parameter, i.e. it will be ignored.

#### transport

- `<string>` (optional)
- The transport parameter refers to a transport request number that is to be used to record changes to the backend application object. The property is optional because it is only required if the package that is used for deployments requires transport requests.

#### description

- `<string>` (optional)
- Optional description added to the created application object in the backend.

### exclude

- `<string[] array of regex>` (optional)
- By default the deployment task will create an archive (zip file) of all build files and send it to the backend. By using exclude, you can define expressions to match files that shall not be included into the deployment. Note: `string.match()` is used to evaluate the expressions.

### index

- `true|false` (default: `false`)
- If set to `true`, then an additional index.html will be generated and deployed to run the application standalone.

### test

- `true|false` (default: `false`)
- If set to `true`, the task will run through all steps including sending the archive to the SAP backend. The backend will not deploy the app but run the pre-deployment checklist and return the result.

## Commands
### fiori run - starts a local web server for running a FE application
#### Options

* `--config, c` - Path to config file (default: `ui5.yaml` in root folder of the project).
* `--verbose` - Enable verbose logging (default: `false`).
* `--port, -p` - Port to start the server on (default for HTTP: 8080, HTTPS: 8443).
* `--open, -o` - Open web server root directory in default browser. Optionally, supplied relative path will be appended to the root URL.
* `--https` - Enables HTTPS over the HTTP/2 protocol for the web server (default: `false`).
* `--key` - Path to the private key for https (default: `"$HOME/.ui5/server/server.key"`).
* `--cert` - Path to the certificate for https (default: `"$HOME/.ui5/server/server.crt"`).
* `--ui5` - UI5 version to use when running the application (default: version from `ui5.yaml`).
* `--ui5Uri` - UI5 uri to load the UI5 resources from (default: uri from `ui5.yaml`).
* `--proxy` - specify proxy configuration, e.g. `https://myproxy:8443` (default: uses host machine proxy configuration, if any).

### fiori add deploy-config - adds a deployment configuration to the project

The command allows adding a deployment configuration to the project. The command supports the generation of a configuration for deployment to an ABAP system or to a Cloud Foundry space.

#### Deployment to ABAP 
If `ABAP` is chosen as target then the CLI will prompt the required information to generate a `ui5-deploy.yaml` required for the `deploy-to-abap` task.

#### Deployment to Cloud Foundry (CF)
For the deployment to CF, an MTA configuration will be created. The command allows to create a new configuration i.e. a new `mta.yaml` file or updates an existing `mta.yaml` with the information required for deployment. After successfully creating the configuration, running `npm run build` in the MTA directory that contains the application will try to build a deployable mtar file that can then be deployed to CF with `npm run deploy`.

**Pre-requisites:**

* Availablity of the [`mta`](https://github.com/SAP/cloud-mta) executable in the path.
Use `npm i -g mta` to install globally
* Availability of Cloud Foundry CLI tools. Installation instructions: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html
* Availability of CF multiapps plugin. Installation instructions: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/27f3af39c2584d4ea8c15ba8c282fd75.html
* A correctly configured destination to the backend system
* User authorization on CF to deploy

#### Artifacts & configuration created

Running the command/task, results in a directory structure that looks like this:
```
mta_directory
|_ application_directory
   |_ ...
   |_ webapp
      |_ ...
      |_ manifest.json
   |_ ui5.yaml
|_ cf
   |_ deployer
   |_ router
   |_ flp (optional)
...
|_ package.json
|_ mta.yaml
```
#### Information required to generate the configuration
##### Location of MTA Directory
The tool finds the nearest parent directory that contains a `mta.yaml` and offers that as the MTA directory. Failing that, it defaults to the parent directory of the application.

##### Destination
Destination configured to connect to the backend on Cloud Foundry. If there's a setting in `ui5.yaml`, that value is offered as the default.

##### Prefix
Prefix used for the ID of the MTA and the service names. It defaults to the namespace of the app. If a namespace is not found, it defaults to `test`. Please choose a prefix so that the service names are unique to your MTA. Otherwise deployment by multiple people will overwrite the same service.

At the end of the generation, it's possible to optionally generate Fiori Launch Pad configuration (default: no).

### fiori add flp-config - Fiori Launchpad configuration generation
It's possible to create configuration and artifacts required to run the application in an SAP Fiori Launchpad. Depending on the target, the command will update either only the application `manifest.json` with the required inbound navigation property, or will also enhance the MTA configuration to contain a standalone FLP on CF.

### fiori deploy - performs the deployment of the application into an ABAP system
Deploys an application to an ABAP frontend server.

#### Options

* `--config, c` - Path to config file (default: `ui5-deploy.yaml` in root folder of the project).
* `--noConfig` - Only CLI arguments will be used, no config file is read.
* `--destination, -d` - The destination used in SAP Business Application Studio (default: destination from `ui5-deploy.yaml`).
* `--url, -u` - The url of the service endpoint at the ABAP system (default: url from `ui5-deploy.yaml`).
* `--username` - Name of environment variable containing a username to authenticate (default: username from `ui5-deploy.yaml`).
* `--password` - Name of environment variable containing a password to authenticate (default: password from `ui5-deploy.yaml`).
* `--client, -l` - The ABAP client (default: client from `ui5-deploy.yaml`).
* `--transport, -t` - The id of the transport request (default: transport from `ui5-deploy.yaml`).
* `--name, -n` - The application name (default: name from `ui5-deploy.yaml`).
* `--package, -p` - The ABAP package (default: package from `ui5-deploy.yaml`).
* `--description, -e` - The application description (default: description from `ui5-deploy.yaml`).
* `--yes, -y` - Deploy without asking for confirmation.
* `--failfast, -f` - Throw an error if something goes wrong and exit with a return code != 0.


## FAQ

**My backend system contains the SAP_UI component version 7.53 or newer, but the SAPUI5 repository service cannot be reached.**

*A: Please check if the service has been activated. More information at <https://help.sap.com/viewer/68bf513362174d54b58cddec28794093/7.52.5/en-US/bb2bfe50645c741ae10000000a423f68.html.>*

**The SAPUI5 repository service is active and reachable but whenever I deploy an application I see the following error "Request failed with status code 400".**

This could have multiple reasons, please check the console for more information or open transaction `/IWFND/ERROR_LOG` and check the server logs. A common issue is that during the setup, configuring a virus scan profile has been forgotten. This can be corrected in transaction `/IWFND/VIRUS_SCAN`.
