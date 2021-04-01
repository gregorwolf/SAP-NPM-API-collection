# **@sap/destinations**

Utility for consumption of the [SAP Cloud Platform Destination Service](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/7e306250e08340f89d6c103e28840f30.html).

Example usage:
```javascript
const axios = require('axios')
const https = require('https')
const request = require('request')
const xsenv = require('@sap/xsenv')
const destinationsClient = require('@sap/destinations')

//xsuaa service instance is needed only in multitenant scenario
const services = xsenv.getServices({
  'destination-svc': { tag: 'destination' },
  'xsuaa': { tag: 'xsuaa' }
})

const client = destinationsClient(services)

client.load("destination-name").then(destination => {
    // Node.js standard http
    // options object with correct Authorization header already set
    const req = https.get(destination.toOptions(), (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        console.log(`standard - body: ${data}`)
      })
    })

    // requests
    request(destination.toOptions(), (error, response, body) => {
      console.log('request - error:', error)
      console.log('request - code:', response && response.statusCode)
      console.log('request - body:', body)
    })

    // axios
    axios(destination.toOptions())
      .then(function (response) {
        console.log('axios - code:', response.status, response.statusText)
        console.log('axios - body:', response.data)
      })
      .catch(function (error) {
        console.log('axios - error:', error.message)})
})
```

# **What does @sap/destinations do?**
The destination service client will fetch a destination with a given name from the SAP Cloud Platform Destination Service. In the background @sap/destinations also fetches an access_token for the destination service so you don't have to.

If the requested destination is configured with **Basic Authentication** or **oAuth Client Credentials**, the returned object will contain access token for the destination itself in addition to the destination credentials. If it's configured with **oAuth User Token Exchange**, the returned object will contain the exchanged user token. The Destination Service does the exchange authomatically.

```javascript
client.load("dest-oauth").then( destination => {
    const destAccessToken = destination.authTokens[0]
    const destClientId = destination.destinationConfiguration.clientId
    const destClientSecret = destination.destinationConfiguration.clientSecret
    ...
```

The destinations client returns an object with the same structure as the response from the SAP Cloud Platform Destination Service.
You can read more on the structure of the returned object in the [SAP Cloud Platform Destination Service Documentation](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/83a3f3b9cd314618aba651044ed5b9df.html).

For convenience the returned destination object has a `toOptions()` function, so it could be easily passed to http clients like standard Node.js `http/https` packages, [request](https://www.npmjs.com/package/request), [axios](https://www.npmjs.com/package/axios) etc.

```javascript
client.load("dest-name").then(destination => {
  request(destination.toOptions(), (error, response, body) => {
    ...
  })
    ...
```

# **Supported Destination Types**
Currently the client supports and can fetch destinations configured with **NoAuthentication**, **Basic Authentication**, **oAuth Client Credentials** or **oAuth User Token Exchange*.

# **API**
## **Class: DestinationServiceClient**

### **new DestinationServiceClient(services)**
Creates a new DestinationServiceClient instance.

* **`services`** *Object* Parameter containing the service binding information for the Destination Service and optionally XSUAA.
The structure is the same as the one in VCAP_SERVICES. If there is XSUAA passed, it will be used for token handling, otherwise the default
UAA configured in the Destination Service binding will be used.
* **_returns_** *DestinationServiceClient* a destination client for the corresponding destination service instance.

### **load(destinationConfig)**
Asynchronous. Fetches a destination from the Destination Service.

* **`destinationConfig`** *string* or *Object* String containing the name of the destination or, in case of oAuth User Token Exchange Flow, a destination configuration object that has to be loaded. The object could contain the follwing properties:
    - **`name`** *string* Name of the destination.
    - **`token`** *string* User token that needs to be exchanged to access the destination. In case **`userDestination`** is configured, this token will be set as `Authorization` header in the request to the Detsination service. Otherwise this token will be set as `X-user-token` header.
   - **`userDestination`** *bool* See above. Default is false.
The name resolution is as follows - first the library will look through destinations configured on instance level and then on subaccount level.
* **_returns_** *Destination* A destination object with the same structure as the [Destination Service response](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/83a3f3b9cd314618aba651044ed5b9df.html).


## **Class: Destination**

### **toOptions()**
Converts a destinations object to an Options object that can be passed to http clients (standard Node.js `http/https` packages, [request](https://www.npmjs.com/package/request), [axios](https://www.npmjs.com/package/axios) etc.)

* **_returns_** *Object* Options object containing the properties: `port`, `path`, `hostname`, `protocol`, `url` (result of URL.parse of the destination url) and
`headers` (Authorization header).
