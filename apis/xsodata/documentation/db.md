Database connector
=======================

From version 4.0.0 onwards the xsodata library is supporting also the new **hana-client** DB connector beside 
the **hdb** DB connector.

The hana-client uses a native library for communication with the HANA database server which is also 
used by the hana-client for other languages (e.g. java and python). 

By default, when the xsodata library is used the XSA migration scenario, the xsjs layer injects a db connection 
into the xsodata library (via RequestOptions.dbClient). With xsodata version >= 4.0.0 this object can be either 
a hana-client client object or a hdb client object, the xsodata is detects the client type and acts accordingly.

If the xsodata library is used standalone (which is not recommended) and the db connections open
parameters are provided (via HandlerOptions.dbConfiguration) by default the new hana-client is used to 
open the db connection. To used the hdb client please use the HandlerOptions.dbClient setting.

HandlerOptions.dbClient = 'hdb' // used hdb db client 
HandlerOptions.dbClient = 'hana-client' // used hana-client db client

**ATTENTION**

Please be aware that the new hana-client is not packaged inside the xsodata library, nor installed automatically 
with "npm install" due to its size. So if your application is using the xsodata library directly (without xsjs) 
you must add the dbClient='hdb' configuration setting to use the hdb client or install the hana-client library 
manually (within the applications package.json). 
This has been decided to have a defined default client (the **hana-client**) and 
because the direct usage of the xsodata library is not recommended.


  
 

   

