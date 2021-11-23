'use strict';

const EventEmitter = require('events');
const Transform = require('stream').Transform;

/**
 * @type {{net: {host: string, port: number}, sasl: {user: string, password: string}, amqp: {vhost: string}}}
 * @private
 */
const defaultOptions = {
    net: {
        host         : 'localhost',
        port         : 1883
    },
    credentials: {
        user         : '',
        password     : ''
    },
    mqtt: {
        clientID     : '',
        cleanSession : true,
        keepAlive    : 30
    }
};

/**
 * @private
 */
class ProduceStatistics extends EventEmitter {

    constructor(reliable, maxCount, logCount) {

        super();

        this._countTodo = maxCount;
        this._countDone = 0;
        this._countLog = logCount;
        this._countAckTodo = reliable ? maxCount : 0;
        this._countAckDone = 0;
        this._countPause = 0;
        this._durationInit = 0;
        this._durationWork = 0;
        this._durationWait = 0;
        this._timeBase = Date.now();

        if (this._countAckTodo) {
            this.onDone = () => {
                if (++this._countAckDone === this._countAckTodo) {
                    this.emit('done');
                }
            };
            this.onFailed = (error) => {
                if (error) this.emit('error', error);
                if (++this._countAckDone === this._countAckTodo) {
                    this.emit('done');
                }
            };
        } else {
            this.onDone = () => {

            };
        }

    }

    countMessage() {
        if(this._countDone < this._countTodo) {
            ++this._countDone;
            if (this._countDone % this._countLog === 0) this.emit('info', this._countDone);
            return true;
        }
        return false;
    }

    onSend() {
        if (this._durationInit) {
            this._durationWait += this._duration();
        } else {
            this._durationInit += this._duration();
        }
    }

    onWait() {
        ++this._countPause;
        this._durationWork += this._duration();
    }

    onStop() {
        this._durationWork += this._duration();
        if (this._countAckTodo === 0) this.emit('done');
    }

    _duration() {
        const now = Date.now();
        const duration = now - this._timeBase;
        this._timeBase = now;
        return duration;
    }

    print(info) {
        this._durationWait += this._duration();
        const overallTime = (this._durationWait + this._durationWork);
        console.log();
        console.log('messages published    : ' + this._countDone);
        if (this._countAckDone) {
            console.log('messages acknowledged : ' + this._countAckDone);
        }
        if (info) {
            if (info.ws) {
                console.log('websocket incoming    : ' + (info.ws.inboundFrames125 + info.ws.inboundFramesL16 + info.ws.inboundFramesL64) + ' frames ( small ' + info.ws.inboundFrames125 + ' / medium '+ info.ws.inboundFramesL16 + ' / large ' + info.ws.inboundFramesL64 + ' )');
                console.log('websocket outgoing    : ' + (info.ws.outboundFrames125 + info.ws.outboundFramesL16 + info.ws.outboundFramesL64)  + ' frames ( small ' + info.ws.outboundFrames125 + ' / medium '+ info.ws.outboundFramesL16 + ' / large ' + info.ws.outboundFramesL64 + ' )');
            }
            console.log('protocol incoming     : ' + info.inboundFrames + ' frames, '  + info.inboundBytes + ' bytes, ' + info.inboundChunks + ' chunks ');
            console.log('protocol outgoing     : ' + info.outboundFrames + ' frames, '  + info.outboundBytes + ' bytes, ' + info.outboundChunks + ' chunks ( reuse ' + info.outboundChunksRecycled + ' / alloc ' + info.outboundChunksDefAlloc + ' / big ' + info.outboundChunksBigAlloc + ' )');
            console.log('drain events incoming : ' + info.inboundDrains);
            console.log('drain events outgoing : ' + info.outboundDrains);
            console.log('packetID drain events : ' + info.outboundDrainsPacketID);
            console.log('ping requests         : ' + info.pingRequests);
        }
        console.log('socket wait time[ms]  : ' + this._durationWait);
        console.log('socket init time[ms]  : ' + this._durationInit);
        console.log('sender work time[ms]  : ' + this._durationWork);
        console.log('overall run time[ms]  : ' + overallTime);
        if(overallTime > 10) {
            console.log('overall rate [msg/s]  : ' + Math.trunc(this._countDone * 1000 / overallTime));
        }
    }

}

/**
 * @private
 */
class ConsumeStatistics extends EventEmitter {

    constructor(maxCount, logCount) {
        super();

        this._countTodo = maxCount;
        this._countDone = 0;
        this._countLog = logCount;
        this._timeStart = 0;
        this._timeFinish = 0;

    }

    onReceive() {
        if (this._countDone === 0) {
            this._timeStart = Date.now();
        }

        ++this._countDone;

        if (this._countDone < this._countTodo) {
            if (this._countDone % this._countLog === 0) this.emit('info', this._countDone);
        } else if (this._countDone === this._countTodo) {
            this._timeFinish = Date.now();
            process.nextTick(() => this.emit('done'));
        } else {
            --this._countDone;
        }
    }

    count() {
        return this._countDone;
    }

    ready() {
        return this._countDone >= this._countTodo;
    }

    print(info) {
        const overallTime = this._timeFinish - this._timeStart;
        console.log();
        console.log('messages received     : ' + this._countDone);
        if (info) {
            if (info.ws) {
                console.log('websocket incoming    : ' + (info.ws.inboundFrames125 + info.ws.inboundFramesL16 + info.ws.inboundFramesL64) + ' frames ( small ' + info.ws.inboundFrames125 + ' / medium '+ info.ws.inboundFramesL16 + ' / large ' + info.ws.inboundFramesL64 + ' )');
                console.log('websocket outgoing    : ' + (info.ws.outboundFrames125 + info.ws.outboundFramesL16 + info.ws.outboundFramesL64)  + ' frames ( small ' + info.ws.outboundFrames125 + ' / medium '+ info.ws.outboundFramesL16 + ' / large ' + info.ws.outboundFramesL64 + ' )');
            }
            console.log('inbound processing    : ' + info.inboundFrames + ' frames, '  + info.inboundBytes + ' bytes, ' + info.inboundChunks + ' chunks ');
            console.log('outbound processing   : ' + info.outboundFrames + ' frames, '  + info.outboundBytes + ' bytes, ' + info.outboundChunks + ' chunks ( reuse ' + info.outboundChunksRecycled + ' / alloc ' + info.outboundChunksDefAlloc + ' / big ' + info.outboundChunksBigAlloc + ' )');
            console.log('inbound drain events  : ' + info.inboundDrains);
            console.log('outbound drain events : ' + info.outboundDrains);
            console.log('packetID drain events : ' + info.outboundDrainsPacketID);
            console.log('ping requests         : ' + info.pingRequests);
        }
        console.log('overall run time[ms]  : ' + (overallTime));
        if(overallTime > 10) {
            console.log('overall rate [msg/s]  : ' + Math.trunc(this._countDone * 1000 / overallTime));
        }
    }

}

/**
 * @private
 */
class JSONValidator extends Transform {

    constructor(valueStream, setupStream) {
        super(Object.create({
            highWaterMark: 500,
            decodeStrings: false,
            allowHalfOpen: false,
            readableObjectMode: true,
            writableObjectMode: true
        }));

        this._valueStream = valueStream;

        this._setupStream = setupStream;
    }

    /**
     * @param {!{}} message
     * @param {!string} encoding
     * @param {!function(error=, message=)} callback
     * @protected
     * @override
     */
    _transform(message, encoding, callback) {
        try {
            switch(message.stream) {
                case this._valueStream: {
                    JSON.parse(message.payload.toString('utf8'));
                    this.push(message);
                    break;
                }
                case this._setupStream: {
                    // follow up master data changes, change behavior
                    break;
                }
                default: {
                    // ignore
                }
            }
            callback();
        } catch (e) {
            callback(e, message);
        }
    }

}

module.exports.defaultOptions = defaultOptions;
module.exports.ProduceStatistics = ProduceStatistics;
module.exports.ConsumeStatistics = ConsumeStatistics;
module.exports.JSONValidator = JSONValidator;
module.exports.jsonPayload = Buffer.from('{"a1":10,"a2":"42","a3":"test","a4":{b:42}}');
module.exports.dataPayload = Buffer.from('aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa');

