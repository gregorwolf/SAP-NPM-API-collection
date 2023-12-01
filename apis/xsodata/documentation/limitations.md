Limitations & General Incompatibilities and Differences
=======================================================

## Batch content

**xsodata** uses CRLF as line separator instead of LF as in XSC SP10. This is defined in 
See "2.2.7.6.4 Batch Request Syntax" in [ms-odata] specification "June, 10 2011" 
 
## Merge / Patch operations

The Merge / Patch operations are not supported.

## Associations

### Referential Constraints

The metadata response in **XSC SP10** only returns referential constraints, if they
have been configured in the xsodata file. **XSC SP8** returned them for every
association. **xsodata** adheres to XSC SP10.

