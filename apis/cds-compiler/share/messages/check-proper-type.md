# check-proper-type

A type artifact does not have proper type information.

The message's severity is `Info` but may be raised to `Error` in the SQL, HANA
and OData backends.  These backends require types to have type information.
Otherwise they are not able to render elements that use this type (e.g. to SQL
columns).

This message affects CSN input and should not appear if CDL input is used.

## Example

Erroneous code example

```json
{
  "definitions": {
    "MainType": {
      "kind": "type"
    }
  }
}
```

`MainType` is of kind "type" but has not further type information.

## Fix

To fix the issue, add explicit type information to `MainType`, e.g. add an
 `elements` property to make a structured type.

```json
{
  "definitions": {
    "MainType": {
      "kind": "type",
      "elements": {
        "id": {
          "type": "cds.String"
        }
      }
    }
  }
}
```

## Related messages

- `check-proper-type-of`
