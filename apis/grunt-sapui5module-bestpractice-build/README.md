# @sap/grunt-sapui5module-bestpractice-build

Grunt tasks for sapui5 module build.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install @sap/grunt-sapui5module-bestpractice-build --save-dev
```

OR add the following package.json to your application 

```js
{
	"name": "<your-project-name>",
	"version": "0.0.1",
	"description": "Project description",
	"private": true,	 
	"devDependencies": {
		"@sap/grunt-sapui5module-bestpractice-build": "X.X.X"
	}
}
```

Once the plugin has been installed, it may be enabled inside your Gruntfile.js:

```js

module.exports = function(grunt) {         
	'use strict';
    grunt.loadNpmTasks('@sap/grunt-sapui5module-bestpractice-build');

    grunt.registerTask('default', [
        'lint'
    ]);
                
};
```

## Linting
The package contains several default validators for linting the project code.
