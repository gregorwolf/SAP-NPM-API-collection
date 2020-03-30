# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.8.2 - 2020-03-19

### Added

- It is now possible to set the queue configuration with the `queueConfig` property in the credentials section
  https://help.sap.com/doc/75c9efd00fc14183abc4c613490c53f4/Cloud/en-US/rest-management-messaging.html#_queuep

### Removed

- Bound events are not supported anymore

## Version 1.7.0 - 2020-02-19

### Changed

- Updated version number for public release

## Version 1.6.0 - 2020-02-05

### Added

- Support for `prefix` credentials options to prefix topics

### Changed

- You can no longer set the namespace outside of the `credentials` block

### Fixed

- Fixed bug where non-trimmed data causes problems in file-based messaging

## Version 1.5.0 - 2019-12-10

### Fixed

- Receiving chunks can be an array with more than one item

## Version 1.4.0 - 2019-11-19

### Removed

- The `namespace` property of a services does not need to be set anymore

## Version 1.3.0 - 2019-10-29

### Removed

- `npm-shrinkwrap.json`

## Version 1.2.1 - 2019-10-16

### Added

- `headers` parameter for `.emit`
 
## Version 1.2.0 - 2019-10-02

### Changed

- Minor improvements

## Version 1.1.1 - 2019-09-18

### Added

- File-based-messaging: If you set the file to true or "default", the default file name is chosen

### Changed

- File-based-messaging: Default file location ist set to <tmp_dir>/cds-message-box
- File-based-messaging: File configuration is moved to credentials block
- For external (cloud-event-based) services, the data property is now in message.data (before it was message.data.data)

## Version 1.1.0 - 2019-09-09

### Added

- Queue name can be specified by setting the `queue` property
- You can now use `srv.on('my/custom/topic', ()={...})` to register on topics
  and `srv.emit('my/custom/topic, {...})` to emit messages with topics (If your
  topic contains only one segment, you must write `topic:myCustomTopic`)

### Changed

- The hashes in generated topic or queue names now only consist of 4 characters
- Default file name of 'file-based-messaging' is <temporary_directory>/message_box

### Fixed

- Special characters in topic and queue names are now omitted
- Non-JSON payloads are now ignored
- OAuthToken request occacionally fails

### Removed

- `srv.on.topic` and `srv.emit.to.topic`

## Version 1.0.1 - 2019-08-26

### Changed

- Package '@sap/xb-msg-amqp-v100' is only dev dependency

## Version 1.0.0 - 2019-08-21

### Added

- Initial implementation
