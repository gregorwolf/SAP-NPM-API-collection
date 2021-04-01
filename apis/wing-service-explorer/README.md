
# @sap/wing-service-explorer

## Overview

**Wing-service-explorer** is an npm package that provides the ability to explore SAP services.

## API

**Wing-service-explorer** exposes 3 different objects for 3 different SAP systems:

### ServiceURLExplorer

---

This object exposes APIs for exploration of systems and services defined as OData odata_gen in the account destination list.

#### getDestinations

Returns a list of destinations filtered with WebIDEUsage = odata_gen

#### isFullUrlDestination

Gets as an input a destination object (received from the getDestinations API) and returns **true** if this is a destination to a system
or a service (i.e. if the destination includes a property named full_url and its value is true).

#### getMetadata

Gets as an input a ConnectionDetails object (which contains the details to connect to a service) and returns the metadata (XML format)
which the service exposes.

### APIHubExplorer

---

This object exposes APIs for exploration of APIs from the APIHub system.

#### getDestinations

Returns a list of destinations filtered by WebIDEUsage = apihub_catalog

#### getListOfAPIs

Gets as an input a destination object (received from the getDestinations API) and returns a list of APIs exposed by the APIHub system.

#### getApiKey

Gets as an input a destination object and user authetication details (user/password) and returns the user's API key from the APIHub system. (Required for getting the API metadata.)

#### getMetadata

Gets as an input a ConnectionDetails object (which contains the details to connect to an API) and returns the metadata (XML format)
which the API exposes.
Note: The APIHub requires a definition of 2 destinations. The first one for the APIHub system and the second for the API sandbox.

### ExtensionFactoryExplorer

---

This object exposes APIs for exploration of systems exposed by the Extension Factory.

#### getDestinations

Returns a list of destinations which contain an additional property named **XFSystemName**.
