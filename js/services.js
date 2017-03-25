angular.module('app.services', [])

.factory('BlankFactory', [function(){

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

.factory('Alert', [function () {
  return {
    setAlert: function (type_alert,trip,lat,lon,valid,state,fn) {
      var currentdate = new Date();
      var datetime = currentdate.getFullYear() + "-"
          + (currentdate.getMonth()+1)  + "-"
          + currentdate.getDate() + " "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();
        var res = "";
          dataAlert = {
            'type_alert' : type_alert,
            'id_trip'    : trip,
            'lat'        : lat,
            'lon'        : lon,
            'validation' : valid,
            'state'      : state,
            'date'       : datetime
          };

          $.ajax({
            type: "POST",
            url: "http://startbluesoft.com/rideSafeApp/v1/index.php/alert",
            data: dataAlert,
            dataType: 'JSON',
            success: function (data) {
              if(data.error){
                fn(true);
              }else {
                fn(false);
              }
            },
            error: function(xhr, status, error) {
              console.log(xhr);
              console.log(status);
              fn(true);
            }
          });

    },
    getAlert: function () {

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
