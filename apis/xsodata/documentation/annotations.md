# SAP OData Annotations

## Overview
The second version of the OData protocol allows usage of annotations in the $metadata document. The purpose of the
annotations is to add a documentation or/and hints to the EDM elements. The added information can be used by the service
clients (e.g. SAPUI5 application) to better represent the service entities. The annotations are divided into annotation
elements and annotation attributes, represented as XML elements and XML attributes respectively.

The OData protocol defines the concept of the annotations without adding any concrency concerning the particular names
and values, which can / should be used for them. SAP defines its own specific set of annotations documented at
https://scn.sap.com/docs/DOC-44986. Only some of them are supported in XSOData XS2.

By default, the annotations will not be serialized in the $metadata document of an XSOData service. In order to enable
the annotations for a particular XSOData service, the following configuration has to be specified in the .xsodata file:

```
annotations {
    enable OData4SAP;
}
```

The configuration has to be specified right after the service element, for example:

```
service ... {
    ...
}
annotations {
   enable OData4SAP;
}
```

If the annotations are enabled for an XSOData service, the following XML namespace will be added for the Edmx element
of the $metadata document:

```
xmlns:sap="http://www.sap.com/Protocols/SAPData"
```

The sections below describe the annotations (annotation attributes), which are supported by the XSOData XS2. Only the
values, which are mentioned in the sections below, are supported for the annotations. Mostly only subset of all the
possible annotation values is supported. Each section describes the annotations, which are supported for a particular
EDM element. For each of the annotations a default value is defined according to https://scn.sap.com/docs/DOC-44986.
An annotation is added to the $metadata document only if its value differs from the default one.

## Entity Set Annotations

### sap:addressable

**Description**

Indicates, whether direct access to the entity set is supported.

**Default value**

"true"

**Supported values (other than the default value)**

"false": if the entity set represents either a calculation view or input parameters for a calculation view

### sap:creatable

**Description**

Indicates, whether new entities can be created in this entity set

**Default value**

"true"

**Supported values (other than the default value)**

"false" in one of the following cases:
* "create forbidden" setting is defined for the entity set in .xsodata file
* entity set represents a database view (e.g. table or calculation view)
* entity set represents input parameters for a calculation view
* aggregation is defined for the entity set using "aggregates" expression in .xsodata file

### sap:updatable

**Description**

Indicates, whether entities in this entity set can be updated

**Default value**

"true"

**Supported values (other than the default value)**

"false" in one of the following cases:
* "update forbidden" setting is defined for the entity set in .xsodata file
* entity set represents a database view (e.g. table or calculation view)
* entity set represents input parameters for a calculation view
* aggregation is defined for the entity set using "aggregates" expression in .xsodata file
* generated key is defined for the entity set


### sap:deletable

**Description**

Indicates, whether entities can be deleted from this entity set

**Default value**

"true"

**Supported values (other than the default value)**

"false" in one of the following cases:
* "delete forbidden" setting is defined for the entity set in .xsodata file
* entity set represents a database view (e.g. table or calculation view)
* entity set represents input parameters for a calculation view
* aggregation is defined for the entity set using "aggregates" expression in .xsodata file
* generated key is defined for the entity set

## Entity Type Annotations

### sap:semantics

**Description**

Semantic of the entity type

**Default value**

undefined

**Supported values (other than the default value)**

"aggregate" value in one of the following cases:
* aggregation is defined for the entity set of the entity type using "aggregates" expression in .xsodata file
* entity type represents a calculation view, which has a measure attribute

"parameters" value if the entity type represents input parameters for a calculation view

## Annotations for entity type properties

### sap:semantics

**Description**

Semantic of the property

**Default value**

undefined

**Supported values (other than the default value)**

The annotation is added only for the properties representing calculated attributes or input parameters of a
calculation view. The annotation value corresponds to the semantic type of a calculated attribute or an input
parameter.

Semantic type of an input parameter is specified as a value of "type" attribute of "valueDomain" element, defined in
.hdbcalculationview file. For example:

```xml
<variable id="parameterID" parameter="true">
    <variableProperties datatype="VARCHAR" mandatory="true">
        <valueDomain type="Currency"/>
        ...
    </variableProperties>
</variable>
```

Semantic type of a calculated attribute is specified as a value of "semanticType" attribute of "calculatedAttribute"
element, defined in .hdbcalculationview file. For example:

```xml
<calculatedAttribute id="attributeID" semanticType="currencyCode">
    ...
</calculatedAttribute>
```

The following table shows the mapping from the semantic type values of calculated attributes and input parameters to the
values of sap:semantics annotation:

| Calculated attribute semantic type | Input parameter semantic type | sap:semantics value |
|------------------------------------|-------------------------------|---------------------|
| currencyCode                       | Currency                      | currency-code       |
| unitOfMeasure                      | UnitOfMeasure                 | unit-of-measure     |
| date.businessDateFrom              | -                             | dtstart             |
| date.businessDateTo                | -                             | dtend               |

Only the values from the table are supported.

### sap:parameter

**Description**

A property is annotated with this annotation, if it represents a parameter.

**Default value** 

undefined

**Supported values (other than the default value)**

The annotation is added only to the properties representing input parameters of a calculation view. The annotation value
corresponds to the value of "mandatory" attribute in the input parameter definition, defined in .hdbcalculationview file.

```xml
<variable id="inputParameterId" parameter="true">
	<variableProperties datatype="INTEGER" mandatory="true">
</variable>
```

Mapping of "mandatory" attribute values to the values of sap:parameter annotation:

"mandatory" attribute value | sap:parameter value
--------------------------- | -------------------
true                        | mandatory
false                       | optional


### sap:label

**Description**

A short, human-readable text suitable for labels and captions in UIs

**Default value**

undefined

**Supported values (other than the default value)**

The annotation is added only for the properties representing calculated attributes or input parameters of a
calculation view. The annotation value corresponds to the "defaultDescription" attribute in the definition of an input
parameter or a calculated attribute in .hdbcalculationview file.

```xml
<variable id="inputParameterId" parameter="true">
	<descriptions defaultDescription="Input parameter label"/>
</variable>

<calculatedAttribute id="calcAttributeId">
	<descriptions defaultDescription="Calculated attribute label"/>
</calculatedAttribute>
```

### sap:filterable

**Description**

Indicates, whether the property can be used in $filter system query option.

**Default value** 

"true"

**Supported values (other than the default value)**

The annotation is added with the "false" value if the property satisfies one of the following conditions:
* The property represents a generated key
* The property represents a measure attribute of a calculation view
* The property is used in the aggregation, defined as the "aggregates" expression in .xsodata file


### sap:display-format

**Description**

Format, which can be used to display the property

**Default value** 

undefined

**Supported values (other than the default value)**


"Date" value, if SQL DATE type is used for the property on the database side.


### sap:aggregation-role

**Description**

Aggregation role of the property

**Default value** 

undefined

**Supported values (other than the default value)**

"measure" value, if the property represents a measure attribute of a calculation view or is used in the aggregation,
defined as the "aggregates" expression in .xsodata file

### sap:unit

**Description**

Name of a property in the context of the entity type containing the currency code or unit of measure for a numeric value of the current property.

**Default value** 

undefined

**Supported values (other than the default value)**

The annotation is added only for the properties representing calculated attributes of a calculation view. The annotation
value corresponds to the value of "attributeName" attribute of "unitCurrencyAttribute" element of the calculated attribute
definition in .hdbcalculationview file.

```xml
<calculatedAttribute id="attributeId">
	<unitCurrencyAttribute attributeName="currencyCodeAttribute"/>
</calculatedAttribute>
```

For the aforementioned example the annotation value will be "currencyCodeAttribute".

### sap:filter-restriction

**Description**

Describes filter restriction for the property, if the one exists.

**Default value** 

undefined

**Supported values (other than the default value)**

The annotation is added only for the properties representing input parameters of a calculation view. The annotation
value corresponds to the values of "multiLine" and "type" attributes of "selection" element of the input parameter
definition in .hdbcalculationview file.

```xml
<variable id="parameterId" parameter="true">
	<variableProperties datatype="INTEGER">
		<selection multiLine="false" type="SingleValue"/>
	</variableProperties>
</variable>
```

The table below shows the mapping from "multiLine" and "type" attribute values to the value of sap:filter-restriction
annotation.

multiLine | type        | sap:filter-restriction
--------- | ----------- | ---------------------- 
false     | SingleValue | single-value
true      | SingleValue | multi-value
false     | Interval    | interval

Only the values from the table are supported.


## Navigation Property Annotations

### sap:creatable

**Description**

Indicates, whether new related entities can be created.

**Default value** 

"true"

**Supported values (other than the default value)**

The annotation value is always "false" because neither "deep insert" (i.e. POST request payload having data for the both,
parent and related entity) nor POST request for .../EntitySet(key)/navPropertyName URL is supported in XSOData XS2.


### sap:filterable

**Description**

Indicates, whether navigation property can be used in $filter system query option.

**Default value**

"true"

**Supported values (other than the default value)**

The annotation value is always "false" because navigation properties cannot be used in $filter system query option in
XSOData XS2.

## Association Set Annotations

### sap:creatable / sap:updatable / sap:deletable

**Description**

Indicates, whether relations, represented by the association set, can be created / updated / deleted.

**Default value** 

"true"

**Supported values (other than the default value)**

"false": if the association set connects entity sets for calculation view results and calculation view input parameters.
