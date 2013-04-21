define([
    'app',
    'angular'
],
function(app, angular) {

    var MainController = function ($scope, DNSLookupService) {
        $scope.results = [];
        $scope.chartData = [];

        $scope.lookup = function() {

            var setResults = function(data) {
                $scope.results = data;
                return data
            };

            var setChartData = function(data) {
                $scope.chartData = [];
                $scope.chartData.push(['Country', 'color']);
                for(d in data) {
                    var result = data[d];
                    console.log(result);
                    if(result.status == "OK") {
                        $scope.chartData.push([result.server.country, 1]);
                    } else {
                        $scope.chartData.push([result.server.country, 0]);
                    }
                }
            };

            DNSLookupService.MXLookup($scope.domain)
                .then(setResults)
                .then(setChartData);
        };


    };

    MainController.inject = ['$scope', 'DNSLookupService'];

    return MainController;
});