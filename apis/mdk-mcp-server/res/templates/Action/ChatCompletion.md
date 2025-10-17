## Chat Completion AI Action

### ChatCompletion.action

```json
{
    "_Type": "Action.Type.AICore.Chat.Completions",
    "ResourceGroup": "default",
    "APIVersion": "2023-05-15",
    "Headers": {
        "content-type": "application/json"
    },
    "Target": {
        "Service": "/MDKGenAIChat/Services/AzureOpenAI_gpt4o.service",
        "Path": "/chat/completions"
    },
    "Properties": {
        "Model": "gpt-4o",
        "Messages": [
            {
                "role": "user",
                "content": "This is a test. Respond strictly as 'I am successfully deployed'"
            }
        ],
        "Temperature": 1,
        "Frequency_penalty": -1,
        "Presence_penalty": 1,
        "Max_tokens": 100
    },
    "ShowActivityIndicator": true,
    "ActivityIndicatorText": "Processing ...",
    "ActionResult": {
        "_Name": "chatResult"
    },
    "OnFailure": "/MDKGenAIChat/Actions/ChatCompletionFailure.action"
}
```