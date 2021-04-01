# SAP-NPM-API-collection

Collection of API documentation from currently available npm packages from SAP.

All of this information is available within each package. I am simply putting
everything in one place for ease of reference.

Each packages api's can be found in the apis folder.

These are the currently listed packages from SAP, found with an npm search, with brief descriptions(click README.md, then click 'Raw')

You could also find 3 other packages in the node_modules, downloaded as dependencies, so I've included them.

### install MKDocs and dependencies
```
pip install mkdocs
pip install mkdocs-material
pip install codehilite
pip install mkdocs-minify-plugin
pip install mkdocs-awesome-pages-plugin
```

<!--
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
@sap/approuter            | Node.js based        | =https-support… | 2018-08-27 |          |
                          | application router   | .sap.com        |            |          |

@sap/audit-logging        | Provides audit       | =https-support… | 2018-08-20 |          |
                          | logging              | .sap.com        |            |          |
                          | functionalities for  |                 |            |          |
                          | Node.js applications |                 |            |          |

@sap/cds                  | Entry Point and API  | =https-support… | 2018-08-30 |          |
                          | Facade for CDS       | .sap.com        |            |          |

@sap/cds-compiler         | Standard-Feature-Set | =https-support… | 2018-08-30 |          |
                          | Vanilla-CDS in       | .sap.com        |            |          |
                          | Product Quality      |                 |            |          |

@sap/cds-hana             | Driver package for   | =https-support… | 2018-08-30 |          |
                          | access to hana       | .sap.com        |            |          |
                          | database, including  |                 |            |          |
                          | setting up the       |                 |            |          |
                          | client, configuring  |                 |            |          |
                          | all the necessary    |                 |            |          |
                          | options to initiate  |                 |            |          |
                          | the connection and   |                 |            |          |
                          | handling database    |                 |            |          |
                          | specifics so that    |                 |            |          |
                          | they can be          |                 |            |          |
                          | processed on our     |                 |            |          |
                          | end.                 |                 |            |          |

@sap/cds-ql               | This package deals   | =https-support… | 2018-08-30 |          |
                          | with creating a      | .sap.com        |            |          |
                          | pool of connection   |                 |            |          |
                          | clients, connecting  |                 |            |          |
                          | to a driver (read:   |                 |            |          |
                          | db) and using these  |                 |            |          |
                          | connection clients   |                 |            |          |
                          | from the pool to     |                 |            |          |
                          | insert, delete,      |                 |            |          |
                          | select and update    |                 |            |          |
                          | values or rows from  |                 |            |          |
                          | a specific table.    |                 |            |          |
                          | Performing these     |                 |            |          |
                          | insert, delete,      |                 |            |          |
                          | select and update    |                 |            |          |
                          | operations also      |                 |            |          |
                          | includes executing   |                 |            |          |
                          | embedded queries and |                 |            |          |
                          | plain statements.    |                 |            |          |

@sap/cds-reflect          | Reflection for CDS   | =https-support… | 2018-08-30 |          |
                          | Models               | .sap.com        |            |          |

@sap/cds-services         | This package handles | =https-support… | 2018-08-30 |          |
                          | the generation of an | .sap.com        |            |          |
                          | OData service using  |                 |            |          |
                          | the provided model.  |                 |            |          |
                          | It is possible to    |                 |            |          |
                          | start N services per |                 |            |          |
                          | server and each      |                 |            |          |
                          | service has its own  |                 |            |          |
                          | endpoint. This       |                 |            |          |
                          | package also offers  |                 |            |          |
                          | the possibility to   |                 |            |          |
                          | register custom      |                 |            |          |
                          | handlers for         |                 |            |          |
                          | performing create,   |                 |            |          |
                          | read, update and     |                 |            |          |
                          | delete operations.   |                 |            |          |

@sap/cds-sql              | This package offers  | =https-support… | 2018-08-30 |          |
                          | a factory method to  | .sap.com        |            |          |
                          | build a SQL string   |                 |            |          |
                          | from a CQN object    |                 |            |          |
                          | and a BaseClient     |                 |            |          |
                          | which performs       |                 |            |          |
                          | default post         |                 |            |          |
                          | processing to be     |                 |            |          |
                          | used by the          |                 |            |          |
                          | inheriting clients.  |                 |            |          |

@sap/cds-sqlite           | Driver package for   | =https-support… | 2018-08-30 |          |
                          | access to sqlite     | .sap.com        |            |          |
                          | database, including  |                 |            |          |
                          | setting up the       |                 |            |          |
                          | client, configuring  |                 |            |          |
                          | all the necessary    |                 |            |          |
                          | options to initiate  |                 |            |          |
                          | the connection and   |                 |            |          |
                          | handling database    |                 |            |          |
                          | specifics so that    |                 |            |          |
                          | they can be          |                 |            |          |
                          | processed on our     |                 |            |          |
                          | end.                 |                 |            |          |

@sap/di.code-validation.c | Code validation      | =https-support… | 2018-07-10 |          |
ore                       |                      | .sap.com        |            |          |

@sap/di.code-validation.g | grunt tasks for      | =https-support… | 2017-12-13 |          |
runt                      | execution of         | .sap.com        |            |          |
                          | codevalidation       |                 |            |          |

@sap/di.code-validation.j | A javascript code    | =https-support… | 2018-07-12 |          |
s                         | validator for DI     | .sap.com        |            |          |
                          | based on eslint,     |                 |            |          |
                          | implements           |                 |            |          |
                          | di.code-validation.… |                 |            |          |
                          | core API.            |                 |            |          |

@sap/di.code-validation.json -- No README

@sap/di.code-validation.x |                      | =https-support… | 2018-07-11 |          |
ml                        |                      | .sap.com        |            |          |

@sap/dwf-deploy           | SAP HANA Data        | =https-support… | 2018-03-06 |          |
                          | Warehousing          | .sap.com        |            |          |
                          | Foundation - Deploy  |                 |            |          |

@sap/dwf-dlm-backend      | SAP HANA Data        | =https-support… | 2018-03-06 |          |
                          | Warehousing          | .sap.com        |            |          |
                          | Foundation - DLM -   |                 |            |          |
                          | Backend              |                 |            |          |

@sap/dwf-dws-client       | client to consume    | =https-support… | 2018-03-26 |          |
                          | data warehouse       | .sap.com        |            |          |
                          | services             |                 |            |          |

@sap/dwf-generator        | SAP HANA Data        | =https-support… | 2018-03-06 |          |
                          | Warehousing          | .sap.com        |            |          |
                          | Foundation -         |                 |            |          |
                          | Generator            |                 |            |          |

@sap/dwf-ndso-backend     | Service backend of   | =https-support… | 2018-03-06 |          |
                          | the Native DataStore | .sap.com        |            |          |
                          | Object               |                 |            |          |

@sap/e2e-trace

@sap/edmx2csn             | Standard-Feature-Set | =https-support… | 2018-08-20 |          |
                          | EDMX to CSN          | .sap.com        |            |          |

@sap/eslint-plugin-webide | Custom ESlint rules  | =https-support… | 2018-08-15 |          |
-feature                  | and recommended      | .sap.com        |            |          |
                          | configuration        |                 |            |          |
                          | specific for SAP Web |                 |            |          |
                          | IDE features         |                 |            |          |

@sap/generator-cds        | Project generator    | =https-support… | 2018-08-30 |          |
                          | for cds projects     | .sap.com        |            |          |

@sap/grunt-sapui5-bestpra | Grunt tasks around   | =https-support… | 2018-07-17 |          |
ctice-build               | Devx grunt build     | .sap.com        |            |          |

@sap/grunt-sapui5-bestpra | Grunt tasks for      | =https-support… | 2018-07-09 |          |
ctice-test                | running unit and     | .sap.com        |            |          |
                          | integration tests    |                 |            |          |

@sap/hdbext               | HDB extension        | =https-support… | 2018-04-20 |          |
                          | library and utility  | .sap.com        |            |          |
                          | functions for using  |                 |            |          |
                          | SAP HANA in node.js  |                 |            |          |

@sap/hdi-dynamic-deploy   | HDI dynamic content  | =https-support… | 2018-03-19 |          |
                          | deployment           | .sap.com        |            |          |

@sap/instance-manager     | Node.js package for  | =https-support… | 2018-08-20 |          |
                          | creating and         | .sap.com        |            |          |
                          | deleting service     |                 |            |          |
                          | instances per tenant |                 |            |          |
                          | within an            |                 |            |          |
                          | application at       |                 |            |          |
                          | runtime.             |                 |            |          |

@sap/jobs-client          | Node.js client       | =https-support… | 2018-05-18 |          |
                          | library for job      | .sap.com        |            |          |
                          | scheduler service in |                 |            |          |
                          | XS2                  |                 |            |          |

@sap/logging              | Provides logging and | =https-support… | 2018-09-04 |          |
                          | tracing              | .sap.com        |            |          |
                          | functionalities for  |                 |            |          |
                          | Node.js applications |                 |            |          |

@sap/node-jwt             | JWT validation       | =https-support… | 2018-08-17 |          |
                          | library for Node.js  | .sap.com        |            |          |

@sap/node-vsi             | VSI bindings for     | =https-support… | 2018-08-17 |          |
                          | Node.js              | .sap.com        |            |          |

@sap/sds-deploy           | The deploy           | =https-support… | 2018-02-28 |          |
                          | application shall    | .sap.com        |            |          |
                          | add an Streaming     |                 |            |          |
                          | project (an          |                 |            |          |
                          | Streaming module in  |                 |            |          |
                          | XSA terms) into HANA |                 |            |          |
                          | Streaming option and |                 |            |          |
                          | start it.            |                 |            |          |

@sap/site-app-server      | Static file server   | =https-support… | 2018-03-29 |          |
                          | for applications     | .sap.com        |            |          |
                          | with deploy          |                 |            |          |
                          | capabilities         |                 |            |          |

@sap/site-content-deploye | SAP site deployer    | =https-support… | 2018-03-29 |          |
r                         | for independent mta  | .sap.com        |            |          |

@sap/site-entry           | SAP Portal Approuter | =https-support… | 2018-09-05 |          |
                          | for Fiori Launchpad  | .sap.com        |            |          |

@sap/textanalysis         | The Node.js module   | =https-support… | 2018-07-19 |          |
                          | to provide a native  | .sap.com        |            |          |
                          | API for text         |                 |            |          |
                          | analysis on the XSA  |                 |            |          |
                          | platform in HANA.    |                 |            |          |

@sap/textbundle           | Utility for texts    | =https-support… | 2018-02-07 |          |
                          | internationalizatio… | .sap.com        |            |          |
                          | n.                   |                 |            |          |

@sap/textmining           | Text Mining XSA      | =https-support… | 2018-01-26 |          |
                          | Node.js API          | .sap.com        |            |          |

@sap/xb-msg               | XB Messaging         | =https-support… | 2018-05-02 |          |
                          |                      | .sap.com        |            |          |

@sap/xb-msg-amqp-v091     | XB Messaging AMQP    | =https-support… | 2018-05-02 |          |
                          | V091                 | .sap.com        |            |          |

@sap/xb-msg-amqp-v100     | XB Messaging AMQP    | =https-support… | 2018-05-02 |          |
                          | V100                 | .sap.com        |            |          |

@sap/xb-msg-mqtt-v311     | XB Messaging MQTT    | =https-support… | 2018-05-02 |          |
                          | V311                 | .sap.com        |            |          |

@sap/xsenv                | Utility for easy     | =https-support… | 2018-01-18 |          |
                          | setup and access of  | .sap.com        |            |          |
                          | SAP HANA XS Advanced |                 |            |          |
                          | environment          |                 |            |          |
                          | variables            |                 |            |          |

@sap/xsjs                 | Compatibility layer  | =https-support… | 2018-05-29 |          |
                          | to run XS Classic    | .sap.com        |            |          |
                          | applications on XS   |                 |            |          |
                          | Advanced             |                 |            |          |

@sap/xsjs-test            | A Node.js shim for   | =https-support… | 2018-04-23 |          |
                          | XSEngine tests       | .sap.com        |            |          |

@sap/xsodata              | Expose data from a   | =https-support… | 2018-09-03 |          |
                          | HANA database as     | .sap.com        |            |          |
                          | OData V2 service     |                 |            |          |
                          | with help of         |                 |            |          |
                          | .xsodata files.      |                 |            |          |

@sap/xss-secure           | XSS Secure           | =https-support… | 2018-01-09 |          |
                          |                      | .sap.com        |            |          |

@sap/xssec
-->

