SAP Fiori tools CLI.

COMMAND NAME:

    deploy - Deploy project bundle to ABAP system

USAGE:

    fiori deploy [...OPTIONS]

DEBUGGING DEPLOYMENT:

CLI CONFIGURATION:

Update the `scripts` section of your `package.json` to include the `deploy` command with any additional flags you may need. The following example shows how to run the `deploy` command with a configuration file and verbose logging enabled.

```JSON
  "deploy": "npm run build && fiori deploy --config ui5-deploy.yaml --verbose && rimraf archive.zip"
```

YAML CONFIGURATION:

Update or create a `ui5-deploy.yaml` file in the root of your project. The following example shows how to configure the deployment task, including the option to enable debugging by setting `verbose` to `true`.

```YAML
  customTasks:
    - name: deploy-to-abap
      afterTask: generateCachebusterInfo
      configuration:
        verbose: true # Disabled by default. Set to `true` to include more information in the log.
        ignoreCertErrors: false # Disabled by default. If set to `true`, certificate errors will be ignored. To support backward compatibility, replace `strictSsl` with either `ignoreCertErrors` or `ignoreCertError`.
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

|                      |      |                                                                                                             |
|----------------------|------|-------------------------------------------------------------------------------------------------------------|
| --config             | -c   | Path to deployment config YAML file. The default is `ui5-deploy.yaml`.                                              |
| --noConfig           | -nc  | Use the provided CLI parameters and do not use the deployment config YAML file.                                     |
| --destination        | -d   | Destination of BTP system                                                                                   |
| --scp                | -s   | Target is an ABAP Cloud system                                                                              |
| --failFast           | -f   | Terminate deploy and throw error when encountering first error (y/N)                                        |
| --yes                | -y   | Yes to all questions                                                                                        |
| --index              | -i   | Generate `index.html` file (y/N)                                                                              |
| --url                | -u   | URL of deploy target ABAP system                                                                            |
| --service            | -sv  | Target SAPUI5 ABAP Repository OData Service                                                                 |
| --client             | -l   | Client number of deploy target ABAP system                                                                  |
| --transport          | -t   | Transport number for deploy target ABAP system                                                              |
| --name               | -n   | Project name of the app                                                                                     |
| --package            | -p   | Package name for deploy target ABAP system                                                                  |
| --service            | -sv  | Target SAPUI5 ABAP Repository OData Service                                                                 |
| --description        | -e   | Project description of the app                                                                              |
| --archive-url        | -au  | Download app bundle from this url and upload this bundle for deployment                                     |
| --strict-ssl         | -ss  | Deprecated. Use `ignoreCertErrors` (plural) instead.                                                           |
| --ignore-cert-error  | -ic  | Deprecated. Use `ignoreCertErrors` (plural) instead.                                                           |
| --ignore-cert-errors | -ics | Perform certificate validation to support backward compatibility (y/N). The default is `false`.                 |
| --archive-path       | -ap  | Provide path of the app bundle for deployment                                                               |
| --testMode           | -tm  | Run deploy in test mode. ABAP backend reports deploy error without actual deploying the bundle.             |
| --verbose            | -vb  | Enable verbose logging (default: false)                                                                     |
| --username           | -ur  | Name of environment variable containing a username to authenticate. The default is the username from the `ui5-deploy.yaml` file. |
| --password           | -pw  | Name of environment variable containing a password to authenticate. The default is the password from the `ui5-deploy.yaml` file. |
| --uaa-url            | -uu  | UAA server URL for Steampunk systems which can be found in the service key.                                     |
| --uaa-username       | -un  | Username for Steampunk system authentication.                                                               |
| --uaa-password       | -up  | User password for Steampunk system authentication.                                                          |
| --uaa-clientid       | -ui  | Steampunk system client ID which can be found in the service key.                                               |
| --uaa-clientsecret   | -us  | Steampunk system client secret which can be found in the service key.                                           |