angular.module('app.login', ['pascalprecht.translate'])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $http, $window, $ionicLoading) {

    // Form data for the login modal
    $scope.loginData = {};
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $http({
          url: urlapi + 'login',
          method: "POST",
          data: $scope.loginData
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
                  console.log("login failed");
                  $ionicLoading.show({ template: 'Login failed, user or password error.', noBackdrop: true, duration: 2000 });
              }


      },
      function(response) { // optional
              // failed
              console.log(response);
      });

    };
});
