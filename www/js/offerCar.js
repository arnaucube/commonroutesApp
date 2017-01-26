angular.module('app.offerCar', ['pascalprecht.translate'])

.controller('OfferCarCtrl', function($scope, $stateParams, $translate,
        $http, $filter) {

    $scope.newtravel={};
    $scope.createTravel =function(){
        $scope.newtravel.type="offering";
        $http({
            url: urlapi + 'travels',
            method: "POST",
            data: $scope.newtravel
        })
        .then(function(data) {
            console.log(data);
            window.location="#app/travels"
        },
        function(data) { // optional
            // failed
            console.log(data);
        });
    };
});
