angular.module('app.services')
  .factory('SinTrafico', ['$rootScope',
    function ($rootScope) {
      function getRoute(fn, type_poi = 0) {
        var data = {};
        data.start = $rootScope.origin.lat + ',' + $rootScope.origin.lng;
        data.end = $rootScope.destination.lat + ',' + $rootScope.destination.lng;
        data.poi_in = [type_poi];
        data.weather = true;
        $.ajax({
          type: 'GET',
          url: 'https://api.sintrafico.com/route',
          data: data,
          headers: { 'X-Requested-With': 'f057f3a4c8b3fcb6584ee22046626c36afc8f3edc682aed5c7ca1d575953d1cc' },
          success: function (e) {
            $rootScope.$apply(function () {
              fn(e);
            });
          }
        });
      }

      return {
        getRoute: function(fn) {
          getRoute(fn);
        },
        getGas: function (fn) {
          var type_poi = 2;
          getRoute(fn, type_poi);
        },
        getIncident: function (fn) {
          var type_poi = 3;
          getRoute(fn, type_poi);
        },
        getToll: function(fn) {
          var type_poi = 1;
          getRoute(fn, type_poi);
        },
        getWeather: function(fn) {
          var type_poi = 0;
          getRoute(fn, type_poi);
        }
      };
    }]);