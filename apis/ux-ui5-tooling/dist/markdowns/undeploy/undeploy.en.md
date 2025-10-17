SAP Fiori tools CLI.

COMMAND NAME:

    undeploy - Undeploy project on ABAP system  

USAGE:

    fiori undeploy [...OPTIONS]

OPTIONS:

|                      |      |                                                                                                             |
|----------------------|------|-------------------------------------------------------------------------------------------------------------|
| --config             | -c   | Path to deployment config YAML file. The default is `ui5-deploy.yaml`.                                                |
| --noConfig           | -nc  | Use the provided command parameters and do not use the deployment config YAML file.                                 |
| --scp                | -s   | Target is an ABAP Cloud system                                                                              |
| --destination        | -d   | Destination of BTP system                                                                                   |
| --url                | -u   | URL of deploy target ABAP system                                                                            |
| --service            | -sv  | Target SAPUI5 ABAP Repository OData Service                                                                 |
| --transport          | -t   | Transport number for deploy target ABAP system                                                              |
| --name               | -n   | Project name of the app                                                                                     |
| --yes                | -y   | Yes to all questions                                                                                        |
| --verbose            | -vb  | Enable verbose logging (default: false)                                                                     |
| --strict-ssl         | -ss  | Deprecated. Use `ignoreCertErrors` (plural) instead.                                                           |
| --ignore-cert-error  | -ic  | Deprecated. Use `ignoreCertErrors` (plural) instead.                                                           |
| --ignore-cert-errors | -ics | Perform certificate validation to support backward compatibility (Y/n). The default is `false`.                   |
| --lrep               | -lr  | Enhanced LREP services to support undeployment of adaptation projects                                       |
| --username           | -ur  | Name of environment variable containing a username to authenticate. The default is the username from the `ui5-deploy.yaml`. |
| --password           | -pw  | Name of environment variable containing a password to authenticate. The default is the password from the `ui5-deploy.yaml` file. |
| --uaa-url            | -uu  | UAA server url for Steampunk systems which can be found in the service key.                                     |
| --uaa-username       | -un  | Username for the Steampunk system authentication.                                                               |
| --uaa-password       | -up  | User password for Steampunk system authentication.                                                          |
| --uaa-clientid       | -ui  | Steampunk system client ID which can be found in the service key.                                               |
| --uaa-clientsecret   | -us  | Steampunk system client secret which can be found in the service key.                                           |