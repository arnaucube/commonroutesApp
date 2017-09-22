angular.module('app.userLikes', ['pascalprecht.translate'])

.controller('UserLikesCtrl', function($scope, $http, $ionicModal,
                        $timeout, $ionicLoading, $filter, $stateParams) {

    $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
    $scope.likes=[];
    $scope.doRefresh = function(){
        $http.get(urlapi + 'users/id/likes/'+$stateParams.userid)
        .then(function(data, status, headers,config){
            console.log('data success');
            console.log(data);
            $scope.likes = data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        },function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        });
    };
    $scope.doRefresh();
});
