# @sap/service-provider-apis
## Overview
**service-provider-apis** is an npm package that provides the APIs necessary for exposing services using the 'SAP Service Center'.

## Usage
To add this package as a dependency in your **package.json** file, under the "dependencies" section, add the following dependency: `"@sap/service-provider-apis": [Version]`

## APIs
This object exposes APIs for the exploration of SAP systems and services.

### __getServices__  

This API retrieves a list of services from a specific provider system.  

  `getServices(options?: Record<string, any>): Promise<Service[]>;`  
  
**options (this is optional)**: The following parameters are optional:  
&nbsp;&nbsp;&nbsp;&nbsp; *credentials (this is optional)*: for services that require authentication.  
&nbsp;&nbsp;&nbsp;&nbsp; *filter (this is optional)*: used to filter for relevant services.  
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.      

### __getMetadata__  

This API retrieves the metadata of a specific service.  

  `getMetadata(
    service: Service,
    encoding: EncodingMode,
    options?: Record<string, any>,
    relativeUrl?: string,
    credentials?: Authentication
  ): Promise<ServiceMetadata>;`  
  
**service**: Defines the service from which the metadata will be retrieved.  
**encoding**: Defines the required encoding requested by the consumer.  
**options (this is optional)**: The following parameters are optional:  
&nbsp;&nbsp;&nbsp;&nbsp; *credentials (this is optional)*: for services that require authentication.  
&nbsp;&nbsp;&nbsp;&nbsp; *filter (this is optional)*: used to filter for relevant services.  
&nbsp;&nbsp;&nbsp;&nbsp; *relativeUrl* (this is optional)*: for a non-full URL - provides the relative URL to the service.  
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.   

### __getAnnotations__  

This API retrieves the annotations of a specific service.  

  `getAnnotations(service: Service, options?: Record<string, any>): Promise<Annotation[]>`  
  
**service**: Defines the service from which the metadata will be retrieved.  
**options (this is optional)**: The following parameters are optional:   
&nbsp;&nbsp;&nbsp;&nbsp; *credentials (this is optional)*: for services that require authentication.  
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error message.   

### __getJsonEntityData__  

This API retrieves data for a specific service's entity.  

  `getJsonEntityData(service: Service, entity: string, options?: Record<string, any>): Promise<ServiceCommon>`  
  
**service**: The service for which to return the entity's data.</br> 
**entity**:  The name of the entity for which we are retrieving the data.  
**options (this is optional)**: The following are optional:   
&nbsp;&nbsp;&nbsp;&nbsp; *credentials*: For services that require authentication. </br> 
&nbsp;&nbsp;&nbsp;&nbsp; *relativeUrl*: The relative path to the service (used in a non-full URL service). </br> 
&nbsp;&nbsp;&nbsp;&nbsp; *filter*: A map of OData request parameters that affect the data response for the entity.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for example: `new Filter(new Map([["$top", ["2"]]]]))` returns only the two top data rows.   
**throws ServiceProviderError**: If there is an error, this throws a "ServiceProviderError" error type.   


## Optional Parameters  
*Create credentials object - used to access a system or service that requires authentication*  
`const credentials = getCredentialsObject("username", "password");`  

- **credentials**: *an object that enables you to add credentials to your system request.  
    &nbsp;&nbsp;&nbsp;&nbsp; *USER*: system username  
    &nbsp;&nbsp;&nbsp;&nbsp; *PSW*: system password  
    Credentials can be built as follows:*  
    credentials = new Authentication(<USR>, <PSW>);  

*Create a filter object - used to filter for needed services*  
`const filter = getNewFilter("protocol", ["odatav2"]);`  

- **filter**: an object that enables you to filter for systems that you want to receive.  
    &nbsp;&nbsp;&nbsp;&nbsp; *FILTER_KEY*: (string) A key used to filter the list of systems.  
    &nbsp;&nbsp;&nbsp;&nbsp; *FILTER_VALUES*: (array of strings) accepted values of the filter key, separated by commas.  
    Filters can be built as follows:  
    filter = new Filter(new Map([[<FILTER_KEY>, <FILTER_VALUES>]]));  

### Git and GitHub

1. Open Git Bash, go to the local repository directory and sync with the remote repository.
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
- When providing new features (when releasing at end of the sprint or when a new feature is ready), bump a major version (for example, from 1.1.0 to 1.2.0).
- When providing a bug fix to an existing version ("hotfix"), bump a minor version (for example, from 1.1.0 to 1.1.1).
