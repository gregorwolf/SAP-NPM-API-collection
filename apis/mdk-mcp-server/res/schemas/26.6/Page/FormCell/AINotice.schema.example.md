## Examples

```json
{
  "_Type": "Page",
  "_Name": "AINoticePage",
  "Caption": "AI Notice Example",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "Header": {
        "Caption": "AI Notice Section"
      },
      "_Type": "Section.Type.FormCell",
      "Controls": [
        {
          "_Type": "Control.Type.FormCell.AINotice",
          "_Name": "AINoticeCell",
          "Message": "This result was produced by an AI model. Verify before use.",
          "HyperlinkText": "Learn more",
          "OnHyperlinkPress": "/MDKApp/Rules/AINotice/OnHyperlinkPress.js",
          "IsVisible": true,
          "Separator": true,
          "Styles": {
            "Background": "AINoticeBackgroundStyle",
            "Message": "AINoticeMessageStyle"
          }
        }
      ]
    }]
  }]
}
```

### Style Classes Definition

```css
/* AI Notice - Background
 * Fills the full cell row with a green tint and 10pt padding on every side.
 * Padding accepts CSS shorthand (1, 2, 3, or 4 values). */
.AINoticeBackgroundStyle {
  background-color: #E8F5E9;
  padding: 10;
}

/* AI Notice - Message
 * Bold red text at 16pt with an underline. */
.AINoticeMessageStyle {
  font-color: #D32F2F;
  font-size: 16;
  font-typeface: bold;
  text-decoration: underline;
}
```

### Supported CSS properties on the `Message` class

| Property | Example | iOS | Android |
|---|---|:---:|:---:|
| `font-color` | `#D32F2F` | ✓ | ✓ |
| `font-size` | `16` | ✓ | ✓ |
| `font-typeface` | `bold`, `italic`, `bold italic`, `light`, `regular`, ... | ✓ | ✓ |
| `text-decoration` | `underline`, `line-through` | ✓ | ✓ |
| `font-style` | `caption1`, `caption2`, `footnote`, `subheadline`, `callout`, `body`, `headline`, `title1`, `title2`, `title3`, `largeTitle`, `extraLargeTitle`, `extraLargeTitle2`, `KPI`, `largeKPI` | ✓ | ✗ (use `font-size` instead) |

### Supported CSS properties on the `Background` class

| Property | Example | iOS | Android |
|---|---|:---:|:---:|
| `background-color` | `#E8F5E9` | ✓ | ✓ |
| `padding` (1-value) | `10` (all sides) | ✓ | ✓ |
| `padding` (2-value) | `10 16` (vertical horizontal) | ✓ | ✓ |
| `padding` (3-value) | `16 20 8` (top horizontal bottom) | ✓ | ✓ |
| `padding` (4-value) | `16 20 8 12` (top right bottom left) | ✓ | ✓ |

### Notes on the hyperlink portion

The `HyperlinkText` always renders in the platform's link color (tint blue) and bold weight. CSS overrides on the `Message` class apply to the surrounding message text, not to the hyperlink span itself. This is consistent with platform link styling conventions.

### OnHyperlinkPress Rule

```javascript
// /MDKApp/Rules/AINotice/OnHyperlinkPress.js
export default function OnHyperlinkPress(context) {
  // context is the AINoticeFormCellProxy
  const message = context.getMessage();
  console.log(`Hyperlink pressed for: ${message}`);
}
```

### Combining styles

Multiple CSS properties stack within a single class:

```css
/* Red, 20pt, bold italic, underlined. */
.AINoticeAllProps {
  font-color: #D32F2F;
  font-size: 20;
  font-typeface: bold italic;
  text-decoration: underline;
}

/* Yellow background combined with bold headline-sized text. */
.AINoticeYellowBackground { background-color: #fff3cd; padding: 10; }
.AINoticeHeadlineBold {
  font-color: #1A237E;
  font-style: headline;          /* iOS only */
  font-typeface: bold;
}
```

```json
{
  "_Type": "Control.Type.FormCell.AINotice",
  "_Name": "ainotice_combined",
  "Message": "Bold red text, underlined, on a yellow background.",
  "HyperlinkText": "Learn more",
  "Styles": {
    "Background": "AINoticeYellowBackground",
    "Message":    "AINoticeAllProps"
  }
}
```