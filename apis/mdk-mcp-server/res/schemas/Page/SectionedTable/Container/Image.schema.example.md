
## MDK Image ContentMode

| MDK Image ContentMode   |                   Platforms                 |
| ----------------------- | ------------------------------------------- |
| ScaleToFill             |   iOS, Android (FIT_XY), Web (fill)         |
| ScaleAspectFit (Default)|   iOS, Android (FIT_CENTER), Web (contain)  |
| ScaleAspectFill         |   iOS, Android (CENTER_CROP), Web (cover)   |
| Redraw                  |   iOS only                                  |
| Center                  |   iOS, Android (CENTER), Web (none)         |
| Top                     |   iOS only                                  |
| Bottom                  |   iOS only                                  |
| Left                    |   iOS only                                  |
| Right                   |   iOS only                                  |
| TopLeft                 |   iOS only                                  |
| TopRight                |   iOS only                                  |
| BottomLeft              |   iOS only                                  |
| BottomRight             |   iOS only                                  |
| CenterInside            |   Android (CENTER_INSIDE), Web (scale-down) |
| FitEnd                  |   Android only (FIT_END)                    |
| FitStart                |   Android only (FIT_START)                  |
| Matrix                  |   Android only (MATRIX)                     |



## Different Combinations of Image Section properties on iOS

![Image Section - ScaleAspectFit](../../../Images/image_section_ios_scaleaspectfit.png)


![Image Section - Center](../../../Images/image_section_ios_center.png)



## Different Combinations of Image Section properties on Android

![Image Section - ScaleAspectFit](../../../Images/image_section_adr_scaleaspectfit.png)


![Image Section - Center](../../../Images/image_section_adr_center.png)



## Different Combinations of Image Section properties on WebClient

![Image Section - ScaleAspectFit](../../../Images/image_section_web_scaleaspectfit.png)


![Image Section - Center](../../../Images/image_section_web_center.png)



## Examples


```json
{
  "_Type": "Page",
  "_Name": "ImagePage",
  "Caption": "Image Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "Header": {
        "Caption": "Image section with image in banner style"
      },
      "_Type": "Section.Type.Image",
      "Visible": true,
      "Image": "/MDKDevApp/Images/image.png",
      "ContentMode": "ScaleToFill",
      "PaddingTop": 42,
      "PaddingBottom": 42,
      "PaddingLeft": 64,
      "PaddingRight": 64,
      "OnPress": "/MDKDevApp/Actions/Messages/Message1.action",
      "Styles": {
        "ImageBackgroundColor": "imageBgColor",
        "BackgroundColor": "sectionBgColor"
      }
    },
    {
      "Header": {
        "Caption": "Image section with SAP icon"
      },
      "_Type": "Section.Type.Image",
      "Visible": true,
      "Image": "sap-icon://home",
      "Width": 100,
      "Height": 50,
      "Alignment": "right",
      "ContentMode": "center",
      "OnPress": "/MDKDevApp/Actions/Messages/Message1.action",
      "Styles": {
        "Image": "font-icon-class"
      }
    }]
  }]
}
```

### Style Classes Definition
```css
/* Image - BackgroundColor */
.imageBgColor {
  background-color: #0000FF;
}

/* Section - BackgroundColor */
.sectionBgColor {
  background-color: #00FFFF;
}

.font-icon-class {
  font-size: 8;
  color: red;
  background-color: grey;
}

```
