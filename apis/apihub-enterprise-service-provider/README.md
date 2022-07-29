
# The apihub-enterprise-service-provider Repository

## Overview

**apihub-enterprise-service-provider** is an npm package that provides the APIs necessary for exposing API Business Hub Enterprise destination systems, products and services. This package also exposes an interface for actions and queries related to the user's registration and subscription.

## Usage

To add this package as a dependency in your **package.json** file, under the "dependencies" section, add the following dependency: `"@sap/apihub-enterprise-service-provider": [Version]`

# Public APIs

## ApiHubEntProviderRepository
### getDestinations
**Description:** *Provides a list of 'API Business Hub Enterprise' destination systems*  
**Signature:** 
  ```typescript
  async getDestinations(filter?: Filter)
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*filter* (optional): For additional filters on the destination list to be received   
**Output:** A list of [API Business Hub Enterprise Destination Systems](#apihubentdestinationsystem)   

### getServiceRetriever
**Description:** *Retrieves an instance of the API Business Hub Enterprise's implementation of the ServiceRetriever interface*  
**Signature:** 
  ```typescript
  getServiceRetriever(): ApiHubEntServiceRetrieverInterface
  ```  
**Input:** none  
**Output:** An instance that implements the ApiHubEntServiceRetrieverInterface  

## ApiHubEntDestinationSystem
### getProducts
**Description:** *Provides a list of 'API Business Hub Enterprise' product systems*  
**Signature:** 
  ```typescript
  getProducts(options?: Record<string, any>): Promise<ApiHubEntProductSystem[]>
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*options* (optional): Accepts the following optional parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; credentials: For services that require authentication  
**Output:** A list of [API Business Hub Enterprise Product Systems](#apihubentproductsystem) 

## ApiHubEntProductSystem
### getServices
**Description:** *Provides a list of 'API Business Hub Enterprise' services*  
**Signature:** 
  ```typescript
  async getServices(options?: Record<string, any>): Promise<Service[]>
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*options* (optional): Accepts the following optional parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; credentials: For services that require authentication  
**Output:** A list of services  

### getMetadata
**Description:** *Provides the metadata of a 'API Business Hub Enterprise' service*  
**Signature:** 
  ```typescript
  async getMetadata(
        service: Service, 
        encoding: EncodingMode, 
        options?: Record<string, any>, 
        _relativeUrl?: string, 
        credentials?: Authentication): Promise<ServiceMetadata>
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*service*: The details of the service we want to get the metadata for   
&nbsp;&nbsp;&nbsp;&nbsp;*encoding*: For metadata it should always be EncodingMode.XML     
&nbsp;&nbsp;&nbsp;&nbsp;*options*: Accepts the following parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; apiHubKey: API Business Hub Enterprise authentication methods  
&nbsp;&nbsp;&nbsp;&nbsp;*credentials* (optional): For services that require authentication  
**Output:** An object that contains the metadata XML string of the service  

### getJsonLiveData
**Description:** *Provides live data from the 'API Business Hub Enterprise' service*  
**Signature:** 
  ```typescript
  async getJsonLiveData(
        service: Service, 
        _relativeServiceUrl: string, 
        entityName: string, 
        options?: Record<string, any>): Promise<ServiceCommon>
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*service*: The details of the service we want to get the metadata for   
&nbsp;&nbsp;&nbsp;&nbsp;*entityName*: The name of the entity in the service we want the live data for  
&nbsp;&nbsp;&nbsp;&nbsp;*options*: Accepts the following parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; apiHubKey: API Business Hub Enterprise authentication methods  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*filter* (optional): For additional query parameters to pass to the service. For example: ```new Filter(new Map([[ServiceRequestKey.TopRows, "2""]]))```  
**Output:** An object that contains a JSON string with live data from the service  

## AdministrationManager
### getSubscriptions
**Description:** *A static method that retrieves the user's subscriptions*  
**Signature:** 
  ```typescript
  static async getSubscriptions(
      destinationName:string, 
      userName: string, 
      productName?: string, 
      options?: Record<string, any>)
      : Promise<ApiHubEntSubscription[]>
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*destinationName*: The name of the destination system  
&nbsp;&nbsp;&nbsp;&nbsp;*userName*: The name of the current user  
&nbsp;&nbsp;&nbsp;&nbsp;*productName* (optional): Product's name in order to get the subscription list for only that specific product  
&nbsp;&nbsp;&nbsp;&nbsp;*options* (optional): Accepts the following optional parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; credentials: For services that require authentication  
**Output:** A list of the user's [subscriptions](#api_hub_enterprise_subscription) in this destination system    

### getRegistrationData
**Description:** *A static method that retrieves the user's registration information*  
**Signature:** 
  ```typescript
    static async getRegistrationData(
      destinationName:string, 
      userName: string, 
      options?: Record<string, any>)
      : Promise<RegistrationData | undefined>
  ```  
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*destinationName*: The name of the destination system  
&nbsp;&nbsp;&nbsp;&nbsp;*userName*: The name of the current user  
&nbsp;&nbsp;&nbsp;&nbsp;*options* (optional): Accepts the following optional parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; credentials: For services that require authentication  
**Output:** A [RegistrationData](#registration-data) object

### registerUser
**Description:** *A static method that registers the user*  
**Signature:** 
  ```typescript
    static async registerUser(
      registrationParams: RegistrationParams, 
      options?: Record<string, any>)
      : Promise<RegistrationData>
  ```  
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*[RegistrationParams](#registration-parameters)*: An input object with all the parameters for the registration request  
&nbsp;&nbsp;&nbsp;&nbsp;*options* (optional): Accepts the following optional parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; credentials: For services that require authentication  
**Output:** A [RegistrationData](#registration-data) object  

### subscribeUser
**Description:** *A static method that subscribes the user's app*  
**Signature:** 
  ```typescript
  static async subscribeUser(
    subscriptionParams: SubscriptionParams, 
    options?: Record<string, any>)
    : Promise<SubscribeResponse>
  ```
**Input:**  
&nbsp;&nbsp;&nbsp;&nbsp;*[SubscriptionParams](#subscription-parameters)*: An input object with all the parameters for the subscription request   
&nbsp;&nbsp;&nbsp;&nbsp;*options* (optional): Accepts the following optional parameters:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; credentials: For services that require authentication  
**Output:** A [SubscribeResponse](#subscribe-response) object with the response to the registration request 

### getAdministrationRaw
**Description:** *Retrieves an instance of the API Business Hub Enterprise's implementation of the ServiceRetriever interface*  
**Signature:** 
  ```typescript
    static getAdministrationRaw() :AdministrationManagerRawInterface
  ```  
**Input:** none  
**Output:** An instance that implements the AdministrationManagerRawInterface


## Types
### API Business Hub Enterprise Subscription
  **productId**: string  
  **appName**: string  
  **id**: string  
  **title**: string  
  **description**: string  
  **appKey**: string  
  **creationDate**: string  
  **isSubscribed**: boolean  

### Registration Parameters
  **destinationName (string):** API Business Hub Enterprise destination provider system  
  **userId (string):** The current user's username  
  **firstName (string):** The current user's first name  
  **lastName (string):** The current user's last name  
  **emailId (string):** The current user's email address  
  **country (string):** The current user's country  
  **roles ([AccessRole](#access_role)[]):** The list of roles associated with the user  

### Access Role
  **role (SubscriptionRole):** System role  
  **status (SubscriptionStatus, optional):** The current user's first name  
  **requestReason (string, optional):** The current user's last name  

### Registration Data
  **accessRoles**: [AccessRole](#access_role)[]

### Subscription Parameters
  **destinationName (string):** API Business Hub Enterprise destination provider system  
  **username (string):** The current user's username  
  **productName (string):** The product name to register to  
  **appName (string):** The user's application name to register  
  
### Subscribe Response
  **[key: string]**: unknown  


## Example Flow
Can be found at [test\flow\testFlow.ts](test\flow\testFlow.ts)