
# Device ID

## iOS
For iOS, DeviceId is based on [UIDevice.identifierForVendor](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor), which uniquely identifies a device to the app’s vendor. The value is the same for apps that come from the same vendor running on the same device. The value is different for apps on the same device that come from different vendors, and for apps on different devices regardless of vendor.

Normally, the vendor identifier is determined by the App Store. If the app wasn’t installed from the app store (such as enterprise apps and apps still in development), then a vendor identifier is calculated based on the app’s bundle ID.

## Android
For Android, DeviceId is based on [ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID), which is unique to each combination of app-signing key, user, and device. The value may change if a factory reset is performed on the device or if an APK signing key changes. Refer to the above link on when the value will change in different Android versions.

## Web

For Web, DeviceId is based on the browser's user agent.