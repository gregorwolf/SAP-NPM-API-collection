# Message Streams
Provides a client for stream-based messaging.

## Table of contents
* [Prerequisites](#prerequisites)
* [Install](#install)
* [Overview](#overview)
* [Client Options](#client-options)
* [Connections](#connections)
* [Message Streams](#message-streams)
* [Message Payload](#message-payload)
* [Payload and Websocket Data Masking](#message-payload-and-websocket-data-masking)
* [Examples](#examples)

## Prerequisites
Make sure to have a message broker available, e.g. [RabbitMQ](https://www.rabbitmq.com/download.html) installed locally, having the plugins for AMQP 1.0, MQTT 3.1.1 and WebSocket binding enabled.

## Install

See also:
[https://www.npmjs.com/package/@sap/xb-msg](https://www.npmjs.com/package/@sap/xb-msg)

To add it to your project run:
```bash
npm i @sap/xb-msg
```

To generate complete API documentation run inside the library package folder
```bash
npm run doc
```

## Overview
A messaging application shall focus on its business logic.
Bindings and protocol-specific settings shall move to configuration, without negative impact on performance.
The package provides a solution for that, wrapping protocol-specific client implementations from separate packages.

| Library               | Protocol                                                                          |
|:----------------------|:----------------------------------------------------------------------------------|
| `@sap/xb-msg-amqp-v091` | [AMQP v0.9.1](http://www.amqp.org/specification/0-9-1/amqp-org-download)          |
| `@sap/xb-msg-amqp-v100` | [AMQP v1.0](http://www.amqp.org/specification/1.0/amqp-org-download)              |
| `@sap/xb-msg-mqtt-v311` | [MQTT v3.1.1](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html) |

Direct usage of the listed libraries provides full access to protocol-specific features.
With `@sap/xb-msg-amqp-091` the application may control channels, queues and exchanges.
With `@sap/xb-msg-amqp-100` the application may for example define sessions, attach links and control link credit dynamically.
With `@sap/xb-msg-mqtt-311` last-will-messages could be used.

However, many messaging applications will have less specific requirements. It may come down to:
* Produce messages with a writable stream
* Consume messages from a readable stream
* Use messages with a binary payload
* Receive message at least once and acknowledge messages after successful processing
* Stay flexible with regards to the used messaging protocol
* But still accept the need to maintain settings on the broker side, e.g. to create queues or assign topic bindings to it

With these requirements `@sap/xb-msg` in combination with package `@sap/xb-msg-env` can be a good choice.
For example to consume messages:

```javascript
const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');

const options = env.msgClientOptions('my-service-instance', ['my-inp'], []);
const client = new msg.Client(options);

client.istream('my-inp')
    .on('error', () => {
        console.log(error);
    })
    .on('data', (message) => {
        console.log(`message: ${message.payload.toString()}`);
        message.done();
    })
;

client.connect();
```

`@sap/xb-msg-env` reads cf/xs environment variables to build up the client options (configuration).
Switching the protocol, changing the binding to queues or topics or changing the quality of service becomes possible without changing the program code.

A message producer is implemented in a similar way:
```javascript
const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');

const options = env.msgClientOptions('my-service-instance', [], ['my-out']);
const client = new msg.Client(options);

client.ostream('my-out')
    .on('ready', () => {
        send();
    })
    .on('drain', () => {
        send();
    })
    .on('error', (error) => {
        console.log(error);
    })
;

client.connect();
```

Finally, using an own `Transform` stream (here class `Converter`) the application can also rely on fully automated flow control:
```javascript
const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');

const options = env.msgClientOptions('my-service-instance', ['my-inp'], ['my-out']);
const client = new msg.Client(options);

client.istream('my-inp')
    .pipe(new Converter())
    .pipe(client.ostream('my-out'))
;

client.connect();
```

## Client Options
The client employs protocol-specific libraries that require protocol-specific settings, at least for stream definitions.
For example, MQTT will accept a property `qos` whereas `AMQP 1.0` accepts `sndSettleMode` and `rcvSettleMode`.
However, these differences are restricted to the configuration.
At runtime the application will always see a unified client behavior.

## Connections
Based on client options one or more connections can be created, each for one of the supported protocols and each providing multiple incoming or outgoing streams.
As soon as a client instance is connected the application can produce and/or consume messages.

Connections via 'net' and 'tls' are supported for all protocols.
Websocket is specified and in consequence implemented for MQTT 3.1.1 and AMQP 1.0 only. Use options attribute 'wss' or 'ws'.

WebSocket connections can also be established using [OAuth 2.0](https://oauth.net/2/), for example when connecting a local application to SAP cloud.
Relevant grant flows are: [ClientCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.4) and [ResourceOwnerPasswordCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.3).

If multiple settings are provided the preference is as follows: preferred 'tls' then 'net' then 'wss' then finally 'ws'.

## Message Streams
`Writable` and `Readable` streams are provided to handle outgoing and incoming messages.
These streams always run in object mode.

Here, a single message is represented as a plain object with the following attributes:
* `source`: defined by the incoming stream,
* `target`: defined optionally by the application, similar to the source, accepted by the outgoing stream,
* `payload`: message payload,
* `done()`: a callback function to confirm final message processing,  
* `failed(error)`: a callback function to indicate processing failure.

A receiving application is expected to call either `done` or `failed` for each single message, exactly one time (maybe asynchronously) and independent from the used quality of service.
A sending application can define the callbacks to get notified about the message state.
 
```bash
const message = {
    payload : Buffer.from('test'),
    done : () => this._onSendDone(message),
    failed : (error) => this._onSendFailed(error, message)
};
const noPause = stream.write(message);
```

In any case the application is expected to implement the flow control of writable streams correctly.

## Message Payload

The application may provide the message payload for an outgoing message as follows:
* a `Buffer` object,
* an `Array` of `Buffer` objects,
* a `Payload` object or a plain object with same properties as `Payload`.

Common properties of a `Payload` object (specific protocol clients add more data):
* `chunks`: an Array of Buffer objects,
* `type`: an optional string providing the content type (not supported with MQTT)

After the payload was given to a sender it must not be modified by the application anymore.

Incoming messages will always provide a `Payload` object, just for application convenience.

## Examples

In folder `examples` there are test programs, ready to run if a broker can be reached locally at the protocol-specific default port.
Folder `examples/cfg` provides sample configurations.

