# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [0.9.58] - 2021-12-14

- fixed: oauth payload length issue on method fallback

## [0.9.57] - 2021-12-08

- added: oauth request timeout

## [0.9.56] - 2021-11-15

- fixed: late connection container close

## [0.9.55] - 2021-11-15

- fixed: oauth via params

## [0.9.54] - 2021-11-04

- fixed: handle null values as message payload

## [0.9.53] - 2021-09-14

- added: example for mTLS
- added: 2-mode strategy for OAuth2.0 token request (auth via header, auth via params)

## [0.9.52] - 2021-06-25

- fixed: return response payload as part of error text on failed websocket upgrade

## [0.9.51] - 2021-04-30

- fixed: count split transfer frames correctly (when maxFrameSize is smaller than payload)

## [0.9.50] - 2020-11-30

- fixed: update more precisely remoteIncomingWindow and remoteOutgoingWindow

## [0.9.48] - 2020-10-09

- fixed: README after move to npmjs

## [0.9.47] - 2020-09-22

- fixed, no endpoint error emitted at client if endpoint closed event is handled

## [0.9.45] - 2020-08-19

- fixed: null values for unused Flow frame fields

## [0.9.44] - 2020-07-31

- fixed: relax max listener for connection state, each session will listen

## [0.9.43] - 2020-06-25

- added: license file for new delivery channel
- fixed: newer Node.js version for unit tests and coverage

## [0.9.42] - 2020-06-18

## [0.9.41] - 2020-06-16

- fixed: serial number handling (as sequence number, delivery number, transfer number)

## [0.9.40] - 2020-05-29

- fixed: always copy payload if websocket writer masks data (client to server)

## [0.9.39] - 2020-03-23

- added: improved default options for better performance

## [0.9.38]- fixed: no disposition for early closed sessions (channels) - 2020-03-10

## [0.9.36] - 2020-02-12

- fixed: link state in combination with frequent state changes on same connection

## [0.9.35] - 2020-02-11

## [0.9.34] - 2019-12-23

- fixed: correct minimum value for idleTimeoutMilliseconds
- fixed: early destroy of dynamic endpoints (server-side)

## [0.9.32] - 2019-12-10

- added: echo example, receives and send via same connection
- fixed: end handling of consumer example

## [0.9.31] - 2019-11-18

- added: more fine-grained handling of idle timeout, for client and for server side

## [0.9.29] - 2019-11-15

- fixed: payload encoding independent from payload (content) type

## [0.9.28] - 2019-10-17

## [0.9.27] - 2019-10-16

- fixed: encoding of explicit bool value as application property

## [0.9.26] - 2019-10-15

- fixed: increment transfer.message.header.deliveryCount after serialization
- fixed: decode value type CHAR correctly
- fixed: application properties with long strings
- fixed: updated dependencies

## [0.9.20] - 2019-09-27

- fixed: Value Factory, AMQP type Byte, Short, Int
- added: Value Factory, AMQP type String and Symbol
- fixed: payload type amqp-1.0 for AMQP values
- added: sample to send AMQP values as payload

## [0.9.19] - 2019-07-26

- fixed: close plain TCP server

## [0.9.18] - 2019-07-23

- fixed: wrong transfer resumption in outgoing stream, when sending before ready event

## [0.9.17] - 2019-06-06

## [0.9.16] - 2019-06-06

## [0.9.15] - 2019-06-06

- fixed: flow.drain mode, missing flow response (to JMS client)

## [0.9.14] - 2019-05-22

- added: message examples in README.md
- fixed: exeption handling, init connection
- fixed: jsdoc annotations, js hint errors

## [0.9.13] - 2019-03-18

- fixed: incoming and outgoing endpoint errors
- fixed: support info fields on AMQP errors
- added: provide error object with endpoint closed events

## [0.9.10] - 2019-02-11

## [0.9.9] - 2019-02-11

## [0.9.8] - 2019-02-01

## [0.9.7] - 2019-02-01

- fixed: link handles managed per session
- fixed: endpoint state handling in case of early close
- fixed: links destroyed automatically if owning session is destroyed
- added: sender handles received flow.drain
- added: peerInfo provides complete property map in addition

## [0.9.2] - 2018-05-30

- amqp v100 client-side implementation ready
- amqp v100 server-side implementation ready