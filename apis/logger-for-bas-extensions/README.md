[![Build Status-xMake](https://prod-build10100.wdf.sap.corp/job/devx-wing/job/devx-wing-bas-node-loggers-SP-REL-linuxx86_64_indirectshipment/badge/icon)](https://prod-build10100.wdf.sap.corp/job/devx-wing/job/devx-wing-bas-node-loggers-SP-REL-linuxx86_64_indirectshipment/)
[![Build Status-JAAS](https://gketheia.jaas-gcp.cloud.sap.corp/view/bas-node-loggers/job/bas-node-loggers_CI/job/master/badge/icon)](https://gketheia.jaas-gcp.cloud.sap.corp/view/bas-node-loggers/job/bas-node-loggers_CI/job/master/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# logger-for-bas-extensions

Logger Library For Business Application Studio Extensions.

This performs logging to the workspace container in SAP Business Application Studio in JSON format
with the intent for the logs to be collected, saved, and processed by a separate service.

## Installation

Enter the following command to install the library using npm install:

- `npm install @sap/logger-for-bas-extensions --save`

## Usage

Here is a sample of how to use the library:

```typescript
import { getLogger, logLevelsKeys } from "@sap/logger-for-bas-extensions";

logger = await getLogger({
  level: logLevelsKeys.error,
  // Recommendation: supply your package's name here.
  label: "myLabel",
  // Recommendation: supply your package's version
  version: "1.2.3",
});

if (logger !== undefined) {
  // NOOP because the log level is `error` and `warn` < `error``
  logger.warn("oops I did it again!");

  logger.fatal("Oy Vey!");
  // -> {"label":"myLabel","version":"1.2.3","level":"fatal","message":"Oy Vey!","time":"2019-10-31T13:24:26.740Z"}

  // With Custom Payload Properties
  logger.fatal("Input size out of bounds!", { size: "10000000B" });
  // ->
  // {
  //   label: "myLabel",
  //   version: "1.2.3",
  //   level: "fatal",
  //   message: "Input size out of bounds!",
  //   size: "10000000B",
  //   time: "2019-10-31T13:24:26.740Z"
  // }
}
```
