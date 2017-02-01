angular.module('app.travels', ['pascalprecht.translate'])

.controller('TravelsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    $scope.travels=[];
    $scope.page=0;
    $scope.doRefresh = function() {
      /* travels refresh: */
        $http.get(urlapi + 'travels?page=' + $scope.page)
        .then(function(data){
            console.log('data success travels');
            console.log(data); // for browser console
            //$scope.travels = data.data; // for UI
            $scope.travels=$scope.travels.concat(data.data);
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();

    $scope.paginationNext = function(){
        $scope.page++;
        console.log($scope.page);
        $scope.doRefresh();
    };
});
