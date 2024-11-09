# 2.9.0
Features:
- Add range dependencies in package.json

Removed:
- Removed shrinkwrap

# 2.8.3
Fixes
- use @sap/hdi-deploy@5.2.2

# 2.8.2
Fixes
- use @sap/hdi-deploy@5.2.1
- use @sap/hana-client@2.21.28
- use @sap/audit-logging@6.2.0
- use @sap/xsenv@5.2.0
- use cookie-signature@1.2.1
- use hdb@0.19.9
- use uuid@10.0.0

# 2.8.1
Fixes
- add hdb client for backwards compatibility

# 2.8.0
Features
- use @sap/hdi-deploy@5.2.0
- use @sap/hana-client@2.20.23

Removed:
- Node 16.x support

# 2.7.5
Features
- use @sap/hdi-deploy@4.9.5

# 2.7.4
Features
- use @sap/hdi-deploy@4.9.4

# 2.7.3
Features
- use @sap/hdi-deploy@4.9.3
- use @sap/audit-logging@6.1.0
- use body-parser@1.20.2
- use express@4.19.2
- use uuid@9.0.1

# 2.7.2
Features
- use @sap/xsenv@4.2.0
- use @sap/hdi-deploy@4.9.2
- use @sap/audit-logging@5.8.3

# 2.7.1
Features
- use @sap/audit-logging@5.8.2
- use @sap/hdi-deploy@4.9.0

# 2.7.0
Features
- use @sap/audit-logging@5.8.1

Removed:
- Node 12.x and 14.x support

# 2.6.1
Features
- use @sap/hdi-deploy@4.8.2

# 2.6.0
Features
- use @sap/hdi-deploy@4.8.0
- Node 20 support

# 2.5.5
Features
- use @sap/hdi-deploy@4.7.1
- use @sap/audit-logging@5.7.1

# 2.5.4
Features:
- use @sap/hdi-deploy@4.6.1

# 2.5.3
Features:
- use @sap/hdi-deploy@4.6.0

# 2.5.2
Features
- use @sap/hdi-deploy@4.5.3
- use @sap/xsenv@3.4.0
- use @sap/audit-logging@5.6.3


# 2.5.1
Features
- use @sap/hdi-deploy@4.5.1

# 2.5.0
Features
- use @sap/hdi-deploy@4.5.0
- added a new route `/v1/deploy/async` that implements an asynchronous deployment for VCAP_SERVICES style
- Node 18 support

# 2.4.1
Features
- added environmental variable `STRUCTUREDLOGGING` to structure the dynamic deployer logs when set to true

# 2.4.0
Features:
- use @sap/hdi-deploy@4.4.1
- use @sap/xsenv@3.3.2
- use @sap/audit-logging@5.5.4

# 2.3.7
Fixes:
- revert structure the dynamic deployer logs

# 2.3.6
Features:
- use @sap/hdi-deploy@4.4.0

Fixes:
- structure the dynamic deployer logs

# 2.3.5
Features:
- use @sap/hdi-deploy@4.3.3

# 2.3.4
Features:
- use @sap/hdi-deploy@4.3.2
- use body-parser@1.19.2
- use express@4.17.3
- use express-basic-auth@1.2.1
- use @sap/audit-logging@5.5.2

# 2.3.3
Features:
- use @sap/audit-logging@5.4.1
- use @sap/hdi-deploy@4.3.0


# 2.3.2
Features:
- use @sap/hdi-deploy@4.2.3
- use @sap/audit-logging@5.3.0
- routes `/v1/deploy/to/instance` and `/v1/deploy/to/instance/async` accept the response of a service manager GET

# 2.3.1
Features:
- use @sap/hdi-deploy@4.2.2

# 2.3.0
Features:
- use @sap/hdi-deploy@4.2.0
- use @sap/audit-logging@5.1.0
- Node 16 support

Removed:
- Node 8.x and 10.x support

# 2.2.0
Features:
- use @sap/hdi-deploy@4.1.0

# 2.1.2
Features:
- use @sap/hdi-deploy@4.0.5

# 2.1.1
Features:
- use @sap/hdi-deploy@4.0.4

Fixes :
- overall deployment time calculation
- accepting different alphabetical cases for enforce_auditing

# 2.1.0
Features:
- use @sap/hdi-deploy@4.0.3
- use @sap/audit-logging@4.2.0
- Node 14 support


# 2.0.1
Features:
- use @sap/hdi-deploy@4.0.2

# 2.0.0
Features.
- use @sap/hdi-deploy@4.0.1
- use @sap/xsenv@3.1.0

Removed:
- node 6 support

# 1.7.5
Features:
- use @sap/hdi-deploy@3.11.15

# 1.7.4
Features:
- use @sap/hdi-deploy@3.11.14

# 1.7.3
Features:
- use @sap/hdi-deploy@3.11.13
- use @sap/audit-logging@3.2.0

# 1.7.2
Features:
- use hdi-deploy version 3.11.12
- use @sap/audit-logging 3.1.1

# 1.7.1
Features:
- use hdi-deploy version 3.11.11
- prefix log lines relating to the same deployment with an identifier  

# 1.7.0
Features:
- added a new route `/v1/deploy/to/instance/async` that implements an asynchronous deployment with status polling via `/v1/status/:guid`.
- log the server version on start-up

# 1.6.0
Features:
- node 12 support
- use hdi-deploy version 3.11.9
- updated dependencies
- allow specifying the tenant for audit logging via env variable "AUDIT_LOG_TENANT"

Fixes:
- previously, a simple get request (in combination with audit logging) caused an internal server error

## 1.5.9
Fixes:
- use hdi-deploy version 3.11.6
- don't send duplicate messages as part of response

## 1.5.8
Fixes:
- use hdi-deploy version 3.11.5
- send all deployer messages as part of response

## 1.5.7
Fixes:
- use hdi-deploy version 3.11.4

## 1.5.6
Features:
- use hdi-deploy version 3.11.2
- Node 10 support

## 1.5.5
Features:
- use hdi-deploy version 3.11.0
- update dependencies

Fixes:
- fix issue with audit logging: IP determination would sometimes return multiple IPs, causing audit logging to crash

## 1.5.4
Features:
- use hdi-deploy version 3.10.0

## 1.5.3
Features:
- update dependencies

Fixes:
- full support for .hdbmigrationtable files by using hdi-deploy version 3.9.4

## 1.5.2
Fixes:
- solved issue with long running deployments

## 1.5.1
Features:
- use hdi-deploy version 3.9.2

## 1.5.0
Features:
- logging of parameters passed via the request
- optional audit logging of failed login attempts
- export API endpoint functions
- use hdi-deploy version 3.9.1

## 1.4.2

Features:
- export the internal HTTP server
- use hdi-deploy version 3.8.2

## 1.2.2

Fixes:
- switch from res.send back to res.end to fix problems with the content type

## 1.2.1

Features:
- update dependencies

## 1.2.0

Features:
- additional route /v1/deploy/to/instance accepting the response of a instance manager GET
- use hdi-deploy version 3.4.0

## 1.1.0

Features:
- use hdi-deploy version 3.3.0
- move forking of hdi-deploy into hdi-deploy itself

## 1.0.0

initial release
