# Application Frontend service CLI
 
Application Frontend Command Line Interface (appfront-cli / afctl)

## Description

The Application Frontend Command Line Interface (appfront-cli) provides easy access to APIs exposed by Application Frontend service.
It allows you to:
- Sign-in to and sign-out from the Application Frontend service
- Deploy, explore, modify and delete frontend applications and their versions
- Configure dependencies of frontend applications
- See the runtime logs of frontend applications

Application Frontend Command Line Interface is licensed under the Apache License, Version 2.0 - see [LICENSE](https://unpkg.com/@sap/appfront-cli@latest/LICENSE).
The [Open Source Legal Notice](https://unpkg.com/@sap/appfront-cli@latest/OpenSourceLegalNotice.pdf) is part of the package contents.

## Prerequisites

- [Download](https://nodejs.org/en/download/prebuilt-installer/current) and install Node.js (≥22.6.0).

## Installation

```
npm install -g @sap/appfront-cli
```

## Upgrade

```
npm update -g @sap/appfront-cli
```

## Usage

The Application Frontend Command Line Interface supports the following commands:

#### activate

<details><summary>History</summary>

| Version  | Changes                                     |
|----------|---------------------------------------------|
| `v1.0.0` | Added                                       |

</details>

```
Activate deployed application version

Usage:
  afctl activate APPLICATION VERSION

Arguments:
  APPLICATION  Name of the deployed application
  VERSION      Name of the application version
```

#### config

<details><summary>History</summary>

| Version  | Changes                                     |
|----------|---------------------------------------------|
| `v1.0.0` | Added                                       |

</details>

```
Display actual tool configuration or switch configuration profile

Usage:
  afctl config [PROFILE]

Arguments:
  PROFILE  Name of the configuration profile
```

#### curl

<details><summary>History</summary>

| Version  | Changes                                     |
|----------|---------------------------------------------|
| `v1.0.0` | Added                                       |

</details>

```
Execute a request to the current profile API server URI

Usage:
  afctl curl [-i] [-X METHOD] [-H HEADER, ...] PATH

Arguments:
  -X METHOD  HTTP method to use                                                                          
  -H HEADER  Custom headers to include in the request                                                    
  -d DATA    Payload to include in the request body, or '@' followed by a file name to read the data from
  -i         Print response status and headers                                                           
  PATH       Path and query string of the request URL
```

#### delete

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.5.0` | Prompt before deletion and `-f` flag added               |
| `v1.3.0` | Support of version deletion added                        |
| `v1.0.0` | Added                                                    |

</details>

```
Delete deployed application or application version

Usage:
  afctl delete APPLICATION [VERSION] [-f]

Arguments:
  APPLICATION  Name of the deployed application
  VERSION      Name of the application version
  --force, -f  Force deletion without prompt
```

#### download

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.1.2` | Added                                                    |

</details>

```
Download deployed application

Usage:
  afctl download APPLICATION

Arguments:
  APPLICATION  Name of the deployed application
```

#### init

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.8.0` | Added                                                    |

</details>

```
Initialize application

Usage:
  afctl init [APPLICATION] [VERSION] [-f]

Arguments:
  APPLICATION  Name of the new application        
  VERSION      Name of the new application version
  --force, -f  Force init with default values
```

#### install

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.1.2` | Added                                                    |

</details>

```
Install CLI plugin

Usage:
  afctl install PLUGIN

Arguments:
  PLUGIN  CLI plugin package name
```

#### list

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.0.0` | Added                                                    |

</details>

```
List deployed applications or application versions

Usage:
  afctl list [APPLICATION]

Arguments:
  APPLICATION  Name of the deployed application
```

#### login

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.7.0` | The `--service-key` + `--sso` together option added      |
| `v1.6.0` | The `--service-key` option added                         |
| `v1.0.0` | Added                                                    |

</details>

```
Login with named user

Usage:
  afctl login [-a URI] [-u USERNAME] [-p PASSWORD] [--sso | --p12 DER | --key KEY --cert CERT | --service-key SERVICE_KEY] [PROFILE]

Arguments:
  --api, -a URI              Application Frontend API server URI                              
  --username, -u USERNAME    Username                                                         
  --password, -p PASSWORD    Password                                                         
  --sso                      Single sign-on login (requires browser)                          
  --p12 DER                  P12 certificate bundle (--password will be used to open bundle)  
  --key KEY                  PEM private key                                                  
  --cert CERT                PEM certificate
  --service-key SERVICE_KEY  Application Frontend service key                                                  
  PROFILE                    Name of the login profile
```

#### logout

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.0.0` | Added                                                    |

</details>

```
Logout from authorization server and remove locally cached user data

Usage:
  afctl logout [PROFILE]

Arguments:
  PROFILE  Name of the configuration profile
```

#### logs

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.0.0` | Added                                                    |

</details>

```
Get logs of application version

Usage:
  afctl logs APPLICATION [VERSION]

Arguments:
  APPLICATION  Name of the deployed application
  VERSION      Name of the application version
```

#### push

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.6.0` | The `--activate` and `--no-activate` options added       |
| `v1.0.4` | The `--logs` option added                                |
| `v1.0.0` | Added                                                    |

</details>

```
Deploy new or sync changes to existing application versions

Usage:
  afctl push [PATH_TO_APP, ...] [-c CONFIG] [-l] [-a|-n]

Arguments:
  PATH_TO_APP          Path to frontend application directory         
  --config, -c CONFIG  Path to configuration file or valid JSON string
  --logs, -l           Print deployment logs                          
  --activate, -a       Activate versions after deployment
  --no-activate, -n    Don't activate versions after deployment
```

#### start

<details><summary>History</summary>

| Version  | Changes                                     |
|----------|---------------------------------------------|
| `v1.8.0` | Added                                       |

</details>

```
Start deployed application

Usage:
  afctl start APPLICATION

Arguments:
  APPLICATION  Name of the deployed application
```

#### stop

<details><summary>History</summary>

| Version  | Changes                                     |
|----------|---------------------------------------------|
| `v1.8.0` | Added                                       |

</details>

```
Stop deployed application

Usage:
  afctl stop APPLICATION

Arguments:
  APPLICATION  Name of the deployed application
```

#### uninstall

<details><summary>History</summary>

| Version  | Changes                                                  |
|----------|----------------------------------------------------------|
| `v1.1.2` | Added                                                    |

</details>

```
Uninstall CLI plugin

Usage:
  afctl uninstall PLUGIN

Arguments:
  PLUGIN  CLI plugin package name
```

### Global Flags

In addition to command specific arguments, the following global flags may be passed to CLI:

| Flag | Alias | Description |
|------|-------|-------------|
| --help | -h | Print general CLI or command specific help |
| --verbose | -v | Add tracing information to the output |
| --output FORMAT| -o FORMAT| Output format. FORMAT is one of `json` or `yaml`|
| --root | | Allow CLI to run with root user privileges |

## Configuration

#### AFCTL_CONFIG
The Application Frontend Command Line Interface creates and uses configuration file, which may be found in `$HOME/.afctl/config.yaml`. It includes multiple configuration profiles that allow to easily switch between various Application Frontend API servers and users. After successfull login, the configuration file also includes JWT (JSON Web Token) that is used to authenticate the calls of command line interface to Application Frontend service API server. To use configuration file different from default, set `AFCTL_CONFIG` environment variable
to file path of desired configuration file.

#### AFCTL_LOG_LEVEL
The Application Frontend Command Line Interface supports multiple log levels:
- `0` - no logs
- `1` - errors only
- `2` - errors and warnings
- `3` - errors, warnings and information messages
- `5` - verbose logs with all messages (useful for troubleshooting and development). 
The log level may be controlled by setting `AFCTL_LOG_LEVEL` environment variable. The default value is `3`. If `--verbose` global flag is used, the log level is `5` (overrides the value set by environment variable).

#### AFCTL_ACTIVATE
By default, the Application Frontend service activates newly deployed application versions. 
The behavior may be changed by:
- `push` command `--activate` or `--no-activate` argument (for single command execution)
- `push` command `--config config.json` configuration, where config.json `'{"activateVersion":false}'` (for command execututions using this configuration file)
- `AFCTL_ACTIVATE` environment variable (for every command executions)

#### AFCTL_POLLING_MAX_ATTEMPTS
During deployment with `push` command, there is a polling of deployment status.
By default, there will be 120 attempts to fetch the deployment status. After the threshold
is reached, the `push` command will fail (while deployment itself may still be in progress).
To support long running deployments for large applications (>100Mb), it is possible to change
the maximum number of polling attempts with `AFCTL_POLLING_MAX_ATTEMPTS` environment variable.
The value must be positive integer.

#### AFCTL_POLLING_DELAY
During deployment with `push` command, there is a polling of deployment status.
By default, the delay between polling requests is 2 seconds (2000ms).
To set different delay, it is possible to set `AFCTL_POLLING_DELAY` environment variable.
The value must be positive integer (in milliseconds).

If multiple options are used, the command argument has a higher priority than
configuration file, and configuration file has higher priority than environment variable.

#### AFCTL_XSAPP_TEMPLATE
By default, the `init` command either uses the `xs-app.json` in the current working directory (if it exists) as template for the target `xs-app.json` or creates a brand new `xs-app.json`. To specify different path to the file that should serve as template for the target `xs-app.json`, the `AFCTL_XSAPP_TEMPLATE` environment variable may be set. The template file content should be valid JSON. The route to serve static content from Application Fronted service will be added to the template, if it's not already exist. All routes pointing to `html5-apps-repo-rt` service will be changed to point to `app-front` service instead.

#### AFCTL_MANIFEST_TEMPLATE
By default, the `init` command either uses the `manifest.json` in the current working directory (if it exists) as template for the target `manifest.json` or creates a brand new `manifest.json`. To specify different path to file that should serve as template for the target `manifest.json`, the `AFCTL_MANIFEST_TEMPLATE` environment variable may be set. The template file content should be valid JSON. The application name an version will be added to the template or will replace the relevant values, if they are already present in template.

#### AFCTL_SAVE_ZIP
By default, the `push` command creates ZIP of ZIPs in memory and deletes it, once command is finished.
To keep generated ZIP and save it to file system, the `AFCTL_SAVE_ZIP` environment variable may be set to any non-empy value.
In this case `apps.zip` will be saved to current working directory.

## Troubleshooting

If you experience unexpected behavior, the execution of command never ends, you see error messages or stack traces in the output - you can run any command with global `--verbose` or just `-v` at the end. This will print trace logs with detailed information about each step in the command execution.

## License

Copyright 2024 SAP SE or an SAP affiliate company and Application Frontend Command Line Interface contributors.
