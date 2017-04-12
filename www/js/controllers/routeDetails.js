angular.module('app.controllers')
  .controller('routeDetailsCtrl', ['$scope', '$stateParams', '$ionicPopup',
    function ($scope, $stateParams, $ionicPopup) {

      $scope.saved = false;

      $scope.saveRoute = function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Guardar ruta',
          template: 'La ruta se ha guardado'
        });

        // Código para guardar la ruta

        alertPopup.then(function (res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };
    }]);