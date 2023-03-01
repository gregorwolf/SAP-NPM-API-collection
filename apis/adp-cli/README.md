# Adaptation Project Command-line Interface

WARNING: This package is intended for usage only within SAP Business Application Studio and NOT VSCode

**Command-line interface** that allows user to **deploy** (**update**) or **undeploy** an Adaptation Project.

## Usage

```shell
npm install -g @sap/adp-cli
```

In your terminal run `adp` to _see_ all available options and commands (`adp abap-deploy`, `adp abap-undeploy`).

For the _correct usage_ of each command add `-h` or `--help`. This will print all the options the command accepts.

Example:<br/>
**Usage**: `adp abap-deploy [options]` <br/>
-ap, --abap-package <abap_package\> Package name<br/>
-at, --abap-transport [abap_transport] Transport request number<br/>
-dn, --destination-name [destination_name] Destination name<br/>
-su, --system-url [system_url] System URL<br/>
-cl, --client [client] Client<br/>
-u, --username [username] Username <br/>
-p, --password [password] Password <br/>
-h, --help display help for command<br/>

Options that are surrounded by arrows are **required**, the ones in square brackets are **optional**. <br/>
If the project is local pass '\$TMP' with single quotes or "\\$TMP" with double quotes and a slash instead of $TMP, then you can omit `-at, --abap-transport` parameter.

## Usage on SAP Business Application Studio

You _can use_ the command on SAP Business Application Studio with **either** [destination_name] **or** [system_url] & [client] parameters (the latter requires you to pass credentials). **NOTE**: You cannot use both at the same time.

```bash
# abap-deploy with $TMP package
$ adp abap-deploy --abap-package '$TMP' --destination-name DEST_NAME
# abap-deploy
adp abap-deploy --abap-package ABAP_PKG --abap-transport ABAP_TRANSPORT --destination-name DEST_NAME
# abap-deploy with force update
adp abap-deploy --abap-package ABAP_PKG --abap-transport ABAP_TRANSPORT --destination-name DEST_NAME --force-update
# abap-undeploy
adp abap-undeploy --abap-package ABAP_PKG --abap-transport ABAP_TRANSPORT --destination-name DEST_NAME
```
