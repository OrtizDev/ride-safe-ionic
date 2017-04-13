angular.module('app.controllers')
  .controller('homeCtrl', ['$scope', '$stateParams', '$log', '$rootScope', '$ionicPopup', '$ionicPlatform', '$state', '$cordovaGeolocation',
    function ($scope, $stateParams, $log, $rootScope, $ionicPopup, $ionicPlatform, $state, $cordovaGeolocation) {

      $scope.positions = {
        lat: 0,
        lng: 0
      };

      $scope.disabled = true;
      $scope.watcher = null;

      $scope.drawMap = function (position) {
        $scope.positions.lat = position.coords.latitude;
        $scope.positions.lng = position.coords.longitude;

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
            dragend: function (markerDestination, eventName, args) {
              $rootScope.destination = {
                lat: markerDestination.getPosition().lat(),
                lng: markerDestination.getPosition().lng()
              };

              var latlngd = new google.maps.LatLng($rootScope.destination.lat, $rootScope.destination.lng);

              foo(latlngd, function (locationd) {
                $('#destination').val(locationd);
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
              $rootScope.origin = {
                lat: marker.getPosition().lat(),
                lon: marker.getPosition().lng()
              };

              if ($('#home-inputDestination').is(':hidden')) {
                var latlngd = new google.maps.LatLng(($rootScope.origin.lat), $rootScope.origin.lng);
                $scope.markerDestination.coords.latitude = $rootScope.origin.lat;
                $scope.markerDestination.coords.longitude = $rootScope.origin.lng;
              }

              var latlng = new google.maps.LatLng($rootScope.origin.lat, $rootScope.origin.lng);

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
          center: {
            latitude: $scope.positions.lat,
            longitude: $scope.positions.lng
          },
          zoom: 15,
          refresh: true,
          options: {
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            disableDefaultUI: true,
            scrollwheel: false
          }
        };
      };

      // Confirmar participación en caravana
      function showConfirmPopup() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Caravana de Carlos',
          template: '¿Quieres participar en la caravana del usuario?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            $rootScope.onCaravana = true;
            $rootScope.origin = {
              lat: 20.1010608, lng: -98.75913109999999
            };
            $rootScope.destination = {
              lat: 19.4326077, lng: -99.13320799999997
            };
            $state.go('onRoute');
            // $.ajax({
            //   type: 'POST',
            //   url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/invitation/aceptar',
            //   success: function(data){
            //     console.log(data);
            //   }
            // });
          } else {
            // $.ajax({
            //   type: 'POST',
            //   url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/invitation/reject',
            //   success: function(data){
            //     console.log(data);
            //   }
            // });
          }
        });
      }

      function watchLocation() {
        var options = { maximumAge: 5000, timeout: 5000, enableHighAccuracy: false };
        $cordovaGeolocation.getCurrentPosition(options)
          .then(function (position) {
            console.log(position);
            $scope.drawMap(position);
            $scope.markerPosition = {
              id: 10,
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            };
          }, function (error) {
            console.log(error.code);
            console.log(error.message);
          });
        $scope.watcher = setInterval(function () {
          $cordovaGeolocation.getCurrentPosition(options)
            .then(function (position) {
              console.log(position);
              $scope.drawMap(position);
              $scope.markerPosition = {
                id: 10,
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
              };
            }, function (error) {
              console.log(error.code);
              console.log(error.message);
            });
        }, 5000);
      }

      $scope.$on('$ionicView.enter', function () {
        watchLocation();

      });

      $scope.$on('$ionicView.leave', function () {
        clearInterval($scope.watcher);
        $scope.watcher = null;
      });

      $ionicPlatform.ready(function () {
        // var watchOptions = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: false };
        // $scope.watcher = $cordovaGeolocation.watchPosition(watchOptions).then(null,
        //   function (error) {
        //     console.log(error);
        //   },
        //   function (position) {
        //     $scope.markerPosition = {
        //       id: 10,
        //       coords: {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude
        //       }
        //     };
        //   });
      });

      $scope.enterPressed = function (event, callback) {
        if (event.keyCode === 13) {
          callback();
        }
        if ($('#origin').val() !== '' && $('#destination').val() !== '') {
          $scope.disabled = false;
        } else {
          $scope.disabled = true;
        }
      };



      $scope.blurred = function () {
        if ($('#origin').val() != '') {
          getCoordinates($('#origin').val(), function (coord) {
            $scope.marker.coords.latitude = coord[0].geometry.location.lat();
            $scope.marker.coords.longitude = coord[0].geometry.location.lng();
            $rootScope.origin = {
              lat: coord[0].geometry.location.lat(),
              lng: coord[0].geometry.location.lng()
            };
            $scope.map.center = {
              latitude: coord[0].geometry.location.lat(),
              longitude: coord[0].geometry.location.lng()
            };

            if ($('#home-inputDestination').is(':hidden')) {
              $('#home-inputDestination').show();
              var latlngd = new google.maps.LatLng((coord[0].geometry.location.lat() - 0.002971573), coord[0].geometry.location.lng());
              $scope.markerDestination.coords.latitude = (coord[0].geometry.location.lat() - 0.002971573);
              $scope.markerDestination.coords.longitude = coord[0].geometry.location.lng();
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
            $scope.markerDestination.coords.latitude = coord[0].geometry.location.lat();
            $scope.markerDestination.coords.longitude = coord[0].geometry.location.lng();
            $rootScope.destination = {
              lat: coord[0].geometry.location.lat(),
              lng: coord[0].geometry.location.lng()
            };
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

      $('#home-inputDestination').hide();

      $scope.type_poi = 0;


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
        getRoute($scope.marker.coords.latitude + ',' + $scope.marker.coords.longitude, $scope.markerDestination.coords.latitude + ',' + $scope.markerDestination.coords.longitude, $scope.type_poi, function (wps) {
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
          // $scope.$apply();
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
        getRoute($scope.marker.coords.latitude + ',' + $scope.marker.coords.longitude, $scope.markerDestination.coords.latitude + ',' + $scope.markerDestination.coords.longitude, $scope.type_poi, function (wps) {
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
            // $scope.$apply();
          }
        });
      };

      $scope.vm = [];

      $scope.vm.markers = [];

      $scope.back = function () { }



    }]);