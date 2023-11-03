# @sap/generator-fiori

## Features

The **SAP Fiori application generator** provides a single entry point to generate both SAP Fiori elements applications and SAP Fiori freestyle applications. Users can choose the type of template required, along with the relevant data source, and an application will be generated into the specified folder.

The generated application conforms to the [Fiori Design guidelines](https://experience.sap.com/fiori-design-web/floorplans/floorplan-overview/) and SAP best practices.

## Installation

1. Get [Node.js](https://nodejs.org/en/download/)
1. Install Yeoman(https://https://yeoman.io/) by executing `npm install -g yo`. Note: `yo` version 4.3.0 or higher required for macOS Monterey.
1. Install the [MTA](https://www.npmjs.com/package/mta) Node.js package (version 1.0 or higher) by executing `npm install -g mta`.

The SAP Fiori generator can be installed using either of the following methods:

- **Install the generator from NPM**

  - Execute

    ```sh
    npm install -g @sap/generator-fiori
    ```

- **Install the generator from the SAP Fiori Tools extension pack.**

  - Installing the SAP Fiori Tools extension pack will automatically check if the SAP Fiori generator is installed and install it if necessary.

After installation, verify your installation to see if Yeoman has been installed correctly with the Fiori generator.

```
yo
```

  Make sure you see the `@sap/fiori` generator listed.

## Launch Fiori application generator

### Using Yeoman

- `yo`

OR

### Using the Yeoman Application Wizard

- Additionally you can use the Yeoman Application Wizard for a more feature rich user experience.
- Download the latest release of the Yeoman Application Wizard from the VSCode marketplace.  Search for 'Application Wizard' in the marketplace.
- Invoke the Yeoman UI Wizard in VSCode by calling `CMD + Shift + P -> Open Application Wizard`
- This will show all Yeoman templates that have been installed on the user's machine, and should include an option for the `SAP Fiori application`
- Alternatively, if you have the SAP Fiori tools pack installed, you can call `CMD + Shift + P -> Fiori: Open Application Generator`.  This will launch the Yeoman UI Wizard but restrict it to just work with with the SAP Fiori Tools Application Generator.

## Usage for Fiori elements application

Once SAP Fiori application generator is launched successfully, a user is asked to choose the application type. The user can choose between Fiori
elements and Fiori freestyle applications. The templates (floorplans) of the selected application type are then listed for user to
choose.

### Generator Wizard Steps

#### 1. Template selection

Select the required template type to use when generating your application. The generator currently supports the following templates:

**SAP Fiori elements**
- List Report Object Page
- Worklist
- Analytical List Page
- Overview Page

**SAP Fiori freestyle**
- SAP Fiori Worklist Application
- SAP Fiori Master-Detail Application
- SAPUI5 Application

#### 2. Select Data Source

Currently, the generator supports the following methods to provide the Data Source:

- **Connect to a System**

  You can connect to a System in VSCode by selecting one of the following methods:

  1. You can choose to connect to an existing ABAP on premise system by providing the URL and optional SAP Client identifier.  If the URL requires authentication, you will need to provide those details during generation.
  1. You can connect to an ABAP environment on the SAP Business Technology Platform.  In this case, you must provide a local file that defines the service connection details for the desired ABAP Environment.  Once you provide these details, a browser tab will launch for you to provide authentication details.

  In both cases, if you choose to save the SAP system for future reference, the system details will be stored in the secure storage location of your operating system.

- **Connect to an OData service**

  Enter the OData endpoint URL you wish to use in your generated application. Currently, the generator supports an OData endpoint that is either unauthenticated or authenticated with Basic authentication. For an authenticated OData endpoint, you will be asked to provide a username and password.

- **Connect to SAP Business Accelerator Hub**

  You can use any of the services available in the SAP Business Accelerator Hub by providing your authentication details and choosing the relevant service.

- **Use a Local CAP Project**

  For Odata V4 CAP projects, you can reference an existing project and use the service in that project during generation.

- **Upload a data service metadata file**

  Upload a service metadata file that represents the back end service from the file system. This allows the user to generate the application without relying on a back end service being available.

  **Note:** Uploading a data service metadata file will restrict the generated application to only be available using mock data.

#### 3. Select relevant entities

Once the data source has been supplied, the **SAP Fiori application generator** will present a list of entities from the OData service to choose.

#### 4. Add project descriptor data

In the next step, provide the following information:

- **Module name** Required.  Must be alpha-numberic and cannot contain spaces.  The generated NodeJS application will use the module name as its package name.  Will also be used as the folder name of the generated application.
- **App Title** Required.  This will be the title in the header of the generated application
- **Namespace** Required.  The UI5 project namespace to be used.  Must start with a letter and contain letters, digits and periods only.
- **Description** Required. The text description of the application.
- **Parent Folder** Required.  The parent folder into which the new application will be generated.  The new application will be generated in a new folder with the `Module Name` as detailed above.  If there already exists a folder with the same name, the user must choose a new Module name.

- **Advanced Configuration** Optional.  The user can choose to customise the generated application with the following options:

  - **UI5 CSS Theme**
  - **UI5 Javascript Library Version**

- **Deployment Configuration** Optional.  If selected, an extra step will be added to the generator for adding deployment configuration using either ABAP or Cloud Foundry

- **FLP Configuration** Optional.  If selected, an extra step will be added to the generator for adding Fiori launchpad configuration to the generated application.

### Running the generated app

After the application has been successfully generated, open a terminal and browse to the root folder of the generated application. For a V2 template application, there are two methods available to run the application:

- **Running the application with connection to the live OData endpoint**

  Start the application using `npm start`.  This will make the application available on `localhost:8080`, and will connect to the live OData endpoint.  If the OData endpoint requires authentication, the user will be asked to authenticate in the browser.

- **Running the application using mock data (V2 only)**

  Start the application using `npm run start-mock`.  This will make the application available on `localhost:8080`, but will use a mock server to reflect the OData endpoint.  This ensures that developers can use the application without having to connect to a live OData service.

- **Running the application using context menu**

  Under the `src` folder, find the `app.json` file.  Right click and select **Open Preview in Browser** (launches a browser with your application).


## Prerequisites

The generated application requires the following software to be installed:

- [NodeJS](https://nodejs.org/en/download/) Node version must be >=16.14.2
- [MTA](https://www.npmjs.com/package/mta) MTA Version must be 1.0.4
- Windows OS requires [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) NPM module installed globally.

## Support

Join the [SAP Fiori Tools Community](https://community.sap.com/search/?by=updated&ct=blog&mt=73555000100800002345). Ask Questions, Read the Latest Blogs, Explore Content.
Please assign tag: _SAP Fiori tools_

To log an issue with SAP Fiori Tools, please see [Contact SAP Support](https://help.sap.com/viewer/1bb01966b27a429ebf62fa2e45354fea/Latest/en-US).
