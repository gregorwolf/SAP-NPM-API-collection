# Differences between XSJS on Node.js and HANA XS Classic

<!-- toc -->

- [Legacy Database API ($.db)](#legacy-database-api-db)
- [Database API ($.hdb)](#database-api-hdb)
- [Jobs API ($.jobs)](#jobs-api-jobs)
- [Network API ($.net)](#network-api-net)
- [Security API ($.security)](#security-api-security)
- [Session API ($.session)](#session-api-session)
- [Text Analysis and Text Mining ($.text)](#text-analysis-and-text-mining-text)
- [Trace API ($.trace)](#trace-api-trace)
- [Util API ($.util)](#util-api-util)
- [Request Processing API ($.web)](#request-processing-api-web)
- [ODATA](#odata)
- [Repository access ($.repo)](#repository-access-repo)
- [JavaScript VM](#javascript-vm)
- [Other](#other)

<!-- tocstop -->

## Legacy Database API ($.db)
* getX functions where X is some type
  * do not perform as many type conversions as in HANA XS Classic
* `$.db.ResultSet.getString()`
  * works for unicode characters (e.g. if the column from the ResultSet is NSTRING)
* `$.db.ResultSet.getClob()`
  * works for unicode characters (e.g. if the column from the ResultSet is NCLOB)
* `$.db.ResultSet.close` does not close the result set.
* ParameterMetaData
  * getParameterType and getParameterTypeName may return different values from HANA XS Classic, e.g.
    * NSTRING returned instead of SHORTTEXT
    * DECIMAL returned instead of SMALLDECIMAL
  * table output parameters from stored procedures are not described in ParameterMetaData
  * isNullable - Not supported
  * isSigned - Not supported
  * hasDefault - Not supported
* ResultSetMetaData
  * getColumnType and getColumnTypeName may return different values from HANA XS Classic, similarly to ParameterMetaData
  * getCatalogName - Not supported
  * getColumnDisplaySize - Not supported
* PreparedStatement, CallableStatement - setDate, setTime, setTimestamp
  * not all date/time formats are supported

## Database API ($.hdb)
* The ResultSet metadata object does not contain the following properties:
  * catalogName
  * displaySize
* The ResultSet metadata uses `true` and `false` instead of `1` and `0` for the isNullable property
* Date objects received for the TIME data type may have arbitrary values for year, month and day.
* Values returned for the TEXT and BINTEXT data types are strings instead of ArrayBuffers.
* Objects representing a date-time value via a string and optionally a format for parsing (for example, `{ '$date': '...' }` or `{ '$timestamp': '...', '$format': '...' }`) are not supported as input parameters.
* Default conversions are not applied for input table parameters.
* `$.hdb.ResultSet`
  * if there is a column with a numeric name (e.g. "99") and this number is equal
or greater than the number of columns, accessing this column by name (e.g. `row["99"]`)
in XS Classic returns `undefined` while in XS Advanced it returns the column value.
  * columns with numeric names which are within the range of possible column indices
  are non-enumerable in XS Advanced.
* Values of INOUT/OUT procedure parameters are retrieved using upper case parameter names.
* It is possible to execute a `CALL` procedure statement with `$.hdb.Connection.executeQuery` or `$.hdb.Connection.executeUpdate`.
Output parameters cannot be retrieved from the result of such a call,
only the first output table is returned (if there are any output tables).
**Note** that this is not supported in XS Classic and is not recommended to be used in _@sap/xsjs_.
`$.hdb.Connection.loadProcedure` or `$.db.Connection.prepareCall` should be used instead.

## Jobs API ($.jobs)
* All jobs (defined in `.xsjob` files) are active by default
* `$.jobs.Job`
  * `sqlcc` property in the constructor parameter is not supported
  * `getConfiguration` method is not supported
* In XS Classic the ID of a job schedule is a number, while in XSJS it is a uuid (a string with 36 characters)
* In XSJS only a Date object is accepted for a date/time property, while XS Classic accepts also an object with `value` and `format` properties allowing custom date formats
* The `JobLogObject` does not support the following properties:
  * host
  * port
  * action
  * user
  * thread_id

## Network API ($.net)
* Destinations
  * only the following properties are supported - host, port, pathPrefix, useProxy, proxyHost, proxyPort, authType, username, password
* Mail, SMTPConnection
  * proxy support and Digest-MD5 authentication method are not supported

## Security API ($.security)
Supported.
**Note:** `$.security.Store` - store files are created automatically

## Session API ($.session)

Only the following properties are supported:
  * user
  * language
  * getUsername()
  * hasAppPrivilege()
  * assertAppPrivilege()

**Note:** `$.session.language` - holds the same value as `$.request.language` unless `xsSessionLanguage` cookie is set. In comparison to XS Classic, XSJS does not set this cookie. In case the `xsSessionLanguage` cookie is provided, it will be honored in the same manner as in XS Classic.

New properties supported:
  * securityContext - holds the security context provided by `@sap/xssec` security library. This property will be `undefined` in case there is no authenticated user, e.g. the application does not require authentication. The security context provides synchronous and asynchronous functions. Calling sync functions is straight forward, while calling async functions should be done by adding `.sync` property. See [NPM packages support](README.md#npm-packages-support).


## Text Analysis and Text Mining ($.text)
$.text.mining supported.<br />
$.text.analysis supported when _@sap/xsjs_ is connected to HANA 2.0.

## Trace API ($.trace)
Supported.

## Util API ($.util)
 * $.util.Zip is partially supported:
    * Originally in XS Classic the Zip constructor accepts setting object with two properties: `password` and `maxUncompressedSizeInBytes`.
      Currently password-protected zips are not supported so the `password` property is forbidden.
    * If an entry is added to a Zip object its value no longer gets converted to ArrayBuffer, but remains the same.

 * $.util.compression.gunzip does not support the `maxUncompressedSizeInBytes` parameter.
 * $.util.SAXParser - partial support.
    * `stop` and `resume` methods are not supported.
    * `currentByteIndex`, `currentColumnNumber` and `currentLineNumber` properties are not supported.
    * `attlistDeclHandler`, `endDoctypeDeclHandler`, `endNameSpaceDeclHandler`, `entityDeclHandler`, `externalEntityRefHandler`, `notationDeclHandler`, `processingInstructionHandler`, `startDoctypeDeclHandler`, `startNameSpaceDeclHandler`, `xmlDeclHandler` handlers are not supported.
    * namespaces and entities are not supported.

## Request Processing API ($.web)
Supported with the following differences:
- Headers starting with _~server_ are not available.
- Duplicated custom incoming request headers are represented as joined headers. For example, if a client sends a header `abc` once with value of `1` and second time with a value of `2`,
`$.request.headers.get('abc')` will result into `'1, 2'` instead of `['1', '2']`.
- webResponse.setBody(body) - In XS Classic if body is null, undefined or object, an exception is thrown. In XS Advanced the response is 'null', 'undefined' and JSON.stringify(object), respectively.

## ODATA
Supported, including SQL and JavaScript exists.

## Repository access ($.repo)
Not supported.

## JavaScript VM
Node.js uses V8 from Google, while HANA XS uses SpiderMonkey from Mozilla.
* In XS Classic xsjs:
  * always runs implicitly in strict mode.
  * supports conditional catches (non-standard):
    ```js
    try {
        willfail() // throws FooException
    } catch (e if e instanceof FooException) {
        //do something
    }
    ```
    Node.js / V8 does not support this `if` construct in the catch statement - you can only provide a single parameter name, e.g. 'e'.

* `instanceof` - `.xsjs` files run in isolated contexts which have different references for the built-in Node.js types.
 This will cause `instanceof` not to work as expected. You can take a look on [this issue](https://github.com/nodejs/node-v0.x-archive/issues/1277) in Node.js.
 This issue applies for built-in types like:  **Array**, **String**, **RegExp**, **Number**, etc.<br />
 For **Array**, you should use `Array.isArray` instead of `instanceof Array`.<br />
 For **String** it is suitable to use `typeof`.
* With newer versions of Node.js (and V8 respectively), there might be fixes in the time zone offsets which can result in different string representations of `Date` objects (which take the timezone offset into consideration) compared to XS Classic.

## Other
 * DXC (Direct Extractor Connection) and xsxmla are not supported.
 * Constants inside `.xsjslib` (defined with `const`) are not visible outside the library.
