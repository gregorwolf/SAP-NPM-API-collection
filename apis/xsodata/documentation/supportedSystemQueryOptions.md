URI Checks
==========

General System Query Options
----------------------------

The xsodata library supports the following URI-types (the URI type value is written into the xsodata log file on debug level):

| Uri Type | URI Pattern                                                                                           |
|----------|-------------------------------------------------------------------------------------------------------|
| URI0     | scheme serviceRoot                                                                                    |
| URI1     | scheme serviceRoot "/" entitySet                                                                      |
| URI2     | scheme serviceRoot "/" entitySet "(" keyPredicate ")"                                                 |
| URI51    | scheme serviceRoot "/" entitySet "(" keyPredicate ")/" entityProperty                                 |
| URI52    | scheme serviceRoot "/" entitySet "(" keyPredicate ")/" entityProperty $value                          |
| URI61    | scheme serviceRoot "/" entitySet "(" keyPredicate ")/" entityNavProperty                              |
| URI62    | scheme serviceRoot "/" entitySet "(" keyPredicate ")/" collectionNavProperty                          |
| URI71    | scheme serviceRoot "/" entitySet "(" keyPredicate ")/$links/" entityNavProperty                       |
| URI72    | scheme serviceRoot "/" entitySet "(" keyPredicate ")/$links/" collectionNavProperty                   |
| URI8     | scheme serviceRoot "/$metadata"                                                                       |
| URI9     | scheme serviceRoot "/$batch"                                                                          |
| URI15    | scheme serviceRoot "/" entitySet /$count                                                              |
| URI16    | scheme serviceRoot "/" entitySet "(" keyPredicate ")" /$count                                         |

Dependent on the requested resource (e.g. an EntitySet or an Entity) different sets of System Query Options (SQO) are allowed.
The check for allowed SQO is depending on the URI type and is done in [checkSystemQueryOptions.js](/lib/uri/checks/checkSystemQueryOptions.js).


The URI types and their allowed SQO are listed in the following table:

| Uri Type | $expand            | $filter            | $format            | $orderby           | $skip              | $top               | $skiptoken         | $inlinecount       | $select            |
|----------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| URI0     |                    |                    | :white_check_mark: |                    |                    |                    |                    |                    |                    |
| URI1     | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |                    | :white_check_mark: | :white_check_mark: |
| URI2     | :white_check_mark: | :white_check_mark: | :white_check_mark: |                    |                    |                    |                    |                    | :white_check_mark: |
| URI51    |                    |                    | :white_check_mark: |                    |                    |                    |                    |                    |                    |
| URI52    |                    |                    |                    |                    |                    |                    |                    |                    |                    |
| URI61    | :white_check_mark: |                    | :white_check_mark: |                    |                    |                    |                    |                    | :white_check_mark: |
| URI62    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |                    | :white_check_mark: | :white_check_mark: |
| URI71    |                    | :white_check_mark: | :white_check_mark: |                    |                    |                    |                    |                    |                    |
| URI72    |                    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |                    | :white_check_mark: |                    |
| URI8     |                    |                    | :white_check_mark: |                    |                    |                    |                    |                    |                    |
| URI9     |                    |                    |                    |                    |                    |                    |                    |                    |                    |
| URI15    |                    | :white_check_mark: |                    |                    |                    |                    |                    |                    |                    |
| URI16    |                    | :white_check_mark: |                    |                    |                    |                    |                    |                    |                    |

#### Remarks:

- The $format option allows only value "json" (the default); except on $metadata requests, where only "xml" (the default) is allowed
- URI Type 2 supports $filter according to OData 2.0 specification, but in contrast to XS Classic
- URI Types not listed here, but listed in the OData 2.0 specification, are not supported
- URI Type 8 allows $format to stay compatible with XS Classic
- $skiptoken is not supported on all URI types in accordance with XS Classic, return 501 '$skiptoken is not supported'

$filter, $orderby not allowed for Generated Key Columns
-------------------------------------------------------

*$filter* and *$orderby* are not allowed to contain generated key columns. The server will
return `400 Bad Request - $filter/$orderby is not allowed for generated key columns.`

**Sample**:
```
/all_types_view_genkey?$format=json&$filter=GenID eq 1
```

$filter not allowed for Aggregated Columns
-------------------------------------------

*$filter* is not allowed to contain generated key columns. The server will
return `400 Bad Request - $filter is not allowed for generated key columns.`

**Sample**:
```
/ExpAggregationSumAmountFactor?$format=json&$select=Amount,Year&$orderby=Amount&$filter=Amount gt 100
```
