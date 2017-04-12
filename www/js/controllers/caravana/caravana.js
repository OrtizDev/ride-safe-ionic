angular.module('app.controllers')
  .controller('caravanaCtrl', ['$scope', '$state',
    function ($scope, $state) {
      $scope.users = [
        { name: 'Carlos Barranco', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
        { name: 'Arturo Caballero', selected: false },
      ];

      $.ajax({
        type: 'GET',
        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/amigos/activos',
        // dataType: 'json',
        success: (users) => {
          console.log(users);
        }
      });

      $scope.seleccionados = 0;

      $scope.changedUser = function () {
        $scope.seleccionados = $scope.users.filter((user) => {
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