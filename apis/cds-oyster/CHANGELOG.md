# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
The format is based on [Keep a Changelog](http://keepachangelog.com/).


## Version 0.2.0 - 2025-10-06

### Added
 
- Additional parameters for code extensibility:
  ```json
  "code-extensibility": {
    "maxDepth": 5, // Limit the number of recursively created Oyster sandboxes. Default is 10
    "maxResultSize": 500, // Throw an exception if the number of rows returned by SELECT exceeds the value. Default is 1000.
  }
  ```
- Restrict after read handlers to modify certain fields, like IDs, ETag and managed fields.
 
## Fixed
 
- Forbid usage of `console.log` in production
- Only application services can be code-extended
- Extensions for services with manespace `cds.xt` are forbidden
 
## Changed
 
- Switch to Oyster v2
- Keep framework.wasm in binary format
- Allow non CDS-Oyster application handlers in `app/srv` directory
- Only errors and messages produced in extension are visible within extension
 
## Removed
 
- Calling bound action from extension in form `this.action()`. Only unbound actions are allowed.
- Before-READ extension handler


## Version 0.1.0 - 2025-07-03

### Added

- alpha version ready for pilot usage

## Version 0.0.1

### Added

- initial implementation

