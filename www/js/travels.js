angular.module('app.travels', ['pascalprecht.translate'])

.controller('TravelsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    

    $scope.doRefresh = function() {
      /* travels refresh: */
        $http.get(urlapi + 'travels')
        .success(function(data, status, headers,config){
            console.log('data success travels');
            console.log(data); // for browser console
            $scope.travels = data; // for UI
            localStorage.setItem('c_travels', JSON.stringify($scope.travels));
            localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        })
        .error(function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        })
        .then(function(result){
            travels = result.data;
            $ionicLoading.show({ template: 'Travels actualized from server!', noBackdrop: true, duration: 2000 });
        });

        /* users refresh: */
        $http.get(urlapi + 'users')
        .success(function(data, status, headers, config){
            console.log('data success users');
            console.log(data); // for browser console
            $scope.users = data; // for UI
            localStorage.setItem('c_users', JSON.stringify($scope.users));
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

            //set userdata
            $scope.userdata = $filter('filter')($scope.users, {username: $scope.storageusername}, true)[0];
            console.log("userdata");
            console.log($scope.userdata);
            localStorage.setItem("c_userdata", JSON.stringify($scope.userdata));
        })
        .error(function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .then(function(result){
            users = result.data;
        });
    };
    $scope.newtravel={};
    /*$scope.newtravel={
        title: "prova",
        from: "prova",
        to: "prova",
        seats: 3,
        package: true,
        phone: 123,
        telegram: "telusr",
        description: "this is the description of prova"
    };*/

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
    /*$scope.newtravel.owner=localStorage.getItem("c_username");
    $scope.newtravel.telegram=JSON.parse(localStorage.getItem("c_userdata")).telegram;
    $scope.newtravel.phone=JSON.parse(localStorage.getItem("c_userdata")).phone;*/
    $scope.newtravel.modality="offering";
    //$scope.newtravel.token=localStorage.getItem("c_token");
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
            //$scope.newtravel._id=response.data._id;
            //$scope.travels.push($scope.newtravel);
            $scope.travels=response.data;
            localStorage.setItem('c_travels', JSON.stringify($scope.travels));
            localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));
            $scope.newtravel={};
            if(response.data.success==false){

                $ionicLoading.show({ template: 'failed to generate new travel', noBackdrop: true, duration: 2000 });
            }
    },
    function(response) { // optional
            // failed
        $ionicLoading.show({ template: 'failed to generate new publication, all input fields needed', noBackdrop: true, duration: 2000 });
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
    /*$scope.newtravel.owner=localStorage.getItem("c_username");
    $scope.newtravel.telegram=JSON.parse(localStorage.getItem("c_userdata")).telegram;
    $scope.newtravel.phone=JSON.parse(localStorage.getItem("c_userdata")).phone;*/

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
            //$scope.newtravel._id=response.data._id;
            //$scope.travels.push($scope.newtravel);
            $scope.travels=response.data;
            localStorage.setItem('c_travels', JSON.stringify($scope.travels));
            localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));
            $scope.newtravel={};
            if(response.data.success==false){

                $ionicLoading.show({ template: 'failed to generate new asking travel', noBackdrop: true, duration: 2000 });
            }
    },
    function(response) { // optional
            // failed
            $ionicLoading.show({ template: 'failed to generate new publication, all input fields needed', noBackdrop: true, duration: 2000 });
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
    /*$scope.newtravel.owner=localStorage.getItem("c_username");
    $scope.newtravel.telegram=JSON.parse(localStorage.getItem("c_userdata")).telegram;
    $scope.newtravel.phone=JSON.parse(localStorage.getItem("c_userdata")).phone;*/

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
            //$scope.newtravel._id=response.data._id;
            //$scope.travels.push($scope.newtravel);
            $scope.travels=response.data;
            localStorage.setItem('c_travels', JSON.stringify($scope.travels));
            localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));
            $scope.newtravel={};
            if(response.data.success==false){

                $ionicLoading.show({ template: 'failed to generate new asking package', noBackdrop: true, duration: 2000 });
            }
    },
    function(response) { // optional
            // failed
            $ionicLoading.show({ template: 'failed to generate new publication, all input fields needed', noBackdrop: true, duration: 2000 });
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeNewAskingPackage();
    }, 1000);
  };
});
