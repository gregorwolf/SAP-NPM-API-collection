# SAP HANA Database Module Generator
The SAP HANA Database Module Generator simplifies the process of adding an SAP HANA database module to an SAP HANA database application project by generating the basic structure required by the database module and providing the option to bind the database module to a service in the Cloud Foundry or XS advanced run-time platform. 
## Prerequisites
* To interact with the Cloud Foundry run-time platform, the SAP HANA Database Module Generator requires the [Cloud Foundry command-line interface](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/4ef907afb1254e8286882a2bdef0edf4.html) (CF CLI).
* To interact with SAP HANA XS advanced run-time platform, the SAP HANA Database Module Generator requires the [XS advanced command-Line interface](https://help.sap.com/docs/SAP_HANA_PLATFORM/1ed1948fa0664e138c088dcc61e267e0/addd59069e6f444ca6ccc064d131feec.html) (XS CLI).
* ## Installation
`npm install -g @sap/generator-add-hdb-module`
## Configuration
* The SAP HANA Database Module Generator works by default with [SAP Business Application Studio](https://help.sap.com/viewer/9d1db9835307451daa8c930fbd9ab264/Cloud/en-US/8f46c6e6f86641cc900871c903761fd4.html), the XS advanced command-line interface,  and the Cloud Foundry command-line interface. No additional configuration is required.
* To use a graphical UI for the SAP HANA Database Module Generator in Visual Studio Code, install the [Application Wizard](https://marketplace.visualstudio.com/items?itemName=SAPOS.yeoman-ui) extension.
## License
This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3_1.txt).
