SAP Fiori tools CLI.

COMMAND NAME:

    undeploy - Undeploy project on ABAP system  

USAGE:

    fiori undeploy [...OPTIONS]

OPTIONS:

|                |     |             |
|----------------|-----|-------------|
| --config       | -c  | Path to deployment config yaml file, default ui5-deploy.yaml |
| --destination  | -d  | Destination of BTP system |
| --url          | -u  | URL of deploy target ABAP system |
| --transport    | -t  | Transport number for deploy target ABAP system |
| --name         | -n  | Project name of the app |
| --yes          | -y  | Generate index.html file (y/n) |
| --service      | -sv | Target SAPUI5 ABAP Repository OData Service |
| --uaa-url      | -uu | UAA server url for steampunk systems which can be found in service key. |
| --uaa-username | -un | Username for steampunk system authentication. |
| --uaa-password | -up | User password for steampunk system authentication. |
| --uaa-clientid | -ui | Steampunk system client Id which can be found in service key. |
| --uaa-clientsecret | -us | Steampunk system client secret which can be found in service key. |
