# @sap/eslint-plugin-cds [latest]

## Rule: no-entity-moo
<span class='label shifted'>Model Validation</span>

### Rule Details
Demonstrates how to implement a model validation check. This check does not allow any entities named 'Moo'.

             ________________________
            < No entity Moo allowed! >
             ------------------------
                    \   ^__^
                     \  (oo)\_______
                        (__)\       )\/\
                            ||----w |
                            ||     ||

### Examples
<span>:heavy_check_mark:&nbsp;&nbsp; Example of <font style="color:green">correct</font> code for this rule:</span>

```
namespace my.bookshop;
entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}
```

<span>:x:&nbsp;&nbsp; Example of <font style="color:red">incorrect</font> code for this rule:</span>

```
namespace my.bookshop;
entity Moo {
  key ID : Integer;
}
```

### Version
This rule was introduced in `@sap/eslint-plugin-cds 1.0.0`.



### Resources
[Rule & Documentation source](..\rules\no-entity-moo.js)



---

