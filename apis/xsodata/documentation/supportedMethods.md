Allowed HTTP Methods
====================

| URL                               | GET | POST | PUT | DELETE |  
|-----------------------------------|-----|------|-----|--------|
| Metadata Document                 |     | :x:  | :x: | :x:    |
| Service Document                  |     | :x:  | :x: | :x:    |
| Batch Requests                    | :x: |      | :x: | :x:    |
| Generated Key Entity Set          |     | :x:  | :x: | :x:    |
| Generated Key Single Entity       | :x: | :x:  | :x: | :x:    |
| Regular Entity Set                |     |      | :x: | :x:    |
| Regular Single Entity             |     | :x:  |     |        |
| Regular Property                  |     | :x:  |     | :x:    |
| $value                            |     |      | :x: | :x:    |
| Indirect Entity Sets              |     | :x:  | :x: | :x:    |

 
Modification Forbidden
======================

Each modifying method can also be explicitly forbidden for an entity type in the service configuration.
 
```xsodata
"xsodata.test.tables::all_types_modify" as "all_types_modify_forbidden"
    create forbidden
    update forbidden
    delete forbidden;
```
