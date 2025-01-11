# Do not use private methods. (_no-private-methods_)

## Rule Details

Developers who are developing features in SAP Web IDE should not use private methods. According to the convention in JavaScript, these private methods usually start with an underscore (\_); therefore it is recommended **not** to use methods whose names begin with underscores.

```js
this.context.service.myService.myMethod();
```

When private methods use expressions such as the above example, the _no-private-methods_ rule displays an alert.

Example of **correct** code for this rule:

```js
this.context.service.log.info();
```

Example of **incorrect** code for this rule:

```js
this.context.service.log._info();
```
