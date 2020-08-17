[![Build Status](https://dev.azure.com/sap/devx-wing/_apis/build/status/devx-wing.abap-deploy?branchName=master)](https://dev.azure.com/sap/devx-wing/_build/latest?definitionId=80&branchName=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# abap-deploy

## Installation

```
npm install @sap/abap-deploy
```

## Simple Usage

- execute `abap-deploy` in your terminal and answer the questions in the terminal.
- or `abap-deploy --help` to explore the CLI Options.

### Running CLI on local environment

#### Prerequisite:

In order to run the abap-deploy CLI on your local environment, you need to add SAP Global Root CA Certificate to your trusted certificate list.
This can be achieved by navigating to your SAP System using your browser (e.g. `https://<host>:<port>/sap/bc/adt/discovery`), exporting the certificate from your browser, and then adding it to NODE_EXTRA_CA_CERTS
You can find more details in here: `https://help.sap.com/viewer/a9f57505bbb34a6da3c5ba3a49d409d8/Latest/en-US/4b318bede7eb4021a8be385c46c74045.html`

- Add: "@sap/abap-deploy": "`<version>`" to devDependencies section of your project's package.json
- Execute `npm install`
- Execute `npm run build`
- Execute `abap-deploy` in your terminal and answer the questions in the terminal.

Note: When requested to provide Target System url make sure you are using https and not http.

## In Depth Guide

### Interactive mode

By default the abap-deploy tool will ask the user for any missing configuration.

### CLI Arguments

Configuration options may be passed as command line arguments, e.g:
`abap-deploy --targetSystem=https://foo.com --client=010`

The list of CLI options can be printed by running `abap-deploy --help`

CLI arguments may be useful to avoid re-typing the same values or to inject values from environment variables for certain options.

### Configuration files

Any configuration options that can be set via the command line can also be specified within a separate configuration file. A variety of default config files flavors are available:

| File name               | File Association |
| ----------------------- | ---------------- |
| `.abap-deployrc`        | JSON or YAML     |
| `.abap-deployrc.json`   | JSON             |
| `.abap-deployrc.yaml`   | YAML             |
| `.abap-deployrc.yml`    | YAML             |
| `.abap-deployrc.js`     | CommonJS export  |
| `abap-deploy.config.js` | CommonJS export  |

These default configuration files will be searched "upwards" starting from the CWD.

#### Custom Name Configuration Files.

A specific configuration file path may be provided using the configPath option, e.g:

- `abap-deploy --config-path=./my-custom.config.json`

Multiple custom name configuration files may be useful to manage presets of deployment
scenarios, e.g `test` vs `productive` systems.

#### package.json configuration

The configuration can also be embedded in the project's package.json inside the "abap-deploy" key, e.g:

- ```json
  {
    "name": "myApp",
    "version": "0.2.0",
    "dependencies": {},
    "devDependencies": {},
    "abap-deploy": {}
  }
  ```

#### Sample JSON Configuration File

```json
{
  "deploy": {
    "sourceFolder": "./dist",
    "targetSystem": "http://abc.com",
    "client": "010",
    "username": "Tom",
    "password": "abcd1234",
    "appName": "foo"
  },
  "cli": {
    "interactiveFallBack": false
  }
}
```

#### Sample YAML Configuration File

```yaml
deploy:
  sourceFolder: "./dist"
  targetSystem: http://abc.com
  client: "010"
  username: Tom
  password: abcd1234
  appName: foo
cli:
  interactiveFallBack: false
```

### Combining Interactive / CLI / Config Files

Options from different sources have different precedence levels.

- CLI arguments (e.g --source-folder) options have the highest priority and will override any other options.
- Configuration files options are next on the priority list.
- Interactive options are the lowest priority and will only be asked for options which have no values assigned by either CLI/Config FIle.

### Options Reference

#### sourceFolder

|                 |                                                |
| --------------- | ---------------------------------------------- |
| Description     | Project's Pre-Built Artifacts Folder to Deploy |
| Type            | String                                         |
| CLI Name        | `--source-folder`                              |
| CLI Alias       | `--sf`                                         |
| Config File Key | `deploy.sourceFolder`                          |
| Default         | `./dist` (if exists)                           |

#### targetSystem

|                 |                              |
| --------------- | ---------------------------- |
| Description     | ABAP system URL to Deploy to |
| Type            | String                       |
| CLI Name        | `--target-system`            |
| CLI Alias       | `--ts`                       |
| Config File Key | `deploy.targetSystem`        |

#### client

|                 |                           |
| --------------- | ------------------------- |
| Description     | ABAP system client number |
| Type            | String                    |
| CLI Name        | `--client`                |
| CLI Alias       | `--c`                     |
| Config File Key | `deploy.client`           |

#### username

|                 |                      |
| --------------- | -------------------- |
| Description     | ABAP System username |
| Type            | String               |
| CLI Name        | `--username`         |
| CLI Alias       | `--u`                |
| Config File Key | `deploy.username`    |

#### password

|                 |                      |
| --------------- | -------------------- |
| Description     | ABAP System password |
| Type            | String               |
| CLI Name        | `--password`         |
| CLI Alias       | `--p`                |
| Config File Key | `deploy.password`    |

#### appName

|                 |                                  |
| --------------- | -------------------------------- |
| Description     | Application Name (folder in BSP) |
| Type            | String                           |
| CLI Name        | `--app-name`                     |
| CLI Alias       | `--ap`                           |
| Config File Key | `deploy.appName`                 |

#### description

|                 |                         |
| --------------- | ----------------------- |
| Description     | Application Description |
| Type            | String                  |
| CLI Name        | `--description`         |
| CLI Alias       | `--d`                   |
| Config File Key | `deploy.description`    |

#### interactiveFallBack

|                 |                                                           |
| --------------- | --------------------------------------------------------- |
| Description     | Fallback to Interactive mode in case of missing arguments |
| Type            | Boolean                                                   |
| CLI Name        | `--interactive-fallback`                                  |
| CLI Alias       | `--if`                                                    |
| Config File Key | `cli.interactiveFallBack`                                 |
| Default         | true                                                      |

#### configPath

|                 |                                     |
| --------------- | ----------------------------------- |
| Description     | Relative Path to Configuration file |
| Type            | Boolean                             |
| CLI Name        | `--config-path`                     |
| CLI Alias       | `--cf`                              |
| Config File Key | `cli.configPath`                    |
| Default         | See "Configuration Files" section   |

#### logLevel

|                 |                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description     | The level of logs to report for notification purposes. Any logs of a higher level than the logLevel setting will be written to the abap-deploy.log file in the current working directory. |
| Type            | "off" or "fatal" or "error" or "warn" or "info" or "debug" or "trace"                                                                                                                     |
| CLI Name        | `--log-level`                                                                                                                                                                             |
| CLI Alias       | `--ll`                                                                                                                                                                                    |
| Config File Key | `cli.logLevel`                                                                                                                                                                            |
| Default         | "off"                                                                                                                                                                                     |
