angular.module('app.signup', ['pascalprecht.translate'])

  .controller('SignupCtrl', function($scope, $ionicModal, $timeout, $http, $window, $ionicLoading) {
    $scope.signupData = {};
    $scope.doSignup = function() {
      console.log('Doing signup', $scope.signupData);
      if ($scope.emptyParams($scope.signupData)) {
        $http({
            url: urlapi + 'signup',
            method: "POST",
            data: $scope.signupData
          })
          .then(function(response) {
              // success
              console.log("response: ");
              console.log(response.data);

              if (response.data.success == true)
              {
                  localStorage.setItem("cim_app_token", response.data.token);
                  localStorage.setItem("cim_app_userdata", JSON.stringify(response.data.user));
                  window.location.reload();
              }else{
                  console.log("signup failed");
                  $ionicLoading.show({ template: 'signup failed, user or password error.', noBackdrop: true, duration: 2000 });
              }
            },
            function(response) { // optional
              // failed
              $ionicLoading.show({
                template: 'Error on signup',
                noBackdrop: true,
                duration: 2000
              });
            });
      } else {
        $ionicLoading.show({
          template: 'First complete all parameters',
          noBackdrop: true,
          duration: 2000
        });
      }

    };
    $scope.emptyParams = function(obj) {
      if (obj.username == undefined) {
        return (false);
      }
      if (obj.password == undefined) {
        return (false);
      }
      if (obj.email == undefined) {
        return (false);
      }
      return (true);
    };
  });
