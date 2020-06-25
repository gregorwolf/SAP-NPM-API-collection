@sap/xss-secure
==============

XSSSecurity Implementation taken from SAP UI5

## Usage
`var xssSecure = require('@sap/xss-secure');`

## API Reference

#### `encodeCSS(string)`
Encode the string for inclusion into CSS string literals or identifiers.
* `string` - The string to be escaped

Returns the escaped `string`.
```js
xssSecure.encodeCSS('1<4'); // returns '1\\3c 4'
xssSecure.encodeCSS('a-b'); // returns 'a\2d b'
```

#### `encodeHTML(string)`
Encode the string for inclusion into HTML content/attribute.
* `string` - The string to be escaped

Returns the escaped `string`.
```js
xssSecure.encodeHTML('1<4');  // returns '1&lt;4'
xssSecure.encodeHTML('\x00'); // returns '&#xfffd;'
```

#### `encodeJS(string)`
Encode the string for inclusion into a JS string literal.
* `string` - The string to be escaped

Returns the escaped `string`.
```js
xssSecure.encodeJS('1<4');  // returns '1\\x3c4'
xssSecure.encodeJS('\x00'); // returns '\\x00'
```

#### `encodeURL(string)`
Encode the string for inclusion into an URL parameter.
* `string` - The string to be escaped

Returns the escaped `string`.
```js
xssSecure.encodeURL('http://testing.com/?a=1&b="ok"');
// returns 'http%3a%2f%2ftesting.com%2f%3fa%3d1%26b%3d%22ok%22'
```

#### `encodeXML(string)`
Encode the string for inclusion into XML content/attribute.
* `string` - The string to be escaped

Returns the escaped `string`.
This function is alias to `encodeHTML`.
