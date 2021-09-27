# @sap/dwc-cli

Command-Line Interface (CLI) for SAP Data Warehouse Cloud.

## Content

1. [Installation](#installation)
2. [Versioning](#versioning)
3. [Authentication](#authentication)
4. [Usage](#usage)
5. [Help & Documentation](#help-documentation)
6. [Community & Feedback](#community--feedback)
7. [License](#license)

## Installation

```bash
$ npm install -g @sap/dwc-cli
```

or

```bash
$ yarn global add @sap/dwc-cli
```

## Versioning

The semantic versioning of the command-line interface is handled according to SAP Data Warehouse Cloud versions and follows the same structure for major and minor versions.

```bash
$ dwc -v
2021.20.0
```

For an in-depth explanation see the blog post on [blogs.sap.com]( https://blogs.sap.com/2021/09/21/new-command-line-for-sap-data-warehouse-cloud-code-way-to-the-cloud/).

## Authentication

Passcodes are used for authenticating commands sent from the command-line interface to your SAP Data Warehouse Cloud tenant. Passcodes can be provided explicitly using the `-p, --passcode` option in case the URL to retrieve a passcode is known, or implictly using an interactive session by omitting the `-p, --passcode` option.

When omitting the `-p, --passcode` option the command-line interface prompts you to provide a passcode by navigating to the passcode authentication URL for your tenant. The URL is calculated based on the provided `-H, --host` value.

```bash
$ dwc spaces read SOMESPACE -H https://mytenant.eu10.hcs.cloud.sap/
✔ Do you want to retrieve a passcode from https://mytenant.authentication.eu10.hana.ondemand.com/passcode? … yes
✔ Enter your temporary authentication code: … **********
...
```

The displayed URL can be used for retrieving more passcodes by refreshing the page when sending multiple commands which can then be fed to the `-p, --passcode` option.

## Usage

**Create or update a space**

```bash
$ dwc spaces create -H https://mytenant.eu10.hcs.cloud.sap/ -p somepasscode -f /path/to/definition/file.json
```

**Read a space definition**

```bash
$ dwc spaces read MYSPACE -H https://mytenant.eu10.hcs.cloud.sap/ -p somepasscode
```

**Delete a space**

```bash
$ dwc spaces delete MYSPACE -H https://mytenant.eu10.hcs.cloud.sap/ -p somepasscode
```

## Help Documentation

Find the full documentation on [help.sap.com](https://help.sap.com/viewer/9f804b8efa8043539289f42f372c4862/cloud/en-US/5eac5b71e2d34c32b63f3d8d47a0b1d0.html), check out the blog post on [blogs.sap.com]( https://blogs.sap.com/2021/09/21/new-command-line-for-sap-data-warehouse-cloud-code-way-to-the-cloud/) or use option `-h, --help`:

```bash
$ dwc <command> -h
```

## Community & Feedback

SAP Community provides a forum where you can ask and answer questions, and comment and vote on the questions of others and their answers.

See [SAP Data Warehouse Cloud community](https://community.sap.com/topics/data-warehouse-cloud) for more details and use the tag *dwc-cli* for questions concerning the CLI.

## License

This package is provided under the terms of the [SAP Freeware License Agreement](https://tools.hana.ondemand.com/sap-freeware-license.txt).
