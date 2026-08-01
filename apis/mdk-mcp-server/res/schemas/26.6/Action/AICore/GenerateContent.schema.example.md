
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is of a JS primitive type, object or a JS array. The failure ActionResult is an error message.

----
## Examples

Please refer to [AI Core Service Guide](https://help.sap.com/doc/c31b38b32a5d4e07a4488cb0f8bb55d9/CLOUD/en-US/f17fa8568d0448c685f2a0301061a6ee.pdf) for the supported Gemini models

### Text Input

```json
{
  "_Type": "Action.Type.AICore.Generate.Content",
  "ResourceGroup": "default", 
  "Target": {
    "Service": "/MyMDKApp/Services/MyAICore.service",
    "Path": "/models/gemini-1.5-pro:generateContent"
  },
  "Properties" : {
    "Contents": [
      {
        "role": "user",
        "parts": {
          "text": "sample input prompt"
        }
      }
    ],
    "SystemInstruction": {
      "role": string,
      "parts": [{
        "text": "You are a helpful assistant."
      }]
    },
    "SafetySettings": {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_LOW_AND_ABOVE"
    },
    "GenerationConfig": {
      "maxOutputTokens": 100,
      "temperature": 0.7,
      "top_p": 0.9,
      "top_k": 40
    }  
  }
}
```


### Image Input

```json
{
  "_Type": "Action.Type.AICore.Generate.Content",
  "Target": {
    "Service": "/MyMDKApp/Services/MyAICore.service",
    "Path": "/models/gemini-1.5-pro:generateContent"
  },
  "Properties" : {
    "Contents": [{
      "role": "user",
      "parts": [
        {
          "text": "Describe this picture:"
        },
        {
          "fileData": {
            "mimeType": "image/png",
            "fileUri": "https://path/images/image.png"
          }
        },
        {
          "inlineData": {
            "mimeType": "image/jpeg",
            "data": "{base64_image}"
          }
        }
      ]
    }]
  }
}
```


### Tools

```json
{
  "_Type": "Action.Type.AICore.Generate.Content",
  "Target": {
    "Service": "/MyMDKApp/Services/MyAICore.service",
    "Path": "/models/gemini-1.5-pro:generateContent"
  },
  "Properties" : {
    Contents: [{
      role: "user",
      parts: {
        text: "Please fetch the weather data for the city of London."
      }
    }],
    Tools: [
      {
        "function_declarations": [
          {
            name: "fetch_weather_data",
            description: "Fetch weather data from OpenWeatherMap API",
            parameters: {
              type: "object",
              properties: {
                city: {
                  type: "string",
                  description: "The name of the city to get weather data for",
                }
              },
              required: ["city"]
            }
          }
        ]
      }
    ]
  }
}
```
