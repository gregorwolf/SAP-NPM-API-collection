
XSOData Settings section
========================

The settings section can be added at the end of an xsodata file.

Example:
```
service namespace "XSODATA_TEST" {
	"xsodata.test.tables::massdata_a_key" as "a_key";
}

settings {
    support null;
    content cache-control "no-store";
    metadata cache-control "max-age=86401,must-revalidate";
    hints
        NO_CALC_VIEW_UNFOLDING;
    limits
        max_records = 10,
        max_expanded_records = 30;


}
```

### support null;

Allows the null value for properties.
E.g. 'support null;'

### content cache-control setting

Sets the header value to be used for the "cache-control" in data responses.
E.g. 'content cache-control "no-store";'

### metadata cache-control setting

Sets the header value to be used for the "cache-control" in the metadata response.
E.g. 'metadata cache-control "max-age=86401,must-revalidate";'

### hints

Allows setting hints for SQL select statements. When using hints please be aware
that setting a wrong hint may result in wrong data results. When removing the (default) NO_CALC_VIEW_UNFOLDING
hint explicitly (e.g. to improve performance), please check the results of your calculation views for correctness.

If hints is not set, only the hint "NO_CALC_VIEW_UNFOLDING" is added to the sql select statements
This is the default behaviour and required due to backward compatibility.
E.g. SQL: <code>select * from <table_name> with hint (NO_CALC_VIEW_UNFOLDING)</code>.

If hints is set, either to 'hint null' or another value e.g. 'hint ABC' then 'NO_CALC_VIEW_UNFOLDING'
will NOT added to the SQL select statement automatically. Instead in the values behind 'ABC' (e.g. SQL: <code>select * from <table_name> with hint (ABC)</code>)
will be added or, if 'null' is used, no hint statement is added to the select statement. Of course the hint NO_CALC_VIEW_UNFOLDING can be added manually.

Multiple hints can be added with a separating comma.
E.g.
'hints NO_CALC_VIEW_UNFOLDING ABC'
will result in SQL: select * from <table> with hint (NO_CALC_VIEW_UNFOLDING, ABC)"

### limit

Allows to restrict the amount ob entities loaded from the database and other internal buffers. Use this settings if
you experience memory shortages and to keep the response size small.

Use '**max_body_size**' to set the maximum allowed body size in bytes of an incoming odata http request. Exceeding the limit result in an
413 "request entity too large error" status code which is send back to the client. Default value is "10mb"
E.g.
limits max_body_size = 5mb;

Use '**max_records**' to restrict the number of entities addressed by the resource path.
If there are more records selected than allowed with max_records then an error (400 Bad request)
it send to the client. In order to avoid this, the client can use
$top and $skip to select less than 'max_records' entities.
E.g.
limits max_records = 100;

**IMPORTANT:** The default value for max_records is 1000, please check if this value is suitable for your application.
If not please add the setting to the applications xsodata file.

 Use **max_expanded_records** to restrict the number of entries of a single expanded
navigation property. If there are more records selected than allowed with max_expanded_records
then an error (400 Bad request) it send to the client. With OData V2 its not possible
to apply $top or $skip on a expanded navigation property. So by itself the client
can not avoid this error alone solely for the expanded navigation property.
However, if a feed is returned then reducing the entries in the feed
with $top and $skip or $filter) may help reducing also the number of entries collected with
expanded navigation properties. Expanded record are counted per navigation property and level,
so if set to 100, there may be 1 root entity with 100 expanded items or (e.g.) 2 root entities with each 25 and 75
expanded items.

E.g.
limits max_expanded_records = 100;

**IMPORTANT:** The default value for max_expanded_records is 10000, please check if this value is suitable for your application.
If not please add the setting to the applications xsodata file.

