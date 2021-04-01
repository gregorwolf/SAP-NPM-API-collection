## OData V2 EDM model (XML Format) to OData V4 EDM (JSON Format) converter

## Features

The MetadataConverter converts Odata 2.0 XML-CSDL-Metadata documents into Odata 4.0 JSON-CSDL-Metadata format.
This converter is able to
- convert all V2 type artifacts
- convert all data artifacts
- converts function imports into a V4 function and V4 function import
- convert and resolve internal and external V2 annotations
- resolve external Types defined in external documents
- determine default value types and convert the value type specific
- detect deferred types and values ​​if they are available at a later point
- provide an API to resolve external documents
- provide a flexible API to enhance/exchange functionality
- lookup and assert XML namespaces to exclude non-Odata nodes
- provide an appropriate error handling
- provide Error position in source xml file where the error is found
- report missing namespaces in std out. Grep for regex '$ERROR - MISSING: (.*)' in stdout.

## Usage

### Via command line interface

Please use the following call to get help:

```convert_edm edmxV20ToJsonV40 --help```

### Via api

Create converter via
```js
const converters = require('@sap/edm-converters');

// function for lasy loading referenced namespaces
function edmLoader(namespace, cb) {
    const document = namespace + '.xml'; // sample
    const xml = load(document);          // from file, service or database
    return cb(null, xml);
}

// read source xml
const inputBuffer = loadSourceDocument; // from file, service or database

// create converter
const v2Conv = converters.MetadataConverterFactory.createEdmxV20XmlToV40Json(
    { xmlProvider: edmLoader }
);

// start converter
v2Conv.execute(inputBuffer, (error, json) => {
    // process error / result
    console.log(json);
});

```


### Supported V2 Annotations


Converted "V2" annotations:


|   |   |   |
|---|:-:|---|
| SAP.schema-version | Schema | @Core.SchemaVersion |
| SAP.creatable | EntitySet | @Capabilities.InsertRestrictions/Insertable |
| SAP.updatable | EntitySet | @Capabilities.UpdateRestrictions/Updatable |
| SAP.deletable | EntitySet | @Capabilities.DeleteRestrictions/Deletable |
| SAP.readable | AssociationSet | @Capabilities.InsertRestrictions/NonInsertableNavigationProperties |
| SAP.updatable | AssociationSet | @Capabilities.UpdateRestrictions/NonUpdatableNavigationProperties |
| SAP.deletable | AssociationSet | @Capabilities.DeleteRestrictions/NonDeletableNavigationProperties |
| SAP.creatable="false"<br> SAP.updatable="false" | Property | @Core.Immutable=true |
| SAP.creatable-path | NavigationProperty | not supported |
| SAP.InsertRestrictions/NonInsertableNavigationProperties with \<If\> construct | | not supported |
| SAP.updatable-path="boolProperty" | EntitySet | @Core.UpdateRestrictions.Updatable.Path="boolProperty" |
| SAP.deletable-path="boolProperty" | EntitySet | @Core.DeleteRestrictions.Deletable.Path="boolProperty" |
| SAP.updatable-path | Property | not supported |
| SAP.searchable | EntitySet | @Capabilities.SearchRestrictions/Searchable |
| SAP.pageable | EntitySet | @Capabilities.TopSupported & @Capabilities.SkipSupported |
| SAP.topable	TopSupported | EntitySet | @Capabilities.TopSupported |
| SAP.addressable="false" | EntitySet | $metadata: attribute IncludeInServiceDocument="false"	|
| SAP.requires-filter | |  @Capabilities.FilterRestrictions/RequiresFilter |
| SAP.required-in-filter | Property | @Capabilities.FilterRestrictionsType/RequiredProperties[] |
| SAP.filterable="false" | Property | @Capabilities.FilterRestrictions/NonFilterableProperties[] |
| SAP.filterable="false" | NavProperty | @Capabilities.NavigationRestrictions/RestrictedProperties/FilterRestrictions/NonFilterableProperties[] |
| SAP.filter-restriction | Property | @Capabilities.FilterRestrictions/RestrictedProperties[]/AllowedExpressions |
| SAP.sortable="false" | Property | @Capabilities.SortRestrictions/NonSortableProperties[] |
| SAP.visible="false" | | not supported |
| SAP.label | |  not supported |
| SAP.heading	| | not supported |
| SAP.quickinfo | | not supported |
| SAP.text | | not supported |
| SAP.unit | | not supported |
| SAP.precision | | not supported |
| SAP.value-list="fixed-values" | | not supported |
| SAP.display-format="Date" | String-Property | converted to Edm.Date as primitive type |
| SAP.display-format="NonNegative" | String-Property IsDigitSequence | not supported |
| SAP.display-format="UpperCase" | | not supported |
| SAP.lower-boundary, upper-boundary | | not supported |
| SAP.field-control | | not supported |
| SAP.action-for  | |not supported |
| SAP.applicable-path | |not supported |
| SAP.is-annotation | | not supported, instance annotations are not marked in V4 |
| SAP.hierarchy-node-for | | not supported |
| SAP.hierarchy-node-external-key-for | | not supported |
| SAP.hierarchy-level-for | | not supported |
| SAP.hierarchy-parent-node-for | | not supported |
| SAP.hierarchy-parent-navigation-for | | not supported |
| SAP.hierarchy-drill-state-for | | not supported |
| SAP.hierarchy-node-descendant-count-for | | not supported |
| SAP.hierarchy-preorder-rank-for | | not supported |
| SAP.hierarchy-sibling-rank-for | | not supported |
| SAP.aggregation-role="dimension" | | not supported |
| SAP.aggregation-role="measure" | | not supported |
| SAP.aggregation-role="totaled-properties-list" | | not supported |
| SAP.planning-function | |  not supported |
| SAP.minoccursMinOccurs | | not supported |
| SAP.maxoccurs MaxOccurs | | not supported |
| SAP.parameter="mandatory"\|"optional" | |  not supported |
| SAP.attribute-for | | not supported |
| SAP.super-ordinate | | not supported |
