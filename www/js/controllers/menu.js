angular.module('app.controllers')
  .controller('menuCtrl', ['$scope', '$stateParams', '$state', 'UserSession',
    function ($scope, $stateParams, $state, UserSession) {
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

      


    }]);