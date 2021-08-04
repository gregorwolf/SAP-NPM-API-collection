# MDK Tools
It provides the CLI to assist Mobile Development Kit (MDK) application developers throughout the development lifecycle:
- Bundle MDK project.
- Build MDK project to Web MTA project or HTML5 module.
- Deploy MDK project to Mobile Services or Cloud Foundry.

# Setup

- Install
    ```bash
    npm install @sap/mdk-tools
    ```
## Features
- Bundler
   
    You can find the details in bundler/README.md

    ```bash
    mdk bundle  --nativescript-project /path/to/nativescript-project-directory --seam-project /path/to/seam-project-directory --externals tns-core-modules/file-system tns-core-modules/ui/dialogs 
    ```

- Web Builder

    - Build project to an MTA project.

        It generates an MTA project named WebApplicationFactory.
        The option '--dist' specifies the target folder. By default, it's in the same folder of MDK project

        ```bash
        mdk build --target mta
        mdk build --target mta --project "./sample"
        mdk build --target mta --project "./sample" --dist "./dist"
        ```

        '--forceUpdate' supports to regenerate all files. By default, it only updates MDK bundle result.
        ```bash
        mdk build --target mta --forceUpdate
        ```

    - Build project to a Html5 module.

        It generates a Html5 module named MDKModule.
        The option '--dist' specifies the target folder. By default, it's in /Web folder in MDK project

        ```bash
        mdk build --target module
        mdk build --target module --project "./sample"
        mdk build --target module --project "./sample" --dist "./dist"
        mdk build --target module --project "./sample" --dist "./dist" --forceUpdate
        ```

        '--ui5' supports to generate a UI5 module.
        A ui5 module can be discovered by portal content provider service.
        Currently, '--ui5' is only available when target is module.
        
        ```bash
        mdk build --target module --ui5
        ```

- Deployer
    - Prerequisites (Business Application Studio has below prerequisites)
        - Cloud Foundry CLI
https://docs.cloudfoundry.org/cf-cli/install-go-cli.html
        - MultiApps CF CLI Plugin
            ```bash
            cf install-plugin -r CF-Community "multiapps"
            ```
        - CF HTML5 Applications Repository CLI Plugin
            ```bash
            cf install-plugin -r CF-Community "html5-plugin"
            ```
        - Logon to Cloud Foundry by 'cf login'


    - Deploy to Mobile Services

        It bundles MDK project application, uploads to Mobile Services and actives it.
        The name option is the application id in Mobile Services. If there's no name option, it reads MobileService:AppId from \.project.json file.

        ```bash
        mdk deploy --target mobile --name "sampleAppId" 
        mdk deploy --target mobile --name "sampleAppId" --project "./sample" 
        mdk deploy --target mobile --name "sampleAppId" --project "./sample" --showqr
        ```

    - Deploy to Cloud Foundry

        It bundles MDK project application, builds it to MTA project and deploy to Cloud Foundry.
        The name option is the application name in Cloud Foundry. If there's no name option, it reads CF:Deploy:Name from \.project.json file.

        ```bash
        mdk deploy --target cf --name "sampleAppId" 
        mdk deploy --target cf --name "sampleAppId" --project "./sample" 
        ```
