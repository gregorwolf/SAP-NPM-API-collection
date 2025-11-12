# Images

`Images` folder in metadata project contains image files that can be used referenced in the app.

## Supported Formats

The supported formats are `.jpg`, `.png` and `.pdf`.

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

## Examples

Referencing the image in your app is done by specifying the path to the image:

* `/<AppName>/Images/<filename>.<extension>`
* `/MyApp/Images/myicon.png`
* `/MyApp/Images/otherimage.jpg`
* `/MyApp/Images/mypdficon.pdf`
