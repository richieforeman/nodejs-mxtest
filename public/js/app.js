define(
[
    'angular',
    'controllers/Main',
    'directives/google-chart',
    'services/GoogleService',
    'services/DNSLookupService',
    'settings'
],
function(angular, MainController, GoogleChartDirective, GoogleService, DNSLookupService, SETTINGS) {

    var app = angular.module(SETTINGS.NG_APP_NAME, []);

    // make angular tags not clash with django/jinja/mustache
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('((');
        $interpolateProvider.endSymbol('))');
    });

    // mount the routes.
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider.when("/", {templateUrl: 'partials/search.html', controller: "MainController"});
        $locationProvider.html5Mode(true);
    });

    // controllers
    app.controller("MainController", MainController);

    // directives
    app.directive("googleChartDirective", GoogleChartDirective);

    //services
    app.service("GoogleService", GoogleService);
    app.service("DNSLookupService", DNSLookupService);

    angular.bootstrap(document, [SETTINGS.NG_APP_NAME]);

    return app;
});

