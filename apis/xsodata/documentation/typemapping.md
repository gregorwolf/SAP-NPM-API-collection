Type mapping OData <--> HANA
============================

| SAP HANA SQL Type | OData EDM Type    |
|-------------------|-------------------|
| Time              |   Edm.Time        |
| Date              |   Edm.DateTime    |
| SecondDate        |   Edm.DateTime    |
| LongDate          |   Edm.DateTime    |
| Timestamp         |   Edm.DateTime    |
| TinyInt           |   Edm.Byte        |
| SmallInt          |   Edm.Int16       |
| Integer           |   Edm.Int32       |
| BigInt            |   Edm.Int64       |
| SmallDecimal      |   Edm.Decimal     |
| Decimal           |   Edm.Decimal     |
| Real              |   Edm.Single      |
| Float             |   Edm.Single      |
| Double            |   Edm.Double      |
| Varchar           |   Edm.String      |
| NVarchar          |   Edm.String      |
| Char              |   Edm.String      |
| NChar             |   Edm.String      |
| Binary            |   Edm.Binary      |
| Varbinary         |   Edm.Binary      |     
| Alphanum          |  Edm.String      |
| Shorttext*          |  Edm.String      |
| Blob*           |   Edm.Binary      |
| Clob*           |   Edm.String      |
| NClob*           |   Edm.String      |

* not as table key type
