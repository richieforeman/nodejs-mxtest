define([
    'googlejsapi'
],
function(googlejsapi) {

    var GoogleService = function($rootScope, $q, $window) {

        // even tho require gives us window.google, use $window google so we can mock it out.
        return {
            instance: function() {
                return $window.google;
            },

            load: function(module, version, settings) {
                var deferred = $q.defer();

                settings.callback = function() {
                    deferred.resolve($window.google);
                    $rootScope.$apply();
                };
                $window.google.load(module, version, settings);

                return deferred.promise;
            }

        }

    };

    GoogleService.inject = ['$rootScope', '$q', '$window'];

    return GoogleService;
});