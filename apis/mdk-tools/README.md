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
    - target

        Target 'js' can build to bundle.js and bundle.js.map, you can use it to update your local run project.   
        Target 'zip' can build to uploadBundle.zip, you can uploaded it to Mobile Services.
        
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

        Project folders/files need to be filtered in bundle procees. The builtin filters are:
        - /Web/

        ```bash
        mdk build --target zip --filters "/FolderA/" "/FolderB/readme.txt"
        ```

    ```bash
    mdk build --target js
    mdk build --target js  --project /path/to/Your-MDK-metadata-project 
    mdk build --target zip --project /path/to/Your-MDK-metadata-project
    ```
    

- Deployer

    You can deploy MDK metadata project directly to SAP Business Technology Platform (BTP) Cloud Foundry environment.

    - Deploy to Mobile Services on Cloud Foundry to run it as a mobile application

        It bundles MDK metadata project, uploads to Mobile Services and publishes it.
        The name option is the application id in Mobile Services. If there's no *name* argument, it reads *MobileService:AppId* from *\.project.json* file (applicable to MDK metadata project exported from SAP Business Application Studio). If there's no *project* argument, it reads *current folder* as *MDK metadata folder*.

        >In case of MDK metadata project exported from SAP Web IDE, *name* argument is mandatory.

        ```bash
        mdk deploy --target mobile --name "com.mdk.myapp" 
        mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project
        mdk deploy --target mobile --name "com.mdk.myapp" --project /path/to/Your-MDK-metadata-project --showqr
        ```

        If your Mobile Services is Preview version, you can add *--preview* option.
        ```bash
        mdk deploy --target mobile --name "com.mdk.myapp" --preview
        ```
        In case of deploying MDK bundle zip exproted from SAP Web IDE or Business Application Studio.
        ```
        mdk deploy --target mobile --name "com.mdk.myapp" --zip Your-MDK-bundle-zip-file
        ```

    - Deploy to HTML5 repository on Cloud Foundry to run it as web application

        It bundles MDK metadata project, builds it to MTA project and deploys to HTML5 repository.
        The name option is the application name in SAP BTP cockpit. If there is no *name* argument, it reads *CF:Deploy:Name* from *\.project.json* file (applicable to MDK metadata project exported from SAP Business Application Studio). If there's no *project* argument, it reads *current folder* as *MDK metadata folder*.

        >In case of MDK metadata project exported from SAP Web IDE, *name* argument is mandatory.

        ```bash
        mdk deploy --target cf --name "MyWebApplication"
        mdk deploy --target cf --name "MyWebApplication" --project /path/to/Your-MDK-metadata-project 
        ```
- Migrator

    Migrate the MDK project to the latest schema version including metadata files and script files.

    The option '--preview' is only used to list all files that need to be migrated but not to do a real migration.
    ```bash
    mdk migrate --project /path/to/Your-MDK-metadata-project 
    mdk migrate --project /path/to/Your-MDK-metadata-project --preview
    ```

    If you want to migrate metadata files only (not include script files), use '--uncheck-script' option:
    ```bash
    mdk migrate --project /path/to/Your-MDK-metadata-project --uncheck-script
    ```

    Use 'log-file' option output the logs to a file (no need to create the log file firstly, it will be generated automatically):
    ```bash
    mdk migrate --project /path/to/Your-MDK-metadata-project --log-file /path/to/log-file.txt
    ```

    - Migrate script files
    
        Only migrate script files (file extension is .ts, .js, or .json), and not include the metadata files:
        ```bash
        mdk migrate-script -s /path/to/Your-MDK-metadata-project
        ```
        You can also use '--help' option to check all supported options:
        ```bash
        mdk migrate-script --help
        ```
        Or
        ```bash
        mdk migrate-script -h
        ```