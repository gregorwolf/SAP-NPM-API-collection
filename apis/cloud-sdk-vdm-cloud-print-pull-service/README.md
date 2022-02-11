# @sap/cloud-sdk-vdm-cloud-print-pull-service

This package contains the OData VDM for the [Cloud Print Pull Service](https://api.sap.com/api/API_CLOUD_PRINT_PULL_SRV) of SAP S/4HANA Cloud.
This service is part of the following communication scenarios: Printing - Pull Integration (SAP_COM_0466).
You can find additional documentation for this service on [help.sap.com](https://help.sap.com/viewer/e8c6621864654025997c9daea001a778/latest/en-US/26bbee4468f34f06958417e7b70f088b.html).

## Usage Example
```
import { cloudPrintPullService } from '@sap/cloud-sdk-vdm-cloud-print-pull-service';

const { printOptionsApi } = cloudPrintPullService()
const resultPromise = printOptionsApi.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

```

## Helpful Links

- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)
- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [SAP API Business Hub](https://api.sap.com/)
