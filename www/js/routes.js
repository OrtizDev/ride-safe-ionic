angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('menu', {
        url: '/left-menu',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('menu.home', {
        url: '/home',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('menu.myRoutes', {
        url: '/my-routes',
        views: {
          'side-menu21': {
            templateUrl: 'templates/myRoutes.html',
            controller: 'myRoutesCtrl'
          }
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('userRegister', {
        url: '/user-register',
        templateUrl: 'templates/userRegister.html',
        controller: 'userRegisterCtrl'
      })

      .state('motoRegister', {
        url: '/moto-register',
        templateUrl: 'templates/motoRegister.html',
        controller: 'motoRegisterCtrl'
      })

      .state('thanks', {
        url: '/thanks',
        templateUrl: 'templates/thanks.html',
        controller: 'thanksCtrl'
      })

      .state('menu.discover', {
        url: '/discover',
        views: {
          'side-menu21': {
            templateUrl: 'templates/discover.html',
            controller: 'discoverCtrl'
          }
        }
      })

      // Caravana routes

      .state('menu.caravana', {
        url: '/caravana',
        views: {
          'side-menu21': {
            templateUrl: 'templates/caravana/caravana.html',
            controller: 'caravanaCtrl'
          }
        }
      })

      .state('menu.caravanaDestination', {
        url: '/caravana/destination',
        views: {
          'side-menu21': {
            templateUrl: 'templates/caravana/destination.html',
          }
        }
      })

      .state('menu.caravanaDiscoverRoute', {
        url: '/caravana/discover',
        views: {
          'side-menu21': {
            templateUrl: 'templates/caravana/discoverRoute.html',
            controller: 'discoverRouteCaravanaCtrl'
          }
        }
      })

      .state('menu.caravanaCreateRoute', {
        url: '/caravana/createRoute',
        views: {
          'side-menu21': {
            templateUrl: 'templates/caravana/createRoute.html',
            controller: 'caravanaCreateRouteCtrl'
          }
        }
      })

      .state('menu.caravanaReviewRoute', {
        url: '/caravana/review-route',
        views: {
          'side-menu21': {
            templateUrl: 'templates/caravana/reviewRoute.html',
            controller: 'CaravanaReviewRouteCtrl'
          }
        }
      })

      .state('menu.caravanaInvitations', {
        url: '/caravana/invitations',
        views: {
          'side-menu21': {
            templateUrl: 'templates/caravana/invitations.html',
            controller: 'CaravanaInvitations'
          }
        }
      })

      // End of caravana's routes
      // -----------------------------------------------------------

      .state('menu.sp2', {
        url: '/s2p',
        views: {
          'side-menu21': {
            templateUrl: 'templates/sp2.html',
            controller: 'sp2Ctrl'
          }
        }
      })

      .state('menu.userManual', {
        url: '/user-manual',
        views: {
          'side-menu21': {
            templateUrl: 'templates/userManual.html',
            controller: 'userManualCtrl'
          }
        }
      })

      .state('config', {
        url: '/configuration',
        templateUrl: 'templates/config.html',
        controller: 'configCtrl'
      })

      .state('rightMenu', {
        url: '/right-menu',
        templateUrl: 'templates/rightMenu.html',
        controller: 'rightMenuCtrl'
      })

      .state('traficAlert', {
        url: '/trafic-alert',
        templateUrl: 'templates/traficAlert.html',
        controller: 'traficAlertCtrl'
      })

      .state('policeAlert', {
        url: '/police-alert',
        templateUrl: 'templates/policeAlert.html',
        controller: 'policeAlertCtrl'
      })

      .state('accidentAlert', {
        url: '/accident-alert',
        templateUrl: 'templates/accidentAlert.html',
        controller: 'accidentAlertCtrl'
      })

      .state('dangerAlert', {
        url: '/danger-alert',
        templateUrl: 'templates/dangerAlert.html',
        controller: 'dangerAlertCtrl'
      })

      .state('weatherAlert', {
        url: '/weather-alert',
        templateUrl: 'templates/weatherAlert.html',
        controller: 'weatherAlertCtrl'
      })

      .state('closedAlert', {
        url: '/closed-alert',
        templateUrl: 'templates/closedAlert.html',
        controller: 'closedAlertCtrl'
      })

      .state('routeReview', {
        url: '/route-review',
        cache: false,
        templateUrl: 'templates/routeReview.html',
        controller: 'routeReviewCtrl'
      })

      .state('onRoute', {
        url: '/on-route',
        cache: false,
        templateUrl: 'templates/onRoute.html',
        controller: 'onRouteCtrl'
      })

      .state('routeDetails', {
        url: '/route-details',
        templateUrl: 'templates/routeDetails.html',
        controller: 'routeDetailsCtrl'
      })
      .state('ads', {
        cache: false,
        url: '/ads',
        templateUrl: 'templates/adwares.html',
        controller: 'adsCtrl'
      });

    $urlRouterProvider.otherwise('login');

  });
