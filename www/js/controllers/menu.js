angular.module('app.controllers')
  .controller('menuCtrl', ['$scope', '$stateParams', '$state', 'UserSession', '$ionicPlatform', '$cordovaGeolocation',
    function ($scope, $stateParams, $state, UserSession, $ionicPlatform, $cordovaGeolocation) {
      // if (!UserSession.getData()) {
      //   $state.go('login');
      //   return;
      // }
      $scope.name = '';

      $scope.logout = function () {
        UserSession.clearUserData();
        $state.go('login');
      };

      $scope.$on('$ionicView.enter', function () {
        $scope.name = UserSession.getName();

        // setTimeout(() => {
        //   showConfirmPopup();
        // }, 3000);  

      });

      $ionicPlatform.ready(function () {
        var watchOptions = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: false };
        $cordovaGeolocation.watchPosition(watchOptions).then(null,
          function (error) {
            console.log(error);
          },
          function (position) {
            $scope.markerPosition = {
              id: 10,
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            };
          });
      });

      


    }]);