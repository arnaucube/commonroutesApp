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
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.user.avatar = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
    };
    $scope.selectFaircoinPublicKey = function(){
        console.log("img");
        var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.user.faircoin = "data:image/jpeg;base64," + imageData;
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
