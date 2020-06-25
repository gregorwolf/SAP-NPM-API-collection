# @sap/textmining
@sap/textmining is a Node.js module on the XS Advanced platform that supports text mining. Text mining makes determinations about the content of unstructured text documents by examining the terms used within them.

@sap/textmining is implemented as an interface to the Text Mining SQL API in HANA. The API functions and parameters follow the pattern of the Text Mining XS Classic API:
- `categorizeKNN()`
- `getRelatedDocuments()`
- `getRelatedTerms()`
- `getRelevantDocuments()`
- `getRelevantTerms()`
- `getSuggestedTerms()`
- `initialize()`

For more information on the Text Mining SQL API, see the [SAP HANA SQL and System Views Reference](http://help.sap.com/hana/SAP_HANA_SQL_and_System_Views_Reference_en.pdf) section **Advanced Data Processing**. For `initialize()`, refer to the section **ALTER FULLTEXT INDEX**.

For more information on the Text Mining XS Classic API, see the [SAP HANA Text Mining XS JavaScript API Reference](http://help.sap.com/hana/SAP_HANA_XS_JavaScript_API_Reference_en/$.text.mining.Session.html).

For more information on text mining, see the [SAP HANA Text Mining Developer Guide](http://help.sap.com/hana/SAP_HANA_Text_Mining_Developer_Guide_en.pdf).

## Usage example

```javascript
var textmining = require('@sap/textmining');
var hdb = require('hdb');
var db = {
  "host": "HOST",
  "port": 3XX15,
  "user": "USERNAME",
  "password": "PASSWORD"
}

var client = hdb.createClient({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password
});

var p = {
  inputTermText : "term",
  top : 10,
  threshold : 0.3
}

var config = {
client : client,
referenceTable : 'SCHEMA.TABLE',
referenceColumn : 'COLUMN'
}

var tmd = new textmining(config);
client.connect(function(err){
  if(err)
  {
    client.end();
    throw err;
    return;
  }
  tmd.getSuggestedTerms(p, function(err, result){
    if(err)
    {
      client.end();
      throw err;
      return;
    }
    console.log(result);
    client.end();
  });
});
```
