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

| Version   | Changes                                     |
|-----------|---------------------------------------------|
| `v1.14.0` | The `-e` option added                       |
| `v1.12.0` | The `-d` option added                       |
| `v1.0.0`  | Added                                       |

</details>

```
Display actual tool configuration or switch/delete configuration profile

Usage:
  afctl config [PROFILE] [-d] [-e]

Arguments:
  PROFILE       Name of the configuration profile                       
  --delete, -d  Delete configuration profile                            
  --env, -e     Display supported environment variables and their values
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

| Version   | Changes                                                  |
|-----------|----------------------------------------------------------|
| `v1.14.0` | The `d` alias added                                      |
| `v1.5.0`  | Prompt before deletion and `-f` flag added               |
| `v1.3.0`  | Support of version deletion added                        |
| `v1.0.0`  | Added                                                    |

</details>

```
Delete deployed application or application version

Usage:
  afctl delete APPLICATION [VERSION] [-f]

Alias:
  d

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

| Version   | Changes                                                           |
|-----------|-------------------------------------------------------------------|
| `v1.14.0` | The `--business-service` renamed to `--business-solution`         |
| `v1.11.0` | The `--cdm`, `--business-service` and `PATH_TO_APP` options added |
| `v1.11.0` | The `--name` and `--version` arguments are now named              |
| `v1.8.0`  | Added                                                             |

</details>

```
Initialize application

Usage:
  afctl init [PATH_TO_APP [--name APPLICATION] [--version VERSION], ...] [--business-solution BUSINESS_SOLUTION] [--cdm] [-f]

Arguments:
  PATH_TO_APP                            Path to frontend application directory
  --name APPLICATION                     Name of the application        
  --version VERSION                      Name of the application version
  --business-solution BUSINESS_SOLUTION  Name of the application business solution
  --cdm                                  Generate cdm.json file
  --force, -f                            Force init with default values
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

| Version   | Changes                                                  |
|-----------|----------------------------------------------------------|
| `v1.15.4` | The `--basic` option added                               |
| `v1.14.0` | The `VERSION` option added                               |
| `v1.0.0`  | Added                                                    |

</details>

```
List deployed applications or application versions or application version details

Usage:
  afctl list [APPLICATION [VERSION]] [--basic]

Arguments:
  APPLICATION  Name of the deployed application        
  VERSION      Name of the deployed application version
  --basic, -b  Output only basic properties of application or version
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

| Version   | Changes                                                  |
|-----------|----------------------------------------------------------|
| `v1.14.0` | The `p` alias added                                      |
| `v1.6.0`  | The `--activate` and `--no-activate` options added       |
| `v1.0.4`  | The `--logs` option added                                |
| `v1.0.0`  | Added                                                    |

</details>

```
Deploy new or sync changes to existing application versions

Usage:
  afctl push [PATH_TO_APP, ...] [-c CONFIG] [-l] [-a|-n]

Alias:
  p

Arguments:
  PATH_TO_APP          Path to frontend application directory         
  --config, -c CONFIG  Path to configuration file or valid JSON string
  --logs, -l           Print deployment logs                          
  --activate, -a       Activate versions after deployment
  --no-activate, -n    Don't activate versions after deployment
```

#### set-log-level

<details><summary>History</summary>

| Version   | Changes                                                    |
|-----------|------------------------------------------------------------|
| `v1.14.0` | The `sll` alias added                                      |
| `v1.13.1` | Enhanced to display expiration time when TTL is configured |
| `v1.13.0` | Added                                                      |

</details>

```
Set the log level for a specific application version

Usage:
  afctl set-log-level APPLICATION [VERSION] --debug|--error

Alias:
  sll

Arguments:
  APPLICATION  Name of the deployed application
  VERSION      Name of the application version (defaults to active version)
  --debug      Set log level to debug (temporarily)
  --error      Set log level to error

Note: When setting the log level to debug, it is configured temporarily with an expiration time.
The command will display the expiration timestamp when applicable.
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

#### AFCTL_COLORS
The Application Frontend Command Line Interface recognizes whether it is printing messages to terminal or not (e.g., output may be piped to file). By default, the messages printed to terminal are colorized using special character sequences (e.g., `\u001b[0;90m`). If your terminal does not support colors or you would like to explicitly switch off colorization, you can set `AFCTL_COLORS` to one of the falsy values (`false|off|no|0`).

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

If multiple options are used, the command argument has a higher priority than
configuration file, and configuration file has higher priority than environment variable.

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

#### AFCTL_PUSH_MAX_ATTEMPTS
During deployment with `push` command, there are upload and deploy API calls.
In case API call fails due to network error, there will be up to `AFCTL_PUSH_MAX_ATTEMPTS`
attempts. By default, there will be 2 attempts.
The value must be positive integer.

#### AFCTL_PUSH_DELAY
During deployment with `push` command there may be retries to call APIs due to network errors.
The `AFCTL_PUSH_DELAY`, if set, defines the initial delay between retry calls in milliseconds.
The delay will grow exponentially for consequent retries. The default value is 1 second (1000ms).
The value must be positive integer.

#### AFCTL_XSAPP_TEMPLATE
By default, the `init` command either uses the `xs-app.json` in the current working directory (if it exists) as template for the target `xs-app.json` or creates a brand new `xs-app.json`. To specify different path to the file that should serve as template for the target `xs-app.json`, the `AFCTL_XSAPP_TEMPLATE` environment variable may be set. The template file content should be valid JSON. The route to serve static content from Application Fronted service will be added to the template, if it's not already exist. All routes pointing to `html5-apps-repo-rt` service will be changed to point to `app-front` service instead.

#### AFCTL_MANIFEST_TEMPLATE
By default, the `init` command either uses the `manifest.json` in the current working directory (if it exists) as template for the target `manifest.json` or creates a brand new `manifest.json`. To specify different path to file that should serve as template for the target `manifest.json`, the `AFCTL_MANIFEST_TEMPLATE` environment variable may be set. The template file content should be valid JSON. The application name an version will be added to the template or will replace the relevant values, if they are already present in template.

#### AFCTL_SAVE_ZIP
By default, the `push` command creates ZIP of ZIPs in memory and deletes it, once command is finished.
To keep generated ZIP and save it to file system, the `AFCTL_SAVE_ZIP` environment variable may be set to any non-empy and non-falsy value.
In this case `apps.zip` will be saved to current working directory.

#### AFCTL_TRACE
The path to the file, which will contain the traces of executed command.

## Extensibility

The Application Frontend Command Line Interface (appfront-cli) functionality can be extended through plugins.
Each plugin is a globally installed NPM package with an `appfront-cli-plugin` keyword in its `package.json`. Its main file must export a `commands` array of objects implementing the [command interface](#command-interface).
Plugins may be added or removed from appfront-cli with [`install`](#install) and [`uninstall`](#uninstall) commands respectively.
The list of currently installed plugins can be viewed with the [`config`](#config) command.

### Why Use a Plugin?

Plugins have several advantages over standalone command-line tools:
- plugins focus on business logic, while common CLI capabilities (prompting the user, parsing input, formatting output, logging, configuration management) are handled by appfront-cli
- plugins are context-aware and can easily call Application Frontend service design-time APIs with API server URL and access token obtained from appfront-cli configuration
- plugins may extend built-in commands by running some business logic before, after or even instead of original commands

### Plugin Boilerplate

#### Package Structure

```
my-plugin
├─ lib
│  ├─ cmd0.js
│  ├─ cmd1.js
├─ index.js
└─ package.json
```

<details><summary>index.js</summary>

```js
import * as cmd0 from './lib/cmd0.js';
import * as cmd1 from './lib/cmd1.js';

export const commands = [ cmd0, cmd1 ];
```

</details>

<details><summary>package.json</summary>

```json
{
  "type": "module",
  "name": "my-plugin",
  "keywords": ["appfront-cli-plugin"],
  "main": "index.js"
}
```

</details>

### Command Interface

To implement the Command Interface, a command object should have at least the following functions:
- `getMetadata()` - returns a JavaScript object that describes the command and its arguments
- `run(ctx)` - returns a `Promise` that resolves with a result printed to `stdout` on success, or rejects with an `Error` on failure

### Context Interface

The `run(ctx)` function receives a context object as its argument, which includes useful information and utilities available to the plugin.

```js
ctx = {
  args: {}, // parsed command line arguments
  cli: {}, // information about CLI tool itself
  config: {}, // CLI configuration
  console: {}, // logger that respects log level and color preferences
  env: {}, // environment variables
  fetch: async (url, opts) => {}, // pre-configured network client with native `fetch` interface
  prompt: async (opts) => '', // function to request user input
};
```

> **Note:** `ctx` may include additional properties not listed above.
> Their presence is not guaranteed and may change between versions.

#### Add New Command

<details><summary><code>getMetadata()</code></summary>

```js
export const getMetadata = () => {
  return {
    name: 'my-plugin-name',
    desc: 'Description of my-plugin-name',
    usage: 'afctl my-plugin-name --key KEY_VALUE [--force] [FILE_PATH, ...]',
    options: {
      key: {
        keys: ['--key'], // should have at least one item for named arguments
        type: 'string', // may be 'string' or 'boolean'
        mandatory: true, // used by arguments parser
        multiple: false, // used by arguments parser; if true, even empty or single value will be converted to array
        helpLiteral: 'KEY_VALUE', // used to display command help, omit it if type of argument is 'boolean'
        helpText: 'Description of how argument is used by command', // used to display command help
        index: 0 // impacts order in which argument appears in command help
      },
      force: {
        keys: ['--force', '-f'], // every key must start with '--' or '-'
        type: 'boolean',
        mandatory: false,
        multiple: false,
        helpText: 'Force command execution',
        index: 1
      },
      files: {
        keys: [], // empty array for positional arguments
        type: 'string',
        mandatory: false,
        multiple: true,
        helpLiteral: 'FILE_PATH',
        helpText: 'Path to file',
        index: 2
      }
    }
  };
};
```

</details>

<details><summary><code>run(ctx)</code></summary>

```js
export const run = async (ctx) => {
  // ctx.cli
  const [majorVersion, minorVersion] = (ctx?.cli?.version ?? '0.0.0').split('.').map(v => parseInt(v, 10));
  if (majorVersion !== 1 || minorVersion < 16) {
    throw new Error('version not supported'); // <- exit with code=1 and print error message
  }
  // ctx.env (AFCTL_MY_PLUGIN_NAME)
  if (ctx.env.MY_PLUGIN_NAME) {
    return 'hello'; // <- exit with code=0 and print message
  }
  // ctx.config
  const activeProfile = ctx.config.profiles[ctx.config.active_profile];
  const serverUrl = activeProfile.server_url;
  const token = activeProfile.token?.access_token;
  // ctx.console
  ctx.console.debug(`You are connected to ${serverUrl}`);
  // ctx.args
  if (ctx.args.force === true) {
    return ['force', 'hello']; // <- multiple values are printed on separate lines
  } else {
    // ctx.prompt
    const consent = await ctx.prompt({
      type: 'input', // use 'password' for sensitive data
      message: 'Are you sure y/n',
      default: 'y'
    });
    if (consent === 'y') {
      // returning objects allows structured JSON and YAML output (using `--output` global flag),
      // implementing toString() allows to customize raw output
      return {
        key: 'value',
        toString() { 
          return '[key = value]'
        }
      };
    }
  }
  // ctx.fetch
  const res = await ctx.fetch(`${serverUrl}/v1/applications`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (res.ok) {
    return {
      'my-key': 42,
      apps: await res.json()
    }
  }
  // returning value is optional
};
```

</details>

#### Extend Built-in Command

<details><summary><code>getMetadata(originalGetMetadata)</code></summary>

```js
export const getMetadata = (originalGetMetadata) => {
  if (typeof originalGetMetadata === 'function') {
    const metadata = originalGetMetadata();
    const index = Object.values(metadata.options)
      .reduce((acc, cur) => Math.max(cur?.index ?? 0, acc), 0) + 1;
    metadata.options.force = {
      keys: ['--force', '-f'],
      type: 'boolean',
      mandatory: false,
      multiple: false,
      helpText: 'Force push to productive environment',
      index
    };
    return metadata;
  }
  return { name: 'push' };
};
```

</details>

<details><summary><code>run(ctx, originalRun)</code></summary>

```js
export const run = async (ctx, originalRun) => {
  const profile = ctx.config.profiles[ctx.config.active_profile];
  if (profile.apptid === ctx.env.PROD_ACCOUNT) {
    const consent = 
      ctx.args.force 
      || (await ctx.prompt({
        type: 'input',
        message: 'Are you sure you want to deploy to productive account y/n',
        default: 'n'
      }) === 'y');
    if (consent) {
      ctx.console.debug('Pushing to productive account');
      return originalRun();
    }
    return 'Nothing pushed';
  }
  ctx.console.debug('Pushing to non-productive account');
  return originalRun();
};
```

</details>

## Troubleshooting

If you experience unexpected behavior, the execution of command never ends, you see error messages or stack traces in the output - you can run any command with global `--verbose` or just `-v` at the end. This will print trace logs with detailed information about each step in the command execution.

## License

Copyright 2024 SAP SE or an SAP affiliate company and Application Frontend Command Line Interface contributors.
