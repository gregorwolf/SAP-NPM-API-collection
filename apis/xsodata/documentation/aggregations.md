OData Aggregations
==================

XS Classic SPS10
----------------

Documentation Chapter 7.1.6.7 p. 488

The results of aggregations on columns change dynamically depending on the grouping conditions. This means that aggregation cannot be performed in SQL views; it needs to be specified in the OData service definition itself. Depending on the type of object to expose, you need to explicitly specify the columns to aggregate and the function to use or derived them from metadata in the database.
In general, aggregations do not have consequences for the metadata document. It just effects the semantics of the concerning properties during runtime. The grouping condition for the aggregation contain all selected non-aggregated properties. Furthermore, aggregated columns cannot be used in $filter, and aggregation is only possible with generated keys.
p. 488

XSOData
-------

In xsodata two types of aggregations are supported, implicit or derived aggregations and explicit aggregations. Both aggregations have to be defined in the OData service definition in the *.xsodata* file.

### Explicit Aggregations

For explicit aggregations the aggregate columns have to be made explicit in the service definition:

```xsodata
service {
    "package::revenues" as "Revenues"
    keys generate local "ID"
    aggregates always (SUM of "Amount");
}
```

Supported aggregations are: **SUM**, **MIN**, **MAX**, **AVG**  
Supported db artifacts: **Tables**, **Views**  

### Implicit/derived Aggregations

Supported only for **CalculationView** db artifacts which define the aggregations intrinsic.

Assuming PLANNED_ACTUAL_SALES is a calculation view, the service definition would look like:

```xsodata
service {
    "package::PLANNED_ACTUAL_SALES " as "PlannedvsActualCalcView"
    keys generate local "ID"
    aggregates always
    parameters via entity "InputParams";
}
```
