# Change Log

All notable changes to this project will be documented in this file.

# Version 1.2.0

- Upgrade to `@sap/cloud-sdk-core` version 1.2.0.

# Version 1.1.0

- Upgrade to `@sap/cloud-sdk-core` version 1.1.0.

### Features

- Support function imports.
  - Export functions to create a function import request builder.
- Support complex types.
  - Export interfaces and builder functions for complex types.

# Version 1.0.0

- The VDM now integrates with SAP Cloud Platform's destination service.
- VDM Update requests are now performed using `PATCH` instead of `PUT` and support "deep updates" (i.e. updating an entity and related entities in a single request).
