# SAPUI5 Visual Editor extension for BAS

## Build extension
1. Run `npm install` in the root folder
1. Run `npm run all`
1. *ui5-visual-editor.vsix* file should be created in project root

## Run extension in BAS
1. Open BAS
1. Create a basic dev space
1. Create a `default-plugins` folder under `/home/user`
1. Copy *vsix* file to `/home/user/default-plugins` folder
1. Restart dev space

### Open SAPUI5 Visual Editor
1. Create or import an adaptation project
1. Right click on `webapp/manifest.appdescr_variant` and click `Open SAPUI5 Visual Editor` (or open command palette and select `Open SAPUI5 Visual Editor`)
