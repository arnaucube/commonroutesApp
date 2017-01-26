angular.module('app.user', ['pascalprecht.translate'])

.controller('UserCtrl', function($scope, $stateParams, $http, $filter, $ionicModal) {


    $scope.user={};
    $http.get(urlapi + 'users/id/'+$stateParams.userid)
        .then(function(data, status, headers,config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.user = data.data; // for UI
        },function(data, status, headers,config){
            console.log('data error');
        });



    $scope.favUser = function(){
        $scope.newfav={
            //travelId: $stateParams.travelId,
            /*userId: localStorage.getItem("c_userid"),
            username: localStorage.getItem("c_username"),
            avatar: localStorage.getItem("c_avatar")*/
        };
        $scope.user.favs.push($scope.newfav);//al unfav no cal fer aquest simulacre pq ja no existeix a l'array i no el resta dos cops en cas de que cliquin dos cops
        $http({
            //url: urlapi + 'users/'+ $stateParams.username+'/fav',
            url: urlapi + 'users/'+ $scope.user._id+'/fav',
            method: "POST",
            data: $scope.newfav
        })
        .then(function(response) {
                // success
                console.log("response: ");
                console.log(response);

                $scope.users=response.data;
                localStorage.setItem('c_users', JSON.stringify($scope.users));
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username}, true)[0];

        },
        function(response) { // optional
                // failed
        });
    };
    $scope.unfavUser = function(){
        console.log("unfav");
        $scope.unfav={
            /*userId: localStorage.getItem("c_userid"),
            username: localStorage.getItem("c_username"),
            avatar: localStorage.getItem("c_avatar")*/
        };
        $http({
            //url: urlapi + 'users/'+ $stateParams.username+'/fav',
            url: urlapi + 'users/'+ $scope.user._id+'/unfav',
            method: "POST",
            data: $scope.unfav
        })
        .then(function(response) {
                // success
                console.log("response: ");
                console.log(response);

                $scope.users=response.data;
                localStorage.setItem('c_users', JSON.stringify($scope.users));
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username}, true)[0];

        },
        function(response) { // optional
                // failed
        });
    };

    $ionicModal.fromTemplateUrl('templates/favsList.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalFavsList = modal;
    });
    $scope.closeModalFavsList = function() {
      $scope.modalFavsList.hide();
    };
    $scope.showFavsList = function(){
      $scope.modalFavsList.show();
    };
    $scope.closeModalAndGoUser = function(){
      $scope.modalFavsList.hide();
    };

    $scope.arrayObjectIndexOf = function(myArray, searchTerm, property) {
        if(myArray){
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm){
                    return i;
                }
            }
        }
        return -1;
    };
});
