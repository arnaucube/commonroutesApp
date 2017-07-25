angular.module('app.password', ['pascalprecht.translate'])

  .controller('PasswordCtrl', function($scope, $stateParams, $translate,
      $http, $ionicLoading) {
      $scope.newPass = {};
      $scope.changePassword = function() {
          console.log($scope.newPass);
        $http({
            url: urlapi + 'changePassword',
            method: "PUT",
            data: $scope.newPass
          })
          .then(function(data) {
              console.log(data);
              $ionicLoading.show({
                template: 'Password updated',
                noBackdrop: true,
                duration: 2000
              });
              window.location = "#app/settings";
            },
            function(data) { // optional
              // failed
              console.log(data);
              $ionicLoading.show({
                template: 'Error updating password',
                noBackdrop: true,
                duration: 2000
              });

            });
      };
  });
