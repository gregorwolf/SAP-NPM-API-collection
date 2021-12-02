# How to add a jest test on templating

## Goals
We want unit tests on templating to be:

- readable and explicit when they fail
- precise: someone changing another feature then the one you are testing shouldn't break your test
- independent: modifying one test and its test data shouldn't impact another test

## Main paradigm
In each test module you want to register the macros the Jest Test should expand at templating. (Otherwise you would get some
`<macro:nonRegisteredMacro context="{bindingcontext}"/>` in the output of the templating).

You should register the macros in the test set up using something like `beforAll` and unregister them in
the test teardown with something like `afterAll`.

```js
import {registerMacro, unregisterMacro} from "sap/fe/test/JestTemplatingHelper";
import FieldMetadata from "sap/fe/macros/internal/Field.metadata";

describe("MacroField", () => {
    beforeAll(() => {
        registerMacro(FieldMetadata);
        // you could also register more macros here
    });
    afterAll(() => {
        unregisterMacro(FieldMetadata);
        // you should unregister any other macros register in the beforeAll
    });
    //...
});
```

Each templating test should:

- declare:
    - its xml input to template
    - declare its main model in a cds file. To use the jestTemplatingHelper this cds **must use** the namespace `namespace sap.fe.test;`
     and declare a service`service JestService`
    - its templating options: the current binding contexts and models to be used
- retrieve the result of the templating
- perform a snapshot test on the generated XML. Doing so ensure tests are easy to write and to understand when failing

```js
const sMetadataUrl = compileCDS(path.join(__dirname, "./data/testMetadata.cds"));
const mBindingContexts = {
    "entitySet": "/Items"
};
it("Simple DataField on a string property ", async () => {
    const xmlField = `<internalMacro:Field xmlns:internalMacro="sap.fe.macros.internal"
                            entitySet="{entitySet>}"
                            dataField="@com.sap.vocabularies.UI.v1.LineItem/1"
                            />`;
    const templatedXML = await getTemplatedXML(xmlField, sMetadataUrl, mBindingContexts, {});
    expect(templatedXML).toMatchSnapshot();
});
```