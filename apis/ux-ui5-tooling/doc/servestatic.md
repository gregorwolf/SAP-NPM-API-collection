# Middleware: Serve Static

The serve static middleware provides the capability to serve static UI5 resources. Hence you can serve UI5 resources locally from your machine.

**Pre-requisites:**
SAPUI5 SDK version is downloaded and extracted locally on the machine. One can download UI5 resources from https://tools.hana.ondemand.com/#sapui5

# Example Configuration
Executing `ui5 serve` in your project with the configuration below in a `ui5.yaml` file would serve the UI5 sources from your machine.

```
server:
  customMiddleware:
  - name: fiori-tools-servestatic
    afterMiddleware: compression
    mountPath: /resources|/test-resources
    configuration:
      path: "/Path/To/SAPUI5-SDK/"
```