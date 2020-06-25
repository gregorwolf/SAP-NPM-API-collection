# di.code-validation.core  
code validation controller for DI.
returning issues in code according to validators configured

### install

npm install di.code-validation.core --save-dev

### CodeValidation API

```javascript
executeForProject(projectPath, workspaceRootName, configuration, callbackFunction)
```

_basePath_ - full path for the validated folder location

_options_ - an object to set additional options for execution and return values processing.

_options.pathPrefix_ - validation issues paths are relative to the project path. _pathPrefix enable to set constant prefix to the returned path.

_configuration_ - configuration of the validators to execute.  object of type _ValidationConfig_

_callbackFunction_ - callback of results. (TBD: add also failure for callback?)

_ValidationConfig_ structure:
```javascript
  {
      "validators" : {
          "validator1" : {
              "extensions" : ['.js', '.xsjs'],
              "filters": {
                  "levels" :["error", "warning", "info"]
              }
          },
          "validator2" : {
              "extensions" : ['.new'],
              "filters": {
                  "levels" :["error"]
              }
          }
          ....
      }
  }
```

_result_ structure:
```javascript
{
    "validator_id" : {
        "issues" : {
            "relative_file_path" : [
                {
                    "category" : "Possible Error",
                    "checker" : "validator checker name",
                    "column" : 1,
                    "line" : 14,
                    "message" : "some message",
                    "path" : "relative_file_path",
                    "ruleId" : "optional name of rule",
                    "severity" : "error"
                }
                ....
            ]
        }
        ....
    }
}
```

#### validator API

Each validator should implement following API:

```javascript
  validateFiles(validationMetadata, fileResources)
```

  _validationMetadata_ - contains following methods:
  
      getRootPath() - workspaceRootName
  
      getLevels() - array of levels of issues to return
  
  _fileResources_ - array of files to validate (TBD: enable validation by extension of regular expression)
  
      getPath() - returns the file full path
      
      getText() - returns the text in the file

#### run validation from command line

node di.code-validation.core\bin\run.js "project file location" "client workspace root path"

--c "configuration file location" - file with validation configuration. if not supplied defaults used.

Example for configuration file:

```javascript
  var configParam = { 
    "validators" : { 
      "di.code-validation.js" : { 
          "extensions" : [".js", ".xsjs"], 
          "filters": { 
            "levels" :["error", "warning", "info"] 
            } 
          } 
        } 
      };
  module.exports =  configParam;
```

--l "log file" - location of the outpul log file. default is the execution directory

### default configuration:

```javascript
  validators: {
    "di.code-validation.js": {
      extensions: [".js", ".xsjs"]
    },
    "di.code-validation.xml": {
      extensions: [ ".xml"]
    }
  }
```

