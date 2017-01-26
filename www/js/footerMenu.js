angular.module('app.footerMenu', ['pascalprecht.translate'])

.controller('FooterMenuCtrl', function($scope, $stateParams, $translate, $filter) {
    $scope.storageuser = JSON.parse(localStorage.getItem("cim_app_userdata"));
    console.log($scope.storageuser);
});
