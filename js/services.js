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

.service('BlankService', [function(){

}]);
