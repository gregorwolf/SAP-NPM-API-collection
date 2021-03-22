# CDS Language Server Settings

CDS-LS can be configured via file or IDE options (through language server protocol aka LSP)

Options overlay in that order:
- $CDS_LS_DIR/.cds-lsp/.settings.json
- $WORKSPACE/.cds-lsp/.settings.json
- IDE options

i.e. IDE options ultimately win 

Possible options are described in JSON schema.<br> 
See vscode-cds/package.json#contributes.configuration.properties<br>
Wrap them in a _settings_ node e.g.
```
{
    "settings": {
        "cds": {
            "workspaceValidationMode": "OpenEditorsOnly"
        }
    }
}
```

