define(
[
    'angular',
    'jquery'
],
function(angular, $) {

    var Directive = function(GoogleService) {

        var Linker = function($scope, element, attr, controller) {
            $scope.$watch("chartData", function() {
                if($scope.chartData.length>0) {
                    var chartSettings = $scope.$eval($scope.chartSettings);

                    GoogleService.load($scope.chartModule, $scope.chartVersion, chartSettings).then(function(goog) {

                        var data = goog.visualization.arrayToDataTable($scope.chartData);
                        var geochart = new goog.visualization.GeoChart(element[0]);
                        var opts = $scope.$eval($scope.chartOptions);

                        geochart.draw(data, opts);
                    });
                };
            });
        };

        return {
            link: Linker,
            restrict: 'A',
            scope: {
                // binding
                chartData: '=',

                //attributes
                chartOptions: '@',
                chartModule: '@',
                chartVersion: '@',
                chartSettings: '@'
            },
            replace: true
        }
    };


    return Directive

});