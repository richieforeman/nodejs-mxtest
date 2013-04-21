var $q = require("q");
var settings = require('../settings');
var servers = require("../servers");
var dns = require('native-dns');

var Lookup = function(req, res) {
    var DNSLookup = function(domain, server) {
        var deferred = $q.defer();

        var result = {};
        var start = Date.now();

        var question = dns.Question({
            name: domain,
            type: "MX"
        });

        var r = dns.Request({
            question: question,
            server: { address: server.host, port: 53, type: 'udp'},
            timeout: settings.DNS_TIMEOUT
        });

        r.on("message", function(err, data) {
            result = {
                status: 'OK',
                answer: data.answer,
                server: server
            };
        });

        r.on("timeout", function(err, data) {
            result = {
                status: 'TIMEOUT',
                answer: data,
                server: server
            };
        });

        r.on("end", function() {
            result['ms'] = (Date.now()) - start;
            //resolve the deferred object.
            deferred.resolve(result);
        });

        r.send();
        return deferred.promise;
    };

    allPromises = [];

    for(i in servers) {
        // loop thru each server and fetch the DNS records.
        allPromises.push(DNSLookup(req.query["domain"], servers[i]));
    }

    // wait for all promises to resolve.
    $q.all(allPromises).then(function(results) {
        res.send(JSON.stringify(results));
        res.end();
    });
};

module.exports = Lookup;