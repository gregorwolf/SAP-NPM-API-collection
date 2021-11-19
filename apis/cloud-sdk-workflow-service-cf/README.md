# @sap/cloud-sdk-workflow-service-cf

This package contains the OpenAPI client for the SAP Workflow API.
This API uses the SAP Workflow service. With the API, you can, for example, start new workflow instances and work with tasks.

Note (relevant only for SAP API Business Hub): For authentication purposes, the API uses OAuth 2.0 security (with JSON Web Token, JWT). Thus, "Try Out" only works with an explicitly configured environment.
For more information on how to obtain the necessary parameters, please see [Determine Service Configuration Parameters](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/abb1f66b2c3b4983b6b656654cfc3d2b.html) in the documentation.
The OAuth client you use must have [extended scopes](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/baf2847f6d1c401a83ca3a1427b8ff84.html).

Note: These APIs are designed for loosely coupled clients. This means:

- If workflow service adds fields to responses, the API version number does not increase. Your client must ignore new fields.
- The order of fields in responses and of entries in arrays may change. This applies unless the API provides an explicit means to specify the desired order.


## Usage Example
```
import { WorkflowInstancesApi } from '@sap/cloud-sdk-workflow-service-cf';

const responseData = await WorkflowInstancesApi.queryInstances().execute({ destinationName:'myDestinationName' });
```

## Helpful Links

- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)
- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [SAP API Business Hub](https://api.sap.com/)
    
