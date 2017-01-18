angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('gracias', {
    url: '/thanks',
    templateUrl: 'templates/gracias.html',
    controller: 'graciasCtrl'
  })

  .state('page3', {
    url: '/splash',
    templateUrl: 'templates/page3.html',
    controller: 'page3Ctrl'
  })

  .state('page', {
    url: '/page5',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});