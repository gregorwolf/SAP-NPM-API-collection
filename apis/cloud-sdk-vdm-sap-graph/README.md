
## Package for generating the SAP Graph services

This is currently not release ready. excluded in `mail.ts`.

If you want to generate the VDM run `npx run generate` in the vdm-sap-graph package.

There is also a test for calling the generated API.


### Infos on SAP Graph API

The openapi.json files are found [here](https://github.wdf.sap.corp/sapgraph/sapgraph/tree/1b57664776d0bb707c1a0b9b59c96c03df431668/apicore/metadata-management-service/src/resources).
For the moment we just copied them to the repo.
A more sophisticated approach would be useful in the future. 

If you want to generate the VDM run `npx run generate` in the vdm-sap-graph package.
There is also a test for calling the generated API.

### Questions to SAP Graph API Team

- If you add the option `'--additional-properties=withSeparateModelsAndApi=true'`
and you have the templates enables, the model files are empty. Most likely there is no template found for the type.
- Arrays of objects have type Object and then the data in a parameter. Is this on purpose? Tradeoff?
- The related entities e.g. SalesOrder<->SalesOrderItem are not represented as links. We would expect this from graph.
<br>[Swagger Links Docu](https://swagger.io/docs/specification/links/)
<br>[Example Links in schema](https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v3.0/link-example.yaml)
- The quotes generation failed, needed to switch `--skip-validate-spec` to make the generator do it
