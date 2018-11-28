# sap-ui-annotations
UI Annotations

The purpose of this module is to provide UI Annotation Definitions required for CDS to OData exposure on XSA Plateform. 

How to Use this module:

1) Create package.json file under db module in an MTA project if already not present.
2) Add dependency to the sap-ui-annotations module like below:

_______________________________________________________________________________
{
  "name": "deploy",
  "dependencies": {
  	"@sap/hdi-deploy": "2.3.0",
  	"@sap/ui-annotations": "2.0.3"
  },
  "scripts": {
    "start": "node node_modules/@sap/hdi-deploy/deploy.js"
  }
}
_______________________________________________________________________________

Please Note - The version number are subject to change for both the modules used above.
