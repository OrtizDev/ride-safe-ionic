angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('myRoutesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', '$state', 'UserSession',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, , $state, UserSession  ) {

  $scope.formData = {};
  $scope.login = function () {

    var email = $("#emailLogin").val();
    var password = $("#passwordLogin").val();
    if(email == ''){
      alert("Por favor, ingresa tu correo");
    } else {
      var valid = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
      var validcor = new RegExp(valid);
      var matchArray = email.match(validcor);
      if (matchArray == null) {
          alert("Por favor, ingresa un correo valido");
      } else {
        if(password == ''){
          alert("Por favor, ingresa tu contraseña");
        } else {
          var parametros = {
              "email": email,
              "password": password
          };
          $.ajax({
              type: "POST",
              url: "http://startbluesoft.com/rideSafeApp/v1/index.php/userlogin",
              data: parametros,
              dataType: "json",
              success: function (data) {
                  if (data.error) {
                      alert(data.message);
                  } else if (!data.error) {
                      UserSession.setData(data.id);
                      $state.go('menu.home');
                  }
              },
              error: function (xhr, status, error) {
                  console.log(xhr.responseText);
                  alert("No se pudo iniciar sesi�n, int�ntalo m�s tarde");
              }
          });
        }
      }
    }
  }

  $scope.signUp = function () {
    $state.go('userRegister');
  }

}])

.controller('userRegisterCtrl', ['$scope', '$stateParams', '$state', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $rootScope) {

  $.ajax({
      type: "GET",
      url: "http://startbluesoft.com/rideSafeApp/v1/index.php/state",
      dataType: 'json',
      success: function (data) {
          if (data.error) {
              alert(data.message);
          } else if (!data.error) {
              estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function(i, item){
                toAppend += '<option value="'+item.id_estado+'">'+item.nombre+'</option>';
              });
              $('#states').append(toAppend);
          }
       },
       error: function (xhr, status, error) {
           console.log(xhr.responseText);
           alert("No se pudieron obtener los estados");
       }
  });
  $scope.typegender = [
  {gender : 1, genderName: 'Femenino'},
  {gender : 2, genderName: 'Masculino'}
  ];
  $scope.max= new Date();
  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  $scope.minpassword = 6;
  $scope.updateCi = function (state) {
  $('#city').empty();
  var parametros = {
      "city" : state
  };
  $.ajax({
      type: "POST",
      url: "http://startbluesoft.com/rideSafeApp/v1/index.php/cities",
      data: parametros,
      dataType: 'json',
      success: function (data) {
          if (data.error) {
              alert(data.message);
          } else if (!data.error) {
              estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function(i, item){
                toAppend += '<option value="'+item.id_municipio+'">'+item.nombre+'</option>';
              });
              $('#city').append(toAppend);
          }
       },
       error: function (xhr, status, error) {
           console.log(xhr.responseText);
           alert("No se pudieron obtener las ciudades");
       }
  });
}

$scope.motoRegis = function () {
   $state.go('motoRegister');
 }


}])

.controller('motoRegisterCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {


}])

.controller('thanksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('discoverCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('sp2Ctrl', ['$scope', '$stateParams', 'S2R', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, S2R, $state) {

  $scope.$on('$ionicView.enter', function () {
      var IC = S2R.getEstateS2R_IC();
      var DR = S2R.getEstateS2R_DR();
      var AR = S2R.getEstateS2R_AR();
      var LT = S2R.getEstateS2R_LT();
      var MC = S2R.getEstateS2R_MC();
      if (IC == "true") {
          $scope.pushNotiIC = { checked: true };
          console.log("IC " + IC);
      } else {
          $scope.pushNotiIC = { checked: false };
      }

      if (DR == "true") {
          $scope.pushNotiDR = { checked: true };
          console.log("DR " + DR);
      } else {
          $scope.pushNotiDR = { checked: false };
      }

      if (AR == "true") {
          $scope.pushNotiAR = { checked: true };
          console.log("AR" + AR);
      } else {
          $scope.pushNotiAR = { checked: false };
      }

      if (LT == "true") {
          $scope.pushNotiLT = { checked: true };
          console.log("LT" + LT);
      } else {
          $scope.pushNotiLT = { checked: false };
      }

      if (MC == "true") {
          $scope.pushNotiMC = { checked: true };
          console.log("MC" + MC);
      } else {
          $scope.pushNotiMC = { checked: false };
      }
  });


  $scope.saveNoti = function () {
        S2R.setEstateS2R($scope.pushNotiIC.checked,
                         $scope.pushNotiDR.checked,
                         $scope.pushNotiAR.checked,
                         $scope.pushNotiLT.checked,
                         $scope.pushNotiMC.checked);
    }

    $scope.backS2R = function () {
      $state.go('menu.home');
  }

}])

.controller('userManualCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('configCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])

.controller('rightMenuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
