angular.module('app.travels', ['pascalprecht.translate'])

  .controller('TravelsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {
    $scope.loadMorePagination = true;

    $scope.travels = [];
    $scope.page = 0;
    $scope.doRefresh = function() {
      /* travels refresh: */
      $http.get(urlapi + 'travels?page=' + $scope.page)
        .then(function(data) {
          console.log('data success travels');
          console.log(data); // for browser console
          //$scope.travels = data.data; // for UI
          $scope.travels = $scope.travels.concat(data.data);
          $scope.$broadcast('scroll.refreshComplete'); //refresher stop
          $scope.$broadcast('scroll.infiniteScrollComplete');
          if (data.data.length < 1) {
              console.log("setting loadMorePagination to false");
            $scope.loadMorePagination = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }

        }, function(data) {
          console.log('data error');
          $scope.$broadcast('scroll.refreshComplete'); //refresher stop
          $ionicLoading.show({
            template: 'Error connecting server',
            noBackdrop: true,
            duration: 2000
          });

        });
    };
    $scope.doRefresh();

    $scope.paginationNext = function() {
      if ($scope.loadMorePagination == true) {
        $scope.page++;
        console.log($scope.page);
        $scope.doRefresh();
    }else{
        console.log("limit pagination reached");
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    };
  });
