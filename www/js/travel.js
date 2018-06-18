angular.module('app.travel', ['pascalprecht.translate', 'ui-leaflet'])

  .controller('TravelCtrl', function($scope, $stateParams, $http,
    $ionicModal, $ionicLoading, $ionicPopup, $filter,
    leafletData, leafletBoundsHelpers) {
    $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));

    $scope.center = {
      /*lat: 0,
      lng: 0,
      zoom: 1*/
    };
    $scope.bounds = {};
    $scope.markers = [];
    $scope.tiles = {
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: {
        attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    };

    $scope.travel = {};
    $scope.doRefresh = function() {
      /* travels refresh: */
      $http.get(urlapi + 'travels/id/' + $stateParams.travelid)
        .then(function(data) {
          console.log('data success travels');
          console.log(data); // for browser console
          $scope.travel = data.data; // for UI
          $scope.markers = [];
          $scope.markers.push({
            lat: Number($scope.travel.from.lat),
            lng: Number($scope.travel.from.long),
            message: $scope.travel.from.name
          });
          $scope.markers.push({
            lat: Number($scope.travel.to.lat),
            lng: Number($scope.travel.to.long),
            message: $scope.travel.to.name
          });
          $scope.center = {
            lat: (Number($scope.travel.from.lat) + Number($scope.travel.to.lat)) / 2,
            lng: (Number($scope.travel.from.long) + Number($scope.travel.to.long)) / 2,
            zoom: 4
          };

          $scope.$broadcast('scroll.refreshComplete'); //refresher stop

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

    $scope.deleteTravel = function() {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Deleting publication',
        template: 'Are you sure you want to delete <b>' + $scope.travel.title + '</b>?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          console.log('You are sure');
          console.log("delete travel: " + $stateParams.travelid);
          $http({
              url: urlapi + '/travels/id/modify/' + $stateParams.travelid,
              method: "DELETE"
            })
            .then(function(response) {
                console.log(response);
                $scope.travels = response.data;
                localStorage.setItem('c_travels', JSON.stringify($scope.travels));
                localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));

                window.location="#app/users/userTravels/" + $scope.storageuser._id;
              },
              function(response) { // optional
                // failed
              });
        } else {
          console.log('You are not sure');
        }
      });


    };
    $scope.joinTravel = function() {
      $http({
          url: urlapi + 'travels/join/' + $stateParams.travelid,
          method: "POST",
          data: {}
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data);
            if (data.data.success == false) {
              $ionicLoading.show({
                template: 'Error on unjoin',
                noBackdrop: true,
                duration: 2000
              });
            } else {
              $scope.travel = data.data;
            }
          },
          function(response) { // optional
            // failed
          });
    };
    $scope.unjoinTravel = function() {
      $http({
          url: urlapi + 'travels/unjoin/' + $stateParams.travelid,
          method: "POST",
          data: {}
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data);
            if (data.data.success == false) {
              $ionicLoading.show({
                template: 'Error on unjoin',
                noBackdrop: true,
                duration: 2000
              });
            } else {
              $scope.travel = data.data;
            }
          },
          function(response) { // optional
            // failed
          });
    };

    $scope.declineJoin = function(joinPetition) {
      $http({
          url: urlapi + 'travels/declineJoin/' + $stateParams.travelid,
          method: "POST",
          data: {
            userid: joinPetition._id
          }
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data);
            if (data.data.success == false) {
              $ionicLoading.show({
                template: 'Error on declining',
                noBackdrop: true,
                duration: 2000
              });
            } else {
              $scope.travel = data.data;
              console.log("success");
            }
          },
          function(response) { // optional
            // failed
          });
    };

    $scope.acceptJoin = function(joinPetition) {
      $http({
          url: urlapi + 'travels/acceptJoin/' + $stateParams.travelid,
          method: "POST",
          data: {
            userid: joinPetition._id
          }
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data);
            if (data.data.success == false) {
              $ionicLoading.show({
                template: 'Error on accepting',
                noBackdrop: true,
                duration: 2000
              });
            } else {
              $scope.travel = data.data;
              console.log("success");
            }
          },
          function(response) { // optional
            // failed
          });
    };

    $scope.leaveTravel = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Leaving travel',
        template: 'Are you sure you want to leave <b>' + $scope.travel.title + '</b>?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          $http({
              url: urlapi + 'travels/leave/' + $stateParams.travelid,
              method: "POST",
              data: {}
            })
            .then(function(data) {
                console.log("data: ");
                console.log(data);
                if (data.data.success == false) {
                  $ionicLoading.show({
                    template: 'Error on unjoin',
                    noBackdrop: true,
                    duration: 2000
                  });
                } else {
                  $scope.travel = data.data;
                }
              },
              function(response) { // optional
                // failed
              });
        } else {
          console.log('You are not sure');
        }
      });
    };

    /* adding comment */
    $scope.doingNewComment = false;
    $scope.newComment = {};

    $scope.showNewComment = function() {
      $scope.doingNewComment = true;
    };
    $scope.closeNewComment = function() {
      $scope.doingNewComment = false;
    };
    $scope.doNewComment = function() {
      /*$scope.newComment.commentUserId=localStorage.getItem("c_userid");
      $scope.newComment.commentUsername=localStorage.getItem("c_username");
      $scope.newComment.commentAvatar=localStorage.getItem("c_avatar");*/
      console.log($scope.newComment);
      $http({
          url: urlapi + 'travels/' + $stateParams.travelId + '/comment',
          method: "POST",
          data: $scope.newComment
        })
        .then(function(response) {
            // success
            console.log("newComment added to server: " + response);
            console.log(response);
            $scope.travels = response.data;
            localStorage.setItem('c_travels', JSON.stringify($scope.travels));
            localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));
            $scope.travel = $filter('filter')($scope.travels, $stateParams.travelId, true)[0];

            if (response.data.success == false) {

              $ionicLoading.show({
                template: 'failed to generate new asking package',
                noBackdrop: true,
                duration: 2000
              });
            }
          },
          function(response) { // optional
            // failed
          });
      $scope.closeNewComment();
    };


    $scope.userHasJoined = function(myArray, searchTerm) {
      //console.log(myArray+", "+searchTerm);
      if (myArray) {
        for (var i = 0, len = myArray.length; i < len; i++) {
          //console.log(myArray[i] + " - " + searchTerm);
          if (myArray[i]._id === searchTerm) {
            //console.log("i: " + i);
            return i;
          }
        }
      }
      //console.log("i: -1");
      return -1;
    };
    $scope.openTravelLink = function(travelid) {
      window.open('http://routes.fair.coop/app/#!/travel/' + travelid, '_system', 'location=yes');
      return false;
    };
    $scope.openTelegram = function(telegramuser) {
      window.open('http://telegram.me/' + telegramuser, '_system', 'location=yes');
      return false;
    };
    $scope.copyTravelLink = function(link) {
      $cordovaClipboard.copy("Text To Copy").then(function() {
          // success
      }, function() {
          // error
      });
    };
  });
