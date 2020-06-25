The deploy application can deploy SDS project consisting of CCL file and CCR file to HANA SDS option on XSA.



## Usage

1. Create the MTA application 
2. Create the SDS module. 
NOTE: We invent a rule that an SDS module is mapped to an SDS project respectively. Following the rule make things simple.

    (1) Once the module is created, the folder 'sds_module' shall be created for it. 
    
    (2) Within that folder, a sub folder 'model' shall be created for it.
    
    (3) Put the CCL file and CCR file into the folder sds_module/model
    
    (4) Create the package.json file under the folder 'sds_module'. 
    
3. Modify the mtad.yaml under the MTA application to provide the service instance for SDS option.
