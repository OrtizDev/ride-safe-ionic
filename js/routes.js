angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
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

  .state('menu', {
    url: '/left-menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
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

  .state('page', {
    url: '/page18',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/left-menu/my-routes')

  

});