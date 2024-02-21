# SAP Web Analytics npm package for VSCode Extensions

Wrapper for application insights meant to be used in VSCode Extensions running in SAP Bussiness Application Studio.

## Usage

### Installation

```typescript
npm install @sap/swa-for-sapbas-vsx
```

### API

#### Initialize the client telemetry settings

This can be done in the `activate` stage of a vscode extension.

```typescript
import { initTelemetrySettings } from "@sap/swa-for-sapbas-vsx";

initTelemetrySettings(extensionName: string, extensionVersion: number);
```

Note to take the `extensionName` and the `extensionVersion` dynamically from the `package.json`.
The `extensionName` is constructed from the vsxPublisher and vsxPackageName: `<vsxPublisher>.<vsxPackageName>`.

#### report API

```typescript
import { BASClientFactory, BASTelemetryClient } from "@sap/swa-for-sapbas-vsx";

const basTelemetryClient: BASTelemetryClient = BASClientFactory.getBASTelemetryClient();

// Prepare any string/numeric telemetry data to be submitted
const properties: { [key: string]: string } = {
  customProperty1: "HIGH",
  customProperty2: "DEFAULT",
  customProperty3: "LOW",
};

const measurements: { [key: string]: number } = {
  customMeasure1: 100,
  customMeasure2: 0.73,
  customMeasure3: 2019,
};

// Submit telemetry data
basTelemetryClient.report("eventName", properties, measurements);
```

---

#### Example of usage from a VSCode extension

```typescript
import * as vscode from "vscode";
import { initTelemetrySettings } from "@sap/swa-for-sapbas-vsx";
import { BASClientFactory, BASTelemetryClient } from "@sap/swa-for-sapbas-vsx";
const packageJson = require("./package.json");

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  const extensionName = `${packageJson.publisher}.${packageJson.name}`; // e.g. SAP.vscode-close-editor
  initTelemetrySettings(extensionName, packageJson.version);
  void vscode.commands.registerCommand("extension.closeActiveEditor", () => {
    void vscode.commands.executeCommand("workbench.action.closeActiveEditor");

    const basTelemetryClient: BASTelemetryClient = BASClientFactory.getBASTelemetryClient();
    // Only eventName is mandatory.
    basTelemetryClient.report("Close Active Editor");
  });
}
```

### Configuring Telemetry Settings for BAS Usage Tracking

This module is designed to track usage metrics for BAS, and it requires the VSCode setting `sapbas.telemetryEnabled` to be explicitly set to `true` for telemetry data to be transmitted.

The tool gathers anonymized information regarding your interaction with the software to enhance its offerings. Should you prefer to opt-out of this data collection, simply adjust the `sapbas.telemetryEnabled` setting to `false`.

## Utilizing Application Insights Events for Report Generation

The following fields can be used for creating reports:

| Application Insights Field | Origin                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| **evenName**               | The "eventName" parameter sent via report API. It is constructed by the `extensionName/eventName` |
| **properties**             | Additional data used to filter events and metrics in the portal. Defaults to empty.               |
| **measurements**           | Metrics associated with this event. Defaults to empty.                                            |

You can assume the following properties are automatically being added to each report:

| Property Name              | Value                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **iaas**                   | Refers to the Infrastructure as a Service provider where the extention is running. This could be a cloud provider like AWS, Azure, Google Cloud, etc., indicating the underlying infrastructure platform. |
| **landscape**              | The specific environment where the application operates.                                                                                                                                                  |
| **is_sap_user**            | A boolean flag indicating whether the user is associated with SAP.                                                                                                                                        |
| **bas_mode**               | Indicates the mode of SAP Business Application Studio. Can be 'free', 'standard', 'buildCodeFree', 'buildCodeStandard'                                                                                    |
| **extension_run_platform** | Indicates the platform on which the reporting VSCode extension is running.                                                                                                                                |
| **extension_version**      | Specifies the version of the extension or tool being used                                                                                                                                                 |
