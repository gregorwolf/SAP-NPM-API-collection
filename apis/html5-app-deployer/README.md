@sap/html5-app-deployer
==============

[![Build Status](https://gkehtml5appsrepo.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=Dependency-Check-html5-app-deployer-voter%2Fmaster)](https://gkehtml5appsrepo.jaas-gcp.cloud.sap.corp/view/voter/job/Dependency-Check-html5-app-deployer-voter/job/master/)


<!-- toc -->
- [Overview](#overview)
- [Deploying HTML5 Applications to SAP BTP, Cloud Foundry Environment](#Deploying-HTML5-Applications-to-SAP-BTP-Cloud-Foundry-Environment)
  * [Deploying HTML5 Applications Using cf push](#deploying-html5-applications-using-cf-push)
  * [Deploying HTML5 Applications Using cf deploy](#deploying-html5-applications-using-cf-deploy)
  * [Deleting HTML5 Applications Using cf delete](#deleting-html5-applications-using-cf-delete)
  * [Un-deploying HTML5 Applications Using cf undeploy](#un-deploying-html5-applications-using-cf-undeploy)
  * [Redeploying HTML5 Applications](#redeploying-html5-applications)
- [Deploying HTML5 Applications to SAP BTP, Kyma Runtime](#Deploying-HTML5-Applications-to-SAP-BTP-Kyma-Runtime)
  * [Deploying HTML5 Applications with Automatic Creation of Destination Configurations](#deploying-html5-applications-with-automatic-creation-of-destination-configurations)
  * [Deploying HTML5 Applications with Service Instances Binding to the HTML5 Application Deployer](#Deploying-HTML5-Applications-with-Service-Instances-Binding-to-the-HTML5-Application-Deployer)
    * [Defining a Business Solution as a Content Provider](#defining-a-business-solution-as-a-content-provider)
- [Enable Process Exit After Upload](#enable-process-exit-after-upload)


## Overview
HTML5 application deployer handles the upload of the HTML5 applications content to the HTML5 application repository.

The @sap/html5-app-deployer module can be consumed as a dependency in a node.js CF application or as a base image in an HTML5 application image.

Here is an example of the node.js dependency:
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

Here is an example of a Dockerfile of a base image:
  ```
  FROM build-milestones.common.repositories.cloud.sap/com.sap.html5.deployer/html5-app-deployer-3.1:3.1.1 

  RUN sed -i -E 's/(CipherString\s*=\s*DEFAULT@SECLEVEL=)2/\11/' /etc/ssl/openssl.cnf && \
  mkdir -p /app && \
  chown node.node /app

  # Create app directory
  WORKDIR /app

  # Bundle app source
  COPY . .

  EXPOSE 5000
  CMD [ "npm", "start" ]
  ```

Below the root folder, the HTML5 applications deployer app can contain a "resources" folder for the static files of the HTML5 application.

If no "resources=" tag is provided HTML5 application deployer will still try to upload files from resources folder. If no resources folder is found,the upload will fail. In the resources folder there should be one folder or one zip archive for each application that should be uploaded. 
In each application folder/zip archive there should be two files at root level: `manifest.json` and `xs-app.json`. 

Here is an example of the HTML5 application deployer application:   
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
Here is an example of the HTML5 application deployer image:
  ```
  myApp
    - resources
      - app1
        index.html
        manifest.json
        xs-app.json
      - app2
        ...
    Dockerfile
  ```

The manifest.json file should contain at least `sap.app.id` and `sap.app.applicationVersion.version` properties. 

`sap.app.id` and `sap.app.applicationVersion.version` properties are used in the HTML5 application repository as applicationName and applicationVersion. If `sap.app.id` contains dots or dashes, they will be removed in the applicationName.
The version format must be xx.xx.xx, whereas x is a digit. For example: 1.0.10

Optionally, the `sap.cloud.service` property may be used to specify the business solution to which this html5 application belongs. In case it is defined as `public` the application will be accessible from all subaccounts.

For example (`manifest.json`):
```
   {
     "_version": "1.7.0",
     "sap.app": {
       "id": "app1",
       "type": "application",
       "i18n": "i18n/i18n.properties",
       "applicationVersion": {
         "version": "1.0.0"
       },
       ......
       "sap.cloud": {
	    "public": true,
	    "service": "com.sap.test.service"
       }
     }
   }
```

The `xs-app.json` file that can be used by the application router to support application routing. 
For example:
   ```
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

The `@sap/html5-app-deployer` consumer application should be bound to a single html5-apps-repo service instance of the app-host service plan.
When the `@sap/html5-app-deployer` consumer application is started, the `@sap/html5-app-deployer` module creates a zip archive for each folder in the “resources” folder - if it is not zipped already - and triggers the upload of all zip archives to the HTML5 application repository via multi-part request.

Note that different app-host service instances cannot be used to upload applications with the same application id/name.

## Deploying HTML5 Applications to SAP BTP Cloud Foundry Environment
To deploy an sap/html5-app-deployer consumer application in the Cloud Foundry environment you can choose one of the following procedures: 

### Deploying HTML5 Applications Using cf push

#### 1. Create a `manifest.yaml` file in the following format:
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

### Deploying HTML5 Applications using cf deploy
To use cf deploy the installation of the deploy plugin is required, see [deploy plugin documentation](https://github.com/SAP/cf-mta-plugin/blob/master/README.md)
In addition, create an *.mtar archive using WebIDE or MTA Build Tool.

#### 1. Create an mta.yaml file.
The MTA project should have an `mta.yaml` file in the following format:
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
Use the SAP Business Application Studio build functionality or the [MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/) to generate a valid `myAppDeployer.mtar` file.

#### 3. Deploy *.mtar file.
```
cf deploy myAppsDeployer.mtar
```
After deploying the `*.mtar` file, an application called myAppsDeployer (stopped) is shown in SAP BTP cockpit Cloud Foundry applications section.

### Undeploy HTML5 Application Deployer Apps
When you undeploy the  HTML5 application deployer app using MTA ID, the related HTML5 application repository content should be deleted too.

### Deleting HTML5 Applications Using cf delete
If you have used the cf push command to deploy the app, delete the HTML5 application deployer app manually:

#### 1. Unbind html5-apps-repo app-host service instance.
For example:
```
cf unbind-service  myAppsDeployer myApps-app-host
```

#### 2. Delete html5-apps-repo app-host service instance
This step deletes the HTML5 application respository content.
For example:
```
cf delete-service  myApps-app-host
```
This step deletes the HTML5 application repository content.

#### 3. Delete the HTML5 application deployer app.
For example:
```
cf delete  myAppsDeployer
```

### Un-deploying HTML5 Applications Using cf undeploy
When you undeploy the HTML5 application deployer app, the HTML5 application deployer app is deleted and you can - in the same step - delete the app-host service instance of the html5-apps-repo. To delete the app-host service instance of the html5-apps-repo, the  --delete-service parameter should be passed. 
Note that the undeploy requires the mta id, which can be obtained by calling cf mtas or from the `mta.yaml` ID.

#### 1. Undeploy HTML5 Application and delete the service instance
For example:
```
cf undeploy myApps.deployer --delete-services
```

### Redeploying HTML5 Applications
After making changes to the static content files of HTML5 applications, the new content can be redeployed to the HTML5 application repository. 
All content referenced by the app-host service instance id is replaced by the new content. 

### Asynchronous Upload
You can specify that upload content should be performed asynchronously by adding environment variable ASYNC_UPLOAD to manifest.yaml or mta.yaml files.
Asynchronous upload means that the html5 applications content will be handled synchronously to HTML5 Application Repository but the internal file validation and processing will be performed asynchronously.
In this setup, you will have to check the html5 application deployer logs to verify that the upload was completed successfully. 
Using asynchronous upload is specially important when triggering upload of service instance with large content (more than 10 MB). In such cases synchronous upload might cause health check errors or connection timeout during upload.

## Deploying HTML5 Applications to SAP BTP Kyma Runtime

### Deploying HTML5 Applications with Automatic Creation of Destination Configurations
If you use the HTML5 application deployer together with an application router managed by SAP, you can enable that the required destination configurations pointing to the service instances are created automatically.

To enable the automatic creation of destination configurations, add the environment variable SAP_CLOUD_SERVICE with the value of the sap.cloud.service property in the html5 application manifest.json file of the HTML5 application that you want to deploy. 
The destination configurations can point to instances of the following services:

To following types of destination configurations can be created:

- An HTML5 Application Repository service instance of the app-host service plan (mandatory)
- An SAP Authorization and Trust Management (XSUAA) service instance (optional)
  To create a destination that points to an SAP Authorization and Trust Management (XSUAA) service instance, the SAP Authorization and Trust Management (XSUAA) service instance and a destination service instance must be bound to the HTML5 application deployer.
- A business service instance (optional)
  To create a destination that points to a business service instance, the business service instance must be bound to the HTML5 application deployer.
- One or more backend destinations that point to cloud or on-premise backend applications.
  These destinations are modeled using the environment variable BACKEND_DESTINATIONS

**Note**: To enable app-to-app navigation, you also have to add the environment variable IAS_DEPENDENCY_NAME and provide the name of the dependency that has been configured for the Identity Authentication token exchange that is required for app-to-app navigation. For more information about how to configure the dependency for app-to-app navigation, see Consume an API from Another Application .
You would typically use the automatic creation of destination configurations in Kubernetes when the HTML5 application deployer application has been previously uploaded as a docker image to Artifactory or Docker Hub. See, for example, this Kubernetes deployment:
For example (Kubernetes deployment.yaml) :
```
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: html5appdeployer
  namespace: default
  labels:
    app: html5appdeployer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: html5appdeployer
  template:
    metadata:
      labels:
        app: html5appdeployer
    spec:
      containers:
        - image: html5-apps-repo.docker.repositories.sap.ondemand.com/myapp-html5-app-deployer:1.0
          name: html5appdeployer
          volumeMounts:
            - name: html5-repo-app-host-volume
              mountPath: "/etc/secrets/sapcp/html5-apps-repo/myapp-app-host-instance"
              readOnly: true
            - name: xsuaa-volume
              mountPath: "/etc/secrets/sapcp/xsuaa/myapp-xsuaa-instance"
              readOnly: true
            - name: destination-volume
              mountPath: "/etc/secrets/sapcp/destination/myapp-destination-instance"
              readOnly: true
          env:
            - name: PORT
              value: "5000"
            - name: SAP_CLOUD_SERVICE
              value: "com.sap.test.service"
            - name: BACKEND_DESTINATIONS
              value: "[{
              \"Name\":\"myapp-backend\",
              \"Description\":\"My application backend\",
              \"Type\":\"HTTP\",
              \"ProxyType\":\"Internet\",
              \"URL\":\"https://<backendApplicationHost>/\",
              \"Authentication\":\"NoAuthentication\",
              \"HTML5.ForwardAuthToken\": true}]"
      imagePullSecrets:
        - name: backend-dockersecret
      volumes:
        - name: html5-repo-app-host-volume
          secret:
            secretName: myapp-app-host-binding
        - name: xsuaa-volume
          secret:
            secretName: myapp-xsuaa-binding
        - name: destination-volume
          secret:
            secretName: myapp-destination-binding

```
### Deploying HTML5 Applications with Service Instances Binding to the HTML5 Application Deployer
If you use the HTML5 application deployer together with an application router managed by SAP, you can bind the required service instances directly to the HTML5 application deployer application.
These service instance bindings can refer to the following service types: XSUAA (for authentication/authorization), destination service (for backend destination configuration on instance level) and other business solutions, such as SBPA or document service. 

**Important**: a precondition for this modelling to work is that the ASYNC_UPLOAD environment variable is set to true. For more details see [asynchronous upload](#asynchronous-upload).

### Additional Configuration Options for the HTML5 Application Deployer
You can make additional configurations using environment variables for the HTML5 application deployer.

- Destinations Configurations
You can specify destinations that can be used to access backend applications using the destinations environment variable. The destination configurations are then uploaded to the SAP HTML5 Application Repository service. Note that the destination configuration should match the schema of the  application router environment destinations as described in the [Approuter documentation](https://www.npmjs.com/package/@sap/approuter#environment-destinations)

- IAS_DEPENDENCY_NAME
  To enable app-to-app navigation, you have to add the environment variable IAS_DEPENDENCY_NAME and provide the name of the dependency that has been configured for the Identity Authentication token exchange that is required for app-to-app navigation. For more information about how to configure the dependency for app-to-app navigation, see [Consume an API from Another Application](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/consume-api-from-another-application?version=Cloud).

- HTML5Runtime_enabled
  If no XSUAA binding to an SAP Authorization and Trust Management (XSUAA) service instance or dependency name for the Identity Authentication token exchange (IAS_DEPENDENCY_NAME) is provided you can use this environment variable to enable the HTML5 applications consumption from the application router managed by SAP Managed Approuter. Note that in this case, no token exchange takes place during the navigation to the HTML5 application. The login token of the application router managed by SAP will be forwarded to backend application if destination property HTML5.ForwardAuthToken is configured.

See destinations configuration example (Kubernetes deployment.yaml) :
```
---
apiVersion: batch/v1
kind: Job
metadata:
  name: html5appdeployer
  namespace: default
  labels:
    app: html5appdeployer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: html5appdeployer
  template:
    metadata:
      labels:
        app: html5appdeployer
    spec:
      containers:
        - image: html5-apps-repo.docker.repositories.sap.ondemand.com/myapp-html5-app-deployer:1.0
          name: html5appdeployer
          volumeMounts:
            - name: html5-repo-app-host-volume
              mountPath: "/etc/secrets/sapcp/html5-apps-repo/myapp-app-host-instance"
              readOnly: true
            - name: xsuaa-volume
              mountPath: "/etc/secrets/sapcp/xsuaa/myapp-xsuaa-instance"
              readOnly: true
          env:
            - name: PORT
              value: "5000"
            - name: ASYNC_UPLOAD
              value: "true"
            - name: destinations
              value: "[{
              \"name\":\"myapp-backend\",
              \"url\":\"https://<backendApplicationHost>/\",
              \"forwardAuthToken\": true}]"
      imagePullSecrets:
        - name: backend-dockersecret
      volumes:
        - name: html5-repo-app-host-volume
          secret:
            secretName: myapp-app-host-binding
        - name: xsuaa-volume
          secret:
            secretName: myapp-xsuaa-binding
```
#### Defining a Business Solution as a Content Provider
The HTML5 application deployer can be used to deploy HTML5 applications that belong to a specific business solution. 
To enable integration of this business solution into SAP Build Work Zone, standard edition or SAP Build Work Zone, advanced edition you can also define the business solution as a content provider by providing a cdm.json file. This file contains the common data model (CDM) definition for this business solution.
Add the CDM definition to a file called cdm.json and place this file in the resources folder of the HTML5 application deployer application.

### Enable Process Exit After Upload
In case it is required to automatically exit the html5 application deployer process, you can set the EXIT_PROCESS_AFTER_UPLOAD environment variable to "true".
If this environment variable is set, after a successful upload the html5 application deployer application will be stopped. 
Note that when using deploy service this is not required because deploy service stops the html5 application deployer application automatically.
If you use native deployment mechanisms such as Cloud Foundry cf push or Kubernetes deployment, you may need to use this capability.
