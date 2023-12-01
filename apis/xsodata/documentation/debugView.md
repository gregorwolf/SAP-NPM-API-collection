# Debug View

The debug view can be used from any http client (ideally a browser) to obtain internal information about a odata request. If used, a the original odata response is replaced with an html page. This html page is send back to the client by the xsodata library with Content-Type *text/html* and contains the original odata response (as html) as well as debug information.

### Prerequisites

In order to get a detailed debug output for a request, two things are necessary:

1.  The xsodata library has to be in *developer mode* for the given request
    For enabling the developer mode see [Modes](./modes.md)
1.  The `sap-ds-debug` query parameter has to be set to 'json'


