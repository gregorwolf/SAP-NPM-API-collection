# @sap/ux-cds-odata-language-server-extension

The SAP Fiori Tools - CDS OData Language Server enhances the functionality of [SAP Cloud Platform core data services plug-in for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=SAPSE.vscode-cds) with the features assisting you to define [OData annotations](https://cap.cloud.sap/docs/advanced/odata#annotations) in .cds files serving Fiori UIs.

## **1. Code Completion**

The SAP Fiori Tools - CDS OData Language Server provides a list of suggestions based on the service metadata and OData vocabularies. An application developer can open such a list of suggestions for annotation aliases, terms, records, properties and their values and accept one of them to speed up applying OData annotations to service entities and elements. The suggestion lists are context sensitive, and include only the values that are allowed by OData vocabulary specification. This eliminates the need to look up the valid elements and values or type complete values. 

## **2. Micro-Snippets**

The SAP Fiori Tools - CDS OData Language Server  provides a number of generic micro-snippets in the suggestion lists. These are small blocks of code based on OData vocabulary definitions that can be inserted to avoid triggering the code completion for each annotation element separately. An application developer can insert repeating code patterns such as annotation aliases, terms, and records more efficiently.

## **3. Diagnostics (error-checking)**

The SAP Fiori Tools - CDS OData Language Server validates the OData annotations against the project metadata, annotation vocabularies, and OData specification. An application developer can view the diagnostic messages and navigate to the related place in the annotation file to fix the issues.

## **4. Documentation (Vocabulary Information)**

The SAP Fiori Tools - CDS OData Language Server provides vocabulary information for annotation terms and their elements, such as property values, record types, etc. This information may include a description, applicability, type, etc. It also indicates if a term/element is experimental or deprecated and informs the developer if the element is mandatory. An application developer can use this information to make a better decision on how to use the annotation. The documentation scope depends on the information provided in the respective vocabulary.

## **5. Go to Definition/Peek Definition**

The Go To Definition feature helps you to navigate to the source of a referenced annotation and opens the result in a new tab.

The Peek Definition feature lets you preview the definition of a annotation without switching away from the code that you're writing.

## **6. i18n Support**

The SAP Fiori Tools - CDS OData Language Server provides diagnostic warning for hard-coded translatable text values which do not match the expected i18n reference format. Together with the standard functions of SAP Cloud Platform core data services plug-in it simplifies maintaining translateable values.


## **Out of Scope**

Completion items for path values are only provided based on files referenced via the `using` directive and annotations applied to the entities exposed from the same service.
Additionally, this version of annotation language server doesn’t support:
- [Core Data Services Common](https://cap.cloud.sap/docs/cds/annotations) annotations
- Annotations applied to complex elements
    ```
    annotate IncidentService.Priority with {
        code {
            @(Common.Text: 'aaa') value;
        }
    };
    ```
- Annotations embedded in entity definitions
    ```
    entity IncidentService @(UI.SelectionFields: [incidentStatus_code]) {
        title @Common : {
                Text            : name,
                TextArrangement : #TextOnly
        } @title: 'Title'
    };
    ```
- Annotations on parameters of parameterized entities 


## Known Issues

- CDS path notation mixed with OData path notation (string value in CDS) in annotations.
    - Value paths use CDS notation e.g `LineItem : [ {Value : category.code} ]`
    - Annotation path uses OData path notation e.g 
    ```
    Facets : [{
        $Type:'UI.ReferenceFacet',
        Target: 'incidentFlow/@UI.LineItem'
    }]
    
    ```
- Using generated fields from association in annotations. This is needed for correct interpretation by SAP Fiori Elements framework. 


## Vocabulary Support Matrix

The following OData vocabularies are supported by CDS Compiler and Annotation Service

| Vocabulary                            | Annotation Service | CDS Compiler |
| ------------------------------------- | ------------------ | ------------ |
| Org.OData.Aggregation.V1              | X                  | X            |
| Org.OData.Authorization.V1            | X                  | X            |
| Org.OData.Capabilities.V1             | X                  | X            |
| Org.OData.Core.V1                     | X                  | X            |
| Org.OData.Measures.V1                 | X                  | X            |
| Org.OData.Repeatability.V1            | X                  | X            |
| Org.OData.Temporal.V1                 | X                  |              |
| Org.OData.Validation.V1               | X                  | X            |
| Org.OData.JSON.V1                     | X                  | X            |
| com.sap.vocabularies.Analytics.v1     | X                  | X            |
| com.sap.vocabularies.CodeList.v1      | X                  | X            |
| com.sap.vocabularies.Common.v1        | X                  | X            |
| com.sap.vocabularies.Communication.v1 | X                  | X            |
| com.sap.vocabularies.DataIntegration.v1 | X                | X            |
| com.sap.vocabularies.DirectEdit.v1    | X                  |              |
| com.sap.vocabularies.Graph.v1         | X                  | X            |
| com.sap.vocabularies.Hierarchy.v1     | X                  | X            |
| com.sap.vocabularies.HTML5.v1         | X                  | X            |
| com.sap.vocabularies.ODM.v1           | X                  | X            |
| com.sap.vocabularies.PDF.v1           | X                  |              |
| com.sap.vocabularies.PersonalData.v1  | X                  | X            |
| com.sap.vocabularies.Session.v1       | X                  | X            |
| com.sap.vocabularies.UI.v1            | X                  | X            |

## **Support**
Join the [SAP Fiori Tools Community](https://pages.community.sap.com/topics/fiori-tools). Ask Questions, Read the Latest Blogs, Explore Content.
Please assign tag: *SAP Fiori tools*

To log an issue with SAP Fiori Tools, please see [Contact SAP Support](https://help.sap.com/viewer/1bb01966b27a429ebf62fa2e45354fea/Latest/en-US).

## **Documentation**

For more information see https://cap.cloud.sap/docs/advanced/fiori#fiori-annotations
