# Authorization scopes in XSOData Service Definition
### Overview
As XSA provides the possibility to define coarse-grained authorization checks via scopes that are defined in the security configuration file (xs-security.json), the OData service provider is also enabled to use the defined authorization scopes in the XSOData service definition, in order to control access on different levels:

* Service-level
* EntitySet-level
* (CRUD) Operation-level

### Definition Rules
For the definition of scopes in the XSOData service definition, the following rules must be taken into account:  

1. It is possible to **not** define any scopes in the xsodata service definition file. Then no 
authorization process will be invoked, and all requests are allowed.
2. Once scopes are defined, scopes on Service-level for all CRUD operations **MUST** be provided
    a. Any missing operation-scope will lead to an xsodata-parse-error
    b. To restrict any of the operations, a scope with an “unused-value” is given
3. On EntitySet-level, scopes are inherited from the Service-level
4. On EntitySet-level, further scopes for any subset of CRUD operations could be given
    a. Then, for the corresponding entitySet, both scopes (from Service, and the extra from entitySet) must be validated. See below examples# 2, 3, 5.
5. scopes for a given operation request are checked independently from scopes of other operations.
6. On Service- and EntitySet-level, **ONLY ONE** scope can be set per operation
7. Even with defined scopes, the following requests are excluded from the authorization, and processed as allowed:
    a. $metadata
    b. Service document

### Syntax- An Example XSOData service definition
```
service {
   scopes (
      create ( "unused-scope" ),
      read ( "scope_R0" ),
      update ( "unused-scope" ),
      delete ( "scope_D0" )
   );
   
   entitySet E1 (
       navigates (
           ...
       )
   );

   entitySet E2 (
      navigates (
         ...
      )
      scopes ( 
        read ( "scope_R2" ), 
        delete ("scope_D2" )
      )
   );

   entitySet E3 (
      scopes ( 
         read ( "scope_R3" )
      )
   );
}

```

### The special case of $links:
For $links requests like `service.xsodata/entitySet1(key)/$links/navProp`, there are 2 entity sets, one of them (named ‘target’) is to update its foreign key with the key that is read from the other entity set (named ‘source’). 
Therefore, the target must have scopes for the corresponding operation (Create, Update, Delete), and the source must have read scopes. These scopes are inherited from service-level, and (as before) can be extended at the entitySet-level.

### Debug View
The debug view is callable, if the request has the parameter `sap-ds-debug = json | html`. The debug view is protected by default (as long as the authorization process in invoked by given scopes), unless a certain corresponding scope is defined on the service-level and this scope passes the secrity check.
The debug scope looks similar to the scopes of other operations, except that it is optionally defined:

```
service {
   scopes (
     ...
     debug ( "scope_name" )
   );
   
   ...
}

```

### Example Requests:

| Nr. | Request                 | Expected scopes from user         |
|-----|-------------------------|-----------------------------------|
| 1   | Read on E1	            | R0                                |
| 2   |	Read on E2	            | R0, R2                            |
| 3   |	Read on E3	            | R0, R3                            |
| 4   |	Delete on E1	        | D0                                |
| 5   |	Delete on E2	        | D0, D2                            |
| 6   |	Delete on E3	        | D0                                |
| 7   |	Create on any entitySet	| Request denied on Service-level   |
| 8   |	Update on any entitySet	| Request denied on Service-level   |
| 9   |	Read on E1/$links/E3	| R0, R3                            |
| 10  |	Delete on E2/$links/E3	| D2, R0, R3                        |
