# DEPRECATION MESSAGE

Deployment is now supported with Generic Application Content Deployer (GACD).
This means that after the implementation of the changes below, there will be no need for the content deployer.


**Why are we moving to GACD?**

- Faster deployment
- No need for the content-deployer
- The flp and ui-deployer applications, which are only used for the deployment, will no longer be part of the space
 
 **How to move to GACD?**
 
**Add the following to your FLP module**: 

1. Delete the package.json, package-lock.json, node-modules, and .npmrc in your FLP module directory, as there is no need to use the content deployer.

2. Change the module's type to `com.sap.application.content`. If using WEB-IDE, use the type `com.sap.application.portal.content`

3. Once the type has changed, memory, stack, and buildpack parameters, under the 'parameters' section, can be removed:

```
  parameters:	
    memory: 128M	
    stack: cflinuxfs3	
    buildpack: https://github.com/cloudfoundry/nodejs-buildpack.git#v1.7.19
```     

4. Add the following parameters to your portal instance, for example:
```
- name: testContent-portal #The content will be deployed to the endpoint defined by this key
  parameters:
    content-target: true
    service-key:
      name: content-deploy-key #any valid name can be specified, will be used to create the service key for content deployment
      config: # the service key configs can be defined inline
        content-endpoint: developer
```     
5. If you have environment variables, they now appear under parameters -> config and not parameters -> properties.

### Full migration from content-deployer to GACD example in SAP Business Application Studio & manually (If using WEB-IDE need to switch the type to `com.sap.application.portal.content`):

FLP Module - Content Deployer (Before):


```
- name: flp	
  type: com.sap.portal.content	
  parameters:	
    memory: 128M	
    stack: cflinuxfs3	
    buildpack: https://github.com/cloudfoundry/nodejs-buildpack.git#v1.7.19	
  properties:	
    TENANT_HOST_PATTERN: ^(.*)-${space}-testcontent-ar.${default-domain}	
  requires:	
  - name: testContent-portal	
```

FLP Module GACD (After):

```
  - name: flp
    type: com.sap.application.content
    parameters:
      config:
        TENANT_HOST_PATTERN: ^(.*)-${space}-testcontent-ar.${default-domain}
    requires:
      - name: testContent-portal #The content will be deployed to the endpoint defined by this key
        parameters:
          content-target: true
          service-key:
            name: content-deploy-key #any valid name can be specified, will be used to create the service key for content deployment
            config: # the service key configs can be defined inline
              content-endpoint: developer

```
## Description
 
# portal-cf-content-deployer

Portal CF Content Deployer
This component is used to deploy the Fiori Launchpad portal site configuration (configuration of tiles, groups and catalogs) into the Cloud Foundry Environment.
This component interacts with the portal service and the approuter, which in turn acts as the web entry server of the Fiori Launchpad portal site.
