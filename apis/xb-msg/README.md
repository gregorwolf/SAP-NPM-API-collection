# Stream-based Messaging
Provides a client for stream-based messaging.

## Table of contents
* [Prerequisites](#prerequisites)
* [Install](#install)
* [Overview](#overview)
* [Getting started](#getting-started)
* [API](#api)
* [Examples](#examples)

## Prerequisites
Make sure to have an message broker available, e.g. [RabbitMQ](https://www.rabbitmq.com/download.html).

## Install
Direct from GIT

```bash
npm install @sap/xb-msg
```

## Overview
A messaging application shall focus on its business logic. Bindings and protocol-specific settings shall move to configuration, without negative impact on performance.

The package provides a solution for that, wrapping protocol-specific client implementations from separate packages.

The following protocols are supported:
* [AMQP v0.9.1](http://www.amqp.org/specification/0-9-1/amqp-org-download)
* [AMQP v1.0.0](http://www.amqp.org/specification/1.0/amqp-org-download)
* [MQTT v3.1.1](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html)

After the client is created and connected the application can start writing to and/or reading from named stream instances.

Based on the client options one or more connections will be created, each for one of the supported protocols and each providing mutiple inbound or outbound streams.
All stream IDs must be unique in the scope of one client instance.

In the simplest case the options are taken from environment variables (e.g. cf user-provided-service, see package @sap/xb-msg-env). Hence, switching the protocol, changing the binding to queues or topics or changing the quality of service becomes possible without changing the program code, the latter of course only if messages done/failed callbacks are already invoked at the appropriate point in time.

The options start with host, port and credentials, but go optionally also down to fine-tuning of chunk sizes and high-water-marks.

If more precise control on protocol-level is needed then the underlying protocol-specific clients can be used directly, accepting a direct dependency, but getting more fine-grained control.

## API
Create a messaging client and start consuming messages.

```bash
const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');

/* get options from cf/xsa environment */
const options = env.msgClientOptions('msg-instance-01', ['MyInpA'], []);

/* start messaging */
const client = new msg.Client(options);

client.istream('MyInpA')
    .on('subscribed', () => {
        console.log('subscribed');
    })
    .on('data', (message) => {
        console.log('message: ' + message.payload.toString());
        message.done();
    });

client.connect();
```

Create a messaging client and start producing messages.

```bash
const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');

/* get options from cf/xsa environment */
const options = env.msgClientOptions('msg-instance-01', [], ['MyOutB']);

/* start messaging */
const client = new msg.Client(options);

client.ostream('MyOutA')
    .on('ready', () => {
        send();
    })
    .on('drain', () => {
        send();
    })
    .on('error', (error) => {
        console.log(error);
    });

client.connect();
```

Create a messaging client and use an own transform stream as message converter.

```bash
const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');

/* get options from cf/xsa environment */
const options = env.msgClientOptions('msg-instance-01', ['MyInpA'], ['MyOutB']);

/* start messaging */
const client = new msg.Client(options);

client.istream('MyInpA').pipe(new Converter()).pipe(client.ostream('MyOutB'));

client.connect();
```

Connections via 'net' and 'tls' are supported for all protocols. For MQTT also WebSocket via 'https' or 'http' can be used. If multiple settings are provided the preference is as follows: preferred 'tls' then 'net' then 'wss' then finally 'ws'. 

## Examples

In folder 'examples' there are test programs, ready to run if a broker can be reached locally at the protocol-specific default port.
Folder 'examples/cfg' provides sample configurations.

