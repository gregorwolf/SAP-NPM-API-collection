## cds.reflect

Provides core reflection for [CDS](https://cap.cloud.sap/docs/cds/) models in [CSN](https://cap.cloud.sap/docs/cds/csn) format.

### Common usage through [`@sap/cds`](../cds)


```js
const cds = require('@sap/cds')
// then use cds.linked as below...
```

### Direct usage in a project

```js
const cds = require('@sap/cds-reflect')
let csn = {
  namespace: 'foo.bar',
  definitions: {
    'foo.bar.Foo': {kind:'entity', elements:{
      bar: {type:'cds.Association', target:'foo.bar.Bar'}
    }},
    'foo.bar.Bar': {kind:'entity'},
  }
}
let m = cds.linked (csn)
let { Foo, Bar } = m.exports
console.log (Foo instanceof cds.entity ? 'Foo is an entity' : 'Foo is something else')
```

## Documentation

See the [API documentation](https://cap.cloud.sap/docs/node.js/api#cds-reflect) for more details.

## License

This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3.1.txt).

