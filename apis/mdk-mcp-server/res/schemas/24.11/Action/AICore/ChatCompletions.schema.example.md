
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is of a JS primitive type, object or a JS array. The failure ActionResult is an error message.

----
## Examples

Please refer to [AI Core Service Guide](https://help.sap.com/doc/c31b38b32a5d4e07a4488cb0f8bb55d9/CLOUD/en-US/f17fa8568d0448c685f2a0301061a6ee.pdf) for the supported models

### Text Input

Text input is supported by the following models: GPT-4-32k, GPT-4, GPT-3.5-Turbo-16k, GPT-3.5-Turbo, meta--llama3-70b-instruct and mistralai--mixtral-8x7b-instruct-v01

```json
{
  "_Type": "Action.Type.AICore.Chat.Completions",
  "ResourceGroup": "default", 
  "APIVersion": "2023-05-15", 
  "Target": {
    "Service": "/MyMDKApp/Services/MyAICore.service",
    "Path": "/chat/completions"
  },
  "Properties" : {
    "Model": "gpt-3.5-turbo",
    "Messages": [
      {
        "role": "user",
        "content": "sample input prompt"
      }
    ],
    "MaxTokens": 100,
    "Temperature": 0.0,
    "FrequencyPenalty": 0,
    "PresencePenalty": 0,
  }
}
```


### Image Input

Image input is supported by the following models: GPT-4o, GPT-4-Turbo and GPT-4o-mini

```json
{
  "_Type": "Action.Type.AICore.Chat.Completions",
  "APIVersion": "2023-05-15", 
  "Target": {
    "Service": "/MyMDKApp/Services/MyAICore.service",
    "Path": "/chat/completions"
  },
  "Properties" : {
    "Model": "gpt-4o",
    "Messages":  [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Describe this picture:"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://path/images/image.png"
          }
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    },
    "MaxTokens": 100
  }
}
```


### Tools

Tools and Tool_choice properties are supported by GPT models.

```json
{
  "_Type": "Action.Type.AICore.Chat.Completions",
  "APIVersion": "2023-05-15", 
  "Target": {
    "Service": "/MyMDKApp/Services/MyAICore.service",
    "Path": "/chat/completions"
  },
  "Properties" : {
    "Model": "gpt-4o",
    "Messages": [
      {
        "role": "user",
        "content": "Please fetch the weather data for the city of London.",
      },
    ],
    "Tools": [
      {
        "type": "function",
        "function": {
          "name": "fetch_weather_data",
          "description": "Fetch weather data from OpenWeatherMap API",
          "parameters": {
            "type": "object",
            "properties": {
              "city": {
                "type": "string",
                "description": "The name of the city to get weather data for",
              },
            },
            "required": ["city"],
          },
        },
      },
    ],
    "ToolChoice": {
      "type": "function",
      "function": {
        "name": "fetch_weather_data",
      },
    },
    "MaxTokens": 100
  }
}
```
