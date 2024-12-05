# MDK Tools
It provides the CLI to assist Mobile Development Kit (MDK) application developers throughout the development lifecycle to:
- deploy MDK metadata project to SAP Business Technology Platform (BTP) Cloud Foundry environment,
    - Mobile Services to run as mobile application
    - HTML5 repository to run as web application

## Setup

- Prerequisites
    - Node 12 or higher version
    - [Space Developer role]( https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/09076385086b4da3bd1808d5ef572862.html) assigned to your user
    - [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)
    - Logon to Cloud Foundry by 'cf login'
    - MDK metadata project
    - [MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/) (required for MDK web deployment)
    - MultiApps CF CLI Plugin (required for MDK web deployment)
        ```bash
        cf install-plugin -r CF-Community "multiapps"
        ```
    - CF HTML5 Applications Repository CLI Plugin (required for MDK web deployment)
        ```bash
        cf install-plugin -r CF-Community "html5-plugin"
        ```
- Install
    ```bash
    npm install @sap/mdk-tools -g
    ```
## Features

- Builder

    You can build metadata project into js or zip file. 
    
    Below command can get build parameter details:
    
    ```bash
    mdk build
    ```

    - target

        Target 'js' can build to bundle.js and bundle.js.map, you can use it to update your local run project.   
        Target 'zip' can build to uploadBundle.zip, you can uploaded it to Mobile Services.
        Target 'source' can pack source code into zip with configuration for Mobile Services.This is for scenario to extend a multi tenant application.
        
        The build results are generated in .build folder under project.
    - project

        Metadata project, it's current folder if not provided.

    - externals

        Libs need to be ignored in webpack bundle process. The built-in externals are:
        - @nativescript/core
        - mdk-core

        ```bash
        mdk build --target zip --externals "@nativescript/geolocation" "external2"
        ```

    - filters

        Project folders/files need to be filtered in bundle procees. The built-in filters are:
        - /Web/

        ```bash
        mdk build --target zip --filters "/FolderA/" "/FolderB/readme.txt"
        ```

    - debugging

        Enable debugging by add devtool option

        ```bash
        mdk build --target zip --devtool "source-map"
        ```
    - bundle-definition-path

        The definition factory path for build purpose. The default path is the 'out' folder in mdk-tools.

    ```bash
    mdk build --target js
    mdk build --target js  --project /path/to/Your-MDK-metadata-project 
    mdk build --target zip --project /path/to/Your-MDK-metadata-project
    mdk build --target source --project /path/to/Your-MDK-metadata-project
    ```
    

- Deployer

    You can deploy MDK metadata project directly to SAP Business Technology Platform (BTP) Cloud Foundry and NEO environment.

    Below command can get deploy parameter details:
    
    ```bash
    mdk deploy
    ```

    - Deploy to Mobile Services on Cloud Foundry to run it as a mobile application

        It bundles MDK metadata project, uploads to Mobile Services and publishes it.
        The name option is the application id in Mobile Services. If there's no *name* argument, it reads *MobileService:AppId* from *\.project.json* file (applicable to MDK metadata project exported from SAP Business Application Studio). If there's no *project* argument, it reads *current folder* as *MDK metadata folder*.

        >In case of MDK metadata project exported from SAP Web IDE, *name* argument is mandatory.

        ```bash
        mdk deploy --target mobile --name "com.mdk.myapp" --devtool "source-map"
        mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project
        mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project --externals "@nativescript/geolocation" "external2"
        mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project --showqr
        mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project
        ```

        If your Mobile Services is Preview version, you can add *--preview* option.
        ```bash
        mdk deploy --target mobile --name "com.mdk.myapp" --preview
        ```
        In case of deploying MDK bundle zip exproted from SAP Web IDE or Business Application Studio.
        ```
        mdk deploy --target mobile --name "com.mdk.myapp" --zip Your-MDK-bundle-zip-file
        ```

        In case of deploying MDK Base project with project source zip
        ```
        mdk deploy --target mobile --name "com.mdk.myapp" --zip Your-MDK-source-zip-file --source
        ```

    - Deploy to Mobile Services on NEO to run it as a mobile application    
        - Prerequisites
            - NEO Mobile Services Admin API URL
            - Admin user name and password
        ```bash
            mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project --neo 
        ```
        The above example prompts user password input, reads adminApi and user from .project.json, if can't find them, then prompts user input. 

        ```bash
            mdk deploy --target mobile --name "com.mdk.myapp" --neo --adminApi YourAdminAPI --user YourUserName --pwd YourPassword
        ```
        The above example starts deploy without prompts.

    - Deploy to HTML5 repository on Cloud Foundry to run it as web application

        It bundles MDK metadata project, builds it to MTA project and deploys to HTML5 repository.
        The name option is the application name in SAP BTP cockpit. If there is no *name* argument, it reads *CF:Deploy:Name* from *\.project.json* file (applicable to MDK metadata project exported from SAP Business Application Studio). If there's no *project* argument, it reads *current folder* as *MDK metadata folder*.

        >In case of MDK metadata project exported from SAP Web IDE, *name* argument is mandatory.

        ```bash
        mdk deploy --target cf --name "MyWebApplication" --devtool "source-map"
        mdk deploy --target cf --name "MyWebApplication" --project /path/to/Your-MDK-metadata-project 
        mdk deploy --target cf --name "MyWebApplication" --externals "@nativescript/geolocation" "external2"
        ```
        
        If you want to use preview web runtime or dev web runtime starts with https://, you can add *--runtime* option.
        ```bash
        mdk deploy --target cf --name "MyWebApplication" --runtime preview
        mdk deploy --target cf --name "MyWebApplication" --runtime "https://RuntimeUrl"
        ```
- Migrator

    Migrate the MDK project to the latest schema version.

    The option '--preview' is only used to list all files that need to be migrated but not to do a real migration.
    ```bash
    mdk migrate --project /path/to/Your-MDK-metadata-project 
    mdk migrate --project /path/to/Your-MDK-metadata-project --preview
    ```

    If you want to migrate files to the specific schema version, use '--target-version' option (right now, we support only one target-version option 6.3):
    ```bash
    mdk migrate --project /path/to/Your-MDK-metadata-project --target-version 6.3
    ```
    Use 'log-file' option output the logs to a file (no need to create the log file firstly, it will be generated automatically):
    ```bash
    mdk migrate --project /path/to/Your-MDK-metadata-project --log-file /path/to/log-file.txt
    ```
- Validator
You can validate MDK project through the below command:
    ```bash
    mdk validate --project /path/to/Your-MDK-metadata-project --log-file /path/to/log-file.txt
    ```
    The option '--log-file' is not required, you can use it to output the logs to a file.
    You can use option '--log-level' to specify which logs can be output. The acceptable values are: 0 (Debug), 1 (Info), 2 (Warn), 3 (Error). Default value is 1.
    ```bash
    mdk validate --project /path/to/Your-MDK-metadata-project --log-file /path/to/log-file.txt --log-level 3
    ```
    You can use option '--config-file' to specify a JSON format file that includes some exclusion configurations for the validation. By default, .project.json file in the root path of MDK project is used. Below is an example:
    ```
    {
        "validation": {
            "exclude": {
                "ui": [
                    "#Page:myFormCell", // exclude page name "myFormCell"
                    "#Control:myControl" // exclude control name "myControl"
                ],
                "i18n": [
                    "test" // exclude i18n key "test"
                ]
            }
        }
    }
    ```
    The MDK Validator supports hook for git commit. If there is no validation errors the command exit with zero, otherwise the command exit with non-zero. You can use option '--show-warnings' to include warnings in the validation result, this option is set to false by default.
