# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

## [0.9.9] - 2019-12-11

## [0.9.6] - 2019-02-11

## [0.9.5] - 2019-02-11

## [0.9.4] - 2019-02-11

## [0.9.2] - 2018-05-30
- encoder /decoder refactoring, same structure like in amqp 1.0
- all 'failed' callbacks will not provide an error object anymore if the pending call was discarded due to client disconnect; one can now distinguish real errors from discarded calls

### Added

### Changed

### Removed