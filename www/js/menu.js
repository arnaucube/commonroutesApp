angular.module('app.menu', ['pascalprecht.translate'])


  .controller('MenuCtrl', function($scope) {
    $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
    console.log($scope.storageuser);
    $scope.logout = function() {
      localStorage.removeItem("cim_app_token");
      localStorage.removeItem("cim_app_userdata");
      window.location = "/";
    };
  });
