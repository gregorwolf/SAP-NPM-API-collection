# 2.0.0 (2020-09-04)


### Features

* descriptions moved from @description to doc comments
* improved descriptions comments
* **bpm:** sap.odm.bpm.Task: added root entity 'sap.odm.bpm.Task'
* **bpm:** sap.odm.bpm.TaskDefinition: added root entity 'sap.odm.bpm.TaskDefinition'
* **common:** sap.odm.common.CurrencyCodes: new element 'minorUnit'
* **common:** sap.odm.common.TimeZoneCodes: added code list 'sap.odm.common.TimeZoneCodes'
* **common:** sap.odm.common.address.PostalAddress: new element 'coordinates'
* **common:** sap.odm.common.address.PostalAddress: new element 'timeZone'
* **common:** sap.odm.common.address.Street: added type 'sap.odm.common.address.Street'
* **common:** sap.odm.common.address.SecondaryRegion: added type 'sap.odm.common.address.SecondaryRegion'
* **common:** sap.odm.common.address.TertiaryRegion: added type 'sap.odm.common.address.TertiaryRegion'
* **common:** sap.odm.common.address.Town: added type 'sap.odm.common.address.Town'
* **common:** sap.odm.common.address.District: added type 'sap.odm.common.address.District'
* **common:** sap.odm.common.GeoCoordinates: added type 'sap.odm.common.GeoCoordinates'
* **common:** sap.odm.common.URL: added type 'sap.odm.common.URL'
* **common:** sap.odm.common.URI: added type 'sap.odm.common.URI'
* **dpp:** sap.odm.dpp.DataController: added root entity 'sap.odm.dpp.DataController'
* **dpp:** sap.odm.dpp.Purpose: added root entity 'sap.odm.dpp.Purpose'
* **dpp:** sap.odm.dpp.Purpose2DataController: added root entity 'sap.odm.dpp.Purpose2DataController'
* **dpp:** sap.odm.dpp.TrackPurpose: added aspect 'sap.odm.dpp.TrackPurpose'
* **dpp:** sap.odm.dpp.PurposeReference: added type 'sap.odm.dpp.PurposeReference'
* **finance:** sap.odm.finance.ControllingAreaId: added type 'sap.odm.finance.ControllingAreaId'
* **workforce:** sap.odm.workforce.WorkforcePerson: New element 'purposes'
* **workforce:** sap.odm.workforce.WorkforcePerson: New element 'privateAddresses'
* **workforce:** sap.odm.workforce.WorkforcePerson: New element 'emails'
* **workforce:** sap.odm.workforce.WorkforcePerson: New element 'phones'
* **workforce:** sap.odm.workforce.WorkforcePerson: New element 'systemOfRecordKeys'
* **workforce:** sap.odm.workforce.WorkforcePerson: annotation '@odm.arrayOf' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.WorkforcePerson: New element 'photos'
* **workforce:** sap.odm.workforce.ProfileDetails: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.ProfileDetails: New element 'scriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.PrivateAddress: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: new element 'coordinates'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: new element 'timeZone'
* **workforce:** sap.odm.workforce.Email: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.Phone: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.SystemOfRecordKey: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.JobDetails: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.JobDetails: annotation '@odm.association' changed from 'sap.odm.orgunit.CompanyCode' to 'undefined's
* **workforce:** sap.odm.workforce.JobDetails: type has changed to 'sap.odm.workforce.JobClassificationAssociation' at element job
* **workforce:** sap.odm.workforce.JobDetails: new element 'ref'
* **workforce:** sap.odm.workforce.JobDetails: type has changed to 'sap.odm.workforce.WorkAssignmentRef' at element supervisorWorkAssignment
* **workforce:** sap.odm.workforce.JobDetails: new element 'id'
* **workforce:** sap.odm.workforce.JobDetails: new element 'workforcePerson'
* **workforce:** sap.odm.workforce.JobDetails: new element 'position'
* **workforce:** sap.odm.workforce.JobDetails: new element 'location'
* **workforce:** sap.odm.workforce.JobDetails: new element 'employeeClass'
* **workforce:** sap.odm.workforce.JobDetails: annotation '@odm.association' changed from 'sap.odm.humanresources.OrganizationalUnit' to 'undefined'
* **workforce:** sap.odm.workforce.JobDetails: type has changed to 'sap.odm.workforce.OrganizationalUnitAssociation' at element orgUnit
* **workforce:** sap.odm.workforce.JobDetails: new element 'ref'
* **workforce:** sap.odm.workforce.JobDetails: annotation '@odm.association' changed from 'sap.odm.humanresources.OrganizationalUnit' to 'undefined'
* **workforce:** sap.odm.workforce.JobDetails: type has changed to 'sap.odm.workforce.OrganizationalUnitAssociation' at element superOrdinateOrgUnit1
* **workforce:** sap.odm.workforce.JobDetails: new element 'ref'
* **workforce:** sap.odm.workforce.JobDetails: annotation '@odm.association' changed from 'sap.odm.humanresources.OrganizationalUnit' to 'undefined'
* **workforce:** sap.odm.workforce.JobDetails: type has changed to 'sap.odm.workforce.OrganizationalUnitAssociation' at element superOrdinateOrgUnit2
* **workforce:** sap.odm.workforce.JobDetails: new element 'ref'
* **workforce:** sap.odm.workforce.CompanyCode: annotation '@odm.association' changed from 'sap.odm.orgunit.CompanyCode' to 'undefined'
* **workforce:** sap.odm.workforce.JobClassificationAssociation: added type 'sap.odm.workforce.JobClassificationAssociation'
* **workforce:** sap.odm.workforce.WorkAssignmentRef: added type 'sap.odm.workforce.WorkAssignmentRef'
* **workforce:** sap.odm.workforce.Position: added type 'sap.odm.workforce.Position'
* **workforce:** sap.odm.workforce.Location: added type 'sap.odm.workforce.Location'
* **workforce:** sap.odm.workforce.OrganizationalUnitAssociation: added type 'sap.odm.workforce.OrganizationalUnitAssociation'
* **workforce:** sap.odm.workforce.PaymentDetails: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: annotation '@odm.entityAsType' changed from 'true' to 'undefined'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: new element 'coordinates'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: new element 'timeZone'
* **workforce:** sap.odm.workforce.Photo: added type 'sap.odm.workforce.Photo'
* **workforce:** sap.odm.workforce.common.EmployeeClassCodes: added code list 'sap.odm.workforce.common.EmployeeClassCodes'
* **workforce:** sap.odm.workforce.common.WorkforcePersonPhotoTypeCodes: added code list 'sap.odm.workforce.common.WorkforcePersonPhotoTypeCodes'
* **workforce:** sap.odm.workforce.foundation.JobClassification: added root entity 'sap.odm.workforce.foundation.JobClassification'
* **workforce:** sap.odm.workforce.foundation.OrganizationalUnit: added root entity 'sap.odm.workforce.foundation.OrganizationalUnit'
* **workforce:** sap.odm.workforce.foundation.OrganizationalUnitCategoryCodes: added code list 'sap.odm.workforce.foundation.OrganizationalUnitCategoryCodes'


### BREAKING CHANGES

* **common:** sap.odm.common.CountryCodes: element property 'cardinality' changed from 'undefined' to '{"max":1}' at currency
* **common:** sap.odm.common.CountryCodes: element property 'target' changed from 'undefined' to 'sap.odm.common.CurrencyCodes' at currency
* **common:** sap.odm.common.CountryCodes: New foreign key 'code' for association at element 'currency'
* **common:** sap.odm.common.address.CountrySubdivisionCodes: element/property 'changeType' removed from 'sap.odm.common.address.CountrySubdivisionCodes'
* **common:** sap.odm.common.ScriptedObject: element property 'cardinality' changed from 'undefined' to '{"max":1}' at scriptCode
* **common:** sap.odm.common.ScriptedObject: element property 'target' changed from 'undefined' to 'sap.odm.common.ScriptCodes' at scriptCode
* **common:** sap.odm.common.ScriptedObject: New foreign key 'code' for association at element 'scriptCode'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.StreetCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'primaryRegion'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'country'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'country'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'primaryRegion'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PostalAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PostalAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **common:** sap.odm.common.address.PostalAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.StreetCodes' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'primaryRegion'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **common:** sap.odm.common.address.PhysicalDeliveryAddress: New foreign key 'code' for association at element 'country'
* **common:** sap.odm.common.address.StreetInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.StreetInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.StreetCodes' at ref
* **common:** sap.odm.common.address.StreetInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.LocalityInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **common:** sap.odm.common.address.LocalityInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **common:** sap.odm.common.address.LocalityInfo: New foreign key 'code' for association at element 'primaryRegion'
* **common:** sap.odm.common.address.LocalityInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.LocalityInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **common:** sap.odm.common.address.LocalityInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.LocalityInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.LocalityInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **common:** sap.odm.common.address.LocalityInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.LocalityInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.LocalityInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **common:** sap.odm.common.address.LocalityInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.LocalityInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.LocalityInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **common:** sap.odm.common.address.LocalityInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.RegionInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **common:** sap.odm.common.address.RegionInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **common:** sap.odm.common.address.RegionInfo: New foreign key 'code' for association at element 'primaryRegion'
* **common:** sap.odm.common.address.RegionInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.RegionInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **common:** sap.odm.common.address.RegionInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.RegionInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.RegionInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **common:** sap.odm.common.address.RegionInfo: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.CountryLevelInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **common:** sap.odm.common.address.CountryLevelInfo: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **common:** sap.odm.common.address.CountryLevelInfo: New foreign key 'code' for association at element 'country'
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: New foreign key 'code' for association at element 'country'
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: New foreign key 'code' for association at element 'primaryRegion'
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **common:** sap.odm.common.address.AlternativeDeliveryAddress: New foreign key 'code' for association at element 'ref'
* **common:** sap.odm.common.managed: element/property 'createdBy' removed from 'sap.odm.common.managed'
* **common:** sap.odm.common.managed: element/property 'modifiedBy' removed from 'sap.odm.common.managed'
* **common:** sap.odm.common.managed: element/property 'createdByUuid' removed from 'sap.odm.common.managed'
* **common:** sap.odm.common.managed: element/property 'modifiedByUuid' removed from 'sap.odm.common.managed'
* **common:** sap.odm.common.address.DistrictNameCode: type 'sap.odm.common.address.DistrictNameCode' removed
* **common:** sap.odm.common.address.SecondaryRegionNameCode: type 'sap.odm.common.address.SecondaryRegionNameCode' removed
* **common:** sap.odm.common.address.StreetNameCode: type 'sap.odm.common.address.StreetNameCode' removed
* **common:** sap.odm.common.address.TertiaryRegionNameCode: type 'sap.odm.common.address.TertiaryRegionNameCode' removed
* **common:** sap.odm.common.address.TownNameCode: type 'sap.odm.common.address.TownNameCode' removed
* **finance:** sap.odm.finance.costobject.CostCenter: element property 'cardinality' changed from 'undefined' to '{"max":1}' at responsible
* **finance:** sap.odm.finance.costobject.CostCenter: element property 'target' changed from 'undefined' to 'sap.odm.workforce.WorkforcePerson' at responsible
* **finance:** sap.odm.finance.costobject.CostCenter: type has changed to 'cds.Association' at element responsible
* **finance:** sap.odm.finance.costobject.CostCenter: New foreign key 'id' for association at element 'responsible'
* **finance:** sap.odm.finance.costobject.Attributes: element property 'cardinality' changed from 'undefined' to '{"max":1}' at responsible
* **finance:** sap.odm.finance.costobject.Attributes: element property 'target' changed from 'undefined' to 'sap.odm.workforce.WorkforcePerson' at responsible
* **finance:** sap.odm.finance.costobject.Attributes: type has changed to 'cds.Association' at element responsible
* **finance:** sap.odm.finance.costobject.Attributes: New foreign key 'id' for association at element 'responsible'
* **finance:** sap.odm.finance.costobject.ProjectControllingObject: element property 'cardinality' changed from 'undefined' to '{"max":1}' at objectType
* **finance:** sap.odm.finance.costobject.ProjectControllingObject: element property 'target' changed from 'undefined' to 'sap.odm.finance.costobject.ProjectControllingObjectTypeCodes' at objectType
* **finance:** sap.odm.finance.costobject.ProjectControllingObject: New foreign key 'code' for association at element 'objectType'
* **finance:** sap.odm.finance.costobject.ProjectControllingObjectSourceId: element property 'cardinality' changed from 'undefined' to '{"max":1}' at objectType
* **finance:** sap.odm.finance.costobject.ProjectControllingObjectSourceId: element property 'target' changed from 'undefined' to 'sap.odm.finance.costobject.ProjectControllingObjectTypeCodes' at objectType
* **finance:** sap.odm.finance.costobject.ProjectControllingObjectSourceId: New foreign key 'code' for association at element 'objectType'
* **finance:** sap.odm.finance.costobject.ProjectBusinessActionInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at businessAction
* **finance:** sap.odm.finance.costobject.ProjectBusinessActionInfo: element property 'target' changed from 'undefined' to 'sap.odm.finance.costobject.ProjectBusinessActionCodes' at businessAction
* **finance:** sap.odm.finance.costobject.ProjectBusinessActionInfo: New foreign key 'code' for association at element 'businessAction'
* **finance:** sap.odm.finance.costobject.ProjectBusinessActionInfo: element property 'cardinality' changed from 'undefined' to '{"max":1}' at blockIndicator
* **finance:** sap.odm.finance.costobject.ProjectBusinessActionInfo: element property 'target' changed from 'undefined' to 'sap.odm.finance.costobject.BlockIndicatorCodes' at blockIndicator
* **finance:** sap.odm.finance.costobject.ProjectBusinessActionInfo: New foreign key 'code' for association at element 'blockIndicator'
* **finance:** sap.odm.finance.publicsector.BudgetPeriod: element property 'cardinality' changed from 'undefined' to '{"max":1}' at frequency
* **finance:** sap.odm.finance.publicsector.BudgetPeriod: element property 'target' changed from 'undefined' to 'sap.odm.finance.publicsector.FundFrequencyCodes' at frequency
* **finance:** sap.odm.finance.publicsector.BudgetPeriod: New foreign key 'code' for association at element 'frequency'
* **finance:** sap.odm.finance.publicsector.FunctionalArea: element property 'cardinality' changed from 'undefined' to '{"max":1}' at base
* **finance:** sap.odm.finance.publicsector.FunctionalArea: element property 'target' changed from 'undefined' to 'sap.odm.finance.accounting.FunctionalAreaCodes' at base
* **finance:** sap.odm.finance.publicsector.FunctionalArea: New foreign key 'code' for association at element 'base'
* **finance:** sap.odm.finance.publicsector.Fund: element property 'cardinality' changed from 'undefined' to '{"max":1}' at financialManagementArea
* **finance:** sap.odm.finance.publicsector.Fund: element property 'target' changed from 'undefined' to 'sap.odm.finance.publicsector.FinancialManagementAreaCodes' at financialManagementArea
* **finance:** sap.odm.finance.publicsector.Fund: New foreign key 'code' for association at element 'financialManagementArea'
* **finance:** sap.odm.finance.publicsector.Fund: element property 'cardinality' changed from 'undefined' to '{"max":1}' at frequency
* **finance:** sap.odm.finance.publicsector.Fund: element property 'target' changed from 'undefined' to 'sap.odm.finance.publicsector.FundFrequencyCodes' at frequency
* **finance:** sap.odm.finance.publicsector.Fund: New foreign key 'code' for association at element 'frequency'
* **finance:** sap.odm.finance.publicsector.FundsCenter: element property 'cardinality' changed from 'undefined' to '{"max":1}' at financialManagementArea
* **finance:** sap.odm.finance.publicsector.FundsCenter: element property 'target' changed from 'undefined' to 'sap.odm.finance.publicsector.FinancialManagementAreaCodes' at financialManagementArea
* **finance:** sap.odm.finance.publicsector.FundsCenter: New foreign key 'code' for association at element 'financialManagementArea'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedAt' removed from 'sap.odm.workforce.WorkforcePerson'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdAt' removed from 'sap.odm.workforce.WorkforcePerson'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdBy' removed from 'sap.odm.workforce.WorkforcePerson'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedBy' removed from 'sap.odm.workforce.WorkforcePerson'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdByUuid' removed from 'sap.odm.workforce.WorkforcePerson'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.WorkforcePerson'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedAt' removed from 'userAccount'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdAt' removed from 'userAccount'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdBy' removed from 'userAccount'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedBy' removed from 'userAccount'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdByUuid' removed from 'userAccount'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedByUuid' removed from 'userAccount'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedAt' removed from 'personalDetail'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdAt' removed from 'personalDetail'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdBy' removed from 'personalDetail'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedBy' removed from 'personalDetail'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'createdByUuid' removed from 'personalDetail'
* **workforce:** sap.odm.workforce.WorkforcePerson: element/property 'modifiedByUuid' removed from 'personalDetail'
* **workforce:** sap.odm.workforce.WorkforcePerson: element property 'cardinality' changed from 'undefined' to '{"max":1}' at formOfAddress
* **workforce:** sap.odm.workforce.WorkforcePerson: element property 'target' changed from 'undefined' to 'sap.odm.common.address.FormOfAddressCodes' at formOfAddress
* **workforce:** sap.odm.workforce.WorkforcePerson: New foreign key 'code' for association at element 'formOfAddress'
* **workforce:** sap.odm.workforce.WorkforcePerson: element 'profileDetail' changed from flat to nested
* **workforce:** sap.odm.workforce.WorkforcePerson: element 'workAssignments' changed to composition of aspect
* **workforce:** sap.odm.workforce.SourceUserAccount: element/property 'modifiedAt' removed from 'sap.odm.workforce.SourceUserAccount'
* **workforce:** sap.odm.workforce.SourceUserAccount: element/property 'createdAt' removed from 'sap.odm.workforce.SourceUserAccount'
* **workforce:** sap.odm.workforce.SourceUserAccount: element/property 'createdBy' removed from 'sap.odm.workforce.SourceUserAccount'
* **workforce:** sap.odm.workforce.SourceUserAccount: element/property 'modifiedBy' removed from 'sap.odm.workforce.SourceUserAccount'
* **workforce:** sap.odm.workforce.SourceUserAccount: element/property 'createdByUuid' removed from 'sap.odm.workforce.SourceUserAccount'
* **workforce:** sap.odm.workforce.SourceUserAccount: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.SourceUserAccount'
* **workforce:** sap.odm.workforce.PersonalDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.PersonalDetails'
* **workforce:** sap.odm.workforce.PersonalDetails: element/property 'createdAt' removed from 'sap.odm.workforce.PersonalDetails'
* **workforce:** sap.odm.workforce.PersonalDetails: element/property 'createdBy' removed from 'sap.odm.workforce.PersonalDetails'
* **workforce:** sap.odm.workforce.PersonalDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.PersonalDetails'
* **workforce:** sap.odm.workforce.PersonalDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.PersonalDetails'
* **workforce:** sap.odm.workforce.PersonalDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.PersonalDetails'
* **workforce:** sap.odm.workforce.PersonalDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at formOfAddress
* **workforce:** sap.odm.workforce.PersonalDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.address.FormOfAddressCodes' at formOfAddress
* **workforce:** sap.odm.workforce.PersonalDetails: New foreign key 'code' for association at element 'formOfAddress'
* **workforce:** sap.odm.workforce.ProfileDetails: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.ProfileDetails
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'createdAt' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'createdBy' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element/property 'id' removed from 'sap.odm.workforce.ProfileDetails'
* **workforce:** sap.odm.workforce.ProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at nativePreferredLanguage
* **workforce:** sap.odm.workforce.ProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.LanguageCodes' at nativePreferredLanguage
* **workforce:** sap.odm.workforce.ProfileDetails: New foreign key 'code' for association at element 'nativePreferredLanguage'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.ScriptedProfileDetails
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'createdAt' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'createdBy' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element/property 'id' removed from 'sap.odm.workforce.ScriptedProfileDetails'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at scriptCode
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.ScriptCodes' at scriptCode
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: New foreign key 'code' for association at element 'scriptCode'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at academicTitle
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.address.AcademicTitleCodes' at academicTitle
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: New foreign key 'code' for association at element 'academicTitle'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at additionalAcademicTitle
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.address.AcademicTitleCodes' at additionalAcademicTitle
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: New foreign key 'code' for association at element 'additionalAcademicTitle'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at nameSuffix
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.address.FamilyNameSuffixCodes' at nameSuffix
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: New foreign key 'code' for association at element 'nameSuffix'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at namePrefix
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.address.FamilyNamePrefixCodes' at namePrefix
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: New foreign key 'code' for association at element 'namePrefix'
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at partnerNamePrefix
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.address.FamilyNamePrefixCodes' at partnerNamePrefix
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: New foreign key 'code' for association at element 'partnerNamePrefix'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.PrivateAddress
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'modifiedAt' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'createdAt' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'createdBy' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'modifiedBy' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'createdByUuid' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element/property 'id' removed from 'sap.odm.workforce.PrivateAddress'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at scriptCode
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.ScriptCodes' at scriptCode
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'scriptCode'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.StreetCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'primaryRegion'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'primaryRegion'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at usage
* **workforce:** sap.odm.workforce.PrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.AddressUsageCodes' at usage
* **workforce:** sap.odm.workforce.PrivateAddress: New foreign key 'code' for association at element 'usage'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at scriptCode
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.ScriptCodes' at scriptCode
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'scriptCode'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.StreetCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'primaryRegion'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'primaryRegion'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **workforce:** sap.odm.workforce.ScriptedPersonAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.Email: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.Email
* **workforce:** sap.odm.workforce.Email: element/property 'modifiedAt' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element/property 'createdAt' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element/property 'createdBy' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element/property 'modifiedBy' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element/property 'createdByUuid' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element/property 'id' removed from 'sap.odm.workforce.Email'
* **workforce:** sap.odm.workforce.Email: element property 'cardinality' changed from 'undefined' to '{"max":1}' at usage
* **workforce:** sap.odm.workforce.Email: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.EmailUsageCodes' at usage
* **workforce:** sap.odm.workforce.Email: New foreign key 'code' for association at element 'usage'
* **workforce:** sap.odm.workforce.Phone: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.Phone
* **workforce:** sap.odm.workforce.Phone: element/property 'modifiedAt' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element/property 'createdAt' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element/property 'createdBy' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element/property 'modifiedBy' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element/property 'createdByUuid' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element/property 'id' removed from 'sap.odm.workforce.Phone'
* **workforce:** sap.odm.workforce.Phone: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.Phone: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.Phone: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.Phone: element property 'cardinality' changed from 'undefined' to '{"max":1}' at usage
* **workforce:** sap.odm.workforce.Phone: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.PhoneUsageCodes' at usage
* **workforce:** sap.odm.workforce.Phone: New foreign key 'code' for association at element 'usage'
* **workforce:** sap.odm.workforce.SystemOfRecordKey: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.SystemOfRecordKey
* **workforce:** sap.odm.workforce.SystemOfRecordKey: element/property 'createdBy' removed from 'sap.odm.workforce.SystemOfRecordKey'
* **workforce:** sap.odm.workforce.SystemOfRecordKey: element/property 'modifiedBy' removed from 'sap.odm.workforce.SystemOfRecordKey'
* **workforce:** sap.odm.workforce.SystemOfRecordKey: element/property 'createdByUuid' removed from 'sap.odm.workforce.SystemOfRecordKey'
* **workforce:** sap.odm.workforce.SystemOfRecordKey: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.SystemOfRecordKey'
* **workforce:** sap.odm.workforce.SystemOfRecordKey: element/property 'id' removed from 'sap.odm.workforce.SystemOfRecordKey'
* **workforce:** sap.odm.workforce.WorkAssignmentDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.WorkAssignmentDetails'
* **workforce:** sap.odm.workforce.WorkAssignmentDetails: element/property 'createdAt' removed from 'sap.odm.workforce.WorkAssignmentDetails'
* **workforce:** sap.odm.workforce.WorkAssignmentDetails: element/property 'createdBy' removed from 'sap.odm.workforce.WorkAssignmentDetails'
* **workforce:** sap.odm.workforce.WorkAssignmentDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.WorkAssignmentDetails'
* **workforce:** sap.odm.workforce.WorkAssignmentDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.WorkAssignmentDetails'
* **workforce:** sap.odm.workforce.WorkAssignmentDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.WorkAssignmentDetails'
* **workforce:** sap.odm.workforce.JobDetails: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.JobDetails
* **workforce:** sap.odm.workforce.JobDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element/property 'createdAt' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element/property 'createdBy' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element/property 'id' removed from 'sap.odm.workforce.JobDetails'
* **workforce:** sap.odm.workforce.JobDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at status
* **workforce:** sap.odm.workforce.JobDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.JobDetailStatusCodes' at status
* **workforce:** sap.odm.workforce.JobDetails: New foreign key 'code' for association at element 'status'
* **workforce:** sap.odm.workforce.JobDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.JobDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.JobDetails: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.JobDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at event
* **workforce:** sap.odm.workforce.JobDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.EventCodes' at event
* **workforce:** sap.odm.workforce.JobDetails: New foreign key 'code' for association at element 'event'
* **workforce:** sap.odm.workforce.JobDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at eventReason
* **workforce:** sap.odm.workforce.JobDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.EventReasonCodes' at eventReason
* **workforce:** sap.odm.workforce.JobDetails: New foreign key 'code' for association at element 'eventReason'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.PaymentDetails
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'createdAt' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'createdBy' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element/property 'id' removed from 'sap.odm.workforce.PaymentDetails'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at paymentType
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.PaymentTypeCodes' at paymentType
* **workforce:** sap.odm.workforce.PaymentDetails: New foreign key 'code' for association at element 'paymentType'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at paymentMethod
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.PaymentMethodCodes' at paymentMethod
* **workforce:** sap.odm.workforce.PaymentDetails: New foreign key 'code' for association at element 'paymentMethod'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at bankAccountType
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.BankAccountTypeCodes' at bankAccountType
* **workforce:** sap.odm.workforce.PaymentDetails: New foreign key 'code' for association at element 'bankAccountType'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at bankControlKey
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.BankControlKeyCodes' at bankControlKey
* **workforce:** sap.odm.workforce.PaymentDetails: New foreign key 'code' for association at element 'bankControlKey'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at bankAccountCurrency
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.CurrencyCodes' at bankAccountCurrency
* **workforce:** sap.odm.workforce.PaymentDetails: New foreign key 'code' for association at element 'bankAccountCurrency'
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'cardinality' changed from 'undefined' to '{"max":1}' at bankCountry
* **workforce:** sap.odm.workforce.PaymentDetails: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at bankCountry
* **workforce:** sap.odm.workforce.PaymentDetails: New foreign key 'code' for association at element 'bankCountry'
* **workforce:** sap.odm.workforce.WorkOrderDetails: element/property 'modifiedAt' removed from 'sap.odm.workforce.WorkOrderDetails'
* **workforce:** sap.odm.workforce.WorkOrderDetails: element/property 'createdAt' removed from 'sap.odm.workforce.WorkOrderDetails'
* **workforce:** sap.odm.workforce.WorkOrderDetails: element/property 'createdBy' removed from 'sap.odm.workforce.WorkOrderDetails'
* **workforce:** sap.odm.workforce.WorkOrderDetails: element/property 'modifiedBy' removed from 'sap.odm.workforce.WorkOrderDetails'
* **workforce:** sap.odm.workforce.WorkOrderDetails: element/property 'createdByUuid' removed from 'sap.odm.workforce.WorkOrderDetails'
* **workforce:** sap.odm.workforce.WorkOrderDetails: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.WorkOrderDetails'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'kind' changed from 'entity' to 'type' at sap.odm.workforce.WorkAssignmentPrivateAddress
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'modifiedAt' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'createdAt' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'createdBy' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'modifiedBy' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'createdByUuid' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'modifiedByUuid' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element/property 'id' removed from 'sap.odm.workforce.WorkAssignmentPrivateAddress'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at scriptCode
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.ScriptCodes' at scriptCode
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'scriptCode'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.StreetCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'primaryRegion'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at country
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.CountryCodes' at country
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'country'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at primaryRegion
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.CountrySubdivisionCodes' at primaryRegion
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'primaryRegion'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.SecondaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TertiaryRegionCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.TownCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.common.address.DistrictCodes' at ref
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'ref'
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'cardinality' changed from 'undefined' to '{"max":1}' at usage
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: element property 'target' changed from 'undefined' to 'sap.odm.workforce.common.AddressUsageCodes' at usage
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: New foreign key 'code' for association at element 'usage'
* **workforce:** sap.odm.workforce.Job: type 'sap.odm.workforce.Job' removed
* **workforce:** sap.odm.workforce.OrganizationalUnit: type 'sap.odm.workforce.OrganizationalUnit' removed
* **workforce:** sap.odm.workforce.SupervisorWorkAssignment: type 'sap.odm.workforce.SupervisorWorkAssignment' removed
* **workforce:** sap.odm.workforce.common.composite: entity 'sap.odm.workforce.common.composite' removed
* **workforce:** sap.odm.workforce.common.trackParent: aspect 'sap.odm.workforce.common.trackParent' removed



# 1.1.0 (2020-06-16)

### Features

* **common:** sap.odm.common.address.CountrySubdivisionCodes: new element changeType
* **common:** new type sap.odm.common.LicensedCodeListChangeTypeEnum
* **finance:** new root entity sap.odm.finance.costobject.ProjectControllingObject
* **finance:** new root entity sap.odm.finance.publicsector.BudgetPeriod
* **finance:** new root entity sap.odm.finance.publicsector.FunctionalArea
* **finance:** new root entity sap.odm.finance.publicsector.Fund
* **finance:** new root entity sap.odm.finance.publicsector.FundsCenter
* **finance:** new root entity sap.odm.finance.publicsector.Grant
* **finance:** sap.odm.finance.costobject.CostCenter: Added @description annotation
* **finance:** sap.odm.finance.costobject.Attributes: Added @description annotation
* **finance:** sap.odm.finance.costobject.CostCenter: replaced anonymous structured element at companyCode with sap.odm.orgunit.CompanyCodeId
* **finance:** sap.odm.finance.costobject.LocalIdS4: replaced anonymous structured element at companyCode with sap.odm.orgunit.CompanyCodeId
* **orgunit:** new type sap.odm.orgunit.CompanyCodeId
* **workforce:** new type sap.odm.workforce.CompanyCode
* **workforce:** sap.odm.workforce.JobDetails: replaced anonymous structured element at legalEntity with sap.odm.workforce.CompanyCode

### Bug Fixes

* **common:** sap.odm.common.address.CountrySubdivisionCodes: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.ProfileDetails: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.composite: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.ScriptedProfileDetails: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.PrivateAddress: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.AddressUsageCodes: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.AddressUsageCode: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.Email: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.EmailUsageCodes: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.EmailUsageCode: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.Phone: annotation Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.PhoneUsageCodes: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.PhoneUsageCode: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.SystemOfRecordKey: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.WorkAssignment: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.JobDetails: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.JobDetailStatusCodes: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.JobDetailStatusCode: Fixed typos in description annotations
* **workforce:** sap.odm.workforce.common.EventCodes: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.EventCode: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.EventReasonCodes: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.EventReasonCode: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.PaymentDetails: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.PaymentTypeCodes: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.PaymentTypeCode: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.PaymentMethodCodes: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.PaymentMethodCode: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.BankAccountTypeCodes: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.BankAccountTypeCode: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.common.BankControlKeyCode: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.WorkAssignmentPrivateAddress: Fixed typos in descriptions
* **workforce:** sap.odm.workforce.WorkAssignment: fix on-condition

# 1.0.2 (2020-05-05)

### Features

* **common:** Added abstract entity cuid
* **common:** Added aspect ScriptedObject
* **common:** Added aspect codeList
* **common:** Added aspect licensedCodeList
* **common:** Added aspect managed
* **common:** Added code list AcademicTitleCodes
* **common:** Added code list CountryCodes
* **common:** Added code list CountrySubdivisionCodes
* **common:** Added code list CurrencyCodes
* **common:** Added code list DistrictCodes
* **common:** Added code list FamilyNameSuffixCodes
* **common:** Added code list FormOfAddressCodes
* **common:** Added code list LanguageCodes
* **common:** Added code list ScriptCodes
* **common:** Added code list SecondaryRegionCodes
* **common:** Added code list StreetCodes
* **common:** Added code list TertiaryRegionCodes
* **common:** Added code list TownCodes
* **common:** Added type AddressedObjectInfo
* **common:** Added type AlternativeDeliveryAddress
* **common:** Added type CountryLevelInfo
* **common:** Added type DeliveryServiceEnum
* **common:** Added type DistrictNameCode
* **common:** Added type EmailAddress
* **common:** Added type LocalUserId
* **common:** Added type LocalityInfo
* **common:** Added type PhysicalDeliveryAddress
* **common:** Added type PostalAddress
* **common:** Added type PostalCode
* **common:** Added type PremisesInfo
* **common:** Added type RegionInfo
* **common:** Added type SecondaryRegionNameCode
* **common:** Added type ShortString
* **common:** Added type StreetInfo
* **common:** Added type StreetNameCode
* **common:** Added type TertiaryRegionNameCode
* **common:** Added type TownNameCode
* **finance:** Added root entity CostCenter
* **finance:** Added type Attributes
* **finance:** Added type LocalIdS4
* **workforce:** Added abstract entity composite
* **workforce:** Added aspect trackParent
* **workforce:** Added code list AddressUsageCodes
* **workforce:** Added code list BankAccountTypeCodes
* **workforce:** Added code list BankControlKeyCodes
* **workforce:** Added code list EmailUsageCodes
* **workforce:** Added code list EventCodes
* **workforce:** Added code list EventReasonCodes
* **workforce:** Added code list JobDetailStatusCodes
* **workforce:** Added code list PaymentMethodCodes
* **workforce:** Added code list PaymentTypeCodes
* **workforce:** Added code list PhoneUsageCodes
* **workforce:** Added entity Email
* **workforce:** Added entity JobDetails
* **workforce:** Added entity PaymentDetails
* **workforce:** Added entity Phone
* **workforce:** Added entity PrivateAddress
* **workforce:** Added entity ProfileDetails
* **workforce:** Added entity ScriptedProfileDetails
* **workforce:** Added entity SystemOfRecordKey
* **workforce:** Added entity WorkAssignment
* **workforce:** Added entity WorkAssignmentPrivateAddress
* **workforce:** Added root entity WorkforcePerson
* **workforce:** Added type Job
* **workforce:** Added type LegalEntity
* **workforce:** Added type OrganizationalUnit
* **workforce:** Added type PersonalDetails
* **workforce:** Added type ScriptedPersonAddress
* **workforce:** Added type SourceUserAccount
* **workforce:** Added type SupervisorWorkAssignment
* **workforce:** Added type Supplier
* **workforce:** Added type WorkAssignmentDetails
* **workforce:** Added type WorkOrderDetails
