
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "AIFeedbackPage",
  "Caption": "AI Feedback Example",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "Header": {
        "Caption": "AI Feedback Section"
      },
      "_Type": "Section.Type.FormCell",
      "Controls": [{
        "_Type": "Control.Type.FormCell.AIFeedback",
        "_Name": "AIFeedbackCell",
        "Caption": "Was this AI response helpful?",
        "Value": "None",
        "IsEditable": true,
        "IsVisible": true,
        "Separator": true,
        "OnValueChange": "/MDKApp/Rules/OnVoteChange.js",
        "Styles": {
          "Background": "AIFeedbackBgStyle",
          "Caption": "AIFeedbackCaptionStyle",
          "VoteButtons": "AIFeedbackVoteButtonStyle"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* AI Feedback - Background */
.AIFeedbackBgStyle {
  background-color: #F5F5F5;
}

/* AI Feedback - Caption */
.AIFeedbackCaptionStyle {
  font-color: #333333;
  font-size: 14;
  font-typeface: bold;
}

/* AI Feedback - Vote Buttons */
.AIFeedbackVoteButtonStyle {
  font-color: #0070F2;
}
```

### OnValueChange Rule
```javascript
// /MDKApp/Rules/OnVoteChange.js
export default function OnVoteChange(context) {
  // context is the AIFeedbackFormCellProxy
  const vote = context.getValue(); // "None", "Up", or "Down"
  console.log(`User voted: ${vote}`);

  if (vote === 'Up') {
    context.setCaption('Thanks for your positive feedback!');
  } else if (vote === 'Down') {
    context.setCaption('Sorry to hear that. We will improve.');
  } else {
    context.setCaption('Was this AI response helpful?');
  }
}
```
