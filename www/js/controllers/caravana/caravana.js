angular.module('app.controllers')
  .controller('caravanaCtrl', ['$scope', '$state',
    function ($scope, $state) {

      $.ajax({
        type: 'GET',
        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/amigos/activos',
        // dataType: 'json',
        success: function(users){
          $.each(users, function(index, user) {
            $scope.users.push({
              name: user.name,
              selected: false,
              id: user.id
            });

          });
        }
      });

      $scope.seleccionados = 0;

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