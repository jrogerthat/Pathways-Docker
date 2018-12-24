"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//const app = require('express')();
const app = express();
const http = require('http');
const server = http.createServer(app);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/');
    //res.sendFile(__dirname + '/style/');
    //res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/'));
app.set('port', (process.env.PORT || 3000));
console.log('The port is:::: ', app.get('port'));
server.listen(app.get('port'), () => {
    console.log('---> listening on port ', app.get('port'));
});
//# sourceMappingURL=index.js.map