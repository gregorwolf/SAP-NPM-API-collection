# CAP integration

AMS can be integrated into CAP applications to provide both role and instance-based authorization management at runtime.
The integration is based on annotations from which AMS generates a set of (base) policies that can be assigned to users of the SAP Identity service to grant access to protected resources. The generated policies can be extended with custom policies at runtime for fine-grained control.

By being able to write and assign instance-based authorization policies to different user groups any time on a running system, your application becomes ready for complex, enterprise-grade scenarios. For instance, you can grant and remove fine-grained data access rights to an auditor whenever you are required to do so.

When deployed, your application's authorizations are managed in the AMS cockpit. When running locally, e.g. during development, policies are edited in the IDE and can be assigned to mocked users via the CAP configuration.

For production, AMS is meant to be used with SAP Identity Service as authentication solution. However, during development, mocked authentication can be used to test authorization independently. Watchers assist during development by automatically re-running the necessary compilation steps when annotations, custom policies or policy assignment files are changed.

## Setup
1. Install the AMS runtime plugin for cds (@sap/ams) as well as the AMS development plugin for cds (@sap/ams-dev):

```shell
npm i @sap/ams
npm i --save-dev @sap/ams-dev
```

2. Enable [middlewares](https://cap.cloud.sap/docs/node.js/middlewares#configuration) in your CAP configuration.

*Note*: This seems to be the default already in the current cds version.

## Configuration
The AMS plugins are configured in the CAP configuration environment under `requires.auth.ams` via the properties defined in `lib/cap/config/capAmsConfig.d.ts`.

## Logging
AMS logs to namespaces `ams` in CAP. To see `DEBUG` output during development, we recommend to turn this namespace on, e.g. via

```shell
DEBUG=ams cds watch
```

## Troubleshooting

- If you receive a message that OPA could not succesfully start, make sure no other process, such as an orphaned OPA instance, is running on port 8181.

For instance, under UNIX, use

```shell
lsof -i :8181
```

to get the PID of the process running on port 8181, then terminate it via

```shell
kill <PID>
```