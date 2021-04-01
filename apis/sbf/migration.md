# Migration Guide

## Version 4 ==> Version 5

When a broker is running on Cloud Foundry, audit logging is enabled and SBSS is used as credentials provider or `autoCredentials` is `false`,
the provider tenant should be explicitly set for audit logging purposes.
Providing a value when a broker is running on XS advanced is optional.

## Version 3 ==> Version 4

### Dependency to _@sap/sbss_

_@sap/sbf_ now depends on _@sap/sbss_ v4 which no longer brings the _@sap/hdbext_ package by default.
Brokers that use SBSS on HANA need to explicitly specify _@sap/hdbext_ as a dependency.
Refer to the _package.json_ file of _@sap/sbss_, property _peerDependencies_
for the accepted version range for _@sap/hdbext_.

## Version 2 ==> Version 3

### Log context provided in hooks

The `params` provided to hooks contain a `req` property to which _@sap/logging_ attaches a `loggingContext`.
Now _@sap/sbf_ uses v4 of the logging library and there are several incompatibilities in the `loggingContext`.
`requestId` has been removed. Use the `correlationId` for correlating log entries produced by
different components involved in a broker operation.
More information is available in the documentation of the _@sap/logging_ package.

## Version 1 ==> Version 2


### Order of operations

The order of operations during unbind and deprovision is reversed. For more information see hooks section in [README.md](README.md#hooks)

### Mandatory Audit log service

Audit log service binding is required in order to start the SBF. See [README.md](README.md#create-audit-log-service-instance)
It can be disabled by explicitly setting the environment variable `SBF_ENABLE_AUDITLOG` or via `enableAuditLog` option of `ServiceBroker` constructor.

```js
  ...
  let broker = new ServiceBroker({
    enableAuditLog: false
  });
  ...
  let server = broker.start();
```

### Mandatory X-Broker-API-Version header

SBF will reject any request without `X-Broker-API-Version` header. Both Cloud Foundry and SAP HANA XSA runtime send this header, so this should not require any changes in service brokers in productive environment. Still you may need to adapt your tests.

### Restricted user required for SBSS on Postgres

The SBF requires an additional user-provided service with a restricted Postgres user. If not provided, the SBF will fail to start.
For more information see [README.md](README.md#sbss-on-postgresql)

### Change format of parameters for instance creation

**This is applicable only for XSUAA**

The old format where `xsappname` and the other security properties appear on root level is removed.

If in the previous version a parameters.json was structured as:

*parameters.json*:
```
{
  ...
  "xsappname": "my-app",
  ...
}
```

Now it should be:
```
{
  ...
  "xs-security": {
    "xsappname": "my-app",
    ...
  }
  /* other custom parameters */
  ...
}
```

Custom parameters can be specified on top-level, without setting `xs-security` property. In this case the SBF will use service instance id for `xsappname`.

*parameters.json*:
```
{
  ...
  "custom-property": "value"
  ...
}
```


### Enforced secure outgoing connections

By default SBF will fail to start if XSUAA connection is not encrypted. This can be disabled via environment variable `SBF_SECURE_OUTGOING_CONNECTIONS` or via `secureOutgoingConnections` option.

```js
  ...
  let broker = new ServiceBroker({
    secureOutgoingConnections: false
  });
  ...
  let server = broker.start();
```

By default XSUAA service provides an HTTPS url, so this should not require any changes in service brokers.
**Note:** due to platform limitations, PostgreSQL service provides only unencrypted connections.
