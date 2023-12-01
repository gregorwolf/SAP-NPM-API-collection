Custom Exits
============

The xsodata library supports custom exits to enable the application to define JavaScript functions which are called while processing the OData request. These exits can be implemented either as JavaScript function or as stored procedure.

## Available exits

Exits are existing for **Create**ing (POST), **Update**ing (PUT) and **Delete**ing (DELETE) entities and for the database commit ( **precommit** and **postcommit** ), but not for simple **read** requests.

## Exit Definition in an xsodata File

Sample

```xsodata
service {
    "my_name_space::customers" as "Customers"
        keys("CustomerID")
        navigates("CustomerToProduct" as "Product" from principal)
        create forbidden
        update using "sap.abc.xyz:myExits.xsjslib::updateEntity"
            events( before "sap.abc.xyz:myLoggingInfrastructure.xsjslib::log" )
        delete forbidden;
}
```

### Exit Types

* **Validation Exits**
    Validation exits allow the application to validate data before/after the data is changed on the database. Any error returned from the application exit function stops the further processing of the request and a rollback is performed. For batch requests also the processing of further requests in the same change set is stopped.

    * Create
        * ```create events (before "<custom exit 1>", after "<custom exit 2>", ...)```
            The xsodata library calls the exit **custom exit 1** before creating the entity, and the exit **custom exit 2** after creating the entity
        * ```create events (precommit "<custom exit 1>", postcommit "<custom exit 2>", ...)```
            The xsodata library calls the exit **custom exit 1** before committing the data, and the exit **custom exit 2** after committing
        * ```create forbidden```
            Prohibits any create on the entity set

    * Update
        * ```update events (before "<custom exit 1>", after "<custom exit 2>", ...)```
            The xsodata library calls the exit **custom exit 1** before creating the entity, and the exit **custom exit 2** after updating the entity
        * ```update events (precommit "<custom exit 1>", postcommit "<custom exit 2>", ...)```
            The xsodata library calls the exit **custom exit 1** before committing the data, and the exit **custom exit 2** after committing
        * ```update forbidden```
            Prohibits any update of the entity

    * Delete
        * ```delete events (before "<custom exit 1>", after "<custom exit 2>", ...)```
            The xsodata library calls the exit **custom exit 1** before creating the entity, and the exit **custom exit 2** after deleting the entity
        * ```delete events (precommit "<custom exit 1>", postcommit "<custom exit 2>", ...)```
            The xsodata library calls the exit **custom exit 1** before committing the data, and the exit **custom exit 2** after committing
        * ```delete forbidden```
            Prohibits the deletion of the entity

* **Modification Exits**
    * Create
        * ```create using "<custom exit>"```
            The xsodata library calls the exit **custom exit** instead of creating the entity directly
    * Update
        * ```update using "<custom exit>"```
            The xsodata library calls the exit **custom exit** instead of updating the entity directly
    * Delete
        * ```delete using "<custom exit>"```
            The xsodata library calls the exit **custom exit** instead of deleting the entity directly

* **Combination of Modification and Validation Exits**
   Validation and Modification exits can be combined as follows
   ```create using "<custom exit>" events(before "<custom exit 1>", after "<custom exit 2>", ...)```

**Note**
You **must not** insert in a validation exit the data from the temporary table into the real table.
The xsodata library inserts after the validation exit processing the temporary table content into the real table, which will fail if the data is already inserted (dublicate key, constraint violation).

### Exit Execution Order

The execution order of exits for single OData requests:

* **before**
* **using** (or update by lib happens)
* **after**
* **precommit**
* commit happens
* **postcommit**

The execution order of exits for batch OData requests (assuming there are 2 requests and a change set with 2 requests inside the batch request)

* Processing of request 1
    * **before**
    * **using**
    * **after**
    * **precommit**
    * **postcommit**
* Processing of change set
    * Processing of first request in change set
        * **before**
        * **using**
        * **after**
    * Processing of second request in change set
        * **before**
        * **using**
        * **after**
    * Commit processing
        * **precommit** (of first request)
        * **precommit** (of second request)
        * commit happens
        * **postcommit** (of first request)
        * **postcommit** (of second request)
* Processing of request 2
    * **before**
    * **using**
    * **after**
    * **precommit**
    * **postcommit**

## Exit Implementation

### 1. As xsjs - JavaScript function

#### Exit Function Content

The JavaScript function needs to be implemented within an *.xsjslib file. There is no need to use the export mechanism of node.js, a plain function is fine.

    //myLoggingInfrastructure.xsjslib

    function my_create_before_exit(param) {
    }

The input parameter `param` is an object with the following content:

* connection: The SQL connection used in the OData request
* beforeTableName: The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
* afterTableName: The name of a temporary table with the single entry after the operation (UPDATE and CREATE events only)

The content of the temporary tables can be fetched using the available connection as the following example shows:

```js
var stmt = 'select * from "'+ param.afterTableName + '"',
    xStmt = param.connection.prepareStatement( stmt ).executeQuery(),
    data = xStmt._rows[0]; // {col1:val1, col2:val2, ...}
```

For more details check example validation and modification: **Appendix 1**
For the service xsodata file check: **Appendix 2**


#### Exceptions Handling

The developer of the custom exit function has two possibilities to return an error:

1. Throw an error using `throw "error message";`
   This way the response will have the status code: 500, and this can't be controlled.
2. Return an object with the following structure
    ```
    return {
        HTTP_STATUS_CODE: code,   // e.g. 400, 500, etc.
        ERROR_MESSAGE: 'error message',
        DETAILS: 'more details'
    };
    ```
    This way the developer is able to add more details, and control the response status code.

#### Referencing the Exit Function

Within the xsodata files, exit functions are referenced with a colon separated string in the format  ```<directory>:<file>::<function>```.
Considering ```sap.abc.xyz:myLoggingInfrastructure.xsjslib::my_create_before_exit``` as function reference, the first part ```sap.abc.xyz``` references the directory, the second part ```myLoggingInfrastructure.xsjslib``` the xsjslib file and the third part ```my_create_before_exit``` the exit function.

**Example:**

An xsjs startup configuration with two root folders <app directory>/_SYS_REPO and <app directory>/my_content like this:

    //Start xsjs listener
    xsjs({
       compress: false,
       rootDirs: [
           path.join(__dirname, '_SYS_REPO')
           path.join(__dirname, 'my_content')
       ],
       ...}).listen(...)

Requires that the file ```myLoggingInfrastructure.xsjslib``` is stored in location ```<app directory>/_SYS_REPO/sap/abc/xyz/myLoggingInfrastructure.xsjslib``` or ```<app directory>/my_content/sap/abc/xyz/myLoggingInfrastructure.xsjslib```


### 2. As StoredProcedure

Within the xsodata files exit procedures are referenced with a colon separated string in the format  ```<package>::<procedure>```. Considering ```exits::proc_create_update``` as function reference, the first part ```exits``` references the package, the second part ```proc_create_update``` the procedure.


## Exit Parameters

The API for an exit function is the same as in *xs classic* (XS1).
Refer to the ``SAP_HANA_Developer_Guide_for_SAP_HANA_Studio_en_SPS10.pdf`` for more details.


## Appendix 1

```js
function createEmployeeInstead(param) {
    var after = param.afterTableName,
        stmt = 'select * from "'+ after + '"',
        pStmt = param.connection.prepareStatement( stmt ),
        xStmt = pStmt.executeQuery(),
        cols = xStmt._columnNames,// [col1, col2, ...]
        data = xStmt._rows[0];// {col1:val1, col2:val2, ...}

    pStmt.close();

    if (data['id']>100) {
        console.log('** Err: Not Inserted, throwing ..');
        // logs can be checked using: xs logs <backend-app> --recent

        throw "ID must not be greater than 100";
    }
    else {
        stmt = 'insert into "com.sap.xsa.samples::EmpOffice.Employee" ("id", "name", "age", "location.id") values (' ;
            stmt += data['id'] + ',';
            stmt += '\'' + data['name'] + '\',';
            stmt += '\'' + data['age'] + '\',';
            stmt += data['location.id'] + ')';

        console.log('** Inserted');
        console.log(stmt);

        pStmt = param.connection.prepareStatement( stmt );
        xStmt = pStmt.executeQuery();
        pStmt.close();
    }
}

function createOfficeBefore(param) {
    var after = param.afterTableName,
        stmt = 'select * from "'+ after + '"',
        pStmt = param.connection.prepareStatement( stmt ),
        xStmt = pStmt.executeQuery(),
        cols = xStmt._columnNames,// [col1, col2, ...]
        data = xStmt._rows[0];// {col1:val1, col2:val2, ...}

    pStmt.close();

    if (data['id']>50) {
        console.log('** Err: Not Inserted');

        return { HTTP_STATUS_CODE: 400, ERROR_MESSAGE: 'ID is beyond the range', DETAILS: 'ID can not be greater than 50'};
    } else {
        console.log('** Continue to create');
    }
}
```


## Appendix 2

```js
service {
   	"com.sap.xsa.samples::EmpOffice.Office" as "Office"
   		navigates(
   			"a_OfEmp" as "nf_Employee" from dependent
   		)
   		create events(before "odata.resources:custom.xsjslib::createOfficeBefore");

   	"com.sap.xsa.samples::EmpOffice.Employee" as "Employee"
   		navigates(
			"a_OfEmp" as "ne_Office" from principal
		)
		create using "odata.resources:custom.xsjslib::createEmployeeInstead";

   	association "a_OfEmp"
        	principal "Employee"("location.id") multiplicity "*"
    		dependent "Office"("id") multiplicity "1";
}
```
