angular.module('app.notifications', ['pascalprecht.translate'])

.controller('NotificationsCtrl', function($scope, $stateParams, $translate, $filter) {
  if(localStorage.getItem('c_token')){// adding token to the headers
    //  $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('c_token');
  }
  $scope.storageusername=localStorage.getItem("c_username");
  $scope.users= JSON.parse(localStorage.getItem('c_users'));
  $scope.user = $filter('filter')($scope.users, {username: $stateParams.username}, true)[0];
  $scope.notifications=$scope.user.notifications;

  console.log($stateParams.username);
  console.log($scope.notifications);
  console.log("notifications page");
});
