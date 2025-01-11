# @sap/textanalysis

@sap/textanalysis is a Node.js module on the XS Advanced platform that supports text analysis. Text analysis performs linguistic analysis and entity extraction on unstructured text documents.

@sap/textanalysis is implemented as an interface to the `TA_ANALYZE` SQL stored procedure. It provides the following single API function:
- `analyze()`

For more information on text analysis and the `TA_ANALYZE` stored procedure, see the [Text Analysis Developer Guide](http://help.sap.com/hana/SAP_HANA_Text_Analysis_Developer_Guide_en.pdf).
Note that `TA_ANALYZE` and @sap/textanalysis is only available on HANA 2.0 and later versions.

## Usage example
First, a HANA database connection must be established (either with [hdb](https://github.com/SAP/node-hdb) or with @sap/hana-client). Then the client database object can be passed to the analyze method along with the input parameters. The input parameters set the input variables to the `TA_ANALYZE` stored procedure.

```javascript
var ta = require('@sap/textanalysis');
var client;
var options = {
    host: process.env.HANA_HOST,
    port: process.env.HANA_PORT,
    user: process.env.HANA_USER || 'system',
    password: process.env.HANA_PASSWORD || 'manager',
};
async.series([
	function connect(callback) {
		client = hdb.createClient(options);
		client.connect(callback);
	},
	function analyze(callback) {
		var values = {
			DOCUMENT_TEXT: '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>',
			LANGUAGE_CODE: 'EN',
			CONFIGURATION: 'EXTRACTION_CORE',
			RETURN_PLAINTEXT: 0
		};
		ta.analyze(values, client, function done(err, parameters, rows) {
			if (err) { return console.error('error', err); }
			callback();
		});
	},
	function end(callback) {
		client.end(callback);
	}], done
);
```
