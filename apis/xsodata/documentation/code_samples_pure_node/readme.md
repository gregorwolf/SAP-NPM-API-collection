xsodata code samples without xsjs
=================================

These are samples that are using the XSOData library directly (means without a HANA XSA server). 
The code samples can be used as a reference for own web servers exporting OData payloads. 

### Prerequisites  
- Node.js 0.12.7 installed

### Content

- direct_use__multi_services
  A plain node http server using the odata handler serving all xsodata files from a directory
- direct_use__single_service  
  A plain node http server using the odata handler 
- expressjs__multi_services  
  An express server using the odata handler serving all xsodata files from a directory
- expressjs__single_service  
  An express server using the odata handler to serve a single xsodata file

To execute the examples please perform the following steps:
- create the database table you want to expose
- adopt the *.xsodata samples file to use your own tables
- provide db configuration (host,user,password) in the index.js files
- start via:  
```sh
$ cd documentation/examples/direct_use__single_service
$ npm install
$ npm start
# The output will tell you the URL to use
```
- test in browser for example via url http://localhost/demo.xsodata/$metadata
