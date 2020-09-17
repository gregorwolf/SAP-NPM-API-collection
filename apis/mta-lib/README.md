[![Build Status](https://gkecicd.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=mta-lib_CI/master)](https://gkecicd.jaas-gcp.cloud.sap.corp/job/mta-lib_CI/job/master/) 
[![Quality Gate Status](https://sonar.wdf.sap.corp/api/project_badges/measure?project=mta-lib&metric=alert_status)](https://sonar.wdf.sap.corp/dashboard?id=mta-lib) 
[![Coverage](https://sonar.wdf.sap.corp/api/project_badges/measure?project=mta-lib&metric=coverage)](https://sonar.wdf.sap.corp/dashboard?id=mta-lib)

# @sap/mta-lib

Javascript wrapper library for creating, reading and modifying multi-target application development descriptor files.

## Requirements

The [Cloud MTA](https://github.com/SAP/cloud-mta) minimal version should be [0.1.5](https://github.com/SAP/cloud-mta/releases/tag/v0.1.5).

## Sample usage

Adding a new module:

```typescript
import { Mta, mta } from "@sap/mta-lib";
import * as path from "path";

let projectPath; // = ...

const mtaObj = new Mta(projectPath);

const mtaModule: mta.Module = {
    name: this.appName,
    type: "my-type",
    path: path.relative(this.appOptions.projectPath, this.appPath),
    parameters: {
        "disk-quota": "DISK_QUOTA",
        "memory": "MEMORY"
    },
    requires: [
       {
           name: this.appOptions.projectName + "suffix"
       }
    ]
};
   
await mtaObj.addModule(mtaModule);

// ...

try {
    await mtaObj.save();
} catch (e) {
    console.log(e);
}
```
