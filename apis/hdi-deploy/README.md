@sap/hdi-deploy
===============

`@sap/hdi-deploy` is a [Node.js](https://nodejs.org)-based deployment module for SAP HANA DI (HDI)-based persistence models, HDI Deployer for short. The HDI Deployer can be used in XS Advanced (XSA) and in SAP Cloud Platform (SAP CP)/Cloud Foundry (CF), and it is also used by the SAP Web IDE for interactive development scenarios. It can also be used in scenarios without XSA (or SAP CP), e.g. for deploying HDI persistence models into a HANA database where no XSA is installed.

For more information about HANA DI, please check the [SAP HANA Developer Guide](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.03/en-US/eaa4e37394ea4efba8148d595d025261.html) and the [SAP HANA Administration Guide](https://help.sap.com/viewer/6b94445c94ae495c83a19646e7c3fd56/2.0.03/en-US/3ef0ee9da11440e4b01708455b8497a9.html).

Usually, the HDI Deployer is packaged into a database module, a `db` module, as part of a Multi-Target Application (MTA) and is used to deploy HDI design-time artifacts of the `db` module to the respective HDI container. When an MTA is deployed via the Deploy Service, the `db` module is pushed first so that it can "prepare" the SAP HANA persistence; by the time defined services are started, the HDI container is ready for use.

The HDI Deployer can also be used without the Deploy Service and MTAs, without XSA, and also for interactive scenarios or automation scripts.

For an MTA with different modules, e.g. a `db` module, a Node.js module, etc., this looks as follows:

```
  +-----------------+    +-----------------+    +-----------------+
  | db module       |    | Node.js module  |    | ... module      |
  | w/ HDI Deployer |    |                 |    |                 |
  +-----------------+    +-----------------+    +-----------------+

           |                      |                      |
           |                      |                      |
 \/ deploy persistence       \/ read/write/extend persistence      
           |                      |                      |
           |                      |                      |

  +---------------------------------------------------------------+
  | HDI container                                                 |
  |                                                               |
  +---------------------------------------------------------------+
```

In a HANA-Service-Broker-based HDI setup, each module of the MTA is equipped with it's own technical database user for accessing the runtime schema of the HDI container.

The following diagram illustrates the different users who are involved in this setup with regard to privileges: the application users user1 and user2 who are bound to one of the modules each, and the HDI container's object owner (the #OO user) who is the owner of the objects in the database persistence of the MTA which are managed by HDI:

```
  +-----------------+    +-----------------+    +-----------------+
  | db module       |    | Node.js module  |    | ... module      |
  | w/ HDI Deployer |    |                 |    |                 |
  +-----------------+    +-----------------+    +-----------------+

                                  |                      |            o
                                  | --------------------------------- X application user user1
                                  |                      |       o
                                  |                      | ----- X application user user2
                                  |                      |

  +---------------------------------------------------------------+
  | HDI container                                                 |
  |                              db object 1      db object 2     |
  +-------------------------------------\-------------/-----------+
                                         \           /
                                      o   \         /
                                      X object owner (#OO user)
```

The HDI Deployer is packaged into the `db` module of the MTA. So, in order to use a new HDI Deployer, you need to reference a new version of the HDI Deployer in the `db` module's `package.json` file.

The HDI Deployer supports HANA 1 SPS11/SPS12 and HANA 2. The HDI Deployer assumes that for newer versions of HANA, a corresponding version of the HANA Service Broker is used to create the CF/XSA service bindings.

Note: The HDI Deployer assumes ownership of the `src/`, `cfg/`, and `lib/` folders in the bound target HDI container. Binding more than 1 instance of the HDI Deployer to the same HDI container as the target container, e.g. the `db` modules of 2 MTAs or 2 applications are bound to the same HDI container as the target container, is not supported and results in undefined behavior.

## README.md

**Installation**:
- [Integration into a Database Module](#integration-into-a-database-module)
- [Database Connection Details](#database-connection-details)
- [Deployment via Push and Tasks](#deployment-via-push-and-tasks)
- [Deployment via Local Run](#deployment-via-local-run)

**The Database Module**:
- [A Database Module's File System Structure](#a-database-modules-file-system-structure)
- [Delta Deployment and Undeploy Whitelist](#delta-deployment-and-undeploy-whitelist)
- [The default_access_role Role](#the-default_access_role-role)
- [The development_debug_role Role](#the-development_debug_role-role)
- [Reusable Database Modules](#reusable-database-modules)
- [Configuration File Templating](#configuration-file-templating)
- [Permissions to Container-External Objects](#permissions-to-container-external-objects)

**Configuration and Reconfiguration**:
- [Environment Variables for Applications](#environment-variables-for-applications)
- [Environment Variables for Infrastructure / Development Tools](#environment-variables-for-infrastructure--development-tools)
- [Options for Interactive Scenarios](#options-for-interactive-scenarios)
- [Ignore List](#ignore-list)
- [Supported Features](#supported-features)

**Dynamic Deployment**:
 - [Deployment via hdi-dynamic-deploy](#deployment-via-hdi-dynamic-deploy)
 
**Library Usage**:
 - [Using hdi-deploy as a Node.js library](#using-hdi-deploy-as-a-nodejs-library)


## Integration into a Database Module

Usually, `@sap/hdi-deploy` gets installed via a `package.json`-based dependency inside your application's `db` module:

`db/package.json`:

```
{
  "name": "deploy",
  "dependencies": {
    "@sap/hdi-deploy": "3.11.5"
  },
  "scripts": {
    "start": "node node_modules/@sap/hdi-deploy/"
  }
}
```
## Database Connection Details

Connection details for the database, e.g. host, port, credentials, certificates, hostname_in_certificate, encrypt and validate_certificate, are looked up by the HDI Deployer from the standard CF/XSA `VCAP_SERVICES` environment variable which contains the bound services.

In order to use mutual authentication, `client_authentication_private_key` and `client_authentication_certificate` can be supplied via the service binding.

For local testing, the HDI Deployer supports default configurations via the following configuration files:

- `default-env.json`: a JSON file which contains a set of environment variables and their values
- `default-services.json`: a JSON file which contains a set of service bindings

Details of a bound service from a HANA-Service-Broker-based service binding in CF/XSA usually look as follows:

``` JSON
{
  "name" : "foo",
  "label" : "hana",
  "tags" : [ "hana", "database", "relational" ],
  "plan" : "hdi-shared",
  "credentials" : {
    "schema" : "FOO",
    "user" : "FOO_345999596729_RT",
    "password" : "<password>",
    "hdi_user" : "FOO_645927945801_DT",
    "hdi_password" : "<password>",
    "host" : "srv1234567.host.name",
    "port" : "30115",
    "db_hosts" : [ {
      "port" : 30115,
      "host" : "srv1234567.host.name"
    } ],
    "url" : "jdbc:sap://srv1234567.host.name:30115/?currentschema=FOO",
    "driver" : "com.sap.db.jdbc.Driver"
  }
}
```

Here, the credentials section contains all the data which is needed by the HDI Deployer for connecting to the database. The HDI Deployer uses the `hdi_user`/`hdi_password` credentials from a direct service binding. The `hdi_user` should be minimal, i.e. only have the privileges required to fulfill the deployment. In most cases, access to a container FOO's API in the FOO#DI schema is sufficient.

### Splitting passwords across services

The `password` property and the `hdi_password` property can also be specified as a combination of passwords from other bound services. Consider the following service binding:

``` JSON
{
    "hana" : [],
    "user-provided" : [ 
      {
      "name" : "split_password_service",
      "label" : "user-provided",
      "tags" : [],
      "credentials" : {
        "user" : "user",
        "schema": "schema",
        "password": ["password_and_hdi_password_service", "password_only_service"],
        "hdi_password": ["password_and_hdi_password_service", "hdi_password_only_service"],
        "tags" : [ "hana" ]
      }
    },
    {
      "name" : "password_and_hdi_password_service",
      "label" : "user-provided",
      "tags" : [],
      "credentials" : {
        "password" : "PASSWORD",
        "hdi_password": "HDI_PASSWORD",
        "tags" : [ "password" ]
      }
    },
    {
      "name" : "hdi_password_only_service",
      "label" : "user-provided",
      "tags" : [],
      "credentials" : {
        "hdi_password": "123",
        "tags" : [ "password" ]
      }
    },
    {
      "name" : "password_only_service",
      "label" : "user-provided",
      "tags" : [],
      "credentials" : {
        "password" : "456",
        "tags" : [ "password" ]
      }
    } ]
  }
```

When the service `shared_password_service` is used, the services specified in `password` and/or `hdi_password` will be checked and their `password` and/or `hdi_password` will be concatenated. The services will be accessed in the order they are defined. The resulting `shared_password_service` would have the `password` "PASSWORD456" and the `hdi_password` "HDI_PASSWORD123".

0 to n services can be specified, specifying 0 services results in the `password`/`hdi_password` ''.

### VCAP_SERVICES

Connection details for the database are stored in the following format in the [`VCAP_SERVICES`](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES) environment variable:

`VCAP_SERVICES`:
```
{
  "hana" : [
    <hana-service-binding-1>,
    <hana-service-binding-2>,
    ...
    <hana-service-binding-n>
  ],
  "user-provided" : [
    <user-provided-service-binding-1>,
    <user-provided-service-binding-2>,
    ...
    <user-provided-service-binding-m>
  ]
}
'
```

### default-env.json

A `default-env.json` file can contain a set of environment variables and their values. The HDI Deployer will pick up these settings on startup:

`default-env.json:`
```
{
  "TARGET_CONTAINER" : "<name-of-the-service-instance-to-use-as-deployment-target>",
  "VCAP_SERVICES" : {
    "hana" : [
      <hana-service-binding-1>,
      <hana-service-binding-2>,
      ...
      <hana-service-binding-n>
    ],
    "user-provided" : [
      <user-provided-service-binding-1>,
      <user-provided-service-binding-2>,
      ...
      <user-provided-service-binding-m>
    ]
  }
}
```

`default-env.json` example file with a target container binding and a user-provided service:

```
{
  "TARGET_CONTAINER" : "target-service",
  "VCAP_SERVICES" : {
    "hana" : [ {
     "name" : "target-service",
      "label" : "hana",
      "tags" : [ "hana", "database", "relational" ],
      "plan" : "hdi-shared",
      "credentials" : {
        "schema" : "SCHEMA",
        "hdi_user" : "USER_DT",
        "hdi_password" : "PASSWORD_DT",
        "certificate" : "-----BEGIN CERTIFICATE-----\nABCD...1234\n-----END CERTIFICATE-----\n",
        "host" : "host",
        "port" : "30015"
      }
    } ],
    "user-provided" : [ {
      "name" : "GRANTING_SERVICE",
      "label" : "user-provided",
      "tags" : [ ],
      "credentials" : {
        "schema" : "SYS",
        "user" : "GRANT_USER",
        "password" : "PASSWORD",
        "procedure_schema" : "PRIVILEGE_PROCEDURE_GRANTOR_DEFINER",
        "procedure" : "GRANT",
        "type" : "procedure",
        "tags" : [ "hana" ]
      }
    } ]
  }
}
```

## Deployment via Push and Tasks

There are two ways of using the HDI Deployer as an application:

- Push the application with one instance. The application will then start and do the HDI deployment of the data model. After a successful deployment, the application will enter an idle loop and can be stopped.
- Push the application with zero instances and then trigger a task on the application which does the HDI deployment of the data model. After deployment of the data model, the task will be completed. An instance of the application is only running while the task is being executed.

For both scenarios, ensure that the `health-check-type` in the manifest is set to `process`, instead of the default, `port`-based health check.

In order to push the application with zero instances, the application can either be pushed with the `--no-start` option or the number of instances can be set to zero in the `manifest.yml` file via `instances: 0`.

The deployment task can be started via `xs run-task <app> deployment-task "npm run start -- --exit" --wait-for-completion` on XSA. The task will run and the call will propagate the success/failure of the deployment task. On CF, the `--wait-for-completion` option is not available and the status of the task needs to be checked periodically.

## Deployment via Local Run

An HDI deployment can also be triggered without using an application. In this case, the HDI Deployer will be run locally and directly connects to the database. This is possible in the following scenarios: the database is accessible locally from a network point of view or a network tunnel with a local endpoint was established, e.g. a `cf ssh`-based tunnel is set up in CF.

Apply the following steps to run the HDI Deployer locally: run `npm install` in the db module's folder to install the HDI Deployer module, then create a `default-env.json` file in the db module's folder which contains the required service bindings and the `TARGET_CONTAINER` setting, then run `npm run start -- --exit` in the db module's folder to trigger the deployment of the data model.

If the database uses SSL/TLS encryption, please ensure that the `hostname_in_certificate` value is set up correctly in the service bindings, because the network tunnel's local endpoint (e.g. localhost:9000) doesn't match the hostname in the SSL/TLS certificate.

## A Database Module's File System Structure

The HDI Deployer expects the following file system structure for the HDI content in your `db` module:

- `src/`: folder which contains your HDI source artifacts
- `cfg/`: optional folder with HDI configuration artifacts
- `package.json`: this file is used by npm (the Node.js package manager) to bootstrap and start the application

Other files in the root directory will be ignored by `@sap/hdi-deploy`.

Please note that the `cfg/` folder also might need a `.hdiconfig` file, e.g. in case `.hdbsynonymconfig` files are placed there.

In combination with reusable database modules, the HDI Deployer will also consider database modules which are located in the `node_modules/` folder and which will be mapped to a corresponding sub-folder hierarchy in the container's `lib/` folder.

Note: The design-time files should be protected against unauthorized modifications to guard against unwanted undeployments or deployment of foreign objects. For applications running on XSA or Cloud Foundry, this is taken care of by the platform.

## Delta Deployment and Undeploy Whitelist

The HDI Deployer implements a delta-based deployment strategy:

On startup, the HDI Deployer recursively scans the local `src/` and `cfg/` folders, processes config templates, looks at the HDI container at the server-side and calculates the set of added, modified, and deleted files based on the difference between the local file system state and the deployed file system state of the server-side HDI container.

In normal operation, the HDI Deployer will schedule only the set of added and modified files for deployment. The set of deleted files is not scheduled for undeployment.

In order to undeploy deleted files, an application needs to include an undeploy whitelist via an `undeploy.json` file in the root directory of the `db` module (right beside the `src/` and `cfg/` folders). The undeploy whitelist `undeploy.json` file is a JSON document with a top-level array of file names:

`undeploy.json`:

    [
        "src/Table.hdbcds",
        "src/Procedure.hdbprocedure"
    ]

The file must list all artifacts which should be undeployed. The file path of the artifacts must be relative to the root directory of the `db` module, must use the HDI file path delimiter '/', and must be based on the HDI server-side folder structure. In case of reusable database modules, the server-side top-level folder `lib/` needs to be used instead of the local folder `node_modules/`.

For interactive scenarios, it's possible to pass the `auto-undeploy` option to the HDI Deployer, e.g.

    node deploy --auto-undeploy

In this case, the HDI Deployer will ignore the undeploy whitelist `undeploy.json` file and will schedule all deleted files in the `src/` and `cfg/` folders for undeployment.

## The default_access_role Role

When an HDI container service instance is created by the HANA Service Broker, e.g. service instance `foo` with schema name `FOO`, the broker creates an HDI container `FOO` (consisting of the runtime schema `FOO`, the HDI metadata and API schema `FOO#DI`, and the object owner `FOO#OO`) and a global access role `FOO::access_role` for the runtime schema. This access role is equipped with a default permission set for the runtime schema which consists of `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE`, `CREATE TEMPORARY TABLE`, and `SELECT CDS METADATA` on the runtime schema `FOO`.

Every time the service instance is bound to an application, the broker creates 2 new users which are specific to this binding. The first user is the application user who is named `user` in the instance's credentials. This user is used by the application to access the HDI container's runtime schema `FOO`. This user is equipped with the service instance's global access role `FOO::access_role`. The second user is the HDI API user who is named `hdi_user` in the credentials. This user is equipped with privileges for the container's APIs in the `FOO#DI` schema.

The following diagram illustrates the binding-specific application users and the role of the global access role (the HDI API users and the bindings for the HDI Deployer are not shown for simplicity):

```
  +-----------------+    +-----------------+    +-----------------+
  | db module       |    | Node.js module  |    | ... module      |
  | w/ HDI Deployer |    |                 |    |                 |
  +-----------------+    +-----------------+    +-----------------+

                                  |                      |            o
                                  | --------------------------------- X application user user1
                                  |                      |       o                        \
                                  |                      | ----- X application user user2  \
                                  |                      |                           \      \
                                                                                      \      \
  +---------------------------------------------------------------+           role FOO::access_role
  | HDI container FOO                                             |                   /
  |                                                               | SELECT/INSERT/... on schema FOO
  +---------------------------------------------------------------+
```

Exemplary service binding:

```
{
   "hana" : [ {
     "name" : "foo",
     "label" : "hana",
     "tags" : [ "hana", "database", "relational" ],
     "plan" : "hdi-shared",
     "credentials" : {
       "schema" : "FOO",
       "user" : "FOO_345999596729_RT",
       "password" : "<password>",
       "hdi_user" : "FOO_645927945801_DT,
       "hdi_password" : "<password>",
       "host" : "srv1234567.host.name",
       "port" : "30115",
       "db_hosts" : [ {
         "port" : 30115,
         "host" : "srv1234567.host.name"
       } ],
       "url" : "jdbc:sap://srv1234567.host.name:30115/?currentschema=FOO",
       "driver" : "com.sap.db.jdbc.Driver"
     }
   } ]
}
```

In order to assign roles from the HDI content to the application binding users (the `user` users), the HDI Deployer implements an automatic assignment of the `default_access_role` role if it is present in the deployed content:

If a role definition file exists at the path `src/defaults/default_access_role.hdbrole`, and this file defines a role named `default_access_role`, and this file is included in the deployment (e.g. not excluded via `include-filter`), then the HDI Deployer grants the deployed `default_access_role` role to the service instance's global access role (e.g. `FOO::access_role`). In addition, the HDI Deployer revokes all default permissions (e.g. `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE`, `CREATE TEMPORARY TABLE`, and `SELECT CDS METADATA` on the runtime schema `FOO`) from the global access role. If the `default_access_role` is undeployed, the default permission set for the runtime schema will be restored.

Note:  If you use a `.hdinamespace` file in `src/` which defines a real namespace prefix for subfolders, then you need to put a `.hdinamespace` file with the empty namespace `"name" : ""` at `src/defaults/` to ensure that the role can be named `default_access_role`.

The following diagram illustrates the binding-specific application users, the role of the global access role, and the container-specific default access role:

```
  +-----------------+    +-----------------+    +-----------------+
  | db module       |    | Node.js module  |    | ... module      |
  | w/ HDI Deployer |    |                 |    |                 |
  +-----------------+    +-----------------+    +-----------------+

                                  |                      |            o
                                  | --------------------------------- X application user user1
                                  |                      |       o                        \
                                  |                      | ----- X application user user2  \
                                  |                      |                           \      \
                                                                                      \      \
  +---------------------------------------------------------------+           role FOO::access_role
  | HDI container FOO                                             |                      /
  |                                role default_access_role ----------------------------+
  |                                       /         \             |
  |                                role role1     role role2      |
  |                                   /              /   \        |
  |                 structured privileges       DCL role 1 / 2    |   
  +---------------------------------------------------------------+
```

Note: The `default_access_role` is assumed to be an "umbrella" role which aggregates other roles.

A role with the default permission set which is granted by the HANA Service Broker on container creation looks as follows:

`default_permissions_role.hdbrole`:

```
{
   "role":{
      "name":"default_permissions_role",
      "schema_privileges":[
         {
            "privileges":[
               "SELECT",
               "INSERT",
               "UPDATE",
               "DELETE",
               "EXECUTE",
               "CREATE TEMPORARY TABLE",
               "SELECT CDS METADATA"
            ]
         }
      ]
   }
}
```

## The development_debug_role Role

Similarly to the default_access_role, a development_debug_role can be used to add additional privileges to the access role. This is only intended for development and debugging, not for productive use!

If a role definition file exists at the path `src/defaults/development_debug_role.hdbrole`, and this file defines a role named `development_debug_role`, and this file is explicitly included in the deployment via the `--deploy` option, then the HDI Deployer grants the deployed `development_debug_role` role to the service instance's global access role (e.g. `FOO::access_role`).

In order to remove the privileges granted this way, the file has to be undeployed.

## Reusable Database Modules

In order to allow that an application uses (parts of) the database persistence of a reusable component inside its own persistence model, the HDI Deployer allows to link/include the design-time files of reusable components in a consuming application in an automated way. This mechanism is based on the Node.js package management mechanism for defining, publishing, and consuming reusable database modules which also supports versioning based on the semantic versioning concepts (cf. http://semver.org).

A reusable database module is considered to have the same `src/` and `cfg/` folder structure as a normal database module. The `src/.hdiconfig` file is mandatory and used by the module mechanism as an indicator that the `src/` and `cfg/` folders belong to a consumable, reusable database module. In addition, the reusable database module needs to have a `package.json` file which defines the module's name, the module's version, etc.

A complete reusable database module looks as follows:

```
/
+-- src/
|   +-- .hdiconfig
|   +-- <source files ...>
+-- cfg/
|   +-- <optional configuration files ...>
+-- package.json
```

The `package.json` file contains the module’s name, description, version, repository URL, and the set of files which belong to the module:

`package.json`:

```
{
  "name": "module1",
  "description": "A set of reusable database objects",
  "version": "1.3.1",
  "repository": {
    "url": "git@your.gitserver:modules/module1.git"
  },
  "files": [
    "src",
    "cfg",
    "package.json"
  ]
}
```

The reusable database module should be published to a Node.js package management compliant object repository.

Consumption of a reusable database module is done by adding a dependency in the consuming module's `package.json` file, right beside the dependency to `@sap/hdi-deploy`:

```
{
  "name": "deploy",
  "dependencies": {
    "@sap/hdi-deploy": "3.11.5",
    "module1": "1.3.1",
    "module2": "1.7.0"
  },
  "scripts": {
    "start": "node node_modules/@sap/hdi-deploy/"
  }
}
```

Here, the consuming module requires `module1` in version `1.3.1` and `module2` in version `1.7.0`.

When running `npm install` to download and install the dependencies which are listed in the dependencies section of the `package.json` file, `npm` will also download the reusable database modules and places them into the `node_modules/` folder of the consuming module. For each module a separate subfolder is created with the name of the module.

When the HDI Deployer is triggered to do the actual deployment of the (consuming) database module, it scans the `node_modules/` folder and virtually integrates the `src/` and `cfg/` folders of found reusable database modules into the (consuming) database module’s `lib/` folder. Reusable database modules are identified by the mandatory `src/.hdiconfig` file.

On successful deployment, the HDI container will contain the consumed modules below the root-level `lib/` folder, e.g.

```
/
+-- src/
+-- cfg/
+-- lib/
|   +-- module1/
|   |   +-- src/
|   |   +-- cfg/
|   +-- module2/
|       +-- src/
|       +-- cfg/
```

For the time being, it’s not allowed to recursively include reusable database modules.

The `cfg/` folders of reusable database modules are also subject to configuration file templating.

## Configuration File Templating

The HDI Deployer implements a templating mechanism for HDI configuration files, e.g. configuration files for synonyms, projection views, etc., based on services which are bound to the `db` module application. By means of this templating mechanism, it is possible to configure synonyms, projection views, etc. to point to the right database schema without knowing the schema name at development time.

On startup, the HDI Deployer recursively scans the local `cfg/` folder and picks up all files with a `.*config` suffix, e.g. all `.hdbsynonymconfig`, `.hdbvirtualtableconfig`, etc. files. For all collected files which contain `.configure` markers in their content, it applies the configuration templating and creates transient configuration files which are then deployed to the HDI container.

For a synonym configuration file `cfg/LOCAL_TARGET.hdbsynonymconfig`

    {
        "LOCAL_TARGET" : {
            "target" : {
                "schema.configure"    : "logical-external-service/schema",
                "database.configure"  : "logical-external-service/database",
                "object"              : "TARGET"
            }
        }
    }

the section

                "schema.configure"    : "logical-external-service/schema",
                "database.configure"  : "logical-external-service/database",
                "object"              : "TARGET"

will be transformed by the templating mechanism into

                "schema"              : "THE_SCHEMA",
                "database"            : "THE_DATABASE",
                "object"              : "TARGET"

where `THE_SCHEMA` and `THE_DATABASE` are the values for the `schema` and `database` fields of the bound service `logical-external-service`, which are denoted by the path expressions`logical-external-service/schema` and `logical-external-service/database`.

If a field in the service is missing, it will not be configured and will be removed instead, e.g. `database` might be optional.

The names of the services are subject to the service replacements mechanism, which can be used to map a real service, e.g. `real-external-service`, to a logical service name which is used in the configuration files, e.g. `logical-external-service`.

It's not always applicable to use `schema.configure`, `database.configure`, etc. in the configuration template files. Therefore, the HDI Deployer provides a generic way of copying a set of properties from the bound service, e.g. schema, database, remote source, etc. if they are present, although the template file doesn't mention them.

For the configuration file `cfg/LOCAL_TARGET.hdbsynonymconfig` this could looks as follows:

    {
        "LOCAL_TARGET" : {
            "target" : {
                "*.configure"         : "logical-external-service",
                "object"              : "TARGET"
            }
        }
    }

When the HDI Deployer encounters a `*.configure` entry, it simply copies all well-known fields which are present in the bound service into the configuration file. The well-known fields are currently `remote`, `database`, and `schema`.

The HDI Deployer also supports old-style `.hdbsynonymtemplate` template files: If a `.hdbsynonymtemplate` file is found in the `cfg/` or `src/` folder, then it is processed as a configuration template file and a transient file with the suffix  `.hdbsynonymconfig` is created. A field `grantor` is replaced with the `schema` value from the referenced service; so, a `grantor` field is equivalent to a `"schema.configure" : "the-service/schema"` entry in a configuration template file.

## Permissions to Container-External Objects

An HDI container is by default equipped with nearly zero database privileges, e.g. the object owner (`#OO` user) is mainly equipped with the `CREATE ANY` privilege on the container's runtime schema (e.g. schema `FOO` for an HDI container `FOO`). Since HANA 2 SPS00, the object owner is equipped with an additional restricted set of privileges for system views in the database's `SYS` schema, e.g. `SYS.VIEWS` or `SYS.TABLES`. These system views apply an additional row-level filter based on the object owner's other privileges, e.g. the object owner can only see metadata in `SYS.VIEWS` for views he has privileges on. So, without additional privileges, the object owner can only see metadata for the objects in his container schema.

In order to access database objects inside other database schemata or other HDI containers, and in order to deploy synonyms into the HDI container which point to these container-external objects, at least the object owner needs additional privileges, e.g. for an object `object` in schema `X` `SELECT` privileges on `X.object`:

```
  +---------------------------------------------------------------+      +------------------------+
  | HDI container FOO                                             |      | other schema X         |
  |                                                synonym ------------------------> object       |
  +---------------------------------------------------/-----------+      +-------------\----------+
                                                     /                                  \
                                      o             /                                    \
                                      X object owner FOO#OO -------------------- SELECT on X.object
```

Please also refer to the official [Using Synonyms to Access External Schemas and Objects in XS Advanced](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.02/en-US/bdc9f7ae66134c279a5f3683bba9b361.html) guide.

#### .hdbrevokes Files

Starting with version 3.8, the deployer now allows revoking rights. Anything that can be granted via .hdbgrants can be revoked via .hdbrevokes. Both files, .hdbgrants and .hdbrevokes use the same structure.
For more information on the structure of these files, see the section about [.hdbgrants Files](#hdbgrants-files).

The .hdbrevokes file will be processed before the .hdbgrants file.

#### .hdbgrants Files

In order to automatically assign privileges to the object owner and/or the application binding users, the HDI Deployer provides `.hdbgrants` files with a syntax similar to `.hdbrole` files:

An `.hdbgrants` file has the following structure:

`granting-service.hdbgrants`:

```
{
  "granting-service": {
    "object_owner": {
      <privileges>
    },
    "application_user": {
      <privileges>
    }
  }
}
```

The top-level keys define the names of the bound services which "grant" the privileges, these are the "grantors", e.g. `granting-service` in the example. The next level defines to which users the privileges will be granted, these are the "grantees": `object_owner` is used for the HDI container's object owner, and `application_user` marks the application users which are bound to the application modules, e.g. the Node.js module. The third level defines the set of privileges in a `.hdbrole`-like structure.

On startup, the HDI Deployer looks for `.hdbgrants` files and processes them as follows: For each grantor in the file, the HDI Deployer looks up a bound service with the name (subject to service replacements), connects to the database with the service's credentials, and grants the specified privileges to the grantees. If the `schema` field is omitted for a privilege, then the grantor's `schema` property is used. If the `name` field in a `global_object_privileges` element of type `REMOTE SOURCE` is omitted, then the grantor's `remote` property is used.

For backwards compatibility, also the suffix `.hdbsynonymgrantor` is supported.

Example of a `cfg/external-access.hdbgrants` file with some privileges for the object owner:

```
{
  "external-access": {
    "object_owner": {
      "system_privileges" : [
        {
          "privileges" : [ "SYSTEM_PRIVILEGE_1" ],
          "privileges_with_admin_option" : [ "SYSTEM_PRIVILEGE_2", "SYSTEM_PRIVILEGE_3" ]
        }
      ],
      "global_roles" : [
        {
          "roles" : [ "GLOBAL_ROLE_1", "GLOBAL_ROLE_2" ],
          "roles_with_admin_option" : [ "GLOBAL_ROLE_3", "GLOBAL_ROLE_4" ]
        }
      ],
      "schema_privileges" : [
        {
          "privileges" : [ "INSERT", "UPDATE" ],
          "privileges_with_grant_option" : [ "SELECT" ]
        }
      ],
      "schema_roles" : [
        {
          "roles" : [ "SCHEMA_ROLE_1", "SCHEMA_ROLE_2" ],
          "roles_with_admin_option" : [ "SCHEMA_ROLE_3", "SCHEMA_ROLE_4" ]
        }
      ],
      "object_privileges" : [
        {
          "name": "AN_OBJECT",
          "privileges": [ "INSERT", "UPDATE" ],
          "privileges_with_grant_option" : [ "SELECT" ]
        }
      ],
      "global_object_privileges" : [
        {
          "name" : "A_REMOTE_SOURCE",
          "type" : "REMOTE SOURCE",
          "privileges" : [ "CREATE VIRTUAL TABLE" ],
          "privileges_with_grant_option" : [ "CREATE VIRTUAL PROCEDURE" ]
        }
      ]
    }
  }
}
```

The following elements and keys are supported for backwards compatibility or for compatibility with `.hdbrole`:

- `container_roles`: grant roles from an HDI container; superseded by `schema_roles` which works for normal schemas and HDI containers
```
      "container_roles" : [ "SCHEMA_ROLE_1", "SCHEMA_ROLE_2" ]
```
- `roles`: grant global roles; superseded by `global_roles`:
```
      "roles" : [ "GLOBAL_ROLE_1", "GLOBAL_ROLE_2" ]
```
- string-array-style roles and `names` key (maps to the non-grant/admin-option variant):
```
      "global_roles" : [
        "GLOBAL_ROLE_1",
        {
          "roles" : [ "GLOBAL_ROLE_1", "GLOBAL_ROLE_2" ]
        },
        {
          "names" : [ "GLOBAL_ROLE_1", "GLOBAL_ROLE_2" ]
        },
        {
          "roles_with_admin_option" : [ "GLOBAL_ROLE_3", "GLOBAL_ROLE_4" ]
        },
        "GLOBAL_ROLE_2"
      ]
```

If any non-container privileges are used, then the object owner (`#OO` user) will need to be given these privileges WITH GRANT option by a user-defined granting-service. Otherwise it won't be able to grant these privileges to e.g. a role in the container.

#### Creating a Granting Service

The HDI Deployer supports the following types of granting-services:

- `hdi`: an HDI container with access to the container's GRANT APIs
- `sql`: a technical database user with GRANT privileges for the required object privileges, roles, system privileges, etc.
- `procedure`: a technical database user with EXECUTE privileges on a stored procedure which has GRANT privileges for the required object privileges, roles, system privileges, etc.
- `ignore`: grants were already given at the database-level and the HDI Deployer will ignore the content of the `.hdbgrants` file.

For the HDI container case, the corresponding service can simply be bound to the db module application. The HDI Deployer recognizes the bound service by its `hdi_user` value in the credentials section and calls the container's API procedures to grant the privileges from the `.hdbgrants` file.

In case a technical database user is used, a 'user-defined service' must be created for this purpose in the same space as the container. The service needs to be set up with the permissions of a specified database user to connect to the database and to grant the privileges specified in the `.hdbgrants` files during application deployment.

Such a user-provided service can be created as follows:

- Open a command shell and log on to XSA:
`xs login`
- Change to the target space where you want to create the user-defined service:
`xs target -s <SPACE>`
- Create the user-defined service (e.g. `grantor-service`):
`xs cups grantor-service -p '{ "host": "host.acme.com", "port": "30015", "certificate": "<myCertificate>", "user": "TARGET_USER", "password": "Grant_123", "schema": "TARGET_SCHEMA", "tags": [ "hana" ] }'`
  - `"host"/"port"`: Required for the connection to the database: port is the SQL port of the index server.
  - `"certificate"`: If the database is configured to only accept secure connections, then the granting-service requires an SSL certificate that must be included in the user-provided service, for example, using the "certificate":"<myCertificate>" parameter.
  - `"user"/"password"`: Connection details for a database user that has grant permissions for the objects in the schema.
  - `"schema"`: The database schema that contains the objects to which access is to be granted.
  - `"type"`: The type of the grantor mechanism; valid values are `"hdi"`, `"sql"`, or `"procedure"`. If the type is not specified, then the type is auto-sensed (see details below).
- Use the command `xs services` to display a list of services available in the current space; the 'grantor-service' service should be visible.

For Cloud Foundry, use the corresponding `cf` commands.

Note: Starting with version 3.0.0 of the HDI Deployer, the `"host"`, `"port"`, and `"certificate"` parameters are no longer required since they can be obtained from the target container binding. In this case, you must only specify the `"user"`, `"password"`, and `"schema"` when creating the user-provided service, e.g. `xs cups grantor-service -p '{ "user": "TARGET_USER", "password": "Grant_123", "schema": "TARGET_SCHEMA", "tags": [ "hana" ] }'`.

If the `"type"` is not specified, then the type is selected based on the following rule: if the field `hdi_user` is present, then the type is auto-sensed as `hdi`; otherwise, the type is set to `sql`.

If the technical database user does not have GRANT privileges by its own, but only EXECUTE privileges on a stored procedure which can grant the privileges, then the following settings are required:

- At the database, a GRANT procedure must exist (or be visible) in the schema which is used in the user-provided service; an example is shown below.
- The technical database user must have EXECUTE privileges on the GRANT procedure.
- The name of the GRANT procedure must be specified in the user-provided service in the `"procedure"` field, e.g. `"procedure": "GRANT"`.
- The scheme name of the GRANT procedure can be specified in the user-provided service in the `"procedure_schema"` field, e.g. `"procedure_schema": "A_SCHEMA"`.
- The user-provided service must contain a `"type"` field with the value `"procedure"`.

For the different types of privileges, the following fields are passed to the GRANT procedure:

| PRIVILEGE_TYPE | PRIVILEGE_NAME | OBJECT_SCHEMA | OBJECT_NAME | OBJECT_TYPE | GRANTEE_SCHEMA | GRANTEE_NAME | GRANTABLE |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SCHEMA_OBJECT_PRIVILEGE | privilege | schema | object | NULL | NULL | grantee | TRUE/FALSE |
| GLOBAL_OBJECT_PRIVILEGE | privilege | NULL | object | type | NULL | grantee | TRUE/FALSE |
| SCHEMA_ROLE | NULL | schema | role | NULL | NULL | grantee | TRUE/FALSE |
| GLOBAL_ROLE | NULL | NULL | role | NULL | NULL | grantee | TRUE/FALSE |
| SCHEMA_PRIVILEGE | privilege | NULL | schema | NULL | NULL | grantee | TRUE/FALSE |
| SYSTEM_PRIVILEGE | privilege | NULL | NULL | NULL | NULL | grantee | TRUE/FALSE |

Note: This procedure does not work for HANA1 SPS11, since `REPLACE_REGEXPR` is not supported. Please use the sample procedure provided with older releases of the deployer.
The old sample procedure does not correctly handle component names of system privileges in .hdbgrants files.

Example of a GRANT procedure:

```
CREATE PROCEDURE GRANT(
  IN PRIVILEGES TABLE (
    PRIVILEGE_TYPE NVARCHAR(128), -- 'SCHEMA_OBJECT_PRIVILEGE'
                                  -- 'GLOBAL_OBJECT_PRIVILEGE'
                                  -- 'SCHEMA_ROLE'
                                  -- 'GLOBAL_ROLE'
                                  -- 'SCHEMA_PRIVILEGE'
                                  -- 'SYSTEM_PRIVILEGE'
    PRIVILEGE_NAME NVARCHAR(256), -- cf. SYS.PRIVILEGES
    OBJECT_SCHEMA NVARCHAR(256),  -- NULL or schema
    OBJECT_NAME NVARCHAR(256),
    OBJECT_TYPE NVARCHAR(128),    -- NULL or 'REMOTE SOURCE'
    GRANTEE_SCHEMA NVARCHAR(256), -- NULL or schema
    GRANTEE_NAME NVARCHAR(256),
    GRANTABLE NVARCHAR(5)         -- 'TRUE' or 'FALSE'
  )
)
LANGUAGE SQLSCRIPT
SQL SECURITY DEFINER
AS
BEGIN
  DECLARE ERROR CONDITION FOR SQL_ERROR_CODE 10000;
  DECLARE CURSOR PRIVILEGES_CURSOR FOR SELECT * FROM :PRIVILEGES;

  -- TODO: add checks for valid grantees, e.g. check with _SYS_DI#<group>.M_CONTAINER_SCHEMAS
  --       or with SYS.USERS and creator and grantee like '%#OO'
  -- TODO: keep only functionality that should be allowed, e.g. only allow to grant schema-local
  --       roles, but no object privileges, etc.

  FOR PRIVILEGE AS PRIVILEGES_CURSOR
  DO
    DECLARE TO_GRANTEE_CLAUSE NVARCHAR(512);
    DECLARE GRANTABLE_CLAUSE NVARCHAR(512) = '';

    IF PRIVILEGE.GRANTEE_SCHEMA IS NULL THEN
      TO_GRANTEE_CLAUSE = ' TO "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.GRANTEE_NAME) || '"';
    ELSE
      TO_GRANTEE_CLAUSE = ' TO "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.GRANTEE_SCHEMA)
                                  || '"."' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.GRANTEE_NAME) || '"';
    END IF;

    IF PRIVILEGE.GRANTABLE = 'TRUE' THEN
      IF PRIVILEGE.PRIVILEGE_TYPE = 'SYSTEM_PRIVILEGE' OR
         PRIVILEGE.PRIVILEGE_TYPE = 'GLOBAL_ROLE' OR
         PRIVILEGE.PRIVILEGE_TYPE = 'SCHEMA_ROLE' THEN
        GRANTABLE_CLAUSE = ' WITH ADMIN OPTION';
      ELSE
        GRANTABLE_CLAUSE = ' WITH GRANT OPTION';
      END IF;
    ELSEIF PRIVILEGE.GRANTABLE != 'FALSE' THEN
      SIGNAL ERROR SET MESSAGE_TEXT = 'unsupported value for GRANTABLE: '
                                      || PRIVILEGE.GRANTABLE;
    END IF;

    IF PRIVILEGE.PRIVILEGE_TYPE = 'SCHEMA_OBJECT_PRIVILEGE' THEN
      EXEC 'GRANT "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.PRIVILEGE_NAME) || '"'
        || ' ON "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_SCHEMA)
                   || '"."' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_NAME) || '" '
        || TO_GRANTEE_CLAUSE
        || GRANTABLE_CLAUSE;
    ELSEIF PRIVILEGE.PRIVILEGE_TYPE = 'GLOBAL_OBJECT_PRIVILEGE' THEN
      IF PRIVILEGE.OBJECT_TYPE = 'REMOTE SOURCE' THEN
        EXEC 'GRANT "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.PRIVILEGE_NAME) || '"'
          || ' ON ' || PRIVILEGE.OBJECT_TYPE || ' "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_NAME) || '" '
          || TO_GRANTEE_CLAUSE
          || GRANTABLE_CLAUSE;
      ELSE
        SIGNAL ERROR SET MESSAGE_TEXT = 'unsupported value for OBJECT_TYPE for GLOBAL_OBJECT_PRIVILEGE: '
                                        || PRIVILEGE.OBJECT_TYPE;
      END IF;
    ELSEIF PRIVILEGE.PRIVILEGE_TYPE = 'SCHEMA_ROLE' THEN
      EXEC 'GRANT "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_SCHEMA)
                     || '"."' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_NAME) || '" '
        || TO_GRANTEE_CLAUSE
        || GRANTABLE_CLAUSE;
    ELSEIF PRIVILEGE.PRIVILEGE_TYPE = 'GLOBAL_ROLE' THEN
      EXEC 'GRANT "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_NAME) || '" '
        || TO_GRANTEE_CLAUSE
        || GRANTABLE_CLAUSE;
    ELSEIF PRIVILEGE.PRIVILEGE_TYPE = 'SCHEMA_PRIVILEGE' THEN
      EXEC 'GRANT "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.PRIVILEGE_NAME) || '"'
        || ' ON SCHEMA "' || ESCAPE_DOUBLE_QUOTES(PRIVILEGE.OBJECT_NAME) || '" '
        || TO_GRANTEE_CLAUSE
        || GRANTABLE_CLAUSE;
    ELSEIF PRIVILEGE.PRIVILEGE_TYPE = 'SYSTEM_PRIVILEGE' THEN
      EXEC 'GRANT "' || REPLACE_REGEXPR('\.' IN ESCAPE_DOUBLE_QUOTES(PRIVILEGE.PRIVILEGE_NAME) WITH '"."') || '"'
        || TO_GRANTEE_CLAUSE
        || GRANTABLE_CLAUSE;
    ELSE
      SIGNAL ERROR SET MESSAGE_TEXT = 'unsupported value for PRIVILEGE_TYPE: '
                                      || PRIVILEGE.PRIVILEGE_TYPE;
    END IF;
  END FOR;
END;
```

#### Defining the Granting Service in the mta[d].yaml

If the container needs a granting-service, then besides the service itself, the Application Development Descriptor mta.yaml needs to be adjusted for the deployer to be able to find the service. The mta.yaml must be modified to:

1. The container of the `db` module needs to get a `TARGET_CONTAINER` property to mark the service that corresponds to the container
2. A new entry in `requires` is added for the granting-service
3. A new entry in `resources` is added for the granting-service

Example:
`mta.yaml`:

```
schema-version: '2.0'
ID: granting-service-example
version: 0.0.1

modules:
  - name: db
    type: hdb
    path: db
    requires:
      - name: hdi-container
        properties:                                     # 1.
          TARGET_CONTAINER: ~{hdi-container-service}    # 1.
          
      - name: granting-service                          # 2.
          
resources:
  - name: hdi-container
    type: com.sap.xs.hdi-container
    properties:
      hdi-container-service: ${service-name}        

  - name: granting-service                              # 3.
    type: org.cloudfoundry.existing-service             # 3.
```

## Environment Variables for Applications

`@sap/hdi-deploy` supports (re-)configuration via the following environment variables which are exposed to applications, e.g. via the CF/XSA `manifest.yml` or the MTA descriptor `mta.yaml`:

- `TARGET_CONTAINER`: (optional) service name that specifies the HDI target container (needed, if more than one HDI service is bound to the HDI Deployer)
- `SERVICE_REPLACEMENTS`: (optional) JSON-structured list of service replacements, e.g. `[ { "key": "logical-service-name-1", "service":"real-service-name-1"}, { "key": "logical-service-name-2", "service":"real-service-name-2"} ]`, where the logical service names refer to the names in the HDI content and the real service names refer to the services which are bound to the HDI Deployer via `VCAP_SERVICES`; if the HDI content references a service name which is not listed in the replacements, then this name is used as a real service name

The structure of the `SERVICE_REPLACEMENTS` environment variable is based on the MTA specification in order to enable MTA group assignments.

Example `manifest.yml`:

    applications:
    - name: app-db
      path: db
      health-check-type: process
      services:
        - app-database
        - real-grantor-service
        - real-external-service
      env:
        TARGET_CONTAINER: app-database
        SERVICE_REPLACEMENTS: >
        [
          {
            "key"     : "logical-grantor-service",
            "service" : "real-grantor-service"
          },
          {
            "key"     : "logical-external-service",
            "service" : "real-external-service"
          }
        ]

## Environment Variables for Infrastructure / Development Tools

`@sap/hdi-deploy` supports (re-)configuration via the following environment variables for infrastructure / development tools like the Deploy Service or internal build tools of the WEB IDE

- `EXIT`: (optional) if set, the HDI Deployer will exit when the deployment is done; using the environment variable is equivalent to passing a `--exit` on the command line
- `DEPLOY_ID`: (optional) if set, the given id will be written to the final application log entry (custom id, to support processes in parsing log output
- `HDI_DEPLOY_OPTIONS`: (optional) JSON-structured set of options for the HDI Deployer, e.g. `{ "auto_undeploy" : true, "exit" : true, "root" : "/volumes/A/workspaces/B/db/", "include_filter" : [ "src/", "cfg/" ] }`; command line options can be translated to `HDI_DEPLOY_OPTIONS` options by replacing the `-`s in the option names with `_`s; options which can accept multiple values require a JSON array with the values, e.g. path options like the include-filter option.
- `APPLICATION_ID`: (optional, fallback `SAP_HDI`) this will be used, in conjunction with the `space_name` and the `organization_name` of the `VCAP_APPLICATION` to set the session variable `APPLICATION` for all connections to the database. This setting may only be used by applications from SAP.
- `APPLICATION_VERSION_INFO`: (optional) this will be logged to the command line, to allow logging of some additional information about the application.

Options from `HDI_DEPLOY_OPTIONS` override options which are passed on the command line.

## Ignore List
The hdi deployer supports ignoring certain files via an `.hdiignore` file. The file has to be placed at the root of the project folder, just like the `undeploy.json`.
The file has a structure similar to a `.gitignore` file, simply lines of texts specifying the paths to exclude. Both "real" paths and path patterns are supported.
```
src/table_1.hdbtable
src/*_2.hdbtable
```

The file works just like the `--exclude-filter` option and they can be used at the same time.

## Options for Interactive Scenarios

`@sap/hdi-deploy` supports the following options for interactive deployment scenarios, e.g. for orchestration via the WEB IDE or for CI scripts:

- `--[no-]verbose`: [don't] print detailed log messages to the console
- `--structured-log <file>`: write log messages as JSON objects into the given file; messages are appended if the file already exists
- `--[no-]exit`: [don't] exit after deployment of artifacts
- `--[no-]lock-container`: [don't] acquire the container lock while working with the container
- `--root <path>`: use the given root path for artifacts
- `--working-set [<path> ..]`: define the given paths (directories and files) as the working set; a non-default working set applies additional restrictions, e.g. other options might be disallowed
- `--include-filter [<path> ..]`: only include the given paths (directories and files) during delta detection
- `--deploy [<file> ..]`: explicitly schedule the given files for deploy; extends the `include-filter` for collecting local files. Instead of a real path, a path pattern like src/**/*.hdbtable can be used as well.
- `--[no-]treat-unmodified-as-modified`: [don't] treat unmodified files during delta detection as modified files
- `--undeploy [<file> ..]`: explicitly schedule the given files for undeploy
- `--parameter [<key>=<value> ..]`: pass the given list of key-value parameters to the deployment
- `--path-parameter [<path>:<key>=<value> ..]`: pass the given list of path-key-value parameters to the deployment
- `--[no-]auto-undeploy`: [don't] undeploy artifacts automatically based on delta detection and ignore the `undeploy.json` file
- `--[no-]treat-warnings-as-errors`: [don't] treat warnings as errors
- `--[no-]simulate-make`: [don't] simulate the make and skip post-make activities; pre-make activities still take effect, e.g. grants
- `--connection-timeout <ms>`: number of milliseconds to wait for the database connection(s)
- `--lock-container-timeout <ms>`: number of milliseconds to wait for the container lock
- `--exclude-filter [<path> ..]`: exclude the given paths during: file walk, delta detection and when explicitly scheduled via --(un)deploy
- `--[no-]treat-wrong-ownership-as-errors`: [don't] treat wrong ownership of objects as errors, not enabled by default
- `--[no-]migrationtable-development-mode`: [don't] pass the development mode flag for migration tables to HDI, if the parameter is supported by the server, not enabled by default
- `--[no-]liveness-ping`: [don't] send a sign of life from time to time, by default, a sign of life will be sent
- ` --[no-]live-messages`: [don't] display the make messages while the make is still in progress, by default, the messages will be displayed while the make is in progress

See `--help` for details and defaults.

Options can also be passed to `@sap/hdi-deploy` via the `HDI_DEPLOY_OPTIONS` environment variable.

## Supported Features

`@sap/hdi-deploy` exposes its set of features via the `info` option, which can be passed as `--option` or via `HDI_DEPLOY_OPTIONS`, e.g.

    node deploy --info [<component> [<component> [...]]]

where a list of components can be specified.

The `info` option allows to pass multiple components. The `info` request for these components is optional, e.g. if the HDI Deployer doesn't support the component, then it will not throw an error, but simply not return information for that component. The special component `all` will return the information for all known components; `all` is the default if no component is specified. For certain future components, e.g. `server`, the HDI Deployer might need to connect to the HDI container in the database and retrieve feature information from there.

Examples:

```
node deploy --info all
node deploy --info client server
```

The result of an `info` call is a JSON document where the top-level objects correspond to the requested components. Each component should at least report its name, its version, and the set of supported features with name and version number (version numbers are simple numbers (no dots, no double-dots)).

If a version number is negative, then the feature is supported by the client, but not supported by the server.

For a `--info client` call, the document looks as follows:

```
{
    "client": {
        "name": "@sap/hdi-deploy",
        "version": "3.11.5",
        "features": {
            "info": 2,
            "verbose": 1,
            "structured-log": 1,
            "lock-container": 1,
            "default-access-role": 1,
            "grants": 4,
            "working-set": 1,
            "include-filter": 1,
            "deploy": 1,
            "treat-unmodified-as-modified": 1,
            "undeploy": 1,
            "parameter": 1,
            "path-parameter": 1,
            "treat-warnings-as-errors": 1,
            "simulate-make": 1,
            "service-replacements": 1,
            "modules": 2,
            "config-templates": 2,
            "environment-options": 1,
            "undeploy-whitelist": 1
        }
    }
}
```

For the `server` component, the document would also contain the following data:

```
{
...
    "server": {
        "name": "sap-hana-database",
        "version": "1.00.120.04.0000000000",
        "features": {}
    }
}
```


## Deployment via hdi-dynamic-deploy

The standard XSA/CF way for deploying HDI content at runtime is to make use of @sap/hdi-dynamic-deploy instead of @sap/hdi-deploy directly. The @sap/hdi-dynamic-deploy app is an http server that calls @sap/hdi-deploy when it receives a corresponding HTTP POST request. See the @sap/hdi-dynamic-deploy module for more information.

## Using hdi-deploy as a Node.js library

Since version 3.3.0 of @sap/hdi-deploy it is also possible to use it as a Node.js library. By requiring the library.js file from the project root it is possible to start the deployer app from within another Node.js app. The module exports the function

```
function deploy(contentDir, deployerEnv, callback, io)
```

with the following parameters:

- `contentDir`: string containing a path pointing to the root of the db module to be deployed
- `deployerEnv`: javascript object containing the OS environment for the call to the deployer (e.g. containing VCAP_SERVICES)
- `callback`: a standard callback of the form (errors, result), where result is the result of the call to the deployer of the form:

```
{
  messages: [<list of result messages from the di server>],
  exitCode: <exit code of the call to the deployer app, one of -1, 0, 1.>,
  signal: <signal that the child process was closed with>
}
```
  
- `io` (optional): javascript object containing two callback functions `io.stdoutCB` and `io.stderrCB` of the form `function(data)` for streaming stdout and stderr of the call to the deployer, defaults to piping stdout and stderr of the deployer to stdout and stderr of the calling Node.js app

The exit codes have different meanings:

- -1: The child process was most likely killed externally, check the signal property for details.
- 0: Deployment done succesfully.
- 1: Deployment failed, errors occurred.

The signal property is only set, if exitCode is -1.
