# Running Unit and Integration Tests
This module is used to support running unit and integration tests via a Grunt task.

## Preconditions
The .npmrc file should contain the following line:

    @sap:registry=https://npm.sap.com/

## Usage
1. Copy this command and run it. 

        npm install --save-dev @sap/grunt-sapui5-bestpractice-test
   This will add the grunt-sapui5-bestpractice-test module to your package.json file.
2. Add the following script to your package.json file to enable running the unit and integration tests via npm.

        "scripts": {
            "test": "grunt unit_and_integration_tests"
        }
3. Add this code to the Gruntfile.js file.

        grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-test");
        
        grunt.registerTask("unit_and_integration_tests", 
            [
                "test"
            ]
        );
        
        grunt.config.merge({
            coverage_threshold: {
                statements: 0,
                branches: 100,
                functions: 0,
                lines: 0
            }
        });
4. Run the unit and integration tests.

        npm test
