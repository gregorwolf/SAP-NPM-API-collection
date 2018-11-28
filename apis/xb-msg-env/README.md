# xb-msg-env
Provides functions to setup messaging client options from CF (or XSA) environment variables.

The following clients are supported:
* **@sap/xb-msg**, protocol-agnostic API, multiple destinations per single client
* **@sap/xb-msg-amqp-v100**, protocol-specific, single connection per client
* **@sap/xb-msg-amqp-v091**, protocol-specific, single connection per client
* **@sap/xb-msg-mqtt-v311**, protocol-specific, single connection per client.

The following environment variables are used:
* **VCAP_SERVICES** with bindings to RabbitMQ or Enterprise Messaging,
* **SAP_XBEM_SERVICE_LABEL** to use an alternative service label for Enterprise Messaging,
* **SAP_XBEM_BINDINGS** to define incoming and/or outgoing message streams.
 
## Table of contents

* [Prerequisites](#prerequisites)
* [Install](#install)
* [API](#api)
* [Examples](#examples)
* [Limitations](#limitations)

## Prerequisites


## Install
Direct from npm

```bash
npm install @sap/xb-msg-env
```

## API

### Environment Variables 
The following parameters exist in the SAP_XBEM_BINDINGS environment variable.
SAP_XBEM_BINDINGS contains an input and an output map.

````
"SAP_XBEM_BINDINGS": {
    "outputs": {
    },
    "inputs": {
    }
}
````

A single input or output can have the following properties:

| Parameter | Type | Input | Output | Description |
| --- | --- | --- | --- | --- |
| service | string | yes | yes | reference to the service entry, in example 'myService' |
| address | string | yes | yes | defines either a queue or a topic in unified topic syntax, in example 'queue:MyQueue' or 'topic:my/unified/topic' |
| reliable | boolean | yes | yes | shall acknowledges be used |
| exclusive | boolean | yes | no | only one consumer instance can be used |
| persistent | boolean | no | yes | the broker shall persist messages |
| maxMsgInFlight | number | yes | no | |

### Create xb-msg Client Options
Create a messaging client and start consuming messages.
````
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
````

### Create xb-msg-amqp-v100 Client Options without SAP_XBEM_BINDINGS
Create an AMQP 1.0 messaging client and start consuming messages, receiving each at-least-once.
````
const msg = require('@sap/xb-msg-amqp-v100');
const env = require('@sap/xb-msg-env');

/* get options from cf/xsa environment */
const options = env.amqpV100ClientOptions('my-service');

/* start messaging */
const client = new msg.Client(options);
const stream = client.receiver('MyLinkA').attach('MyQueue1');

stream
    .on('subscribed', () => {
        console.log('subscribed');
    })
    .on('data', (message) => {
        console.log('message: ' + message.payload.toString());
        message.done();
    });

client.connect();
````

### Create xb-msg-amqp-v091 Client Options
Create an AMQP v091 messaging client and start consuming messages.
````
const msg = require('@sap/xb-msg-amqp-v091');
const env = require('@sap/xb-msg-env');

/* get options from cf/xsa environment */
const options = env.amqpV091ClientOptions('msg-instance-02', ['MyInpB'], []);

/* start messaging */
const client = new msg.Client(options);

client.channel(1)
    .on('opened', () => {
        console.log('opened');
    })
    .on('flow', (active) => {
        console.log(active ? 'continue' : 'wait');
    })
    .on('closed', (hadError) => {
        console.log('closed');
        client.disconnect();
    });

client.istream('MyInpB')
    .on('subscribed', () => {
        console.log('subscribed');
    })
    .on('data', (message) => {
        console.log('message: ' + message.payload.toString());
        message.done();
    });

client.connect();
````

### Create xb-msg-mqtt-v311 Client Options
Create an MQTT v311 messaging client and start consuming messages.
````
const msg = require('@sap/xb-msg-mqtt-v311');
const env = require('@sap/xb-msg-env');

/* get options from cf/xsa environment */
const options = env.mqttV311ClientOptions('msg-instance-03', ['MyInpC'], []);

/* start messaging */
const client = new msg.Client(options);

client.istream('MyInpC')
    .on('subscribed', () => {
        console.log('subscribed');
    })
    .on('data', (message) => {
        console.log('message: ' + message.payload.toString());
        message.done();
    });

client.connect();
````

## Examples
Below is an example of 'Environment Variables'. There is one Rabbit MQ instance named 'myService'.
The messaging service inputs and outputs are maintained via another environment variable named SAP_XBEM_BINDINGS. 
Here, one output name 'myOutA' is defined.

```bash
"VCAP_SERVICES": {
    "rabbitmq": [
        {
            "credentials": {
                "hostname": "10.11.241.27",
                "ports": {
                    "15672/tcp": "37662",
                    "5672/tcp": "45179"
                },
                "port": "45179",
                "username": "stp79pjT3-PmTSKz",
                "password": "R_BVWMaGocNNrX5P",
                "uri": "amqp://stp79pjT3-PmTSKz:R_BVWMaGocNNrX5P@10.11.241.27:45179"
            },
            "syslog_drain_url": null,
            "volume_mounts": [],
            "label": "rabbitmq",
            "provider": null,
            "plan": "v3.6-container",
            "name": "myService",
            "tags": [
                "rabbitmq",
                "mbus",
                "pubsub",
                "amqp"
            ]
        }
    ]
},
"SAP_XBEM_BINDINGS": {
    "outputs": {
      "myOutA" : {
        "service": "myService",
        "topic": "Cars/Velocity/milesPerHour",
        "reliable": false
      }
    }
  }
}
```
The following @sap/xb-msg-env utility function invocation:

```bash
const msg_env = require('@sap/xb-msg-env');

const destinations = msg_env.msgClientOptions('myService', [], ['myOutA']);
```
... converts them to the following @sap/xb-msg Client options/destinations:
```bash
{
    "destinations": [
            {
                "name": "myService",
                "type": "amqp-v091",
                "net": {
                    "host": "10.11.241.27",
                    "port": 45179,
                },
                "sasl": {
                    "user": "stp79pjT3-PmTSKz",
                    "password": "R_BVWMaGocNNrX5P"
                },
                "amqp": {
                    "vhost": "/",
                },
                "istreams": {
                },
                "ostreams": {
                    "out": { 
                        "channel": 1, 
                        "exchange": "amq.topic", 
                        "routingKey": "Cars.Velocity.milesPerHour", 
                        "confirms": false 
                    }
                }
            }
    ]
}
```

## Limitations
* Minimum version required for @sap/xb-msg is 0.2.3
* Minimum version required for @sap/xb-msg-mqtt-v311 is 0.2.9
* Minimum version required for @sap/xb-msg-amqp-v091 is 0.2.9
* Minimum version required for @sap/xb-msg-amqp-v100 is 0.2.4

