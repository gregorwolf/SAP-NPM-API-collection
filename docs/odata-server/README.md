OData V4.0 Server Library
=========================

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Supported Requests](#supported-requests)
- [Releases and Milestones](#releases-and-milestones)

## Overview

With the OData server library OData V4.0 services can be implemented based on the
[OASIS OData standard](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata).
The library can be directly used to build OData services and is also part of
the SAP Fiori programming model as well the SAP Cloud Platform programming
model, where the data model can be defined in CDS (Core data services) and
the OData service be generated out of the model.

The library leaves the freedom to build OData services with any database or
persistence layer. It is also possible to create services that are calling
external REST/OData services and mix up the data with your application data.

The library is modular and consists of the following main components:

* EntityDataModel - Define your EDM in JSON format. Our provider creates the
  EDM out of your model and caches EDM model elements
* Handler Dispatcher - Maps requests to handler functions for CRUD operations
* URI parsers - Parse the request URI including the OData system query options
  (like $format, $select, $expand, ...) and validates each URI segment against
  the EDM model and the OData ABNF
* Serializers and Deserializers for the request and response payload.
  The deserializers validate the request payload and support type mapping between
  OData EDM types and JavaScript Types
* Automatic OData Reponse generation based on provided data
* ServiceFactory to create the OData service along with the CRUD handler registration
* Conditional request handling for optimistic concurrency control via ETags
* Batch handling - Batch request parsing, dispatching to single batch requests,
  Content-ID referencing and batch response generation
* Flexible API to support all backends - The service developer has the free
  choice of his backend system (e.g., databases, frameworks, calling additional
  external OData services).

## Installation

```sh
npm install @sap/odata-server
```

## Usage

Load the library:

```javascript
const odata = require('@sap/odata-server');
```

Load your EDM model:

```javascript
const edmModel = require('./<your_edm_model>.json');
```

Create the service, set the base path, and register request handlers for
CRUD operations:

```javascript
const service = odata.ServiceFactory.createService(edmModel)
    .setBasePath('/serviceroot.svc/')
    .on('create', function create(request, response, next) {...})
    .on('update', function update(request, response, next) {...})
    .on('delete', function delete(request, response, next) {...})
    .on('read', function read(request, response, next) {...});
```

You can create an HTTP server locally to test your service:

```javascript
const http = require('http');
const port = 9000;
const server = http.createServer((req, res) => service.process(req, res))
    .listen(port,
        () => console.log('Server listens on port ' + port + ' - '
            + 'Service URL: http://localhost:' + port + '/serviceroot.svc/'));
```

## Supported Requests

### Read Requests Using HTTP GET

| Resource                      | Request                                                                      |
|:------------------------------|:-----------------------------------------------------------------------------|
| Service root                  | GET http&#58;//host/serviceRoot/                                             |
| Metadata                      | GET http&#58;//host/serviceRoot/metadata                                     |
| EntitySet                     | GET http&#58;//host/serviceRoot/EntitySet                                    |
| EntitySet                     | GET http&#58;//host/serviceRoot/EntitySet/$count                             |
| Entity                        | GET http&#58;//host/serviceRoot/EntitySet(Key)                               |
| References                    | GET http&#58;//host/serviceRoot/EntitySet/$ref                               |
| Reference                     | GET http&#58;//host/serviceRoot/EntitySet(Key)/$ref                          |
| References (related)          | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany/$ref |
| Reference (related)           | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany/$ref |
| Related entity                | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToOne       |
| Related entities              | GET http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany      |
| Complex property              | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty               |
| Complex property collection   | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection     |
| Primitive property            | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty             |
| Primitive property value      | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/$value      |
| Primitive property collection | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection   |

### Create/Insert Requests Using HTTP POST

| Resource                    | Request                                                                       |
|:----------------------------|:------------------------------------------------------------------------------|
| Entity                      | POST http&#58;//host/serviceRoot/EntitySet                                    |
| Deep insert                 | POST http&#58;//host/serviceRoot/EntitySet                                    |
| Entity with bind operations | POST http&#58;//host/serviceRoot/EntitySet                                    |
| Reference                   | POST http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany/$ref |

### Update Requests Using HTTP PUT/PATCH

| Resource                      | Request                                                                     |
|:------------------------------|:----------------------------------------------------------------------------|
| Entity                        | PUT/PATCH http&#58;//host/serviceRoot/EntitySet(Key)                        |
| Deep update                   | PUT/PATCH http&#58;//host/serviceRoot/EntitySet(Key)                        |
| Reference                     | PUT http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToOne/$ref |
| Complex property              | PUT/PATCH http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty        |
| Complex property collection   | PUT http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection    |
| Primitive property            | PUT http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty            |
| Primitive property value      | PUT http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/$value     |
| Primitive property collection | PUT http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection  |

### Delete Requests Using HTTP DELETE

| Resource                      | Request                                                                              |
|:------------------------------|:-------------------------------------------------------------------------------------|
| Entity                        | DELETE http&#58;//host/serviceRoot/EntitySet(Key)                                    |
| Reference                     | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToOne/$ref       |
| Reference (to many)           | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/NavigationPropertyToMany(Key)/$ref |
| Complex property              | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty                    |
| Complex property collection   | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection          |
| Primitive property            | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty                  |
| Primitive property value      | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/$value           |
| Primitive property collection | DELETE http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection        |

### Functions Using HTTP GET

| Resource        | Request                                                                                  |
|:----------------|:-----------------------------------------------------------------------------------------|
| Function import | GET http&#58;//host/serviceRoot/FunctionImport/[Navigation-or-Property-Path]             |
| boundFunction   | GET http&#58;//host/serviceRoot/EntitySet/boundFunction                                  |
| boundFunction   | GET http&#58;//host/serviceRoot/EntitySet(Key)/boundFunction                             |
| boundFunction   | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty/boundFunction             |
| boundFunction   | GET http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection/boundFunction   |
| boundFunction   | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/boundFunction           |
| boundFunction   | GET http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection/boundFunction |

### Actions Using HTTP POST

| Resource      | Request                                                                                 |
|:--------------|:----------------------------------------------------------------------------------------|
| Action import | POST http&#58;//host/serviceRoot/ActionImport                                           |
| boundAction   | POST http&#58;//host/serviceRoot/EntitySet/boundAction                                  |
| boundAction   | POST http&#58;//host/serviceRoot/EntitySet(Key)/boundAction                             |
| boundAction   | POST http&#58;//host/serviceRoot/EntitySet(Key)/ComplexProperty/boundAction             |
| boundAction   | POST http&#58;//host/serviceRoot/EntitySet(Key)/ComplexPropertyCollection/boundAction   |
| boundAction   | POST http&#58;//host/serviceRoot/EntitySet(Key)/PrimitiveProperty/boundAction           |
| boundAction   | POST http&#58;//host/serviceRoot/EntitySet(Key)/PrimitivePropertyCollection/boundAction |

### Supported System Query Options

| System Query Option| OASIS OData V4.0 Errata 3 - Query Option Description |
|:-------------------|:-----------------------------------------------------|
| `$filter`          | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752358)|
| `$expand`          | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752359)|
| `$select`          | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752360)|
| `$orderby`         | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752361)|
| `$top` and `$skip` | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752362)|
| `$count`           | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752363)|
| `$search`          | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752364)|
| `$format`          | [Supported values see OASIS specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752365)|

### Analytical Queries

Analytical queries with `$apply` are described in the
[specification](http://docs.oasis-open.org/odata/odata-data-aggregation-ext/v4.0/cs01/odata-data-aggregation-ext-v4.0-cs01.html)
for the OData data aggregration extension.

| Transformation  | Sample                                                          | Limitations     |
|:----------------|:----------------------------------------------------------------| :---------------|
| `aggregate`     | GET ~/Sales?$apply=aggregate(Amount with sum as Total)          | Keyword 'from' is not supported |
| `topcount`      | GET ~/Sales?$apply=topcount(2,Amount)                           |
| `topsum`        | GET ~/Sales?$apply=topsum(15,Amount)                            |
| `toppercent`    | GET ~/Sales?$apply=toppercent(50,Amount)                        |
| `bottomcount`   | GET ~/Sales?$apply=bottomcount(2,Amount)                        |
| `bottomsum`     | GET ~/Sales?$apply=bottomsum(7,Amount)                          |
| `bottompercent` | GET ~/Sales?$apply=bottompercent(50,Amount)                     |
| `identity`      | GET ~/Sales?$apply=identity                                     |
| `concat`        | GET ~/Sales?$apply=concat(topcount(2,Amount),aggregate(Amount)) |
| `groupby`       | GET ~/Sales?$apply=groupby((Customer/Country,Product/Name), aggregate(Amount with sum as Total)) | rollup and `$all` is not supported |
| `compute`       | GET ~/Customers?$apply=compute(length(Country) as Length)       |
| `filter`        | GET ~/Sales?$apply=filter(Amount gt 3)                          |
| `orderby`       | GET ~/Sales?$apply=orderby(Customer/Name)                       |
| `expand`        | Not supported                                                   |
| `search`        | GET ~/Sales?$apply=search(coffee)                               |
| `skip`          | GET ~/Sales?$apply=skip(5)                                      |
| `top`           | GET ~/Sales?$apply=top(4)                                       |


## Releases and Milestones

[Changelog](./CHANGELOG.md)
