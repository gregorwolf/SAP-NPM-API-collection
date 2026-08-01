#  Supported styling properties for components of StepperFormCell

### Applicable FormCell Controls: 
StepperFormCell

### Background
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| background-color: Color | &check; | &check; | Background color of the stepper form cell |
| padding: Number | &check; | &check; | Padding around the stepper content.

Supports CSS shorthand: 1 value (all), 2 values (vertical horizontal), 3 values (top horizontal bottom), 4 values (top right bottom left) |

### Caption
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| font-color: Color | &check; | &check; | Color of the caption text |
| font-size: Number | | &check; | Size of the caption text, for Android only |
| font-style: UIFont.TextStyle | &check; | | Style of the font, for iOS, e.g. body / caption / headline, refer to [UIFont.TextStyle](https://developer.apple.com/documentation/uikit/uifont/textstyle). `subheadline` is set in iOS by default. |
| font-typeface: Typeface | &check; | &check; | Typeface of the font, e.g. bold, italic, semibold |
| padding: Number | &check; | &check; | Padding around the caption text. It is set to 0 by default. |

### HelperText
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| font-color: Color | &check; | &check; | Color of the helper text |
| font-size: Number | | &check; | Size of the helper text, for Android only |
| font-style: UIFont.TextStyle | &check; | | Style of the font, for iOS, e.g. body / caption / headline, refer to [UIFont.TextStyle](https://developer.apple.com/documentation/uikit/uifont/textstyle). `footer` is set in iOS by default.|
| font-typeface: Typeface | &check; | &check; | Typeface of the font, e.g. bold, italic, semibold. |
| padding: Number | &check; | &check; | Padding around the helper text. It is set to 0 by default. |

### Stepper
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| border-color: Color | &check; | &check; | Border color of the stepper container |
| border-width: Number | &check; | &check; | Border width of the stepper container. Default value is 1.|
| border-radius: Number | &check; | &check; | Border radius of the stepper container. Default value is 8.|
| height: Number | &check; | &check; | Height of the stepper container. It is 44 in iOS and 56 in android by default. |
| width: Number | | &check; | Width of the stepper container, for Android only |

### StepperTextField
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| border-color: Color | &check; | &check; | Border color of the text field |
| border-width: Number | &check; | | Border width of the text field, for iOS only. It is set to 0 by default. |
| font-color: Color | &check; | &check; | Color of the text in the text field |
| font-size: Number | | &check; | Font size of the text, for Android only |
| font-family: String | | &check; | Font family of the text, for Android only |
| font-style: UIFont.TextStyle | &check; | | Style of the font, for iOS, e.g. body / caption / headline, refer to [UIFont.TextStyle](https://developer.apple.com/documentation/uikit/uifont/textstyle) |
| font-typeface: Typeface | | &check; | Typeface of the font, for Android only |

### IncrementIcon
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| color: Color | &check; | &check; | Tint color of the increment icon |
| font-size: Number | &check; | &check; | Size of the increment icon. It is set to 24 by default, with a max font-size of 48. |

### DecrementIcon
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| color: Color | &check; | &check; | Tint color of the decrement icon |
| font-size: Number | &check; | &check; | Size of the decrement icon. It is set to 0 by default, with a max font-size of 48. |
