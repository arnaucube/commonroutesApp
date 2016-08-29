
var urlapi="http://localhost:3000/api/";
//var urlapi="http://192.168.1.40:3000/api/";
//localStorage.setItem("c_username", "user2");
//localStorage.setItem("c_token", "");


angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData= {};

  $scope.storageusername=localStorage.getItem("c_username");
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSignup = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };
  $scope.closeSignup = function() {
    $scope.modalSignup.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modalLogin.show();
  };
  $scope.signup = function() {
    $scope.modalSignup.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $http({
        url: urlapi + 'auth',
        method: "POST",
        data: $scope.loginData
    })
    .then(function(response) {
            // success
            console.log("response: ");
            console.log(response.data);
            if(response.data.success==true)
            {
                console.log("login successful");
                localStorage.setItem("c_username", $scope.loginData.username);
                localStorage.setItem("c_token", response.data.token);
            }else{
                console.log("login failed");
            }
            $timeout(function() {
              $scope.closeLogin();
              $window.location.reload(true);
            }, 1000);

    },
    function(response) { // optional
            // failed
            console.log(response);
    });

  };
  $scope.doSignup = function() {
    console.log('Doing signup', $scope.signupData);

    $http({
        url: urlapi + 'users',
        method: "POST",
        data: $scope.signupData
    })
    .then(function(response) {
            // success
            console.log("response: ");
            console.log(response.data);
            $timeout(function() {
              $scope.closeSignup();
            }, 1000);

    },
    function(response) { // optional
            // failed
    });

  };
  $scope.logout = function(){
      localStorage.removeItem("c_username");
      localStorage.removeItem("c_token");
      $window.location.reload(true);
  };
})


.controller('TravelsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading) {
    $scope.travels="";

    $scope.travels=JSON.parse(localStorage.getItem('c_travels'));

    $scope.doRefresh = function() {
        $http.get(urlapi + 'travels')
        .success(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.travels = data; // for UI
            localStorage.setItem('c_travels', JSON.stringify($scope.travels));
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .error(function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .then(function(result){
            travels = result.data;
            $ionicLoading.show({ template: 'Travels actualized from server!', noBackdrop: true, duration: 2000 });
        });
    };

    $scope.newtravel={};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newofferingtravel.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalOffering = modal;
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newaskingtravel.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalAsking = modal;
  });

  $ionicModal.fromTemplateUrl('templates/newaskingpackage.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPackage = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeNewOfferingTravel = function() {
    $scope.modalOffering.hide();
  };
  // Triggered in the login modal to close it
  $scope.closeNewAskingTravel = function() {
    $scope.modalAsking.hide();
  };
  $scope.closeNewAskingPackage = function() {
    $scope.modalPackage.hide();
  };

  // Open the login modal
  $scope.showNewOfferingTravel = function() {
    $scope.modalOffering.show();
  };
  // Open the login modal
  $scope.showNewAskingTravel = function() {
    $scope.modalAsking.show();
  };
  $scope.showNewAskingPackage = function() {
    $scope.modalPackage.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doNewOfferingTravel = function() {
    console.log('Doing new travel', $scope.newtravel);
    $scope.newtravel.icon="lorry";
    $scope.newtravel.generateddate=$scope.newtravel.date;
    $scope.newtravel.owner=localStorage.getItem("c_username");

    $scope.newtravel.modality="offering";
    console.log($scope.newtravel);
    $http({
        url: urlapi + 'travels',
        method: "POST",
        data: $scope.newtravel
    })
    .then(function(response) {
            // success
            console.log("response: ");
            console.log(response);
            $scope.newtravel._id=response.data._id;
            $scope.travels.push($scope.newtravel);
            $scope.newtravel={};
            if(response.data.success==false){

                $ionicLoading.show({ template: 'failed to generate new travel', noBackdrop: true, duration: 2000 });
            }
    },
    function(response) { // optional
            // failed
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeNewOfferingTravel();
    }, 1000);
  };

  $scope.doNewAskingTravel = function() {
    console.log('Doing new travel', $scope.newtravel);
    $scope.newtravel.icon="lorry";
    $scope.newtravel.generateddate=$scope.newtravel.date;
    $scope.newtravel.owner=localStorage.getItem("c_username");

    $scope.newtravel.modality="asking";
    console.log($scope.newtravel);
    $http({
        url: urlapi + 'travels',
        method: "POST",
        data: $scope.newtravel
    })
    .then(function(response) {
            // success
            console.log("response: ");
            console.log(response);
            $scope.newtravel._id=response.data._id;
            $scope.travels.push($scope.newtravel);
            if(response.data.success==false){

                $ionicLoading.show({ template: 'failed to generate new asking travel', noBackdrop: true, duration: 2000 });
            }
    },
    function(response) { // optional
            // failed
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeNewAskingTravel();
    }, 1000);
  };

  $scope.doNewAskingPackage = function() {
    console.log('Doing new package', $scope.newtravel);
    $scope.newtravel.icon="lorry";
    $scope.newtravel.generateddate=$scope.newtravel.date;
    $scope.newtravel.owner=localStorage.getItem("c_username");
    $scope.newtravel.package=true;

    $scope.newtravel.modality="package";
    console.log($scope.newtravel);
    $http({
        url: urlapi + 'travels',
        method: "POST",
        data: $scope.newtravel
    })
    .then(function(response) {
            // success
            console.log("response: ");
            console.log(response);
            $scope.newtravel._id=response.data._id;
            $scope.travels.push($scope.newtravel);
            if(response.data.success==false){

                $ionicLoading.show({ template: 'failed to generate new asking package', noBackdrop: true, duration: 2000 });
            }
    },
    function(response) { // optional
            // failed
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeNewAskingPackage();
    }, 1000);
  };
})

.controller('TravelCtrl', function($scope, $stateParams, $http) {
    $scope.storageusername=localStorage.getItem("c_username");
    $scope.travel="";
    console.log($stateParams.travelId);
    $http.get(urlapi + 'travels/'+$stateParams.travelId)
        .success(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.travel = data; // for UI
        })
        .error(function(data, status, headers,config){
            console.log('data error');
        })
        .then(function(result){
            travels = result.data;
    });
})

.controller('UsersCtrl', function($scope, $http, $ionicModal, $timeout) {
    $scope.users="";

    $scope.users=JSON.parse(localStorage.getItem('c_users'));

    $scope.doRefresh = function() {
        $http.get(urlapi + 'users')
        .success(function(data, status, headers, config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.users = data; // for UI
            localStorage.setItem('c_users', JSON.stringify($scope.users));
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .error(function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .then(function(result){
            users = result.data;
        });
    };
})

.controller('UserCtrl', function($scope, $stateParams, $http) {
    //$scope.user="";
    console.log($stateParams.username);
    $http.get(urlapi + 'users/byusername/'+$stateParams.username)
        .success(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.user = data; // for UI
        })
        .error(function(data, status, headers,config){
            console.log('data error');
        })
        .then(function(result){
            user = result.data;
    });

    $http.get(urlapi + 'travels/user/'+$stateParams.username)
        .success(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.travels = data; // for UI
        })
        .error(function(data, status, headers,config){
            console.log('data error');
        })
        .then(function(result){
            travels = result.data;
    });
});
