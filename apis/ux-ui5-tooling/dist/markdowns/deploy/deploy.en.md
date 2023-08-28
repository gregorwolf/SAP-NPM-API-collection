SAP Fiori tools CLI.

COMMAND NAME:

    deploy - Deploy project bundle to ABAP system

USAGE:

    fiori deploy [...OPTIONS]

DEBUG: 
    Update the `deploy` package script with the `--verbose` CLI parameter to debug deployment of archived projects, for example;
```JSON
  "deploy": "npm run build && fiori deploy --config ui5-deploy.yaml --verbose && rimraf archive.zip"
```
Another option is to update the `ui5-deploy.yaml` configuration with the verbose parameter;
```YAML
  customTasks:
    - name: deploy-to-abap
      afterTask: generateCachebusterInfo
      configuration:
        verbose: true        
        target:
          url: http://mytest.app:50000
          client: "100"
          destination: MYDESTINATION
        app:
          name: ZTESTPROJECT
          description: My Service
          package: $tmp
          transport: ""
        exclude:
          - /test/
```


OPTIONS:

|                |     |             |
|----------------|-----|-------------|
| --config       | -c  | Path to deployment config yaml file, default ui5-deploy.yaml |
| --noConfig     | -nc | Use provided CLI parameters and do not read deployment config yaml file |
| --destination  | -d  | Destination of BTP system |
| --scp          | -s  | Target is an ABAP Cloud system |
| --failfast     | -f  | Terminate deploy and throw error when encountering first error (y/N) |
| --yes          | -y  | Yes to all questions |
| --index        | -i  | Generate index.html file (y/n) |
| --url          | -u  | URL of deploy target ABAP system |
| --service      | -sv | Target SAPUI5 ABAP Repository OData Service |
| --client       | -l  | Client number of deploy target ABAP system |
| --transport    | -t  | Transport number for deploy target ABAP system |
| --name         | -n  | Project name of the app |
| --package      | -p  | Package name for deploy target ABAP system |
| --service      | -sv | Target SAPUI5 ABAP Repository OData Service |
| --description  | -e  | Project description of the app |
| --archive-url  | -au | Download app bundle from this url and upload this bundle for deployment |
| --strict-ssl   | -ss | Perform certificate validation (Y/n) (default: true) |
| --archive-path | -ap | Provide path of the app bundle for deployment |
| --testMode     | -tm | Run deploy in test mode. ABAP backend reports deploy error without actual deploying the bundle. |
| --verbose      | -vb | Enable verbose logging (default: false) |
| --username     | -ur | Name of environment variable containing a username to authenticate (default: username from ui5-deploy.yaml) |
| --password     | -pw | Name of environment variable containing a password to authenticate (default: password from ui5-deploy.yaml) |
| --uaa-url      | -uu | UAA server url for steampunk systems which can be found in service key. |
| --uaa-username | -un | Username for steampunk system authentication. |
| --uaa-password | -up | User password for steampunk system authentication. |
| --uaa-clientid | -ui | Steampunk system client Id which can be found in service key. |
| --uaa-clientsecret | -us | Steampunk system client secret which can be found in service key. |