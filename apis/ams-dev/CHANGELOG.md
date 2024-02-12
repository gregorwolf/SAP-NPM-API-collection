## 0.8.3 - 2024-02-02

- provide separate README for npmjs release

## 0.8.2 - 2024-01-26

- [CAP] fix plugin quitting early when production profile is active to allow the AMS BuildTask to run during `cds build --production`
- [CAP] bugfix OPA not getting started when ams.autoCompile config flag is set to *false*

## 0.8.1 - 2024-01-24

- [CAP] necessary adjustments for mocked auth support under @sap/ams 1.14.1 and later
- [CAP] role names are now quoted in the generated base policies to support special characters like `.` inside role names

## 0.8.0 - 2023-12-21

- [CAP] integrate AMS DCL generation into the 'cds build' command
- [CAP] compile DCL into /gen/srv/ams* instead of /ams/*
- [CAP] move .opa folder away from /ams into user's home directory
- [CAP] major refactoring and improvements of AMS Dev Plugin

## 0.7.2 - 2023-10-24

- remove (Not restricted) from base policy names generated with CAP Plugin

## 0.7.1 - 2023-9-8

- bugfix path to policyAssignments file in local OPA configuration of CAP applications running on Windows

## 0.7.0 - 2023-8-15

- update dcl-compiler to version 0.15.0
- replaced --silent flag with -l (--log-level)
- introduced new flag -d (--dry-run) for stop-opa which shows the running opa processes without killing them

## 0.6.0 - 2023-8-15

- support CAP Hybrid mode for AMS

## 0.5.0 - 2023-8-14

- move CAP plugin logic to cap/amsDevPlugin.js
- refactor CAP plugin
- change CAP logging namespace to ams from ams-dev

## 0.4.6 - 2023-8-7

- various improvements and stabilizations to cds-plugin.js
- new flag: cds.env.requires.auth.ams.autoCompile (Default=false): Compile CDS to DCL whenenver model is loaded, e.g. during start-up of cds watch

## 0.4.5 - 2023-7-26

- remove unnecessarily complex process spawns from CapAmsFlow by directly calling internal functions instead of their CLI binaries.

## 0.4.4 - 2023-7-26

- triggering xMake builds (Staging & Promote) with technical user (p2002428409)token. 

## 0.4.3 - 2023-7-21

- the cds plugin now supports policy assignments via CAP mocked authentication by automatically generating a policyAssignments file for OPA in the background
- various improvements for compilation and OPA management via event and file watchers

## 0.4.2 - 2023-7-20

- convert to cds plugin

## 0.4.1 - 2023-6-30

- update dependencies

## 0.4.0 - 2023-6-22

- update dcl-compiler

## 0.3.2 - 2023-5-3

- update dcl-compiler and opa

## 0.3.1 - 2023-2-13

- fix support for node without top level await

## 0.3.0 - 2023-2-10

- dcl compilation now also executes dcl test files

## 0.2.11 - 2023-1-24

- update dependencies and fix error handling for stopping opa

## 0.2.9 - 2022-12-29

- update opa to 0.47.3-sap-0.3.1

## 0.2.8 - 2022-12-22

- add opa bundle state plugin

## 0.2.7 - 2022-12-22

- further improve xmake build

## 0.2.6 - 2022-12-22

- improve xmake build

## 0.2.5 - 2022-12-22

- fix xmake error

## 0.2.4 - 2022-12-22

- update opa binary

## 0.2.3 - 2022-10-21

- update dcl compiler to version 0.12.1

## 0.2.2 - 2022-10-04

- bugfix on windows

## 0.2.1 - 2022-08-18

- update dcl compiler and opa

## 0.2.0 - 2022-07-29

- update to typescript

## 0.1.1 - 2022-04-14

- updated dcl compiler to version 0.10.0

## 0.1.0 - 2022-03-22

- Remove java-caller lib because of vulnerability

## 0.0.9 - 2022-03-07

- First release
