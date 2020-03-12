# @sap/xb-msg-mqtt-v311
Provides a protocol implementation for [MQTT 3.1.1](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html).

## Table of contents
* [Prerequisites](#prerequisites)
* [Install](#install)
* [Overview](#overview)
* [Getting started](#getting-started)
* [API](#api)
* [Limitations](#limitations)

## Prerequisites
Make sure to have an message broker available, e.g. [RabbitMQ](https://www.rabbitmq.com/download.html) with enabled MQTT plugin.

## Install
Add the SAP NPM Registry to your npm configuration for all `@sap` scoped modules.

```bash
npm config set "@sap:registry=https://npm.sap.com"
```

Add the dependency in applications `package.json` and run npm for it:

```bash
npm install
```

## Overview
This library provides a messaging client for [MQTT 3.1.1](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html). A single client instance represents one connection to the broker.

Either TLS or NET socket is used, depending on defined client options. Besides plain TCP/IP also WebSocket is supported, with and without [OAuth 2.0](https://oauth.net/2/), grant flows [ClientCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.4) and [ResourceOwnerPasswordCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.3).

The API works completely asynchronous based on callbacks, often providing also done (resolve) and failed (reject) callbacks. This means it would be simple to use Promise objects in the application even if the client library so far does not use it.

## Getting started
There are test programs in the package folder `./examples`:
* How to use plain API directly [publisher.js](examples/publisher.js) and [subscriber.js](examples/subscriber.js)
* How to use unified streams [producer.js](examples/producer.js) and [consumer.js](examples/consumer.js)

It shall run with defaults immediately if for example a RabbitMQ with active MQTT plugin is listening at `localhost:1883` with default settings.

All examples support individual settings, e.g. to use a remote host or to try different stream settings. It can be provided with a js-file given as command line parameter. The file shall export a client option object. Defaults will still be used for undefined fields.

## API
The library provides a client class.
```bash
const MQTT = require('@sap/xb-msg-mqtt-v311');

...
const client = new MQTT.Client(options);
...
```

### Client Options
Create a client instance using plain TCP:
```bash
const options = {
    net: {
        host: 'localhost',
        port: 1883
    },
    credentials: {
        user: '',
        password: ''
    },
    mqtt: {
        clientID : '',
        cleanSession : true,
        keepAlive : 30
    }
};

const client = new MQTT.Client(options);
```

or plain TCP with TLS connection:

```bash
const options = {
    tls: {
        host: 'localhost',
        port: 8883,
        ca: [
            fs.readFileSync('../../../truststore/cacert.pem'),
            fs.readFileSync('../../../truststore/cert.pem')
        ]
    },
    credentials: {
        user: '',
        password: ''
    }
};

const client = new MQTT.Client(options);
```
as well as MQTT over WebSocket (HTTP):
 
```bash
const options = {
    ws: {
        host: 'localhost',
        port: 80,
        path: '/'
        auth: 'webUser:webPass'
    }
    credentials: {
        user: 'mqttUser',            // used in CONNECT packet 
        password: 'mqttPass'         // used in CONNECT packet
    }
};

const client = new MQTT.Client(options);
```

or MQTT over WebSocket using TLS (HTTPS):

```bash
const options = {
    wss: {
        host: 'localhost',
        port: 443,
        path: '/',
        ca: [
            fs.readFileSync('../../../truststore/cacert.pem'),
            fs.readFileSync('../../../truststore/cert.pem')
        ]
    },
    credentials: {
        user: '',
        password: ''
    }
};

const client = new MQTT.Client(options);
```

Either 'tls' [attributes](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback), 'net' [attributes](https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener), wss [attributes](https://nodejs.org/api/https.html#https_https_request_options_callback) or ws [attributes](https://nodejs.org/api/http.html#http_http_request_options_callback) must be provided. If more than one is provided the preference is as follows: preferred 'tls' then 'net' then 'wss' then finally 'ws'.

In case of WebSocket options the client will overwrite HTTP method (GET) and all web-socket relevant header fields. Everything else is given to http.request() or https.request().

It is also possible to provide connection data as [URI](https://github.com/mqtt/mqtt.github.io/wiki/URI-Scheme):
```bash
const options = {
    uri: 'mqtt://user:pass@localhost:1883/?keepalive=300&clientid=abcd'
};
const client = new MQTT.Client(options);
```
Or using 'tls' again:
```bash
const options = {
    uri: 'mqtts://user:pass@localhost:8883?cacertfile=cacert.pem&cacertfile=cert.pem'
};
const client = new MQTT.Client(options);
```

Finally, also an array of URIs can be provided:
```bash
const options = {
    uri: [
        'mqtt://user11:pass11@host11:1883/?heartbeat=300',
        'mqtt://user22:pass22@host22:1884/'
    ]
};
const client = new MQTT.Client(options);
```
The client will start using the first URI and will try further URIs automatically in the given sequence until the connection can be established. If the client fails with all URIs then it stops and waits for another explicit call to connect. At this point an event `'disconnected'` is raised.

An application that requires a permanent opened connection shall always handle the `'disconnect'` event by calling `client.connect()` again, of course after a given delay time. Timers or other mechanisms may be used, depending on the application design. Keep in mind that NodeJS runtime does not guarantee precise timer execution, it depends on the event queue load.

Finally, URIs can also be combined with all other settings. URI data (as far as provided) will just overwrite the corresponding fields. A typical example could be the following:
```bash
const options = {
    uri: [
        'mqtt://user11:pass11@host11:1883/?keepalive=300',
        'mqtt://user22:pass22@host22:1884/?clientid=myCID'
    ]
    mqtt: {
        clientID: '',
        keepAlive: 60
    },
    istreams: {
        in1: {topic: 'a/b/c/d', qos: 1},
        in2: {topic: 'x/y/z/#', qos: 1}
    }
    ostreams: {
        out1: {topic: 'test/out1', qos: 0},
        out2: {topic: 'test/out2', qos: 2}
    }
};
const client = new MQTT.Client(options);
```

WebSocket connections may require the use of [OAuth 2.0](https://oauth.net/2/) as well. Relevant grant flows are: [ClientCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.4) and [ResourceOwnerPasswordCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.3). One example is an external application, connecting to the cloud.

```bash
const options = {
    oa2: {
        endpoint: 'https://myzone.authentication.sap.hana.ondemand.com/oauth/token',
        client: 'myclientid',
        secret: 'myclientsecret',
    },
    wss: {
        host: 'myapp.cfapps.sap.hana.ondemand.com',
        port: 443,
        path: '/'
    }
};

const client = new MQTT.Client(options);
```

After an connection has been established the application may start to publish and/or subscribe. Details can be found in the sample applications, in project folder `./examples`.

### Message Payload
The application may provide message payload as follows:

* a simple Buffer object,
* an Array of simple Buffer objects or
* a Payload (see API) object, mainly for compatibility with other @sap/xb-msg* libraries.

After the payload was handed over to the client the buffer content must not be modified by the application.
And as soon as the buffer size exceeds `options.tune.ostreamPayloadCopyLimit` (default 1024 bytes, minimum 128 bytes) the client will not copy these data, but will directly push it to the network socket.

Using a plain TCP connection the data will be sent unchanged.
Running a WebSocket connection the encoder will have to mask (means to modify) all data before sending.

Hence, if (and only if) an application
* uses WebSocket connections and
* uses payload buffer objects larger than the defined payload copy limit and
* re-uses the same buffer object(s) for multiple messages then

it must take copy of those buffer objects itself before calling the client to publish.

Typically, the payload is created per message and released by application already after calling the client to publish.
In this case do not copy anything.

## Limitations
Currently, you may only set the MQTT flag `cleanSession` to true.



