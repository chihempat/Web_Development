const logger = require('./logger');

const lo = new logger();
lo.on('message', (data) => console.log("he;;p", data));

lo.log("hello world");