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

## Single Quotes (Apostrophes) in Messages

### Natural Apostrophes Now Work (Fixed in v6.3.0)

> **Background:** `getText(key)` (no second argument) returns the raw property value without any placeholder processing, so apostrophes were never affected. The bug only occurred when `getText(key, params)` was called \u2014 even with an empty array `[]` \u2014 because that triggers `formatMessage`, which previously treated lone `'` as an escape opener.

Starting with version 6.3.0, natural apostrophes in contractions work correctly with placeholders:

```js
// This now works as expected:
bundle.getText("Don't use {0}", ['X']);        // "Don't use X"
bundle.getText("It's working: {0}", ['X']);    // "It's working: X"
bundle.getText("This {0} isn't a test for {1}", ['one', 'two']); 
// "This one isn't a test for two"
```

**How it works:** Single quotes are now treated as literal apostrophes unless they immediately precede a MessageFormat special character (`{`, `}`, or `'`). This matches natural language usage while maintaining MessageFormat escaping capability.

> **Note on Java MessageFormat compatibility:** This behavior intentionally differs from strict `java.util.MessageFormat`, which treats *all* single quotes as escape starters. Our approach prioritizes natural language usability while maintaining escaping capability when needed.

### MessageFormat Escaping

To use MessageFormat special characters literally, prefix them with a single quote:

```js
// Escape curly braces to display them literally:
bundle.getText("Use '{'braces'}' in {0}", ['text']);
// "Use {braces} in text"

// Show a literal placeholder:
bundle.getText("Type '{0}' to use {0}", ['value']);
// "Type {0} to use value"
```

### Doubled Apostrophes

Anywhere in a message, writing two consecutive single quotes `''` produces a single literal apostrophe. This works whether or not the message has placeholders:

```js
bundle.getText("It''s escaped: {0}", ['X']);   // "It's escaped: X"
bundle.getText("Don''t worry, it''s {0}", ['fine']); // "Don't worry, it's fine"
```

> **Note:** Since natural apostrophes (contractions like `don't`) now work directly, you only need `''` in the rare case where you want a literal apostrophe immediately before or after a MessageFormat special character.

### Behavior Summary

| Resource Pattern | Parameters | Result | Notes |
|-----------------|------------|---------|-------|
| `Don't use {0}` | `['X']` | `Don't use X` | ✅ Natural apostrophe works |
| `It's {0}` | `['value']` | `It's value` | ✅ Apostrophe preserved |
| `It''s {0}` | `['X']` | `It's X` | Doubled apostrophe → single |
| `Use '{'braces'}' in {0}` | `['text']` | `Use {braces} in text` | Quote escapes braces |
| `No placeholders` | `[]` | `It's working` | ✅ Apostrophes always preserved |

### Migration from Previous Versions

**If you previously wrote property files like this:**
```properties
# Old workaround (avoiding apostrophes):
message=Do not use {0}
```
✅ This still works - no changes needed.

**If you followed Java MessageFormat spec:**
```properties
# Doubled apostrophes (MessageFormat escape):
message=It''s {0}
```
✅ This still works correctly - produces `It's <value>`.

**If you had broken messages:**
```properties
# This was broken in older versions:
message=Don't use {0}
# Old behavior: "Dont use {0}" (apostrophe removed, placeholder ignored)
```
✅ **Now fixed** - produces `Don't use <value>` as expected.

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
