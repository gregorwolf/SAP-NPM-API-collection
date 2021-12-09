SAP Fiori tools CLI.

COMMAND NAME:

    add - Create or update a target configuration

USAGE:

    fiori add [SUBCOMMAND] [...OPTIONS]

SUBCOMMANDS:

    deploy-config - Generate or update deploy config in ui5-deploy.yaml file.
|               |    |                            |
|---------------|----|----------------------------|
| --package     | -p | Package name of target deploy system |
| --transport   | -t | Transport number of target deploy system |
| --client      | -l | Client number of target deploy system |
| --index       | -i | Generate index.html in the app (y/n) |
| --overwrite   | -f | Overwrite existing deploy config (y/n) |
| --config      | -c | App deploy config file name if it is not ui5-deploy.yaml |
| --base        | -b | App configuration file name if it is not ui5.yaml |

    flp-config - Generate or update Fior Launchpad configuration
|               |    |                            |
|---------------|----|----------------------------|
| --object      | -o | Semantic object |
| --action      | -a | Action |
| --title       | -t | Title displayed on Fiori Launchpad tile |
| --subtitle    | -s | Subtile displayed on Fiori Launchpad tile |
| --overwrite   | -f | Overwrite existing FLP config (y/n) |

    flp-embedded-config - Adds the necessary configuration for running a Fiori application in FLP Embedded Mode. Mandatory parameters
|               |    |                            |
|---------------|----|----------------------------|
| --bspApplication      |    | The BSP of your application |
| --config      |    | Path to the YAML file from which to copy the backend configuration |
| --flp         |    | Path to the FLP in the backend, e.g. sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html |

    variants-config - Adds the necessary configuration for enabling Variant Management for your Fiori application
