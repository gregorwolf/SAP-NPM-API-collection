# SAP Fiori Tools - XML Annotation Language Server

## Features

<p>

The **SAP Fiori Tools - XML Annotation Language Server** extension provides features that assist with defining annotations in the code editor thus improving the application development productivity by reducing the effort and contributing to the code consistency and correctness.

</p>

**Code Completion:**

<p>

The **SAP Fiori Tools - XML Annotation Language Server** modeler extension provides a list of suggestions based on the project metadata and OData vocabularies. An application developer can open such a list of suggested values for annotation targets, terms, and different elements of annotation values in the annotation file and accept one of the suggestions to add or change them. This eliminates the need to look up the valid values or type complete values thus improving the development efficiency.

</p>

**Micro-Snippets**

<p/>

The **SAP Fiori Tools - XML Annotation Language Server** extension provides a number of generic micro-snippets, which helps the application to accelerate the annotation definition. Bigger blocks of code get inserted and there is no need to trigger the code completion for each element or attribute. An application developer can insert repeating code patterns such as Annotations, Annotation, Record, and PropertyPath more efficiently.

<p/>

**Diagnostics (error-checking):**


<p/>

The **SAP Fiori Tools - XML Annotation Language Server** extension validates the annotation file against the project metadata, annotation vocabularies, and OData specification. An application developer can view the diagnostic messages and navigate to the related place in the annotation file to fix the issues.

<p/>


**Documentation (Vocabulary Information):**

<p/>

The **SAP Fiori Tools - XML Annotation Language Server** extension provides vocabulary information for annotation terms and their elements, such as property values, record types, etc. This information may include a description, applicability, type, etc. It also indicates if a term/element is experimental or deprecated and informs the developer if the element is mandatory. An application developer can use this information to make a better decision on how to use the annotation. The documentation scope depends on the information provided in the respective vocabulary.
<p/>

**Go to Definition:**
<p/>
The Go To Definition feature helps you to navigate to the source of annotation or translatable string value and opens the result in a new tab.
<p/>

**Peek Definition:**
<p/>
The Peek Definition feature lets you preview the definition of annotation or translatable string value without switching away from the code that you're writing.
<p/>

**i18n Support:**
<p/>

The **SAP Fiori Tools - XML Annotation Language Server** provides diagnostic warning for translatable texts which are not maintained in the i18n.properties file.
An application developer can use code completion or quick fix to solve the issue.

<p/>

## Usage

**To use the code completion:**

- Trigger the code completion by pressing `CMD/Ctrl + Space`. The list of suggested values is displayed. The list is filtered by already typed characters. <br/>
Tip: You can filter it further by typing more characters.
- Navigate to the desired value using up/down arrows or your mouse.
- Accept the highlighted value using Enter key or a mouse click.

**Note**: If the shortcut for triggering code completion `CMD + Space` does not work on Mac, it is most probably assigned for the other function (e.g. opens the spotlight search). This is a known VS Code issue on Mac. The recommended solution is to change the shortcut for suggestions in VS Code. Choose File->Preferences-> Keyboard shortcuts, press edit icon and set up a new shortcut. 

**To use the micro-snippets:**
- Open the list of the micro-snippets available for the current position by pressing `CMD/Ctrl + Space` within the schema tag or its nested tags.
The list of suggested micro-snippets is displayed for the specific context.

- Navigate to the desired value by using the up/down arrows or your mouse.
- Accept the highlighted snippet by pressing Enter or by a mouse click.

**To use the diagnostics:**
- Change the annotation file. <br/>
**SAP UX - XML Annotation Language Server** validates the annotation file against the metadata, OData specification and OData vocabularies and displays the diagnostic messages in the problems pane.
- Click on the diagnostic message to navigate to the respective place in the document and fix the problem.

**To use Go to Definition:**

Place your text cursor somewhere inside the path referencing to annotation term segment or translatable string value and

* keyboard:  press F12 (in Visual Studio Code), or Ctrl + F11 (in SAP Business Application Studio)

* mouse: right click and select Go To Definition, or.

* keyboard and mouse: CTRL + Click (Win), command + Click (Mac)


**To use Peek Definition:**

Place your text cursor somewhere inside path referencing to annotation term segment or translatable string value and

- keyboard: press Alt + F12 (Win), Option + F12 (Mac), or

- mouse: right click and select Peek Definition

**To use the documentation**
- In the code completion list, navigate to the desired value.

## Prerequisites
The generated application requires the following software to be installed:  
- [NodeJS](https://nodejs.org/en/download/) Version 20.19.2 or higher
- Local copy of OData metadata file to be present in the application folder structure.
- `manifest.json` file to be present in the application folder structure and contain local URIs to the  metadata and annotation file(s) in its dataSources section.
- The annotation file must be within the webapp folder or its sub-folders

## Limitations
- Annnotations directly embedded in the metadata are not supported
- Dynamic expressions are not supported

## Support
Join the [SAP Fiori Tools Community](https://pages.community.sap.com/topics/fiori-tools). Ask Questions, Read the Latest Blogs, Explore Content.
Please assign tag: *SAP Fiori tools*

To log an issue with SAP Fiori Tools, please see [Contact SAP Support](https://help.sap.com/viewer/1bb01966b27a429ebf62fa2e45354fea/Latest/en-US).

## Documentation
- Visit **SAP Help Portal** for [SAP Fiori Tools](https://help.sap.com/viewer/product/SAP_FIORI_tools/Latest/en-US) documentation. 

## License
<details>
    <summary>SAP DEVELOPER LICENSE AGREEMENT</summary>
    <p/>
    Please scroll down and read the following Developer License Agreement carefully ("Developer Agreement").  By clicking "I Accept" or by attempting to download, or install, or use the SAP software and other materials that accompany this Developer Agreement ("SAP Materials"), You agree that this Developer Agreement forms a legally binding agreement between You ("You" or "Your") and SAP SE, for and on behalf of itself and its subsidiaries and affiliates (as defined in Section 15 of the German Stock Corporation Act) and You agree to be bound by all of the terms and conditions stated in this Developer Agreement. If You are trying to access or download the SAP Materials on behalf of Your employer or as a consultant or agent of a third party (either "Your Company"), You represent and warrant that You have the authority to act on behalf of and bind Your Company to the terms of this Developer Agreement and everywhere in this Developer Agreement that refers to 'You' or 'Your' shall also include Your Company. If You do not agree to these terms, do not click "I Accept", and do not attempt to access or use the SAP Materials.
    <p/>
    1.  LICENSE:
    <br/>SAP grants You a non-exclusive, non-transferable, non-sublicensable, revocable, limited use license to copy, reproduce and distribute the application programming interfaces ("API"), documentation, plug-ins, templates, scripts and sample code ("Tools") on a desktop, laptop, tablet, smart phone, or other appropriate computer device that You own or control (any, a "Computer") to create new applications ("Customer Applications"). You agree that the Customer Applications will not: (a) unreasonably impair, degrade or reduce the performance or security of any SAP software applications, services or related technology ("Software"); (b) enable the bypassing or circumventing of SAP's license restrictions and/or provide users with access to the Software to which such users are not licensed; (c) render or provide, without prior written consent from SAP, any information concerning SAP software license terms, Software, or any other information related to SAP products; or (d) permit mass data extraction from an SAP product to a non-SAP product, including use, modification, saving or other processing of such data in the non-SAP product. In exchange for the right to develop Customer Applications under this Agreement, You covenant not to assert any Intellectual Property Rights in Customer Applications created by You against any SAP product, service, or future SAP development.
    <p/>
    2.  INTELLECTUAL PROPERTY:
    <br/>(a) SAP or its licensors retain all ownership and intellectual property rights in the APIs, Tools and Software. You may not: a) remove or modify any marks or proprietary notices of SAP, b) provide or make the APIs, Tools or Software available to any third party, c) assign this Developer Agreement or give or transfer the APIs, Tools or Software or an interest in them to another individual or entity, d) decompile, disassemble or reverse engineer (except to the extent permitted by applicable law) the APIs Tools or Software, (e) create derivative works of or based on the APIs, Tools or Software, (f) use any SAP name, trademark or logo, or (g) use the APIs or Tools to modify existing Software or other SAP product functionality or to access the Software or other SAP products' source code or metadata.
    <br/>(b) Subject to SAP's underlying rights in any part of the APIs, Tools or Software, You retain all ownership and intellectual property rights in Your Customer Applications.
    <p/>
    3. FREE AND OPEN SOURCE COMPONENTS:
    <br/>The SAP Materials may include certain third party free or open source components ("FOSS Components"). You may have additional rights in such FOSS Components that are provided by the third party licensors of those components.
    <p/>
    4. THIRD PARTY DEPENDENCIES:
    <br/>The SAP Materials may require certain third party software dependencies ("Dependencies") for the use or operation of such SAP Materials. These dependencies may be identified by SAP in Maven POM files, product documentation or by other means. SAP does not grant You any rights in or to such Dependencies under this Developer Agreement. You are solely responsible for the acquisition, installation and use of Dependencies. SAP DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES IN RESPECT OF DEPENDENCIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND OF FITNESS FOR A PARTICULAR PURPOSE. IN PARTICULAR, SAP DOES NOT WARRANT THAT DEPENDENCIES WILL BE AVAILABLE, ERROR FREE, INTEROPERABLE WITH THE SAP MATERIALS, SUITABLE FOR ANY PARTICULAR PURPOSE OR NON-INFRINGING.  YOU ASSUME ALL RISKS ASSOCIATED WITH THE USE OF DEPENDENCIES, INCLUDING WITHOUT LIMITATION RISKS RELATING TO QUALITY, AVAILABILITY, PERFORMANCE, DATA LOSS, UTILITY IN A PRODUCTION ENVIRONMENT, AND NON-INFRINGEMENT. IN NO EVENT WILL SAP BE LIABLE DIRECTLY OR INDIRECTLY IN RESPECT OF ANY USE OF DEPENDENCIES BY YOU.
    <p/>
    5.  WARRANTY:
    <br/>a)  If You are located outside the US or Canada: AS THE API AND TOOLS ARE PROVIDED TO YOU FREE OF CHARGE, SAP DOES NOT GUARANTEE OR WARRANT ANY FEATURES OR QUALITIES OF THE TOOLS OR API OR GIVE ANY UNDERTAKING WITH REGARD TO ANY OTHER QUALITY. NO SUCH WARRANTY OR UNDERTAKING SHALL BE IMPLIED BY YOU FROM ANY DESCRIPTION IN THE API OR TOOLS OR ANY AVAILABLE DOCUMENTATION OR ANY OTHER COMMUNICATION OR ADVERTISEMENT. IN PARTICULAR, SAP DOES NOT WARRANT THAT THE SOFTWARE WILL BE AVAILABLE UNINTERRUPTED, ERROR FREE, OR PERMANENTLY AVAILABLE.  FOR THE TOOLS AND API ALL WARRANTY CLAIMS ARE SUBJECT TO THE LIMITATION OF LIABILITY STIPULATED IN SECTION 4 BELOW.
    <br/>b)  If You are located in the US or Canada: THE API AND TOOLS ARE LICENSED TO YOU "AS IS", WITHOUT ANY WARRANTY, ESCROW, TRAINING, MAINTENANCE, OR SERVICE OBLIGATIONS WHATSOEVER ON THE PART OF SAP. SAP MAKES NO EXPRESS OR IMPLIED WARRANTIES OR CONDITIONS OF SALE OF ANY TYPE WHATSOEVER, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND OF FITNESS FOR A PARTICULAR PURPOSE. IN PARTICULAR, SAP DOES NOT WARRANT THAT THE SOFTWARE WILL BE AVAILABLE UNINTERRUPTED, ERROR FREE, OR PERMANENTLY AVAILABLE.  YOU ASSUME ALL RISKS ASSOCIATED WITH THE USE OF THE API AND TOOLS, INCLUDING WITHOUT LIMITATION RISKS RELATING TO QUALITY, AVAILABILITY, PERFORMANCE, DATA LOSS, AND UTILITY IN A PRODUCTION ENVIRONMENT.
    <p/>
    6.  LIMITATION OF LIABILITY:
    <br/>a)  If You are located outside the US or Canada: IRRESPECTIVE OF THE LEGAL REASONS, SAP SHALL ONLY BE LIABLE FOR DAMAGES UNDER THIS AGREEMENT IF SUCH DAMAGE (I) CAN BE CLAIMED UNDER THE GERMAN PRODUCT LIABILITY ACT OR (II) IS CAUSED BY INTENTIONAL MISCONDUCT OF SAP OR (III) CONSISTS OF PERSONAL INJURY. IN ALL OTHER CASES, NEITHER SAP NOR ITS EMPLOYEES, AGENTS AND SUBCONTRACTORS SHALL BE LIABLE FOR ANY KIND OF DAMAGE OR CLAIMS HEREUNDER.
    <br/>b)  If You are located in the US or Canada: IN NO EVENT SHALL SAP BE LIABLE TO YOU, YOUR COMPANY OR TO ANY THIRD PARTY FOR ANY DAMAGES IN AN AMOUNT IN EXCESS OF $100 ARISING IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE TOOLS OR API OR IN CONNECTION WITH SAP'S PROVISION OF OR FAILURE TO PROVIDE SERVICES PERTAINING TO THE TOOLS OR API, OR AS A RESULT OF ANY DEFECT IN THE API OR TOOLS. THIS DISCLAIMER OF LIABILITY SHALL APPLY REGARDLESS OF THE FORM OF ACTION THAT MAY BE BROUGHT AGAINST SAP, WHETHER IN CONTRACT OR TORT, INCLUDING WITHOUT LIMITATION ANY ACTION FOR NEGLIGENCE. YOUR SOLE REMEDY IN THE EVENT OF BREACH OF THIS DEVELOPER AGREEMENT BY SAP OR FOR ANY OTHER CLAIM RELATED TO THE API OR TOOLS SHALL BE TERMINATION OF THIS AGREEMENT. NOTWITHSTANDING ANYTHING TO THE CONTRARY HEREIN, UNDER NO CIRCUMSTANCES SHALL SAP AND ITS LICENSORS BE LIABLE TO YOU OR ANY OTHER PERSON OR ENTITY FOR ANY SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR INDIRECT DAMAGES, LOSS OF GOOD WILL OR BUSINESS PROFITS, WORK STOPPAGE, DATA LOSS, COMPUTER FAILURE OR MALFUNCTION, ANY AND ALL OTHER COMMERCIAL DAMAGES OR LOSS, OR EXEMPLARY OR PUNITIVE DAMAGES.
    <p/>
    7.  INDEMNITY:
    <br/>You will fully indemnify, hold harmless and defend SAP against law suits based on any claim: (a) that any Customer Application created by You infringes or misappropriates any patent, copyright, trademark, trade secrets, or other proprietary rights of a third party, or (b) related to Your alleged violation of the terms of this Developer Agreement.
    <p/>
    8.  EXPORT:
    <br/>The Tools and API are subject to German, EU and US export control regulations. You confirm that: a) You will not use the Tools or API for, and will not allow the Tools or API to be used for, any purposes prohibited by German, EU and US law, including, without limitation, for the development, design, manufacture or production of nuclear, chemical or biological weapons of mass destruction; b) You are not located in Cuba, Iran, Sudan, Iraq, North Korea, Syria, nor any other country to which the United States has prohibited export or that has been designated by the U.S. Government as a "terrorist supporting" country (any, an "US Embargoed Country"); c) You are not a citizen, national or resident of, and are not under the control of, a US Embargoed Country; d) You will not download or otherwise export or re-export the API or Tools, directly or indirectly, to a US Embargoed Country nor to citizens, nationals or residents of a US Embargoed Country; e) You are not listed on the United States Department of Treasury lists of Specially Designated Nationals, Specially Designated Terrorists, and Specially Designated Narcotic Traffickers, nor listed on the United States Department of Commerce Table of Denial Orders or any other U.S. government list of prohibited or restricted parties and f) You will not download or otherwise export or re-export the API or Tools , directly or indirectly, to persons on the above-mentioned lists.
    <p/>
    9.  SUPPORT:
    <br/>Other than what is made available on the SAP Community Website (SCN) by SAP at its sole discretion and by SCN members, SAP does not offer support for the API or Tools which are the subject of this Developer Agreement.
    <p/>
    10.  TERM AND TERMINATION:
    <br/>You may terminate this Developer Agreement by destroying all copies of the API and Tools on Your Computer(s). SAP may terminate Your license to use the API and Tools immediately if You fail to comply with any of the terms of this Developer Agreement, or, for SAP's convenience by providing you with ten (10) day's written notice of termination (including email). In case of termination or expiration of this Developer Agreement, You must destroy all copies of the API and Tools immediately.  In the event Your Company or any of the intellectual property you create using the API, Tools or Software are acquired (by merger, purchase of stock, assets or intellectual property or exclusive license), or You become employed, by a direct competitor of SAP, then this Development Agreement and all licenses granted in this Developer Agreement shall immediately terminate upon the date of such acquisition.
    <p/>
    11.  LAW/VENUE:
    <br/>a)  If You are located outside the US or Canada: This Developer Agreement is governed by and construed in accordance with the laws of the Germany. You and SAP agree to submit to the exclusive jurisdiction of, and venue in, the courts of Karlsruhe in Germany in any dispute arising out of or relating to this Developer Agreement.
    <br/>b)  If You are located in the US or Canada: This Developer Agreement shall be governed by and construed under the Commonwealth of Pennsylvania law without reference to its conflicts of law principles. In the event of any conflicts between foreign law, rules, and regulations, and United States of America law, rules, and regulations, United States of America law, rules, and regulations shall prevail and govern. The United Nations Convention on Contracts for the International Sale of Goods shall not apply to this Developer Agreement. The Uniform Computer Information Transactions Act as enacted shall not apply.
    <p/>
    12. MISCELLANEOUS:
    <br/>This Developer Agreement is the complete agreement for the API and Tools licensed (including reference to information/documentation contained in a URL). This Developer Agreement supersedes all prior or contemporaneous agreements or representations with regards to the subject matter of this Developer Agreement. If any term of this Developer Agreement is found to be invalid or unenforceable, the surviving provisions shall remain effective. SAP's failure to enforce any right or provisions stipulated in this Developer Agreement will not constitute a waiver of such provision, or any other provision of this Developer Agreement.

</details>
