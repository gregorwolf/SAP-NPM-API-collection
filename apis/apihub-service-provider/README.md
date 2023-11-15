
# The apihub-service-provider (SAP Business Accelerator Hub) Repository

This repository reveals the 'SAP Business Accelerator Hub' service provider that can be used for local development.

The service provider extends the 'Consume-Services', which prompts the user to enter information to extend the generated project.

The 'SAP Business Accelerator Hub' service provider prompts the user to enter input to populate the generated project. After entering the input, the project, which consumes data from the SAP API Business Hub can be built and run.

The 'SAP Business Accelerator Hub' service provider provides a "modules.json" file for the 'Consume-services' to discover and prompt its questions. 

The *modules.json* file includes the following parameters: 

```
{
  "serviceProvider": [
    {
      "name": "SAP Business Accelerator Hub", 	// The displayed name in the yeoman-based prompt as part of the service provider's list.
      "path": "/extbin/serviceProviders/apihub-service-provider", 	// The path to the service provider's package.
      "entryPoint": { 			// The main entry point to trigger the specific service provider's logic.
        "class": "ApihubServiceProvider",
        "method": "apihubServiceProviderPrompt"
      }
    }
  ]
}
```

The 'SAP Business Accelerator Hub' service provider returns the following JSON containing the connectivity details below.
 
```
ConnectivityDetails {
  destination: { Name: "apihub_sandbox" },
  serviceURL: "/dummyPath",
  apiKey: "dummyApiKey",
  serviceMetadata: {
    odataContent: "<dummyXML></dummyXML>" 
    }
}
```

# Public APIs

### getListODataServices
**Description:** *Provides a list of OData services for 'SAP Business Accelerator Hub'*  
**Signiture:** ```async function getListODataServices()```  
**Input:** none  
**Output:** Json object containing array of OData services  

### getApihubKey
**Description:** *Retrieves an APIhub key from 'SAP Business Accelerator Hub' when passing in a valid username and password*  
**Signiture:** ```async function getApihubKey(username: string, password: string): Promise<string>```  
**Input:** *username:* The user's username that is used to login to 'SAP Business Accelerator Hub'  
           *password:* The user's password that is used to login to 'SAP Business Accelerator Hub'  
**Output:** Promise that resolves a string holding the user's apihub user key  

### getMetadata
**Description:** *Retrieves xml metadata for a specific service - as configured in the connectivityDetails.servicepath*  
**Signiture:** ```async function getMetadata(connectivityDetails: ConnectionDetails, serviceName: string)```  
**Input:** *connectivityDetails:* Object that contains the selected 'servicePath' and the generated 'apiHubApiKey'  
  *serviceName:* The name of the selected service  
**Output:** Beautified XML object including the selected service's metadata  

### getListOfServiceName
**Description:** *Retrieves a mapped list of all the OData services names for 'SAP Business Accelerator Hub'*  
**Signiture:** ```function getListOfServiceNames(jsonServices: any): string[]```  
**Input:** Json object including array of OData services  
**Output:** String array of service names  
