angular.module('app.users', ['pascalprecht.translate'])

  .controller('UsersCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {
    $scope.users = [];
    $scope.loadMorePagination = true;
    $scope.page = 0;

    //$scope.users = JSON.parse(localStorage.getItem('c_users'));

    $scope.doRefresh = function() {

      /* users refresh: */
      $http.get(urlapi + 'users?page=' + $scope.page)
        .then(function(data) {
          console.log('data success');
          console.log(data);

          $scope.users = $scope.users.concat(data.data);
          $scope.$broadcast('scroll.refreshComplete'); //refresher stop
          $scope.$broadcast('scroll.infiniteScrollComplete');
          if (data.data.length < 1) {
            console.log("setting loadMorePagination to false");
            $scope.loadMorePagination = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }


          /*localStorage.setItem('c_users', JSON.stringify($scope.users));
          $scope.$broadcast('scroll.refreshComplete'); //refresher stop

          //set userdata
          $scope.userdata = $filter('filter')($scope.users, {
            username: $scope.storageusername
          }, true)[0];
          console.log("userdata");
          console.log($scope.userdata);
          localStorage.setItem("c_userdata", JSON.stringify($scope.userdata));*/
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
      } else {
        console.log("limit pagination reached");
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    };
  });
