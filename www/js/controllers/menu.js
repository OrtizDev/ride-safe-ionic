angular.module('app.controllers')
  .controller('menuCtrl', ['$scope', '$stateParams', '$state', 'UserSession', '$cordovaGeolocation', '$rootScope', '$ionicPlatform',
    function ($scope, $stateParams, $state, UserSession, $cordovaGeolocation, $rootScope, $ionicPlatform) {
      if (!UserSession.getData()) {
        $state.go('login');
        return;
      }
      $scope.name = '';
      $scope.watcher = null;

      $scope.logout = function () {
        UserSession.clearUserData();
        $state.go('login');
      };

      $ionicPlatform.ready(function() {
        watchLocation();
      });

      $scope.$on('$ionicView.enter', function () {
        $scope.name = UserSession.getName();
      });

      $scope.$on('$ionicView.leave', function () {
        $scope.watcher.clearWatch();
      });

      function watchLocation() {
        var options = { timeout: 3000, enableHighAccuracy: false };
        $scope.watcher = $cordovaGeolocation.watchPosition(options);
        $scope.watcher.then(null, function (error) {
        }, function (position) {
          $rootScope.currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        });
      }
    }]);