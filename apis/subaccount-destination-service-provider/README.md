# @sap/subaccount-destination-service-provider

## Overview

**subaccount-destination-service-provider** is an npm package that provides the APIs necessary for exposing subaccount destination systems and services.

## Usage

To add this package as a dependency in your **package.json** file, under the "dependencies" section, add the following dependency: `"@sap/subaccount-destination-service-provider": [Version]`

## APIs

This repository exposes APIs for the exploration of SAP systems and services that are consumed from the Business Application Studio (BAS) subaccount.

### init

This API initializes a provider repository representing a given subaccount.

`async init(): Promise<void>`

**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.  
&nbsp;&nbsp;&nbsp;&nbsp; _INTERNAL_ERROR_: This error is displayed for any other exception.

### getSystems

This API retrieves systems exposed by the subaccount.

`async getSystems(filter?: Filter): Promise<ProviderSystem[]>`

**filter (this is optional)**: Only retrieves systems that comply with the given filter.
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.  
&nbsp;&nbsp;&nbsp;&nbsp; _RETRIEVE_DATA_: This error is displayed if data cannot be retrieved from the system.  
&nbsp;&nbsp;&nbsp;&nbsp; _INTERNAL_ERROR_: This error is displayed for any other exception.

### getServices

This API retrieves services exposed by a specific system.

`async getServices(options?: Record<string, any>): Promise<Service[]>`

**options (this is optional)**: The following parameters are optional:  
&nbsp;&nbsp;&nbsp;&nbsp; _credentials (this is optional)_: for services that require authentication.  
&nbsp;&nbsp;&nbsp;&nbsp; _filter (this is optional)_: Used to filter for relevant services.  
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.  
&nbsp;&nbsp;&nbsp;&nbsp; _RETRIEVE_DATA_: This error is displayed if data cannot be retrieved from the system.
&nbsp;&nbsp;&nbsp;&nbsp; _INTERNAL_ERROR_: This error is displayed for any other exception.

### getMetadata

This API retrieves metadata exposed by a specific system.

`async getMetadata( service: Service, encoding: EncodingMode, options?: Record<string, any> ): Promise<ServiceMetadata>`

**service**: Defines the service from which the metadata will be retrieved.  
**encoding**: Defines the required encoding requested by the consumer.  
**options (this is optional)**: The following parameters are optional:  
&nbsp;&nbsp;&nbsp;&nbsp; _credentials (this is optional)_: for services that require authentication.  
&nbsp;&nbsp;&nbsp;&nbsp; _filter (this is optional)_: Used to filter for relevant services.
&nbsp;&nbsp;&nbsp;&nbsp; _relativeUrl_ (this is optional)*: for a non-full URL - provides the relative URL to the service.  
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.  
&nbsp;&nbsp;&nbsp;&nbsp; *RETRIEVE_DATA*: This error is displayed if metadata cannot be retrieved from the service.  
&nbsp;&nbsp;&nbsp;&nbsp; *INTERNAL_ERROR\*: This error is displayed for any other exception.

### getAnnotations

This API retrieves an array of annotations exposed by a specific system.

`async getAnnotations(service: Service, options?: Record<string, any>): Promise<Annotation[]`

**service**: Defines the service from which the annotations will be retrieved.  
**options (this is optional)**: The following parameters are optional:  
&nbsp;&nbsp;&nbsp;&nbsp; _credentials (this is optional)_: for services that require authentication.  
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.  
&nbsp;&nbsp;&nbsp;&nbsp; _RETRIEVE_DATA_: This error is displayed if annotations cannot be retrieved from the service.  
&nbsp;&nbsp;&nbsp;&nbsp; _INTERNAL_ERROR_: This error is displayed for any other exception.

## Examples

_Initialize repository_
`await saRepo.init();`

_List subaccount systems (destinations)_  
`const saSystems = await saRepo.getSystems();`

_Create credentials object - Used to access a system or service that requires authentication._  
`const credentials = getCredentialsObject("username", "password");`

_Select a system and list the catalog services that it provides._  
_Note: Add credentials since the system needs authentication._  
`const saSelectedSystem = findByName(saSystems, "U1Y010_BASIC");`  
`const saServices = await saSelectedSystem.getServices({credentials: credentials});`

_Create a filter object - Used to filter for required services._  
`const filter = getNewFilter("protocol", ["odatav2"]);`

_Select a service and consume the metadata and annotations that it provides._  
_Note: Add credentials since the system needs authentication._  
`const saSelectedService = findByName(saServices, "ZPAGE_BUILDER_CUST");`  
`const saMetadata = await saSelectedSystem.getMetadata(saSelectedService, saProvider.EncodingMode.XML, {credentials: credentials, filter: filter});`  
`const saAnnotations = await saSelectedSystem.getAnnotations(saSelectedService, {credentials: credentials});`

- **credentials**: An object that enables you to add credentials to your system request.  
   &nbsp;&nbsp;&nbsp;&nbsp; _USER_: system username  
   &nbsp;&nbsp;&nbsp;&nbsp; _PSW_: system password  
   Credentials can be built as follows:\*  
   credentials = new Authentication(<USR>, <PSW>);

- **filter**: An object that enables you to filter for systems that you want to receive.  
   &nbsp;&nbsp;&nbsp;&nbsp; _FILTER_KEY_: (string) A key used to filter the list of systems.  
   &nbsp;&nbsp;&nbsp;&nbsp; _FILTER_VALUES_: (array of strings) accepted values of the filter key, separated by commas.  
   Filters can be built as follows:  
   filter = new Filter(new Map([[<FILTER_KEY>, <FILTER_VALUES>]]));

### Git and GitHub

1. Open Git Bash, go to the local repository directory, and sync with the remote repository.

2. Develop in a **Local** branch.

- Create a new descriptive branch `git checkout -b my-local-branch-name` <br>**OR** rename the previous one `git branch -m my-local-branch-name`.
- Make sure _my-local-branch-name_ is **NOT master** and that there is **no existing** branch with this name.

3. Sync with the remote repository.

- Fetch the code from the master branch by running `git fetch; git merge`.

4. Make your local changes.

- Run `npm install` to install dependencies.
- Run `npm run test` to compile the TypeScript code to JavaScript and run tests.

5. Commit and push.

- **Do not push directly to master!!!**
- Commit your changes and push to create a new branch on GitHub by running `git push origin my-local-branch-name`
- On consecutive commits **DO NOT** use `commit amend`. You should create a new commit and push to the same feature branch again. This will add an extra commit to your pull request and retrigger the voters.

6. Open a pull request.

- Click 'New pull request' next to your branch.
- Edit the pull request name with BLI or BCP. For example: _"BLI DEVXCORE-123: my new feature"_ or _"BCP 1670451810: Fix my bug"_.
- A new branch _(my-local-branch-name)_ is created in the GitHub repository.
- The new code should enable all voters and code review to pass successfully.

7. Update the existing pull request.

- Stage your changes and create a new commit.
- Perform Git fetch.
- Perform Git merge on origin/master - Merge your changes with the most updated master branch.
- Push your changes to your _my-local-branch-name_ (Git push origin _my-local-branch-name_).

8. Merge the pull request.

- If all voters passed (XMake + JaaS Voter), click 'Merge pull request'.
- If your pull request contains several commits, you combine them in one commit from GitHub by selecting the 'Confirm squash and merge' option from the Merge dropdown list.

9. Delete your branch.

- After the merge is complete, go to **Code > Branches**.
- Look for your merged pull request and click the delete branch icon.

### Tests and Coverage

- Run `npm run test` to run the unit tests written in Mocha and the coverage test.

## Release

Bump the version in the "package.json" GitHub file.

**_Notes:_**
Make sure to follow this versioning concept:

- When providing new features (when releasing at the end of the sprint or when a new feature is ready), bump a major version (for example, from 1.1.0 to 1.2.0).
- When providing a bug fix to an existing version ("hotfix"), bump a minor version (for example, from 1.1.0 to 1.1.1).
