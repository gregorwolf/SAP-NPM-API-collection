
# The ucl-provider Repository
## Overview

&nbsp;&nbsp;&nbsp;&nbsp;The ucl-provider is an npm package that provides the APIs necessary for exposing UCL systems, packages and services.

The UCL is working with cert and key. In BAS this is transperent to the user as it happens behind the scenes

[UCL Docs](https://help.sap.com/docs/bas/sap-business-application-studio/unified-customer-landscape-service-provider)   


## Usage

&nbsp;&nbsp;&nbsp;&nbsp;To add this package as a dependency in your **package.json** file, under the "dependencies" section, add the following dependency: `"@sap/ucl-provider": [Version]`

# Public APIs

## UclProviderRepository
### getSystems
**Description:** *Provides a list of UCL systems.*  
**Signature:** 
  ```typescript
  async getSystems(): Promise<UclSystemProviderSystem[]>
  ```
**Input:** none.

**Output:** A list of [UCL Systems.](#uclSystemprovidersystem)   

### getServiceRetriever
**Description:** *Retrieves an instance of the UCL Service Retriever implementation of the ServiceRetriever interface.*  
**Signature:** 
  ```typescript
  getServiceRetriever(): UclServiceRetrieverInterface
  ```  
**Input:** none.

**Output:** An instance that implements the UclServiceRetrieverInterface.  

## UclSystemProviderSystem
### getPackages
**Description:** *Provides a list of the UCL system's packages.*  
**Signature:** 
  ```typescript
  getPackages(): Promise<UclPackageProviderSystem[]>
  ```
**Input:** none.

**Output:** A list of the [UCL system's packages.](#uclpackageprovidersystem) 

## UclPackageProviderSystem
### getServices
**Description:** *Provides a list of UCL services.*  
**Signature:** 
  ```typescript
  async getServices(): Promise<Service[]>
  ```
**Input:** none.

**Output:** A list of services.  

### getMetadata
**Description:** *Provides the metadata of the UCL service.*  
**Signature:** 
  ```typescript
  async getMetadata(
        service: Service, 
        encoding: EncodingMode,
        ): Promise<ServiceMetadata>
  ```
**Input:**

&nbsp;&nbsp;&nbsp;&nbsp;*service*: The details of the service that you want to get the metadata for. 

&nbsp;&nbsp;&nbsp;&nbsp;*encoding*: For metadata, you should use EncodingMode.XML.

**Output:** An object that contains the metadata XML string of the service.  

### getJsonLiveData
**Description:** *Provides live data from the UCL service.*  
**Signature:** 
  ```typescript
  async getJsonLiveData(
        service: Service, 
        destName: string, 
        entityName: string, 
        options?: Record<string, any>): Promise<ServiceCommon>
  ```
**Input:**

&nbsp;&nbsp;&nbsp;&nbsp;*service*: The details of the service that you want to get the live data for.

&nbsp;&nbsp;&nbsp;&nbsp;*destName*: The destination name of the live data.  

&nbsp;&nbsp;&nbsp;&nbsp;*entityName*: The name of the entity in the service that you want the live data for.

&nbsp;&nbsp;&nbsp;&nbsp;*options*: Accepts the following parameters:  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*filter* (optional): Provides query parameters to pass to the service. For example:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```new Filter(new Map([[ServiceRequestKey.TopRows, "2""]]))```

**Output:** An object that contains a JSON string with live data from the service. 

## More Resources
&nbsp;&nbsp;&nbsp;&nbsp;1. To create a key and certificate in **UCL Canary**, see this [wiki.](https://github.wdf.sap.corp/devx-wing/ucl-provider/wiki). 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note that the WS_BASE_URL in the lunch.json should be directed to UCL canary for the test flow to work.

&nbsp;&nbsp;&nbsp;&nbsp;2. See a sample flow of ucl-provider APIs [here.](/test/flow/testFlow.ts)

