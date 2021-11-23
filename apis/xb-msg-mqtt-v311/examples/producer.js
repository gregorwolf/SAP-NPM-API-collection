'use strict';

const data = { topic: 'a/b/c/d', filter: 'a/b/+/#', qos: 1, payload: new Buffer.allocUnsafe(50).fill('X'), maxCount: 100000, logCount: 10000 };
const options = Object.assign({
    // tls : { host : '127.0.0.1', port: 8883 }
    // net : { host : '127.0.0.1', port: 1883 }
    // wss : { host : 'localhost', port: 433, path: '/' }
    // ws  : { host : 'localhost', port: 80, path: '/' }
    // credentials: { user: 'guest', password: 'guest' },
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

options.ostreams = {
    output : { topic : options.data.topic, qos : options.data.qos, retain : false }
};

const { Client } = require('../index');
const { ProduceStatistics } = require('./tools');
const stats = new ProduceStatistics(true, options.data.maxCount, options.data.logCount);
const message = { payload : options.data.payload, done : stats.onDone };

const client = new Client(options);
const stream = client.ostream('output');

function send() {
    stats.onSend();

    let noPause = true;
    while (noPause && stats.countMessage()) {
        noPause = stream.write(message);
    }

    if (noPause) {
        stats.onStop();
    } else {
        stats.onWait();
    }
}

stats
    .on('info', (count) => {
        console.log(count);
    })
    .on('done', () => {
        client.disconnect();
    });

stream
    .on('ready', () => {
        send();
    })
    .on('drain', () => {
        send();
    })
    .on('error', (error) => {
        console.log(error.message);
        process.exit(2);
    });

client
    .on('connected',(destination, peerInfo) => {
        console.log('connected', peerInfo.description);
    })
    .on('error', (error) => {
        console.log(error.message);
        process.exit(1);
    })
    .on('reconnecting', (destination) => {
        console.log('reconnecting, using destination ' + destination);
    })
    .on('disconnected', (hadError, byBroker, statistics) => {
        console.log('disconnected');
        stats.print(statistics);
    });

client.connect();


