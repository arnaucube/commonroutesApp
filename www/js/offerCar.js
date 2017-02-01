angular.module('app.offerCar', ['pascalprecht.translate', 'ui-leaflet'])

.controller('OfferCarCtrl', function($scope, $stateParams, $translate,
        $http, $filter, $ionicLoading) {

    $scope.newtravel={};
    $scope.newtravel.from={
        lat: 0,
        long:0
    };
    $scope.newtravel.to={
        lat: 0,
        long:0
    };
    $scope.center= {
        lat: 0,
        lng: 0,
        zoom: 1
    };
    $scope.markers=new Array();
    $scope.tiles= {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
            attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    };
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
            $ionicLoading.show({ template: 'Complete all parameters first', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.getGeo = function(){

        $scope.markers=[];
        console.log($scope.newtravel.from.name);
        console.log($scope.newtravel.to.name);
        $http.get('http://nominatim.openstreetmap.org/search?q=' + $scope.newtravel.from.name + '&format=json&limit=1')
        .then(function(data) {
            console.log(data);
            if(data.data[0])
            {
                $scope.newtravel.from.lat=data.data[0].lat;
                $scope.newtravel.from.long=data.data[0].lon;
                $scope.newtravel.from.name=data.data[0].display_name;
                $scope.markers.push({
                    lat: Number(data.data[0].lat),
                    lng: Number(data.data[0].lon),
                    message: data.data[0].display_name
                });
            }
            $http.get('http://nominatim.openstreetmap.org/search?q=' + $scope.newtravel.to.name + '&format=json&limit=1')
            .then(function(data) {
                if(data.data[0])
                {
                    $scope.newtravel.to.lat=data.data[0].lat;
                    $scope.newtravel.to.long=data.data[0].lon;
                    $scope.newtravel.to.name=data.data[0].display_name;
                    $scope.markers.push({
                        lat: Number(data.data[0].lat),
                        lng: Number(data.data[0].lon),
                        message: data.data[0].display_name
                    });
                }
            });
        });

    };
});
