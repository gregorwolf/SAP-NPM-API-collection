# @sap/cloud-sdk-op-vdm-controlling-area-service

This package contains the OData VDM for the Controlling Area Service.

## Usage Example
```
import { controllingAreaService } from '@sap/cloud-sdk-op-vdm-controlling-area-service';

const { controllingAreaApi } = controllingAreaService()
const resultPromise = controllingAreaApi.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

```

## Helpful Links

- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)
- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [SAP API Business Hub](https://api.sap.com/)
