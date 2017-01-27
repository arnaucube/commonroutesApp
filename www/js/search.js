angular.module('app.search', ['pascalprecht.translate'])

.controller('SearchCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    $scope.users=[];
    $scope.travels=[];
    $scope.search={
        word:""
    };
    $scope.doSearch = function() {
        console.log("doing search");
        console.log($scope.search.word);
      /* travels refresh: */
        $http.get(urlapi + 'search/'+ $scope.search.word)
        .then(function(data){
            console.log('data success travels');
            console.log(data); // for browser console
            $scope.users = data.data.users; // for UI
            $scope.travels = data.data.travels; // for UI
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
});
