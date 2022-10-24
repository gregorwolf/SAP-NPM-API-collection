# @sap/instance-manager

Node.js package for creating and deleting service instances per tenant within an application at runtime.

## Overview

This package provides a client for _Instance Manager_, [_Service Manager_](https://peripli.github.io/) and **Migration Manager** - components that create and delete
service instances (via REST API) for a specified key. These components can be used in the context
of multitenant applications where the tenant id is the key an instance is associated with.

_Multitenancy_ is a concept for sharing resources between several different
and unrelated to each other groups of users called _tenants_.
Example: subscriptions to a commercial cloud application can be sold to
two different companies each of which should use the application in isolation
from the other one. Customizations are also applied (e.g. different branding,
identity providers, database schemas etc.).

A typical application has access to external resources (e.g. a database or messaging) via _services_.
If an application is used by different tenants, then using a separate service instance
for each one will improve isolation since service binding provides access to a resource.

With this package a Node.js application can dynamically create and delete service instances per tenant at runtime.

To consume _Instance Manager_, an instance of a _managed service_ of the desired type is created first and is then bound to the application.
Taking HANA database as an example, the _managed service_ is called _'managed-hana'_. Its credentials contain HTTP endpoints and credentials only which can later be used by the application for creating and deleting service instances
of the desired type for each tenant.
All managed instances are of the same plan - the one used during the _managed service_ instance creation (e.g. creating a _managed-hana_ service of plan _hdi-shared_ would mean managing service instances of this plan only).

To consume _Service Manager_, an instance of the _service-manager_ service, _container_ plan should be created. Its credentials contain parameters that are used at runtime to manage service instances.
Instances of any available service and plan can be managed with a single instance of _Service Manager_. The application specifies which service and plan to be used by the library.

#### Migration Manager

The
**Migration Manager** is created to a supply smooth migration from _Instance Manager_ (deprecated) to _Service Manager_. To consume
**Migration Manager**, both _Instance Manager_ and _Service Manager_ credentials have to be passed as input (as imOpts and smOpts).
```js
var createInstanceManager = require('@sap/instance-manager').create;

var options = {
  imOpts: { /* properties from service binding */},
  smOpts: {/* properties from service binding */}
};
createInstanceManager(options, function (err, instanceManager) {
  if (err) {
    return console.log('Create migration manager error:', err.message);
  }

  var optionalParameters = {
    /* Optional JSON object containing service-specific configuration parameters */
    "provisioning_parameters": { "<key>" : "<key>" },
  };
  instanceManager.create('my-tenant', optionalParameters, function (err, instance) {
    if (err) {
      return console.log('Create error:', err.message);
    }

    // consume instance.credentials
    console.log(instance);

    instanceManager.get('my-tenant', function (err, instance) {
      if (err) {
        return console.log('Get error:', err.message);
      }

      // same instance
      console.log(instance);

      instanceManager.delete('my-tenant', function (err) {
        if (err) {
          return console.log('Delete error:', err.message);
        }

        console.log('Instance deleted');
      });
    });
  });
});
```
**Migration Manager** is applicable only for CF runtime, as _Service Manager_ is not available for XSA.

## API

```js
var createInstanceManager = require('@sap/instance-manager').create;

var options = { /* properties from service binding */ };
createInstanceManager(options, function (err, migrationManager) {
  if (err) {
    return console.log('Create instance manager error:', err.message);
  }

  var optionalParameters = {
    /* Optional JSON object containing service-specific configuration parameters */
    "provisioning_parameters": { "<key>" : "<key>" }
  };
  migrationManager.create('my-tenant', optionalParameters, function (err, instance) {
    if (err) {
      return console.log('Create error:', err.message);
    }

    // consume instance.credentials
    console.log(instance);

    migrationManager.get('my-tenant', function (err, instance) {
      if (err) {
        return console.log('Get error:', err.message);
      }

      // same instance
      console.log(instance);

      migrationManager.delete('my-tenant', function (err) {
        if (err) {
          return console.log('Delete error:', err.message);
        }

        console.log('Instance deleted');
      });
    });
  });
});
```

### Options

#### Instance Manager parameters

The following properties are provided in the credentials of the _Instance Manager_ service binding.

Property | Mandatory | Details
-------- | --------- | -------
user | x | User for authentication.
password | x | Password for the user.
post_managed_instance_url | x | REST endpoint used for creating a new service instance for a tenant.
get_managed_instance_url | x | REST endpoint used for getting the details about a specific tenant service instance.
get_all_managed_instances_url | x | REST endpoint used for getting the details about all instances (for all tenants).
delete_managed_instance_url | x | REST endpoint used for deletion of a service instance.

**Note**: A _managed service_ binding contains all the mandatory properties mentioned above.

#### Service Manager parameters

Property | Mandatory | Details
-------- | --------- | -------
sm_url | x | URL of _Service Manager_.
url | x | URL of _UAA_ server from which to fetch tokens which will be send to _Service Manager_.
clientid | x | Used when retrieving a token.
clientsecret (not required for mTLS) | x | Used when retrieving a token.
certificate (only for mTLS) | x | Used when retrieving a token.
certurl (only for mTLS) | x | Used when retrieving a token.
service |  | Defaults to 'hana'. Name of the service of which to manage instances.
plan |  | Defaults to 'hdi-shared'. Name of a plan from the selected service of which to manage instances.
allowBinding | | Defaults to 'true'. It allows binding to be created during get() and getAll(). To prevent creation, set to 'false'.

**Note**: A _service-manager_ binding contains all the mandatory properties mentioned above. For non-mTLS authentication *clientsecret* is required, where *certificate* and *certurl* are required for mTLS authentication.

#### Migration Manager parameters

The following properties are provided in the credentials of the **Migration Manager** service binding.

Property | Mandatory | Details
---------| --------- | -------
| **imOpts**         |
user | x | User for authentication.
password | x | Password for the user.
post_managed_instance_url | x | REST endpoint used for creating a new service instance for a tenant.
get_managed_instance_url | x | REST endpoint used for getting the details about a specific tenant service instance.
get_all_managed_instances_url | x | REST endpoint used for getting the details about all instances (for all tenants).
migrate_managed_instance_url | x | REST endpoint used for getting the details about all instances (for a specific tenant).
delete_managed_instance_url | x | REST endpoint used for deletion of a service instance.
| **smOpts**         |
sm_url | x | URL of _Service Manager_.
url | x | URL of _UAA_ server from which to fetch tokens which will be send to _Service Manager_.
clientid | x | Used when retrieving a token.
clientsecret | x | Used when retrieving a token.
service |  | Defaults to 'hana'. Name of the service of which to manage instances.
plan |  | Defaults to 'hdi-shared'. Name of a plan from the selected service of which to manage instances.

**Note**: A _migration-manager_ binding contains all the mandatory properties mentioned above.

#### Migration Manager parameters

The following properties are provided in the credentials of the **Migration Manager** service binding.

Property | Mandatory | Details
---------| --------- | -------
| **imOpts**         |
user | x | User for authentication.
password | x | Password for the user.
post_managed_instance_url | x | REST endpoint used for creating a new service instance for a tenant.
get_managed_instance_url | x | REST endpoint used for getting the details about a specific tenant service instance.
get_all_managed_instances_url | x | REST endpoint used for getting the details about all instances (for all tenants).
migrate_managed_instance_url | x | REST endpoint used for getting the details about all instances (for a specific tenant).
delete_managed_instance_url | x | REST endpoint used for deletion of a service instance.
| **smOpts**         |
sm_url | x | URL of _Service Manager_.
url | x | URL of _UAA_ server from which to fetch tokens which will be send to _Service Manager_.
clientid | x | Used when retrieving a token.
clientsecret | x | Used when retrieving a token.
service |  | Defaults to 'hana'. Name of the service of which to manage instances.
plan |  | Defaults to 'hdi-shared'. Name of a plan from the selected service of which to manage instances.

**Note**: A _migration-manager_ binding contains all the mandatory properties mentioned above.

#### Optional parameters

The create and delete operations are executed asynchronously on server side. To provide an easier interface,
this library also implements polling until an operation is finished. Developers can tune polling
via some optional properties.

Since operations involve network activity (thus, can be considered relatively slow) the package
also caches the created instances. Cache options can also be provided by developers.

Property | Details
-------- | -------
polling_interval_millis | Defaults to 300 and gets increased by 500 for every next request. States how many milliseconds to wait between requests in the polling phase.
polling_timeout_seconds | Defaults to 120. Sets a limit for time (in seconds) that can be spent in polling.
cache_max_items | Defaults to 500. States the capacity of the cache.
cache_item_expire_seconds | Defaults to 600 (10 minutes). Number of seconds after which a cache entry expires.

**Note**: It is recommended to have a single instance manager JavaScript object per _managed service_ bound to the application. An exception is **Migration Manager** due to its specific setup, instances for both _instance and service manager_ gets created.

**Note**: Due to details in regard to consuming _Service Manager_ (more communication with the service is required), applications currently using _Instance Manager_ may need to increase the value of the *polling_timeout_seconds* setting.

### Methods
- `create(tenant, optionalParameters, callback)` - creates a service instance for the provided tenant.
The method polls until the instance is successfully created and then invokes the callback.
Reports an error having a `statusCode` property with value of `409` if an instance for this tenant already exists.
  - tenant | *String* | Tenant name.
  - optionalParameters | *Object* | (*optional*) JSON object with parameters for provisioning or binding, as would be done with the -c options of the CLI commands `create-service` and `bind-service` for unmanaged services. E.g.
  ```json
  {
    "provisioning_parameters": { "database_id" : "<HANA Tenant DB Guid or Name>" },
    "binding_parameters": {"<key>" : "<value>"}
  }
  ```
  - callback | *function(err, instance)* | Callback function with the newly created instance as second argument.

**Note**: With _Service Manager_ and **Migration Manager** the properties provided on the managed instance are a subset (`label`, `plan`, `tags`, `credentials`, `tenant_id` and `status`) of the properties provided on it when using _Instance Manager_.

- `get(tenant, bindingParams, callback)` - gets the corresponding instance for the provided tenant either from cache or from server. Includes a binding creation fallback if instance has no bindings.
Value of `null` means that a service instance for this tenant does not exist.
  - tenant | *String* | Tenant name.
  - optionalParameters | *Object* | **Optional.**  JSON object with parameters for provisioning or binding, as would be done with the -c options of the CLI commands. Used during binding creation fallback.
  - callback | *function(err, instance)* | Callback function with the instance as second argument.

**Note**: In _Instance Manager_ case this method only polls if the instance is in status `CREATION_IN_PROGRESS`.
In all other cases it returns the service instance as it is on server.
Thus, having the `credentials` property on the `instance` object in the callback is not guaranteed.
In _Service Manager_ case if the managed instance is not ready to be used, the method returns an error. In **Migration Manager** case it will try to get an instance from _Service Manager_ if nothing found it will then search in _Instance Manager_ and it will return result considered by _Instance Manager_.

- `getAll(optionalParameters, callback)` - gets the instances for all tenants as an array of objects. This method updates the cache. Includes binding creation fallback for each instance without binding. If binding creation fails it will log an error message and continue processing.
  - optionalParameters | *Object* | **Optional.**  JSON object with parameters for provisioning or binding, as would be done with the -c options of the CLI commands. Used during binding creation fallback.
  - callback | *function(err, instances)* | Callback function with all instances as second argument.

**Note**: In _Instance Manager_ case filtering of the instances according to their status (e.g. `CREATION_SUCCEEDED`, `CREATION_IN_PROGRESS`) does not take place. Thus, having the `credentials` property on each of the instances provided in the callback is not guaranteed. In _Service Manager_ case only ready to be used managed instances are returned. In **Migration Manager** case it will get instances from both _Service Manager_ and _Instance Manager_ and will return an array of managed instances. If no instaces found and error would be thrown.

- `delete(tenant, callback)` - deletes service instance for the provided tenant.
The method polls until the instance is successfully deleted and then invokes the callback.
Reports an error having a `statusCode` property with value of `404` if an instance for this tenant does not exist.
  - tenant | *String* | Tenant name.
  - callback | *function(err)* | Callback function called when the instance is deleted or an error has occurred.

When the callback of a method is invoked with an error which is caused by an unexpected HTTP response code
received from the server, then this error object will have a `statusCode` property with the value of the HTTP status code.

**Note**: In **Migration Manager** case it will try to delete service instance for the provided tenant first in _Instance Manager_ then it will continue with _Service Manager_. In case nothing's found an error would be thrown, all other cases it would delete service instances.

## Debug logs

One can enable debug logs of this package via adding _instance-manager_ to the `DEBUG` environment variable.


## Binding Labels

***Note: The @sap/instance-manager will only retrieve bindings that have all three of the below bindings. These labels are automatically assigned and added when creating bindings via this library.***

Label Name | Value
-------- | ---------
tenant_id | The tenant for which the binding is created.
service_plan_id | The ID of the 'hdi-shared' plan of the 'hana' service offering (by default).
managing_client_lib | 'instance-manager-client-lib' - this value is used as an additional filter to distinguish instances created and used by this library, and those created by other means and used for other purposes.

