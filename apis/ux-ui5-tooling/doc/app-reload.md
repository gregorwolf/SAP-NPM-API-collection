# Middleware: Application Reload

The application reload middleware allows developers to preview Fiori elements applications while developing/configuring them. Whenever a file relevant for Fiori elements is changed, the application reload middleware will refresh the application preview.

# Example Configuration
Executing `ui5 serve` in your project with the configuration below in a `ui5.yaml` would start the application reload middleware with its default settings.

```
server:
  customMiddleware:
  - name: fiori-tools-appreload
    afterMiddleware: compression
```

## Configuration options
The application reload middleware does not require any configuration parameters. However, there are optional parameters that can be used if the project structure differs from standard Fiori elements projects.

### path
- `<string>` (default: `webapp`)
Path that is to be watched. By default the standard UI5 `webapp` folder is used

### ext
- `<string>` (default: `html,js,json,xml,properties,change`)
Change this parameter to select a custom set of file extensions that are to be watched

### port
- `<int>` (default: `35729`)
Port to be used to communicate file system changes

### debug
- `<boolean>` (default: `false`)
Set this parameter to get more log information.

