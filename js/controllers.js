angular.module('app.controllers', ['uiGmapgoogle-maps'])

.controller('homeCtrl', ['$scope', '$stateParams', '$log', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $log, $rootScope) {

  $scope.blurred = function() {
    if($("#origin").val() != ''){
      getCoordinates($("#origin").val(), function(coord){
        $scope.marker.coords.latitude = coord[0].geometry.location.lat();
        $scope.marker.coords.longitude = coord[0].geometry.location.lng();

        if($('#home-inputDestination').is(':hidden')){
          $('#home-inputDestination').show();
           var latlngd = new google.maps.LatLng((coord[0].geometry.location.lat() - 0.002971573), coord[0].geometry.location.lng());
           $scope.markerd.coords.latitude = (coord[0].geometry.location.lat() - 0.002971573);
           $scope.markerd.coords.longitude = coord[0].geometry.location.lng();
         }

         if($("#destination").val() != ''){
           getDirections();
         }
      });
    } else {
      console.log("vacio");
    }
  }

  $scope.blurredd = function() {
    if($("#destination").val() != ''){
      getCoordinates($("#destination").val(), function(coord){
        $scope.markerd.coords.latitude = coord[0].geometry.location.lat();
        $scope.markerd.coords.longitude = coord[0].geometry.location.lng();
        getDirections();
      });
    } else {
      console.log("vacio");
    }
  }

  $('#home-inputDestination').hide();
  $scope.type_poi = 0;
  $scope.map = {
    control: {},
    center: {latitude: 20.66163, longitude: -103.424501 },
    zoom: 15,
    options: {
           panControl: false,
           zoomControl: true,
           mapTypeControl: false,
           disableDefaultUI: true,
           scrollwheel: false
       }
  };

  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  var directionsService = new google.maps.DirectionsService();

  $scope.markerd = {
      id: 1,
      coords: {
          latitude: 0,
          longitude: 0
        },
      options: { draggable: true,
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"},
      events : {
       dragend: function (markerd, eventName, args) {
         $rootScope.latd = markerd.getPosition().lat();
         $rootScope.lond = markerd.getPosition().lng();

         var latlngd = new google.maps.LatLng($rootScope.latd,$rootScope.lond);

         foo(latlngd, function(locationd){
           $('#destination').val(locationd);
           getDirections();
         });
         $scope.markerd.options = {
           draggable: true,
           labelAnchor: "100 0",
           icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
           labelClass: "marker-labels"
         };
        }
      }
    };

  $scope.marker = {
     id: 0,
     coords: {
       latitude: 20.66163,
       longitude: -103.424501
     },
     options: { draggable: true,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
     events: {
       dragend: function (marker, marked, eventName, args) {
         $rootScope.lat = marker.getPosition().lat();
         $rootScope.lon = marker.getPosition().lng();

         if($('#home-inputDestination').is(':hidden')){
            var latlngd = new google.maps.LatLng(($rootScope.lat - 0.002971573), $rootScope.lon);
            $scope.markerd.coords.latitude = ($rootScope.lat - 0.002971573);
            $scope.markerd.coords.longitude = $rootScope.lon;
          }

         var latlng = new google.maps.LatLng($rootScope.lat,$rootScope.lon);

         foo(latlng, function(location){
            $('#origin').val(location);
            $('#home-inputDestination').show();

            if($("#destination").val() === ''){
            } else {
              getDirections();
            }
          });
         $scope.marker.options = {
           draggable: true,
           labelAnchor: "100 0",
           icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
           labelClass: "marker-labels"
         };
       }
     }
   };

  $scope.polylines = [];

 function foo(latlng, fn){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                      fn(results[0].formatted_address);
              } else {
                      fn('Location not found');
                    }
              } else {
                    fn('Geocoder failed due to: ' + status);
                }
            });
    }

 function getRoute(start, end, poi, fn){
    var data = {};
    data.start = start;
    data.end = end;
    data.key = 'f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc';
    data.poi_in = [poi];
    data.weather = true;
    $.ajax({
      crossDomain:true,
      type: "GET",
      url: "https://api.sintrafico.com/route",
      data: data,
      headers: { "X-Requested-With" : "f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc"},
      success:function(e) {
           fn (e);
      }
    });
 }

 function getDirections(){
   getRoute($scope.marker.coords.latitude +','+ $scope.marker.coords.longitude,$scope.markerd.coords.latitude +','+ $scope.markerd.coords.longitude, $scope.type_poi, function(wps){
     var wp = [];
     for(var i = 0; i < wps.routes[0].geometry.coordinates.length; i++){
       wp.push({
          latitude: wps.routes[0].geometry.coordinates[i][1],
          longitude: wps.routes[0].geometry.coordinates[i][0]
       });
     }
     $scope.polylines = [{
         id: 1,
         path: wp,
         stroke: {
           color: '#223D75',
           weight: 5
         },
         editable: true,
         draggable: true,
         geodesic: true,
         visible: true
     }];
     $scope.vm.markers = [];
     if(wps.routes[0].pois){
         $scope.getIncident();
     }
     $scope.$apply();
   });
 }

 function getCoordinates(address, fn){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { address :address}, function(results, status){
     if(status == google.maps.GeocoderStatus.OK){
       fn (results);
     } else {
       fn('Location not found');
       alert('Geocode was not successful for the following reason: ' + status);
     }
  });
 }

  $scope.getIncident = function () {
    $scope.type_poi = 3;
    getRoute($scope.marker.coords.latitude +','+ $scope.marker.coords.longitude,$scope.markerd.coords.latitude +','+ $scope.markerd.coords.longitude, $scope.type_poi, function(wps){
      $scope.vm.markers = [];
      if(wps.routes[0].pois){
        for(var i = 0; i < wps.routes[0].pois.incidents.length;i++){
            var mark = {
              id: i,
              latitude: wps.routes[0].pois.incidents[i].geometry.coordinates[1],
              longitude: wps.routes[0].pois.incidents[i].geometry.coordinates[0],
              name: wps.routes[0].pois.incidents[i].description + '<br /	>' +wps.routes[0].pois.incidents[i].address,
              show: false,
              icon: './img/pines/accidente-grave.png'
            };
          $scope.vm.markers.push(mark);
        }
        $scope.$apply();
      }
    });
  }

  $scope.vm = [];

  $scope.vm.markers = [];

}])

.controller('myRoutesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $(".routes-list-item").click(function () {
    $(".routes-list-item").removeClass("active");
    $(this).addClass("active");
  });

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', '$state', 'UserSession',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, UserSession  ) {

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

.controller('userRegisterCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'dataUserRegister',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $rootScope, dataUserRegister) {

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
  {gender : 'F', genderName: 'Femenino'},
  {gender : 'M', genderName: 'Masculino'}
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
  dataUserRegister.user.name = $("input[name=username]").val();
  dataUserRegister.user.appat = $("input[name=apat]").val();
  dataUserRegister.user.apmat = $("input[name=amat]").val();
  dataUserRegister.user.gender = $("select[name=gender_re]").val();
  dataUserRegister.user.cell = $("input[name=cellphone]").val();
  dataUserRegister.user.birth = $("input[name=bdate]").val();
  dataUserRegister.user.cellemer = $("input[name=telEmer]").val();
  dataUserRegister.user.city = $("select[name=city_re]").val();
  dataUserRegister.user.email = $("input[name=emailRe]").val();
  dataUserRegister.user.password = $("input[name=pass]").val();
  if(angular.equals($("input[name=pass]").val(), $("input[name=repass]").val())){
       $state.go('motoRegister');
     } else {
       alert("Las contraseñas no coinciden");
     }
 }

 $scope.login = function () {
   $state.go('login');
 }

 $( "input[name=bdate]" ).change(function() {
    var dateValue = $( this ).val();
    var splitDate = dateValue.split("-");
    $( "#dateHolder" ).text( splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0]);
  })
  .keyup();

}])

.controller('motoRegisterCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'dataUserRegister', 'UserSession', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state, dataUserRegister, UserSession) {

  $scope.return = function () {
    $state.go('userRegister');
  }

  $scope.ciudad = { checked : false };
  $scope.atv = { checked : false };
  $scope.touring = { checked : false };
  $scope.trabajo = { checked : false };
  $scope.circuitos = { checked : false };
  $scope.enduro = { checked : false };
  $scope.stunt = { checked : false };
  $scope.carretera = { checked : false };
  $scope.otro = { checked : false };


  $scope.register = function () {

 alert($scope.ciudad.checked);

  var dataMoto = {
    "brand" : "Volvo",
    "model" : "V",
    "year"  : "2015",
    "plate" : $("input[name=plate]").val()
  };
  var dataUser = {
    'name' : dataUserRegister.user.name,
    'apPat' : dataUserRegister.user.appat,
    'apmat' : dataUserRegister.user.apmat,
    'email' : dataUserRegister.user.email,
    'pass' : dataUserRegister.user.password,
    'birthday' : dataUserRegister.user.birth,
    'gender' : dataUserRegister.user.gender,
    'cellphone' : dataUserRegister.user.cell,
    'cellemergency' : dataUserRegister.user.cellemer,
    'admin' : 0,
    'ciudad' : $scope.ciudad.checked? 1 : 0,
    'touring' : $scope.touring.checked? 1 : 0,
    'circuitos' : $scope.circuitos.checked? 1 : 0,
    'stunt' : $scope.enduro.checked? 1 : 0,
    'atv' : $scope.atv.checked? 1 : 0,
    'trabajo' : $scope.trabajo.checked? 1 : 0,
    'enduro' : $scope.enduro.checked? 1 : 0,
    'carretera' : $scope.carretera.checked? 1 : 0,
    'otro' : $scope.otro.checked? $("#other").val() : ""
  };

  $.ajax({
    type: "POST",
    url: "http://startbluesoft.com/rideSafeApp/v1/index.php/registmoto",
    data: dataMoto,
    dataType: 'json',
    success: function (data) {
        if (data.error) {
            alert(data.message);
        } else if (!data.error) {
          $.ajax({
            type: "POST",
            url: "http://startbluesoft.com/rideSafeApp/v1/index.php/registuser",
            data: dataUser,
            dataType: 'json',
            success: function (data) {
                if(data.error) {
                 alert("Intentalo más tarde");
               } else if(!data.error){
                 var parametros = {
                     "email": dataUserRegister.user.email,
                     "password": dataUserRegister.user.password
                 };
                 $.ajax({
                     type: "POST",
                     url: "http://startbluesoft.com/rideSafeApp/v1/index.php/userlogin",
                     data: parametros,
                     dataType: "json",
                     success: function (data) {
                         if (data.error) {
                             $state.go('login');
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

                 alert("Registro Exitoso");
               }
            },
             error: function (xhr, status, error) {
               console.log(xhr.responseText);
               alert("Intentalo más tarde");
             }
          });
        }
     },
     error: function (xhr, status, error) {
         console.log(xhr.responseText);
         alert("Intentalo más tarde");
     }
});

}



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

.controller('sp2Ctrl', ['$scope', '$stateParams', 'S2R', '$state', '$ionicModal',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, S2R, $state, $ionicModal) {

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

  // Modal controller
  $ionicModal.fromTemplateUrl('test-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
    $('#sp2_content').addClass("blur-efect");
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    $('#sp2_content').removeClass("blur-efect");
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

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

.controller('traficAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Alert) {

  $scope.type_alert = 0;

      $scope.saveAlert = function(){
        if($scope.type_alert != 0){
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position){
                $scope.$apply(function(){
                 Alert.setAlert($scope.type_alert,"1",position.coords.latitude, position.coords.longitude,"0",1, function(error){
                      if(!error){
                        alert("Alerta exitosa");
                        setTimeout(function() {
                          $state.go('menu.home');
                        }, 1000);
                      } else{
                        alert("Intentalo más tarde");
                      }
                  });
                });
              });
            }
        } else {
          alert("Seleccionar el tipo de alerta");
        }
      };


      $scope.typeTrafic = function(item){
        $scope.type_alert = item;
      };

      $(".alert-item").click(function () {
        $(".alert-item").removeClass("active");
        $(this).addClass("active");
      });


}])

.controller('policeAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Alert) {

  $scope.type_alert = 0;

    $scope.saveAlert = function(){
      if($scope.type_alert != 0){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.$apply(function(){
               Alert.setAlert($scope.type_alert,"1",position.coords.latitude, position.coords.longitude,"0",1, function(error){
                    if(!error){
                      alert("Alerta exitosa");
                      setTimeout(function() {
                        $state.go('menu.home');
                      }, 1000);
                    } else{
                      alert("Intentalo más tarde");
                    }
                });
              });
            });
          }
      } else {
        alert("Seleccionar el tipo de alerta");
      }
    };


    $scope.typeTrafic = function(item){
      $scope.type_alert = item;
    };

    $(".alert-item").click(function () {
      $(".alert-item").removeClass("active");
      $(this).addClass("active");
    });


}])

.controller('accidentAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Alert) {

  $scope.type_alert = 0;

    $scope.saveAlert = function(){
      if($scope.type_alert != 0){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.$apply(function(){
               Alert.setAlert($scope.type_alert,"1",position.coords.latitude, position.coords.longitude,"0",1, function(error){
                    if(!error){
                      alert("Alerta exitosa");
                      setTimeout(function() {
                        $state.go('menu.home');
                      }, 1000);
                    } else{
                      alert("Intentalo más tarde");
                    }
                });
              });
            });
          }
      } else {
        alert("Seleccionar el tipo de alerta");
      }
    };


    $scope.typeTrafic = function(item){
      $scope.type_alert = item;
    };

    $(".alert-item").click(function () {
      $(".alert-item").removeClass("active");
      $(this).addClass("active");
    });

}])

.controller('dangerAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Alert) {

  $scope.type_alert = 0;

    $scope.saveAlert = function(){
      if($scope.type_alert != 0){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.$apply(function(){
               Alert.setAlert($scope.type_alert,"1",position.coords.latitude, position.coords.longitude,"0",1, function(error){
                    if(!error){
                      alert("Alerta exitosa");
                      setTimeout(function() {
                        $state.go('menu.home');
                      }, 1000);
                    } else{
                      alert("Intentalo más tarde");
                    }
                });
              });
            });
          }
      } else {
        alert("Seleccionar el tipo de alerta");
      }
    };

    $scope.typeTrafic = function(item){
      $scope.type_alert = item;
    };

    $scope.weather = function(){
      $state.go('weatherAlert');
    };

    $(".alert-item").click(function () {
      $(".alert-item").removeClass("active");
      $(this).addClass("active");
    });

}])

.controller('weatherAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Alert) {

    $(".alert-item").click(function () {
      $(".alert-item").removeClass("active");
      $(this).addClass("active");
    });

    $scope.type_alert = 0;

       $scope.saveAlert = function(){
         if($scope.type_alert != 0){
           if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function(position){
                 $scope.$apply(function(){
                  Alert.setAlert($scope.type_alert,"1",position.coords.latitude, position.coords.longitude,"0",1, function(error){
                       if(!error){
                         alert("Alerta exitosa");
                         setTimeout(function() {
                           $state.go('menu.home');
                         }, 1000);
                       } else{
                         alert("Intentalo más tarde");
                       }
                   });
                 });
               });
             }
         } else {
           alert("Seleccionar el tipo de alerta");
         }
       };

       $scope.typeTrafic = function(item){
         $scope.type_alert = item;
       };


}])

.controller('closedAlertCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('routeReviewCtrl', ['$scope', '$stateParams', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state) {

  $scope.type_poi = 0;

  $scope.$on('$ionicView.enter', function () {

    $scope.mapr = {
      control: {},
      center: {latitude: $rootScope.lat, longitude: $rootScope.lon },
      zoom: 15,
      options: {
             panControl: false,
             zoomControl: true,
             mapTypeControl: false,
             disableDefaultUI: true,
             scrollwheel: false
         }
    };

    $scope.markerr = {
        id: 0,
        coords: {
          latitude: $rootScope.lat,
          longitude: $rootScope.lon
        },
        options: { draggable: false,
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
    };

    $scope.markerdr = {
          id: 0,
          coords: {
            latitude: $rootScope.latd,
            longitude: $rootScope.lond
          },
          options: { draggable: false,
                    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  }
    };

    getRoute( function(wps){
      console.log(wps);
      var wp = [];
      for(var i = 0; i < wps.routes[0].geometry.coordinates.length; i++){
        wp.push({
          latitude: wps.routes[0].geometry.coordinates[i][1],
          longitude: wps.routes[0].geometry.coordinates[i][0]
        });
      }
      $scope.polylinesr = [{
          id: 1,
          path: wp,
          stroke: {
            color: '#223D75',
            weight: 5
          },
          editable: true,
          draggable: true,
          geodesic: true,
          visible: true
      }];
      //$scope.vmr.markers = [];
      // if(wps.routes[0].pois){
      //   if($scope.type_poi == 1){
      //     $scope.getToll();
      //   }
      //   else if($scope.type_poi == 2){
      //     $scope.getGas();
      //   }
      //   else {
      //     $scope.getIncident();
      //   }
      // }
      $scope.$apply();
    });

  });

  function getRoute(fn){
      var data = {};
      data.start = $rootScope.lat+','+$rootScope.lon;
      data.end = $rootScope.latd+','+$rootScope.lond;
      data.poi_in = [$scope.type_poi];
      data.weather = true;
      $.ajax({
        crossDomain:true,
        type: "GET",
        url: "https://api.sintrafico.com/route",
        data: data,
        headers: { "X-Requested-With" : "f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc"},
        success:function(e) {
            fn (e);
          }
        });
  }

  $scope.getGas = function() {
    $scope.type_poi = 2;
    getRoute(function(wps) {
      $scope.vmr.markers = [];
      if(wps.routes[0].pois){
        for(var i = 0; i < wps.routes[0].pois.gas_stations.length;i++){
          var mark = {
            id: i,
            latitude: wps.routes[0].pois.gas_stations[i].geometry.coordinates[1],
            longitude: wps.routes[0].pois.gas_stations[i].geometry.coordinates[0],
            name: wps.routes[0].pois.gas_stations[i].description + '<br /	>' +wps.routes[0].pois.gas_stations[i].address + '<br /	>' +wps.routes[0].pois.gas_stations[i].status,
            show: false,
            icon: gasType(wps.routes[0].pois.gas_stations[i].status)
          };
          $scope.vmr.markers.push(mark);
        }
        $scope.$apply();
      }
    });
  }

  $scope.getIncident = function () {
    $scope.type_poi = 3;
    getRoute( function(wps){
      $scope.vmr.markers = [];
      if(wps.routes[0].pois){
        for(var i = 0; i < wps.routes[0].pois.incidents.length;i++){
            var mark = {
              id: i,
              latitude: wps.routes[0].pois.incidents[i].geometry.coordinates[1],
              longitude: wps.routes[0].pois.incidents[i].geometry.coordinates[0],
              name: wps.routes[0].pois.incidents[i].description + '<br /	>' +wps.routes[0].pois.incidents[i].address,
              show: false,
              icon: './img/pines/accidente-grave.png'
            };
          $scope.vmr.markers.push(mark);
        }
        $scope.$apply();
      }
    });
  }

  $scope.getToll = function () {
    $scope.type_poi = 1;
    getRoute(function(wps) {
      console.log(wps);
      $scope.vmr.markers = [];
      if(wps.routes[0].pois.tolls){
        for(var i = 0; i < wps.routes[0].pois.tolls.length;i++){
          var cost = "Costo: ";
          wps.routes[0].pois.tolls[i].rates[0][4] ? cost=cost+wps.routes[0].pois.tolls[i].rates[0][4] : cost = cost + "-";
              var mark = {
                id: i,
                latitude: wps.routes[0].pois.tolls[i].geometry.coordinates[1],
                longitude: wps.routes[0].pois.tolls[i].geometry.coordinates[0],
                name: wps.routes[0].pois.tolls[i].description + '<br /	>' +wps.routes[0].pois.tolls[i].address + '<br /	>' + "Costo: " + wps.routes[0].pois.tolls[i].rates[4],
                show: false,
                icon : './img/pines/caseta.png'
              };
              $scope.vmr.markers.push(mark);
          }
          $scope.$apply();
        }
      });
    }

  $scope.getWeather = function () {
    getRoute(function(wps) {
      $scope.vmr.markers = [];
      if(wps.routes[0].legs){
        console.log(wps.routes[0].legs[0].steps);
        for(var i = 1; i < wps.routes[0].legs[0].steps.length;i++){
          //console.log(wps.routes[0].legs[0].steps[i].weather.main.temp);
          if(wps.routes[0].legs[0].steps[i].weather){
            var mark = {
              id: i,
              latitude: wps.routes[0].legs[0].steps[i].geometry.coordinates[0][1] ,
              longitude: wps.routes[0].legs[0].steps[i].geometry.coordinates[0][0],
              name:"Temperatura: "+ (wps.routes[0].legs[0].steps[i].weather.main.temp - 273.15)+"°C"+'<br />'+"Clima: "+wps.routes[0].legs[0].steps[i].weather.weather[0].description,
              show: false,
              icon: './img/pines/soleado.png'
            };
            $scope.vmr.markers.push(mark);
          }
        }
        $scope.$apply();
      }
    });
  }

  $scope.vmr = [];

  $scope.vmr.markers = [];

  function gasType(status){
    if (status == 'Con anomalías' || status == 'Se negó a verificación') {
      	url = './img/pines/gas-rojo.png';
      } else if (status == 'No verificada') {
      		url = './img/pines/gas-naranja.png';
      } else {
      		url = './img/pines/gas-verde.png';
      }
      	return url;
  }

  $scope.back = function() {
      $state.go('menu.home');
  };

  $scope.polylinesr = [];


}])

.controller('onRouteCtrl', ['$scope', '$stateParams', '$ionicPopover', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopover, $rootScope) {

  $scope.$on('$ionicView.enter', function (){
    $scope.mapo = {
      control: {},
      center: {latitude: $rootScope.lat, longitude: $rootScope.lon },
      zoom: 15,
      options: {
             panControl: false,
             zoomControl: true,
             mapTypeControl: false,
             disableDefaultUI: true,
             scrollwheel: false
         }
    };

    $scope.markero = {
        id: 0,
        coords: {
          latitude: $rootScope.lat,
          longitude: $rootScope.lon
        },
        options: { draggable: false,
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
    };

    $scope.markerdo = {
          id: 0,
          coords: {
            latitude: $rootScope.latd,
            longitude: $rootScope.lond
          },
          options: { draggable: false,
                    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  }
    };

    getRoute( function(wps){
      var wp = [];
      for(var i = 0; i < wps.routes[0].geometry.coordinates.length; i++){
        wp.push({
          latitude: wps.routes[0].geometry.coordinates[i][1],
          longitude: wps.routes[0].geometry.coordinates[i][0]
        });
      }
      $scope.polylineso = [{
          id: 1,
          path: wp,
          stroke: {
            color: '#223D75',
            weight: 5
          },
          editable: true,
          draggable: true,
          geodesic: true,
          visible: true
      }];
      $scope.$apply();
    });

  });

  function getRoute(fn){
      var data = {};
      data.start = $rootScope.lat+','+$rootScope.lon;
      data.end = $rootScope.latd+','+$rootScope.lond;
      data.poi_in = [$scope.type_poi];
      data.weather = true;
      $.ajax({
        crossDomain:true,
        type: "GET",
        url: "https://api.sintrafico.com/route",
        data: data,
        headers: { "X-Requested-With" : "f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc"},
        success:function(e) {
            fn (e);
          }
        });
  }

  $scope.vmo = [];

  $scope.vmo.markers = [];

  $scope.polylineso = [];


  // Function to close the alerts menu if clicked anywhere in the view
    $(document).click(function(evt) {

      if(evt.target.id == "nav-trigger"){
        return;
      }

      if ( $('input[name="nav-trigger"]').is(':checked') ) {
        $('input[name="nav-trigger"]').prop("checked", false);
      }

    })

    $('input[name="nav-trigger"]').click(function() {
      event.stopPropagation();

    });

    // .fromTemplate() method
    var template = '<ion-popover-view style="top: 25% !important;"><ion-content> Hola! </ion-content></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
     scope: $scope
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('my-popover.html', {
     scope: $scope
    }).then(function(popover) {
     $scope.popover = popover;
    });


    $scope.openPopover = function($event) {
     $scope.popover.show($event);
    };
    $scope.closePopover = function() {
     $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
     $scope.popover.remove();
    });


    // Execute action on hidden popover
    $scope.$on('popover.hidden', function() {
     // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
     // Execute action
    });


}])

.controller('routeDetailsCtrl', ['$scope', '$stateParams',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
