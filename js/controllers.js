angular.module('app.controllers', ['uiGmapgoogle-maps', 'ngOpenFB', 'ngStorage'])

.controller('homeCtrl', ['$scope', '$stateParams', '$log', '$rootScope',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $log, $rootScope) {

  $scope.positions = {
    lat : 0,
    lng : 0
  }

  $scope.$on('$ionicView.loaded', function () {
    if (window.cordova) {
      cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
        if(enabled){
        } else {
          alert("El GPS esta " + (enabled ? "enabled" : "desactivado, por favor activalo"));
          cordova.plugins.diagnostic.switchToLocationSettings();
        }
    }, function(error) {
        alert("The following error occurred: " + error);
    });
   }
  });


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


  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  var directionsService = new google.maps.DirectionsService();



   $scope.$on('$ionicView.enter',  function () {
     if (navigator.geolocation) {
       $scope.options = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0
       };

       $scope.drawMap = function(position){
         $scope.$apply(function() {
           $scope.positions.lng = position.coords.longitude;
           $scope.positions.lat = position.coords.latitude;

           $scope.markerd = {
               id: 1,
               coords: {
                   latitude: $scope.positions.lat,
                   longitude: $scope.positions.lng
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
             }

           $scope.marker = {
              id: 0,
              coords: {
                latitude: $scope.positions.lat,
                longitude: $scope.positions.lng
              },
              options: { draggable: true,
                         icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
              events: {
                dragend: function (marker, marked, eventName, args) {
                  $rootScope.lat = marker.getPosition().lat();
                  $rootScope.lon = marker.getPosition().lng();

                  if($('#home-inputDestination').is(':hidden')){
                     var latlngd = new google.maps.LatLng(($rootScope.lat), $rootScope.lon);
                     $scope.markerd.coords.latitude = ($rootScope.lat);
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
            }


            $scope.map = {
              control: {},
              center: {latitude: $scope.positions.lat, longitude:$scope.positions.lng },
              zoom: 15,
              options: {
                     panControl: false,
                     zoomControl: false,
                     mapTypeControl: false,
                     disableDefaultUI: true,
                     scrollwheel: false
                 }
            }
          });
        }
       $scope.error = function(error){}
       navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.error, $scope.options);
     }
   });


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
  geocoder.geocode( { address :address }, function(results, status){
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

.controller('myRoutesCtrl', ['$scope', '$state', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $rootScope, $ionicLoading) {

  $(".routes-list-item").click(function () {
    $(".routes-list-item").removeClass("active");
    $(this).addClass("active");
  });

  $scope.list = [];

  delete $rootScope.lat;
  delete $rootScope.latd;
  delete $rootScope.lon;
  delete $rootScope.lond;


  $ionicLoading.show({
    content: 'Cargando',
    animation: 'fade-in',
    showBackdop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $.ajax({
      type: "GET",
      url: "http://startbluesoft.com/rideSafeApp/v1/index.php/routes",
      dataType: "json",
      success: function (data) {
        $.each(data, function(i, j){
          var newItem = {};
          newItem.name = j.nombre;
          newItem.id = j.id_ruta;
          newItem.amount = j.gasto;
          newItem.speed = j.velocidad;
          newItem.time = j.tiempo_viaje;
          newItem.km = j.distancia;
          newItem.lon = j.altOrig;
          newItem.lond = j.altDes;
          newItem.lat = j.latOrig;
          newItem.latd = j.latDes;
          $scope.list.push(newItem);
          delete newItem;
        })
        $ionicLoading.hide();
      },
      error: function (xhr, status, error) {
          console.log("Error getting my routes");
      }
  });

  $scope.showItemInfo = function(item){
    $rootScope.lat = item.lat;
    $rootScope.latd = item.latd;
    $rootScope.lon = item.lon;
    $rootScope.lond = item.lond;
    $("#myRoutes-markdown10").html('<p style="color:#FFFFFF; text-align:center;">'
        + '  <strong>Detalles de viaje</strong>'
        + '</p>'
        + '<div style="text-align:left;">'
        + '  <img class="my-routes-imgs" src="img/my_routes_sample.jpg">'
        + '</div>'
        + '<div class="my-routes-text">'
        + '  <p>'
        + '    Tiempo total del viaje: ' + item.time + ''
        + '    <br>'
        + '    Km recorridos: ' + item.km + ' km'
        + '    <br>'
        + '    Gasto casetas: $' + item.amount + ''
        + '    <br>'
        + '    Velocidad promedio: ' + item.speed + ' km/hr'
        + '  </p>'
        + '</div>');
  }

  $scope.startRoute = function(){
    if(
      !$rootScope.lat ||
      !$rootScope.latd ||
      !$rootScope.lon ||
      !$rootScope.lond ||
      $rootScope.lat == 0 ||
      $rootScope.lon == 0 ||
      $rootScope.latd == 0 ||
      $rootScope.lond == 0 ){
      alert("Debes seleccionar una ruta");
    }else{
      $("#myRoutes-markdown10").html('');
      $state.go('onRoute');
    }
  }


}])

.controller('menuCtrl', ['$scope', '$stateParams', '$state', 'UserSession',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, UserSession) {
  $scope.name = "";

  $scope.logout = function() {
    UserSession.clearUserData();
    $state.go('login');
  }

  $scope.$on('$ionicView.enter', function () {
      $scope.name = UserSession.getName();

  });


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
                      UserSession.setData(data.id, data.nombre);
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

  $.ajax({
      type: "GET",
      url: "http://startbluesoft.com/rideSafeApp/v1/index.php/brand",
      dataType: 'json',
      success: function (data) {
          if (data.error) {
              alert(data.message);
          } else if (!data.error) {
              estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function(i, item){
                toAppend += '<option value="'+item.id_marca_moto+'">'+item.nombre+'</option>';
              });
              $('#brands').append(toAppend);
              var date = new Date();
              var year = date.getFullYear();
              var y = '';
              for(i=1995; i <= year;i++){
                y += '<option value="'+i+'">'+i+'</option>';
              }
              $('#year').append(y);
          }
       },
       error: function (xhr, status, error) {
           console.log(xhr.responseText);
           alert("No se pudieron obtener las marcas");
       }
  });

  $scope.updateMod = function (model) {
   $('#models').empty();
   var parametros = {
       "brand" : model
   };

   $.ajax({
      type: "POST",
      url: "http://startbluesoft.com/rideSafeApp/v1/index.php/models",
      data: parametros,
      dataType: 'json',
      success: function (data) {
          if (data.error) {
              alert(data.message);
          } else if (!data.error) {
              estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function(i, item){
                toAppend += '<option value="'+item.id_modelo+'">'+item.nombre+'</option>';
              });
              $('#models').append(toAppend);
          }
       },
       error: function (xhr, status, error) {
           console.log(xhr.responseText);
           alert("No se pudieron obtener los modelos");
       }
   });
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
    if($("select[id=brands").val() != null){
      if($("select[id=models").val() != null){
        if($("select[id=year").val() != null){
            if($("input[id=plate]").val() != ""){

              var dataMoto = {
                "brand" : $("select[id=brands").val(),
                "model" : $("select[id=models").val(),
                "year"  : $("select[id=year").val(),
                "plate" : $("input[id=plate]").val()
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
                              $state.go('thanks');
                         }
                      },
                       error: function (xhr, status, error) {
                         console.log(xhr.responseText);
                         alert("Fallo Registro, intentalo más tarde");
                       }
                    });
                  }
               },
               error: function (xhr, status, error) {
                   console.log(xhr.responseText);
                   alert("Intentalo más tarde");
               }
             });
            }else {
              alert("Por favor, ingresa la matricula de tu moto");
            }
        } else {
          alert("Por favor, elige un año");
        }
      } else {
        alert("Por favor, elige un modelo");
      }
    }else  {
      alert("Por favor, elige una marca");
    }

  }

}])

.controller('thanksCtrl', ['$scope', '$stateParams', 'dataUserRegister', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, dataUserRegister, $state) {

    $scope.$on('$ionicView.enter', function () {
      setTimeout(function() {
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
                     UserSession.setData(data.id, data.nombre);
                     $state.go('menu.home');
                   }
             },
             error: function (xhr, status, error) {
                 console.log(xhr.responseText);
                 alert("No se pudo iniciar sesi�n, int�ntalo m�s tarde");
                 $state.go('login');
               }
        });
      }, 2500);
    });

}])

.controller('discoverCtrl', ['$scope', '$stateParams', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state) {

  $scope.routes = {};
  $scope.id_ruta = 0;

  $scope.speedw = [
    {speedway : 1, speedwayName: 'Si'},
    {speedway : 0, speedwayName: 'No'}
  ];

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

  $.ajax({
      type: "GET",
      url: "http://startbluesoft.com/rideSafeApp/v1/index.php/thematic",
      dataType: 'json',
      success: function (data) {
          if (data.error) {
              alert(data.message);
          } else if (!data.error) {
              estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function(i, item){
                toAppend += '<option value="'+item.id_tematica+'">'+item.nombre+'</option>';
              });
              $('#thematics').append(toAppend);
          }
       },
       error: function (xhr, status, error) {
           console.log(xhr.responseText);
           alert("No se pudieron obtener las tematicas");
       }
  });

  $.ajax({
     type: "POST",
     url: "http://startbluesoft.com/rideSafeApp/v1/index.php/filter",
     data: {query : "SELECT * FROM descubrir_ruta"},
     dataType: 'json',
     success: function (data) {
         if (data.error) {
             alert(data.message);
         } else if (!data.error) {
             estados = JSON.parse(data.message);
             var toAppend = '';
             $.each(estados, function(i, item){
               toAppend += '<option value="'+item.concentracion+'">'+item.concentracion+'</option>';
             });
             $('#concentra').append(toAppend);
         }
      },
      error: function (xhr, status, error) {
          console.log(xhr.responseText);
          alert("No se pudieron obtener las concentraciones");
      }
  });


  $scope.filter = function () {
    var query = "SELECT * FROM descubrir_ruta"

    if($("select[id=concentra]").val() != null || $("select[id=thematics]").val() != null || $("select[id=speedway]").val() != null || $("select[id=states]").val() != null )
      query += " WHERE";

    if($("select[id=thematics]").val() != null)
      query += " id_tematica = " + $("select[id=thematics").val();

    if($("select[id=concentra]").val() != null && $("select[id=thematics]").val() != null)
      query += " AND";

    if($("select[id=concentra]").val() != null)
      query += ' concentracion = "' + $("select[id=concentra").val()+'"';

    if( ($("select[id=concentra]").val() != null || $("select[id=thematics]").val() != null) && ($("select[id=speedway]").val() != null))
      query += " AND";

    if($("select[id=speedway]").val() != null)
      query += " pista_carrera = " + $("select[id=speedway").val().substring(7);

    if(($("select[id=concentra]").val() != null || $("select[id=thematics]").val() != null || $("select[id=speedway]").val() != null) && $("select[id=states]").val() != null )
      query += " AND";

    if($("select[id=states]").val() != null)
      query += " id_estado = " + $("select[id=states]").val();

      $.ajax({
         type: "POST",
         url: "http://startbluesoft.com/rideSafeApp/v1/index.php/filter",
         data: {query : query},
         dataType: 'json',
         success: function (data) {
             if (data.error) {
                 alert(data.message);
             } else if (!data.error) {
                console.log(data.message);
                $scope.id_ruta = 0;
                $scope.routes = JSON.parse(data.message);
                $scope.$apply();
                $(".results-list-item").click(function () {
                  $(".results-list-item").removeClass("active");
                  $(this).addClass("active");
                });
             }
          },
          error: function (xhr, status, error) {
              console.log(xhr.responseText);
              alert("No se pudieron obtener los destinos");
          }
      });
    console.log(query);
  }

  $scope.select_item = function(item){
      $scope.id_ruta = item;
  }

  $scope.road = function() {

      if($scope.id_ruta != 0){
        var query = "SELECT * FROM descubrir_ruta WHERE id_descubrir_ruta = " + $scope.id_ruta;
        $.ajax({
           type: "POST",
           url: "http://startbluesoft.com/rideSafeApp/v1/index.php/filter",
           data: {query : query},
           dataType: 'json',
           success: function (data) {
               if (data.error) {
                   alert(data.message);
               } else if (!data.error) {
                 var coord = JSON.parse(data.message);
                 $rootScope.latd = coord[0].altDes;
                 $rootScope.lond = coord[0].latDes;
                  if (navigator.geolocation) {
                     navigator.geolocation.getCurrentPosition(function(position){
                       $scope.$apply(function(){
                         $rootScope.lat = position.coords.latitude;
                         $rootScope.lon = position.coords.longitude;
                         $state.go('routeReview');
                       });
                     });
                   } else {
                     alert("Por favor, enciende tu GPS");
                   }
               }
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert("No se pudieron obtener las concentraciones");
            }
        });
      } else {
        alert("No haz seleccionado ningun ruta");
      }
  }


}])

.controller('sp2Ctrl', ['$scope', '$stateParams', 'S2R', '$state', '$ionicModal', 'ngFB', '$localStorage',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, S2R, $state, $ionicModal, ngFB, $localStorage) {

  if($localStorage.fbLoggedIn){
    $scope.textFbLink = "Vinculado con Facebook";
    $scope.fbButtonDisabled = true;
  }else{
    $scope.textFbLink = "Vincular con Facebook";
    $scope.fbButtonDisabled = false;
  }

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
  $ionicModal.fromTemplateUrl('modal-1.html', {
    id: '1',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $ionicModal.fromTemplateUrl('modal-2.html', {
    id: '2',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $ionicModal.fromTemplateUrl('modal-3.html', {
    id: '3',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal3 = modal;
  });

  $ionicModal.fromTemplateUrl('modal-4.html', {
    id: '4',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal4 = modal;
  });

  $ionicModal.fromTemplateUrl('modal-5.html', {
    id: '5',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal5 = modal;
  });

  $scope.openModal = function(index) {
    switch (index) {
      case 1:
        if($localStorage.fbImpact){
          $scope.facebookImpacts.status = true;
        }else{
          $scope.facebookImpacts.status = false;
        }
        if($localStorage.msgImpacts){
          $scope.msg = { Impacts: $localStorage.msgImpacts };
        }else{
          $scope.msg = { Impacts: "" };
        }
        if($localStorage.smsImpact){
          $scope.smsImpacts.status = true;
        }else{
          $scope.smsImpacts.status = false;
        }
        $scope.modal1.show();
        break;
      case 2:
        if($localStorage.fbDetour){
          $scope.facebookDetour.status = true;
        }else{
          $scope.facebookDetour.status = false;
        }
        if($localStorage.msgDetour){
          $scope.msg = { Detour: $localStorage.msgDetour };
        }else{
          $scope.msg = { Detour: "" };
        }
        if($localStorage.smsDetour){
          $scope.smsDetour.status = true;
        }else{
          $scope.smsDetour.status = false;
        }
        if($localStorage.kmDetour){
          $scope.kmDetour = $localStorage.kmDetour;
        }else{
          $scope.kmDetour = 1;
        }
        $scope.modal2.show();
        break;
      case 3:
        if($localStorage.thefts){
          $scope.theftsToggle.status = true;
        }else{
          $scope.theftsToggle.status = false;
        }
        if($localStorage.speed){
          $scope.speedToggle.status = true;
        }else{
          $scope.speedToggle.status = false;
        }
        if($localStorage.accident){
          $scope.accidentToggle.status = true;
        }else{
          $scope.accidentToggle.status = false;
        }
        if($localStorage.kmRisk){
          $scope.kmRisk = $localStorage.kmRisk;
        }else{
          $scope.kmRisk = 1;
        }
        $scope.modal3.show();
        break;
      case 4:
        if($localStorage.fbTracking){
          $scope.facebookTracking.status = true;
        }else{
          $scope.facebookTracking.status = false;
        }
        if($localStorage.msgTracking){
          $scope.msg = { Tracking: $localStorage.msgTracking };
        }else{
          $scope.msg = { Tracking: "" };
        }
        if($localStorage.smsTracking){
          $scope.smsTracking.status = true;
        }else{
          $scope.smsTracking.status = false;
        }
        if($localStorage.kmTracking){
          $scope.kmTracking = $localStorage.kmTracking;
        }else{
          $scope.kmTracking = 1;
        }
        $scope.modal4.show();
        break;
      case 5:
        $scope.modal5.show();
        break;
    }
    $('#sp2_content').addClass("blur-efect");
  };

  $scope.closeModal = function(index) {
    switch (index) {
      case 1:
        $scope.modal1.hide();
        break;
      case 2:
        $scope.modal2.hide();
        break;
      case 3:
        $scope.modal3.hide();
        break;
      case 4:
        $scope.modal4.hide();
        break;
      case 5:
        $scope.modal5.hide();
        break;
    }
    $('#sp2_content').removeClass("blur-efect");
  };


  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function(index) {
    switch (index) {
      case 1:
        $scope.modal1.remove();
        break;
      case 2:
        $scope.modal2.remove();
        break;
      case 3:
        $scope.modal3.remove();
        break;
      case 4:
        $scope.modal4.remove();
        break;
      case 5:
        $scope.modal5.remove();
        break;
    }
  });

  //First modal settings
  $scope.facebookImpacts = function(){
    if($scope.facebookImpacts.status){
      if($localStorage.fbLoggedIn){
        console.log("Enabled Facebook for Impacts");
        $localStorage.fbImpact = $scope.facebookImpacts.status;
      }else{
        $scope.facebookImpacts.status = false;
        alert("Debes vincular tu cuenta con Facebook");
        console.log("Cannot enable Facebook for Impacts, no permissions");
      }
    }else{
      delete $localStorage.fbImpact;
      console.log("Disabled Facebook for Impacts");
    }
  }

  $scope.smsImpacts = function(){
    if($scope.smsImpacts.status){
      $localStorage.smsImpact = $scope.smsImpacts.status;
      console.log("Enabled SMS for Impacts");
    }else{
      delete $localStorage.smsImpact;
      console.log("Disabled SMS for Impacts");
    }
  }

  //Second modal settings
  $scope.facebookDetour = function(){
    if($scope.facebookDetour.status){
      if($localStorage.fbLoggedIn){
        console.log("Enabled Facebook for Detour");
        $localStorage.fbDetour = $scope.facebookDetour.status;
      }else{
        $scope.facebookDetour.status = false;
        alert("Debes vincular tu cuenta con Facebook");
        console.log("Cannot enable Facebook for Detour, no permissions");
      }
    }else{
      delete $localStorage.fbDetour;
      console.log("Disabled Facebook for Detour");
    }
  }


  $scope.smsDetour = function(){
    if($scope.smsDetour.status){
      $localStorage.smsDetour = $scope.smsDetour.status;
      console.log("Enabled SMS for Detour");
    }else{
      delete $localStorage.smsDetour;
      console.log("Disabled SMS for Detour");
    }
  }

  $scope.updateKmSelectedDetour = function(kmDetour){
    $localStorage.kmDetour = kmDetour;
    console.log("Updated KM for Detour");
  }

  //Third modal settings
  $scope.accidentToggle = function(){
    if($scope.accidentToggle.status){
      $localStorage.accident = $scope.accidentToggle.status;
      console.log("Enabled accidents config");
    }else{
      delete $localStorage.accident;
      console.log("Disabled Accidents config");
    }
  }

  $scope.theftsToggle = function(){
    if($scope.theftsToggle.status){
      $localStorage.thefts = $scope.theftsToggle.status;
      console.log("Enabled thefts config");
    }else{
      delete $localStorage.thefts;
      console.log("Disabled thefts config");
    }
  }

  $scope.speedToggle = function(){
    if($scope.speedToggle.status){
      $localStorage.speed = $scope.speedToggle.status;
      console.log("Enabled speed config");
    }else{
      delete $localStorage.speed;
      console.log("Disabled speed config");
    }
  }

  $scope.updateKmSelectedRisk = function(kmRisk){
    $localStorage.kmRisk = kmRisk;
    console.log("Updated KM for Risk");
  }

  //Fourth modal settings
  $scope.facebookTracking = function(){
    if($scope.facebookTracking.status){
      if($localStorage.fbLoggedIn){
        console.log("Enabled Facebook for Tracking");
        $localStorage.fbTracking = $scope.facebookTracking.status;
      }else{
        $scope.facebookTracking.status = false;
        alert("Debes vincular tu cuenta con Facebook");
        console.log("Cannot enable Facebook for Tracking, no permissions");
      }
    }else{
      delete $localStorage.fbTracking;
      console.log("Disabled Facebook for Tracking");
    }
  }

  $scope.smsTracking = function(){
    if($scope.smsTracking.status){
      $localStorage.smsTracking = $scope.smsTracking.status;
      console.log("Enabled SMS for Tracking");
    }else{
      delete $localStorage.smsTracking;
      console.log("Disabled SMS for Tracking");
    }
  }

  $scope.updateKmSelectedTracking = function(kmTracking){
    $localStorage.kmTracking = kmTracking;
    console.log("Updated KM for Tracking");
  }

  //Store the message for impacts
  $scope.saveImpacts = function(msg){
    if(msg.Impacts == ""){
      delete $localStorage.msgImpacts;
    }else{
      console.log("Saving impacts message");
      $localStorage.msgImpacts = msg.Impacts;
    }
    $scope.modal1.hide();
    $('#sp2_content').removeClass("blur-efect");
  }

  //Store the message for detours
  $scope.saveDetour = function(msg){
    if(msg.Detour == ""){
      delete $localStorage.msgDetour;
    }else{
      console.log("Saving detour message");
      $localStorage.msgDetour = msg.Detour;
    }
    $scope.modal2.hide();
    $('#sp2_content').removeClass("blur-efect");
  }

  //Store the message for tracking
  $scope.saveTracking = function(msg){
    if(msg.Tracking == ""){
      delete $localStorage.msgTracking;
    }else{
      console.log("Saving tracking message");
      $localStorage.msgTracking = msg.Tracking;
    }
    $scope.modal4.hide();
    $('#sp2_content').removeClass("blur-efect");
  }

  //Close the third modal and "saves" (not actually) the configs
  $scope.saveRisks = function(){
    console.log("Saving risks configs");
    $scope.modal3.hide();
    $('#sp2_content').removeClass("blur-efect");
  }

  //Facebook access
  //If the button "Vincular con Facebook" is clicked, we execute the linking to Facebook
  $scope.facebookLink = function(){
    console.log("Facebook button clicked");
    //Checks the login status
    ngFB.login({scope: 'email'}).then(function (response) {
      if (response.status === 'connected') {
        console.log('Facebook login succeeded');
        $localStorage.fbLoggedIn = true;
        // $scope.closeLogin(); //Temporary disabled due an error which shows closeLogin() is not defined, I don't know if this works in the devices but for now, is disabled
      } else {
        $localStorage.fbLoggedIn = false;
        alert("Hubo un error al vincular la cuenta");
        console.log('Facebook login failed');
      }
    });
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

.controller('traficAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, Alert, $ionicHistory) {

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
                          $backView = $ionicHistory.backView();
	                        $backView.go();
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
function ($scope, $stateParams, $state, Alert, $ionicHistory) {

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
                        $backView = $ionicHistory.backView();
                        $backView.go();
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
function ($scope, $stateParams, $state, Alert, $ionicHistory) {

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
                        $backView = $ionicHistory.backView();
                        $backView.go();
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
function ($scope, $stateParams, $state, Alert, $ionicHistory) {

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
                        $backView = $ionicHistory.backView();
                        $backView.go();
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
function ($scope, $stateParams, $state, Alert, $ionicHistory) {

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
                           $backView = $ionicHistory.backView();
 	                         $backView.go();
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
    $ionicPopover.fromTemplateUrl('stops-route-confirm.html', {
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


}])

.controller('routeDetailsCtrl', ['$scope', '$stateParams', '$ionicPopover',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view style="top: 25% !important;"><ion-content> Hola! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
   scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('saved-route-alert.html', {
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

  //
  // // Execute action on hidden popover
  // $scope.$on('popover.hidden', function() {
  //  // Execute action
  // });
  // // Execute action on remove popover
  // $scope.$on('popover.removed', function() {
  //  // Execute action
  // });

}])
/**
* This part controls the advertisement, getting from the API the data
* and included the posibility to filtering.
*
* @copyright Startbluesoft 2017
* @author Cesar Zavala
* @since 10-April-2017
* @version 1.0
*/
.controller('adsCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$compile', '$rootScope',
  function($scope, $state, $stateParams, $ionicLoading, $compile, $rootScope){

    $ionicLoading.show({
      content: 'Cargando',
      animation: 'fade-in',
      showBackdop: true,
      maxWidth: 200,
      showDelay: 0
    });

    delete $rootScope.list;
    $rootScope.list = [];

    $.ajax({
        type: "GET",
        url: "http://startbluesoft.com/rideSafeApp/v1/index.php/anuncio",
        dataType: "json",
        success: function (data) {
          var html = "";
          var compiledHtml = "";
          $.each(data, function(i, j){
            var item = {};
            html = '<figure class="ad-item price establishment" data-establishment="'+j.id_estable+'" data-price="'+j.costo+'" ng-click="openAd('+j.id_anuncio+')">'
                  + ' <img src="https://dummyimage.com/160x400/000/fff" />'
                  + ' <figcaption>'+j.descripcion+'<br /><b>$'+j.costo+'</b></figcaption>'
                  + '</figure>';
            item.id = j.id_anuncio;
            item.desc = j.descripcion;
            item.costo = j.costo;
            $rootScope.list.push(item);
            compiledHtml += html;
          });
          var compiled = $compile(compiledHtml)($scope);
          angular.element(document.getElementById('columns')).append(compiled);
          $ionicLoading.hide();
        },
        error: function (xhr, status, error) {
            console.log("Error getting ads");
        }
    });

    $('#sorts').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      switch(sortByValue){
        case 'price':
          var sort = $(".price").sort(sortDivsPrice);
          //@TODO Read next to-do
          var compiled = $compile(sort)($scope);
          angular.element(document.getElementById('columns')).append(compiled);
        break;
        case 'establishment':
          var sort = $(".establishment").sort(sortDivsEstablishment);
          //@TODO Find a better way to handle this, because every time is clicked it detects x2 the click
          // for example the first time when an element is clicked counts as 2, then, counts as 4
          // then as 8, then as 16...to the infinity and beyond
          // this link could help: http://stackoverflow.com/questions/20192133/replace-the-html-of-an-element-with-the-content-of-an-external-template-in-a-dir
          var compiled = $compile(sort)($scope);
          angular.element(document.getElementById('columns')).append(compiled);
        break;
      }
    });
    function sortDivsPrice(a,b){
        return $(a).data("price") > $(b).data("price") ? 1 : -1;
    };

    function sortDivsEstablishment(a, b){
      return $(a).data("establishment") > $(b).data("establishment") ? 1 : -1;
    }

    $scope.openAd = function(item){
      $state.go('showAd');
    }

}])
