# @sap/ux-ui5-fe-mockserver-middleware

## Features

The **SAP Fiori - UI5 middleware for the Fiori elements mock server** is a middleware extension for the [UI5 Tooling](https://github.com/SAP/ui5-tooling). As an alternative to proxying OData requests to a live backend, it supports loading mock data for OData v2/v4 requests for supported Fiori elements templates. As the mock server runs locally without requiring a network connection to a backend system, it is useful for development and test scenarios.

## Installation

1. Get [Node.js](https://nodejs.org/en/download/)
2. Install the mockserver middleware
    ```sh
    npm install @sap/ux-ui5-fe-mockserver-middleware
    ```

## Usage

In order to use the mock server, the npm module `@sap/ux-ui5-fe-mockserver-middleware` needs to be added as devDependency and ui5.dependencies to `package.json`, and a valid `ui5.yaml` configuration needs to be provided.
**Entries in package.json**

```
[..]

"devDependencies": {
    "@sap/ux-ui5-fe-mockserver-middleware": "^1"
},
"ui5": {
    "dependencies": [
        "@sap/ux-ui5-fe-mockserver-middleware"
    ]
}

[..]
```

**Example for a yaml configuration file**

```

specVersion: '2.0'
metadata:
    name: <NAME>
type: application
server:
    customMiddleware:
        - name: sap-fe-mockserver
          mountPath: /
          afterMiddleware: compression
          configuration:
            annotations:
              localPath: './webapp/annotations/annotation.xml'
              urlPath: '/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/Annotations*'
            services:
              - urlPath: '/sap/opu/odata/sap/<SERVICE_NAME>'
              metadataXmlPath: './webapp/localService/metadata.xml'
              mockdataRootPath: './webapp/localService/data'
              - urlPath: '/sap/opu/odata/sap/<OTHER_SERVICE_NAME>'
              metadataXmlPath: './webapp/localService/other_metadata.xml'
              mockdataRootPath: './webapp/localService/data'

```

**Sample application**

See the usage in demo apps [SAP Fiori sample apps](https://github.com/SAP-samples/fiori-tools-samples)

## Support

Join the [SAP Fiori tools Community](https://community.sap.com/search/?by=updated&ct=blog&mt=73555000100800002345). Ask Questions, Read the Latest Blogs, Explore Content.
Please assign tag: _SAP Fiori tools_

To log an issue with SAP Fiori tools, please see [Contact SAP Support](https://help.sap.com/viewer/1bb01966b27a429ebf62fa2e45354fea/Latest/en-US).
