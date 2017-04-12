angular.module('app.controllers')
  .controller('onRouteCtrl', ['$scope', '$stateParams', '$ionicPopover', '$rootScope',
    function ($scope, $stateParams, $ionicPopover, $rootScope) {

      $scope.$on('$ionicView.enter', function () {
        $scope.mapo = {
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

        // if($rootScope.onCaravana) {
        //   setTimeout
        // }

        $scope.markero = {
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

        $scope.markerdo = {
          id: 0,
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

      $scope.vmo = [];

      $scope.vmo.markers = [];

      $scope.polylineso = [];


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


    }]);