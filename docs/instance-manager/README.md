# @sap/instance-manager

Node.js package for creating and deleting service instances per tenant within an application at runtime.

## Overview

This package provides a client for the _Instance Manager_ - a component that creates and deletes
service instances (via REST API) for a specified key. _Instance Manager_ can be used in the context
of multitenant applications where the tenant id is the key an instance is associated with.

_Multitenancy_ is a concept for sharing resources between several different
and unrelated to each other groups of users called _tenants_.
Example: subscriptions to a commercial cloud application can be sold to
two different companies each of which should use the application in isolation
from the other one. Customizations are also applied (e.g. different branding,
identity providers, database schemas etc.).

A typical application has access to external resources (e.g. a database or messaging) via _services_.
If an application is used by different tenants, then using a separate service instance
for each one will improve isolation since service binding provides access to a particular resource.

With this package a Node.js application can dynamically create and delete service instances per tenant at runtime.
An instance of a _managed service_ of the desired type is created first and is then bound to the application.
For a HANA database the _managed service_ is called _'managed-hana'_. This service binding only provides
parameters (HTTP endpoints and credentials) which can later be used by the application for creating and deleting service instances
of the desired type for each tenant.

## API

```js
var createInstanceManager = require('@sap/instance-manager').create;

var options = { /* properties from service binding */ };
createInstanceManager(options, function (err, instanceManager) {
  if (err) {
    return console.log('Create instance manager error:', err.message);
  }

  var optionalParameters = {
    /* Optional JSON object containing service-specific configuration parameters */ 
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

### Options

The _managed service_ bound to the application (for example _managed-hana_) provides credentials
as well as REST endpoints of the _Instance Manager_ - the component that handles creation
and deletion of services. These credentials and endpoints are mandatory.

The create and delete operations are executed asynchronously on server side. To provide an easier interface,
this library also implements polling until an operation is finished. Developers can tune polling
via some optional properties.

Since operations involve network activity (thus, can be considered relatively slower) the package
also caches the created instances. Cache options can also be provided by developers.

Property | Mandatory | Details
-------- | --------- | -------
user | x | User for authentication.
password | x | Password for the user.
post_managed_instance_url | x | REST endpoint used for creating a new service instance for a tenant.
get_managed_instance_url | x | REST endpoint used for getting the details about a specific tenant service instance.
get_all_managed_instances_url | x | REST endpoint used for getting the details about all instances (for all tenants).
delete_managed_instance_url | x | REST endpoint used for deletion of a service instance.
polling_interval_millis | | Defaults to 300. States how many milliseconds to wait between requests in the polling phase.
polling_timeout_seconds | | Defaults to 120. Sets a limit for the amount of time (in seconds) that can be spent in polling.
cache_max_items | | Default value is 500. States the capacity of the cache.
cache_item_expire_seconds | | Defaults to 600 (10 minutes). Number of seconds after which a cache entry expires.

**Note**:
- A _managed service_ binding contains all of the mandatory properties mentioned above.
- It is recommended to have a single instance manager JavaScript object per _managed service_ bound to the application.

### Methods
- `create(tenant, optionalParameters, callback)` - creates a service instance for the provided tenant.
The method polls until the instance is successfully created and then invokes the callback.
Reports error if an instance for this tenant already exists.
  - tenant | *String* | Tenant name.
  - optionalParameters | *Object* | (*optional*) JSON object with parameters for provisioning or binding, as would be done with the -c options of the CLI commands `create-service` and `bind-service` for unmanaged services. E.g.
  ```json
  {
    "provisioning_parameters": { "database_id" : "<HANA Tenant DB Guid or Name>" },
    "binding_parameters": {"<key>" : "<value>"}
  }
  ```
  - callback | *function(err, instance)* | Callback function with the newly created instance as second argument.

- `get(tenant, callback)` - gets the corresponding instance for the provided tenant either from cache or from server.
Value of `null` means that a service instance for this tenant does not exist.
**Note**: this method only polls if the instance is in status `CREATION_IN_PROGRESS`.
In all other cases it returns the service instance as it is on server.
Thus, having the `credentials` property on the `instance` object in the callback is not guaranteed.
  - tenant | *String* | Tenant name.
  - callback | *function(err, instance)* | Callback function with the instance as second argument.

- `getAll(callback)` - gets the instances for all tenants as array of objects. Filtering of the instances according to their status (e.g. `CREATION_SUCCEEDED`, `CREATION_IN_PROGRESS`) does not take place. Thus, having the `credentials` property on each of the instances provided in the callback is not guaranteed. This method updates the cache.
  - callback | *function(err, instances)* | Callback function with all instances as second argument.

- `delete(tenant, callback)` - deletes service instance for the provided tenant.
The method polls until the instance is successfully deleted and then invokes the callback.
Reports error if an instance for this tenant does not exists.
  - tenant | *String* | Tenant name.
  - callback | *function(err)* | Callback function called when the instance is deleted or an error has occured.

When the callback of a method is invoked with an error and this error is caused by an unexpected HTTP response code
received from the server, then this error object will have a `statusCode` property with the status code of the received HTTP response.

## Debug logs

One can enable debug logs of this package via adding _instance-manager_ to the `DEBUG` environment variable.
