SAP Fiori tools CLI.

COMMAND NAME:

    undeploy - Undeploy project on ABAP system  

USAGE:

    fiori undeploy [...OPTIONS]

OPTIONS:

|                |     |             |
|----------------|-----|-------------|
| --config       | -c  | Path to deployment config yaml file, default ui5-deploy.yaml |
| --noConfig     | -nc | Use provided command parameters and do not read deployment config yaml file |
| --scp          | -s  | Target is an ABAP Cloud system |
| --destination  | -d  | Destination of BTP system |
| --url          | -u  | URL of deploy target ABAP system |
| --service      | -sv | Target SAPUI5 ABAP Repository OData Service |
| --transport    | -t  | Transport number for deploy target ABAP system |
| --name         | -n  | Project name of the app |
| --yes          | -y  | Yes to all questions |
| --verbose      | -vb | Enable verbose logging (default: false) |
| --strict-ssl   | -ss | Perform certificate validation (Y/n) (default: true)|
| --lrep         | -lr | Enhanced LREP services to support undeployment of adaptation projects |
| --username     | -ur | Name of environment variable containing a username to authenticate (default: username from ui5-deploy.yaml) |
| --password     | -pw | Name of environment variable containing a password to authenticate (default: password from ui5-deploy.yaml) |
| --uaa-url      | -uu | UAA server url for steampunk systems which can be found in service key. |
| --uaa-username | -un | Username for steampunk system authentication. |
| --uaa-password | -up | User password for steampunk system authentication. |
| --uaa-clientid | -ui | Steampunk system client Id which can be found in service key. |
| --uaa-clientsecret | -us | Steampunk system client secret which can be found in service key. |