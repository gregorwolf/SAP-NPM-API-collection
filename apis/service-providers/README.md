# service-providers

This module provides various service providers:

# Direct URL Service Provider

Provides the ability to consume a service from a URL ( a direct service url rather then through SAP cloud destination service.
The main use case is when creating an application for demo use or for local development when detached from SAP Cloud

# Local Metadata File Service Provider

Provides the ability to use a dummy service represented by metadata.xml file from the local workspace of the developer.
The main use case is when creating an application for demo use and run it with mock data.

# Current Project Service Provider

Provides the ability to consume services from the current CAP project. The service can be java or node.
The main use case is: a developer adds a _UI_ module to _CAP_ project and he wants to bind the UI with a service (java/node) he has in his project.
The flow contains also a change of connectivity details in the `package.json/mta.yaml/xsapp.json`, where we declare the dependencies. Later on, the dependency will be reflected in the `Run Configuration`.

## Requirements

The flow starts and ends in the same behaviour we have for service consumption. 
Additional scenario will be added to the system selection:

    My SAP system
    API hub
    Current project
    Local (will be the next one)

When user selects 'Current project' we should display the all found services from the current CAP project.
</br>The services can be: _Java, Node_.
</br>The format should be: _'service name'_.
</br>Service biding (data connection) - the flow is: binding a service to a UI module, therefore the binding process should be as it is today update service's dependency in the `package.json/mta.yaml/xsapp.json`.
