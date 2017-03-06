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

.service('BlankService', [function(){

}]);
