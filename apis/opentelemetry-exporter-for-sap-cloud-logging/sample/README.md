# OpenTelemetry instrumented sample app

A minimal sample demonstrating the auto-configured OpenTelemetry exporters for [SAP Cloud Logging](https://discovery-center.cloud.sap/serviceCatalog/cloud-logging).

The sample application is implemented in TypeScript and makes use of the OpenTelemetry SDK for Node.js.
The instrumentation setup is implemented in the [`instrumentation.ts`](instrumentation.ts) file.
For each signal type (logs, metrics, traces) a separate exporter is registered:

- `AutoCloudLoggingSpanExporter`
- `AutoCloudLoggingMetricsExporter`
- `AutoCloudLoggingLogsExporter`

Each exporter reads the SAP Cloud Logging `ingest-otlp-endpoint` and otlp credentials from the environment when deployed in CF.
It also possible to bind the application to multiple Cloud Logging service instances.
In this case OpenTelemetry signals are multiplexed to each service instance.

Additionally, a `CFApplicationDetector` is registered, which is also provided by the package.
It reads several Cloud Foundry specific attributes from the environment and adds them to the exported logs, metrics and traces.

## Deploy on Cloud Foundry

Install dependencies and build the app before pushing it to a Cloud Foundry org/space:

```bash
# install dependencies and build app
npm i && npm run build

# login
cf login --sso

# select an org and space
cf target -o ORG_NAME -s SPACE_NAME 

# optional: update manifest.yaml to your needs

# push to selected CF org and space
cf push
```

Once the app is deployed you can create a service binding to a new or existing SAP Cloud Logging instance with enabled OTLP ingest.

```bash
cf bind-service opentelemetry-exporter-for-sap-cloud-logging-sample SERVICE_INSTANCE
```

Visit the route assigned to the app to generate some traffic.
Logs, metrics and traces become available in the respective OpenTelemetry indices shortly afterwards.
