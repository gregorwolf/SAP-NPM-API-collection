[![Build Status](https://gkeplatform2.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=service-providers-ci%2Fmaster)](https://gkeplatform2.jaas-gcp.cloud.sap.corp/job/service-providers-ci/job/master/)
[![Quality Gate Status](https://sonar.wdf.sap.corp/api/project_badges/measure?project=service-providers&metric=alert_status)](https://sonar.wdf.sap.corp/dashboard?id=service-providers)
[![Coverage](https://sonar.wdf.sap.corp/api/project_badges/measure?project=service-providers&metric=coverage)](https://sonar.wdf.sap.corp/dashboard?id=service-providers)
[![Lines of Code](https://sonar.wdf.sap.corp/api/project_badges/measure?project=service-providers&metric=ncloc)](https://sonar.wdf.sap.corp/dashboard?id=service-providers)

# service-providers 
This module provides various service providers:
# Direct URL Service Provider
Provides the ability to consume a service from a URL ( a direct service url rather then through SAP cloud destination service. 
The main use case is when creating an application for demo use or for local development when detached from SAP Cloud

# LocaL Metadata File Service Provider
Provides the ability to use a dummy service represented by metadata.xml file from the local workspace of the developer. 
The main use case is when creating an application for demo use and run it with mock data. 

# Current Project Service Provider 
Provides the ability to consume services from the current CAP project. The service can be java or node.
The main use case is: a developer adds a *UI* module to *CAP* project and he wants to bind the UI with a service (java/node) he has in his project.
The flow contains also a change of connectivity details in the `package.json/mta.yaml/xsapp.json`, where we declare the dependencies. Later on, the dependency will be reflected in the `Run Configuration`.


## Requirements
The flow starts and ends in the same behaviour we have for service consumption. 
Additional scenario will be added to the system selecti on:

    My SAP system
    API hub
    Current project
    Local (will be the next one)
When user selects 'Current project' we should display the all found services from the current CAP project.
</br>The services can be: *Java, Node*.
</br>The format should be: *'service name'*.
</br>Service biding (data connection) - the flow is: binding a service to a UI module, therefore the binding process should be as it is today update service's dependency in the `package.json/mta.yaml/xsapp.json`.

## Implementation details

## Setup
 In order to integrate with ['Consume-Services'](https://github.wdf.sap.corp/pages/devx-wing/CookBook/cross-scenario-tools/Consume-SAP-Services/) flow, the *'project service provider'* should follow the guidelines for the 'Consume-Services' module to call it on runtime:
</br>- it should be installed under a specific folder - /extbin/serviceProviders/
</br>- it includes a ['modules.json'](https://github.wdf.sap.corp/devx-wing/service-providers/blob/master/modules.json) file at the root level of the project in the following format:

    {
    "serviceProvider": [{
      "name": "Project Service Provider",
      "path": "/extbin/serviceProviders/service-providers",
      "features" : [{ "name": "protocol", "value": ["odataV4"]}, { "name":"targetEnvironment", "value" :["CAP"]}],
      "entryPoint" :{
      "class" : "ProjectServiceProvider",
         "method" : "prompt"
       }
     }]
    }
	
### Input
In order to be able to recognize an available services, the correct project/module root path should be provided at time the consume-services step invoked.
	
### Output
 The *'Project Service Provider'* outputs a connectivity details of the selected service as a JSON structure like following:
 
    {
      serviceURL: string,
      destination: string, // stringified json the selected system destination as received from destination service,
      serviceMetadata: {
        odataContent: string // A string represents the OData metadata file of the selected service
      }
    }


## Manual step, before release (for updating BoM with NPM SAP Packages)
if the **package.json** file was changed, you **must** update the "**rel-package-lock.json**" file. To do this use, the following **.npmrc** file:
    ```
    registry=https://nexus.wdf.sap.corp:8443/nexus/content/groups/build.releases.npm/
   @sap:registry=https://nexus.wdf.sap.corp:8443/nexus/content/groups/build.releases.npm/
   strict-ssl=false
   https-proxy=null
   proxy=null
   unsafe-perm=true
    ```

 - Run the npm install command
 - Copy the content of the 'package-lock.json' file to the 'rel-package-lock.json' file



## Release processs

Use [XMAKE Release Job](https://prod-build10100.wdf.sap.corp/job/devx-wing/job/devx-wing-service-providers-SP-REL-common_indirectshipment/) (Stage and promote) to upload a new version to nexus (based on master)  
The newly released version location in [nexus](https://repositories.sap.ondemand.com/nexus/content/repositories/deploy.releases/com/sap/npm/service-providers/) 


## Manual step, after release (for public release)
In order to release to public NPM you should create a JIRA ticket and updated the '@sap/my-module' with the module name:
</br>[JIRA template for npm module publication request to the external repository](https://sapjira.wdf.sap.corp/secure/CreateIssueDetails!init.jspa?pid=20037&issuetype=6&summary=npm+module+publication+request&components=59799&description=Please%20mark%20%5Bx%5D%20the%20lines,%20which%20are%20valid:%0A%5B+%5D%20I%20have%20the%20approval%20from%20my%20Delivery%20or%20Program%20Manager%20to%20ship%20this%20module%20via%20SAP%20NPM%20Registry.%0A%5B+%5D%20I%20agree,%20that%20the%20module%20is%20published%20under%20the%20SAP%20developer%20license%20%28if%20no%20license%20in%20package.json%20specified%29%0A%5B+%5D%20I%20will%20provide%20regular%20support%20for%20SAP%20customers%20in%20case%20there%20are%20issues%20with%20my%20module.%0AI%20confirm%20that%20the%20module%20to%20be%20published:%0A%5B+%5D%20is%20part%20of%20a%20program.%0A%5B+%5D%20is%20compliant%20to%20SAP%20product%20standards%20and%20to%20the%20product%20standards%20defined%20in%20my%20program.%0A%5B+%5D%20has%20the%20following%20ECCN%20classification:%20NO%20CLASSIFICATION.%0A%5B+%5D%20can%20be%20used%20free%20of%20charge,%20there%20is%20no%20price%20tag%20attached%20to%20it.%0A%5B+%5D%20can%20be%20used%20by%20anyone%20outside%20SAP%20and%20is%20not%20limited%20to%20SAP%20customers%20only.%0A%5B+%5D%20has%20the%20scope%20@sap,%20e.g.%27name%27:%20%27@sap/my-module%27.%0A%5B+%5D%20contains%20a%20README.MD%20file%20that%20provides%20documentation%20about%20the%20module%20functionality.%0A%5B+%5D%20contains%20an%20up%20to%20date%20CHANGELOG.MD%20file%20that%20provides%20documentation%20about%20the%20module%20release%20history.%0A%5B+%5D%20contains%20an%20npm-shrinkwrap.json%20in%20order%20to%20guarantee%20a%20reproducible%20installation.%0A%0ARelease%20notes:%0AThe%20CHANGELOG.md%20will%20serve%20as%20release%20information.%0AA%20%2B1%20from%20Documentation%20Development%20is%20required%20in%20order%20to%20get%20published.%0ATo%20get%20the%20%2B1,%20you%20need%20to%20provide%20a%20Github%20link%20pointing%20to%20an%20up%20to%20date%20CHANGELOG.md%20to%20Documentation%20Development%20(Rene%20Jeglinsky).%0A%0A%3Cnote%3EPlease%20clarify%20)
