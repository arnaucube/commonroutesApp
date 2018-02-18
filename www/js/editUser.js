angular.module('app.editUser', ['pascalprecht.translate'])

.controller('EditUserCtrl', function($scope, $stateParams, $http, $filter,
                                $ionicModal, $cordovaCamera, $ionicLoading) {
    $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
    $scope.user=$scope.storageuser;
    $scope.selectAvatar = function(){
        console.log("img");
        var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.sourceType,
                allowEdit: true,
                encodingType: Camera.EncodingType.PNG,
                targetWidth: 500,
                targetHeight: 500,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                //$scope.user.newAvatar = "data:image/jpeg;base64," + imageData;
                $scope.user.avatar = "data:image/jpeg;base64," + imageData;
                $scope.user.newAvatar = imageData;
                }, function(err) {
                console.log(err);
            });
            /*$cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.user.avatar = imageURI;
                $scope.user.newAvatar = imageURI;
                }, function(err) {
                console.log(err);
            });*/
    };
    $scope.selectFaircoinPublicKey = function(){
        console.log("img");
        var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.user.faircoin = "data:image/jpeg;base64," + imageData;
                $scope.user.newFaircoin = imageData;
                }, function(err) {
                console.log(err);
            });
    };
    $scope.update=function(){
        $http({
            url: urlapi + 'users',
            method: "PUT",
            data: $scope.user
          })
          .then(function(data) {
              // success
              console.log("data: ");
              console.log(data.data);
              localStorage.setItem("cim_app_userdata", JSON.stringify(data.data));
              window.location="#/app/users/" + data.data._id;
            },
            function(data) { // optional
              // failed
              $ionicLoading.show({
                template: 'Error on update',
                noBackdrop: true,
                duration: 2000
              });
            });
    };
});
