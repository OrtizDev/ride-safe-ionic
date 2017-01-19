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

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('manual', {
    url: '/manual',
    templateUrl: 'templates/manual.html',
    controller: 'manualCtrl'
  })

  .state('sR2Protection', {
    url: '/sr2',
    templateUrl: 'templates/sR2Protection.html',
    controller: 'sR2ProtectionCtrl'
  })

  .state('descubrirRuta', {
    url: '/discover',
    templateUrl: 'templates/descubrirRuta.html',
    controller: 'descubrirRutaCtrl'
  })

  .state('nuevaRuta', {
    url: '/newRoute',
    templateUrl: 'templates/nuevaRuta.html',
    controller: 'nuevaRutaCtrl'
  })

  .state('misRutas', {
    url: '/myRoutes',
    templateUrl: 'templates/misRutas.html',
    controller: 'misRutasCtrl'
  })

  .state('grabarRutas', {
    url: '/recordRoutes',
    templateUrl: 'templates/grabarRutas.html',
    controller: 'grabarRutasCtrl'
  })

  .state('preRutas', {
    url: '/preRoutes',
    templateUrl: 'templates/preRutas.html',
    controller: 'preRutasCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menuItems', {
    url: '/menuItems',
    templateUrl: 'templates/menuItems.html',
    controller: 'menuItemsCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});