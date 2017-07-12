// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


var urlapi = "http://localhost:3000/api/";
//var urlapi = "http://192.168.1.36:3000/api/";
//var urlapi = "http://51.255.193.106:3000/api/";

angular.module('starter', [
    'ionic',
    'ngCordova',
    'pascalprecht.translate',
    'app.login',
    'app.signup',
    'app.menu',
    'app.footerMenu',
    'app.main',
    'app.search',
    'app.travels',
    'app.travel',
    'app.newTravel',
    'app.offerCar',
    'app.askForCar',
    'app.askForPackage',
    'app.users',
    'app.user',
    'app.userTravels',
    'app.userLikes',
    'app.editUser',
    'app.notifications',
    'app.settings',
    'app.help'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        cache: false,
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
      })
      .state('app.main', {
        cache: false,
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'templates/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl'
          }
        }
      })
      .state('app.travels', {
        url: '/travels',
        views: {
          'menuContent': {
            templateUrl: 'templates/travels.html',
            controller: 'TravelsCtrl'
          }
        }
      })

      .state('app.travel', {
        url: '/travels/:travelid',
        views: {
          'menuContent': {
            templateUrl: 'templates/travel.html',
            controller: 'TravelCtrl'
          }
        }
      })

      .state('app.newTravel', {
        url: '/newTravel',
        views: {
          'menuContent': {
            templateUrl: 'templates/newTravel.html',
            controller: 'NewTravelCtrl'
          }
        }
      })
      .state('app.offerCar', {
        url: '/offerCar',
        views: {
          'menuContent': {
            templateUrl: 'templates/offerCar.html',
            controller: 'OfferCarCtrl'
          }
        }
      })
      .state('app.askForCar', {
        url: '/askForCar',
        views: {
          'menuContent': {
            templateUrl: 'templates/askForCar.html',
            controller: 'AskForCarCtrl'
          }
        }
      })
      .state('app.askForPackage', {
        url: '/askForPackage',
        views: {
          'menuContent': {
            templateUrl: 'templates/askForPackage.html',
            controller: 'AskForPackageCtrl'
          }
        }
      })
      .state('app.users', {
        url: '/users',
        views: {
          'menuContent': {
            templateUrl: 'templates/users.html',
            controller: 'UsersCtrl'
          }
        }
      })
      .state('app.user', {
        url: '/users/:userid',
        views: {
          'menuContent': {
            templateUrl: 'templates/user.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('app.userTravels', {
        url: '/users/userTravels/:userid',
        views: {
          'menuContent': {
            templateUrl: 'templates/userTravels.html',
            controller: 'UserTravelsCtrl'
          }
        }
      })
      .state('app.userLikes', {
        url: '/users/userLikes/:userid',
        views: {
          'menuContent': {
            templateUrl: 'templates/userLikes.html',
            controller: 'UserLikesCtrl'
          }
        }
      })
      .state('app.editUser', {
        url: '/editUser',
        views: {
          'menuContent': {
            templateUrl: 'templates/editUser.html',
            controller: 'EditUserCtrl'
          }
        }
      })
      .state('app.notifications', {
        url: '/notifications',
        views: {
          'menuContent': {
            templateUrl: 'templates/notifications.html',
            controller: 'NotificationsCtrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'templates/help.html',
            controller: 'HelpCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    if ((localStorage.getItem("cim_app_token")) && (JSON.parse(localStorage.getItem("cim_app_userdata")) != "null") && (JSON.parse(localStorage.getItem("cim_app_userdata")) != null)) {
      if ((window.location.hash == "#/app/login") || (window.location.hash == "#/app/signup")) {
        window.location = '#/app/main';
      }
      $urlRouterProvider.otherwise('/app/main');
    } else {
      if ((window.location != "#/app/login") || (window.location != "#/app/signup")) {
        console.log("removing data, and going to login");
        localStorage.removeItem("cim_app_token");
        localStorage.removeItem("cim_app_userdata");
        window.location = "#/app/login";
        $urlRouterProvider.otherwise('/app/login');
      }
    }
  })



  /* translator */
  .config(['$translateProvider', function($translateProvider) {

    /* get lang from the file translations.js */
    for (lang in translations) {
      $translateProvider.translations(lang, translations[lang]);
    }

    if (window.localStorage.getItem('lang')) {
      $translateProvider.preferredLanguage(window.localStorage.getItem('lang'));
    } else {
      $translateProvider.preferredLanguage('english');
    };

    $translateProvider.useSanitizeValueStrategy('escape');

  }])
  .factory('httpInterceptor', function httpInterceptor($q, $window, $location) {
    return {
      request: function(config) {
        return config;
      },
      requestError: function(config) {
        return config;
      },
      response: function(res) {
        return res;
      },
      responseError: function(res) {
        return res;
      }
    }
  })
  .factory('api', function($http) {
    return {
      init: function() {
        $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("cim_app_token");
        $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("cim_app_token");
      }
    };
  })
  .run(function(api) {
    api.init();
  });
