angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('Address', [function(){
  return {
      getAddress: function (latlng, geocoder){
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                        var origin = results[0].formatted_address;
                        console.log(results[0].formatted_address); // details address
                        return origin;
                } else {
                        return 'Location not found';
                      }
                } else {
                      return 'Geocoder failed due to: ' + status;
                  }
              });
      }
  };
}])


.factory('UserSession', [function () {
  return {
    setData: function (id) {
      window.localStorage['user-id'] = id;
    },
    getData: function() {
      return window.localStorage['user-id'];
    }
  };
}])

.factory('S2R', [ function (){
    return {
        setEstateS2R: function (IC, DR, AR, LT, MC) {
            window.localStorage['S2R-IC'] = IC;
            window.localStorage['S2R-DR'] = DR;
            window.localStorage['S2R-AR'] = AR;
            window.localStorage['S2R-LT'] = LT;
            window.localStorage['S2R-MC'] = MC;
        },
        getEstateS2R_IC: function () {
            return window.localStorage['S2R-IC'];
        },
        getEstateS2R_DR: function () {
            return window.localStorage['S2R-DR'];
        },
        getEstateS2R_AR: function () {
            return window.localStorage['S2R-AR'];
        },
        getEstateS2R_LT: function () {
            return window.localStorage['S2R-LT'];
        },
        getEstateS2R_MC: function () {
            return window.localStorage['S2R-MC'];
        }
    };
}])

.factory('dataUserRegister', [ function() {
  return {
    user: {}
  };
}])

.service('BlankService', [function(){

}]);
