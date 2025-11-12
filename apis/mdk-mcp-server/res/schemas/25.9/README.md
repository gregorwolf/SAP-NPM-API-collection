# MDK Metadata References

This document provides information about the metadata definitions available in the editor and the format in which these metadata definitions are stored in the editor. The MDK client receives these metadata definitions as a bundle.

## Actions

Actions are configurable event handlers that can perform tasks based on the JavaScript code provided. In other words, actions are canned business logic that are limited to the properties that can be configured.

- [Overview](./Action.schema)

#### BarcodeScanner

- [CheckBarcodeScannerPrerequisite](./Action/CheckBarcodeScannerPrerequisite.schema)
- [OpenBarcodeScanner](./Action/OpenBarcodeScanner.schema)

#### Internationalization

- [SetLanguage](./Action/SetLanguage.schema)
- [SetRegion](./Action/SetRegion.schema)

#### Logger

- [LogMessage](./Action/Logger/LogMessage.schema)
- [SetLevel](./Action/Logger/SetLevel.schema)
- [SetState](./Action/Logger/SetState.schema)
- [Upload](./Action/Logger/Upload.schema)

#### Message

- [BannerMessage](./Action/BannerMessage.schema)
- [Message](./Action/Message.schema)
- [ProgressBanner](./Action/ProgressBanner.schema)
- [ToastMessage](./Action/ToastMessage.schema)

#### Navigation

- [ClosePage](./Action/ClosePage.schema)
- [CrossAppNavigation](./Action/CrossAppNavigation.schema)
- [Navigation](./Action/Navigation.schema)

#### ODataService

- [CallFunction](./Action/ODataService/CallFunction.schema)
- [ChangeSet](./Action/ODataService/ChangeSet.schema)
- [Create](./Action/ODataService/Create.schema)
- [CreateEntity](./Action/ODataService/CreateEntity.schema)
- [CreateMedia](./Action/ODataService/CreateMedia.schema)
- [CreateRelatedEntity](./Action/ODataService/CreateRelatedEntity.schema)
- [CreateRelatedMedia](./Action/ODataService/CreateRelatedMedia.schema)
- [DeleteEntity](./Action/ODataService/DeleteEntity.schema)
- [DeleteMedia](./Action/ODataService/DeleteMedia.schema)
- [DownloadMedia](./Action/ODataService/DownloadMedia.schema)
- [DownloadStream](./Action/ODataService/DownloadStream.schema)
- [DraftDiscard](./Action/ODataService/DraftDiscard.schema)
- [DraftEdit](./Action/ODataService/DraftEdit.schema)
- [DraftSave](./Action/ODataService/DraftSave.schema)
- [Initialize](./Action/ODataService/Initialize.schema)
- [Open](./Action/ODataService/Open.schema)
- [Read](./Action/ODataService/Read.schema)
- [UpdateEntity](./Action/ODataService/UpdateEntity.schema)
- [UploadMedia](./Action/ODataService/UploadMedia.schema)
- [UploadStream](./Action/ODataService/UploadStream.schema)

#### OfflineOData

- [Clear](./Action/OfflineOData/Clear.schema)
- [Close](./Action/OfflineOData/Close.schema)
- [Download](./Action/OfflineOData/Download.schema)
- [CancelDownload](./Action/OfflineOData/CancelDownload.schema)
- [Initialize](./Action/OfflineOData/Initialize.schema)
- [Upload](./Action/OfflineOData/Upload.schema)
- [CancelUpload](./Action/OfflineOData/CancelUpload.schema)
- [UndoPendingChanges](./Action/OfflineOData/UndoPendingChanges.schema)
- [RemoveDefiningRequest](./Action/OfflineOData/RemoveDefiningRequest.schema)

#### PushNotification

- [Register](./Action/PushNotificationRegister.schema)
- [Unregister](./Action/PushNotificationUnregister.schema)

#### Others

- [ApplicationUpdate](./Action/ApplicationUpdate.schema)
- [ChangeUserPasscode](./Action/ChangeUserPasscode.schema)
- [CheckRequiredFields](./Action/CheckRequiredFields.schema)
- [Filter](./Action/Filter.schema)
- [Logout](./Action/Logout.schema)
- [OpenDocument](./Action/OpenDocument.schema)
- [PopoverMenu](./Action/PopoverMenu.schema)
- [SetTheme](./Action/SetTheme.schema)
- [VerifyPasscode](./Action/VerifyPasscode.schema)
- [SetDebugSettings](./Action/SetDebugSettings.schema)

#### RESTService

- [SendRequest](./Action/RestService/SendRequest.schema)

## Application

A JSON file (Application.app) that contains the main application definition.

- [Application](./App.schema)

## CIM

A CIM file allows developers to integrate their own component apps into the existing MDK app or to customize the MDK app with their own branding information.

- [CIM (Component Integration Metadata)](./CIM.schema)

## Globals

Global variables remain constant throughout the scope of the app and can be reused more than once.

- [Overview](./Global.schema)
- [BooleanGlobal](./Global/BooleanGlobal.schema)
- [NumberGlobal](./Global/NumberGlobal.schema)
- [StringGlobal](./Global/StringGlobal.schema)

## Pages

Pages contain the control definitions that make up each app page.

- [Page](./Page.schema)

#### Common

- [ActionBar](./Page/ActionBar.json)
- [ActionBarItem](./Page/ActionBarItem.json)
- [Extension](./Page/Common/Extension.json)
- [ToolBar](./Page/ToolBar.json)
- [ToolBarItem](./Page/ToolBarItem.json)
- [FioriToolbar](./Page/FioriToolbar.json)
- [FioriToolbarItem](./definitions/FioriToolbarItem.json)

#### FormCell

- [FormCellContainer](./Page/FormCell/Container.json)
- [Attachment](./Page/FormCell/Attachment.json)
- [Button](./Page/FormCell/Button.json)
- [DatePicker](./Page/FormCell/DatePicker.json)
- [Document](./Page/FormCell/Document.json)
- [DurationPicker](./Page/FormCell/DurationPicker.json)
- [Extension](./Page/FormCell/Extension.json)
- [Filter](./Page/FormCell/Filter.json)
- [InlineSignatureCapture](./Page/FormCell/InlineSignatureCapture.json)
- [Label](./Page/FormCell/Label.json)
- [ListPicker](./Page/FormCell/ListPicker.json)
- [MultiSorter](./Page/FormCell/MultiSorter.json)
- [Note](./Page/FormCell/Note.json)
- [Section](./Page/FormCell/Section.json)
- [Segmented](./Page/FormCell/Segmented.json)
- [SignatureCapture](./Page/FormCell/SignatureCapture.json)
- [SimpleProperty](./Page/FormCell/SimpleProperty.json)
- [Sorter](./Page/FormCell/Sorter.json)
- [Switch](./Page/FormCell/Switch.json)
- [Title](./Page/FormCell/Title.json)

#### NavigationDrawer
- [SideDrawer](./Page/NavigationDrawer/SideDrawer.json)

### SectionedTable

- [SectionedTable](./Page/SectionedTable/SectionedTable.json)

#### Container

- [AnalyticCardCollection](./Page/SectionedTable/Container/AnalyticCardCollection.json)
- [ButtonTable](./Page/SectionedTable/Container/ButtonTable.json)
- [Calendar](./Page/SectionedTable/Container/Calendar.json)
- [CardCollection](./Page/SectionedTable/Container/CardCollection.json)
- [ChartContent](./Page/SectionedTable/Container/ChartContent.json)
- [ContactTable](./Page/SectionedTable/Container/ContactTable.json)
- [DataTable](./Page/SectionedTable/Container/DataTable.json)
- [Extension](./Page/SectionedTable/Container/Extension.json)
- [FormCell](./Page/SectionedTable/Container/FormCell.json)
- [GridTable](./Page/SectionedTable/Container/GridTable.json)
- [ImageCollection](./Page/SectionedTable/Container/ImageCollection.json)
- [Image](./Page/SectionedTable/Container/Image.json)
- [KeyValue](./Page/SectionedTable/Container/KeyValue.json)
- [KPIHeader](./Page/SectionedTable/Container/KPIHeader.json)
- [KPISection](./Page/SectionedTable/Container/KPISection.json)
- [ObjectCardCollection](./Page/SectionedTable/Container/ObjectCardCollection.json)
- [ObjectCollection](./Page/SectionedTable/Container/ObjectCollection.json)
- [ObjectHeader](./Page/SectionedTable/Container/ObjectHeader.json)
- [ObjectTable](./Page/SectionedTable/Container/ObjectTable.json)
- [ProfileHeader](./Page/SectionedTable/Container/ProfileHeader.json)
- [SimplePropertyCollection](./Page/SectionedTable/Container/SimplePropertyCollection.json)
- [Timeline](./Page/SectionedTable/Container/Timeline.json)
- [TimelinePreview](./Page/SectionedTable/Container/TimelinePreview.json)

#### Control

- [ActionItem](./Page/SectionedTable/Control/ActionItem.json)
- [ActivityItem](./Page/SectionedTable/Control/ActivityItem.json)
- [ButtonItem](./Page/SectionedTable/Control/ButtonItem.json)
- [Card](./Page/SectionedTable/Control/Card/Card.json)
- [ChartCard](./Page/SectionedTable/Control/ChartCard.json)
- [ContactCellItem](./Page/SectionedTable/Control/ContactCellItem.json)
- [ImageCell](./Page/SectionedTable/Control/ImageCell.json)
- [KeyValueItem](./Page/SectionedTable/Control/KeyValueItem.json)
- [KPIView](./Page/SectionedTable/Control/KPIView.json)
- [LabelItem](./Page/SectionedTable/Control/LabelItem.json)
- [ObjectCard](./Page/SectionedTable/Control/ObjectCard.json)
- [ObjectCell](./Page/SectionedTable/Control/ObjectCell.json)
- [ObjectHeaderChart](./Page/SectionedTable/Control/ObjectHeaderChart.json)
- [ObjectHeaderKPI](./Page/SectionedTable/Control/ObjectHeaderKPI.json)
- [OverflowButton](./Page/SectionedTable/Control/OverflowButton.json)
- [SimplePropertyCell](./Page/SectionedTable/Control/SimplePropertyCell.json)
- [TagItem](./Page/SectionedTable/Control/TagItem.json)

#### Common

- [Header](./Page/SectionedTable/Common/Header.json)
- [Footer](./Page/SectionedTable/Common/Footer.json)
- [Separator](./Page/SectionedTable/Common/Separators.json)
  
### TabControl

- [BottomNavigation](./Page/TabControl/BottomNavigation/BottomNavigation.json)
- [Tabs](./Page/TabControl/Tabs/Tabs.json)
- [TabItem](./Page/TabControl/TabItem.json)

### FlexibleColumnLayout

- [FlexibleColumnLayout](./Page/FlexibleColumnLayout/FlexibleColumnLayout.json)
- [FlexibleColumn](./Page/FlexibleColumnLayout/FlexibleColumn.json)

## Fragments

Fragments are light-weight UI components (UI sub-trees) that have broad reuse.

- [Fragments](./definitions/Fragment.json)

## Rules

Rules are JavaScript modules that can export functionality using ES5 or ES6 syntax.

- [Rule](./Rule.md)

## Services

The .service file defines an OData or REST service destination.

- [Service](./Service.schema)

## Images

'Images' folder in metadata project contains image files that can be referenced in the app.

- [Images](./Images.md)
