const EventEmitter = require('events');

//class EventEmitter
class myEventEmitter extends EventEmitter {}

//internal
const myEmitter = new myEventEmitter();

myEmitter.on('event', () => console.log('Event Fired'));

myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')