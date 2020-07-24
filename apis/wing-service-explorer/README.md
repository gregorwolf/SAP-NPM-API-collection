[![Build Status](https://gkeplatform2.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=wing-service-explorer-ci%2Fmaster)](https://gkeplatform2.jaas-gcp.cloud.sap.corp/job/wing-service-explorer-ci/job/master/)
[![Build Status](https://prod-build10100.wdf.sap.corp:443/buildStatus/icon?job=devx-wing%2Fdevx-wing-wing-service-explorer-SP-REL-common_indirectshipment)](https://prod-build10100.wdf.sap.corp:443/job/devx-wing/job/devx-wing-wing-service-explorer-SP-REL-common_indirectshipment/)
[![Coverage](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-explorer&metric=coverage)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-explorer)
[![Maintainability Rating](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-explorer&metric=sqale_rating)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-explorer)
[![Code Smells](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-explorer&metric=code_smells)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-explorer)
[![Duplicated Lines (%)](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-explorer&metric=duplicated_lines_density)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-explorer)
[![Vulnerabilities](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-explorer&metric=vulnerabilities)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-explorer)

# @sap/wing-service-explorer


## Overview

**Wing-service-explorer** is an npm package that provides the ability to explore SAP services.
This Readme file explains how to setup the development environment, how the development process and tests are performed, and how to release the feature in Nexus.




## Usage

To add this package as a dependency in your **package.json** file, under the "dependencies" section, add the following dependency: `"@sap/wing-service-explorer": [Version]`

## API
**Wing-service-explorer** exposes 3 different objects for 3 different SAP systems: 

### ServiceURLExplorer
---
This object exposes APIs for exploration of systems and services defined as OData odata_gen in the account destination list.
#### getDestinations
Returns a list of destinations filtered with WebIDEUsage = odata_gen
#### isFullUrlDestination
Gets as an input a destination object (received from the getDestinations API) and returns **true** if this is a destination to a system 
or a service (i.e. if the destination includes a property named full_url and its value is true). 
#### getMetadata
Gets as an input a ConnectionDetails object (which contains the details to connect to a service) and returns the metadata (XML format) 
which the service exposes.


### APIHubExplorer
---
This object exposes APIs for exploration of APIs from the APIHub system.
#### getDestinations
Returns a list of destinations filtered by WebIDEUsage = apihub_catalog
#### getListOfAPIs
Gets as an input a destination object (received from the getDestinations API) and returns a list of APIs exposed by the APIHub system.
#### getApiKey
Gets as an input a destination object and user authetication details (user/password) and returns the user's API key from the APIHub system. (Required for getting the API metadata.) 
#### getMetadata
Gets as an input a ConnectionDetails object (which contains the details to connect to an API) and returns the metadata (XML format) 
which the API exposes.
Note: The APIHub requires a definition of 2 destinations. The first one for the APIHub system and the second for the API sandbox.

### ExtensionFactoryExplorer 
---
This object exposes APIs for exploration of systems exposed by the Extension Factory.
#### getDestinations
Returns a list of destinations which contain an additional property named **XFSystemName**.


## Development Process

### GIT and GitHub

1. Open Git Bash, go to the local repository directory and sync with the remote repository.
2. Develop in a **Local** branch.
  - Create a new descriptive branch ```git checkout -b my-local-branch-name``` <br>**OR** rename the previous one ```git branch -m my-local-branch-name```.
  - Make sure *my-local-branch-name* is **NOT master** and that there is **no existing** branch with this name.
3. Sync with the remote repository.
  - Fetch the code from the master branch by running `git fetch; git merge`.  
4. Make your local changes.
  - Run `npm install` to install dependencies.
  - Run `npm run test` to compile the typescript code to JS and run tests. 
5. Commit and push.
 - **Do not push directly to master !!!**
  - Commit your changes and push to create a new branch on GitHub by running ```git push origin my-local-branch-name```
  - On consecutive commits **DO NOT** use ```commit ammend```. You should create a new commit and push to the same feature branch again. This will add an extra commit to your pull request and retrigger the voters.
6. Open the [repository](https://github.wdf.sap.corp/devx-wing/wing-service-explorer) on GitHub and go to **Code > Branches**.
7. Open a pull request.
  - Click ![image](https://github.wdf.sap.corp/storage/user/15516/files/f0632932-b48b-11e6-8c87-75a073ff4b9f) next to your branch.
  - Edit the pull request name with BLI or BCP. For example: _"BLI DEVXCORE-123: my new feature"_ or _"BCP 1670451810: Fix my bug"_.
  - A new branch *my-local-branch-name* is created in the GitHub repository.
  - The new code should enable all voters and code review to pass successsfully.
8. Update the existing pull request.
  - Stage your changes and create a new commit.
  - Perform Git fetch
  - Perform Git merge on origin/master - merge your changes with the most updated master branch.
  - Push your changes to your *my-local-branch-name* (Git push origin *my-local-branch-name*).
9. Merge the pull request.  
  - If all voters passed (XMake + JaaS Voter) click ![image](https://github.wdf.sap.corp/storage/user/15516/files/a1501da6-b6fb-11e6-9240-37aa1b14409c) (which should become green).
  - If your pull request contains several commits, you can put them together in one commit from GitHub by selecting the ![image](https://github.wdf.sap.corp/storage/user/15516/files/c6415274-b6fb-11e6-98a6-d417a638b013) option from the Merge dropdown list.
10. Delete your branch.
  - Once merge is complete, go to **Code > Branches**.
  - Look for your merged pull request and click ![image](https://github.wdf.sap.corp/storage/user/15516/files/a4ac4604-b48b-11e6-84c7-8423bde60ec8).
  
  
### Tests and Coverage

* Run `npm run test` to run the Unit tests written in Mocha as well as the coverage test.


## Release
1. Bump the version in the exposed ports github file.
  - [package.json](https://github.wdf.sap.corp/devx-wing/wing-service-explorer/blob/master/package.json#L5).
  

    **_Notes:_**
    Make sure to follow this versioning concept:
    - When providing new features (as when releasing at end of the sprint or when a new feature is ready), bump a major version (e.g: from 1.1.0 to 1.2.0).
    - When providing a bug fix to an existing version ("hot fix"), bump a minor version (e.g: from 1.1.0 to 1.1.1).
2. Use [XMAKE Release Job](https://prod-build10100.wdf.sap.corp/job/devx-wing/job/devx-wing-wing-service-explorer-SP-REL-common_indirectshipment/) (Stage and promote) to upload a new version to Nexus (based on master). 
The XMAKE Release Job currently runs automatically on merge.
3 The newly released version location in [nexus]
(http://nexus.wdf.sap.corp:8081/nexus/content/repositories/build.releases/com/sap/npm/wing-service-explorer/)
