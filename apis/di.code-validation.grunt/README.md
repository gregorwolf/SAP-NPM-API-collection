# di.code-validation.grunt
provides grunt tasks for code validation

## install

npm install di.code-validation.grunt --save-dev

## Usage

```javascript
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
    "use strict";

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        pkg: pkg,
        codevalidation: {
            options: {
                projectPath: '<path to the project>',
                pathPrefix: '<optionally prefix to concat to the project path>',
                ignoredPaths: [<path to folders to skip validaitons for>...],            
                reporter: "problems_reporter",
                reporterOptions: {outputFile: path.join(__dirname , "code-validation-test.log")}
            }
        }
    });

    grunt.loadNpmTasks('di.code-validation.grunt');
    grunt.registerTask('validate', ['codevalidation']);
};
```

