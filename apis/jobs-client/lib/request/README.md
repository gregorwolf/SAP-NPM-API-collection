# request

Request module to execute http request

```js
const response = await new Request(options).execute();
```

## options

- @param {object} options - The request options
- @param {string} options.url - The url must be a valid url. Otherwise the contructor throws an error
- @param {string} [options.method=GET] - The http method. Defaults to 'GET'
- @param {object} [options.headers] - The http headers. This object is treated as key-value-pairs. Each key is the header name and the value is its value.
- @param {object} [options.body] - The http body to send. If the body is typeOf object, the value is stringified before sending and the header 'content-type' is set to 'application/json'. If the body is typeOf string the header 'content-type' is set to 'text/plain'
- @param {number} [options.timeout] - A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is
  connected. See https://nodejs.org/dist/latest-v16.x/docs/api/http.html#httprequesturl-options-callback
- @param {number} [options.responseTimeout] - A number specifying the total response timeout in milliseconds. If the response is not finished after this period the request is destroyed. A possible socket timeout is included.
- @param {string} [options.cert] - A public key/certificate
- @param {string} [options.key] - A private key
- @param {string} [options.ca] - See https://nodejs.org/dist/latest-v16.x/docs/api/https.html#httpsrequesturl-options-callback
- @param {objstringect} [options.ciphers] - See https://nodejs.org/dist/latest-v16.x/docs/api/https.html#httpsrequesturl-options-callback
- @param {string} [options.passphrase] - See https://nodejs.org/dist/latest-v16.x/docs/api/https.html#httpsrequesturl-options-callback
- @param {boolean} [options.rejectUnauthorized] - See https://nodejs.org/dist/latest-v16.x/docs/api/https.html#httpsrequesturl-options-callback
- @param {object} [options.form] - This object is treated as key-value-pairs and used in form-url-encoded payload. UriEncoding is done automatically. The header 'content-type' is set to 'application/x-www-form-urlencoded'
- @param {number|boolean} [options.followRedirect=true] - Follow redirects or not. If a number is provided it follows all redirects until the amount of this number is reached. The absolute amount of redirects is 10.
- @param {object|boolean} [options.csrf] - If set, executes csrf token fetch. If set to true all values are using their defaults.
- @param {assertCallback} [options.csrf.assert] - If set, expects returning a boolean. True will try to fetch csrf a token, false will not try to fetch a csrf token.
- @param {number[]} [options.csrf.fetchOnStatusCodes=[401,403]] - If the returning status code of the first response will be within this array, a new csrf token will be fetched.
- @param {string} [options.csrf.method=HEAD] - If the returning status code of the first response will be within this array, a new csrf token will be fetched.
- @param {string} [options.csrf.url] - The http url to be used to fetch the csrf token from.
- @param {object} [options.retry] - If a request fails executes a new request until the conditions are met.
- @param {number} [options.retry.count] - This amount of retries should be done until the request fails completly.
- @param {timeoutStrategyCallback} [options.retry.timeoutStrategy] - How many milliseconds to wait until the next request will be executed
- @param {validateCallback} [options.retry.validate] - Can validate each response. If an error is thrown the retry feature continous retrying the request
- @param {object} [options.basic] - Providing authentication mechanim
- @param {string} [options.basic.user] - Provides the plain user for basic auth
- @param {string} [options.basic.password] - The plain password for basic auth
- @param {object} [options.oauth] - Providing authentication mechanim
- @param {string} [options.oauth.bearer] - Provides the plain bearer access token and sets the Auhtorization header
- @param {string} [options.oauth.clientId] - The client id to get an access token
- @param {string} [options.oauth.clientSecret] - The client secret to get an access token
- @param {string} [options.oauth.tokenUrl] - The token url to get an access token from

## response

### response.body: object

The response body if the response payload is a json value

### response.text: string

The response body as a string

### response.statusCode: number

The http response status code

### response.headers: key<string>=value<string>

A key-value-pair of all available response headers
