'use strict';

const data = { topic: 'a/b/c/d', filter: 'a/b/+/#', qos: 1, payload: new Buffer.allocUnsafe(50).fill('X'), maxCount: 100000, logCount: 10000 };
const options = Object.assign({
    // tls : { host : '127.0.0.1', port: 8883 }
    // net : { host : '127.0.0.1', port: 1883 }
    // wss : { host : 'localhost', port: 433, path: '/' }
    // ws  : { host : 'localhost', port: 80, path: '/' }
    // credentials: { user: 'guest', password: 'guest' },
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

const { Client } = require('../index');
const { ProduceStatistics } = require('./tools');
const stats = new ProduceStatistics(true, options.data.maxCount, options.data.logCount);

const client = new Client(options);

function send() {
    stats.onSend();

    let noPause = true;
    while (noPause && stats.countMessage()) {
        noPause = client.publish(options.data.topic, options.data.payload, options.data.qos, false, stats.onDone);
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

client
    .on('connected',(destination, peerInfo) => {
        console.log('connected', peerInfo.description);
        send();
    })
    .on('drain', (qosAtMostOnce) => {
        send();
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

