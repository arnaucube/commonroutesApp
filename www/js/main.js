angular.module('app.main', ['pascalprecht.translate'])

  .controller('MainCtrl', function($scope, $stateParams, $translate, $filter,
    $ionicLoading, $http) {
    if (localStorage.getItem("cim_app_userdata")) {
      $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
      console.log($scope.storageuser);
    }
    //get the num of pendent notifications each time
    $http.get(urlapi + 'numnotifications')
      .then(function(data) {
          $scope.storageuser.notifications = data.data;
          console.log(data.data);
          localStorage.setItem("cim_app_storageuser", JSON.stringify($scope.storageuser));
      }, function(data) {
        console.log('data error');
        $ionicLoading.show({
          template: 'Error connecting server',
          noBackdrop: true,
          duration: 2000
        });
      });
  });
