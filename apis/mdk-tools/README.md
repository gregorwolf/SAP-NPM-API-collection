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

    Target 'js' can build to bundle.js and bundle.js.map, you can use it to update your local run project.   
    Target 'zip' can build to uploadBundle.zip, you can uploaded it to Mobile Services.


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
    - Deploy to HTML5 repository on Cloud Foundry to run it as web application

        It bundles MDK metadata project, builds it to MTA project and deploys to HTML5 repository.
        The name option is the application name in SAP BTP cockpit. If there is no *name* argument, it reads *CF:Deploy:Name* from *\.project.json* file (applicable to MDK metadata project exported from SAP Business Application Studio). If there's no *project* argument, it reads *current folder* as *MDK metadata folder*.

        >In case of MDK metadata project exported from SAP Web IDE, *name* argument is mandatory.

        ```bash
        mdk deploy --target cf --name "MyWebApplication"
        mdk deploy --target cf --name "MyWebApplication" --project /path/to/Your-MDK-metadata-project 
        ```
