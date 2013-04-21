define([
    'app',
    'angular'
],
function(app, angular) {
    var DNSLookupService = function($http, $q) {

        var BASE_URI = "/api/v1/lookup";

        var MXLookup = function(domain) {
            var deferred = $q.defer();

            var request = $http.get(BASE_URI, { params:{ domain:domain, type:'MX'}})
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                }
            );

            return deferred.promise;
        };

        return {
            MXLookup: MXLookup
        }

    };
    DNSLookupService.inject = ['$http', '$q'];

    return DNSLookupService;
});