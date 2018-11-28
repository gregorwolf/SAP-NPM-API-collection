@sap/hdi
===============

This is the node.js-based client library for HANA DI (HDI).

Currently, the module provides the following asynchronous methods to access HDI functionality:

- `connect`
- `disconnect`
- `configureDI`  
- `configureDIParameters`  
- `createContainer`
- `dropContainer`
- `configureContainer`
- `configureContainerParameters`
- `listLibraries`
- `configureLibraries`
- `listConfiguredLibraries`
- `status`
- `read`
- `listDeployed`
- `readDeployed`
- `write`
- `delete`
- `make`
- `makeAsync`
- `grantContainerApiPrivileges`
- `grantContainerApiPrivilegesWithGrantOption`
- `revokeContainerApiPrivileges`
- `grantContainerSchemaPrivileges`
- `revokeContainerSchemaPrivileges`
- `grantContainerSchemaRoles`
- `revokeContainerSchemaRoles`

After installing the module via npm, an application needs to create an instance of the client:

`hdi = new HDI(container, logger, credentials);`

where `container` is the name of an existing container, `logger` is a callback function used to write logging information, and `credentials` is an object containing the host name, port, user and password that shall be used for the DB connection:
```
{ host     : 'hostname',  
  port     : 30015,  
  user     : 'user',  
  password : 'secret' }
```  
The connection to the database is established with the `connect` method, which takes only a callback function as parameter.
When the application finishes, it should call  
`hdi.disconnect();`


**configureDI**  
(Deprecated)
Configures HDI with the given parameters.
- `call_params`: an object with key/value pairs configuring HDI and controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**configureDIParameters**  
Configures HDI with the given configuration parameters and the given parameters.
- `di_params`: an object with key/value pairs configuring HDI
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**createContainer**  
Creates a container with the given container id.
- `container`: the container id/name
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**dropContainer**  
Drops the container with the given container id, incl. all corresponding technical users, schemata, tables, etc.
- `container`: the container id/name
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**configureContainer**  
(Deprecated) Configures the container with the given parameters.
- `call_params`: an object with key/value pairs configuring the container and controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**configureContainerParameters**  
Configures the container with the given configuration parameters and the given parameters.
- `container_params`: an object with key/value pairs configuring the container
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**listLibraries**  
List all available plugin libraries that can be installed into a container.
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**configureLibraries**  
(Re)configures the set of plugin libraries which are installed in the given container.
- `libconfig`: an array of ``[action, library_name]`` tuples. `action` could be `ADD` or `REMOVE`
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**listConfiguredLibraries**  
List the set of plugin libraries which are installed in the given container.
- `call_params`: an object with key/value pairs controlling the HDI behaviour
-  `externCB`: a callback function used to return errors or results

**status**  
Shows the status of files and folders in the container. It takes the following parameters:  
- `paths`: an array of path names (strings)
- `call_params`: an object with key/value pairs controlling the HDI behaviour
- `externCB`: a callback function used to return errors or results

**read**  
Reads files/folders from the containers `work file system`. It takes the same parameters as `status`

**readDeployed**  
Like `read`, but reads files/folders from the containers `deployed file system`.

**listDeployed**  
Like `readDeployed`, but reads only metadata for files/folders from the containers `deployed file system`.

**write**  
Writes files/folders to the containers `work file system`. It takes the following parameters:  
- `paths_content`: an array of arrays, containing the path names and the corresponding file content
- `call_params`: an object with key/value pairs controlling the HDI behaviour
- `externCB`: a callback function used to return errors or results

**delete**  
Deletes files/folders from the containers `work file system`. It takes the same parameters as `read`.

**make**/**makeAsync**  
Triggers a synchronous resp. asynchronous make with the given sets of files/folders.
- `deploy_paths`: an array of path names, listing the files/folders to deploy
- `undeploy_paths`: an array of path names, listing the files/folders to undeploy
- `path_parameters`: an object with path names as keys and file specific parameters (like call_params) for each such path
- `call_params`: an object with key/value pairs controlling the HDI behaviour
- `externCB`: a callback function used to return errors or results

**grantContainerApiPrivileges**/**grantContainerApiPrivilegesWithGrantOption**  
Grants the given privileges on the containers API objects to the given users.
- `privileges`: an array of arrays (4-tuples: privilege name, object name, principal schema name, principal name)
- `call_params`: an object with key/value pairs controlling the HDI behaviour
- `externCB`: a callback function used to return errors or results

**revokeContainerApiPrivileges**  
Revokes the given privileges on the containers API objects from the given users.
It takes the same parameters as grantContainerApiPrivileges.

**grantContainerSchemaPrivileges**  
Grants the given privileges on the containers target schema to the given users.
- `privileges`: array of arrays (3-tuples: privilege name, principal schema name, principal name)
- `call_params`: an object with key/value pairs controlling the HDI behaviour
- `externCB`: a callback function used to return errors or results

**revokeContainerSchemaPrivileges**  
Revokes the given privileges on the containers target schema from the given users.
It takes the same parameters as grantContainerSchemaPrivileges.

**grantContainerSchemaRoles**  
Grants the given roles (which are deployed inside the container) to the given users.
- `roles`: array of arrays (3-tuples: role name, principal schema name, principal name)
- `call_params`: an object with key/value pairs controlling the HDI behaviour
- `externCB`: a callback function used to return errors or results

**revokeContainerSchemaRoles**  
Revokes the given roles (which are deployed inside the container) from the given users.
It takes the same parameters as grantContainerSchemaRoles.
