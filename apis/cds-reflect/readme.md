## cds.reflect

Provides core reflection for CDS models in CSN format.

### Local usage in a project

```
npm i @sap/cds-reflect
```


```js
const cds = require('@sap/cds-reflect')

// then use it as described in the above docs, e.g....
let model = cds.reflect ({
  namespace: 'foo.bar',
  definitions: {
    'foo.bar.Foo': {kind:'entity', elements:{
      bar: {type:'cds.Association', target:'foo.bar.Bar'}
    }},
    'foo.bar.Bar': {kind:'entity'},
  }
})
let { Foo, Bar } = m.exports
```
