# Introduction
Here is a simple example of a scenario dependencies application. 

# Requirement
## Install node (if needed)
 Nodejs version > 18 must be installed.  
 [Download Page](https://nodejs.org/en/download/package-manager) 

## Install the Joule cli tool
```
npm install @sap/joule-cli -g
```

# Log in using CLI tool
Use command joule login to log in to your joule instance

# Deploy
Run Command
```
joule deploy ./procurement.da.sapdas.yaml
```

# Test
Run command 
``` 
joule test procurement
```
