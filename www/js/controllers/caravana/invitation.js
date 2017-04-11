angular.module('app.controllers')
  .controller('CaravanaInvitations', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


      // $.ajax({
      //   type: 'GET',
      //   url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/caravana/accepted',
      //   dataType: 'json',
      //   success: function (data) {
      //     $scope.users = data;
      //   },
      //   error: function (xhr, status) {
      //   }
      // });
      function runChrono() {
        $scope.$apply(function () {
          if ($scope.chrono > 0) {
            $scope.chrono--;
            setTimeout(runChrono, 1000);
          }
        });
      }
      $scope.chrono = 30;
      $scope.users = [
        { name: 'Carlos Barranco', status: false },
        { name: 'Arturo Caballero', status: true },
        { name: 'Arturo Caballero', status: false },
      ];

      $scope.$on('$ionicView.loaded', function () {
        setTimeout(runChrono, 1000);
      });



    }]);