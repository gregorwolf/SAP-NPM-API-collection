# Images

`Images` folder in metadata project contains image files that can be used referenced in the app.

## Supported Formats

The supported formats are `.jpg`, `.jpeg`, `.png`, `.svg` and `.pdf`.

## Size Consideration

The image files are base64 encoded and assembled into `bundle.js`. As such, big images or huge number of images will cause bigger bundle leading to slower app start-up and app update.

## Appearance Specific - Starting from iOS 13 and Android 10 (API level 29)

For apperance specific image, please add .dark or .light specifier before the extension (image.dark.png / image.light.png) into the `Images` folder. The extension of the image files need to be the same. MDK would automatically select the image according to the current appearance from device setting. Samples of appearance specific image filees to be placed in `Images` folder:

* `Images/myicon.dark.png`
* `Images/myicon.light.png`

For the usage, the value remains the same without the appearance specifier. Sample value: `/MyApp/Images/myicon.png`.
Example combinations:

* All image files are provided (appearance specific and default files):
    - `Images/myicon.dark.png` <-- will load this image in light mode.
    - `Images/myicon.light.png` <-- will load this file in dark mode.
    - `Images/myicon.png` <-- This is always ignored because appearance specific image files.
* Only default image file is provided (no appearance specific image file):
    - `Images/myicon.png` <-- will always load this image regardless of the appearance.
* Only dark and default files are provided:
    - `Images/myicon.dark.png` <-- will load this image in dark mode.
    - `Images/myicon.png` <-- will load this image in light mode.
* Only dark image file is provided:
    - `Images/myicon.dark.png` <-- will load this image in dark mode. And no image will be loaded in light mode as the light or default image file is not provided.

## Support for `.svg` Image Type

With this release, we are extending support for the `.svg` image type on both iOS and Android platforms.

The enhancement includes:
 * Direct support for `.svg` image files.
 * Support for vector resources provided by iOS and Android platforms.

*_Support `.svg` image type directly_*

_Since third-party libraries (for iOS and Android) are used to support the `.svg` image type, not all `.svg` files may be compatible._

In metadata, you can use:

```json
"Icon": "https://raw.githubusercontent.com/SVGKit/SVGKit/master/Demo-Samples/SVG/Lion.svg",
"Icon": "/MDKDevApp/Images/ShareButton.svg",
...
```

*Support vector resources provided by iOS and Android platform*

In metadata, you can use:

```json
"Icon": "$(PLT, 'res://test.walk.arrival', 'res://test_rectangle')",
"Icon": "res://test_rectangle",
```

1. For iOS:
 * Symbol Image Set

https://developer.apple.com/documentation/uikit/uiimage/creating_custom_symbol_images_for_your_app
 * Image Set (add `.svg` files)

*Note:* If an image set and a symbol image set have the same name, then use the symbol image set first.

2. For Android:

 * Vector Asset

https://developer.android.com/studio/write/vector-asset-studio

## Examples

Referencing the image in your app is done by specifying the path to the image:

* `/<AppName>/Images/<filename>.<extension>`
* `/MyApp/Images/myicon.png`
* `/MyApp/Images/otherimage.jpg`
* `/MyApp/Images/pic.svg`
* `/MyApp/Images/mypdficon.pdf`
