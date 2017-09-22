angular.module('app.menu', ['pascalprecht.translate'])


  .controller('MenuCtrl', function($scope, $window) {
    if (localStorage.getItem("cim_app_userdata")) {
      $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
      console.log($scope.storageuser);
    }

    $scope.logout = function() {
      localStorage.removeItem("cim_app_token");
      localStorage.removeItem("cim_app_userdata");
      localStorage.removeItem("cim_app_storageuser");
      localStorage.removeItem("cim_app_notifications");
      $window.location.reload(true);
    };
  });
