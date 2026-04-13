#  Supported styling properties for components of BannerMessage

### Banner
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| background-color: Color | &check; | &check; | Background color of the banner |
| border-top-color: Color | &check; | | Color of the top border of the banner, for iOS only |

### MessageText
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| font-color/color: Color | &check; | &check; | Color of the message text |
| font-style: UIFont.TextStyle | &check; | | Style of the font, for iOS, e.g. body / caption / headline, refer to [UIFont.TextStyle](https://developer.apple.com/documentation/uikit/uifont/textstyle) |
| font-typeface: Typeface |  | &check; | Typeface of the font, e.g. bold, italic |

### ActionLabel
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| font-color/color: Color | | &check; |  Color of the button's text  |   
| font-size: Number |  | &check; |  Button's text font size   |
| font-typeface: Typeface |  | &check; |  Typeface of the font, for Android, e.g. bold, italic |
| background-color: Color | | &check; | Button's background color |


### DismissButton
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| font-color/color: Color | &check; | &check; |   For iOS, sets the color of the dismiss icon. For Android, sets the color of the text of the button  |   
| font-size: Number |  | &check; |  Button's text font size   |
| font-typeface: Typeface |  | &check; |  Typeface of the font, for Android, e.g. bold, italic |
| background-color: Color |  | &check; |  Button's background color |