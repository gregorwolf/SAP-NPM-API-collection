HTML5 Repo Mock
===============

HTML5 Repo Mock is a development web server that allows to run [Approuter][1] based 
application that intend to serve files from HTML5 Application Repository in non-CF 
environment (e.g personal workstation, docker or K8S) the very same way as it would
run in CF.

Form Approuter point of view, there is no difference between real HTML5 Repo and
it's mock. Both of them are business services that expose all relevant information
required by Approuter via service binding (available via `VCAP_SERVICES` environment
variable).

With HTML5 Repo Mock it is also possible to serve multiple HTML5 applications and
navigate between them.

HTML5 Repo Mock is capable to resolve HTML5 application default version, which allows
to access HTML5 applications without specifying the version.

## Getting Started

1. Download or clone current repository
2. Install dependencies `npm install`
3. Run `MOCK_DIR=test/applications node lib/index.js`
4. Open `http://localhost:5000/app/index.html`

## Usage

HTML5 Repo Mock main usage scenario is to enable preview of HTML5 modules of MTA without deploying it.
There are multiple development flows that HTML5 Repo Mock supports, and they are described in the 
following sub-sections. All flows below assume MTA project with at least Approuter and HTML5 module.

__package.json of Approuter application__
```json
{
  ...
  "devDependencies": {
    "html5-repo-mock": "*"    
  },
  "scripts": {
    ...
    "start-local": "node node_modules/@sap/html5-repo-mock/index.js"
  }
}
```

### Standalone

Developer created MTA project with Approuter and HTML5 module. There are no provisioned CF
services available yet. Developer would like to preview the UI only.

In this scenario HTML5 Repo Mock serves as both HTML5 Repo and XSUAA. It will start Approuter
with `VCAP_SERVICES` described in [Default VCAP_SERVICES](#default-vcap_services) section.
During startup, Approuter will call `http://localhost:5001/oauth/token` to obtain JWT of
HTML5 Repo Mock and will use it with all followup requests.

__Mock Token__

```json
{
  "access_token": "MOCK.ACCESS.TOKEN",
  "token_type": "bearer",
  "expires_in": 43199,
  "scope": "uaa.resource",
  "jti": "915f7795bf2f4ea5a77b138dc8a50709"
}
```

This scenario is good to start with, since it requires minimum effort, but is not suitable 
for cases where there are scope constraints defined on routes in `xs-app.json` and for 
cases where some HTML5 atrifacts are not part of the project (e.g. reuse libraries).
Consumption of business services and destination service subaccount level destinations
is also not possible using this approach.

### With XSUAA

In case developer would like to test behaviour of HTML5 application with real XSUAA, for example
to test error handling for users with not sufficient permissions, it is possible to define 
`VCAP_SERVICES` environment variable that contains XSUAA binding information. In this case
HTML5 Repo Mock will merge binding information of HTML5 Repo Mock into provided `VCAP_SERVICES`
and run Approuter with both of them. This allows to define routes with scope constraints in
`xs-app.json`

```json
{
  "routes": [{
      "source": "^(.*)$",
      "target": "$1",
      "service": "html5-apps-repo-rt",
      "scope": ["$XSAPPNAME.Read", "$XSAPPNAME.Write"]
  }]
}
```

Also providing XSUAA credentials allows to consume business services and subaccount level 
destinations, binding information of which should also be passed via `VCAP_SERVICES`.

```json
{
  "routes": [{
      "source": "^/dest/(.*)$",
      "target": "$1",
      "destination": "DESTINATION_NAME"
  }, {
      "source": "^(.*)$",
      "target": "$1",
      "service": "some-business-service",
      "endpoint": "v1"
  }]
}
```

Disadvantage of this approach is that it still does not allow to consume HTML5 applications
outside of the project (e.g. business service UIs).

### With Real HTML5 Repo

If HTML5 module depends on some reusable library, which is deployed to real HTML5 Repo, it
is required to use both: real HTML5 Repo and the HTML5 Repo Mock. To enable this scenario,
binding information of real HTML5 Repo may be defined in `VCAP_SERVICES` environment variable.
HTML5 Repo Mock will replace it with [Default VCAP_SERVICES](#default-vcap_services) before
running Approuter. In addition, it will fallback to real HTML5 Repo in case no matching HTML5 
application is found in local environment.

This approach allows to consume not only applications from current project, but also UIs of
business services and reuse libraries. This scenario may also be mixed with XSUAA.

### With Mock FLP

If there are multiple HTML5 applications it is beneficial to have a dashboard with links
pointing to each one of them. In production it is usually done with Portal Service (aka FLP).

HTML5 Repo Mock may provide similar capabilities by utilizing "Fiori Sandbox" environment, which
provides FLP-like experience and display tiles pointing to applications in local environment.

To enable FLP Mock, `--flp` flag should be passed as command line argument to HTML5 Repo Mock.

### With Relative URIs

If target platform to which HTML5 application will be deployed is not Cloud Foundry, it may be
required to set absolute paths (e.g. `/sap/opu/odata/snce/PO_S_SRV;v=2/`) in manifest.json data 
source URIs. This makes impossible to test these applications with HTML5 Repo Mock, because it 
will treat first segment of the data source path as application name. To solve the issue,
without modifying source code for testing purposes, the `--relative` flag is supported by HTML5
Repo Mock. Once it is set, HTML5 Repo Mock will remove leading slashes from all data source
URIs, when serving manifest.json files.

To enable relative URIs, `--relative` flag should be passed as command line argument to 
HTML5 Repo Mock.

### With Custom UI5 Configuration

In case some of SAP UI5 bootstrap configuration should be overridden, it is possible to specify
`--ui5` command line argument to the HTML5 Repo Mock in the following format:

```json
{"version": "1.72.0", "theme": "sap_belize"}
```

The `version` will be inserted before `/resources` in all URLs appearing in HTML file that have
the same origin as `<script id="sap-ui-bootstrap" ... >` tag.

All other keys of configuration object will be used to set attributes of UI5 bootstrap script,
prefixed with `data-sap-ui-`. For example `{"theme":"sap_hcb"}` will cause 
`<script id="sap-ui-bootstrap" data-sap-ui-theme="sap_hcb" ... >`.

### With Business Service For Login

In case of developing HTML5 applications that will be deployed to and consumed from some business
service (e.g. ABAP Steampunk), creating XSUAA instance for local development only is an overhead
which may be avoided by using `--login` command line argument followed by `sap.cloud.service` value.

For example, development of HTML5 application for ABAP Steampunk may be done by setting 
`VCAP_SERVICES` environment variable to include service key of the corresponding service

```javascript
{
  "abap": [{
    "credentials": { // <- service key goes here
        "sap.cloud.service": "com.sap.cloud.abap",
        ...
    },
    ...
  }]
 }
```

Then run HTML5 Repo Mock as 

```
node node_modules/@sap/html5-repo-mock/index.js --login com.sap.cloud.abap
```

### With Inject

If it is required to inject content in `.html` files, it is possible to provide `--inject` command
line argument followed by JSON array of objects or single object. Each object should contain `place`
property with one of the following values: `head-start`, `head-end`, `body-start` or  `body-end`.
In addition, object should have either `script` or `content` property. In case of `script`, the
`<script>` tag with corresponing URL will be injected to the place specified in `place` property.
In case of `content`, arbitrary content will be injected to the place specified in `place` property.

```shell script
node node_modules/@sap/html5-repo-mock/index.js --inject '{"place":"head-start", "script":"http://test.com/script.js"}'
```

```shell script
node node_modules/@sap/html5-repo-mock/index.js --inject '{"place":"body-end", "content":"<p>Footer</p>"}'
```

### With MIME Types

In case HTML5 application contains resource(s) with file extension that is required to be served
with custom value of `Content-Type` header, it is possible to pass `--mime-types` command line
argument followed with JSON that has file extension (without a dot) as key and corresponding
MIME Type (`Content-Type` header value) as value.

```shell script
node node_modules/@sap/html5-repo-mock/index.js --mime-types '{"my-ext":"application/x-my-ext"}'
```

## Configuration

HTML5 Repo Mock supports various configuration options via environment variables

| Environment variable | Default value                       | Description                                                                           |
|----------------------|-------------------------------------|---------------------------------------------------------------------------------------|
| PORT                 | 5000                                | TCP port of Approuter. Used for printing application URLs                             |
| MOCK_PORT            | 5001                                | TCP port of HTML5 Repo Mock                                                           |
| MOCK_DIR             | $PWD/..                             | Single or multiple directories in which HTML5 Repo Mock search for HTML5 applications |
| MOCK_LOOKUP_DIRS     | ["", "dist", "webapp"]              | Folders relative to `xs-app.json` from where to serve HTML5 assets                    |
| AR_BASE              | http://localhost:$PORT              | Approuter base URL. used for printing application URLs                                |
| SAP_UI_BOOTSTRAP_URL | https://sapui5.hana.ondemand.com    | Base URL form which SAP UI5 resources of FLP sandbox will be loaded                   |
| VCAP_SERVICES        | [See below](#default-vcap_services) | Service binding information that will be overridden and passed to Approuter           |
| API_KEY              | &lt;not set&gt;                     | Override manifest.json OData models to send `APIKey` header with given value          |

Use command line arguments to configure HTML5 Repo Mock

| Command line argument            | Default value   | Description                                                                                                                                                                                      |
|----------------------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--flp`                          | &lt;not set&gt; | If present, Approuter serves Fiori Sandbox at `/cp.portal/site`                                                                                                                                  |
| `--standalone <url>`             | &lt;not set&gt; | If present, changes welcome page of Approuter to `<url>`                                                                                                                                         | 
| `--relative`                     | &lt;not set&gt; | If present, remove leading slash in data source URIs of manifest.json files                                                                                                                      |
| `--destination`                  | &lt;not set&gt; | If present, HTML5 Repo Mock will mock destination service                                                                                                                                        |
| `--ui5 <json>`                   | &lt;not set&gt; | If present, HTML5 Repo Mock will rewrite UI5 configuration                                                                                                                                       |
| `--login <sap.cloud.service>`    | &lt;not set&gt; | If present, Approuter will use service with specified `sap.cloud.service` as XSUAA (for login)                                                                                                   |
| `--APIKey <key>`                 | &lt;not set&gt; | If present, HTML5 Repo Mock will override manifest.json OData models to send `APIKey` header. Have higher priority than `API_KEY` environment variable                                           |
| `--inject <json>`                | &lt;not set&gt; | If present, HTML5 Repo Mock will inject arbitrary HTML content or script with URL to specified place (supported places are `head-start`, `head-end`, `body-start`, `body-end`) in HTML files     |
| `--mime-types <json>`            | &lt;not set&gt; | If present, HTML5 Repo Mock will send `Content-Type` header for files with extension matching key (from provided JSON) equal to corresponding value                                              |

### Default VCAP_SERVICES

```json
{
  "html5-apps-repo": [
    {
      "binding_name": null,
      "credentials": {
        "grant_type": "client_credentials",
        "sap.cloud.service": "html5-apps-repo-rt",
        "uaa": {
          "clientid": "mock_client_id",
          "clientsecret": "mock_client_secret",
          "identityzone": "mock_idz",
          "identityzoneid": "mock_idz_id",
          "sburl": "http://localhost",
          "tenantid": "mock_tenant_id",
          "tenantmode": "dedicated",
          "uaadomain": "localhost:5001",
          "url": "http://localhost:5001",
          "verificationkey": "-----BEGIN PUBLIC KEY-----***-----END PUBLIC KEY-----",
          "xsappname": "mock_xsappname"
        },
        "uri": "http://localhost:5001",
        "vendor": "SAP"
      },
      "instance_name": "mock-html5-apps-repo",
      "label": "html5-apps-repo",
      "name": "mock-html5-apps-repo",
      "plan": "app-runtime",
      "provider": null,
      "syslog_drain_url": null,
      "tags": [
        "html5appsrepo",
        "html5-apps-repo-rt",
        "html5-apps-rt",
        "html5-apps-repo-dt",
        "html5-apps-dt"
      ],
      "volume_mounts": []
    }
  ]
}
```

[1]: https://www.npmjs.com/package/@sap/approuter
