[![Build Status](https://gkeplatform2.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=modules-exploration-ci%2Fmaster)](https://gkeplatform2.jaas-gcp.cloud.sap.corp/job/modules-exploration-ci/job/master/)
[![Quality Gate Status](https://sonar.wdf.sap.corp/api/project_badges/measure?project=modules-exploration-service&metric=alert_status)](https://sonar.wdf.sap.corp/dashboard?id=modules-exploration)
[![Coverage](https://sonar.wdf.sap.corp/api/project_badges/measure?project=modules-exploration-service&metric=coverage)](https://sonar.wdf.sap.corp/dashboard?id=modules-exploration)
[![Lines of Code](https://sonar.wdf.sap.corp/api/project_badges/measure?project=modules-exploration-service&metric=ncloc)](https://sonar.wdf.sap.corp/dashboard?id=modules-exploration)


# @sap/modules-exploration
This is an npm package which provides the ability to explore the available modules/generators installed in a specific predefined folder at runtime. 
It provides two main APIs. One to get a list of explored modules and API to display the explored modules to the user in a yeoman-base prompt. <br> 

Explored Modules should follow the following guidelines:  <br>
1. Installed in /extbin/[MODULES-TYPE] specific folder  (e.g generators will be installed in /extbin/generators)
2. Include metadata file:  modules.json
The modules.json for generators should include the following parameters: 

```javascript
{
  templates: [
      "name": string, //This name will be displayed in the yeoman-base prompt as part of templates option list. (e.g "SAPUI5 Application")
      "path": string, //Relative path to the template's package. (e.g. "/generators/")
      "features" : [{name : string, values :string[]}], // an array of key-value objects. declares the generator supported features in which this generator can be filtered (e.g [{name:"protocol" : value : ["odataV4"]}])
    }
  ]
}
```

The modules.json for service-provider should include the following parameters: 
```javascript
{
  "serviceProviders":[
    {
      "name": string,//This name will be displayed in the yeoman-base prompt as part of service providers option list. (e.g "Steam Punk")
      "path": string, //Path to the service providers package. (e.g. "/extbin/serviceProviders/OdataProviders/SteamPunk-service-provider",
      "features" : [{name : string, values :string[]}], //an array of key-value objects. declares the service-provider supported features in which this module can be filtered (e.g [{name:"protocol" : value : ["odataV4"]}])
      "entryPoint" :{ //The main entry point to trigger the specific service provider logic
         "class" : "ServiceProviderExample ", //The main object
         "method" : "dummyServiceProviderPrompt" //The main method
      }
   }
  ]
}
```
More infromation can be found in [Consume-Service Cookbook](https://github.wdf.sap.corp/pages/devx-wing/CookBook/cross-scenario-tools/Consume-SAP-Services/)

# API
**getExploredModules** <br>
  Returns an array of explored modules metadata <br> <br>
  the return metatadata is of type ''IModuleInfo[]
**promptExploredModules** <br>
  Explores installed modules and prompt their metadata (name) to the user using the given generator. The prompt question can be passed as an input.
  If not passed, a generic question will be displayed <br>



## Release processs

Use [XMAKE Release Job]
(https://prod-build10100.wdf.sap.corp/job/devx-wing/job/devx-wing-modules-exploration-service-SP-REL-common_indirectshipment/) (Stage and promote) to upload a new version to nexus (based on master)  
The newly released version location in [nexus](http://nexus.wdf.sap.corp:8081/nexus/content/repositories/deploy.releases/com/sap/npm/modules-exploration/)
The XMAKE Release Job currently runs automatically on merge.
