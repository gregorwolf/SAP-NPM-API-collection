### Modes

The xsodata library currently supports two modes, **development** and **productive**.
The mode is configured globally per xsodata handler instance, but can be set to
*development* for an individual request. As the development mode might expose sensitive
data the default is *productive*.

The mode can only set via Code!

#### Global configuration

For any productive usage, the mode should be set to **productive**, which is also
the default, if nothing is specified.


Samples:

```js
// Instantiate an xsodata handler in productive mode
var xsodata = require('sap-xsodata');

var odataHandler = new xsodata.ODataHandler({
    mode: xsodata.modes.productive
    // other options
});

// Instantiate an xsodata handler in development mode
var xsodata = require('sap-xsodata');

var odataHandler = new xsodata.ODataHandler({
    mode: xsodata.modes.development
    // other options
});
```

#### Per Request

The developer mode can be activated per request. This enables the application to
get debug output for a request, for example for specific users having the necessary
authorization. To enable it, the application has to actively set a property in the
*RequestOptions*.

```js
odataHandler.processRequest(request, response, new xsodata.RequestOptions({
    mode: xsodata.modes.development
    // other request options
}), callback);
```
