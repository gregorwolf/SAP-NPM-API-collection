This component is a static resources web server for applications that run in a Fiori Launchpad portal site.

During startup it persists to the portal-service all configuration (tiles, groups, routes, uaa) that is needed for this application to run in a Fiori Launchpad portal site.

This component is coupled with the @sap/site-entry node module, which in turn acts as the web entry server of the Fiori Launchpad portal site.

This component uses the portal-service that exists in the XSA environment.

This component can be used only on HANA XSA SP1 environment.

