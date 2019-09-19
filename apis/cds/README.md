# @sap/cds

The API package for the different parts of CDS.
It provides access to CDS compiler, both on command line and programmatically.

## Building Models on Command Line
Given an application with structure
```
db/
  data-model.cds
srv/
  my-service.cds
```
you can execute `cds build` to build the models.

<!-- See the [docs](https://<TODO ADD LINK>/get-started/in-a-nutshell) for more. -->

## Building Models Programmatically
```bash
cds -e "cds.load('db') .then (cds.compile.to.hana)"
cds -e "cds.load('srv').then (cds.compile.to.edmx)"
```

See the [docs](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/a131984aefe94ff884e6b6819ee76bd9.html) for more.
<!-- TODO link to .../capire once available externally -->