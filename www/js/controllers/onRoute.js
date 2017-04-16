angular.module('app.controllers')
  .controller('onRouteCtrl', ['$scope', '$stateParams', '$ionicPopover', '$rootScope',
    function ($scope, $stateParams, $ionicPopover, $rootScope) {
      $scope.vmo = [];
      $scope.vmo.markers = [];
      $scope.polylineso = [];

      function drawMap() {
        $scope.map = {
          control: {},
          center: { latitude: $rootScope.origin.lat, longitude: $rootScope.origin.lng },
          zoom: 15,
          options: {
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            disableDefaultUI: true,
            scrollwheel: false
          }
        };

        $scope.markerOrigin = {
          id: 0,
          coords: {
            latitude: $rootScope.origin.lat,
            longitude: $rootScope.origin.lng
          },
          options: {
            draggable: false,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        };

        $scope.markerDestination = {
          id: 1,
          coords: {
            latitude: $rootScope.destination.lat,
            longitude: $rootScope.destination.lng
          },
          options: {
            draggable: false,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        };

        getRoute(function (wps) {
          var wp = [];
          for (var i = 0; i < wps.routes[0].geometry.coordinates.length; i++) {
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
      }

      $rootScope.$watch('currentPosition', function (newValue, oldValue) {
        if (newValue) {
          if ($scope.map === undefined) {
            drawMap(newValue);
          }
          $scope.markerPosition = {
            id: 100,
            coords: {
              latitude: newValue.latitude,
              longitude: newValue.longitude
            }
          };
        }
      });
      // Function to close the alerts menu if clicked anywhere in the view
      $(document).click(function (evt) {
        if (evt.target.id == 'nav-trigger') {
          return;
        }
        if ($('input[name="nav-trigger"]').is(':checked')) {
          $('input[name="nav-trigger"]').prop('checked', false);
        }
      });

      $('input[name="nav-trigger"]').click(function () {
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
      }).then(function (popover) {
        $scope.popover = popover;
      });


      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };
      $scope.closePopover = function () {
        $scope.popover.hide();
      };
      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.popover.remove();
      });

      function getRoute(fn) {
        var data = {};
        data.start = $rootScope.origin.lat + ',' + $rootScope.origin.lng;
        data.end = $rootScope.destination.lat + ',' + $rootScope.destination.lng;
        data.poi_in = [$scope.type_poi];
        data.weather = true;
        $.ajax({
          crossDomain: true,
          type: 'GET',
          url: 'https://api.sintrafico.com/route',
          data: data,
          headers: { 'X-Requested-With': 'f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc' },
          success: function (e) {
            fn(e);
          }
        });
      }

      $scope.getGas = function () {
        $scope.type_poi = 2;
        getRoute(function (wps) {
          $scope.vmo.markers = [];
          if (wps.routes[0].pois) {
            for (var i = 0; i < wps.routes[0].pois.gas_stations.length; i++) {
              var mark = {
                id: i,
                latitude: wps.routes[0].pois.gas_stations[i].geometry.coordinates[1],
                longitude: wps.routes[0].pois.gas_stations[i].geometry.coordinates[0],
                name: wps.routes[0].pois.gas_stations[i].description + '<br /	>' + wps.routes[0].pois.gas_stations[i].address + '<br /	>' + wps.routes[0].pois.gas_stations[i].status,
                show: false,
                icon: gasType(wps.routes[0].pois.gas_stations[i].status)
              };
              $scope.vmo.markers.push(mark);
            }
            $scope.$apply();
          }
        });
      };

      $scope.getIncident = function () {
        $scope.type_poi = 3;
        getRoute(function (wps) {
          $scope.vmo.markers = [];
          if (wps.routes[0].pois) {
            for (var i = 0; i < wps.routes[0].pois.incidents.length; i++) {
              var mark = {
                id: i,
                latitude: wps.routes[0].pois.incidents[i].geometry.coordinates[1],
                longitude: wps.routes[0].pois.incidents[i].geometry.coordinates[0],
                name: wps.routes[0].pois.incidents[i].description + '<br /	>' + wps.routes[0].pois.incidents[i].address,
                show: false,
                icon: './img/pines/accidente-grave.png'
              };
              $scope.vmo.markers.push(mark);
            }
            $scope.$apply();
          }
        });
      };

      $scope.getToll = function () {
        $scope.type_poi = 1;
        getRoute(function (wps) {
          console.log(wps);
          $scope.vmo.markers = [];
          if (wps.routes[0].pois.tolls) {
            for (var i = 0; i < wps.routes[0].pois.tolls.length; i++) {
              var cost = 'Costo: ';
              wps.routes[0].pois.tolls[i].rates[0][4] ? cost = cost + wps.routes[0].pois.tolls[i].rates[0][4] : cost = cost + '-';
              var mark = {
                id: i,
                latitude: wps.routes[0].pois.tolls[i].geometry.coordinates[1],
                longitude: wps.routes[0].pois.tolls[i].geometry.coordinates[0],
                name: wps.routes[0].pois.tolls[i].description + '<br /	>' + wps.routes[0].pois.tolls[i].address + '<br /	>' + 'Costo: ' + wps.routes[0].pois.tolls[i].rates[4],
                show: false,
                icon: './img/pines/caseta.png'
              };
              $scope.vmo.markers.push(mark);
            }
            $scope.$apply();
          }
        });
      };

      $scope.getWeather = function () {
        getRoute(function (wps) {
          $scope.vmo.markers = [];
          if (wps.routes[0].legs) {
            console.log(wps.routes[0].legs[0].steps);
            for (var i = 1; i < wps.routes[0].legs[0].steps.length; i++) {
              //console.log(wps.routes[0].legs[0].steps[i].weather.main.temp);
              if (wps.routes[0].legs[0].steps[i].weather) {
                var mark = {
                  id: i,
                  latitude: wps.routes[0].legs[0].steps[i].geometry.coordinates[0][1],
                  longitude: wps.routes[0].legs[0].steps[i].geometry.coordinates[0][0],
                  name: 'Temperatura: ' + (wps.routes[0].legs[0].steps[i].weather.main.temp - 273.15) + '°C' + '<br />' + 'Clima: ' + wps.routes[0].legs[0].steps[i].weather.weather[0].description,
                  show: false,
                  icon: './img/pines/soleado.png'
                };
                $scope.vmo.markers.push(mark);
              }
            }
            $scope.$apply();
          }
        });
      };

      function gasType(status) {
        if (status == 'Con anomalías' || status == 'Se negó a verificación') {
          url = './img/pines/gas-rojo.png';
        } else if (status == 'No verificada') {
          url = './img/pines/gas-naranja.png';
        } else {
          url = './img/pines/gas-verde.png';
        }
        return url;
      }

      $scope.back = function () {
        $state.go('menu.home');
      };



    }]);