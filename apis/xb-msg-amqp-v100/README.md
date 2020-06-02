# @sap/xb-msg-amqp-v100
Provides a protocol implementation for [AMQP 1.0](http://www.amqp.org/specification/1.0/amqp-org-download).

## Table of contents

* [Prerequisites](#prerequisites)
* [Install](#install)
* [Overview](#overview)
* [Getting started](#getting-started)
* [API](#api)
    * [Client Options](#client-options)
    * [Server Options](#server-options)
    * [Idle Timeout](#idle-timeout)
    * [Endpoints](#endpoints)
        * [Dynamic Endpoints](#dynamic-endpoints)
        * [Common Behavior](#common-endpoint-behavior)
        * [Session](#session)
        * [Sender](#sender)
        * [Outgoing Stream](#outgoing-stream)
        * [Delivery Tags](#delivery-tags)
        * [Receiver](#receiver)
        * [Incoming Stream](#incoming-stream)
    * [Message Delivery](#message-delivery)
        * [Streams](#message-streams)
        * [Piped Streams](#piped-message-streams)
        * [Message Source and Target](#message-source-and-target)
        * [Convert Source and Target](#convert-source-and-target)
        * [Variable Message Routing](#variable-message-routing)
        * [Quality of Service](#quality-of-service)
        * [Mixed Quality of Service](#mixed-quality-of-service)
        * [Flow Control](#flow-control)
        * [Payload](#message-payload)
        * [Payload and AMQP values](#message-payload-and-amqp-values)
    * [Message Examples](#message-examples)
* [Limitations](#limitations)
* [Further Links](#further-links)

## Prerequisites

Make sure to have a message broker available for testing, e.g. [RabbitMQ](https://www.rabbitmq.com/download.html) with enabled AMQP 1.0 plugin.

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

This library provides a messaging client as well as classes to realize a server for [AMQP 1.0](http://www.amqp.org/specification/1.0/amqp-org-download).
It has been tested successfully in combination with:
* RabbitMQ, version `3.6.6`
* Solace VMR, as of version `8.5.0.1008`
* AMQPNetLite, version `2.1.1`
* Apache Qpid Proton, version `0.23.0` (and electron go client)
* Apache Qpid Proton-J, version `0.23.0`
* Apache Qpid-JMS client, version `0.40.0`
* Golang pack.ag/amqp, version `0.10.2`
* Azure Service Bus, Queue

Either TLS or NET socket is used, depending on the defined client options.
Besides plain TCP/IP also WebSocket is supported, with and without [OAuth 2.0](https://oauth.net/2/), grant flows [ClientCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.4) and [ResourceOwnerPasswordCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.3).

The API works completely asynchronous based on callbacks, typically providing done (resolve) and failed (reject) callbacks.
Hence, it will be simple to use Promise objects in the application even if this library does not use it so far.

## Getting started

There are test programs in the package folder `./examples` to demonstrate:
* How to use a client as [producer](examples/producer.js), [consumer](examples/consumer.js) or [counter](examples/counter.js)
* How to realize a server, here first basics for a protocol [gateway](examples/gateway.js)

All client examples shall run with provided defaults immediately if e.g. RabbitMQ is installed at localhost:5672 with user guest/guest, having the AMQP 1.0 plugin enabled.
Alternatively, the producer may run in combination with the gateway example.

All examples accept individual settings, e.g. to use a remote host or to try different stream settings.
It can be provided with a js-file given as command line parameter. The file shall just export the options.
Run it like this if the file is stored in folder ```config```, same level as ```examples```.

```bash
node .\examples\producer.js ..\config\my-options.js
```

Feel free to start testing with the following file content:

```bash
'use strict';

module.exports = {
    net: {
        host      : '127.0.0.1',
        port      : 5672
    },
    sasl: {
        mechanism : 'PLAIN',
        user      : 'guest',
        password  : 'guest'
    },
    data: {
        source    : 'q001', // a queue name, source address for a receiver
        target    : 'q002', // a queue name, target address for a sender
        payload   : Buffer.allocUnsafe(50).fill('X'),
        maxCount  : 10000,
        logCount  : 1000
    }
};
```

The `data` section is ignored by the client, it is just used by the example programs.

## API

First, the library provides a `Client` class. It represents one AMQP container and is able to manage one connection.
`Session`, `Sender` and `Receiver` are provided as endpoints.
Readable/Writable streams are used to consume/produce messages.

For the server implementation a basic `Server` class is provided.
Like `Client` it supports connections running plain TCP (net/tls) as well as WebSocket (http/https).

Incoming connections are represented as instances of the `Connection` class.
`Connection` instances can also be created by an application-specific, more specialized server class.
It could for example support different connection types or WebSocket sub-protocols in parallel or could apply more strict validation rules.

### Client Options

Client instances are created directly, just providing options to the constructor:

```bash
const AMQP = require('@sap/xb-msg-amqp-v100');

...
const client = new AMQP.Client(options);
...
```

Options for a plain TCP connection, authenticating with user/password only:

```bash
const options = {
    net: {
        host: 'localhost',
        port: 5672,
    },
    sasl: {
        mechanism: 'PLAIN',
        user: 'guest',
        password: 'guest'
    }
};
```

Options for a plain TCP connection, using TLS and special trusts:

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
    sasl: {
        mechanism: 'PLAIN',
        user: 'guest',
        password: 'guest'
    }
};
```

Options to run AMQP over WebSocket (HTTP):

```bash
const options = {
    ws: {
        host: 'localhost',
        port: 80,
        path: '/'
        auth: 'webUser:webPass'
    }
    sasl: {
        mechanism: 'PLAIN',
        user: 'guest', 
        password: 'guest'
    }
};
```

Options to run AMQP over WebSocket, using TLS (HTTPS) with well-known CA:

```bash
const options = {
    wss: {
        host: 'myhost',
        port: 443,
        path: '/'
    },
    sasl: {
        user: 'guest',
        password: 'guest'
    }
};
```

Either 'tls' [attributes](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback), 'net' [attributes](https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener), wss [attributes](https://nodejs.org/api/https.html#https_https_request_options_callback) or ws [attributes](https://nodejs.org/api/http.html#http_http_request_options_callback) must be provided.
If more than one is defined the preference is as follows: preferred 'tls' then 'net' then 'wss' then finally 'ws'.

In case of WebSocket options the client will overwrite the HTTP method (with GET) and all web-socket relevant header fields.
Everything else is given to `http.request()` or `https.request()`.

Hence, you could for example use a specialized https agent:

```bash
const HttpsProxyAgent = require('https-proxy-agent');

...
const options = {
    wss: {
        host : 'my.host.behind.proxy',
        port : 443,
        path: '/',
        agent: new HttpsProxyAgent('http://proxy:8080')
    },
    sasl: {
        user: 'guest',
        password: 'guest'
    }
};
```

It is also possible to provide connection data as URI.

```bash
const options = {
    uri: 'amqp://user:pass@localhost:5672/?container=myAMQPContainerID'
};
```

To use 'tls' again with own trust:

```bash
const options = {
    uri: 'amqps://user:pass@localhost:5671?cacertfile=cacert.pem&cacertfile=cert.pem'
};
```

Finally, also an array of URIs can be provided:

```bash
const options = {
    uri: [
        'amqp://user11:pass11@host11:7777/?container=ABC123',
        'amqp://user22:pass22@host22:9999/?container=XYZ789'
    ]
};
```

The client will start using the first URI and will try further URIs automatically in the given sequence until the connection can be established.
If the client fails with all URIs then it stops and waits for another explicit call to connect.
At this point an event `'disconnected'` is raised.

An application that requires a continuously opened connection shall always handle the `'disconnected'` event by calling `client.connect()` again, of course after a given delay time.
Timers or other mechanisms may be used, depending on the application design.
But keep in mind that NodeJS runtime does not guarantee precise timer execution. The scheduling depends on the event queue load.

Finally, URIs can also be combined with all other settings. URI data (as far as provided) will just overwrite the corresponding fields.
A typical example:

```bash
const options = {
    uri: [
        'amqp://user11:pass11@host11:7777',
        'amqp://user22:pass22@host22:9999'
    ]
    amqp: {
        containerID: '',               // auto-generated by client
        maxMessageSize: 1000000        // bytes
        autoDeliveryTagPrefix: 'tag-',
        outgoingSessionWindow: 1000,
        incomingSessionWindow: 1000,
        maxReceiverLinkCredit: 255,
        minReceiverLinkCredit: 200
    }
};
```

WebSocket connections may require the use of [OAuth 2.0](https://oauth.net/2/) as well, for example a local application connecting to SAP cloud.
Relevant grant flows are: [ClientCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.4) and [ResourceOwnerPasswordCredentialsFlow](https://tools.ietf.org/html/rfc6749#section-4.3).

```bash
const options = {
    wss: {
        host: 'myapp.cfapps.sap.hana.ondemand.com',
        port: 443,
        path: '/'
    },
    oa2: {
        endpoint: 'https://myzone.authentication.sap.hana.ondemand.com/oauth/token',
        client: 'myclientid',
        secret: 'myclientsecret',
    },
    sasl: {
        mechanism: 'ANONYMOUS',
        identity: 'test.user@sap.com'
    }
};
```

Further settings for the OAuth token request, for example a special agent:

```bash
const options = {
    wss: {
        host: 'myapp.cfapps.sap.hana.ondemand.com',
        port: 443,
        path: '/'
        agent: new HttpsProxyAgent('http://proxy:8080')
    },
    oa2: {
        endpoint: 'https://myzone.authentication.sap.hana.ondemand.com/oauth/token',
        client: 'myclientid',
        secret: 'myclientsecret',
        request: {
            agent: new HttpsProxyAgent('http://proxy:8080')
        }
    },
    sasl: {
        mechanism: 'ANONYMOUS',
        identity: 'test.user@sap.com'
    }
};
```

### Server Options

Similar to the client class new `Server` instances are created, using the constructor:

```bash
const AMQP = require('@sap/xb-msg-amqp-v100');

...
const server = new AMQP.Server(options);
...
server.listen();
```

Options for plain TCP connections, accepting two SASL mechanisms (validation triggered by event):

```bash
const options = {
    net: {
        port: 9999,
    },
    sasl: {
        mechanism: 'ANONYMOUS PLAIN',
    }
};
```

To use WebSocket with or without SASL processing, both possible in parallel:

```bash
const options = {
    ws: {
        port: 8888,
    },
    sasl: {
        mechanism: 'ANONYMOUS PLAIN',
        mandatory: false
    }
};
```

Secure plain TCP connections and more restrictive protocol settings:

```bash
const options = {
    tls: {
        port: 5671,
    },
    sasl: {
        mechanism: 'PLAIN EXTERNAL',
    },
    amqp: {
        outgoingSessionWindow: 100,
        incomingSessionWindow: 100,
        maxReceiverLinkCredit: 10,
        minReceiverLinkCredit: 5
        maxMessageSize: 10000 // bytes
    }
}
```

The server will create one `Connection` instance for each incoming client connection.
When running an own (more specialized) server similar instances can be created.

The AMQP protocol is completely handled by the `Connection` class.
It requires the same options as the `Server` class, but uses only the sections `sasl`, `amqp` and `tune`.

```bash
const AMQP = require('@sap/xb-msg-amqp-v100');

const options = {
    sasl: {
        mechanism: 'PLAIN'
    },
    amqp: {
        outgoingSessionWindow: 100,
        incomingSessionWindow: 100,
        maxReceiverLinkCredit: 10,
        minReceiverLinkCredit: 5,
        maxMessageSize: 10000 // bytes
    }
    tune: {
        ostreamPayloadCopyLimit: 1024 // bytes
    }
}

function init(socket) {
    try {
        const connection = new Connection(socket, 'net', options);
        ...
        connection
            .once('authenticate', (mechanism, data, callback) => {...}
            .once('ready', (peerInfo) => {...}
            .once('abort', (hadError) => {...}
            .once('close', (hadError) => {...}
            .on('error', (error) => {...}
            .on('sender', (endpoint) => {...}
            .on('receiver', (endpoint) => {...}
        ;
        ...
    } catch(e) {
        socket.destroy(e);  // if e.g. options were not accepted
    }
} 
```

The [gateway](examples/gateway.js) example uses all of the defined events, you may compare it as check list.
More details can also be found in JSDoc.

`Connection` instances behave always the same, independent from the used server class.
Each instance offers the expected endpoints: `Session`, `Sender`, `Receiver`.

### Idle Timeout

While opening a new connection both peers can declare an [idle timeout](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#doc-doc-idle-time-out).
It means to expect receiving any frame within this time or to close the connection otherwise.
The behavior is similar for client and server. And for both sides this library supports the following options:

* `idleTimeoutMilliseconds`: specifies the timeout value in milliseconds, 0 means no timeout. The value will be provided to [`net.setTimeout()`](https://nodejs.org/dist/latest-v12.x/docs/api/net.html#net_socket_settimeout_timeout_callback)
* `idleTimeoutTryKeepAlive`: defines the timeout behavior, indicates whether to send an empty frame to keep the connection alive or to end the connection, sending a close frame with an appropriate error message.
* `adjustSelfIdleTimeout`: optional callback to recalculate the own timeout after peer information are available, the default implementation calculates the minimum of the own timeout and the half of peers timeout, but only if running in keep alive mode.

Client defaults:
```bash
const options = {
    amqp: {
        idleTimeoutMilliseconds: 90000,
        idleTimeoutTryKeepAlive: true,
        adjustSelfIdleTimeout: adjustSelfIdleTimeout // callback
    }
}

```  
Server defaults:
```bash
const options = {
    amqp: {
        idleTimeoutMilliseconds: 180000,
        idleTimeoutTryKeepAlive: false,
        adjustSelfIdleTimeout: adjustSelfIdleTimeout // callback
    }
}

```  

### Endpoints

Once a connection has been established its usage is quite symmetric for both peers.
At least foreseen by the specification client and server both can begin and end sessions as well as attach and detach incoming or outgoing links.

For example, a server may wait for clients to connect and may afterwards immediately begin a session, attach an outgoing link and may finally start sending messages (that the client has never asked for).

However, in typical scenarios the client takes the active role and the server will wait for client requests.
In particular, if the server is actually a message broker this is the expected behavior.

#### Dynamic Endpoints

The boolean endpoint property _dynamic_ indicates whether or not an endpoint was created on peers request.
`Session`, `Sender` and `Receiver` provide a common getter for it.
The property is not covered by the specification, it is just used by this API as part of the endpoint lifecycle control.

`Client` and `Connection` both support _dynamic_ endpoints as follows:

* raise an event each time a dynamic endpoint was created and opened the very first time,
* destroy it immediately if the event is not handled to avoid uncontrolled resource consumption,
* destroy it automatically latest on connection close,
* allow the application to destroy it at any earlier point in time.

In addition the `Client` allows to create _non-dynamic_ endpoints, which stay registered by `name` or `id` until the application destroys it explicitly.
Those endpoints can be used at any point in time, with or without an opened connection.

#### Common Endpoint Behavior

Overview on common methods for `Session`, `Sender` and `Receiver` (check JSDoc for details):

* `dynamic()`: returns `true` if the endpoint was created on peers request,
* `active()`: returns `true` if the endpoint gets opened automatically once `Client` is connected,
* `opened()`: returns `true` if local and remote endpoint are interactive, 
* `closed()`: returns `true` if local and remote endpoint are neither opened nor on the way to open,
* `destroyed()`: returns true if the endpoint was destroyed; it is not registered anymore,
* `destroy()`: will immediately destroy the endpoint and cancel all of its messages in transit.

Overview on common events for `Session`, `Sender` and `Receiver` (check JSDoc for details):

* `opened`: raised if the local and the remote endpoint are both opened,
* `closed`: raised if the local and the remote endpoint are both not opened,
* `destroy`: raised before the local endpoint is destroyed, application shall release any reference.

Further methods and events depend on the specific endpoint type and applicable performatives.

#### Session

Each [session](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#section-sessions) groups multiple [links](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#section-links) and provides a higher-level flow control.
For a single connection multiple sessions can be used, but one session is usually sufficient.

A stable session identifier (comparable to a link name) is not defined by the specification.
That's why, the library introduces an identifier (a simple string) just for local usage and applications convenience.
It is never visible to the peer.

There is one default session in use, identified with an empty string:

```bash
const defSession = client.session('');
...
const anySession = client.session('anyLocalID');
```

Overview on `Session` specific methods (check JSDoc for details):

* all [common endpoint methods](#common-endpoint-behavior) and
* `begin(outgoing, incoming, options)`: _begin_ session, all parameters optional and defaulted by client options,
* `flow(outgoing, incoming)`: change current incoming and outgoing window size,
* `end()`: _end_ the session, no messages will be sent or received, attached outgoing streams will wait based on flow control.

Overview on `Session` specific events (check JSDoc for details):

* all [common endpoint events](#common-endpoint-behavior) and
* `flow`: flow settings were updated by the corresponding remote endpoint.  

A session will automatically _begin_ if at least one active link endpoint is assigned to it.
However, this can also be triggered explicitly.

```bash
client.session('').begin(200, 200);
```

The inherited method `destroy()` will first destroy all currently attached links before destroying itself.

#### Sender

Each `Sender` offers an `OutgoingStream` which extends the NodeJS stream class `Writable`.
The stream runs in object mode and expects plain message objects (see also [Message Streams](#message-streams)).

Overview on `Sender` methods (check JSDoc for details):

* all [common endpoint methods](#common-endpoint-behavior) and
* `session()`: returns the currently assigned session endpoint,
* `name()`: returns the link name,
* `options()`: returns current settings as plain object,
* `stream()`: returns the currently associated stream,
* `attach()`: update settings, create the stream, _attach_ the link and return the stream,
* `detach()`: destroy the stream and _detach_ the link,

A `Sender` provides only the [common endpoint events](#common-endpoint-behavior) (check JSDoc for details):

Method `attach()` may also be called if the client is not connected.
This will switch the endpoint in active mode and it will automatically _attach_ whenever a connection is opened successfully.

Immediately after calling `attach()` the application may also start using the stream.
In any case flow control must be handled correctly, based on the standard NodeJS stream API.

As long as the endpoint is `active()` it will try to send all queued messages.
Even if the connection is interrupted the endpoint will resume its work as soon as the connection is opened again.

The inherited method `destroy()` will first _detach_ the endpoint before destroying its stream and finally itself.
Destroying the stream means all queued messages including those that are already in transit will be cancelled.
The message `failed` callback is used to notify the application.

The application may also call `stream.end()` to indicate end of usage.
New messages are not accepted anymore, but all queued messages will be processed before the link is detached.

A `Sender` manages one instance of an `OutgoingStream`.

#### Outgoing Stream

Overview on `OutgoingStream` methods (check JSDoc for details):

* all methods of `Writable` and
* `sender(): Sender`: returns the associated sender endpoint,
* `newDeliveryTag():string`: returns a new delivery tag that can be registered by application before usage,
* `flow(available)`: send the amount of locally available messages,
* `delivered():UInt`: returns the amount of delivered messages,
* `available():UInt`: returns the amount of available messages,
* `credit():UInt`: returns the remaining message transfer credit,

Overview on `OutgoingStream` events (check JSDoc for details):
* all events of `Writable` and
* `ready`: indicates the stream is attached and messages will now really be sent, not only queued.

```javascript
stream
    .on('ready', () => {
        send();
    })
    .on('drain', () => {
        send();
    })
    .on('finish', () => {
        client.disconnect();
    })
;
```

See also the [producer](examples/producer.js) example.

#### Delivery Tags

If the application writes a message without a `message.target.deliveryTag` to an outgoing stream then this tag will be generated automatically.
The result will be the same as if the application would have called `stream.newDeliveryTag()` first and would have assigned the new tag to a message, but the application was not able to register the tag for any kind of message correlation later on.

Generated delivery tags will start with `options.amqp.autoDeliveryTagPrefix`, by default `'tag-'`.
Hence, the application may also use own delivery tags in parallel with generated tags, easily avoiding duplicate tags being used.

#### Receiver

Each `Receiver` offers an `IncomingStream` which extends the NodeJS stream class `Readable`.
The stream runs in object mode and manages plain message objects (see also [Message Streams](#message-streams)).

Overview on `Receiver` methods (check JSDoc for details):

* all [common endpoint methods](#common-endpoint-behavior) and
* `session()`: returns the currently assigned session endpoint,
* `name()`: returns the link name,
* `options()`: returns current settings as plain object,
* `stream()`: returns the currently associated stream,
* `attach()`: update settings, create the stream, _attach_ the link and return the stream,
* `detach()`: destroy the stream and _detach_ the link,

A `Receiver` provides only the [common endpoint events](#common-endpoint-behavior) (check JSDoc for details):

Method `attach()` may also be called if the client is not connected and it will return the stream already.
The endpoint is switched into active mode and will automatically _attach_ whenever a connection is opened successfully.

The inherited method `destroy()` will first _detach_ before destroying its stream and finally itself.
Destroying the stream means:

* all queued messages will be deleted immediately; it will not reach the application anymore, 
* for messages in transit (already provided to the application, but not yet done) a following `done()` callback is ignored,

A `Receiver` manages one instance of an `IncomingStream`.

#### Incoming Stream

The IncomingSteam handles also flow control for the application.
It can renew the transfer credit after it was consumed and it can reduce the credit if application has to consume slower as the sender can send.

Overview on `IncomingStream` methods (check JSDoc for details):

* all methods of `Readable` and
* `receiver(): Receiver`: returns the associated receiver endpoint,
* `flow(maxCredit, minCredit)`: updates message transfer credit settings,
* `delivered():UInt`: returns the amount of messages received by this stream,
* `available():UInt`: returns the amount of available messages from the remote endpoint,
* `credit():UInt`: returns the remaining message transfer credit,

Overview on `IncomingStream` events (check JSDoc for details):
* all events of `Readable` and
* `subscribed`: indicates the stream is attached and messages could be received now.

```bash
stream
    .on('subscribed', () => {
        console.log('attached');
    })
    .on('data', (message) => {
        ...
        message.done();
        ...
    })
;
```

As soon as the current credit reaches `minCredit`, the incoming stream will renew the credit with maxCredit automatically.
However, if the application decides to set `minCredit = -1` then the application will have to renew the credit explicitly using method `stream.flow(maxCredit, minCredit)`.

The application must always call `message.done()`, independent from chosen settle mode.

See also the [consumer](examples/consumer.js) example.

### Message Delivery

Messages are transferred as soon as a link between a `Sender` and a `Receiver` is attached.

#### Message Streams

As mentioned earlier `Writable` and `Readable` streams are provided to handle outgoing and incoming messages.
These streams always run in object mode using `options.amqp.linkHighWaterMsgCount`.

Here, a single message is represented as a plain object with the following attributes:
* `source`: defined by the incoming stream, providing transfer attributes as well as the message header, annotations and properties,
* `target`: defined optionally by the application, similar to the source, accepted by the outgoing stream,
* `payload`: message data to transfer, see also this [chapter](#message-payload),
* `done`: a callback function to confirm final message processing,  
* `failed`: a callback function to indicate processing failure.

A receiving application is expected to call either `done` or `failed` for each single message, exactly one time (maybe asynchronously) and independent from the used link settings.

If a transfer was received unsettled then `done` will send a disposition with outcome [DeliveryAccepted](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-accepted).

In the case of a processing error, `failed` will either send outcome [DeliveryRejected](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-rejected) (if an error object is provided) or [DeliveryReleased](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-released) otherwise.

```bash
stream.on('data', (message) => {
    try {
        JSON.parse(message.payload.toString('utf8'));
        ...
        message.done();
    } catch (e) {
        message.failed(e);
    }
};
```

A sending application can define the callbacks to get notified about the transfer result.

```bash
const message = {
    payload : Buffer.from('test'),
    done : () => this._onSendDone(message),
    failed : (error) => this._onSendFailed(error, message)
};
const noPause = stream.write(message);
```

#### Piped Message Streams

An application may also pass trough (or transform) a received message from an incoming stream to an outgoing stream.
In this case both streams would directly handle `done` and `failed` correctly.

```bash
class Processor extends Transform {
    constructor() {
        super({
            writableObjectMode: true,
            writableHighWaterMark: 16,
            readableObjectMode: true,
            readableHighWaterMark: 16
        });
    }
    
    _transform(message, encoding, callback) {
        try {
            JSON.parse(message.payload.toString('utf8'));
            ...
            this.push(message);
            callback();
        } catch (e) {
            callback(e);
        }
    }
}
...
const istream = client.receiver('inp').attach('queue:q001');
const ostream = client.sender('out').attach('topic:a/b/c');
...
istream.pipe(new Processor()).pipe(ostream);
...
client.connect();
```

#### Message Source and Target

Both, `message.source`and `message.target` provide the same fields (check JSDoc for details):

* `deliveryTag`: an application tag to identify (and correlate) the message,
* `batchable`: true if a disposition can be delayed in order to optimize processing,
* `settled`: true if the sender has already settled,
* `rcvSettleMode`: senders requested receiver settle mode,
* `header`: plain object with header data ([see specification](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-header)),
* `annotations`: map with message annotations ([see specification](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-message-annotations)),
* `properties`: plain object with message properties ([see specification](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-properties)).

All target data are optional, defaults originate from the link definition that the message is sent over.

#### Convert Source and Target

Two fields of the `Client` and the `Connection` options allow the registration of conversion exits:
* `options.amqp.mapIncomingMsgSource`
* `options.amqp.mapOutgoingMsgTarget`

The application or any other library could replace the default functions (check JSDoc for parameters).
For example, @sap/xb-msg-env uses this mechanism to assure that a unified message source is provided and a unified target can be used by application.

#### Variable Message Routing

Using `message.target` the application can select dynamically the address that the message is sent to:

```bash
let id = '42'; 
...
message.target = {
    properties : {
        to: 'topic/order/' + id
    }
};
...
```

This allows to:
* add message-related data as topic segment, e.g. an object identifier,
* forward messages with variable target address over one single link.

Please note, the specification defines only an [address string](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-address-string).
The address syntax depends on the connected service. For example, RabbitMQ, SolaceVMR or SAP Enterprise Messaging support different address expressions.
And even more unexpected, RabbitMQ uses `properties.subject` instead of `properties.to`.
However, package @sap/xb-msg-env would enable a unified processing here, if really needed.

#### Quality of Service

Chapter [2.6.12.](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#doc-idp438000) of the protocol specification describes how to handle message transfers.
With different combinations of sender and receiver settle mode the usual qualities can be realized.

| quality | [sndSettleMode](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#type-sender-settle-mode) | [rcvSettleMode](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#type-receiver-settle-mode) |
| :---: | :---: | :---: |
| at-most-once  | 1 (settled) | 0 (first) |
| at-least-once | 0 (unsettled) | 0 (first) |
| exactly-once  | 0 (unsettled) | 1 (second) |

Sender and receiver will agree on its settle modes when the link is attached:
```bash
sender.attach({
    sndSettleMode: 0,
    rcvSettleMode: 0,
    target: {
        address: 'topic:a/b/c'
    }
});
```

```bash
receiver.attach({
    sndSettleMode: 0,
    rcvSettleMode: 0,
    source: {
        address: 'queue:q001'
    }
});
```

In any case the application has just to select the settle mode, usually at the client side.
The library will assure correct handling of messages in transit, delivery states and message settlement.

#### Mixed Quality of Service

A sender may decide dynamically (per single message) on the settle mode.
First, it would define sndSettleMode `mixed` while attaching the link.

```bash
sender.attach({
    sndSettleMode: 2,
    rcvSettleMode: 0,
    target: {
        address: 'topic:a/b/c'
    }
});
```

Later it would define the quality of service using the message target.

```bash
...
message.target = {
    settled: false,     // not yet settled by sender
    rcvSettleMode: 0    // receiver settles first
};
...
```

#### Flow Control

There are actually 3 layers of flow control:
* network socket and amount of bytes that is sent or received before the connection is throttled,
* session layer with an incoming and outgoing message transfer window,
* link layer with message transfer credits provided by the receiver to the sender.

The library handles flow control on all layers automatically to protect the process in which it resides.
The application just has to define the limits for each layer as part of the client or server options:

* section `options.tune` for the network layer and
* section `options.amqp` for the session and link layer.

#### Message Payload

The application may provide the message payload for an outgoing message as follows:

* a `Buffer` object,
* an `Array` of `Buffer` objects,
* a `Payload` object or a plain object with same properties as `Payload`.

Properties of a `Payload` object:
* `chunks`: an Array of Buffer objects,
* `type`: an optional string providing the content type,
* `encoding`: an optional string providing the content encoding,
* `data`: any optional data to be sent either as [AMQP sequence](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-amqp-sequence) or as [AMQP value](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-amqp-value),
* `properties`: [application properties](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-application-properties).

After the payload was given to a sender it must not be modified by the application anymore.
And as soon as a single buffers size exceeds `options.tune.ostreamPayloadCopyLimit` (default 1024 bytes, minimum 128 bytes) it will not be copied anymore, but will be pushed to the network socket directly.

Incoming messages will always provide a `Payload` object, just for application convenience.

#### Message Payload and AMQP values

Usually, the message payload will consist of binary data, an opaque array of bytes from the protocol libraries perspective.
However, AMQP 1.0 allows also a single [AMQP value](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-amqp-value) or an [AMQP sequence](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-amqp-sequence) alternatively.

If a received message payload consists of such values then the decoded values are provided as `payload.data` and in addition the corresponding parsed raw bytes as `payload.chunks`.
The field `payload.type` will then have the special value `'amqp-1.0'`, which is not a real mime type and in consequence not in danger to clash with such.
Please note, `'amqp-1.0'` is only a local API convention, not standardized.
However, it has already been introduced by [RabbitMQ AMQP 1.0 plugin](https://github.com/rabbitmq/rabbitmq-amqp1.0).

For an outgoing message payload with special type `'amqp-1.0'` the encoder will either write `payload.chunks` (if provided) directly without any validation or it will encode the given `payload.data` as AMQP value or AMQP sequence.

## Limitations
Similar to other libraries not the full scope of AMQP 1.0 could be implemented so far:
* Only the following SASL mechanisms are supported: ANONYMOUS, PLAIN, EXTERNAL,
* Deliveries cannot be resumed; once reconnected those messages are sent again with a new delivery,
* Delivery state [Received](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-received) is not used,
* Delivery state [Modified](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-modified) is not supported,
* Multiple Transfer Frames for one delivery are collected until the whole message can be provided to the application,
* Message Footer is not supported, received but not exposed at the API,
* Message Delivery Annotations are not supported, received, but not exposed at the API,
* Decimal values are provided/accepted as binary data only, using a `Buffer` instance; use a specialized library for the conversion,
* Transactions are not supported,
* Incoming streams handle Quality of Service _Exactly Once_ with one single callback to the application only,
* Source filters are not supported,
* Several fine-grained settings for endpoint lifecycle control may be ignored.

### Message Examples
Just a few copy&paste templates:

* Payload as Buffer
  ```javascript
  const message = {
    payload : Buffer.from('hello world'),
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  };
  ```

* Payload as Buffer Array
  ```javascript
  const message = {
    payload : [
        Buffer.from('hello '),
        Buffer.from('world'),
    ],
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  };
  ```

* Payload from JSON, application, properties, message properties and message header to be sent
  ```javascript
  const message = {
    payload: {
        chunks: [Buffer.from(JSON.stringify({
            quantity: 100,
            uom: 'kg',
        }))],
        properties:{ // application properties, data to read without parsing full payload
            SalesOrder: '42',
            DeliveryID: '1764'
        },
        type: 'application/json'
    },
    target: {
        header: {
            durable: true,
            priority: 2,
            ttl: null, // or number in milliseconds
        },
        properties: {
            messageID: '100037877',
            userID: '',
            to: 'topic:a/b/c',
            subject: '',
            replyTo: '',
        }
    },
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  };
  ```

* Cloud Event, structured format
  ```javascript
  
  const message = {
    payload: {
        chunks: [Buffer.from(JSON.stringify({
            specversion: '0.3',
            source: 'sap/faas/demo',
            type: 'com.sap.coffee.produced',
            id: 'demo',
            cause: 'demo',
            subject: '',
            data: 'espresso',
            datacontenttype: 'text/plain'
        }))],
        type: 'application/cloudevents+json'
    },
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  };

  ```

* Cloud Event, binary format 
  ```javascript
  
  const message = {
    payload: {
        chunks: [
            Buffer.from('espresso')
        ],
        properties: {
            'cloudEvents:specversion': '0.3',
            'cloudEvents:source': 'sap/faas/demo',
            'cloudEvents:type': 'com.sap.coffee.produced',
            'cloudEvents:id': 'demo',
            'cloudEvents:cause': 'demo',
            'cloudEvents:subject': ''
        },
        type: 'text/plain'
    },
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  };

  ```

* No binary payload, but single AMQP Value, e.g. a string
  ```javascript
  
  const AMQP = require('@sap/xb-msg-amqp-v100');
  
  const message = {
    payload: {
        type: 'amqp-1.0',
        data: AMQP.Factory.String('Hello World')
    },
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  };

  ```

* Simulate text message from [Qpid JMS](https://qpid.apache.org/components/jms/index.html)
  ```javascript
  
  const AMQP = require('@sap/xb-msg-amqp-v100');
    
  const message = {
    target: {
      annotations: {
        'x-opt-jms-msg-type': AMQP.Factory.Byte(5)
      }
    },
    payload: {
      type: 'amqp-1.0',
      data: AMQP.Factory.String('Hello World')
    },
    done: () => { console.log('message was sent'); },
    failed: (err) => { console.log('message not sent,', err); }
  },

  ```


## Further Links

Protocol Specification:

* [AMQP 1.0, Part 1: Types](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-types-v1.0-os.html#toc)
* [AMQP 1.0, Part 2: Transport](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transport-v1.0-os.html#toc)
* [AMQP 1.0, Part 3: Messaging](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#toc)
* [AMQP 1.0, Part 4: Transactions](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-transactions-v1.0-os.html#toc)
* [AMQP 1.0, Part 5: Security](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-security-v1.0-os.html#toc)

SASL and supported mechanisms:

* [SASL Protocol](https://tools.ietf.org/html/rfc4422)
* [SASL Mechanisms](https://www.iana.org/assignments/sasl-mechanisms/sasl-mechanisms.xhtml#sasl-mechanisms-1)
* [SASL Mechanism ANONYMOUS](https://tools.ietf.org/html/rfc4505)
* [SASL Mechanism PLAIN](https://tools.ietf.org/html/rfc4616)
* [SASL Mechanism EXTERNAL](https://tools.ietf.org/html/rfc4422#page-29)

AMQP and WebSocket:

* [AMQP WebSocketBinding](http://docs.oasis-open.org/amqp-bindmap/amqp-wsb/v1.0/amqp-wsb-v1.0.html)
* [WebSocket Protocol](https://tools.ietf.org/html/rfc6455)
* [Http User Agent Header](https://tools.ietf.org/html/rfc2616#section-14.43)
* [OAuth 2.0](https://oauth.net/2/)
* [OAuth 2.0, Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4)
* [OAuth 2.0, Resource Owner Password Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.3)

Protocol Support by others:

* [Rabbit MQ AMQP 1.0 plugin](https://github.com/rabbitmq/rabbitmq-amqp1.0)
* [AMQP 1.0 in Azure Service Bus and Event Hubs protocol guide](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-protocol-guide)
* [Solace: Using AMQP 1.0](https://docs.solace.com/Open-APIs-Protocols/Using-AMQP.htm)
* [Solace: AMQP 1.0 Protocol Conformance](https://docs.solace.com/Open-APIs-Protocols/AMQP-Protocol-Conformance.htm)
* [Qpid Proton Overview](https://qpid.apache.org/proton/index.html)
* [Qpid Proton C++ API](https://qpid.apache.org/releases/qpid-proton-0.22.0/proton/cpp/api/index.html)
* [Qpid Proton-J API](https://qpid.apache.org/releases/qpid-proton-j-0.26.0/api/index.html)
* [Qpid JMS](https://qpid.apache.org/components/jms/index.html)
* [Qpid Proton github repository](https://github.com/apache/qpid-proton)
* [.Net Library: AMQP.Net Lite](https://github.com/Azure/amqpnetlite)
* [Node Library: Rhea](https://github.com/amqp/rhea)
* [Node Library: AMQP 1.0](https://github.com/noodlefrenzy/node-amqp10)
* [Go Library (uses Qpid C library): Qpid Electron](https://godoc.org/qpid.apache.org/electron)
* [Go Library (pure GO, context.Context support): vcabbage/amqp](https://github.com/vcabbage/amqp)

Others:
* [Introduction to AMQP 1.0](https://de.slideshare.net/ClemensVasters/amqp-10-introduction)
* [Node: Backpressuring in Streams](https://nodejs.org/en/docs/guides/backpressuring-in-streams/)



