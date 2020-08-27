[![REUSE status](https://api.reuse.software/badge/git.fsfe.org/reuse/api)](https://api.reuse.software/info/git.fsfe.org/reuse/api)
[![CircleCI](https://circleci.com/gh/SAP/cloud-foundry-tools-api.svg?style=svg)](https://circleci.com/gh/SAP/cloud-foundry-tools-api)

# Overview 
This package provides a set of APIs to help you develop applications in Cloud Foundry. You can use these APIs to manage apps, service instances, orgs, spaces, and users in your environment. Mostly, this is a wrapper of the CF command line client, which runs a particular command and parses the output to the suitable JSON file. If an error or failure occurs,  the runtime exception throws with relevant problem information.

## Prerequisite
Make sure you have installed version 6 of the CF CLI tool in your environment.

## Examples of usage

Example 1

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

Example 2

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
