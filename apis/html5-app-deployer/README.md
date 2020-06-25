@sap/html5-app-deployer
==============
[![Build Status](https://travis-ci.mo.sap.corp/html5-apps-repo/html5-app-deployer.svg?token=WNUCzC1QGN7ssw8yMAqk&branch=master)](https://travis-ci.mo.sap.corp/html5-apps-repo/html5-app-deployer)

<!-- toc -->
- [Overview](#overview)
- [Deploying HTML5 Application Deployer App](#deploying-html5-application-deployer-app)
  * [Deploying HTML5 Application Deployer App Using cf push](#deploying-html5-application-deployer-app-using-cf-push)
  * [Deploying HTML5 Application Deployer App using cf deploy](#deploying-html5-application-deployer-app-using-cf-deploy)
- [Undeploy HTML5 Application Deployer Apps](#undeploy-html5-application-deployer-apps)
  * [Delete HTML5 Application Deployer App Using cf delete](#delete-html5-application-deployer-app-using-cf-delete)
  * [Undeploy HTML5 Application Deployer App Using cf undeploy](#undeploy-html5-application-deployer-app-using-cf-undeploy)
- [Redeploy HTML5 Application Deployer App](#redeploy-html5-application-deployer-app)

## Overview
HTML5 application deployer handles the upload of the HTML5 applications content to the HTML5 application repository.

The @sap/html5-app-deployer module is consumed as a dependency in a node.js CF application.

For example:
 ```
 {
   "name": "myAppDeployer",
   "engines": {
     "node": ">=6.0.0"
   },
   "dependencies": {
     "@sap/html5-app-deployer": "2.0.1"
   },
   "scripts": {
     "start": "node node_modules/@sap/html5-app-deployer/index.js"
   }
 }
 ```


Below the root folder, the HTML5 applications deployer app can contain a "resources" folder for the static files of the HTML5 application.

For example:
```
cf create-service html5-apps-repo app-host myApps-app-host
```

If no "resources=" tag is provided HTML5 application deployer will still try to upload files from resources folder. If no resources folder is found,the upload will fail.In the resources folder there should be one folder or one zip archive for each application that should be uploaded. 
In each application folder/zip archive there should be two files at root level: manifest.json and xs-app.json. 

For example:   
   ```
   myAppsDeployer
     + node_modules
     - resources
       - app1
         index.html
         manifest.json
         xs-app.json
       - app2
         ...
     package.json
     manifest.yaml
       
   ```

The manifest.json file should contain at least sap.app.id and sap.app.applicationVersion.version. 

Note that sap.app.id and sap.app.applicationVersion.version are used in the HTML5 application repository as applicationName and applicationVersion. If sap.app.id contains dots or dashes, they will be removed in the applicationName.
The version format must be xx.xx.xx, whereas x is a digit. For example: 1.0.10

Note that different app-host service instances cannot be used to upload applications with the same application id/name.

For example:
   ```
   manifest.json
   {
     "_version": "1.7.0",
     "sap.app": {
       "id": "app1",
       "type": "application",
       "i18n": "i18n/i18n.properties",
       "applicationVersion": {
         "version": "1.0.0"
       }
     }
   }
   ```

The xs-app.json file that can be used by the application router to support application routing. 
For example:
   ```
   xs-app.json
   "welcomeFile": "index.html",
   "authenticationMethod": "route",
   "routes": [
    {
      "source": "^/be(.*)",
      "target": "$1",
      "destination": "mybackend"
    },
    {
      "source": "^(/.*)",
      "target": "$1",
      "service": "html5-apps-repo-rt"
    }
   ]
   }
   ```

The @sap/html5-app-deployer consumer application should be bound to a single html5-apps-repo service instance of the app-host service plan. 
When the @sap/html5-app-deployer consumer application is started, the @sap/html5-app-deployer module creates a zip archive for each folder in the “resources” folder - if it is not zipped already - and triggers the upload of all zip archives to the HTML5 application repository via multi-part request.

## Deploying HTML5 Application Deployer App
To deploy an sap/html5-app-deployer consumer application in the Cloud Foundry environment you can choose one of the following procedures: 

### Deploying HTML5 Application Deployer App Using cf push

#### 1. Create a manifest.yaml file in the following format:
```
applications:

- name: myAppsDeployer
  no-route: true
  memory: 128M
  services:
    - myApps-app-host
```

#### 2. Create an html5-apps-repo service instance of the app-host plan using CF CLI
```
cf create-service html5-apps-repo app-host myApps-app-host
```

#### 3. Push to CF
```
cf push -f manifest.yaml
```
#### 4. Stop sap/html5-app-deployer consumer application
After @sap/html5-app-deployer consumer application has uploaded the  content successfully, stop the application to avoid using up CF container resources.

```
cf stop myAppsDeployer
```

### Deploying HTML5 Application Deployer App using cf deploy
To use cf deploy the installation of the deploy plugin is required, see [deploy plugin documentation](https://github.com/SAP/cf-mta-plugin/blob/master/README.md)
In addition, create an *.mtar archive using WebIDE or MTA Build Tool.

#### 1. Create an mtad.yaml file.
The MTA project should have an mtad.yaml file in the following format:
```
ID: myApps.deployer                  //MTA ID 
_schema-version: '2.0'
version: 0.0.3
 
modules:
 - name: myAppsDeployer
   type: com.sap.html5.application-content
   path: deployer/
   requires:
    - name: myApps-app-host
 
  
resources:
 - name: myApps-app-host                 //Resource name
   type: org.cloudfoundry.managed-service
   parameters:
     service: html5-apps-repo            //Service name
     service-plan: app-host              //Service plan
     service-name: myApps-app-host       //Service instance name
```
#### 2. Generate *.mtar file.
Use the WebIDE build or the MTA Build Tool to generate a valid myAppDeployer.mtar file.

#### 3. Deploy *.mtar file.
```
cf deploy myAppsDeployer.mtar
```
After deploying the *.mtar file, an application called myAppsDeployer (stopped) is shown in cf apps.

## Undeploy HTML5 Application Deployer Apps
When you undeploy the  HTML5 application deployer app using MTA ID, the related HTML5 application repository content should be deleted too.

### Delete HTML5 Application Deployer App Using cf delete
If you have used the cf push command to deploy the app, delete the HTML5 application deployer app manually:

#### 1. Unbind html5-apps-repo app-host service instance.
For example:
```
cf unbind-service  myAppsDeployer myApps-app-host
```

#### 2. Delete html5-apps-repo app-host service instance
This step deletes the HTML5 application respository content.
For example
```
cf delete-service  myApps-app-host
```
This step deletes the HTML5 application repository content.

#### 3. Delete the HTML5 application deployer app.
For example:
```
cf delete  myAppsDeployer
```

### Undeploy HTML5 Application Deployer App Using cf undeploy
When you undeploy the HTML5 application deployer app, the HTML5 application deployer app is deleted and you can - in the same step - delete the app-host service instance of the html5-apps-repo. To delete the app-host service instance of the html5-apps-repo, the  --delete-service parameter should be passed. 
Note that the undeploy requires the mta id, which can be obtained by calling cf mtas or from the mtad.yaml ID.

#### 1. Undeploy HTML5 Application Deployer App and delete the service instance
For example:
```
cf undeploy myApps.deployer --delete-services
```

## Redeploy HTML5 Application Deployer App
After making changes to the static content files of HTML5 applications, the new content can be redeployed to the HTML5 application repository. 
All content referenced by the app-host service instance id is replaced by the new content. 


