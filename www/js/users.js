angular.module('app.users', ['pascalprecht.translate'])

.controller('UsersCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {
    $scope.users="";

    $scope.users=JSON.parse(localStorage.getItem('c_users'));

    $scope.doRefresh = function() {

        /* users refresh: */
        $http.get(urlapi + 'users')
        .success(function(data, status, headers, config){
            console.log('data success');
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
    $scope.doRefresh();
});
