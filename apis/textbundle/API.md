## Classes

<dl>
<dt><a href="#PropertiesParser">PropertiesParser</a></dt>
<dd><p>Parse a Java .properties definition</p>
</dd>
<dt><a href="#ResourceManager">ResourceManager</a></dt>
<dd><p>ResourceManager class manages a collection of localized text bundles</p>
</dd>
<dt><a href="#TextBundle">TextBundle</a></dt>
<dd><p>TextBundle classes manages text resources for a given locale.</p>
</dd>
</dl>

<a name="PropertiesParser"></a>

## PropertiesParser
Parse a Java .properties definition

**Kind**: global class  

* [PropertiesParser](#PropertiesParser)
    * [new PropertiesParser(content)](#new_PropertiesParser_new)
    * [.load(propertyFile)](#PropertiesParser.load) ⇒ <code>Promise</code>
    * [.loadSync(propertyFile)](#PropertiesParser.loadSync) ⇒ <code>[PropertiesParser](#PropertiesParser)</code>

<a name="new_PropertiesParser_new"></a>

### new PropertiesParser(content)

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Content of the .properties file to parse |

<a name="PropertiesParser.load"></a>

### PropertiesParser.load(propertyFile) ⇒ <code>Promise</code>
Loads and parses a .properties file

**Kind**: static method of <code>[PropertiesParser](#PropertiesParser)</code>  
**Returns**: <code>Promise</code> - Returns a promise eventually fulfilled to a newly created PropertiesParser  

| Param | Type | Description |
| --- | --- | --- |
| propertyFile | <code>string</code> | Path to the .properties file (must be UTF-8 encoded) |

<a name="PropertiesParser.loadSync"></a>

### PropertiesParser.loadSync(propertyFile) ⇒ <code>[PropertiesParser](#PropertiesParser)</code>
Loads and parses synchronously a .properties file

**Kind**: static method of <code>[PropertiesParser](#PropertiesParser)</code>  
**Returns**: <code>[PropertiesParser](#PropertiesParser)</code> - Returns a newly created PropertiesParser  

| Param | Type | Description |
| --- | --- | --- |
| propertyFile | <code>string</code> | Path to the .properties file (must be UTF-8 encoded) |

<a name="ResourceManager"></a>

## ResourceManager
ResourceManager class manages a collection of localized text bundles

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| logger | <code>Logger</code> | Logger object which can be injected on the ResourceManager instance. It should have a bunyan/sap-json-logging compatible API. |


* [ResourceManager](#ResourceManager)
    * [new ResourceManager(basePath)](#new_ResourceManager_new)
    * [.getTextBundle(locale)](#ResourceManager+getTextBundle) ⇒ <code>[TextBundle](#TextBundle)</code>
    * [.loadTextBundle(locale)](#ResourceManager+loadTextBundle) ⇒ <code>Promise</code>
    * [.getMiddleware([localeAccessor])](#ResourceManager+getMiddleware) ⇒ <code>function</code>

<a name="new_ResourceManager_new"></a>

### new ResourceManager(basePath)

| Param | Type | Description |
| --- | --- | --- |
| basePath | <code>string</code> | Base path of the localized text resource files |

<a name="ResourceManager+getTextBundle"></a>

### resourceManager.getTextBundle(locale) ⇒ <code>[TextBundle](#TextBundle)</code>
Returns a TextBundle for a given locale

**Kind**: instance method of <code>[ResourceManager](#ResourceManager)</code>  

| Param | Type |
| --- | --- |
| locale | <code>string</code> | 

<a name="ResourceManager+loadTextBundle"></a>

### resourceManager.loadTextBundle(locale) ⇒ <code>Promise</code>
Retrieves a TextBundle for a given locale. Resources for the locale are loaded if they are not yet available.

**Kind**: instance method of <code>[ResourceManager](#ResourceManager)</code>  
**Returns**: <code>Promise</code> - Promise eventually fulfilled to a TextBundle for the requested locale  

| Param | Type |
| --- | --- |
| locale | <code>string</code> | 

<a name="ResourceManager+getMiddleware"></a>

### resourceManager.getMiddleware([localeAccessor]) ⇒ <code>function</code>
Returns a middleware function taking care of loading the resources for the request locale.

**Kind**: instance method of <code>[ResourceManager](#ResourceManager)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [localeAccessor] | <code>string</code> &#124; <code>function</code> | <code>&quot;&#x27;locale&#x27;&quot;</code> | Accessor property of function to extract the locale from the HTTP Request. Default to 'locale' (i.e. locale is req.locale) |

<a name="TextBundle"></a>

## TextBundle
TextBundle classes manages text resources for a given locale.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | TestBundle main locale |


* [TextBundle](#TextBundle)
    * [new TextBundle([propertyFile], [locale], [options])](#new_TextBundle_new)
    * _instance_
        * [.getLocale()](#TextBundle+getLocale) ⇒ <code>string</code>
        * [.getText(key, [...args])](#TextBundle+getText) ⇒ <code>string</code>
        * [.load()](#TextBundle+load) ⇒ <code>Promise</code>
        * [.loadSync()](#TextBundle+loadSync)
    * _static_
        * [.fallbackLocale](#TextBundle.fallbackLocale) ⇒ <code>string</code>

<a name="new_TextBundle_new"></a>

### new TextBundle([propertyFile], [locale], [options])

| Param | Type | Description |
| --- | --- | --- |
| [propertyFile] | <code>string</code> | Path to the base text resource property file. If not provided, options.path is taken. Either propertyFile or options.path must be provided. |
| [locale] | <code>string</code> | Bundle locale (use of standard BCP 47 locales is recommended, POSIX is supported), default to 'en'. 'propertyFile' argument is required to be able to pass locale as string argument. |
| [options] | <code>object</code> | Bundle options (for legacy compatibility). |
| options.locale | <code>string</code> | Bundle locale (for legacy compatibility). |
| options.path | <code>string</code> | Path to the base text resource property file (for legacy compatibility). |

<a name="TextBundle+getLocale"></a>

### textBundle.getLocale() ⇒ <code>string</code>
Returns the TextBundle main locale

**Kind**: instance method of <code>[TextBundle](#TextBundle)</code>  
<a name="TextBundle+getText"></a>

### textBundle.getText(key, [...args]) ⇒ <code>string</code>
Returns a formatted message for the given resource key and arguments

**Kind**: instance method of <code>[TextBundle](#TextBundle)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Resoruce key |
| [...args] | <code>object</code> |  |

<a name="TextBundle+load"></a>

### textBundle.load() ⇒ <code>Promise</code>
Asynchronously loads a bundle resources (including the full fallback chain)

**Kind**: instance method of <code>[TextBundle](#TextBundle)</code>  
**Returns**: <code>Promise</code> - Promise eventually fulfilled to the bundle.  
<a name="TextBundle+loadSync"></a>

### textBundle.loadSync()
Synchronously loads a bundle resources for its main locale (without the fallback chain)

**Kind**: instance method of <code>[TextBundle](#TextBundle)</code>  
<a name="TextBundle.fallbackLocale"></a>

### TextBundle.fallbackLocale ⇒ <code>string</code>
Returns the fallback of a given locale (e.g. 'fr_FR' => 'fr' => 'en' => '')

**Kind**: static property of <code>[TextBundle](#TextBundle)</code>  

| Param | Type |
| --- | --- |
| locale | <code>string</code> | 

