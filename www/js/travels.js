angular.module('app.travels', ['pascalprecht.translate'])

.controller('TravelsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    $scope.travels=[];

    $scope.doRefresh = function() {
      /* travels refresh: */
        $http.get(urlapi + 'travels')
        .then(function(data){
            console.log('data success travels');
            console.log(data); // for browser console
            $scope.travels = data.data; // for UI
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();
});
