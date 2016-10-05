
//var urlapi="http://localhost:3000/api/";
var urlapi="https://collectivecar.paas.primustech.io/api/";


//localStorage.setItem("c_username", "user2");
//localStorage.setItem("c_token", "");


angular.module('starter.controllers', ['pascalprecht.translate'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window, $ionicLoading) {
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
  $scope.storageavatar=localStorage.getItem("c_avatar");
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
                localStorage.setItem("c_userid", response.data.userid);
                localStorage.setItem("c_avatar", response.data.avatar);
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
    if($scope.emptyParams($scope.signupData))
    {
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
                $scope.login();
              }, 1000);

      },
      function(response) { // optional
              // failed
      });
    }else{
      $ionicLoading.show({ template: 'First complete all parameters', noBackdrop: true, duration: 2000 });
    }

  };
  $scope.emptyParams = function(obj){
    if(obj.username==undefined)
    {
      return(false);
    }
    if(obj.password==undefined)
    {
      return(false);
    }
    if(obj.mail==undefined)
    {
      return(false);
    }
    if(obj.phone==undefined)
    {
      return(false);
    }
    if(obj.avatar==undefined)
    {
      return(false);
    }
    return(true);
  };
  $scope.avatars=[
    "turtle",
    "cat",
    "toucan",
    "racoon",
    "tiger",
    "squirrel",
    "sheep",
    "penguin",
    "panda",
    "owl",
    "pelican",
    "whale",
    "snake",
    "mouse",
    "giraffe",
    "macaw",
    "lion",
    "llama",
    "kangaroo",
    "hen",
    "frog",
    "clown-fish",
    "chameleon",
    "octopus"
  ];
  $scope.avatarSelect = function(avat){
    $scope.signupData.avatar=avat;
    //alert($scope.signupData.avatar);
  };
  $scope.logout = function(){
      localStorage.removeItem("c_username");
      localStorage.removeItem("c_token");
      localStorage.removeItem("c_avatar");
      localStorage.removeItem("c_userid");
      $window.location.reload(true);
  };
})


.controller('TravelsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading) {
    if(localStorage.getItem('c_token')){// adding token to the headers
        //console.log("token added to headers in run module");
        //console.log($http.defaults);
        $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('c_token');
        //$http.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
        //console.log($http.defaults.headers);
    }
    /*if(localStorage.getItem('c_token')){// adding token to the headers
        $http.defaults.headers.token = localStorage.getItem('c_token');
    }*/

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
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        })
        .then(function(result){
            travels = result.data;
            $ionicLoading.show({ template: 'Travels actualized from server!', noBackdrop: true, duration: 2000 });
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
    $scope.newtravel.owner=localStorage.getItem("c_username");

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

.controller('TravelCtrl', function($scope, $stateParams, $http, $ionicModal, $ionicPopup) {
    if(localStorage.getItem('c_token')){// adding token to the headers
        $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('c_token');
    }
    $scope.storageusername=localStorage.getItem("c_username");
    $scope.travel="";
    console.log($stateParams.travelId);
    $http.get(urlapi + 'travels/'+$stateParams.travelId)
        .success(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.travel = data; // for UI
            console.log("b");
            console.log($scope.travel);
        })
        .error(function(data, status, headers,config){
            console.log('data error');
        })
        .then(function(result){
            travel = result.data;
    });
    $http.get(urlapi + 'travels/join/'+$stateParams.travelId)
        .success(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.joins = data; // for UI
        })
        .error(function(data, status, headers,config){
            console.log('data error');
        })
        .then(function(result){
            joins = result.data;
    });
    $http.get(urlapi + 'travels/comment/'+$stateParams.travelId)
        .success(function(data, status, headers,config){
            console.log(data); // for browser console
            $scope.comments = data; // for UI
        })
        .error(function(data, status, headers,config){
            console.log('data error');
        })
        .then(function(result){
            comments = result.data;
    });

    $scope.deleteTravel = function(){

       var confirmPopup = $ionicPopup.confirm({
         title: 'Deleting publication',
         template: 'Are you sure you want to delete <b>'+ $scope.travel.title+'</b>?'
       });
       confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
         console.log("delete travel: " + $stateParams.travelId);
         $http({
             url: urlapi + 'travels/' + $stateParams.travelId,
             method: "DELETE"
         })
         .then(function(response) {
                 console.log(response);
         },
         function(response) { // optional
                 // failed
         });
       } else {
         console.log('You are not sure');
       }
     });


    };
    $scope.joinTravel = function(){
        $scope.newjoin={
            travelId: $stateParams.travelId,
            joinedUserId: localStorage.getItem("c_userid"),
            joinedUsername: localStorage.getItem("c_username"),
            joinedAvatar: localStorage.getItem("c_avatar")
        };
        $http({
            url: urlapi + 'travels/join/' + $stateParams.travelId,
            method: "POST",
            data: $scope.newjoin
        })
        .then(function(response) {
                // success
                console.log("response: ");
                console.log(response);

        },
        function(response) { // optional
                // failed
        });
    };
    $scope.unjoinTravel = function(){
        console.log("unjoin");
        $scope.unjoin={
            travelId: $stateParams.travelId,
            joinedUserId: localStorage.getItem("c_userid"),
            joinedUsername: localStorage.getItem("c_username"),
            joinedAvatar: localStorage.getItem("c_avatar")
        };
        $http({
            url: urlapi + 'travels/unjoin/' + $stateParams.travelId,
            method: "POST",
            data: $scope.unjoin
        })
        .then(function(response) {
                // success
                console.log("response: ");
                console.log(response);

        },
        function(response) { // optional
                // failed
        });
    };

    /* adding comment */
    $scope.doingNewComment=false;
    $scope.newComment={};

    $scope.showNewComment = function() {
      $scope.doingNewComment=true;
    };
    $scope.closeNewComment = function() {
        $scope.doingNewComment=false;
    };
    $scope.doNewComment = function() {
        $scope.newComment.commentUserId=localStorage.getItem("c_userid");
        $scope.newComment.commentUsername=localStorage.getItem("c_username");
        $scope.newComment.commentAvatar=localStorage.getItem("c_avatar");
console.log($scope.newComment);
        $http({
          url: urlapi + 'travels/comment/' + $stateParams.travelId,
          method: "POST",
          data: $scope.newComment
        })
        .then(function(response) {
              // success
              console.log("newComment added to server: " + response);
              console.log(response);
              if(response.data.success==false){

                  $ionicLoading.show({ template: 'failed to generate new asking package', noBackdrop: true, duration: 2000 });
              }
        },
        function(response) { // optional
              // failed
        });
        $scope.closeNewComment();
    };
    console.log("a");
    console.log($scope.storageusername);
    console.log($scope.travel.owner);


    $scope.arrayObjectIndexOf = function(myArray, searchTerm, property) {
        if(myArray)
        {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm){
                    //console.log("i: " + i);
                    return i;
                }
            }
        }
        //console.log("i: -1");
        return -1;
    }
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
}).controller('SettingsCtrl', function($scope, $stateParams, $translate) {
  if(localStorage.getItem('lang'))//initialization
  {
    $scope.lang=localStorage.getItem('lang');
  }else{
    localStorage.setItem('lang', 'english');
    $scope.lang=localStorage.getItem('lang');
  }

  $scope.langChange = function(lang){
    console.log(lang);
      window.localStorage.setItem('lang', lang);
      $translate.use(lang);
  };
});
