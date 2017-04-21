angular.module('app.controllers')
  .controller('menuCtrl', ['$scope', '$stateParams', '$state', 'UserSession', '$cordovaGeolocation', '$rootScope', '$ionicPlatform', '$http', '$ionicPopup',
    function ($scope, $stateParams, $state, UserSession, $cordovaGeolocation, $rootScope, $ionicPlatform, $http, $ionicPopup) {
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

      $ionicPlatform.ready(function () {
        watchLocation();
        // setInterval()
        listenNotifications();
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

      function listenNotifications() {
        $http.get('http://startbluesoft.com/rideSafeApp/v1/index.php/notificaciones')
          .then(function (data) {
            var notificaciones = data.data.message;
            console.log(notificaciones);
            if (notificaciones) {
              notificaciones.forEach(function (notificacion) {
                var desc = JSON.parse(notificacion.descripcion_notificacion);
                switch (desc.code) {
                  case 1:
                    var confirmPopup = $ionicPopup.confirm({
                      title: 'Caravana',
                      template: '¿Deseas participar en la caravana de ' + notificacion.nombre + '?'
                    });

                    confirmPopup.then(function (res) {
                      if (res) {
                        var request = {
                          idUsuario: UserSession.getData(),
                          idAmigo: notificacion.id_usuario,
                          descripcion: {
                            code: 2,
                            text: 'Aceptar invitacion a caravana'
                          }
                        };
                        $http.post('http://startbluesoft.com/rideSafeApp/v1/index.php/notificaciones', request)
                          .then(function (data) {
                            console.log(data);
                            deleteNotificacion(notificacion);
                          });
                      } else {
                        deleteNotificacion(notificacion);
                      }
                    });
                    break;
                  case 2:

                    break;
                }
                console.log(desc);
              }, this);
            }
          });
      }

      function deleteNotificacion(notificacion) {
        $http({
          method: 'DELETE',
          url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/notificaciones',
          data: {
            idNotificacion: notificacion.id_notificacion
          },
          headers: {
            'Content-type': 'application/json;charset=utf-8'
          }
        }).then(function (data) {
          console.log(data);
        });
      }
    }]);