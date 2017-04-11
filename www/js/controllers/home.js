angular.module('app.controllers')
  .controller('homeCtrl', ['$scope', '$stateParams', '$log', '$rootScope',
    function ($scope, $stateParams, $log, $rootScope) {

      $scope.positions = {
        lat: 0,
        lng: 0
      };

      $scope.$on('$ionicView.loaded', function () {
        if (window.cordova) {
          cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
            if (enabled) {
            } else {
              alert('El GPS esta ' + (enabled ? 'enabled' : 'desactivado, por favor activalo'));
              cordova.plugins.diagnostic.switchToLocationSettings();
            }
          }, function (error) {
            alert('The following error occurred: ' + error);
          });
        }
      });


      $scope.blurred = function () {
        if ($('#origin').val() != '') {
          getCoordinates($('#origin').val(), function (coord) {
            $scope.marker.coords.latitude = coord[0].geometry.location.lat();
            $scope.marker.coords.longitude = coord[0].geometry.location.lng();

            if ($('#home-inputDestination').is(':hidden')) {
              $('#home-inputDestination').show();
              var latlngd = new google.maps.LatLng((coord[0].geometry.location.lat() - 0.002971573), coord[0].geometry.location.lng());
              $scope.markerd.coords.latitude = (coord[0].geometry.location.lat() - 0.002971573);
              $scope.markerd.coords.longitude = coord[0].geometry.location.lng();
            }

            if ($('#destination').val() != '') {
              getDirections();
            }
          });
        } else {
          console.log('vacio');
        }
      };

      $scope.blurredd = function () {
        if ($('#destination').val() != '') {
          getCoordinates($('#destination').val(), function (coord) {
            $scope.markerd.coords.latitude = coord[0].geometry.location.lat();
            $scope.markerd.coords.longitude = coord[0].geometry.location.lng();
            getDirections();
          });
        } else {
          console.log('vacio');
        }
      };

      $('#home-inputDestination').hide();

      $scope.type_poi = 0;

      var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      var directionsService = new google.maps.DirectionsService();

      $scope.$on('$ionicView.enter', function () {
        if (navigator.geolocation) {
          $scope.options = {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
          };

          $scope.drawMap = function (position) {
            $scope.$apply(function () {
              $scope.positions.lng = position.coords.longitude;
              $scope.positions.lat = position.coords.latitude;

              $scope.markerd = {
                id: 1,
                coords: {
                  latitude: $scope.positions.lat,
                  longitude: $scope.positions.lng
                },
                options: {
                  draggable: true,
                  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                },
                events: {
                  dragend: function (markerd, eventName, args) {
                    $rootScope.latd = markerd.getPosition().lat();
                    $rootScope.lond = markerd.getPosition().lng();

                    var latlngd = new google.maps.LatLng($rootScope.latd, $rootScope.lond);

                    foo(latlngd, function (locationd) {
                      $('#destination').val(locationd);
                      getDirections();
                    });
                    $scope.markerd.options = {
                      draggable: true,
                      labelAnchor: '100 0',
                      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                      labelClass: 'marker-labels'
                    };
                  }
                }
              };

              $scope.marker = {
                id: 0,
                coords: {
                  latitude: $scope.positions.lat,
                  longitude: $scope.positions.lng
                },
                options: {
                  draggable: true,
                  icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                },
                events: {
                  dragend: function (marker, marked, eventName, args) {
                    $rootScope.lat = marker.getPosition().lat();
                    $rootScope.lon = marker.getPosition().lng();

                    if ($('#home-inputDestination').is(':hidden')) {
                      var latlngd = new google.maps.LatLng(($rootScope.lat), $rootScope.lon);
                      $scope.markerd.coords.latitude = ($rootScope.lat);
                      $scope.markerd.coords.longitude = $rootScope.lon;
                    }

                    var latlng = new google.maps.LatLng($rootScope.lat, $rootScope.lon);

                    foo(latlng, function (location) {
                      $('#origin').val(location);
                      $('#home-inputDestination').show();

                      if ($('#destination').val() === '') {
                      } else {
                        getDirections();
                      }
                    });
                    $scope.marker.options = {
                      draggable: true,
                      labelAnchor: '100 0',
                      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                      labelClass: 'marker-labels'
                    };
                  }
                }
              };


              $scope.map = {
                control: {},
                center: { latitude: $scope.positions.lat, longitude: $scope.positions.lng },
                zoom: 15,
                options: {
                  panControl: false,
                  zoomControl: false,
                  mapTypeControl: false,
                  disableDefaultUI: true,
                  scrollwheel: false
                }
              };
            });
          };
          $scope.error = function (error) { };
          navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.error, $scope.options);
        }
      });


      $scope.polylines = [];

      function foo(latlng, fn) {
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

      function getRoute(start, end, poi, fn) {
        var data = {};
        data.start = start;
        data.end = end;
        data.key = 'f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc';
        data.poi_in = [poi];
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

      function getDirections() {
        getRoute($scope.marker.coords.latitude + ',' + $scope.marker.coords.longitude, $scope.markerd.coords.latitude + ',' + $scope.markerd.coords.longitude, $scope.type_poi, function (wps) {
          var wp = [];
          for (var i = 0; i < wps.routes[0].geometry.coordinates.length; i++) {
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
          if (wps.routes[0].pois) {
            $scope.getIncident();
          }
          $scope.$apply();
        });
      }

      function getCoordinates(address, fn) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            fn(results);
          } else {
            fn('Location not found');
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

      $scope.getIncident = function () {
        $scope.type_poi = 3;
        getRoute($scope.marker.coords.latitude + ',' + $scope.marker.coords.longitude, $scope.markerd.coords.latitude + ',' + $scope.markerd.coords.longitude, $scope.type_poi, function (wps) {
          $scope.vm.markers = [];
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
              $scope.vm.markers.push(mark);
            }
            $scope.$apply();
          }
        });
      };

      $scope.vm = [];

      $scope.vm.markers = [];

      $scope.back = function () { }

    }]);