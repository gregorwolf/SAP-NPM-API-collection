# OData V2 or V4 EDM Datatype mapping to CAP CDS 

oData V2/V4 |  CAP CDS | Comments (if any) |
------------|----------| ----------|
Edm.Guid  |cds.UUID    |  |
Edm.Boolean  |cds.Boolean| |
Edm.Int16  |cds.Integer| |
Edm.Int32 |cds.Integer| |
Edm.Int64 | cds.Integer64| | 
Edm.Decimal | cds.DecimalFloat| | 
Edm.Decimal Precision > 0 | cds.Decimal| |
Edm.Single  | cds.Double @odata.type: “Edm.Single”| |
Edm.Double  | cds.Double| |
Edm.Double Precision > 0 |cds.Double| |
Edm.String  | cds.LargeString| |
Edm.String MaxLength > 0 |cds.String| |
Edm.Binary MaxLength > 0 |  cds.Binary | |
Edm.Binary |  cds.LargeBinary | |
Edm.Byte  |cds.Integer| |
Edm.Byte MaxLength > 0 |cds.Binary| |
Edm.SByte  |cds.Integer| |
Edm.Stream |  cds.LargeBinary @odata.type: “Edm.Stream” | |
Edm.DateTimeOffset Precision : Microsecond |  cds.Timestamp, @odata.type: “Edm.DateTimeOffset”, @odata.precision:<> | The value of precision from odata will be mapped to @odata.precision | 
Edm.DateTimeOffset Precision : Second | cds.DateTime, @odata.type: “Edm.DateTimeOffset”, @odata.precision:0| |
 | |
**Below attributes are applicable to V2 only**   |
| |
Edm.DateTime Precision : Microsecond |  cds.Timestamp, @odata.type: “Edm.DateTime”, @odata.precision:<> | The value of precision from odata will be mapped to @odata.precision | |
Edm.DateTime Precision : Second | cds.DateTime, @odata.type: “Edm.DateTime”, @odata.precision:0| |
Edm.Time  |cds.Time| |
Edm.DateTime sap:display-format="Date" |cds.Date| |
Edm.DateTimeOffset sap:display-format="Date" |cds.Date||
**Below attributes are applicable to V4 only** |  
| |
Edm.TimeOfDay |cds.Time||
Edm.Date |cds.Date||


