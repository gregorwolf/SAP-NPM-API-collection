
----

## Examples

### Metadata Image

Metadata Image are images that are stored in your MDK metadata project `Images` folder:

* `/MyApp/Images/myicon.png`
* `/MyApp/Images/otherimage.jpg`
* `/MyApp/Images/mypdficon.pdf`

### Resource Image

Resource Images are images that are built in to your MDK client app in the `App_Resources` folder. File extension should not be included when referencing resource images:

* `res://myicon`
* `res://someotherimage`

### HTTPS Image

HTTPS Images are external images are hosted in external servers. Only HTTPS protocol is allowed for security reason.

* `https://hcpms-abcde-trial.hana.ondemand.com/mydestination/somepath/tomyimage/icon.png`
* `https://someother.externalserver.xyz/anotherimage/image.jpg`

### Font Icon

A unicode based font icon in font://&#{unicode} namespace e.g. `font://&#xe05b`. 

By default MDK only supports SAP Font Icons. The full list of SAP Icons can be found [here](https://sapui5.hana.ondemand.com/sdk/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons)

To use 3rd party font icon, please add the font icon file (.ttf) to fonts folder inside mdkproject and apply a style class with font-family CSS property to the image style.

More details on the font-family value can be found [here](https://docs.nativescript.org/ui/components/icon-fonts#platform-specific-font-recognition)

Note:
* You must prefixed the font icon with `font://&#` followed by the unicode (if the unicode is 4 characters, please add 'x' before the unicode, e.g. if unicode is f0f3, use xf0f3 and append to the namespace).
* Regarding font-family value for iOS, we are using font family name, so in case where two or more 3rd party font icon files have same font family name, please change the font family name of each file accordingly to avoid duplicated font family name as it will cause issue on icon rendering. To change the font family name of the .ttf file, please refer to 3rd party font icon tool.

Examples:
* `font://&#xe05b` will get you an 'accept' icon of SAP icon
* `font://&#xe058` will get you an 'add' icon of SAP icon
* `font://&#xf0f3` will get you a 'bell' icon of Font Awesome - regular style

### SAP Icon

SAP icon with specific namespace: `sap-icon://icon_name`.

The full list of SAP Icons can be found [here](https://sapui5.hana.ondemand.com/sdk/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons)

Note: You must prefixed SAP Icons with `sap-icon://` e.g.

* `sap-icon://accept` will get you an 'accept' icon
* `sap-icon://add` will get you an 'add' icon
