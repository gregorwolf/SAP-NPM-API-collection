# @sap/mta-lib

Javascript wrapper library for creating, reading and modifying multi-target application development descriptor files.

## Requirements

This library uses [Cloud MTA](https://github.com/SAP/cloud-mta) version [1.0.0](https://github.com/SAP/cloud-mta/releases/tag/v1.0.0).
It is not required to install it to use the library, but if it is found in the path in the correct version, it will be used.
Otherwise, this library will download it.

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
    memory: "MEMORY",
  },
  requires: [
    {
      name: this.appOptions.projectName + "suffix",
    },
  ],
};

await mtaObj.addModule(mtaModule);

// ...

try {
  await mtaObj.save();
} catch (e) {
  console.log(e);
}
```

## Packaging with webpack

To use this library from an application packaged with webpack, you have to follow the [instructions for packaging the `mta-local` package](https://github.com/SAP/cloud-mta#packaging-with-webpack).
