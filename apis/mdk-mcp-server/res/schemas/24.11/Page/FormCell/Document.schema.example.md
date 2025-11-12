
----
## Examples

### For creating
If `Value` is empty, a new container folder will be created and the folderId will be assigned back to `Value` automatically.

```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Create",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Document",
        "_Name": "Documentcell",
        "Caption": "Documents",
        "IsEditable": true
      }]
    }]
  }]
}
```

### For updating

```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Update",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Document",
        "_Name": "Documentcell",
        "Caption": "Attachments",
        "Value": "{folder_id}",
        "IsEditable": true
      }]
    }]
  }]
}
```

### For displaying
Set `IsEditable` to false.

```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Display",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Document",
        "_Name": "Documentcell",
        "Caption": "Attachments",
        "Value": "{folder_id}",
        "IsEditable": false
      }]
    }]
  }]
}
```