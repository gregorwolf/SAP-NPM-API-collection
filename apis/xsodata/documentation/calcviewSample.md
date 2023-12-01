Sample for calculation views
============================

### Exposition of calculation view PlannedvsActualCalcView in an xsodata file:

```xsodata
service  {
    "package::PLANNED_ACTUAL_SALES " as "PlannedvsActualCalcView"
    keys generate local "ID"
    aggregates always
    parameters via entity "InputParams";
}
```

### Sample URL

http://server:port/copaxs/odata/PlannedvsActualCalcView.xsodata/InputParams(ip_discount=’.20’,ip_region=’NW’)/Results?$select=salesorg,material,anetrevn&$filter=startswith(material,'DPC')&$format=json
