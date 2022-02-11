# @sap/cloud-sdk-vdm-business-event-queue-service

This package contains the OData VDM for the [Business Event Queue Service](https://api.sap.com/api/C_BEHQUEUEDATA_CDS) of SAP S/4HANA Cloud.
This service is part of the following communication scenarios: Business Event Handling Integration (SAP_COM_0121), OpenText Business Event Integration (SAP_COM_0007).
You can find additional documentation for this service on [help.sap.com](https://help.sap.com:00443/http.svc/ahp2/SAP_S4HANA_CLOUD/latest/EN/6a/c73813685a44ddaadb2fbdd86e92a5/frameset.htm).

## Usage Example
```
import { businessEventQueueService } from '@sap/cloud-sdk-vdm-business-event-queue-service';

const { c_BehqueuedataApi } = businessEventQueueService()
const resultPromise = c_BehqueuedataApi.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

```

## Helpful Links

- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)
- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [SAP API Business Hub](https://api.sap.com/)
