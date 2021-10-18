SAP Fiori tools CLI.

COMMAND NAME:

    deploy - Deploy project bundle to ABAP system

USAGE:

    fiori deploy [...OPTIONS]

OPTIONS:

|                |     |             |
|----------------|-----|-------------|
| --config       | -c  | Path to deployment config yaml file, default ui5-deploy.yaml |
| --destination  | -d  | Destination of BTP system |
| --failfast     | -f  | Terminate deploy and throw error when encoutering first error (y/N) |
| --yes          | -y  | Generate index.html file (y/n) |
| --url          | -u  | URL of deploy target ABAP system |
| --client       | -l  | Client number of deploy target ABAP system |
| --transport    | -t  | Transport number for deploy target ABAP system |
| --name         | -n  | Project name of the app |
| --package      | -p  | Package name for deploy target ABAP system |
| --description  | -e  | Project description of the app |
| --archive-url  | -au | Download app bundle from this url and upload this bundle for deployment |
| --strict-ssl   | -ss | Perform certificate validation on archive url (Y/n)|
| --archive-path | -ap | Provide path of the app bundle for deployment |
| --testMode     | -tm | Run deploy in test mode. ABAP backend reports deploy error without actual deploy the bundle. |
