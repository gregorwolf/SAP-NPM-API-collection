# @sap/ux-specification

Specifies the structure of SAP Fiori Element templates in form of typescript types and JSON schema files. You can find the JSON schemas under dist/schema.

The major and minor version of this specification matches the major and minor version of SAP UI5, which contains Fiori elements. 

_Example_:  
`@sap/ux-specification@1.76.x` specifies the Fiori elements that are delivered with UI5 version 1.76.x

The module supports both the OData V2 and the OData V4 version of the templates (aka FioriElementsVersion), you thus can find two different access points for the typescript definitions:
- src/v2.ts comprises the OData V2 definitions
- src/v4.ts comprises the OData V4 definitions

JSON schemas are provided for the following schema types:
- FioriElementsVersion.v2:  Application, ObjectPage, ListReport and OverviewPage
- FioriElementsVersion.v4:  Application, ObjectPage, ListReport   

Further schema or template types are planned within the next releases.  
You can retrieve any generic schema via schemaAccess.ts.

Besides the specification, src/api.ts provides functions that can be used with SAP Fiori apps in connection with the JSON schemas:
- generateSchema: converts a generic schema to an application specific one, enriched by app specific information like annotations.
- importConfig: imports information from the app, like manifest settings or UI5 flexibility changes, into a JSON configuration file that relates to a given schema.
- exportConfig: exports from a JSON configuration file, returning an updated manifest.json file and a list of UI5 flexibility changes. 

**Constraint**
The definitions and functions do not handle the OData annotations of the SAP Fiori Element templates.


