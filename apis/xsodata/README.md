XSODATA
=======

Expose data from HANA database artifacts like tables or views as OData V2 service with the help of .xsodata service definition files. 

Note: XSOData was developed to provide XS Classic users using XSOData the possibility to migrate to XS Advanced on node.js. 
      This library contains nearly the same feature set as XSOData provided on SAP HANA XS Classic. This module is already 
      in maintenance mode and it is not planned to extend or enhance it.
      
      If you want to create new OData services we strongly reoommend to use OData V4 along with a generic CDS-OData provider.
      Here you can model your consumption persistency model with CDS (Core Data Services) and expose parts or the complete
      model as OData service. Such a solution is already productively available on the JAVA runtime stack. 
      
      For node.js we also provide an OData V4 solution. The development of the OData V4 node.js Library already started in 2016.
      It is also planned that a generic CDS-Odata provider will be deliverd.

## Usage

  * This module is used in the XSJS shim for SAP HANA XSC Engine applications to
    allow the reuse of .xsodata files from XSC applications on SAP HANA XSA.

  * It can also be used directly in your own nodejs server application. Be aware that you use the same version of the hdb and winston node module version in your application.
  
## Documentation 

[For documentation see here](./documentation.md)

## Warning

  * In order to restrict the amount of records loaded from the database (to reduce the memory usage) please use the 
    limit setting which can be set in the xsodata file [see here](documentation/xsodataSettings.md)
  * The xsodata library CHANGES the TRANSACTION ISOLATION LEVEL on the used database connection
  * The xsodata library CHANGES the SCHEMA on the used database connection
  * The xsodata library uses temporary tables for performance reasons
  * If you manually modify the db-connection/client inside xsodata-application-exits the modifications you have done
   will not be restored by the xsodata library
  
  So the user of the xsodata library should clean the database connection
  
## Features - Overview

  * Automatic metadata handling based on XSOData definition and HANA db metadata artifacts
  * OData request handling with URI parsing including system query options
  * OData request/response serialization and deserialization 
  * Load table records from HANA database via generated SQL queries
  * Calculation view support
  * Batch handling
  * Logging:
    When the xsjs application log is enabled then xsodata also writes log information.
    If, in addition, the environment variable XSODATA_LOG_MEMORY_CONSUMPTION is set to 'true'
    xsodata writes also memory consumption information to the logs


## Supported OData V2 Features:

GET Requests:

* URI0 = scheme serviceRoot 
* URI1 = scheme serviceRoot "/" entitySet
* URI2 = scheme serviceRoot "/" entitySet "(" keyPredicate ")"
* URI6 = scheme serviceRoot "/" entitySet "(" keyPredicate ")/" entityNavProperty
* URI7 = scheme serviceRoot "/" entitySet "(" keyPredicate ")/$links/" entityNavProperty
* URI8 = scheme serviceRoot "/$metadata"
* URI9 = scheme serviceRoot "/$batch"
* URI15 = scheme serviceRoot "/" entitySet count

CreateUpdateDelete Requests:

* CUD - Entity
* CUD - Link 

[System Query options](/documentation/supportedSystemQueryOptions.md):

* $top
* $skip
* $filter, except for:
    * comparison of navigation properties
* $orderby, except for:
    * comparison of navigation properties
* $expand
* $select
* $format
    * only json supported
* $inlinecount

[Supported HTTP methods per requests type](/documentation/supportedMethods.md)

## Supported XS1 OData features (defined in the XSOData file):

  * Definition of OData schema namespace
  * OData Service exposure
  * Metadata caching
  * Create/update/delete restrictions of OData requests
  * Exposure of table and views (including calculation views) as EntitySet
  * Property Projection: Expose a subset of the table columns as properties of an OData EntityType
  * [Automatic OData key generation] (/documentation/generatedKeys.md), e.g. required for aggregated views
  * Simple and complex associations 
  * [Data aggregation] (/documentation/aggregations.md)
  * Parameter EntitySets for calculation views
  * ETAG handling
  * Nullable properties
  * Cache Control via cache header
  * [Custom exits] (/documentation/customExits.md) (JavaScript and SQL Script) for modification and validation requests
  * Custom exits in batch requests
  * Uses only UTF-8
  * Uses "content-type: application/json" for CREATE, UPDATE, DELETE
  * Expose data only via JSON format (ATOM format is not supported)
  * Supported types and type mapping [see here](/documentation/typemapping.md) 
  * [Supported XSOData features by OSDL] (/documentation/xsodataEbnf.md) 
  

Note: 

* XS1 applications using analytical views, attribute views or calculation views <= SAP HANA SPS 10 have to migrate first their views to the new calculation views of SPS 11. 
* Authentication/Authorisation is not handled by XSOData node module and has to be done by the application using the node module. 
* [The module can be used in development mode and productive mode] (/documentation/modes.md)
* [Debug View is available when using the module in development mode] (/documentation/debugView.md)

## Features per HANA DB Artifact

### Table

Supports the following Features:
- [Explicit Aggregations](/documentation/aggregations.md#explicit-aggregations)
- [Generated Local Key](/documentation/generatedKeys.md)
 
Supported Http Verbs:
- GET, PUT, POST, DELETE

### SQL View

Supports the following Features:
- [Explicit Aggregations](/documentation/aggregations.md#explicit-aggregations)
- [Generated Local Key](/documentation/generatedKeys.md)

Supported Http Verbs:
- GET

### XS Advanced Calculation View

Supports the following Features:
- [Implicit Aggregations](/documentation/aggregations.md#implicitderived-aggregations)
- [Generated Local Key](/documentation/generatedKeys.md)

Supported Http Verbs:
- GET

## Samples

* [xsodata code samples without xsjs](/documentation/code_samples_pure_node/readme.md)
* [Calcview](/documentation/calcviewSample.md)








