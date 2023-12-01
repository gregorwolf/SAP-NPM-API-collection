Releases and bug fixes
======================

* [Release overview](./releaseOverview.md)

Limitations
===========

* [Limitations](./limitations.md)

Samples
=======

* [xsodata code samples without xsjs](./code_samples_pure_node/readme.md)
* [Calcview](./calcviewSample.md)
 
Documentation
=============

* [HANA database connector](./db.md)
* [Aggregations](./aggregations.md)
* [Custom Exits](./customExits.md)
* [Debug View](./debugView.md)
* [Generated Keys](./generatedKeys.md)
* [List of supported HTTP methods](./supportedMethods.md)
* [List of allowed system query options](./supportedSystemQueryOptions.md)
* [Modes](./modes.md)
* [Settings](xsodataSettings.md)
* [Typemapping HANA<->OData](./typemapping.md)
* [xsodata file definition XS classic](./xsodataEbnf.md)
* [xsodata file definition XS advanced extentions](xsodataSettings.md)

Features per HANA DB Artifact
=============================

### Table

Supports the following Features:
- [Explicit Aggregations](./aggregations.md#explicit-aggregations)
- [Generated Local Key](./generatedKeys.md)
 
Supported Http Verbs:
- GET, PUT, POST, DELETE

### SQL View

Supports the following Features:
- [Explicit Aggregations](./aggregations.md#explicit-aggregations)
- [Generated Local Key](./generatedKeys.md)

Supported Http Verbs:
- GET

### XS Advanced Calculation View

Supports the following Features:
- [Implicit Aggregations](./aggregations.md#implicitderived-aggregations)
- [Generated Local Key](./generatedKeys.md)

Supported Http Verbs:
- GET

Supported "hints" setting in xsodata file definition to provide custom hints for SQL-select:
- By default some SQL statements are executed with hint "NO_CALC_VIEW_UNFOLDING." This is to avoid backward compatibility issues.
However, since NO_CALC_VIEW_UNFOLDING prohibits some calcview optimisations this hint can be disabled or overwritten.
For more detail about hints please see [Settings](xsodataSettings.md)

Samples:
 * Disable all hints (replaces the hints list with an empty list)
   ```xsodata
     settings {
       hints null;
     }
   ```

* Custom hints
   ```xsodata
     settings {
       hints "NO_CALC_VIEW_UNFOLDING","<another hint>" ;
     }
   ```
   

