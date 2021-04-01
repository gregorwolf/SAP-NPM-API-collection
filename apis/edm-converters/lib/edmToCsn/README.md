# Getting started

<!-- markdownlint-disable MD001 MD022 -->
##### Table of Contents
<!-- markdownlint-enable MD001 MD022 -->

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Constraints](#constraints)

## Overview
EDMX2CSN is a command line utility that will convert an OData V2 or OData V4 model (EDMX) to a CSN (JSON) file. The primary use case for this utility is when you're building an extension application that connects to a remote OData V2 or V4 data source.  In such a case, converting the EDMX model from the OData V2 or V4 data source to CSN is the first step you take, along with defining the CDS data model, in order to define the CDS service model for your application.

## Installation

1. Install the EDMX2CSN utility from one of the following repositories:
   Nexus **milestones** registry or npm registry:

  ```
  npm config set registry <local nexus milestone or https://registry.npmjs.org/>
  ```

  or **releases** registry:

  ```
  npm config set registry <local nexus release or https://registry.npmjs.org/>
  ```
  > ***Do not add direct dependency to edmx2csn github project!***

  >npm does not support snapshots via nexus. The only possibility is to download manually a snapshot and install it.

2. Install the EDMX2CSN utility using npm:

  ```
  npm install "@sap/edm-converters"
  ```

3. As an alternative to step 2, maintain your package.json dependencies as follows:

  package.json
  ```
    "dependencies": {
      "@sap/edm-converters": "*"
    }
  ```

## Usage

The compiler with its options is invoked like any other npm/Unix command:

To generate CSN file from an EDMX File:
  * Windows: $homedir>./node_modules/@sap/edm-converters/lib/edmToCsn/bin/edmx2csn.cmd -i ${input_folder}/metadata.xml -o ${output_folder} -f
  * Linux: $homedir>./node_modules/@sap/edm-converters/lib/edmToCsn/bin/edmx2csn.sh -i ${input_folder}/metadata.xml -o ${output_folder} -f

To generate CSN file from an EDMX URL:
  * Windows: $homedir>./node_modules/@sap/edm-converters/lib/edmToCsn/bin/edmx2csn.cmd -i ${service_url}/$metadata -o ${output_folder}
  * Linux:   $homedir>./node_modules/@sap/edm-converters/lib/edmToCsn/bin/edmx2csn.sh -i ${service_url}/$metadata -o ${output_folder}

## Constraints
  1. Supports only publicly available OData service URLs (for example, http://services.odata.org/V2/OData/OData.svc/$metadata).
  2. Multiple schemas are not supported (for example, http://services.odata.org/V2/Northwind/Northwind.svc/$metadata).
  3. Function imports in EDMX are not supported.
  4. The following data types in OData V4 cannot be converted to an equivalent data type in CSN:
      * Edm.Duration
      * Edm.Stream
      * Edm.TimeOfDay
      * Edm.Geography
      * Edm.GeographyPoint
      * Edm.GeographyLineString
      * Edm.GeographyPolygon
      * Edm.GeographyMultiPoint
      * Edm.GeographyMultiLineString
      * Edm.GeographyMultiPolygon
      * Edm.GeographyCollection
      * Edm.Geometry
      * Edm.GeometryPoint
      * Edm.GeometryLineString
      * Edm.GeometryPolygon
      * Edm.GeometryMultiPoint
      * Edm.GeometryMultiLineString
      * Edm.GeometryMultiPolygon
      * Edm.GeometryCollection