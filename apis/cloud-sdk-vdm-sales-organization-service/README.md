# @sap/cloud-sdk-vdm-sales-organization-service

This package contains the OData VDM for the [Sales Organization Service](https://api.sap.com/api/API_SALESORGANIZATION_SRV) of SAP S/4HANA Cloud.
This service is part of the following communication scenarios: SAP Analytics Cloud for Planning Integration (SAP_COM_0087).
You can find additional documentation for this service on [help.sap.com](https://help.sap.com:00443/http.svc/ahp2/SAP_S4HANA_CLOUD/latest/EN/24/18326d6009458ab7acb72b2b747cca/frameset.htm).

## Usage Example
```
import { SalesOrganization } from '@sap/cloud-sdk-vdm-sales-organization-service';

const resultPromise = SalesOrganization.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

```

## Helpful Links

- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)
- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [SAP API Business Hub](https://api.sap.com/)
