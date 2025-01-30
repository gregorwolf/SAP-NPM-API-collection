# Application Frontend service CLI
 
Application Frontend Command Line Interface (appfront-cli / afctl)

## Link to release repository
https://github.wdf.sap.corp/NPMJS/SAP_APPFRONT_CLI-1.0

## Description

The Application Frontend Command Line Interface (appfront-cli) provides easy access to APIs exposed by Application Frontend service.
It allows you to:
- Sign-in to and sign-out from the Application Frontend service
- Deploy, explore, modify and delete frontend applications and their versions
- Configure dependencies of frontend applications
- See the runtime logs of frontend applications

Application Frontend Command Line Interface is licensed under the Apache License, Version 2.0 - see [LICENSE](LICENSE).
The [Open Source Legal Notice](OpenSourceLegalNotice.pdf) is part of the package contents.

## Prerequisites

- [Download](https://nodejs.org/en/download/prebuilt-installer/current) and install Node.js (≥22.11.0).

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
| `v1.0.0` | Added                                                    |

</details>

```
Delete deployed application or application version

Usage:
  afctl delete APPLICATION [VERSION]

Arguments:
  APPLICATION  Name of the deployed application
  VERSION      Name of the application version
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
| `v1.0.0` | Added                                                    |

</details>

```
Login with named user

Usage:
  afctl login [-a URI] [-u USERNAME] [-p PASSWORD] [--sso | --p12 DER | --key KEY --cert CERT] [PROFILE]

Arguments:
  --api, -a URI            Application Frontend API server URI                              
  --username, -u USERNAME  Username                                                         
  --password, -p PASSWORD  Password                                                         
  --sso                    Single sign-on login (requires browser)                          
  --p12 DER                P12 certificate bundle (--password will be used to open bundle)  
  --key KEY                PEM private key                                                  
  --cert CERT              PEM certificate                                                  
  PROFILE                  Name of the login profile
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
| `v1.0.4` | The `--logs` option added                                |
| `v1.0.0` | Added                                                    |

</details>

```
Deploy new or sync changes to existing application versions

Usage:
  afctl push [PATH_TO_APP, ...] [-c CONFIG]

Arguments:
  PATH_TO_APP          Path to frontend application directory         
  --config, -c CONFIG  Path to configuration file or valid JSON string
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

## Configuration

The Application Frontend Command Line Interface creates and uses configuration file, which may be found in `$HOME/.afctl/config.yaml`. It includes multiple configuration profiles that allow to easily switch between various Application Frontend API servers and users. After successfull login, the configuration file also includes JWT (JSON Web Token) that is used to authenticate the calls of command line interface to Application Frontend service API server. To use configuration file different from default, set `AFCTL_CONFIG` environment variable
to file path of desired configuration file.

The Application Frontend Command Line Interface supports multiple log levels:
- `0` - no logs
- `1` - errors only
- `2` - errors and warnings
- `3` - errors, warnings and information messages
- `5` - verbose logs with all messages (useful for troubleshooting and development). 
The log level may be controlled by setting `AFCTL_LOG_LEVEL` environment variable. The default value is `3`. If `--verbose` global option is used, the log level is `5` (overrides the value set by environment variable).

## Troubleshooting

If you experience unexpected behavior, the execution of command never ends, you see error messages or stack traces in the output - you can run any command with global `--verbose` or just `-v` at the end. This will print trace logs with detailed information about each step in the command execution.

## License

Copyright 2024 SAP SE or an SAP affiliate company and Application Frontend Command Line Interface contributors.
