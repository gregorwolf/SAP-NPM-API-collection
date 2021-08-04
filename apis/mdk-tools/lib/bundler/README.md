# Install instructions

From the *application-bundler* folder

```bash
npm install
```

## How to run

All commands should be run from the *application-bundler* folder.

#### With settings file

```bash
node bundler-cli
```

Where settings.json is a file in the current directory which contains the following:

```json
{
  "create-bundle": false,
  "editor-export": "",
  "externals": [
    "tns-core-modules/file-system",
    "tns-core-modules/ui/dialogs"
  ],
  "nativescript-project": "/path/to/nativescript-project-directory",
  "seam-project": "/path/to/seam-project-directory",
  "watch": false
}
```

The settings.json file is the assumed settings file path, but you can specify a custom path with the --settings-file argument. In this example, editor-export is ignored because it's empty.

#### With command line arguments

```bash
node bundler-cli --nativescript-project /path/to/nativescript-project-directory --seam-project /path/to/seam-project-directory --externals tns-core-modules/file-system tns-core-modules/ui/dialogs
```

## Argument details
* `bundle-output-name` Output filename of bundle. If not specified, uses the default `bundle.js` name
* `create-bundle` If this option is specified, a new zip file will be created called uploadBundle.zip. This can be used to upload the application bundle to HCP. Also, if this is specified, the application will not be copied to the NativeScript project path.
* `editor-export` Path of the zip file exported from WebIDE which contains an application. If this is specified, the zipped application is what gets bundled and the seam-project option is ignored.
* `externals` List of NativeScript modules to be excluded from the bundle. Use this option for dependencies you expect to be in the environment when the application is built. If not specified, the values "tns-core-modules/file-system" and "tns-core-modules/ui/dialogs" are used.
* `help` Prints the usage guide.
* `nativescript-project` The location of the NativeScript project's app folder. As long as the create-bundle option isn't specified, the application bundle is copied here.
* `settings-file` Path of the settings JSON file containing other options. If this is specified, all other command line arguments are ignored.
* `seam-project` The location of the application definitions. Used to generate the bundle unless editor-export is specified. If the metadata application uses components, this path should be to the base project.
* `watch` If this option is specified, the script will watch for changes in the input files. If editor-export is also specified, any updates to the export zip file will cause the application to be rebundled. If editor-export is not specified, any changes to project files in the seam-project directory will cause the application to be rebundled under incremental mode. Use `watch` mode, application-bundler will keep to track and don't quit until users terminate it actively.
* `devtool` Choose a style of source mapping to enhance the debugging process. If it is specified, e.g. "source-map", the source map file of bundle will be generated as well. Please check the webpack devtool configuration for all the available options.
* `bundle-target-path` The location of the target folder for bundle task. It is only for MDK VSCode extension. If this is specified, the bundle.js (and the bundle.js.map) will be copied into it.

If no arguments are specified, a default argument "--settings-file settings.json" is used.

## Installing as a global executable

You can install the application-bundler as an executable by running the following in the *application-bundler* folder:

```bash
npm link
```

This command tells NPM to use symlinks to make the CLI available globally with the name *application-bundler*. This is useful if you want to run the bundler from a project directory. For example, if your project has a properly configured *settings.json* file, you can simply run:

```bash
application-bundler
```
