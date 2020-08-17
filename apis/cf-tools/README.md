[![REUSE status](https://api.reuse.software/badge/git.fsfe.org/reuse/api)](https://api.reuse.software/info/git.fsfe.org/reuse/api)
[![CircleCI](https://circleci.com/gh/SAP/cloud-foundry-tools-api.svg?style=svg)](https://circleci.com/gh/SAP/cloud-foundry-tools-api)

# Overview 
This package provides a set of APIs for easy application development with Cloud Foundry. You can use these APIs to manage apps, service instances, orgs, spaces, and users in your environment. Mostly this is a wrapper of cf command line client, which performs running particular command and parsing the output to the suitable json. In case some error or failures occured the runtime exception throws with relevant problem information.

## Prerequisite
To use the APIs in this topic, the v.6 of the cf CLI tool should be installed in your environment.

## Example of usage
```
try {
	const result = await cfLogin("https://api.cf.....com", "user", "password");
	if (result === "OK") {
		// successful
	}
} catch (e) {
	// display or/and log error
}
```
One more example 
```
try {
	const spaces = await cfGetAvailableSpaces("myOrg");
	for (const space of spaces) {
		console.log("Space label is " + space.label + " guid is " + space.guid);
	}
} catch (e) {
	// display or/and log error
}
```
