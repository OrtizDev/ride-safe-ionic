angular.module('app.controllers')
  .controller('caravanaCtrl', ['$scope', '$state', '$http', 'UserSession', '$rootScope',
    function ($scope, $state, $http, UserSession, $rootScope) {
      var url = 'http://startbluesoft.com/rideSafeApp/v1/index.php/userActive';
      $scope.users = null;
      $scope.seleccionados = 0;

      $http.get(url).then(function (data) {
        $scope.users = data.data.message;
      }, function (error) {
        alert('No se pudieron obtener los usuarios');
        console.log(error);
      });

      $scope.changedUser = function () {
        $scope.seleccionados = $scope.users.filter(function (user) {
          return user.selected;
        }).length;
        if ($scope.seleccionados >= 20) {
          $scope.disabledUsers = true;
        } else {
          $scope.disabledUsers = false;
        }
      };

      $scope.sendInvitations = function () {
        $rootScope.caravana = [];
        $scope.users.forEach(function (user) {
          if (user.selected) {
            user.accepted = false;
            $rootScope.caravana.push(user);
            var request = {
              idnotificacion: new Date().getTime(),
              idUsuario: UserSession.getData(),
              idAmigo: user.id_usuario,
              descripcion: {
                code: 1,
                text: 'Invitacion a caravana'
              }
            };
            $http.post('http://startbluesoft.com/rideSafeApp/v1/index.php/notificaciones', request)
            .then(function (data) {
              console.log(data);
            });
          }
        }, this);
        $state.go('menu.caravanaDestination');
      };

    }]);