angular.module('app.controllers')
  .controller('CaravanaInvitations', ['$scope', '$stateParams', '$http', '$rootScope',
    function ($scope, $stateParams, $http, $rootScope) {

      var interval = null;
      function runChrono() {
        $scope.$apply(function () {
          if ($scope.chrono > 0) {
            $scope.chrono--;
            setTimeout(runChrono, 1000);
          }
        });
      }
      $scope.chrono = 10;
      // $scope.users = [
      //   { name: 'Carlos Barranco', status: false },
      //   { name: 'Arturo Caballero', status: true },
      //   { name: 'Arturo Caballero', status: false },
      // ];

      $scope.$on('$ionicView.loaded', function () {
        $scope.users = $rootScope.caravana;
        console.log($scope.users);
        setTimeout(runChrono, 1000);
        interval = setInterval(listenNotifications, 1000);
      });

      $scope.$on('$ionicView.leave', function () {
        clearInterval(interval);
      });

      function listenNotifications() {
        $http.get('http://startbluesoft.com/rideSafeApp/v1/index.php/notificaciones')
          .then(function (data) {
            var notificaciones = data.data.message;
            console.log(notificaciones);
            if (notificaciones) {
              notificaciones.forEach(function (notificacion) {
                var description = JSON.parse(notificacion.descripcion_notificacion);
                if (description.code === 2) {
                  console.log(notificacion);
                  $scope.users.forEach(function (user) {
                    if (user.id_usuario === notificacion.id_usuario) {
                      user.accepted = true;
                      deleteNotificacion(notificacion);
                    }
                  }, this);
                }
              }, this);
            }
          });

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
      }



    }]);