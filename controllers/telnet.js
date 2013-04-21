var events = require('events');
var sugar = require('sugar');
var settings = require("../settings");

var TelnetController = function() {
    var showPrompt = function() {
        conn.write("\n# > ");
    };

    var onConnect = function(conn, argv) {
        conn.write("NodeJS Powered Distributed DNS Query Tool");
        showPrompt();
    };

    var onGoat = function(conn, argv) {
        conn.write("Oh hey, that's a nice goat!");
        showPrompt();
    };

    var onHelp = function(conn, argv) {
        conn.write("Help: TODO");
        showPrompt();
    };

    var onQuit = function(conn, argv) {
        conn.end("kthx bye.");
        showPrompt();
    };

    return {
        showPrompt: showPrompt,
        onConnect: onConnect,
        onGoat: onGoat,
        onHelp: onHelp,
        onQuit: onQuit
    }
};

var TelnetDispatcher = function(conn) {

    var _onData = function(data) {
        var argv = data.trim().split(' ');
        var command = argv[0];

        var commandEvent = "c:" + command.trim();

        if(this.listeners(commandEvent).length > 0) {
            this.emit(commandEvent, conn, argv);
        } else {
            this.emit("c:help", conn, argv);
        }
    };

    conn.on('data', _onData);

    //controller binds.
    conn.on("c:goat", TelnetController.onGoat);
    conn.on("c:quit", TelnetController.onQuit);
    conn.on("c:help", TelnetController.onHelp);


    // load up the bootstrapper
    conn.setEncoding(settings.TELNET_ENCODING);
    events.EventEmitter.call(this);
    TelnetController.onConnect(conn);
};


module.exports = TelnetDispatcher;