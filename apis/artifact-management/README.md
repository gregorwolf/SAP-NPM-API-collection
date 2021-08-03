# Introduction

Artifact Management on SAP BTP facilitates the generation of project metadata comprising of multiple modules of different technologies,
bundles the module into one single deployment artifact and supports one click deploy to Cloud Foundry

## Key Capabilities
* Access to project properties
* Access to VSCode workspace
* Provide list of modules and items of each module
* Watchers to notify of changes to project
* Support of tags and filter
* Capability to Test run
* Capability to generate 
[MTA yaml](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.04/en-US/ebb42efc880c4276a5f2294063fae0c3.html) and 
[MTAR](https://sap.github.io/cloud-mta-build-tool)
* Deployment of MTAR to [Cloud Foundry](https://www.cloudfoundry.org)
* Plugins for SAP technologies such as 
[MDK](https://developers.sap.com/topics/mobile-development-kit.html),
[FioriElement](https://sapui5.hana.ondemand.com/sdk/#/topic/03265b0408e2432c9571d6b3feb6b1fd),
[Workflow](https://developers.sap.com/group.cp-workflow-cf.html),
[CAP](https://cap.cloud.sap/docs/), 
[XSUAA](https://blogs.sap.com/2019/01/07/uaa-xsuaa-platform-uaa-cfuaa-what-is-it-all-about/)

---

### Pre-Requisites

* Node.JS 12 or higher
* CAP Development Kit (`npm install -g @sap/cds-dk`)

### Pre-Requisites to Build and Deploy MTARs

* [MTAR builder](https://www.npmjs.com/package/mbt) (`npm install -g mbt`)
* Install MDK-Tools, `npm install @sap/mdk-tools -g`
* [Cloud Foundary CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html), Install cf-cli and run command `cf install-plugin multiapps`.

---

### Initialization
```
npm i -g @sap/artifact-management
```
There are two main sets of classes provided by the library. 
- `ProjectApi`, `ProjectImpl` : These are the interface and implmentation classes respectively for project level usages.
- `WorkspaceApi`, `WorkspaceImpl` : These are the interface and implmentation classes respectively for Workspace level usages.

You can import the module in your code as follows:
`import { ProjectImpl } from '@sap/artifact-management';`

To initialise Project API, instance of ProjectImpl has to be created which takes absolute path of a project.
```
import { ProjectImpl } from '@sap/artifact-management';
const path = '<my-application-folder-root-path>';

/**
* readModuleAsProject Default value is false.
* If the boolean is false, then only lcap/cap projects are read.
* If true then any project can also be read.
*/
const readModuleAsProject = false

const project = new ProjectImpl(path ,readModuleAsProject);
```

To initialise Workspace API, instance of WorkspaceImpl has to be created.
```
import { WorkspaceImpl } from '@sap/artifact-management';
const workspace = new WorkspaceImpl();
```

The library also provides CLI `dev-project` which can be used to visualise the outputs of APIs as shown in the following section.

---
# APIs & Examples

## Access to VSCode workspace
### Get Projects 
###### Description
Get all the projects in the workspace. Get the project based on tag if provided and Return type is array of ProjectAPIs / Returns ProjectAPI based on the tag.
###### Method
`getProjects(tag?: Tag) : Promise<ProjectApi[]>`

###### Parameters
- tag: (Optional) `Tag` value which can be used to filter projects.
###### returns
- array of `ProjectApi` instance or `undefined`

###### Example
```
import {Tag} from @sap/artifact-management'  //Optional
const ws = new WorkspaceImpl();
const projects = await ws.getProjects();
```


### Get Project URIs
###### Description
Get all project Uris in the workspace.
###### Method
`getProjectUris(): Promise<Uri[]>`

###### returns
- array of `Uri` or `undefined`

###### Example
```
const ws = new WorkspaceImpl();
const projectUris = await ws.getProjectUris();
```


### Start Watch 
###### Description
it detects File addition or deletions in workspace and triggers the updated event
###### Method
`startWatch() : void`

###### returns
- `void`

###### Example
```
const ws = new WorkspaceImpl();
await ws.startWatch();
```


### Stop Watch 
###### Description
it stops the watch event 
###### Method
`stopWatch() : void`

###### returns
- `void`

###### Example
```
const ws = new WorkspaceImpl();
await ws.stopWatch();
```

### onWorkspaceChanged
###### Description
it captures the add/remove events for the folders in the Workspace 
###### Method
`onWorkspaceChanged(handler: (event: string, folders: WorkspaceFolder[]) => void) : void`

###### Parameters
- a `function` which takes a string `event` ("add" | "remove") and array of `WorkspaceFolder` as arguments

###### returns
- `void`

###### Example
```
import { WorkspaceFolder } from 'vscode';
const ws = new WorkspaceImpl();
ws.onWorkspaceChanged((event: string, folders: WorkspaceFolder[]) => {
  // add implementation 
});
```

---

## Access to project properties
### Get Project Structure 
###### Description
Read the entire project and return the information about project, its CAP modules and their items.
###### Method
`read(logger? : IChildLogger, tag? : Tag): Promise<Project | undefined>;`

###### Parameters
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of Project API.
- tag: (Optional) `Tag` value which can be used to filter projects.
###### returns
- `Project` instance or `undefined`

###### Example
```
import {Tag} from @sap/artifact-management'   //Optional
const api = new ProjectImpl(projectPath);
const project = await api.read();
```
###### CLI

```
dev-project show  <my-application-folder-root absolute path> 
```

###### Sample Output
```
{
  "type": "com.sap.cap",
  "path": "<Absolute Path of Project>",
  "prefix": "DemoProject",
  "cloudService": "com.DemoProject",
  "name": "DemoProject",
  "tags": [
    "project",
    "cap"
  ],
  "modules": [
    {
      "type": "com.sap.security.XsSecurity",
      "name": "_To_Be_Generated_",
      "path": "",
      "items": []
    }
  ]
}
```

### Get Project information
###### Description
Reads only Project level information without reading its modules and items.
###### Method
`getProjectInfo(logger? : IChildLogger): Promise<ProjectData | undefined>;`
###### Parameters
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of Project API.
###### returns
- `ProjectData` or `undefined`
###### Example
```
const api = new ProjectImpl(projectPath);
const project = await api.getProjectInfo();
```
###### CLI
```
dev-project get-project-info  <my-application-folder-root absolute path> 
```
###### Sample Output
```
{
  "type": "com.sap.cap",
  "path": "<Absolute Path of Project>",
  "prefix": "DemoProject",
  "cloudService": "com.DemoProject",
  "name": "DemoProject",
  "tags": [
    "project",
    "cap"
  ]
}
```
---

## Provide list of modules and items of each module
### Get Modules information
###### Description
Reads only module level information for all the modules in the project without reading their items.
###### Method
`getModules(logger? : IChildLogger): Promise<ModuleData[] | undefined>;`
###### Parameters
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- Array of `ModuleData` or `undefined`
###### Example
```
const api = new ProjectImpl(projectPath);
const project = await api.getModules();
```
###### CLI
```
dev-project get-modules-info  <my-application-folder-root absolute path> 
```
###### Sample Output
```
[
  {
    "type": "com.sap.security.XsSecurity",
    "name": "_To_Be_Generated_",
    "path": ""
  }
]
```

### Read Items
###### Description
Read the entire project and return the information about all the items/entities in the project.
###### Method
`readItems(filter? : ItemFilter, logger? : IChildLogger) : Promise<Item[]>;`
###### Parameters
- filter: (Optional) `ItemFilter` which can be used to filter items in the project.
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- An array of `Item`
###### Example
```
import {ItemFilter} from @sap/artifact-management'  //Optional
const api = new ProjectImpl(projectPath);
const project = await api.readItems();
```

###### CLI

Read all items

```
dev-project list-items  <my-application-folder-root absolute path> 
```
###### Sample Output

```
[
    {
      "external": false,
      "name": "fioriApp",
      "namespace": "sap.ui.demoproject",
      "path": "db/schema.cds",
      "ref": "sap.ui.demoproject.fioriApp",
      "tags": [
          "item",
          "cap"
      ],
      "type": "com.sap.cds/Entity"
    },
    ...
    ...
    ...
]
```

---


## Watchers to notify of changes to project
###### Description
Read and watch the items/entities in the project. Any changes in the items addition, deletion or updation which match the watch criteria will be notified by the event `updated` which is listened by `ItemWatcherApi`.
###### Method
`watchItems(filter? : ItemFilter, logger? : IChildLogger) : Promise<ItemWatcherApi>;`
###### Parameters
- filter: (Optional) `ItemFilter` which can be used to filter items in the project.
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- `ItemWatcherApi`. This can be used to read the updated items.

###### Example
```
import {ItemFilter} from @sap/artifact-management'  //Optional
const project = new ProjectImpl(projectPath);
const itemWatcher = await project.watchItems();
const items = await itemWatcher.readItems();
itemWatcher.on('updated', () => {
    console.log('Items updated');
});
```

###### CLI

Read all items

```
dev-project watch-items  <my-application-folder-root absolute path> 
```

---


## Support of Filters
###### Description
Items can be filtered on basis of `type`, `tag` and `ref`
The filter can be passed in `readItems` and `watchItems` APIs as an argument which will return items based on the filter. Check `readItems` and `watchItems` APIs for further information

###### Example 
```
import {ItemFilter} from @sap/artifact-management'

// Filter by type
const filter: ItemFilter = {types: ["com.sap.cds/Entity"]};

// Filter by tags
const filter: ItemFilter = {​​​tags: {​​​values: ["db", "srv"]}​​​}​​​;

// Filter by refs
const filter: ItemFilter= {refs: ["<item ref>"]​​​}​​​;


const api = new ProjectImpl(projectPath);
const entities = await api.readItems(filter);
```

---

## Capability to Test run
###### Method
`run(option?: string | undefined, logger? : IChildLogger ) : Promise<void>`
###### Description
It starts the CDS server and watches for any modifications in the files, if any changes detected it automatically restarts to serve the new content 
###### Parameters
- options: (Optional) run options.
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- `Promise<void>`
###### Example
```
const api = new ProjectImpl(projectPath);
await api.run();
```
###### CLI
```
dev-project run  <my-application-folder-root absolute path> 
```

---

## Capability to generate MTA yaml and MTAR
###### Method
`build(options? : MtaGeneratorSettings, logger? : IChildLogger) : Promise<void>;`
###### Description
Generate manifest for the project and all the modules and create a `mta.yaml` and `<app-name>.mtar` file.
###### Parameters
- options: (Optional) `MtaGeneratorSettings` build options.
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- `Promise<void>`
###### Example
```
const api = new ProjectImpl(projectPath);
await api.build();
```
###### CLI
```
dev-project build  <my-application-folder-root absolute path> 
```
###### Sample Output
```
_schema-version: '3.1'
ID: DemoProject
version: 1.0.0
description: A simple CAP project.
parameters:
  enable-parallel-deployments: true
build-parameters:
  before-all:
    - builder: custom
      commands:
        - bash -c "cds compile srv --to xsuaa > xs-security.json"
    - builder: custom
      commands:
        - npm install --production
        - >-
          bash -c "cds -v 2>/dev/null >/dev/null || npm install --no-save
          @sap/cds-dk"
        - npx cds build --production
modules:
  - name: DemoProject-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    build-parameters:
      builder: npm
      ignore:
        - node_modules
    requires:
      - name: DemoProject-service-uaa
      - name: DemoProject-service-db
    ...
    ...
    ...

resources:
  - type: org.cloudfoundry.managed-service
    name: DemoProject-service-uaa
    parameters:
      service: xsuaa
      service-plan: application
      service-name: DemoProject-uaa
      path: xs-security.json
    ...
    ...
    ...

```
---

## Deployment of MTAR to Cloud Foundry
###### Method
`deploy(logger? : IChildLogger) : Promise<void>;`
###### Description
Deploy the generated `<app-name>.mtar` file to currently targeted CF space.
###### Parameters
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- `Promise<void>`
###### Example
```
const api = new ProjectImpl(projectPath);
await api.deploy();
```
###### CLI
Build and deploy in one step
```
dev-project deploy  <my-application-folder-root absolute path> 
```

---

## Get Detail Information of Entities
#### Get Detail information
###### Method
`getDetailInfo(type: ItemType, ref: string, entityPath?: string, logger? : IChildLogger) :Promise<Item | undefined>;`
###### Description
Get additional detail information about a particular item.
###### Parameters
- type: `ItemType` type of the Item.
- ref: Unique reference of the Item.
- entityPath: (Optional) Path of the item.
- logger: (Optional) An instance of IChildLogger which can be implemented by consumers of this library.
###### returns
- `Item` or `undefined

###### Example
```
import {ItemType} from "src/project-glue/ItemType.ts"  //Optional
const api = new ProjectImpl(projectPath);
const entities = await api.getDetailInfo(type, ref, entityPath)
```
###### CLI
```
dev-project get-detail-info  <my-application-folder-root absolute path> <type> <ref>
```
###### Sample Output
```
{
  "type": "com.sap.cds/Entity",
  "name": "fioriApp",
  "ref": "sap.ui.demoproject.fioriApp",
  "path": "schema.cds",
  "info": {
    "ID": {
      "@Core.Computed": true,
      "key": true,
      "type": "cds.UUID"
    },
    "title": {
      "type": "cds.String",
      "length": 100
    },
    "owner": {
      "type": "cds.String"
    },
    "descr": {
      "type": "cds.String"
    },
    "miti": {
      "type": "cds.Association",
      "target": "sap.ui.demo.ui5App"
    },
    "impact": {
      "type": "cds.Integer"
    },
    "criticality": {
      "type": "cds.Integer"
    }
  }
}
```

---