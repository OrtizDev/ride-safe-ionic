angular.module('app.controllers')
  .controller('caravanaCtrl', ['$scope', '$state', '$http',
    function ($scope, $state, $http) {
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
        $scope.seleccionados = $scope.users.filter(function(user) {
          return user.selected;
        }).length;
        if ($scope.seleccionados >= 20) {
          $scope.disabledUsers = true;
        } else {
          $scope.disabledUsers = false;
        }
      };


      $scope.sendInvitations = function () {
        $state.go('menu.caravanaDestination');
      };

    }]);