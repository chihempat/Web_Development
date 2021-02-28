const express = require('express')
const http = require('http');
const hostname = '127.0.0.1';
const port = 5000;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/pain' });
    res.end('hello world');
}).listen(port, hostname, () => {
    console.log('Server is running')
})