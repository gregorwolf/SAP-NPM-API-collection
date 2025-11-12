#  Supported styling properties for components of ProgressBanner

### Banner
| Properties | States | | Remarks |
|:---|:---|:---|:---|
| | **Progress** |  **Completion** | |
| background-color: Color | iOS, Android | iOS, Android | Sets the background color of the banner |
| border-top-color: Color | iOS, Android | iOS only | For iOS, sets the color of the top border of the banner. For Android, sets the color of the Progress Bar when the action is in progress |

### MessageText
| Properties | States | | Remarks |
|:---|:---|:---|:---|
| | **Progress** |  **Completion** | |
| font-color/color: Color | iOS, Android | iOS, Android | Color of the message text |
| font-style: UIFont.TextStyle | iOS only | iOS only | Style of the font, for iOS, e.g. body / caption / headline, refer to [UIFont.TextStyle](https://developer.apple.com/documentation/uikit/uifont/textstyle) |
| font-typeface: Typeface | Android Only | Android Only | Typeface of the font, e.g. bold, italic |

### ActionLabel
| Properties | States | | Remarks |
|:---|:---|:---|:---|
| | **Progress** |  **Completion** | |
| font-color/color: Color | Android only | Android only |  Color of the button's text  |   
| font-size: Number | Android only | Android only |  Button's text font size   |
| font-typeface: Typeface | Android only | Android only |  Typeface of the font, for Android, e.g. bold, italic |
| background-color: Color | Android only | Android only | Button's background color |

### DismissButton
| Properties | States | | Remarks |
|:---|:---|:---|:---|
| | **Progress** |  **Completion** | |
| font-color/color: Color | iOS, Android | iOS, Android |  For iOS, sets the color of the dismiss icon. For Android, sets the color of the text of the button  |   
| font-size: Number | Android only | Android only |  Button's text font size   |
| font-typeface: Typeface | Android only | Android only |  Typeface of the font, for Android, e.g. bold, italic |
| background-color: Color | Android only | Android only |  Button's background color |