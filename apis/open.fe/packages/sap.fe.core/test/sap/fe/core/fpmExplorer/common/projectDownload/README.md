## SAP Fiori Development Sample

This sample application has been downloaded from the [SAP Fiori development portal](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html##PAGEURL##).

## Disclaimer

This sample is for demonstration purposes of SAP Fiori elements for OData V4 features only. The usage of SAP Fiori elements and OData annotations is based on best practices. However, the OData service uses components such as the mock server, which are required for use in this sample without a backend system. While this is fine for testing purposes, it is not suitable for production use.

## Getting Started

### Prerequisites

-   Active NodeJS LTS (Long Term Support) version and associated supported NPM version (see https://nodejs.org)

### Starting the App

The sample runs locally on SAP [UI5 tooling](https://github.com/SAP/ui5-tooling), using the SAP Fiori [UI5 middleware for the Fiori elements mock server](https://github.com/SAP/open-ux-odata/tree/main/packages/ui5-middleware-fe-mockserver).

To launch the sample, run the following commands from the generated app root folder:

```bash
npm install
npm start
```

## Development and Sharing

### Making Changes

Once the app is running, you can modify the following files and see changes immediately reflected in your browser:

-   Service metadata
-   View files
-   Controller files

This provides a fast and efficient development workflow without the need for complex backend setups or installations.

### Sharing Your Work

You can export your modified project using the menu button in the portal and share it with others in two ways:

#### 1. Local Execution

Recipients can:

1. Download and extract the archive
2. Run `npm install` and `npm start`
3. View your changes locally on their machine

#### 2. Import into SAP Fiori Development Portal

The archive can be imported back into the [SAP Fiori development portal](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html) using the Import functionality. This allows others to view and experiment with your sample directly in their browser without any local installation or setup required, making it extremely convenient for:

-   Quick demonstrations
-   Learning and experimentation
-   Collaboration and knowledge sharing

### Important

The SAP Fiori development portal import feature only supports modifications to existing files within the original sample structure. If you add new extension files (such as custom controller extensions or additional fragments), the modified project can still be shared and run locally, but it cannot be imported back into the SAP Fiori development portal.

© Copyright 2009-##currentYear## SAP SE. All rights reserved.
