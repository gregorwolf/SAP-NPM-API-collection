# @sap/cds-rfc

An integration plugin for [ABAP RFC Function Modules](https://help.sap.com/doc/saphelp_gbt10/1.0/en-US/48/88068ad9134076e10000000a42189d/frameset.htm) into the [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap/).
This applies to general RFC-callable Function Modules and to [BAPIs](https://help.sap.com/doc/saphelp_gbt10/1.0/en-US/4d/c89000ebfc5a9ee10000000a42189b/frameset.htm).

The plugin contains
- A converter from an RFC interface description to [CDS](https://cap.cloud.sap/docs/cds/cdl).
- The runtime integration for [CAP Node.js](https://cap.cloud.sap/docs/node.js/).

The integration for [CAP Java](https://cap.cloud.sap/docs/java/) is covered in a different Java-specific plugin.
Currently this is not yet available.

## Supported Platforms and Download Channels

This modules uses package `@sap-rfc/node-rfc-library` for the low-level RFC communication.  That package is not available on the standard `npmjs.com` registry and only available for Linux and Windows.

-  macOS users need to use it in a Docker container.
- Only SAP customers can get it through a dedicated NPM registry. In short:
  - An S-user and a license for the _SAP Build Code_ product is required.
  - With this entitlement, you can download NPM credentials for the _NODE RFC LIBRARY_ in the [_Repository Based Shipment Channel_](https://ui.repositories.cloud.sap).
  - Your `.npmrc` file should effectively look like this, with `<token>` holding the downloaded credentials for the `...repositories.cloud.sap` host:
      ```
      @sap-rfc:registry=https://...repositories.cloud.sap/
      //...repositories.cloud.sap/:_auth=<token>
      ```

   Refer to the [documentation for the _Repository Based Shipment Channel_](https://help.sap.com/docs/RBSC/0a64be17478d4f5ba45d14ab62b0d74c/175673b12feb41739df4f041db52fe76.html) for more, incl. how to get [technical users](https://help.sap.com/docs/RBSC/0a64be17478d4f5ba45d14ab62b0d74c/7e83dfc309834942b441fc2106c5b7f5.html) and [NPM registry endpoints](https://help.sap.com/docs/RBSC/0a64be17478d4f5ba45d14ab62b0d74c/74a9a6cd668842cc88e623ed39d8373c.html).

## Setup

In a CAP project, install this package:

```sh
npm add @sap/cds-rfc
```

Also update the `cds import` CLI in `@sap/cds-dk` to latest:

```sh
npm install -g @sap/cds-dk
```


## Usage

### Import the RFC API

The RFC interface needs to be converted to a `.cds` file so that it can be integrated into a CAP application.
You can do this through a UI in SAP Business Application Studio or the command line interface (CLI).

#### In SAP Business Application Studio

Use the Service Center in SAP Business Application Studio to browse and import the RFC interface metadata.
See the [Service Center documentation](https://help.sap.com/docs/build_code/d0d8f5bfc3d640478854e6f4e7c7584a/892114ce078b4e17a9ff7e751e6330cc.html#explore-sap-system-functions) for more.

#### Through the CLI

- **Online**: The `cds import --from rfc` CLI allows to connect to an ABAP system and fetch the RFC metadata.

   First, configure the system connection details as [documented in Configure System Access](#configure-system-access).

   Then run:
   ```sh
   cds import --from rfc --as cds --name BAPI_USER_GET_DETAIL --destination SYS
   ```

   - Use the parameter `--force` if the same RFC module has already been imported.
   - The destination `SYS` is just an example and can be any string, but has to match the system credentials.

- **Offline**: there is also an 'offline' mode available where you need to specify the metadata JSON file as input:
   ```sh
   cds import --from rfc --as cds ./BAPI_USER_GET_DETAIL.json --destination SYS
   ```

   You can get the metadata file from a previous import run.
   > At the moment, there is no general repository available for these files. Such a repository would also not cater to customer-specific modules or extensions to standard modules.

The import operation adds the following to your project:

- A file `srv/external/SYS/SYS.cds` holding the [CDS](https://cap.cloud.sap/docs/cds/cdl) description of the imported RFC module and the relevant Data Dictionary types. The function module itself is represented as a [CDS action](https://cap.cloud.sap/docs/cds/cdl#actions) that needs to be called at runtime by application code, see [Consume in Node.js](#consume-in-nodejs).
- The RFC metadata as JSON in `srv/external/SYS/BAPI_USER_GET_DETAIL.json`.

- A service configuration in `package.json`:

   ```json
   {
     "requires": {
       "SYS": {
         "kind": "rfc",
         "model": "srv/external/SYS",
         "[production]": {
           "credentials": {
             "destination": "SYS"
           }
         }
       }
     }
   }
   ```

   The destination name is configured for usage in cloud deployments using the `production` profile. You need to create this destination in BTP cockpit and provide the system details there.


### Consume in Node.js

#### Write Code to Execute the RFC Action

In your service handler, connect to the RFC service and call the action for the function module:

```js
const cds = require('@sap/cds')
class MyService extends cds.ApplicationService { init() {
   this.on('whateverEvent', async (req) => {

      const sys = await cds.connect.to('SYS') // matches the `requires...` entry in package.json
      const userData = await sys.BAPI_USER_GET_DETAIL({ USERNAME: req.data... })

   })
   return super.init()
}}
module.exports = MyService
```

#### Configure System Access

In local scenarios where you can reach the system from your network, you can skip using destinations and specify the connection details in an `.env` file:

```properties
cds.requires.SYS.credentials.ashost=
cds.requires.SYS.credentials.client=
cds.requires.SYS.credentials.sysnr=00
cds.requires.SYS.credentials.user=
cds.requires.SYS.credentials.passwd=
```

Make sure to git-ignore this file, if it contains your user and password.
You can also pass user and password through environment variables:

```sh
 CDS_REQUIRES_SYS_CREDENTIALS_USER=... CDS_REQUIRES_SYS_CREDENTIALS_PASSWD=... cds watch
```

Such a system configuration is also required for the [online CLI importer](#through-the-cli) above.

## How to Obtain Support

In case you find a bug, please report an [incident](https://cap.cloud.sap/docs/resources/#support-channels) on SAP Support Portal.

## License

This package is provided under the terms of the [SAP Developer License Agreement](https://cap.cloud.sap/resources/license/developer-license-3_2_CAP.txt).
