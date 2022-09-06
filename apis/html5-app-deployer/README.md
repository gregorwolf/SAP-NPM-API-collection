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
- [Automatic Creation of Destination Configurations](#automatic-creation-of-destination-configurations)
- [Enable Process Exit After Upload](#enable-process-exit-after-upload)


## Overview
HTML5 application deployer handles the upload of the HTML5 applications content to the HTML5 application repository.

The @sap/html5-app-deployer module can be consumed as a dependency in a node.js CF application or as a base image in the HTML5 application image.

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
To login to SAP Artifactory you can use the following statement:
  ```
  docker login --username=<techical user> --password=<apiKey> build-milestones.common.repositories.cloud.sap
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

The manifest.json file should contain at least `sap.app.id` and `sap.app.applicationVersion.version`. 

Note that `sap.app.id` and `sap.app.applicationVersion.version` are used in the HTML5 application repository as applicationName and applicationVersion. If `sap.app.id` contains dots or dashes, they will be removed in the applicationName.
The version format must be xx.xx.xx, whereas x is a digit. For example: 1.0.10

Note that different app-host service instances cannot be used to upload applications with the same application id/name.

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

## Deploying HTML5 Application Deployer App
To deploy an sap/html5-app-deployer consumer application in the Cloud Foundry environment you can choose one of the following procedures: 

### Deploying HTML5 Application Deployer App Using cf push

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

### Deploying HTML5 Application Deployer App using cf deploy
To use cf deploy the installation of the deploy plugin is required, see [deploy plugin documentation](https://github.com/SAP/cf-mta-plugin/blob/master/README.md)
In addition, create an *.mtar archive using WebIDE or MTA Build Tool.

#### 1. Create an mtad.yaml file.
The MTA project should have an `mtad.yaml` file in the following format:
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
Use the WebIDE build or the [MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/) to generate a valid `myAppDeployer.mtar` file.

#### 3. Deploy *.mtar file.
```
cf deploy myAppsDeployer.mtar
```
After deploying the `*.mtar` file, an application called myAppsDeployer (stopped) is shown in cf apps.

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

### Undeploy HTML5 Application Deployer App Using cf undeploy
When you undeploy the HTML5 application deployer app, the HTML5 application deployer app is deleted and you can - in the same step - delete the app-host service instance of the html5-apps-repo. To delete the app-host service instance of the html5-apps-repo, the  --delete-service parameter should be passed. 
Note that the undeploy requires the mta id, which can be obtained by calling cf mtas or from the `mtad.yaml` ID.

#### 1. Undeploy HTML5 Application Deployer App and delete the service instance
For example:
```
cf undeploy myApps.deployer --delete-services
```

## Redeploy HTML5 Application Deployer App
After making changes to the static content files of HTML5 applications, the new content can be redeployed to the HTML5 application repository. 
All content referenced by the app-host service instance id is replaced by the new content. 

## Asynchronous Upload
You can specify that upload content should be performed asynchronously by adding environment variable ASYNC_UPLOAD to manifest.yaml or mta.yaml files.
Asynchronous upload means that the html5 applications content will be handled synchronously to HTML5 Application Repository but the internal file validation and processing will be performed asynchronously.
In this setup, you will have to check the html5 application deployer logs to verify that the upload was completed successfully. 
Using asynchronous upload is specially important when triggering upload of service instance with large content (more than 10 MB). In such cases synchronous upload might cause health check errors or connection timeout during upload.

## Automatic Creation of Destination Configurations
When using HTML5 Application Deployer in SAP Managed Approuter flows you can configure the automatic creation of the required instance level destination configurations.

To enable the automatic creation of destinations, provide the environment variable SAP_CLOUD_SERVICE.

To following types of destination configurations can be created:

- A destination pointing to an xsuaa service instance (optional)
- A destination pointing to an Identity Authentication service instance (optional)
- A destination pointing to an html5-apps-repo/app-host service instance (mandatory)
- A destinations pointing to a business  service instance (optional)
- One or more backend destinations that point to a Cloud or an on- premise backend application. These destinations are modeled using the environment variable BACKEND_DESTINATIONS

If the creation of a destination pointing to an xsuaa or an Identity Authentication service instance is required, the xsuaa or the Identity Authentication instances should be bound to the HTML5 application deployer.
In addition a destination instance should be bound to the HTML5 application deployer.

This capability is typically used in Kubernetes where the HTML5 Application Deployer application is previously uploaded as a docker image to Artifactory or dockerhub
For example (Kubernetes deployment) :
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
## Enable Process Exit After Upload
In case it is required to automatically exit the html5 application deployer process, you can set the EXIT_PROCESS_AFTER_UPLOAD environment variable to "true".
If this environment variable is set, after a successful upload the html5 application deployer application will be stopped. 
Note that when using deploy service this is no required because deploy service stops the html5 application deployer application automatically.
If you use native deployment mechanisms such as Cloud Foundry cf push or Kubernetes deployment, you may need to use this capability.

Example:
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
  ttlSecondsAfterFinished: 0
  template:
    metadata:
      labels:
        app: html5appdeployer
      annotations:
        sidecar.istio.io/inject: "false"
    spec:
      restartPolicy: OnFailure
      containers:
        - image: html5-apps-repo.docker.repositories.sap.ondemand.com/myapp-html5-app-deployer:1.0
          imagePullPolicy: Always
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
            - name: EXIT_PROCESS_AFTER_UPLOAD
              value: "true"
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
