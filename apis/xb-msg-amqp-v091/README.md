# AMQP 0.9.1 Client Library
Provides a client implementation for AMQP v0.9.1

## Table of contents
* [Prerequisites](#prerequisites)
* [Install](#install)
* [Overview](#overview)
* [Getting started](#getting-started)
* [API](#api)

## Prerequisites
Make sure to have a message broker available, e.g. [RabbitMQ](https://www.rabbitmq.com/download.html).
 
## Install
Add the SAP NPM Registry to your npm configuration for all `@sap` scoped modules.

```bash
npm config set "@sap:registry=https://npm.sap.com"
```

Add the dependency in applications `package.json` and run npm for it:

```bash
npm install
```

To generate complete API documentation run inside the library package folder

```bash
npm run doc
```

## Overview
This library provides a messaging client for [AMQP v0.9.1](http://www.amqp.org/specification/0-9-1/amqp-org-download). A single client instance represents one connection to the broker. Either TLS or NET socket is used depending on defined client options.

The API works completely asynchronous based on callbacks, often providing also done (resolve) and failed (reject) callbacks. This means it would be simple to use Promise objects in the application even if the client library so far does not use it.

AMQP v0.9.1 defines [classes and methods](http://www.rabbitmq.com/amqp-0-9-1-reference.html) (like remote procedure calls). Unfortunately, some of them do not allow a key-based mapping of responses to requests. Hence, for those methods the client has to wait for the response before a second request can be sent. The client encapsulates this and behaves always asynchronous for the caller.

## Getting started
There are examples:
* How to use plain API directly [publisher.js](examples/publisher.js) and [subscriber.js](examples/subscriber.js)
* How to use unified streams [producer.js](examples/producer.js) and [consumer.js](examples/consumer.js)

It shall run with defaults immediately if a RabbitMQ is installed at localhost:5672 with user guest/guest.
 
All examples support also individual settings, e.g. to use a remote host or to try different stream settings. It can be provided with a js-file given as command line parameter. The file shall export a client option object. Defaults will still be used for undefined fields.

## API
Create a client instance:
```bash
const options = {
    tls: {
        host: 'localhost',
        port: 5671,
        ca: [
            fs.readFileSync('../truststore/cacert.pem'),
            fs.readFileSync('../truststore/cert.pem')
        ]
    },
    net: {
        host: 'localhost',
        port: 5672,
    },
    sasl: {
        user: 'guest',
        password: 'guest'
    },
    amqp: {
        vhost: '/',
    }
};
const client = new AMQP.Client(options);
```
Either 'tls' [attributes](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback) or 'net' [attributes](https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener) must be provided, 'tls' will be preferred.

It is also possible to provide connection data as [URI](https://www.rabbitmq.com/uri-spec.html):
```bash
const options = {
    uri: 'amqp://guest:guest@localhost:5672/vhost1?heartbeat=300' 
};
const client = new AMQP.Client(options);
```
Or using 'tls' again:
```bash
const options = {
    uri: 'amqps://guest:guest@localhost:5671?cacertfile=cacert.pem&cacertfile=cert.pem'
};
const client = new AMQP.Client(options);
```

Finally, also an array of URIs can be provided:
```bash
const options = {
    uri: [
        'amqp://guest:guest@localhost:5672/vh111',
        'amqp://guest:guest@localhost:5672/vh222'
    ]
};
const client = new AMQP.Client(options);
```
The client will start using the first URI and will try further URIs automatically in the given sequence until the connection can be established. If the client fails with all URIs then it stops and waits for another explicit call to connect. At this point an event `'disconnected'` is raised.

An application that requires a permanent opened connection shall always handle the `'disconnect'` event by calling `client.connect()` again, of course after a given delay time. Timers or other mechanisms may be used, depending on the application design. Keep in mind that NodeJS runtime does not guarantee precise timer execution, it depends on the event queue load.

Finally, URIs can also be combined with all other options settings. It will just overwrite those fields that are explicitly defined in the URI. A typical example could be the following:
```bash
const options = {
    uri: [
        'amqp://guest:guest@localhost:5672/vh111',
        'amqp://guest:guest@localhost:5672/vh222'
    ]
    istreams:
    {
        in1: {channel: 1, exchange: 'amq.topic', routingKey: 'a.b.c', noAck: true},
        in2: {channel: 1, exchange: '', routingKey: 'myQueue', noAck : false, prefetchCount : 1000}
    }
    ostreams:
    {
        out1: {channel: 1, exchange: 'amq.topic', routingKey: 'a.b.c', confirms : true},
        out2: {channel: 1, exchange: 'amq.topic', routingKey: 'x.y.z', confirms : false}
    }
};
const client = new AMQP.Client(options);
```
