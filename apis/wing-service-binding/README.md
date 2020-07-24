[![Build Status](https://gkeplatform2.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=wing-service-binding-ci%2Fmaster)](https://gkeplatform2.jaas-gcp.cloud.sap.corp/job/wing-service-binding-ci/job/master/)
[![Build Status](https://prod-build10100.wdf.sap.corp:443/buildStatus/icon?job=devx-wing%2Fdevx-wing-wing-service-binding-SP-REL-common_indirectshipment)](https://prod-build10100.wdf.sap.corp:443/job/devx-wing/job/devx-wing-wing-service-binding-SP-REL-common_indirectshipment/)
[![Coverage](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-binding&metric=coverage)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-binding)
[![Maintainability Rating](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-binding&metric=sqale_rating)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-binding)
[![Code Smells](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-binding&metric=code_smells)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-binding)
[![Duplicated Lines (%)](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-binding&metric=duplicated_lines_density)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-binding)
[![Vulnerabilities](https://sonar.wdf.sap.corp/api/project_badges/measure?project=devxwing-service-binding&metric=vulnerabilities)](https://sonar.wdf.sap.corp/dashboard?id=devxwing-service-binding)


# @sap/wing-service-binding

## Overview

Wing-service-binding is the npm package which provide the ability to bind a module (e.g. ui, cap service etc) with service metadata.
This Readme explains how to setup development environment, how development process and testings are done and how to release the feature in nexus.


## Usage

To add this package as a dependency in your **package.json** file, do the following:

1. Under the "dependencies" section, add the following dependency: `"@sap/wing-service-binding": [Version]`


## Development Process

### GIT and GitHub

1. Open Git Bash, go to local repository directory and sync with the remote repository.
2. Develop in a **Local** Branch:
  - Create a new descriptive branch ```git checkout -b my-local-branch-name``` <br>**OR** rename the previous one ```git branch -m my-local-branch-name```.
  - Make sure *my-local-branch-name* is **NOT master** and that there is **no existing** branch with this name.
3. Sync with remote repository:
  - Fetch code from master by running `git fetch; git merge`.  
4. Make your local changes:
  - Run `npm install` to install dependencies
  - Run `npm run test` to compile the typescript code to js and run tests. 
5. Commit and Push:
 - **Do not push directly to master !!!**
  - Commit your changes and push to create a new branch on GitHub by running ```git push origin my-local-branch-name```
  - On consecutive commit do **NOT** use ```commit ammend```. You should create a new commit and push to the same feature branch again. This will add extra commit to your pull request and retrigger voters.
6. Open the [repository](https://github.wdf.sap.corp/devx-wing/wing-service-binding) on GitHub and go to Code > Branches.
7. Open a Pull Request:
  - Click on ![image](https://github.wdf.sap.corp/storage/user/15516/files/f0632932-b48b-11e6-8c87-75a073ff4b9f) button next to your branch.
  - Edit pull request name with BLI or BCP. For example: _"BLI DEVXCORE-123: my new feature"_ or _"BCP 1670451810: Fix my bug"_.
  - A new branch *my-local-branch-name* is created in GitHub repository.
  - The new code should complete successfully all voters and code review.
8. Update existing Pull request: 
  - Stage your changes and create a new commit.
  - git fetch
  - git merge origin/master - merge your changes with the most updated master branch.
  - Push your changes to your *my-local-branch-name* (git push origin *my-local-branch-name*).
9. Merge a Pull Request:  
  - If all voters passed (XMake + JaaS Voter) click on ![image](https://github.wdf.sap.corp/storage/user/15516/files/a1501da6-b6fb-11e6-9240-37aa1b14409c) button (which should become green now).
  - If your pull request contains several commits you can choose to squash them together into one commit from GitHub by selecting ![image](https://github.wdf.sap.corp/storage/user/15516/files/c6415274-b6fb-11e6-98a6-d417a638b013) option in the merge drop down.
10. Delete your branch:
  - After merge has completed go to Code > Branches.
  - Look for your merged pull request and click on ![image](https://github.wdf.sap.corp/storage/user/15516/files/a4ac4604-b48b-11e6-84c7-8423bde60ec8) button.
  
  
### Tests and Coverage

* Run `npm run test` to run the Unit tests written in Mocha and coverage test


## Release
1. Bump version in expose ports github file:
  - [package.json](https://github.wdf.sap.corp/devx-wing/vscode-wing-service-binding/blob/master/package.json#L5).
  

    **_Notes:_**
    Make sure to follow this versioning concept:
    - When providing new features (as when releasing at end of sprint / when a new feature is ready) - bump major version (e.g: from 1.1.0 to 1.2.0)
    - When providing a bug fix to an existing version ("hot fix") - bump minor version (e.g: from 1.1.0 to 1.1.1)
2. Use [XMAKE Release Job](https://prod-build10100.wdf.sap.corp/job/devx-wing/job/devx-wing-wing-service-binding-SP-REL-common_indirectshipment/) (Stage and promote) to upload a new version to nexus (based on master)  
The XMAKE Release Job currently runs automaticly on merge.
3. The newly released version location in [nexus]
(http://nexus.wdf.sap.corp:8081/nexus/content/repositories/build.releases/com/sap/npm/wing-service-binding/)


  
  
  
