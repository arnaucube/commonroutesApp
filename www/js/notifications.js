angular.module('app.notifications', ['pascalprecht.translate'])

.controller('NotificationsCtrl', function($scope, $http, $ionicLoading,
                                    $stateParams, $translate, $filter) {
    $scope.notifications=[];
    $scope.doRefresh = function(){
        $http.get(urlapi + 'notifications')
        .then(function(data){
            console.log(data); // for browser console
            $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
            $scope.storageuser.notifications = data.data;
            localStorage.setItem("cim_app_userdata", JSON.stringify($scope.storageuser));

            $scope.notifications = data.data; // for UI
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();
});
