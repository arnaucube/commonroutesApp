angular.module('app.settings', ['pascalprecht.translate'])

.controller('SettingsCtrl', function($scope, $stateParams, $translate) {
  if(localStorage.getItem('lang'))//initialization
  {
    $scope.lang=localStorage.getItem('lang');
  }else{
    localStorage.setItem('lang', 'english');
    $scope.lang=localStorage.getItem('lang');
  }

  $scope.langChange = function(lang){
    console.log(lang);
      window.localStorage.setItem('lang', lang);
      $translate.use(lang);
  };
});
