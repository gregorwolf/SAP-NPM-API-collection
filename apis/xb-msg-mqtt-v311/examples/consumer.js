'use strict';

const data = { topic: 'a/b/c/d', filter: 'a/b/+/#', qos: 1, payload: new Buffer.allocUnsafe(50).fill('X'), maxCount: 100000, logCount: 10000, slowWork : false };
const options = Object.assign({
    // tls : { host : '127.0.0.1', port: 8883 }
    // net : { host : '127.0.0.1', port: 1883 }
    // wss : { host : 'localhost', port: 433, path: '/' }
    // ws  : { host : 'localhost', port: 80, path: '/' }
    // credentials: { user: 'guest', password: 'guest' },
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

options.istreams = {
    inputA : { filter : options.data.filter, qos : options.data.qos }
};

const { Client } = require('../index');
const { ConsumeStatistics } = require('./tools');
const stats = new ConsumeStatistics(options.data.maxCount, options.data.logCount);

const client = new Client(options);
const stream = client.istream('inputA');

stream
    .on('subscribed', () => {
        console.log('subscribed');
    })
    .on('data', (message) => {
        message.done();
        stats.onReceive();
    })
    .on('error', (error) => {
        console.log(error.message);
        process.exit(2);
    });

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
        if (options.data.slowWork) wait(1000, 250);
    })
    .on('ping', (timeout) => {
        console.log('ping');
    })
    .on('assert', (error) => {
        console.log(error.message);
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

// wait and work to simulate slow processing

function wait(waitTime, workTime) {
    if (stats.ready()) return;
    console.log('wait for', waitTime, 'ms');
    setTimeout(work, waitTime, waitTime, workTime);
    client.pause();
}

function work(waitTime, workTime) {
    if (stats.ready()) return;
    console.log('work for', workTime, 'ms');
    setTimeout(wait, workTime, waitTime, workTime);
    client.resume();
}

