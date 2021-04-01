# Packages Overview
![npm Logo](./assets/brands/npm.svg){:style="float:right;width:7rem;margin-left:1rem"}
Welcome to the Collection of API documentation from currently available [npm packages from SAP](https://www.npmjs.com/search?q=%40sap). This documentation is automatically generated to easily allow a central access for the ease of reference.

## Switch from SAP NPM registry to npmjs.com registry

In the blog post [SAP NPM Registry launched: Making the lives of Node.js developers easier](https://blogs.sap.com/2017/05/16/sap-npm-registry-launched-making-the-lives-of-node.js-developers-easier/) and SAP HANA documentation page [The SAP NPM Registry](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.05/en-US/726e5d41462c4eb29eaa6cc83ff41e84.html) the following was announced:

>As of June 10th, 2020 all public SAP [Node.js](https://nodejs.org/) modules from the SAP NPM registry will become part of the [official NPM registry](https://www.npmjs.com/search?q=%40sap), as well as future public SAP Node.js modules will be published there. The SAP NPM registry will continue to exist for the time being with the published content but the recommendation for developers is to switch to using the official NPM regirstry also for all public SAP Node.js modules.

## Cloud Application Programming Model (CAP) for SCP
![CAP Logo](./assets/brands/cap-signet.svg){:style="float:right;width:5rem;margin-left:1rem"}
The [SAP Cloud Application Programming Model](https://cap.cloud.sap/) is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

A good starting point is [DJ Adams start here](https://blogs.sap.com/2018/10/10/application-programming-model-start-here/) blog.

Package | Description
------- | -----------
[audit-logging](apis/audit-logging/README.md) | Provides audit logging functionalities for Node.js applications.
[cds](apis/cds/README.md) | The API package for the SAP Cloud Application Programming Model (CAP).
[xsenv](apis/xsenv/README.md) | Utility for easily reading application configurations for bound services and certificates in the SAP Cloud Platform Cloud Foundry environment, SAP XS advanced model and Kubernetes (K8S).
[xssec](apis/xssec/README.md) | XS Advanced Authentication Primer.

## Fiori Application Programming Model for Cloud Foundry
A good starting point ist [Sergio Rozenszajn blog](https://blogs.sap.com/2018/12/11/programming-applications-in-sap-cloud-platform/).

Package | Description
------- | -----------
[approuter](apis/approuter/README.md) | Node.js based application router.
[html5-app-deployer](apis/html5-app-deployer/README.md) | Handles the upload of the HTML5 applications content to the HTML5 application repository.
[node-jwt](apis/node-jwt/README.md) | JWT validation library for Node.js
[site-content-deployer](apis/site-content-deployer/README.md) | SAP site deployer for independent mta

## SAP Cloud SDK for JavaScript
![SAP Cloud SDK Logo](./assets/brands/sap-cloud-sdk-for-javascript.svg){:style="float:right;width:7rem;margin-left:1rem"}
The [SAP Cloud SDK](https://sap.github.io/cloud-sdk/) is a one-stop shop for developing and extending SAP applications in a Cloud and is als available as [SAP Cloud SDK for JavaScript](https://sap.github.io/cloud-sdk/docs/js/getting-started/). 

Package | Description
------- | -----------
[cloud-sdk-core](apis/cloud-sdk-core/README.md) | This package contains the core functionality for the Virtual Data Model (VDM) as well as the Cloud Platform abstractions.
[cloud-sdk-generator](apis/cloud-sdk-generator/README.md) | Generate your own service module using a service specification (.edmx file).
cloud-sdk-vdm-xxx | Prebuild OData Virtual Data Models (VDM) for SAP S/4HANA Cloud.