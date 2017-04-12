var $;
angular.module('app.controllers')
  .controller('caravanaCreateRouteCtrl', ['$scope', '$stateParams', '$log', '$rootScope', '$ionicHistory',
    function ($scope, $stateParams, $log, $rootScope, $ionicHistory) {

      $scope.disabled = true;
      $scope.positions = {
        lat: 0,
        lng: 0
      };

      $scope.type_poi = 0;


      let directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      let directionsService = new google.maps.DirectionsService();

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
        getRoute($scope.markerOrigin.coords.latitude + ',' + $scope.markerOrigin.coords.longitude, $scope.markerDestination.coords.latitude + ',' + $scope.markerDestination.coords.longitude, $scope.type_poi, function (wps) {
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

      $scope.$on('$ionicView.loaded', function () {
        $('#home-inputDestination').hide();
        if (window.cordova) {
        }
      });

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

              $scope.markerDestination = {
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
                  dragend: function (marker) {
                    $rootScope.destination.lat = marker.getPosition().lat();
                    $rootScope.destination.lng = marker.getPosition().lng();

                    var latlngd = new google.maps.LatLng($rootScope.destination.lat, $rootScope.destination.lng);

                    foo(latlngd, function (locationd) {
                      $('#inputDestination').val(locationd);
                      getDirections();
                    });
                    $scope.markerDestination.options = {
                      draggable: true,
                      labelAnchor: '100 0',
                      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                      labelClass: 'marker-labels'
                    };
                  }
                }
              };

              $scope.markerOrigin = {
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
                  dragend: function (marker) {
                    $rootScope.origin.lat = marker.getPosition().lat();
                    $rootScope.origin.lng = marker.getPosition().lng();

                    if ($('#home-inputDestination').is(':hidden')) {
                      var latlngd = new google.maps.LatLng(($rootScope.origin.lat), $rootScope.origin.lng);
                      $scope.markerDestination.coords.latitude = ($rootScope.origin.lat);
                      $scope.markerDestination.coords.longitude = $rootScope.origin.lng;
                    }

                    var latlng = new google.maps.LatLng($rootScope.origin.lat, $rootScope.origin.lng);

                    foo(latlng, function (location) {
                      $('#inputOrigin').val(location);
                      $('#home-inputDestination').show();

                      if ($('#inputDestination').val() === '') {
                      } else {
                        getDirections();
                      }
                    });
                    $scope.markerOrigin.options = {
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
          $scope.error = function (error) { console.log(error); };
          navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.error, $scope.options);
        }
      });

      $scope.enterPressed = function (e, callback) {
        if (e.keyCode === 13) {
          callback();
        }
        if ($('#inputOrigin').val() !== '' && $('#inputDestination').val() !== '') {
          $scope.disabled = false;
        } else {
          $scope.disabled = true;
        }
      };

      $scope.markerOriginChanged = function () {
        if ($('#inputOrigin').val() !== '') {
          getCoordinates($('#inputOrigin').val(), function (coord) {
            $scope.markerOrigin.coords.latitude = coord[0].geometry.location.lat();
            $scope.markerOrigin.coords.longitude = coord[0].geometry.location.lng();
            $rootScope.origin = {
              lat: coord[0].geometry.location.lat(),
              lng: coord[0].geometry.location.lng()
            };
            console.log($rootScope.origin);
            $scope.map.center = {
              latitude: coord[0].geometry.location.lat(),
              longitude: coord[0].geometry.location.lng()
            };

            if ($('#home-inputDestination').is(':hidden')) {
              $('#home-inputDestination').show();
              // var latlngd = new google.maps.LatLng((coord[0].geometry.location.lat() - 0.002971573), coord[0].geometry.location.lng());
              $scope.markerDestination.coords.latitude = (coord[0].geometry.location.lat() - 0.002971573);
              $scope.markerDestination.coords.longitude = coord[0].geometry.location.lng();
            }

            if ($('#inputDestination').val() != '') {
              getDirections();
            }
          });
        } else {
          console.log('vacio');
        }
      };

      $scope.markerDestinationChanged = function () {
        if ($('#inputDestination').val() !== '') {
          getCoordinates($('#inputDestination').val(), function (coord) {
            $scope.markerDestination.coords.latitude = coord[0].geometry.location.lat();
            $scope.markerDestination.coords.longitude = coord[0].geometry.location.lng();
            $rootScope.destination = {
              lat: coord[0].geometry.location.lat(),
              lng: coord[0].geometry.location.lng()
            };
            console.log($rootScope.destination);
            $scope.map.center = {
              latitude: coord[0].geometry.location.lat(),
              longitude: coord[0].geometry.location.lng()
            };
            getDirections();
          });
        } else {
          console.log('vacio');
        }
      };





      


      $scope.polylines = [];





      $scope.getIncident = function () {
        $scope.type_poi = 3;
        getRoute($scope.markerOrigin.coords.latitude + ',' + $scope.markerOrigin.coords.longitude, $scope.markerDestination.coords.latitude + ',' + $scope.markerDestination.coords.longitude, $scope.type_poi, function (wps) {
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

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

    }]);