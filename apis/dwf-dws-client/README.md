# Data Warehouse Services Client
This Node.js package registers the SAP default task types at the Data Warehouse
Scheduler that need access to the local HDI and DWF containers of the consuming
project. In addition it runs an HTTP server to provide task type related
endpoints for value helps and task execution.

# Usage
Add this package as dependency in a standard Node.js module in your XSA
application.

In your development descriptor `mta.yaml` ensure that HDI (type
`com.sap.xs.hdi-container` and DWF (type `com.sap.xs.dwf-edw-client`) services
are bound in the resources section. For example:

```yaml
resources:
- name: myapp-dws
  type: com.sap.xs.dwf-edw-client
  properties:
      dwf-edw-client-name: ${service-name}
- name: myapp-hdi
  type: com.sap.xs.hdi-container
  properties:
      hdi-container-name: ${service-name}
```

The service instances have to be required by the module consuming this package

```yaml
modules:
- name: myapp-Backend
  type: nodejs
  path: Backend
  requires:
    - name: myapp-hdi
    - name: myapp-dws
```

In the start script of your Node.js module load this package and instantiate
the client for the Task Orchestration Engine of the Data Warehouse Scheduler
(TOE):

```js
const xsenv = require('@sap/xsenv');
const dwsClient = require('@sap/dwf-dws-client');

const loopBackUrl = JSON.parse(process.env.VCAP_APPLICATION).full_application_uris[0];
const rejectUnauth = true;
const TaskChain = dwsClient.taskChain.createTaskChainClient(
  xsenv.getServices({
    dwf: {
      tag: 'dwf'
    }
  }).dwf,
  loopBackUrl,
  rejectUnauth
);
```

To allow the scheduler to call the registered endpoints, start an HTTP server
and expose the routes. Below, you see an example using
[express.js](https://expressjs.com).
**Be aware** that this example omits proper authentication and
authorization checks which must be implemented for productive use.

```js
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

TaskChain.addRouter(app, '/backend');
app.listen(PORT, err => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  TaskChain.registerTaskGroups(err1 => {
    if (err1) {
      console.error(err1);
      process.exit(1);
    }
    console.log('Backend module listening on: ' + PORT);
  });
});
```