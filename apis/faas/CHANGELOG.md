# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [0.7.7] - 2020-03-12

## [0.7.6] - 2020-03-12

## [0.7.5] - 2020-03-11

- fixed: special handling for cloudevent response in function call, e.g. in unit tests
## [0.7.4] - 2020-03-09

## [0.7.3] - 2020-03-06

## [0.7.2] - 2020-01-31

- fixed: code completion for vscode and intellij

## [0.7.1] - 2020-01-28

- fixed: service credentials, provide only credentials content

## [0.7.0] - 2020-01-24

- optimized runtime (full separation of sdk support)
- added: context methods for service credentials
- added: event.setBadRequest()
- added: event.setUnauthorized()

## [0.6.3] - 2019-09-23

- fixed: function codes console.log() reaches runtime log in Node.js 10 or higher

## [0.6.2] - 2019-05-21

- fixed: README.md, explain faas instance descriptor
- fixed: cleanup dependencies for example
- fixed: cleanup dependencies for project template
- updated dev dependencies, e.g. nyc for code coverage

## [0.6.0] - 2019-02-15

## [0.5.1] - 2018-12-18

### Added

- initial version
- documentation
- command `faas-cli`
- init project
- init deploy values
- local run support
- unit test support
