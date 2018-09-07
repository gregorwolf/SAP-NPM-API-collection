@sap/textbundle
==========

Simple tool for text internationalization in Node.js. Based on the same concept as SAP UI5, this module works with UTF-8 encoded properties files.
Language defaulting is also borrowed from SAP UI5 with the idea the UI and server-side code
use the same text internationalization approach.

## [API documentation](./API.md)

## Usage

Assuming you have these files in directory ./test/properties:

*i18n_en_EN.properties*
```
greeting = Hello {0}, you are {1} years old.
```

*i18n_de.properties*
```
greeting = Hallo {0}, Sie sind {1} Jahre alt.
```

### Creating a TextBundle
#### Old API
```js
var TextBundle = require('@sap/textbundle').TextBundle;

var bundle = new TextBundle({path: 'test/properties/i18n', locale: 'en_EN' } );
```

#### New API
```js
var TextBundle = require('@sap/textbundle').TextBundle;

var bundle = new TextBundle('test/properties/i18n', 'en_EN');
```

#### Constructing localized messages
```js
var TextBundle = require('@sap/textbundle').TextBundle;

var bundle = new TextBundle(path.resolve(__dirname, 'test/properties/i18n'), 'en_EN');

bundle.getText('greeting'); // will return 'Hello {0}, you are {1} years old.'
bundle.getText('greeting', ['Stefan']); // will return 'Hello Stefan, you are undefined years old.'
bundle.getText('greeting', ['Stefan', '21']); // will return 'Hello Stefan, you are 21 years old.'

// using DE locale
var bundle = new TextBundle(path.resolve(__dirname, 'test/properties/i18n'), 'de');
bundle.getText('greeting', ['Stefan', '21']); // will return 'Hallo Stefan, Sie sind 21 Jahre alt.'
```

### Loading bundles
Bundles can be loaded by providing the absolute path to the resource bundle or relative path. If relative a path is used it will be resolved with respect to your JavaScript file. Absolute path to the resource bundle should be favored for TextBundles. 

Default file extension is `.properties`. If your file has a different extension, you just need to append it to the path you provide.
The format of the file still has to be UTF-8, and the structure has to be properties-like.

```js
var TextBundle = require('@sap/textbundle');
var txtBundle = new TextBundle({path: './test/txt/i18n.txt'});
```

### Getting texts and language defaulting

Getting text is straight forward - shown on the examples above already.

Message retrieval from properties files is done using fall-back mechanism that searches for the provided key
in a hierarchical order and returns the text associated with this key from the first occurrence in some of the files.

Following order is applied when text is retrieved for specific locale:

```
  language -> country -> en -> root -> 'not-found, return the key'
```


A simple example:  locale is 'de_DE', bundle name is 'i18n', the order in which properties files are checked for key existence is following:

```
  i18n_de_DE
  i18n_de
  i18n_en
  i18n
  // if not found, the key is returned back
```

### Locale fallback
The static function `TextBundle.fallbackLocale` returns the fallback of a given locale (e.g. 'fr_FR' => 'fr' => 'en' => ''). 
This lets you set up a locale fallback chain for your own purpose.
 
```js
var TextBundle = require('@sap/textbundle').TextBundle;

var parent = TextBundle.fallbackLocale('en_US');
```

### ResourceManager 
ResourceManager class allows managing resources for your module by caching the various TextBundle in order to avoid repeatedly loading them. 

```js
var ResourceManager = require('@sap/textbundle').ResourceManager;
var rm = new ResourceManager(path.resolve(__dirname, 'test/properties/i18n'));

var bundle = rm.getTextBundle('en_EN');
bundle.getText('greeting');
```

### Asynchronous resource loading
In order to improve server scalability, resources should be loaded through asynchronous file system operations.   

```js
var ResourceManager = require('@sap/textbundle').ResourceManager;
var rm = new ResourceManager(path.resolve(__dirname, 'test/properties/i18n'));

rm.loadTextBundle('en_EN')
    .then(function (bundle) {
        bundle.getText('greeting');
    });
```

### Resource loading middleware

```js
var ResourceManager = require('@sap/textbundle').ResourceManager;
var rm = new ResourceManager(path.resolve(__dirname, 'test/properties/i18n'));
var express = require('express');

var app = express();

function requestLocale(req) {
    var locale = req.locale = req.acceptsLanguages(['en-US', 'en', 'de-DE', 'de', 'fr-FR', 'fr']) || 'en';
    return locale;
}

app.use('/', rm.getMiddleware(requestLocale));

app.use('/myHandler', function (req, res, next) {
    // resources for request locale have been loaded at this stage 
    var bundle = rm.getTextBundle(req.locale);
    bundle.getText('greeting');
});
```
