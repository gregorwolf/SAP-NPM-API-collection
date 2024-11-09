# Adaptation Project Yeoman Sub-Generators

For more information about using this package in SAP Business Application Studio, see [Extending SAP Fiori Applications](https://help.sap.com/docs/bas/developing-sap-fiori-app-in-sap-business-application-studio/extending-sap-fiori-application?locale=en-US).  
For more information about using this package in VSCode, see [Adapting an Application](https://help.sap.com/docs/SAP_FIORI_tools/17d50220bcd848aa854c9c182d65b699/802f01cb252746468038b856b6c56c56.html?locale=en-US).

Yeoman Generator for creating an Adaptation Project in the SAP Business Application Studio and MS VSCode.

There are six sub-generators that are included in the repository under the main generator:

- **Deployment Wizard:** Generator used for deploying adaptation projects.
- **Replace OData Service:** Generator used to create application descriptor changes by adding an OData Service changes to an adaptation project.
- **Change Inbound:** Generator used to create application descriptor changes by adding a Change Inbound to an adaptation project.
- **Add Annotation File:** Generator used to create application descriptor changes by adding an annotation file to the adaptation project.
- **Add New SAPUI5 Model and Add ОData Service:** Generator used to create application descriptor changes by adding an OData service and new SAPUI5 model to the adaptation project.
- **Add SAPUI5 Component Usages:** Generator used to create application descriptor changes by adding SAPUI5 Component Usages change to the adaptation project.

All sub-generators can be started from the context menu by clicking on the `manifest.appdescr_variant`.
