OData V4.0 Server Library
=========================

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Releases and Milestones](#releases-and-milestones)

# Overview

With the OData server library OData V4.0 services can be implemented based on the [OASIS OData standard](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata).
The library can be directly used to build OData services and is also part of the SAP Fiori programming model as well the SAP Cloud Platform programming model, where the data model can be defined in CDS (Core data services) and the OData service be generated out of the model.

The library leaves the freedom to build OData services with any db or persistence layer. It is also possible
to create services, that are calling external REST/OData services and mix up the data with your application data.

The library is modular and consists of the following main components:

* EntityDataModel - Define your EDM in JSON format. Our provider creates the
  EDM out of your model and caches EDM model elements
* Handler Dispatcher - Maps requests to handler functions for CRUD operations
* URI parsers - Parse the request URI including the OData system query options
  (like $format, $select, $expand,...) and validates each URI segment against
  the EDM model and the OData ABNF
* Serializers and Deserializers for the request and response payload.
  The deserializers validate the request payload and support type mapping between
  OData EDM types and JavaScript Types
* Automatic OData Reponse generation based on provided data
* ServiceFactory to create the OData service along with the CRUD handler registration
* Conditional request handling for optimistic concurrency control via ETAGs
* Batch handling - Batch request parsing, dispatching to single batch requests,
  Content-ID referencing and batch response generation
* Flexible API to support all backends - The service developer has the free
  choice of his backend system (e.g., databases, frameworks, calling additional
  external OData services).

# Installation
```npm install @sap/odata-v4```

# Usage

```javascript
const odata = require('@sap/odata-v4');
// Load your edm model.
const edmModel = require('./<your_edm_model>.json');

// Create the service
const service = odata.ServiceFactory.createService(edmModel)

    // Register the request handler for CRUD operations
    .on('create', function create(request, response, next){...})
    .on('update', function update(request, response, next){...})
    .on('delete', function delete(request, response, next){...})
    .on('read', function read(request, response, next){...})

//Create the server
const port = 9000;
const server = http.createServer((req, res) => service.process(req, res))
    .listen(port,
        () => console.log(`Server listens on port ${port} - Service URL: http://localhost:${port}/serviceroot.svc/`)
    );
```

# Supported Requests

| Resource                      | Request                                                                                  | 
|:------------------------------|:-----------------------------------------------------------------------------------------|
| **Read Request**              | **GET**                                                                                  | 
| Serviceoot                    | GET http&#58;//host/serviceRoot/                                                         | 
| Metadata                      | GET http&#58;//host/serviceRoot/$metadata                                                | 
| EntitySet                     | GET http&#58;//host/serviceRoot/EntitySet                                                |
| EntitySet                     | GET http&#58;//host/serviceRoot/EntitySet/$count                                         |
| Entity                        | GET http&#58;//host/serviceRoot/EntitySet(Key)                                           |
| References                    | GET http&#58;//host/serviceRoot/EntitySet/$ref                                           | 
| Reference                     | GET http&#58;//host/serviceRoot/EntitySet(Key)/$ref                                      | 
| References(related)           | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany/$ref             | 
| Reference(related)            | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany/$ref             |  
| Related Entity                | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToOne                   |
| Related Entities              | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany                  |
| Complex Property              | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty                           |
| Complex Property Collection   | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection                 |
| Primitive Property            | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty                         |
| Primitive Property Value      | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/$value                  |
| Primitive Property Collection | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection               |
| **Create/Insert Requests**    | **POST**                                                                                 | 
| Entity                        | POST http&#58;//host/serviceRoot/EntitySet                                               | 
| Deep Insert                   | POST http&#58;//host/serviceRoot/EntitySet                                               | 
| Entity with bind operations   | POST http&#58;//host/serviceRoot/EntitySet                                               | 
| Reference                     | POST http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany/$ref            | 
| *Update Requests*             | *PUT/PATCH*                                                                              | 
| Entity                        | PUT/PATCH http&#58;//host/serviceRoot/EntitySet(Key)                                     |
| Reference                     | PUT http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToOne/$ref              | 
| Complex Property              | PUT/PATCH http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty                     |
| Complex Property Collection   | PUT http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection                 |
| Primitive Property            | PUT http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty                         |
| Primitive Property Value      | PUT http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/$value                  |
| Primitive Property Collection | PUT http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection               |
| **Delete Requests**           | **DELETE**                                                                               | 
| Entity                        | DELETE http&#58;//host/serviceRoot/EntitySet(Key)                                        |
| Reference                     | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToOne/$ref           | 
| Reference(To Many)            | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany(Key)/$ref     | 
| Complex Property              | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty                        |
| Complex Property Collection   | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection              |
| Primitive Property            | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty                      |
| Primitive Property Value      | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/$value               |
| Primitive Property Collection | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection            |
| **Actions and Functions**     | **GET/POST**                                                                             |
| Function Import               | GET http&#58;//host/serviceRoot/FunctionImports/[Navigation- or PropertyPath]            |
| boundFunction                 | GET http&#58;//host/serviceRoot/EntitySet/boundFunction                                  |
| boundFunction                 | GET http&#58;//host/serviceRoot/EntitySet(Key)/boundFunction                             |
| boundFunction                 | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty/boundFunction             |
| boundFunction                 | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection/boundFunction   |
| boundFunction                 | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/boundFunction           |
| boundFunction                 | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection/boundFunction |
| ActionImport                  | POST http&#58;//host/serviceRoot/ActionImport                                            | 
| boundAction                   | POST http&#58;//host/serviceRoot/EntitySet/boundAction                                   |
| boundAction                   | POST http&#58;//host/serviceRoot/EntitySet(Key)/boundAction                              |
| boundAction                   | POST http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty/boundAction              |
| boundAction                   | POST http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection/boundAction    |
| boundAction                   | POST http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/boundAction            |
| boundAction                   | POST http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection/boundAction  |

# Supported System Query Options

| System Query Option           | OASIS OData V4.0 Errata 3 - Query Option Description    | 
|:----------------|:-------------------------------------------------------------------------------------|
| **$filter**              | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752358)   |                                                                       | 
| **$expand**              | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752359)  |                                                                        | 
| **$select**              | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752360) |                                                                         | 
| **$orderby**              | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752361)|
| **$top and $skip**        | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752362)|
| **$count**            | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752363)|
| **$search**            | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752364)|
| **$format**            | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752365)|

# [Analytical Queries - $apply](http://docs.oasis-open.org/odata/odata-data-aggregation-ext/v4.0/cs01/odata-data-aggregation-ext-v4.0-cs01.html)

| Transformation      | Sample                                                          | Limitations     |
|:--------------------|:----------------------------------------------------------------| :---------------|
| **aggregate**       | GET ~/Sales?$apply=aggregate(Amount with sum as Total)          | Keyword 'from' is not supported |
| **topcount**        | GET ~/Sales?$apply=topcount(2,Amount)                           |       |
| **topsum**          | GET ~/Sales?$apply=topsum(15,Amount)                            |       |
| **toppercent**      | GET ~/Sales?$apply=toppercent(50,Amount)                        |       |
| **bottomcount**     | GET ~/Sales?$apply=bottomcount(2,Amount)                        |       |
| **bottomsum**       | GET ~/Sales?$apply=bottomsum(7,Amount)                          |       |
| **bottompercent**   | GET ~/Sales?$apply=bottompercent(50,Amount)                     |       |
| **identity**        | GET ~/Sales?$apply=identity                                     |       |
| **concat**          | GET ~/Sales?$apply=concat(topcount(2,Amount),aggregate(Amount)) |       |
| **groupby**         | GET ~/Sales?$apply=groupby((Customer/Country,Product/Name), aggregate(Amount with sum as Total)) | rollup and $all is not supported      |
| **filter**          | GET ~/Sales?$apply=filter(Amount gt 3)                          | 
| **expand**          | Not supported                                                   | 
| **search**          | GET ~/Sales?$apply=search(coffee)                               | 


# Releases and Milestones

[Changelog](./CHANGELOG.md)
