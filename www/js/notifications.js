angular.module('app.notifications', ['pascalprecht.translate'])

  .controller('NotificationsCtrl', function($scope, $http, $ionicLoading,
    $stateParams, $translate, $filter) {
    $scope.notifications = [];
    $scope.doRefresh = function() {
        //first, if already have notifications, set to viewed
        if(localStorage.getItem("cim_app_notifications")!=undefined){
            //console.log(localStorage.getItem("cim_app_notifications"));
            $scope.notifications = JSON.parse(localStorage.getItem("cim_app_notifications"));
            for(var i=0; i<$scope.notifications.length; i++){
                $scope.notifications[i].state = "viewed";
            }
            localStorage.setItem("cim_app_notifications", JSON.stringify($scope.notifications));
        }
      $http.get(urlapi + 'notifications')
        .then(function(data) {
          //console.log(data); // for browser console
          /*$scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
          $scope.storageuser.notifications = [];
          console.log($scope.storageuser.notifications.length);
          localStorage.setItem("cim_app_userdata", JSON.stringify($scope.storageuser));*/

          //get the storage notifications
          if (localStorage.getItem("cim_app_notifications")) {
            $scope.notifications = JSON.parse(localStorage.getItem("cim_app_notifications"));
            $scope.notifications = $scope.notifications.concat(data.data); // for UI
          } else {
            $scope.notifications = data.data;
          }
          //store the notifications
          localStorage.setItem("cim_app_notifications", JSON.stringify($scope.notifications));

          //now clean the notification number that is showed in the menu and main page, from the storageuser.notifications
          /*$scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
          $scope.storageuser.pendentnotifications = [];
          localStorage.setItem("cim_app_userdata", JSON.stringify($scope.storageuser));*/
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
  });
