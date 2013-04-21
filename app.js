var express = require('express');
var util = require('util');
var path = require('path');
var settings = require("./settings");
var tcp = require('net');
var TelnetDispatcher = require("./controllers/telnet");

// Telnet Server
var Server = tcp.createServer()
    .on('connection', TelnetDispatcher)
    .listen(process.env.TELNET_PORT || settings.TELNET_PORT);

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || settings.DEFAULT_PORT);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.enable('trust proxy');
});

// URL Routes
app.get('/api/v1/lookup', require("./controllers/lookup"));

app.listen(app.get("port"), function() {
    console.log("NodeJS Server Started!")
});
