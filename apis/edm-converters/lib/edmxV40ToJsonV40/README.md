## OData V4 EDM model (XML Format) to OData V4 EDM (JSON Format) converter

## Features

The MetadataConverter converts Odata 4.0 XML-CSDL-Metadata documents into Odata 4.0 JSON-CSDL-Metadata format.
This converter is able to 
- Convert all type artifacts (EntityTypes, ComplexTypes, TypeDefinitions, Enumerations, etc...)
- convert all data artifacts (EntitySet, Singelton, etc...)
- convert Functions, BoundFunctions, Actions, BoundActions
- convert and resolve internal and external annotations with all expressions
- resolve external Types defined in external documents
- determine default value types and convert the value type specific
- detect deferred types and values ​​if they are available at a later point
- provide an API to resolve external documents
- provide an API to convert arbitrary abstract syntax tree node into expected structure
- provide a flexible API to enhance/exchange functionality
- lookup and assert XML namespaces to exclude non-Odata nodes
- provide an appropriate error handling
- report missing namespaces in std out. Grep for regex '$ERROR - MISSING: (.*)' in stdout.

## Usage

### Via command line interface

Please use the following call to get help:

```convert_edm edmxV40ToJsonV40 --help```

### Via api

### Create a simple Converter instance using the MetadataConverterFactory

A simple Converter instance can be created using the following code.
A simple converter instance is not able to:
- resolve external artifacts or referenced documents
- resolve annotations without expressions where the corresponding term is in an external document

Example:

```js
const converters = require('@sap/edm-converters');

// read source xml
const inputBuffer = loadSourceDocument; // from file, service or database

// create converter
const v4Conv = converters.MetadataConverterFactory.createEdmxV40ToJsonV40();

// Convert the xml document to the corresponding json csdl object.

v4Conv.execute(inputBuffer, (error, json, missingReferencedDocuments) => {
    // process error / result
    console.log(json);
     
     // If there are any missing dependend documents the parameter
    // 'missingReferencedDocuments' is an array with following content:
    // [
    //     {
    //         namespace: 'The.namespace.of.the.missing.document',
    //         uri:'http://uri.defined.in.$Reference.in.metadata.document/$metadata'
    //     }
    // ]
});
```

### Create a Converter instance with additional features

To interpret more complex metadata xml documents (with referenced documents, annotations without
expressions, etc.) you have to provide a second parameter with additional options.
Every option is optional and can be omitted.

```js
const converters = require('@sap/edm-converters');

// read source xml
const inputBuffer = loadSourceDocument; // from file, service or database

const options = {
    // Resolve external/depended metadata documents.
    // This factory is called when a type artifact is needed which does not exist
    // in the current interpreted document. This method can be called more than once
    // and depends on the dependency structure of the source document.

    // Param: 'namespace'
    // The 'namespace' parameter is a String representing the namespace
    // of the missing type.
    // I.e: 'com.any.namespace' for missing type 'com.any.namespace.AnyArtifactType'.
    
    // Param: callback
    // The callback has to be called with the AST representation or the xml string of the
    // external document. The callback has the signature: callback(error, result).
    metadataFactory: (namespace, uri, callback) => {
        readExternalMetadataXmlSomwHow(typeFqn, (error, metadataXml) => {
            const metadataAst = MetadataConverterFactory.createAbstractSyntaxTree(metadataXml);

            // Or direct
            // callback(error, metadataXml);
        });
    },

    // Optional, can be omitted.
    logger: { path() { }, info() { }, warn() { }, debug() { } }, 

    // Optional, if the 'MetadataConverterFactory.createAbstractSyntaxTree(xmlString)' is used.
    nodeBuilder: (element) => return element;

    // Optional, The converter does not parse ignoring nodes (must be prefixed with the corresponding odata xml namespace)
    ignore: ['http://docs.oasis-open.org/odata/ns/edm:Annotation'],

    // Optional, If you provide your own abstract syntax tree factory, you can provide here.
    // If no factory is provided, a default implementation is used.
    astFactory: (metadataString) => {
        return MetadataConverterFactory.createAbstractSyntaxTree(metadataString);
    },

    // Optional, The converter produces the default oasis csdl json spec format.
    // If the target option is set to 'library' the converter produces the okra lib
    // custom format. See section 'Okra lib custom csdl format'.
    target: 'library'
}

// create converter
const v4Conv = converters.MetadataConverterFactory.createEdmxV40ToJsonV40(options);
v4Conv.execute(inputBuffer, (error, json) => {
        // process error / result
        console.log(json);
    });

```

#### Using the node builder factory

To use any kind of an AST you have to provide a node builder factory. The implementation
of the converter expects the following structure of each and every node inside the 
AST (including the root node):

```js
{
    // The node name like 'Annotation' for <Annotation>...</Annotation> nodes.
    // The name property MUST be a string and MUST not be null.
    name: 'The name of the element node without <>',

    // If the node is a text node and does not have a child elements.
    text: 'A possible text value of this node',

    // Attributes of a node like '<Annotation Term="AnyTerm" AnotherAttribute="...">...<Annotation>'.
    // The attributes property MUST be an object and MUST not be null.
    attributes: {

        // Attribute key-value pairs including namespaces like xmlns="A.namespace".
        Term: 'A Term full qualified name value',
        AnotherAttribute: '...',
    },

    // Child elements with containing nodes. The elements property MUST be an array and
    // MUST not be null.
    elements: [
        { name: '...', attributes: {...}, elements: [...] },
        ...
    ]
}
```

Here is an example how a Browser DOM can be used to structure each AST node element:

```js
{
    nodeBuilder: (element) => {
        const node = {
            elements: [],
            name: element.nodeName,
            attributes: {}
        };

        if (element.attributes) {
            Array.from(element.attributes).forEach((attribute) => {
                node.attributes[attribute.nodeName] = attribute.nodeValue;
            })
        }

        element.childNodes.forEach((childNode) => {
            if (childNode.nodeName === '#text') {
                childNode.text = childNode.nodeValue;
            }
            node.elements.push(childNode);
        });

        return node;
    }
}
```

## Library Oasis CSDL Json 4.01 CS01/CS02 format
The Metadata V4 Converter can produce Oasis CSDL Json 4.01-CS01 and 4.01-CS02 Format.
Default output format is the Oasis 4.01-CS02 format.

Here are the differencies:

### Constant Expressions
 
#### $Binary
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Binary": "T0RhdGE"
}
 
// After OASIS issue 1221  (CS02):
"@namespace.Term": "T0RhdGE"
```
 
#### $Boolean
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": true
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": true
 ```
 
#### $Date
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Date": "2000-01-01"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "2000-01-01"
 ```
 
#### $DateTimeOffset
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$DateTimeOffset": "2000-01-01T16:00:00.000Z"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "2000-01-01T16:00:00.000Z"
```
 
#### $Decimal
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Decimal": "13.14"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "13.14"
```

#### $Duration
```js
// Before OASIS issue 1221  (CS01):
"@namespace.Term": {
    "$Duration": "P7D"
}
 
// After OASIS issue 1221  (CS02):
"@namespace.Term": "P7D"
```
 
#### $EnumMember
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$EnumMember": "A1,A2",
    "$EnumMember@odata.type":"#namespace.Type"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "A1,A2"
```
 
#### $Float
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Float": 3.14
}
// or  (CS01)
"@namespace.Term": 3.14
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": 3.14
```
 
#### $Guid
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Guid": "21EC2020-3AEA-1069-A2DD-08002B30309D"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "21EC2020-3AEA-1069-A2DD-08002B30309D"
```
 
#### $Int
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Int": 42
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": 42
```
 
#### “String”
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": "Any string"
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "Any string"
```
 
#### $TimeOfDay
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$TimeOfDay": "21:45:00"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "21:45:00"
```
 
 
### Dynamic Expressions
 
#### $AnnotationPath
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$AnnotationPath": "Supplier/@Communication.Contact"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "Supplier/@Communication.Contact"
```
 
#### $ModelElementPath
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$ModelElementPath": "/org.example.someAction"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "/org.example.someAction"
```
 
#### $NavigationPropertyPath
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$NavigationPropertyPath": "Supplier"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "Supplier"
```
 
#### $PropertyPath
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$PropertyPath": "ChangedAt"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": "ChangedAt"
```
 
#### $Path
```js
// Before OASIS issue 1221 (CS01):
"@namespace.Term": {
    "$Path": "FirstName"
}
 
// After OASIS issue 1221 (CS02):
"@namespace.Term": {
    "$Path": "FirstName"
}
```
