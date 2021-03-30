# How to add a jest test on templating

## Goals
We want unit tests on templating to be:

- readable and explicit when they fail
- precise: someone changing another feature then the one you are testing shouldn't break your test
- independent: modifying one test and its test data shouldn't impact another test

## Main paradigm
Each templating test should:

- declare:
    - its xml to template
    - declare its main model in a cds file. To use the jestTemplatingHelper this cds **must use** the namespace `namespace sap.fe.test;`
     and declare a service`service JestService`
    - its templating options: the current binding contexts and models to be used
- retrieve the result of the templating
- perform tests on the result: the test should be precise and not break at every change

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
    const domResult = await getTemplatingResult(xmlField, sMetadataUrl, mBindingContexts, {});
    expect(domResult).toHaveControl("/macros:FieldAPI/control:FieldWrapper/control:contentDisplay/m:Text");
    expect(domResult).toHaveControl("/macros:FieldAPI/control:FieldWrapper/control:contentEdit/m:Input");
    expect(getControlAttribute("/macros:FieldAPI/control:FieldWrapper/control:contentEdit/m:Input", "textAlign", "Begin"));
});
```

### JestTemplatingHelper - details
We introduced a specific test helper for doing templating test using Jest. This helpers offers you methods to :

- generate the XMLDOM templating form an xml with its preprocessors settings
- serialize an XMLDOM to display it as a string
- run an XPath query on an XMLDOM
- retrieve the attribute of a control

It also extends the jest expect syntax to offer you ways to run test more easily.

`expect(domResult).toHaveControl("/control:FormElementWrapper/m:Avatar");`

If you want to add your on xpath queries feel free to using [Xpath syntax](https://www.w3schools.com/xml/xpath_intro.asp).
You just need to know that the JestTemplatingHelper wraps your Xml Input in a `<root>` element.