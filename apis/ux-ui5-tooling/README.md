# @sap/ux-ui5-tooling

The SAP Fiori tools - UI5 Tooling contains a selection of custom [middlewares](https://sap.github.io/ui5-tooling/pages/extensibility/CustomServerMiddleware/) that can be used with the command `ui5 serve` as well as custom [tasks](https://sap.github.io/ui5-tooling/pages/extensibility/CustomTasks/) that can be used with the command `ui5 build`. 
Furthermore, the module expose the cli `fiori` offering e.g. the [`fiori run`](#run) command is a wrapper of the `ui5 serve` commands and provides some additional parameters as well as `fiori add deploy-config` and `fiori add flp-config` to extend an existing project.

## [**Middlewares**](#middlewares)

SAP Fiori tools use the capabilities of custom middlewares to start and preview SAP Fiori elements or SAPUI5 freestyle applications, e.g. to enable auto refresh, to switch the version of SAPUI5 sources or to serve static resources. Starting with version `1.3.0` the behaviour of the preview of the SAP Fiori applications has changed. Now the persistent iAppState is ignored in order to have the source code changes always apply when application is refreshed. If you want to enable the iAppState then you need to add the URL parameter `fiori-tools-iapp-state=true` to the browser URL, e.g. `http://localhost:8080/test/flpSandbox.html?fiori-tools-iapp-state=true#masterDetail-display`.

### [**1. Application Reload**](#1-application-reload)

The application reload middleware allows developers to preview SAP Fiori applications while developing/configuring them. Whenever a file relevant for the SAP Fiori application is changed, the reload middleware will refresh the application preview.

#### Example Configuration

Executing `npx fiori run` in your project with the configuration below in a `ui5.yaml` would start the application reload middleware with its default settings.

```
server:
  customMiddleware:
  - name: fiori-tools-appreload
    afterMiddleware: compression
```

#### Configuration options

The application reload middleware does not require any configuration parameters. However, there are optional parameters that can be used if the project structure differs from standard SAP Fiori projects.

#### path

- `<string>` (default: `webapp`)
Path that is to be watched. By default the standard SAPUI5 `webapp` folder is used

#### ext

- `<string>` (default: `html,js,json,xml,properties,change`)
Change this parameter to select a custom set of file extensions that are to be watched

#### port

- `<int>` (default: `35729`)
Port to be used to communicate file system changes

#### debug

- `<boolean>` (default: `false`)
Set this parameter to get more log information.

### [**2. Proxy**](#2-proxy)

The proxy middleware provides you with the capabilities to connect to diffent back-end systems or to switch the SAPUI5 version of the application. The proxy is based on the [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware).

### Configuration Examples

#### [Connecting to a back-end system](#connecting-to-a-back-end-system)

Executing `npx fiori run` in your project with the configuration below in the `ui5.yaml` file would forward any request starting with the `path` parameter to the provided back-end `url`.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.backend.com:1234
```

#### [Connecting to a back-end system with destination](#connecting-to-a-back-end-system-with-destination)

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
#### [Connecting to a back-end system with destination and principal propagation](#connecting-to-a-back-end-system-with-destination-and-principal-propagation)

If the back-end destination is configured to use principal propagation, then in some cases the requests might fail. If this occurs then you will need to set the optional property `xfwd` to `true`. This will add the x-forwared headers to the proxy requests.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.backend.com:1234
      destination: my_backend
      xfwd: true
```
#### [Connecting to multiple back-end systems](#connecting-to-multiple-back-end-systems)
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
#### [Connecting to the SAP Business Technology Platform](#connecting-to-the-sap-business-technology-platform)
If you want to connect to an ABAP Environment on SAP Business Technology Platform then you will need to set the optional property `scp` to `true`. For any other target, remove this property or set it to `false`.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.steampunk.com:1234
      scp: true
```

#### [Connecting to the SAP API Business Hub](#connecting-to-the-sap-api-business-hub)
If you want to connect to the SAP API Business Hub then you will need to set the optional property `apiHub` to `true`, and set the corresponding `path` and `url`, e.g.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /s4hanacloud
      url: https://api.sap.com
      apiHub: true
```
#### [Proxying WebSockets](#proxying-websockets)
If you want the proxy to handle also WebSockets, then you need to set the optional property `ws` to `true`, e.g.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.backend.com:1234
      ws: true
```

#### [Changing the path to which a request is proxied](#changing-the-path-to-which-a-request-is-proxied)
Let's that you want to configure the proxy to send requests from a certain path `/services/odata` to a destination with a specified entry path `/my/entry/path`. Then you need to do the following:

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /services/odata
      pathPrefix: /my/entry/path
      url: https://my.backend.com:1234
      destination: my_backend
```

#### [Providing Proxy Configuration](#providing-proxy-configuration)
By the default the `fiori-tools-proxy` will read the proxy configuration from the Node.js environment variables `proxy`, `https-proxy` and `noproxy`. If those variables are not set, then you can also provide the proxy configuration in the `ui5.yaml` file. **Please note: if you want to exclude any domains from the proxy then you will need to set the `noproxy` variable, e.g. `npm config set noproxy "sap.com"`**.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    proxy: https://myproxy.com:8443
    backend:
    - path: /sap
      url: https://my.backend.com:1234

```

#### [UI5](#ui5)

By using the proxy configuration one can also change the SAPUI5 version, which is used to preview the application. With the application generation also the initial ui5 configuration for the proxy is created. It looks e.g. like this.

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

By using the `version` parameter one can choose the SAPUI5 version which will used when `npx fiori run` is executed.

**Note:** all UI5 requests are routed through the proxy. Sometimes this can cause performance issues. If you don't want route the UI5 requests through the proxy, then you can set parameter `directLoad: true`. This will inject the UI5 url in the HTML file of the application and thus the UI5 libs will be loaded directly.

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
      directLoad: true
```

### [**3. Serve Static**](#3-serve-static)

The serve static middleware provides the capability to serve any static resources locally from your machine. E.g. you can serve SAPUI5 locally or any other resources.


#### [Example Configuration for serving locally SAPUI5](#example-configuration-for-serving-locally-ui5)

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
        - path: /resources
          src: "Path/To/SAPUI5-SDK"
        - path: /test-resources
          src: "Path/To/SAPUI5-SDK"
```

#### [Example Configuration for serving any resources locally](#example-configuration-for-serving-any-resources-locally)
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

### Configuration options

- **`fallthrough`** (default: true) - client errors fall-through as just unhandled requests, otherwise forward a client error. E.g. If set to true, then the `fiori-tools-servestatic` middleware will not return 404 error, when it can't find a file on the local system, but it will simply pass the request to the next available middleware. Otherwise 404 error will be returned.

```
server:
  customMiddleware:
  - name: fiori-tools-servestatic
    afterMiddleware: compression
    configuration:
      paths:
        - path: /libs
          src: "Path/To/libs"
          fallthrough: false
```

## [**Tasks**](#tasks)

SAP Fiori tools use the capabilities of custom tasks to deploy the SAP Fiori projects to ABAP servers.

### [Deployment to ABAP](#deployment-to-abap)

The deployment to ABAP task allows deploying SAP Fiori applications to SAP systems using the [SAPUI5 Repository OData service](https://sapui5.hana.ondemand.com/#/topic/a883327a82ef4cc792f3c1e7b7a48de8.html).

**Pre-requisites:**

* SAP component SAP_UI 7.53 or higher is installed in your SAP system
* Service needs to be enabled and accessible from your development environment ([how to check this](https://help.sap.com/viewer/68bf513362174d54b58cddec28794093/7.52.5/en-US/bb2bfe50645c741ae10000000a423f68.html))
* For operations on a SAPUI5 ABAP repository, you need the S_DEVELOP authorization.

**Notes:**

* the task does not create ABAP transports, therefore, it requires an existing transport if the target ABAP package requires a transport
* only Basic Authentication (user/password based authentication) as well as OAuth2 with the SAP Business Technology Platform

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
- By default the deployment task will use basic authentication when connecting to the backend. If the target system is ABAP Environment on SAP Business Technology Platform, this parameter needs to be set to `true`.

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

## [Commands](#commands)
### [fiori run](#fiori-run---starts-a-local-web-server-for-running-a-fe-application) - starts a local web server for running a FE application
#### Options

* `--config, c` - Path to config file (default: `ui5.yaml` in root folder of the project).
* `--verbose` - Enable verbose logging (default: `false`).
* `--port, -p` - Port to start the server on (default for HTTP: 8080, HTTPS: 8443).
* `--open, -o` - Open web server root directory in default browser. Optionally, supplied relative path will be appended to the root URL.
* `--https` - Enables HTTPS over the HTTP/2 protocol for the web server (default: `false`). If you provide the `--https` parameter, but you do not provide the `--key` and `--cert` parameters, then a private key and certificate will be created automatically. **Note: For the automatic key and certificate generation, you need to have OpenSSL installed on your OS. Using HTTPS over HTTP/2 is currently not supported in SAP Business Application Studio.**
* `--key` - Path to the private key for https (default: `"$HOME/.ui5/server/server.key"`).
* `--cert` - Path to the certificate for https (default: `"$HOME/.ui5/server/server.crt"`).
* `--ui5` - UI5 version to use when running the application (default: version from `ui5.yaml`).
* `--ui5Uri` - UI5 uri to load the UI5 resources from (default: uri from `ui5.yaml`).
* `--proxy` - specify proxy configuration, e.g. `https://myproxy:8443` (default: uses host machine proxy configuration, if any).

### [fiori add deploy-config](#fiori-add-deploy-config---adds-a-deployment-configuration-to-the-project) - adds a deployment configuration to the project

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

At the end of the generation, it's possible to optionally generate  SAP Fiori launchpad configuration (default: no).

### [fiori add flp-config](#fiori-add-flp-config---fiori-launchpad-configuration-generation) - Fiori Launchpad configuration generation
It's possible to create configuration and artifacts required to run the application in an SAP Fiori launchpad. Depending on the target, the command will update either only the application `manifest.json` with the required inbound navigation property, or will also enhance the MTA configuration to contain a standalone FLP on CF.

### [fiori deploy](#fiori-deploy---performs-the-deployment-of-the-application-into-an-abap-system) - performs the deployment of the application into an ABAP system
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


## [FAQ](#faq)

**My backend system contains the SAP_UI component version 7.53 or newer, but the SAPUI5 repository service cannot be reached.**

*A: Please check if the service has been activated. More information at <https://help.sap.com/viewer/68bf513362174d54b58cddec28794093/7.52.5/en-US/bb2bfe50645c741ae10000000a423f68.html.>*

**The SAPUI5 repository service is active and reachable but whenever I deploy an application I see the following error "Request failed with status code 400".**

This could have multiple reasons, please check the console for more information or open transaction `/IWFND/ERROR_LOG` and check the server logs. A common issue is that during the setup, configuring a virus scan profile has been forgotten. This can be corrected in transaction `/IWFND/VIRUS_SCAN`.

**SSL certificate creation and installation fails with: `Unable to find openssl - please make sure it is installed and available in your PATH`.**

Most probably the `OpenSSL` package is not installed on your OS. Please install it and make sure that it is available in your `PATH` environment variable.

## [Support](#support)

Join the [SAP Fiori tools Community](https://community.sap.com/search/?by=updated&ct=blog&mt=73555000100800002345). Ask Questions, Read the Latest Blogs, Explore Content.  
Please assign tag: _SAP Fiori tools_.

To log an issue with SAP Fiori tools, please see [Contact SAP Support](https://help.sap.com/viewer/1bb01966b27a429ebf62fa2e45354fea/Latest/en-US).

## [Documentation](#documentation) 

- Visit **SAP Help Portal** for [SAP Fiori tools](https://help.sap.com/viewer/product/SAP_FIORI_tools/Latest/en-US) documentation. 

## [License](#license)

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
