@sap/xsjs-test
=========

Unit test framework for the compatibility layer (XS runtime)

Simple steps to use xsjs-test in your project:
* Declare a dev dependency to @sap/xsjs-test in your XSJS application project (package.json)
* Your tests are in folder test/ parallel to package.json and lib/
* Configure a xstest script in your application package.json which runs xstest script
* Run with npm run xstest


## Details

1) Dev dependency to @sap/xsjs-test
Please verify which version of @sap/xsjs-test is released and refer to it accordingly. Dev dependency means that @sap/xsjs-test will be installed only in local dev installation, not in productive installation. Another option would be to install @sap/xsjs-test globally on your PC:
```Shell
npm install -g @sap/xsjs-test
```
Then you do not need to include it in dev dependency, it is visible everywhere on your workstation.

2) Test folder
Normally xsjs runtime files are under xsjs/  folder.
So following paths are expected:
<<project>>/xsjs/package.json
<<project>>/xsjs/lib/
<<project>>/xsjs/test/
The last path is where the tests are expected. Of course you are free to put the tests in another folder, but then a special configuration is required.

3) Test script
There is a normal binary script defined in bin folder. The normal way would be to define a script in the application package.json
```JSON
"scripts": {
  "xstest" : "xstest"
  }
```


4) Test execution
```Shell
npm run xstest
```

5) Example configuration in file ./test/xstest.json
```javascript
{
    test: {
        format: "xml", // optional, default: "html"
        pattern: ".*[Tt]Test", // optional, default: "".*[Tt]Test"
        reportdir: "test results folder", // optional, default: "."
        filename: "test results file name without extension" // optional, default: "report"
    },
    coverage: {
        reporting: {
            reports: ["json"] // default: "html"
        },
        dir: "coverage results folder", // optional, default: "{test.reportdir}/coverage"
        filename: "coverage results file name without extension" // optional, default "coverage"
    }
}
```

## Known Restrictions

* jasmine.callHTTPService() (see http://help.sap.com/hana/SAP_HANA_XS_Unit_JavaScript_API_Reference_en/jasmine.html ) is not supported because of the different underlying architecture of XSA. Instead of writing integration tests going through http, you should rely on pure unit tests to check the expected responses.
* jasmine.tags is not supported.
* jasmine.addProfile() is not supported.
* describe( ... ).x() is not supported.
* spys on globals like Date, Array, etc. won't work because each xsjslib is executed in a separate context. Try to stub/spy/mock via local members of your test instead.
* jasmine.hdbConnection not supported (use jasmine.dbConnection)
* jasmine.log is not supported (use console.log)
* describeDB() and xdescribeDB() are not supported because they were already deprecated before (see http://help.sap.com/hana/SAP_HANA_XS_Unit_JavaScript_API_Reference_en/global.html#describeDb )
* jasmine expect().toThrowError() is not supported (use toThrow(new Error()) instead)
* tableUtils::copy*UserSchema() (http://help.sap.com/hana/SAP_HANA_XS_Unit_JavaScript_API_Reference_en/module-tableUtils-TableUtils.html) are not supported on HDI because there is a) no schema to copy from and b) by default no writable user schema
* tableUtils.fillFromCsvFile() is not supported. Use HDI *.tableimport files instead to fill your HDI container with test data.
* mockstar is discouraged/deprecated. Use HDI containers instead. If you need to reference larger test data, use HDI synonyms.

