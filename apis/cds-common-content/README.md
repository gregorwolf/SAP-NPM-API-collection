# CDS Common Content

This package holds default content based on the ISO specification for the following [CDS common definitions](https://cap.cloud.sap/docs/cds/common):

- `sap.common.Countries`: [ISO 3166-1](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) 
- `sap.common.Currencies`: [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
- `sap.common.Languages`: [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

The codes names and descriptions are translated into the most important SAP supported languages. 

## Getting Started

Install this module in your CDS Node.js project:
  ```sh
  npm install @sap/cds-common-content --save
  ```

### Automatic content federation

Import the module in your CDS definition:
  ```cds
  using from '@sap/cds-common-content';
  ```

### Manual content provisioning

- Content CSV files are located in folder `/db/data/`
- Copy over files to your project structure
- Manual transformation of files can be applied as required

## Export Control and Sanctions Compliance

SAP software products and services are subject to the export control and sanctions laws of various countries, including without limitation, the laws of Germany, the European Union, and the United States of America.

More info on countries/regions where SAP products and services are not available for export, reexport, transfer and/or use: https://www.sap.com/about/agreements/export-statements.html

**The default content of this repository excludes restricted countries/regions and their currencies.**


## License
This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3.1.txt).
