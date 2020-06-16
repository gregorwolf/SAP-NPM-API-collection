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
