# Overview

This package provides a set of APIs to help you develop applications in SAP HANA XSA. You can use these APIs to manage apps, service instances, orgs, spaces, and users in your environment. Mostly, this is a wrapper of the XS command line client, which runs a particular command and parses the output to the suitable JSON file. If an error or failure occurs, the runtime exception throws with relevant problem information.


## Prerequisite

Make sure you have installed the XS CLI

## Examples of usage

Example 1

```
try {
	const result = await xsLogin("https://xs_endpoint_url", "user", "password");
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
	const spaces = await xsGetAvailableSpaces("myOrg");
	for (const space of spaces) {
		console.log("Space label is " + space.label + " guid is " + space.guid);
	}
} catch (e) {
	// display or/and log error
}
```
