angular.module('app.userTravels', ['pascalprecht.translate'])

.controller('UserTravelsCtrl', function($scope, $http, $ionicModal,
                        $timeout, $ionicLoading, $filter, $stateParams) {

    $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
    $scope.travels=[];
    $scope.joins=[];
    $scope.doRefresh = function(){
        $http.get(urlapi + 'users/id/travels/'+$stateParams.userid)
        .then(function(data, status, headers,config){
            console.log('data success');
            console.log(data);
            $scope.travels = data.data.travels;
            $scope.joins = data.data.joins;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        },function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        });
    };
    $scope.doRefresh();
});
