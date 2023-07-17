SAP Fiori tools CLI.

COMMAND NAME:

    deploy - Deploy project bundle to ABAP system

USAGE:

    fiori deploy [...OPTIONS]

DEBUG:
    Debug archived project files:
    MacOS/Linux: DEBUG=ux-ui5-tooling npx fiori deploy [...OPTIONS]
    Windows:     set DEBUG=ux-ui5-tooling & npx fiori deploy [...OPTIONS]

    Debug http messages:
    MacOS/Linux: DEBUG=ux-odata-client npx fiori deploy [...OPTIONS]
    Windows:     set DEBUG=ux-odata-client & npx fiori deploy [...OPTIONS]

OPTIONS:

|                |     |             |
|----------------|-----|-------------|
| --config       | -c  | Path to deployment config yaml file, default ui5-deploy.yaml |
| --destination  | -d  | Destination of BTP system |
| --failfast     | -f  | Terminate deploy and throw error when encountering first error (y/N) |
| --yes          | -y  | Generate index.html file (y/n) |
| --url          | -u  | URL of deploy target ABAP system |
| --client       | -l  | Client number of deploy target ABAP system |
| --transport    | -t  | Transport number for deploy target ABAP system |
| --name         | -n  | Project name of the app |
| --package      | -p  | Package name for deploy target ABAP system |
| --service      | -sv | Target SAPUI5 ABAP Repository OData Service |
| --description  | -e  | Project description of the app |
| --archive-url  | -au | Download app bundle from this url and upload this bundle for deployment |
| --strict-ssl   | -ss | Perform certificate validation on archive url (Y/n)|
| --archive-path | -ap | Provide path of the app bundle for deployment |
| --testMode     | -tm | Run deploy in test mode. ABAP backend reports deploy error without actual deploy the bundle. |
| --uaa-url      | -uu | UAA server url for steampunk systems which can be found in service key. |
| --uaa-username | -un | Username for steampunk system authentication. |
| --uaa-password | -up | User password for steampunk system authentication. |
| --uaa-clientid | -ui | Steampunk system client Id which can be found in service key. |
| --uaa-clientsecret | -us | Steampunk system client secret which can be found in service key. |
