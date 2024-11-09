## 1.14.0 - 2023-12-20

- add @sap/cds@7.5.0 as optional peer depenency
- [CAP] bugfix missing await in RolesMiddleware
- [CAP] several changes for new "cds build --for ams" feature

## 1.13.1 - 2023-9-12

- support users with empty tenant in CAP

## 1.13.0 - 2023-9-7

- add limit for maximum entries to RolesCache. In CAP, this can be configured via requires.auth.ams.cache.limit
- fix CAP watch mode detection under Windows file systems

## 1.12.0 - 2023-8-15

- refactor runtime package

## 1.11.0 - 2023-8-14

refactoring of CAP plugin:
- \_dcl\_.cap file is now called entityMapping

## 1.10.1 - 2023-8-7

- export the new functionality from 1.10.0 via index.js

## 1.10.0 - 2023-8-2

- the API and cache for retrieving a user's roles based on specific role policies has been moved from the corresponding CAP-specific RolesMiddleware to a standalone class (RolesProvider). RolesMiddleware has been changed to configure and use RolesProvider.

## 1.0.9 - 2023-8-1

- change warning to debug message when roles middleware is handling request without user object

## 1.0.8 - 2023-8-1

- the cache TTL (time-to-live) of the roles middleware can now be configured in the CAP config via property requires.auth.ams.cache.TTL

## 1.0.7 - 2023-7-26

- add runtime for AmsInstance functionality

## 1.0.6 - 2023-7-25

- fixed cds-plugin.js missing from previous builds and releases

## 1.0.5 - 2023-7-21

- improved logging of cds plugin

## 1.0.4 - 2023-7-20

- convert to cds plugin

## 1.0.3 - 2023-7-19

- small bugfixes and improvements for CAP integration

## 1.0.2 - 2023-7-17

- small bugfixes and improvements for CAP integration

## 1.0.1 - 2023-7-11

- small bugfixes and improvements for CAP integration

## 1.0.0 - 2023-7-10

- add CAP integration code to src/cap

## 0.4.0 - 2023-6-30

- update ams-dev lib

## 0.3.0 - 2023-5-3

- update ams-dev lib

## 0.2.2 - 2023-1-13

- fix pdp url if set from outside

## 0.2.1 - 2023-1-12

- fix connection refused bug for node versions 17 upwards

## 0.2.0 - 2023-1-11

- support for scim id in attributes setTokenInfo

## 0.1.5 - 2022-12-30

- add getHealthStatus and startupCheck functions

## 0.1.4 - 2022-10-21

- update ams-dev to version 0.2.3

## 0.1.3 - 2022-10-05

- update ams dev lib

## 0.1.2 - 2022-08-18

- update to new ams-compiler and opa version in ams-dev-lib

## 0.1.1 - 2022-04-14

- updated dcl compiler to version 0.10.0

## 0.1.0 - 2022-03-22

- Updated ams-dev lib which contained vulnerability

## 0.0.2 - 2022-03-07

- First release
