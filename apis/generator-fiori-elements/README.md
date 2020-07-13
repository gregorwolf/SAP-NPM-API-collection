# @sap/generator-fiori-elements

## Features

The **SAP Fiori tools - Application Generator** provides a Yeoman template to generate an SAP Fiori elements application based on a number of different templates.  The user can choose the type of template required, along with the relevant data source, and an application will be generated into the specified folder. 

The generated application conforms to the [Fiori Design guidelines](https://experience.sap.com/fiori-design-web/floorplans/floorplan-overview/) and SAP best practices.

## Installation

1. Get [Node.js](https://nodejs.org/en/download/)
1. Install Yeoman(https://https://yeoman.io/) by executing `npm install -g yo`.

The SAP Fiori elements generator can be installed using either of the following methods:

- **Install the generator from NPM**

  - Execute

    ```sh
    npm install -g @sap/generator-fiori-elements
    ```
    
- **Install the generator from the SAP Fiori tools extension pack.**

  - Installing the SAP Fiori tools extension pack will automatically check if the SAP Fiori elements generator is installed and install it if necessary.

After installation, verify your installation to see if Yeoman has been installed correctly with the Fiori elements generator.

```
yo
```   
   
  Make sure you see the `@sap/fiori Elements` generator listed.
  
## Usage

### Using Yeoman

- `yo`

OR

### Using the Yeoman Application Wizard

- Additionally you can use the Yeoman Application Wizard for a more feature rich user experience.
- Download the latest release of the Yeoman Application Wizard from the VSCode marketplace.  Search for 'Application Wizard' in the marketplace.
- Invoke the Yeoman UI Wizard in VSCode by calling `CMD + Shift + P -> Yeoman UI Generators`
- This will show all Yeoman templates that have been installed on the user's machine, and should include an option for the `SAP Fiori Tools - Application Generator`
- Alternatively, if you have the SAP Fiori tools pack installed, you can call `CMD + Shift + P -> SAP Fiori Tools - App Generator: Launch`.  This will launch the Yeoman UI Wizard but restrict it to just work with with the SAP Fiori Tools Application Generator.

### Generator Wizard Steps

#### 1. Template selection

Select the required template type to use when generating your application. The generator currently supports the following templates:

**SAP Fiori elements**
- List Report Object Page with OData V2
- Worklist
- Analytical List Page
- Overview Page

#### 2. Select Data Source

Currently the generator supports the following methods to provide the Data Source:

- **Connect to an SAP System**

  You can connect to an SAP System in VSCode by selecting one of the following methods:
  
  1. You can choose to connect to an existing ABAP on premise system by providing the URL and optional SAP Client identifier.  If the URL requires authentication, you will need to provide those details during generation.
  1. You can connect to an ABAP environment on the SAP Cloud Platform.  In this case, you must provide a local file that defines the service connection details for the desired ABAP Enviroment.  Once you provide these details, a browser tab will launch for you to provide authentication details.  
  
  In both cases, if you choose to save the SAP system for future reference, the system details will be stored in the secure storage location of your operating system.
  
- **Connect to an OData service**

  Enter the OData endpoint URL you wish to use in your generated application.  Currently the generator supports an OData endpoint that is either unauthenticated or authenticated with Basic authentication. For an authenticated OData endpoint, you will be asked to provide a username and password.

- **Upload a data service metadata file**

  Upload a service metadata file that represents the back end service from the file system. This allows the user to generate the application without relying on a back end service being available.

  **Note:** Uploading a data service metadata file will restrict the generated application to only be available using mock data.

#### 3. Select relevant entities

Once the data source has been supplied, the **SAP Fiori tools - Application Generator** will present a list of entities from the OData service to choose.

- **For List Report Object Page And Worklist Template:**

  Select an entity as the main entity.  The selection will default to the entity that has been marked as `draftRoot`, if present in the OData service.

  After choosing a main entity, a filtered list of navigation entities will be presented. The Navigation entity is optional.


- **For Analytical List Page Template:**

  Select a main entity and optional navigation entity, similar to the List Report Object page above.  You can also optionally choose the default qualifier, table type, whether to allow multi select, is the table auto-hidden, and if smart variant management support is enabled.

- **For Overview Page Template:**

  Select the entity to be used as the filter type from the list of entities drop down.  This is a mandatory field.

#### 4. Add project descriptor data

In the final step, provide the following information:

- **Module name** Required.  Must be alpha-numberic and cannot contain spaces.  The generated NodeJS application will use the module name as its package name.  Will also be used as the folder name of the generated application.
- **App Title** Required.  This will be the title in the header of the generated application
- **Namespace** Required.  The UI5 project namespace to be used.  Must start with a letter and contain letters, digits and periods only.
- **Description** Required. The text description of the application.
- **Parent Folder** Required.  The parent folder into which the new application will be generated.  The new application will be generated in a new folder with the `Module Name` as detailed above.  If there already exists a folder with the same name, the user must choose a new Module name.

- **Advanced Configuration** Optional.  The user can choose to customise the generated application with the following options:

  - **UI5 CSS Theme**
  - **UI5 Javascript Library Version**

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

- [NodeJS](https://nodejs.org/en/download/) Node version must be >10.15.3 - 10.x or 12.13 LTS.
- Windows OS requires [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) NPM module installed globally.
