angular.module('app.editTravel', ['pascalprecht.translate', 'ui-leaflet'])

.controller('EditTravelCtrl', function($scope, $stateParams, $translate,
        $http, $filter, $ionicLoading) {
  $scope.center = {};
  $scope.bounds = {};
  $scope.markers = [];
  $scope.tiles= {
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: {
          attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
  };
  $scope.travel={};
  // get the travel
  $http.get(urlapi + 'travels/id/' + $stateParams.travelid)
    .then(function(data) {
      console.log('data success travels');
      console.log(data); // for browser console
      $scope.travel = data.data; // for UI
      $scope.travel.date = new Date($scope.travel.date);
      $scope.markers = [];
      $scope.markers.push({
        lat: Number($scope.travel.from.lat),
        lng: Number($scope.travel.from.long),
        message: $scope.travel.from.name
      });
      $scope.markers.push({
        lat: Number($scope.travel.to.lat),
        lng: Number($scope.travel.to.long),
        message: $scope.travel.to.name
      });
      $scope.center = {
        lat: (Number($scope.travel.from.lat) + Number($scope.travel.to.lat)) / 2,
        lng: (Number($scope.travel.from.long) + Number($scope.travel.to.long)) / 2,
        zoom: 4
      };
      $scope.$broadcast('scroll.refreshComplete'); //refresher stop
    }, function(data) {
      console.log('data error');
      $scope.$broadcast('scroll.refreshComplete'); //refresher stop
      $ionicLoading.show({
        template: 'Error connecting server',
        noBackdrop: true,
        duration: 2000
      });
    });

    $scope.updateTravel =function(){
        $http({
            url: urlapi + 'travels/id/modify/' + $scope.travel._id,
            method: "PUT",
            data: $scope.travel
        })
        .then(function(data) {
            console.log(data);

            window.location="#app/travels/" + $scope.travel._id;
        },
        function(data) { // optional
            // failed
            console.log(data);
            $ionicLoading.show({ template: 'Error updating travel. ' + data.data, noBackdrop: true, duration: 2000 });

        });
    };
    $scope.getGeo = function(){

        $scope.markers=[];
        console.log($scope.travel.from.name);
        console.log($scope.travel.to.name);
        $http.get('https://nominatim.openstreetmap.org/search?q=' + $scope.travel.from.name + '&format=json&limit=1')
        .then(function(data) {
            console.log(data);
            if(data.data[0])
            {
                $scope.travel.from.lat=data.data[0].lat;
                $scope.travel.from.long=data.data[0].lon;
                $scope.travel.from.name=data.data[0].display_name;
                $scope.markers.push({
                    lat: Number(data.data[0].lat),
                    lng: Number(data.data[0].lon),
                    message: data.data[0].display_name
                });
            }
            $http.get('https://nominatim.openstreetmap.org/search?q=' + $scope.travel.to.name + '&format=json&limit=1')
            .then(function(data) {
                if(data.data[0])
                {
                    $scope.travel.to.lat=data.data[0].lat;
                    $scope.travel.to.long=data.data[0].lon;
                    $scope.travel.to.name=data.data[0].display_name;
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
