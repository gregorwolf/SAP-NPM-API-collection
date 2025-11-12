#  Supported styling properties for components of the Calendar control

### Calendar: 
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| background-color: Color | &check; | &check; | Background color of the text |

### CalendarButtons:
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| background-color: Color | | &check; | Background color of the calendar's buttons |
| font-color: Color | | &check; | Color of the border of the buttons and content inside the buttons |

### CalendarExpandableHandle:
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| color: Color | | &check; | Color of the calendar's expandable handle in expandable view |

### CalendarWeekDayLabel:
| Properties | iOS | Android | Remarks |
|:---|:---:|:---:|:---:|
| font-color: Color | &check; | &check; | Color of the week days' label |
| font-color-highlighted: Color | &check; | | Color of today's day label |
| font-style: UIFont.TextStyle | &check; | | Style of the font, for iOS, e.g. body / caption / headline, refer to [UIFont.TextStyle](https://developer.apple.com/documentation/uikit/uifont/textstyle) |
| font-typeface: Typeface |  | &check; | Typeface of the font, e.g. bold, italic |
| font-size: Number |  | &check; | Size of the font for the dates | 