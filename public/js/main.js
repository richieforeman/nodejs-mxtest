requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'externals/jquery-1.9.1.min',
        angular: 'externals/angular',
        async: 'externals/requirejs-plugins/async',
        googlejsapi: 'http://www.google.com/jsapi?load'
    },
    shim: {
        angular: {'exports': 'angular'},
        googlejsapi: {'exports': 'google'}
    },
    priority: [
        'jquery', 'angular'
    ]
});

// bootstrap out to app.js
require(["app"]);