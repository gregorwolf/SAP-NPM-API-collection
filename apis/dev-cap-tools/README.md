# Introduction
The library provides CLI `dev-cap-tools` which can be used to visualise the outputs of APIs as shown in the following section.

```
dev-cap-tools <cmd> [path] [types..]

Commands:
  dev-cap-tools gen-entrypoint [path]       prepare files for runing application
  [options..]                               locally
  dev-cap-tools build [path]                Generate an mta.yaml file and build
  [useHeadlessGenerator] [ui5version]       an mtar file
  [ui5theme] [terminal]
  dev-cap-tools update-xsuaa-service        update XSUAA service for local run
  [path]                                    with roles defined in the project

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  
```