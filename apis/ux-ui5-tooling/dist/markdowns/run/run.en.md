SAP Fiori tools CLI.

COMMAND NAME:

    run - Starts a local web server for running a FE application

USAGE:

    fiori run [...OPTIONS]

OPTIONS:

|                |     |             |
|----------------|-----|-------------|
| --config       | -c  | Path to config file (default: ui5.yaml in project root folder) |
| --verbose      |     | Enable verbose logging (default: false) |
| --port         | -p  | Port to start the server on (default for HTTP: 8080, HTTPS: 8443) |
| --open         | -o  | Open web server root directory in default browser |
| --https        |     | Enables HTTPS over the HTTP/2 protocol for the web server (default: false). If --key and --cert parameters are not provided with this parameter, a private key and certificate will be created automatically if OpenSSL is installed. Using HTTPS over HTTP/2 is currently not supported in SAP Business Application Studio |
| --key          |     | Path to the private key for https (default: "$HOME/.ui5/server/server.key") |
| --cert         |     | Path to the certificate for https (default: "$HOME/.ui5/server/server.crt") |
| --ui5          |     | UI5 version to use when running the application (default: version from ui5.yaml) |
| --ui5Uri       |     | UI5 uri to load the UI5 resources from (default: uri from ui5.yaml) |
| --proxy        |     | Proxy configuration. e.g. https://myproxy:8443 (default: uses host machine proxy configuration) |
