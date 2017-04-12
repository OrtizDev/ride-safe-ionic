angular.module('app.controllers').
  controller('myRoutesCtrl', ['$scope', '$state', '$rootScope',
    function ($scope, $state, $rootScope) {

      $(".routes-list-item").click(function () {
        $(".routes-list-item").removeClass("active");
        $(this).addClass("active");
      });

      $scope.list = [];

      delete $rootScope.lat;
      delete $rootScope.latd;
      delete $rootScope.lon;
      delete $rootScope.lond;

      $.ajax({
        type: "GET",
        url: "http://startbluesoft.com/rideSafeApp/v1/index.php/routes",
        dataType: "json",
        success: function (data) {
          $.each(data, function (i, j) {
            var newItem = {};
            newItem.name = j.nombre;
            newItem.id = j.id_ruta;
            newItem.amount = j.gasto;
            newItem.speed = j.velocidad;
            newItem.time = j.tiempo_viaje;
            newItem.km = j.distancia;
            newItem.lon = j.altOrig;
            newItem.lond = j.altDes;
            newItem.lat = j.latOrig;
            newItem.latd = j.latDes;
            $scope.list.push(newItem);
            $scope.$apply();
            delete newItem;
          })
        },
        error: function (xhr, status, error) {
          console.log("Error getting my routes");
        }
      });

      $scope.showItemInfo = function (item) {
        $rootScope.lat = item.lat;
        $rootScope.latd = item.latd;
        $rootScope.lon = item.lon;
        $rootScope.lond = item.lond;
        $("#myRoutes-markdown10").html('<p style="color:#FFFFFF; text-align:center;">'
          + '  <strong>Detalles de viaje</strong>'
          + '</p>'
          + '<div style="text-align:left;">'
          + '  <img class="my-routes-imgs" src="img/my_routes_sample.jpg">'
          + '</div>'
          + '<div class="my-routes-text">'
          + '  <p>'
          + '    Tiempo total del viaje: ' + item.time + ''
          + '    <br>'
          + '    Km recorridos: ' + item.km + ' km'
          + '    <br>'
          + '    Gasto casetas: $' + item.amount + ''
          + '    <br>'
          + '    Velocidad promedio: ' + item.speed + ' km/hr'
          + '  </p>'
          + '</div>');
      }

      $scope.startRoute = function () {
        if (
          !$rootScope.lat ||
          !$rootScope.latd ||
          !$rootScope.lon ||
          !$rootScope.lond ||
          $rootScope.lat == 0 ||
          $rootScope.lon == 0 ||
          $rootScope.latd == 0 ||
          $rootScope.lond == 0) {
          alert("Debes seleccionar una ruta");
        } else {
          $("#myRoutes-markdown10").html('');
          $state.go('onRoute');
        }
      }

    }]);