# Native DataStore Object (NDSO) Service Backend
This Node.js package contains service implementations (tasks) of the Native
DataStore Object. The NDSO backend is part of the SAP HANA Data Warehousing
Foundation product.

As such it is used, for example, by the DataStore Manage UI of the Database
Explorer or the Data Warehouse Scheduler.

[Change Log](./CHANGELOG.md)

# Usage
NDSO tasks are exposed as functions that usually require the following context
as function arguments:
- Tracer: for logging purposes, usually instance of `@sap/logging`
- [SAP HANA Database Clients (node-hdb)](https://github.com/SAP/node-hdb),
  most tasks require two clients to ensure data consistency while writing logs
  and status updates
- schema and NDSO name (= name of the main CDS context that is annotated as
  NDSO)
- callback function which, by default, is called after the task has finished.
- task-specific parameters (e.g. an array of load requests in case of the
  Activate operation)

Note that as this being a technical reuse package you are not supposed to
consume it directly in a custom application. It is used by the aforementioned
SAP products/tools though.

## Query Options
Some tasks offer a parameter `queryOptions` that allow for backend-side paging,
sorting and filtering. The task expects it to be an object like this:
``` javascript
{
  lim: 100,             // LIMIT in SQL: returns up to 100 rows
  off: 200,             // OFFSET in SQL: skips first 200 rows
  flt: {                // builds WHERE in SQL; multiple columns are connected
    COLUMN1: 'value1',  // by AND
    COLUMN2: 123,
    COLUMN3: [          // array elements for same column are connected by OR
      {
        op: 'BT',       // BT resolves to 'BETWEEN ? AND ?'
        val: [10, 20]
      },
      {
        op: 'EQ',       // EQ resolves to 'IN (?,?,?)'
        val: [95, 99, 101]
      }
    ]
  },
  fltMode: 'PARTIAL',   // instead of 'WHERE = ?' this resolves to 'WHERE LIKE ?'
                        // and wildcards around value (e.g. '%value1%')
                        // default is 'EXACT'
  ord: [                // builds ORDER BY in SQL
    {
      col: 'COLUMN1'    // defaults to 'ASC'
    },
    {
      col: 'COLUMN3',
      dir: 'DESC'
    }
  ]
}
```

# Operations
This package provides NDSO tasks as functions. Work tasks that affect NDSO
(meta)data are called operations. The currently offered operations are listed
here.
- Activate
- Add Subscriber
- Check Metadata Consistency
- Cleanup Changelog
- Cleanup Metadata
- Delete All
- Delete Request
- Delete With Filter
- Remove Subscriber
- Repair Running Operations
- Reset Subscriber
- Rollback
- Store CSV
- Store SQL
