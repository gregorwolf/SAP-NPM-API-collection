# AttributeName API
The AttributeName is used as variable type for storing unknown and ignore values in the Attributes Class.<br/>
For example when the function `Attributes.addUnknowns(["$app","country"])` is called, it stores the information as an AttributeName internally.<br/>
Alternatively one can also do `Attributes.addUnknowns(Attributes.fromArray(["$app","country"]))`.
Whenever possible it's best to use build in constants for unknowns and ignores, e.g.:
`Attributes.addUnknowns(AttributeName.common.APP, AttributeName.common.ENV)`

## common

Holds a dictionary of commonly used AttributeNames, namely:
```javascript
{
	// APP section
	APP,
	// ENV section
	ENV,
	ENV_USER,
	ENV_USER_USER_UUID,
	ENV_USER_EMAIL,
	ENV_USER_GROUPS,
	// DCL section
	DCL,
	DCL_ACTION,
	DCL_RESOURCE,
	DCL_TENANT,
	DCL_POLICIES,
	DCL_SCOPE_FILTER,
	DCL_PRINCIPAL_TO_POLICIES
}
```
If for example the App Section should be set as unknown value one can do:
```javascript
const attr = new Attributes().setUnknowns(AttributeName.common.APP);
```

## fromArray

Creates an AttributeName from array:
```javascript
const attrName = AttributeName.fromArray(["$app", "auth", "created"]);
```

## fromString

Creates an AttributeName from string:
```javascript
const attrName = AttributeName.fromString("$app.auth.created");
```
However there are some characters that have to be escaped by quoting, e.g. segments containing the dot character '.':
```javascript
const attrName = AttributeName.fromString('"abc.created".by')
```
If a segment must contain a single double quote it hast to be escaped with a backslash:
```javascript
const attrName = AttributeName.fromString('"abc.crea\\"ted".by')
```
This would give result in the two segments 'abc.crea"ted' and 'by'.

## getFirstSegment

* returns the segment at index zero

## getSegments

* returns the segment at index zero

## getSegment

* `index` ... index of the segment starting at 0 
* returns the segment at index

## isEmpty

* checks if the AttributeName is empty

## size

* returns the number of segments

## add

* `segment` ... the content of the new segment
* returns the AttributeName

## set

* `segments` ... the array to set all segments of the AttributeName
* returns the AttributeName

## toString

* returns the segments concatenated as one string separated with a dot
If the segment already contained the character '.' it will be surrounded with double quotes

## isAttributeName

* `obj` ... checks if the object is of type AttributeName

## toOpaInputName

* returns the AttributeName as encoded string to be compliant with the custom OPA. The main functionality is to escape special characters. This function is mainly for internal usage.