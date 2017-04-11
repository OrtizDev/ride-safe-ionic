angular.module('app.controllers')
  .controller('discoverRouteCaravanaCtrl', ['$scope', '$stateParams', '$rootScope', '$state',
    function ($scope, $stateParams, $rootScope, $state) {

      $scope.routes = {};
      $scope.id_ruta = 0;

      $scope.speedw = [
        { speedway: 1, speedwayName: 'Si' },
        { speedway: 0, speedwayName: 'No' }
      ];

      $.ajax({
        type: 'GET',
        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/state',
        dataType: 'json',
        success: function (data) {
          if (data.error) {
            alert(data.message);
          } else if (!data.error) {
            let estados = JSON.parse(data.message);
            var toAppend = '';
            $.each(estados, function (i, item) {
              toAppend += '<option value="' + item.id_estado + '">' + item.nombre + '</option>';
            });
            $('#states').append(toAppend);
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
          alert('No se pudieron obtener los estados');
        }
      });

      $.ajax({
        type: 'GET',
        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/thematic',
        dataType: 'json',
        success: function (data) {
          if (data.error) {
            alert(data.message);
          } else if (!data.error) {
            estados = JSON.parse(data.message);
            var toAppend = '';
            $.each(estados, function (i, item) {
              toAppend += '<option value="' + item.id_tematica + '">' + item.nombre + '</option>';
            });
            $('#thematics').append(toAppend);
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
          alert('No se pudieron obtener las tematicas');
        }
      });

      $.ajax({
        type: 'POST',
        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/filter',
        data: { query: 'SELECT * FROM descubrir_ruta' },
        dataType: 'json',
        success: function (data) {
          if (data.error) {
            alert(data.message);
          } else if (!data.error) {
            estados = JSON.parse(data.message);
            var toAppend = '';
            $.each(estados, function (i, item) {
              toAppend += '<option value="' + item.concentracion + '">' + item.concentracion + '</option>';
            });
            $('#concentra').append(toAppend);
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
          alert('No se pudieron obtener las concentraciones');
        }
      });


      $scope.filter = function () {
        var query = 'SELECT * FROM descubrir_ruta';

        if ($('select[id=concentra]').val() != null || $('select[id=thematics]').val() != null || $('select[id=speedway]').val() != null || $('select[id=states]').val() != null)
          query += ' WHERE';

        if ($('select[id=thematics]').val() != null)
          query += ' id_tematica = ' + $('select[id=thematics').val();

        if ($('select[id=concentra]').val() != null && $('select[id=thematics]').val() != null)
          query += ' AND';

        if ($('select[id=concentra]').val() != null)
          query += ' concentracion = "' + $('select[id=concentra').val() + '"';

        if (($('select[id=concentra]').val() != null || $('select[id=thematics]').val() != null) && ($('select[id=speedway]').val() != null))
          query += ' AND';

        if ($('select[id=speedway]').val() != null)
          query += ' pista_carrera = ' + $('select[id=speedway').val().substring(7);

        if (($('select[id=concentra]').val() != null || $('select[id=thematics]').val() != null || $('select[id=speedway]').val() != null) && $('select[id=states]').val() != null)
          query += ' AND';

        if ($('select[id=states]').val() != null)
          query += ' id_estado = ' + $('select[id=states]').val();

        $.ajax({
          type: 'POST',
          url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/filter',
          data: { query: query },
          dataType: 'json',
          success: function (data) {
            if (data.error) {
              alert(data.message);
            } else if (!data.error) {
              console.log(data.message);
              $scope.id_ruta = 0;
              $scope.routes = JSON.parse(data.message);
              $scope.$apply();
              $('.results-list-item').click(function () {
                $('.results-list-item').removeClass('active');
                $(this).addClass('active');
              });
            }
          },
          error: function (xhr, status, error) {
            console.log(xhr.responseText);
            alert('No se pudieron obtener los destinos');
          }
        });
        console.log(query);
      };

      $scope.select_item = function (item) {
        $scope.id_ruta = item;
      };

      $scope.road = function () {

        if ($scope.id_ruta != 0) {
          var query = 'SELECT * FROM descubrir_ruta WHERE id_descubrir_ruta = ' + $scope.id_ruta;
          $.ajax({
            type: 'POST',
            url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/filter',
            data: { query: query },
            dataType: 'json',
            success: function (data) {
              if (data.error) {
                alert(data.message);
              } else if (!data.error) {
                var coord = JSON.parse(data.message);
                $rootScope.destination = {
                  lat: coord[0].altDes,
                  lng: coord[0].latDes
                };
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.$apply(function () {
                      $rootScope.origin = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                      };
                      $state.go('routeReview');
                    });
                  });
                } else {
                  alert('Por favor, enciende tu GPS');
                }
              }
            },
            error: function (xhr, status, error) {
              console.log(xhr.responseText);
              alert('No se pudieron obtener las concentraciones');
            }
          });
        } else {
          alert('No haz seleccionado ningun ruta');
        }
      };


    }])