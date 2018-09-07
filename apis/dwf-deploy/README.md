stable: [master](../../tree/master) - [change log](../../tree/master/CHANGELOG.md) - [latest release](../../releases/latest) |  development: [master](../../tree/master) - [change log](../../tree/master/CHANGELOG.md) - [all releases](../../releases) - [development guidelines](../../wiki)

# dwf-deploy

The DWF Deploy
 - Checks for unsupported design time artefacts - ok (DWF 2.0 SP01)
 - Prepares the payload for the materialization (i.e. processes the dwfnamespace files) - ok (DWF 2.0 SP01)
 - Executes the materialization of the design to runtime objects, where the transactional scope is on module level [dwf-runtime](../../../../DWF/dwf-runtime) - ok (DWF 2.0 SP01)
 - Grants required privileges to the technical user (i.e. to be able to perform the exposed actions) - TODO

The implementation is based on [xs2/hdideploy.js](../../../../xs2/hdideploy.js).

```
  +-----------------+            +-----------------+    +-----------------+
  | dwf module      |            | Web IDE         |    | ... module      |
  | w/ dwf-deploy   |            |                 |    |                 |
  +-----------------+            +-----------------+    +-----------------+

           |                              |                      |
           |                              |                      |
 \/ design -> runtime                        \/ discover/execute
           |                              |                      |
           |                              |                      |

  +-----------------------------------------------------------------------+
  | dwf-runtime                                                           |
  | types(toe,dlm), instances(toe/chaim, dlm/profile), actions (execute)  |
  +-----------------------------------------------------------------------+
```

The materialization patterns
 - .txt - accepted, but not processed
 - .dwfnamespace - overwrites the default logic for calculating the namespace. Default namespace for the src folder is calculated based on the following setting { "name": "{mta.yaml mta name}.{mta.yaml dwf-module name}.src", "subfolder": "append" }
 - .dwftaskchain - {mta name}/{dwf-module name}/src/.../toeChainExample.dwftaskchain -> {dwf-toe url per extension}/<namespace>/toeChainExample
 - .dwfdlmprofile - {mta name}/{dwf-module name}/src/.../dlmProfileExample.dwfdlmprofile -> {dwf-dlm-backend url per extension}

The considered scenarios
 - deploy/update: version >= 2.0.x
 - rename: version >= 2.2.x
 - delete: version >= 2.2.x
 - delta: version >= 2.2.x

