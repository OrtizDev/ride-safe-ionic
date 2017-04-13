angular.module('app.controllers')
  .controller('loginCtrl', ['$scope', '$stateParams', '$state', 'UserSession',
    function ($scope, $stateParams, $state, UserSession) {
      if (UserSession.getData()) {
        $state.go('menu.home');
        return;
      }
      $scope.formData = {};
      $scope.login = function () {
        var email = $('#emailLogin').val().trim();
        var password = $('#passwordLogin').val();
        if (email == '') {
          alert('Por favor, ingresa tu correo');
        } else {
          var valid = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
          var validcor = new RegExp(valid);
          var matchArray = email.match(validcor);
          if (matchArray == null) {
            alert('Por favor, ingresa un correo valido');
          } else {
            if (password == '') {
              alert('Por favor, ingresa tu contraseña');
            } else {
              var parametros = {
                'email': email,
                'password': password
              };
              $.ajax({
                type: 'POST',
                url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/userlogin',
                data: parametros,
                dataType: 'json',
                success: function (data) {
                  if (data.error) {
                    alert(data.message);
                  } else if (!data.error) {
                    UserSession.setData(data.id, data.nombre);
                    $state.go('menu.home');
                  }
                },
                error: function (xhr, status, error) {
                  console.log(xhr.responseText);
                  alert('No se pudo iniciar sesión, inténtalo más tarde');
                }
              });
            }
          }
        }
      };

      $scope.pressEnter = function (e) {
        if (e.keyCode === 13) {
          $scope.login();
          $('input').blur();
        }
      };

      $scope.signUp = function () {
        $state.go('userRegister');
      };

    }]);