# Fiori-Json-Services
# Description
This module is designated to support the following for json files according to the Language Server Protocol-LSP :
* Returns supported commands for auto fix in manifest.json
* Returns code actions that can be executed according to the given diagnostics and validation of the manifest.json file.
* Returns which changes / text edits to execute according to the code action requested.

Currently this module supports generation of stable ids for targets and views in the manifest.json file when the flexEnabled flag is set to  true.

the test script runs on update and pull request.
#Updating The Repository With Your Changes:

1. Fork the repository.
2. Change the code as you wish.
3. Go to package.json and update the version to the new version number - increment by one (example : from 0.0.1 to 0.0.2).
4. Commit and create new pull request with your changes.
5. Make sure pull request was approved and merged to master branch.
6. https://prod-build10300.wdf.sap.corp/job/devx/job/DevX-fiori-json-services-master-CI-linuxx86_64/
    Press  Build now
   
6. Wait to see that the build succeeded.



