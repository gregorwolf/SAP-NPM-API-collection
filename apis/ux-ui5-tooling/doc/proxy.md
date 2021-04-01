# Middleware: Proxy

The proxy middleware provides you with the capabilities to connect to diffent back-end systems or to switch the UI5 version of the application.

# Configuration Examples

## Connecting to a back-end system
Executing `ui5 serve` in your project with the configuration below in the `ui5.yaml` file would forward any request starting with the `path` parameter to the provided back-end `url`.

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
If you want to connect to a `Steampunk` back-end then you will need to provide the following configuration.

```
- name: fiori-tools-proxy
  afterMiddleware: compression
  configuration:
    backend:
    - path: /sap
      url: https://my.steampunk.com:1234
      scp: true
```

## UI5
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
By using the `version` parameter one can choose the UI5 version which will used when `ui5 serve` is executed.
