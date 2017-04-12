angular.module('app.controllers', ['uiGmapgoogle-maps', 'ngOpenFB', 'ngStorage'])
  .controller('myRoutesCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      $('.routes-list-item').click(function () {
        $('.routes-list-item').removeClass('active');
        $(this).addClass('active');
      });

    }])

  .controller('userRegisterCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'dataUserRegister',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $rootScope, dataUserRegister) {

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

      $scope.typegender = [
        { gender: 'F', genderName: 'Femenino' },
        { gender: 'M', genderName: 'Masculino' }
      ];

      $scope.max = new Date();
      $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
      $scope.minpassword = 6;

      $scope.updateCi = function (state) {
        $('#city').empty();
        var parametros = {
          'city': state
        };

        $.ajax({
          type: 'POST',
          url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/cities',
          data: parametros,
          dataType: 'json',
          success: function (data) {
            if (data.error) {
              alert(data.message);
            } else if (!data.error) {
              let estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function (i, item) {
                toAppend += '<option value="' + item.id_municipio + '">' + item.nombre + '</option>';
              });
              $('#city').append(toAppend);
            }
          },
          error: function (xhr, status, error) {
            console.log(xhr.responseText);
            alert('No se pudieron obtener las ciudades');
          }
        });
      };

      $scope.motoRegis = function () {
        dataUserRegister.user.name = $('input[name=username]').val();
        dataUserRegister.user.appat = $('input[name=apat]').val();
        dataUserRegister.user.apmat = $('input[name=amat]').val();
        dataUserRegister.user.gender = $('select[name=gender_re]').val();
        dataUserRegister.user.cell = $('input[name=cellphone]').val();
        dataUserRegister.user.birth = $('input[name=bdate]').val();
        dataUserRegister.user.cellemer = $('input[name=telEmer]').val();
        dataUserRegister.user.city = $('select[name=city_re]').val();
        dataUserRegister.user.email = $('input[name=emailRe]').val();
        dataUserRegister.user.password = $('input[name=pass]').val();
        if (angular.equals($('input[name=pass]').val(), $('input[name=repass]').val())) {
          $state.go('motoRegister');
        } else {
          alert('Las contraseñas no coinciden');
        }
      };

      $scope.login = function () {
        $state.go('login');
      };

      $('input[name=bdate]').change(function () {
        var dateValue = $(this).val();
        var splitDate = dateValue.split('-');
        $('#dateHolder').text(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]);
      })
        .keyup();

    }])

  .controller('motoRegisterCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'dataUserRegister', 'UserSession', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $state, dataUserRegister, UserSession) {

      $scope.return = function () {
        $state.go('userRegister');
      };

      $.ajax({
        type: 'GET',
        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/brand',
        dataType: 'json',
        success: function (data) {
          if (data.error) {
            alert(data.message);
          } else if (!data.error) {
            let estados = JSON.parse(data.message);
            var toAppend = '';
            $.each(estados, function (i, item) {
              toAppend += '<option value="' + item.id_marca_moto + '">' + item.nombre + '</option>';
            });
            $('#brands').append(toAppend);
            var date = new Date();
            var year = date.getFullYear();
            var y = '';
            for (i = 1995; i <= year; i++) {
              y += '<option value="' + i + '">' + i + '</option>';
            }
            $('#year').append(y);
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
          alert('No se pudieron obtener las marcas');
        }
      });

      $scope.updateMod = function (model) {
        $('#models').empty();
        var parametros = {
          'brand': model
        };

        $.ajax({
          type: 'POST',
          url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/models',
          data: parametros,
          dataType: 'json',
          success: function (data) {
            if (data.error) {
              alert(data.message);
            } else if (!data.error) {
              let estados = JSON.parse(data.message);
              var toAppend = '';
              $.each(estados, function (i, item) {
                toAppend += '<option value="' + item.id_modelo + '">' + item.nombre + '</option>';
              });
              $('#models').append(toAppend);
            }
          },
          error: function (xhr, status, error) {
            console.log(xhr.responseText);
            alert('No se pudieron obtener los modelos');
          }
        });
      };

      $scope.ciudad = { checked: false };
      $scope.atv = { checked: false };
      $scope.touring = { checked: false };
      $scope.trabajo = { checked: false };
      $scope.circuitos = { checked: false };
      $scope.enduro = { checked: false };
      $scope.stunt = { checked: false };
      $scope.carretera = { checked: false };
      $scope.otro = { checked: false };

      $scope.register = function () {
        if ($('select[id=brands').val() != null) {
          if ($('select[id=models').val() != null) {
            if ($('select[id=year').val() != null) {
              if ($('input[id=plate]').val() != '') {

                var dataMoto = {
                  'brand': $('select[id=brands').val(),
                  'model': $('select[id=models').val(),
                  'year': $('select[id=year').val(),
                  'plate': $('input[id=plate]').val()
                };

                var dataUser = {
                  'name': dataUserRegister.user.name,
                  'apPat': dataUserRegister.user.appat,
                  'apmat': dataUserRegister.user.apmat,
                  'email': dataUserRegister.user.email,
                  'pass': dataUserRegister.user.password,
                  'birthday': dataUserRegister.user.birth,
                  'gender': dataUserRegister.user.gender,
                  'cellphone': dataUserRegister.user.cell,
                  'cellemergency': dataUserRegister.user.cellemer,
                  'admin': 0,
                  'ciudad': $scope.ciudad.checked ? 1 : 0,
                  'touring': $scope.touring.checked ? 1 : 0,
                  'circuitos': $scope.circuitos.checked ? 1 : 0,
                  'stunt': $scope.enduro.checked ? 1 : 0,
                  'atv': $scope.atv.checked ? 1 : 0,
                  'trabajo': $scope.trabajo.checked ? 1 : 0,
                  'enduro': $scope.enduro.checked ? 1 : 0,
                  'carretera': $scope.carretera.checked ? 1 : 0,
                  'otro': $scope.otro.checked ? $('#other').val() : ''
                };

                $.ajax({
                  type: 'POST',
                  url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/registmoto',
                  data: dataMoto,
                  dataType: 'json',
                  success: function (data) {
                    if (data.error) {
                      alert(data.message);
                    } else if (!data.error) {
                      $.ajax({
                        type: 'POST',
                        url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/registuser',
                        data: dataUser,
                        dataType: 'json',
                        success: function (data) {
                          if (data.error) {
                            alert('Intentalo más tarde');
                          } else if (!data.error) {
                            $state.go('thanks');
                          }
                        },
                        error: function (xhr, status, error) {
                          console.log(xhr.responseText);
                          alert('Fallo Registro, intentalo más tarde');
                        }
                      });
                    }
                  },
                  error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert('Intentalo más tarde');
                  }
                });
              } else {
                alert('Por favor, ingresa la matricula de tu moto');
              }
            } else {
              alert('Por favor, elige un año');
            }
          } else {
            alert('Por favor, elige un modelo');
          }
        } else {
          alert('Por favor, elige una marca');
        }

      };

    }])

  .controller('thanksCtrl', ['$scope', '$stateParams', 'dataUserRegister', '$state', 'UserSession',
    function ($scope, $stateParams, dataUserRegister, $state, UserSession) {

      $scope.$on('$ionicView.enter', function () {
        setTimeout(function () {
          var parametros = {
            'email': dataUserRegister.user.email,
            'password': dataUserRegister.user.password
          };
          $.ajax({
            type: 'POST',
            url: 'http://startbluesoft.com/rideSafeApp/v1/index.php/userlogin',
            data: parametros,
            dataType: 'json',
            success: function (data) {
              if (data.error) {
                $state.go('login');
              } else if (!data.error) {
                UserSession.setData(data.id, data.nombre);
                $state.go('menu.home');
              }
            },
            error: function (xhr, status, error) {
              console.log(xhr.responseText);
              alert('No se pudo iniciar sesi�n, int�ntalo m�s tarde');
              $state.go('login');
            }
          });
        }, 2500);
      });

    }])

  .controller('sp2Ctrl', ['$scope', '$stateParams', 'S2R', '$state', '$ionicModal', '$openFB', '$localStorage',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, S2R, $state, $ionicModal, $openFB, $localStorage) {

      if ($localStorage.fbLoggedIn) {
        $scope.textFbLink = 'Vinculado con Facebook';
        $scope.fbButtonDisabled = true;
      } else {
        $scope.textFbLink = 'Vincular con Facebook';
        $scope.fbButtonDisabled = false;
      }

      $scope.$on('$ionicView.enter', function () {
        var IC = S2R.getEstateS2R_IC();
        var DR = S2R.getEstateS2R_DR();
        var AR = S2R.getEstateS2R_AR();
        var LT = S2R.getEstateS2R_LT();
        var MC = S2R.getEstateS2R_MC();
        if (IC == 'true') {
          $scope.pushNotiIC = { checked: true };
          console.log('IC ' + IC);
        } else {
          $scope.pushNotiIC = { checked: false };
        }

        if (DR == 'true') {
          $scope.pushNotiDR = { checked: true };
          console.log('DR ' + DR);
        } else {
          $scope.pushNotiDR = { checked: false };
        }

        if (AR == 'true') {
          $scope.pushNotiAR = { checked: true };
          console.log('AR' + AR);
        } else {
          $scope.pushNotiAR = { checked: false };
        }

        if (LT == 'true') {
          $scope.pushNotiLT = { checked: true };
          console.log('LT' + LT);
        } else {
          $scope.pushNotiLT = { checked: false };
        }

        if (MC == 'true') {
          $scope.pushNotiMC = { checked: true };
          console.log('MC' + MC);
        } else {
          $scope.pushNotiMC = { checked: false };
        }
      });


      $scope.saveNoti = function () {
        S2R.setEstateS2R($scope.pushNotiIC.checked,
          $scope.pushNotiDR.checked,
          $scope.pushNotiAR.checked,
          $scope.pushNotiLT.checked,
          $scope.pushNotiMC.checked);
      };

      $scope.backS2R = function () {
        $state.go('menu.home');
      };

      // Modal controller
      $ionicModal.fromTemplateUrl('modal-1.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal1 = modal;
      });

      $ionicModal.fromTemplateUrl('modal-2.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal2 = modal;
      });

      $ionicModal.fromTemplateUrl('modal-3.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal3 = modal;
      });

      $ionicModal.fromTemplateUrl('modal-4.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal4 = modal;
      });

      $ionicModal.fromTemplateUrl('modal-5.html', {
        id: '5',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal5 = modal;
      });

      $scope.openModal = function (index) {
        switch (index) {
        case 1:
          if ($localStorage.fbImpact) {
            $scope.facebookImpacts.status = true;
          } else {
            $scope.facebookImpacts.status = false;
          }
          if ($localStorage.msgImpacts) {
            $scope.msg = { Impacts: $localStorage.msgImpacts };
          } else {
            $scope.msg = { Impacts: '' };
          }
          if ($localStorage.smsImpact) {
            $scope.smsImpacts.status = true;
          } else {
            $scope.smsImpacts.status = false;
          }
          $scope.modal1.show();
          break;
        case 2:
          if ($localStorage.fbDetour) {
            $scope.facebookDetour.status = true;
          } else {
            $scope.facebookDetour.status = false;
          }
          if ($localStorage.msgDetour) {
            $scope.msg = { Detour: $localStorage.msgDetour };
          } else {
            $scope.msg = { Detour: '' };
          }
          if ($localStorage.smsDetour) {
            $scope.smsDetour.status = true;
          } else {
            $scope.smsDetour.status = false;
          }
          if ($localStorage.kmDetour) {
            $scope.kmDetour = $localStorage.kmDetour;
          } else {
            $scope.kmDetour = 1;
          }
          $scope.modal2.show();
          break;
        case 3:
          if ($localStorage.thefts) {
            $scope.theftsToggle.status = true;
          } else {
            $scope.theftsToggle.status = false;
          }
          if ($localStorage.speed) {
            $scope.speedToggle.status = true;
          } else {
            $scope.speedToggle.status = false;
          }
          if ($localStorage.accident) {
            $scope.accidentToggle.status = true;
          } else {
            $scope.accidentToggle.status = false;
          }
          if ($localStorage.kmRisk) {
            $scope.kmRisk = $localStorage.kmRisk;
          } else {
            $scope.kmRisk = 1;
          }
          $scope.modal3.show();
          break;
        case 4:
          if ($localStorage.fbTracking) {
            $scope.facebookTracking.status = true;
          } else {
            $scope.facebookTracking.status = false;
          }
          if ($localStorage.msgTracking) {
            $scope.msg = { Tracking: $localStorage.msgTracking };
          } else {
            $scope.msg = { Tracking: '' };
          }
          if ($localStorage.smsTracking) {
            $scope.smsTracking.status = true;
          } else {
            $scope.smsTracking.status = false;
          }
          if ($localStorage.kmTracking) {
            $scope.kmTracking = $localStorage.kmTracking;
          } else {
            $scope.kmTracking = 1;
          }
          $scope.modal4.show();
          break;
        case 5:
          $scope.modal5.show();
          break;
        }
        $('#sp2_content').addClass('blur-efect');
      };

      $scope.closeModal = function (index) {
        switch (index) {
        case 1:
          $scope.modal1.hide();
          break;
        case 2:
          $scope.modal2.hide();
          break;
        case 3:
          $scope.modal3.hide();
          break;
        case 4:
          $scope.modal4.hide();
          break;
        case 5:
          $scope.modal5.hide();
          break;
        }
        $('#sp2_content').removeClass('blur-efect');
      };


      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function (index) {
        switch (index) {
        case 1:
          $scope.modal1.remove();
          break;
        case 2:
          $scope.modal2.remove();
          break;
        case 3:
          $scope.modal3.remove();
          break;
        case 4:
          $scope.modal4.remove();
          break;
        case 5:
          $scope.modal5.remove();
          break;
        }
      });

      //First modal settings
      $scope.facebookImpacts = function () {
        if ($scope.facebookImpacts.status) {
          if ($localStorage.fbLoggedIn) {
            console.log('Enabled Facebook for Impacts');
            $localStorage.fbImpact = $scope.facebookImpacts.status;
          } else {
            $scope.facebookImpacts.status = false;
            alert('Debes vincular tu cuenta con Facebook');
            console.log('Cannot enable Facebook for Impacts, no permissions');
          }
        } else {
          delete $localStorage.fbImpact;
          console.log('Disabled Facebook for Impacts');
        }
      };

      $scope.smsImpacts = function () {
        if ($scope.smsImpacts.status) {
          $localStorage.smsImpact = $scope.smsImpacts.status;
          console.log('Enabled SMS for Impacts');
        } else {
          delete $localStorage.smsImpact;
          console.log('Disabled SMS for Impacts');
        }
      };

      //Second modal settings
      $scope.facebookDetour = function () {
        if ($scope.facebookDetour.status) {
          if ($localStorage.fbLoggedIn) {
            console.log('Enabled Facebook for Detour');
            $localStorage.fbDetour = $scope.facebookDetour.status;
          } else {
            $scope.facebookDetour.status = false;
            alert('Debes vincular tu cuenta con Facebook');
            console.log('Cannot enable Facebook for Detour, no permissions');
          }
        } else {
          delete $localStorage.fbDetour;
          console.log('Disabled Facebook for Detour');
        }
      };


      $scope.smsDetour = function () {
        if ($scope.smsDetour.status) {
          $localStorage.smsDetour = $scope.smsDetour.status;
          console.log('Enabled SMS for Detour');
        } else {
          delete $localStorage.smsDetour;
          console.log('Disabled SMS for Detour');
        }
      };

      $scope.updateKmSelectedDetour = function (kmDetour) {
        $localStorage.kmDetour = kmDetour;
        console.log('Updated KM for Detour');
      };

      //Third modal settings
      $scope.accidentToggle = function () {
        if ($scope.accidentToggle.status) {
          $localStorage.accident = $scope.accidentToggle.status;
          console.log('Enabled accidents config');
        } else {
          delete $localStorage.accident;
          console.log('Disabled Accidents config');
        }
      };

      $scope.theftsToggle = function () {
        if ($scope.theftsToggle.status) {
          $localStorage.thefts = $scope.theftsToggle.status;
          console.log('Enabled thefts config');
        } else {
          delete $localStorage.thefts;
          console.log('Disabled thefts config');
        }
      };

      $scope.speedToggle = function () {
        if ($scope.speedToggle.status) {
          $localStorage.speed = $scope.speedToggle.status;
          console.log('Enabled speed config');
        } else {
          delete $localStorage.speed;
          console.log('Disabled speed config');
        }
      };

      $scope.updateKmSelectedRisk = function (kmRisk) {
        $localStorage.kmRisk = kmRisk;
        console.log('Updated KM for Risk');
      };

      //Fourth modal settings
      $scope.facebookTracking = function () {
        if ($scope.facebookTracking.status) {
          if ($localStorage.fbLoggedIn) {
            console.log('Enabled Facebook for Tracking');
            $localStorage.fbTracking = $scope.facebookTracking.status;
          } else {
            $scope.facebookTracking.status = false;
            alert('Debes vincular tu cuenta con Facebook');
            console.log('Cannot enable Facebook for Tracking, no permissions');
          }
        } else {
          delete $localStorage.fbTracking;
          console.log('Disabled Facebook for Tracking');
        }
      };

      $scope.smsTracking = function () {
        if ($scope.smsTracking.status) {
          $localStorage.smsTracking = $scope.smsTracking.status;
          console.log('Enabled SMS for Tracking');
        } else {
          delete $localStorage.smsTracking;
          console.log('Disabled SMS for Tracking');
        }
      };

      $scope.updateKmSelectedTracking = function (kmTracking) {
        $localStorage.kmTracking = kmTracking;
        console.log('Updated KM for Tracking');
      };

      //Store the message for impacts
      $scope.saveImpacts = function (msg) {
        if (msg.Impacts == '') {
          delete $localStorage.msgImpacts;
        } else {
          console.log('Saving impacts message');
          $localStorage.msgImpacts = msg.Impacts;
        }
        $scope.modal1.hide();
        $('#sp2_content').removeClass('blur-efect');
      };

      //Store the message for detours
      $scope.saveDetour = function (msg) {
        if (msg.Detour == '') {
          delete $localStorage.msgDetour;
        } else {
          console.log('Saving detour message');
          $localStorage.msgDetour = msg.Detour;
        }
        $scope.modal2.hide();
        $('#sp2_content').removeClass('blur-efect');
      };

      //Store the message for tracking
      $scope.saveTracking = function (msg) {
        if (msg.Tracking == '') {
          delete $localStorage.msgTracking;
        } else {
          console.log('Saving tracking message');
          $localStorage.msgTracking = msg.Tracking;
        }
        $scope.modal4.hide();
        $('#sp2_content').removeClass('blur-efect');
      };

      //Close the third modal and "saves" (not actually) the configs
      $scope.saveRisks = function () {
        console.log('Saving risks configs');
        $scope.modal3.hide();
        $('#sp2_content').removeClass('blur-efect');
      };

      //Facebook access
      //If the button "Vincular con Facebook" is clicked, we execute the linking to Facebook
      $scope.facebookLink = function () {
        console.log('Facebook button clicked');
        //Checks the login status
        $openFB.login({ scope: 'email' }).then(function (response) {
          if (response.status === 'connected') {
            console.log('Facebook login succeeded');
            $localStorage.fbLoggedIn = true;
            // $scope.closeLogin(); //Temporary disabled due an error which shows closeLogin() is not defined, I don't know if this works in the devices but for now, is disabled
          } else {
            $localStorage.fbLoggedIn = false;
            alert('Hubo un error al vincular la cuenta');
            console.log('Facebook login failed');
          }
        });
      };

    }])

  .controller('userManualCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('configCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('rightMenuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('traficAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', '$ionicHistory',
    function ($scope, $stateParams, $state, Alert, $ionicHistory) {

      $scope.type_alert = 0;

      $scope.saveAlert = function () {
        if ($scope.type_alert != 0) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              $scope.$apply(function () {
                Alert.setAlert($scope.type_alert, '1', position.coords.latitude, position.coords.longitude, '0', 1, function (error) {
                  if (!error) {
                    alert('Alerta exitosa');
                    setTimeout(function () {
                      let $backView = $ionicHistory.backView();
                      $backView.go();
                    }, 1000);
                  } else {
                    alert('Intentalo más tarde');
                  }
                });
              });
            });
          }
        } else {
          alert('Seleccionar el tipo de alerta');
        }
      };


      $scope.typeTrafic = function (item) {
        $scope.type_alert = item;
      };

      $('.alert-item').click(function () {
        $('.alert-item').removeClass('active');
        $(this).addClass('active');
      });


    }])

  .controller('policeAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', '$ionicHistory',
    function ($scope, $stateParams, $state, Alert, $ionicHistory) {

      $scope.type_alert = 0;

      $scope.saveAlert = function () {
        if ($scope.type_alert != 0) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              $scope.$apply(function () {
                Alert.setAlert($scope.type_alert, '1', position.coords.latitude, position.coords.longitude, '0', 1, function (error) {
                  if (!error) {
                    alert('Alerta exitosa');
                    setTimeout(function () {
                      let $backView = $ionicHistory.backView();
                      $backView.go();
                    }, 1000);
                  } else {
                    alert('Intentalo más tarde');
                  }
                });
              });
            });
          }
        } else {
          alert('Seleccionar el tipo de alerta');
        }
      };


      $scope.typeTrafic = function (item) {
        $scope.type_alert = item;
      };

      $('.alert-item').click(function () {
        $('.alert-item').removeClass('active');
        $(this).addClass('active');
      });


    }])

  .controller('accidentAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', '$ionicHistory',
    function ($scope, $stateParams, $state, Alert, $ionicHistory) {

      $scope.type_alert = 0;

      $scope.saveAlert = function () {
        if ($scope.type_alert != 0) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              $scope.$apply(function () {
                Alert.setAlert($scope.type_alert, '1', position.coords.latitude, position.coords.longitude, '0', 1, function (error) {
                  if (!error) {
                    alert('Alerta exitosa');
                    setTimeout(function () {
                      let $backView = $ionicHistory.backView();
                      $backView.go();
                    }, 1000);
                  } else {
                    alert('Intentalo más tarde');
                  }
                });
              });
            });
          }
        } else {
          alert('Seleccionar el tipo de alerta');
        }
      };


      $scope.typeTrafic = function (item) {
        $scope.type_alert = item;
      };

      $('.alert-item').click(function () {
        $('.alert-item').removeClass('active');
        $(this).addClass('active');
      });

    }])

  .controller('dangerAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', '$ionicHistory',
    function ($scope, $stateParams, $state, Alert, $ionicHistory) {

      $scope.type_alert = 0;

      $scope.saveAlert = function () {
        if ($scope.type_alert != 0) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              $scope.$apply(function () {
                Alert.setAlert($scope.type_alert, '1', position.coords.latitude, position.coords.longitude, '0', 1, function (error) {
                  if (!error) {
                    alert('Alerta exitosa');
                    setTimeout(function () {
                      let $backView = $ionicHistory.backView();
                      $backView.go();
                    }, 1000);
                  } else {
                    alert('Intentalo más tarde');
                  }
                });
              });
            });
          }
        } else {
          alert('Seleccionar el tipo de alerta');
        }
      };

      $scope.typeTrafic = function (item) {
        $scope.type_alert = item;
      };

      $scope.weather = function () {
        $state.go('weatherAlert');
      };

      $('.alert-item').click(function () {
        $('.alert-item').removeClass('active');
        $(this).addClass('active');
      });

    }])

  .controller('weatherAlertCtrl', ['$scope', '$stateParams', '$state', 'Alert', '$ionicHistory',
    function ($scope, $stateParams, $state, Alert, $ionicHistory) {

      $('.alert-item').click(function () {
        $('.alert-item').removeClass('active');
        $(this).addClass('active');
      });

      $scope.type_alert = 0;

      $scope.saveAlert = function () {
        if ($scope.type_alert != 0) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              $scope.$apply(function () {
                Alert.setAlert($scope.type_alert, '1', position.coords.latitude, position.coords.longitude, '0', 1, function (error) {
                  if (!error) {
                    alert('Alerta exitosa');
                    setTimeout(function () {
                      let $backView = $ionicHistory.backView();
                      $backView.go();
                    }, 1000);
                  } else {
                    alert('Intentalo más tarde');
                  }
                });
              });
            });
          }
        } else {
          alert('Seleccionar el tipo de alerta');
        }
      };

      $scope.typeTrafic = function (item) {
        $scope.type_alert = item;
      };


    }])

  .controller('closedAlertCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
    }])



  


  .controller('createRouteCaravanaCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      $scope.$on('$ionicView.loaded', function () {
        if (window.cordova) {
          cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
            if (enabled) {
            } else {
              alert('El GPS esta ' + (enabled ? 'enabled' : 'desactivado, por favor activalo'));
              cordova.plugins.diagnostic.switchToLocationSettings();
            }
          }, function (error) {
            alert('The following error occurred: ' + error);
          });
        }
      });

      $scope.type_poi = 0;

      var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      var directionsService = new google.maps.DirectionsService();

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

              $scope.markerd = {
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
                  dragend: function (markerd, eventName, args) {
                    $rootScope.destination = {
                      lat: markerd.getPosition().lat(),
                      lng: markerd.getPosition().lng()
                    };

                    var latlngd = new google.maps.LatLng($rootScope.destination.lat, $rootScope.destination.lng);

                    foo(latlngd, function (locationd) {
                      $('#destination').val(locationd);
                      getDirections();
                    });
                    $scope.markerd.options = {
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
                      lng: marker.getPosition().lng()
                    };

                    if ($('#home-inputDestination').is(':hidden')) {
                      var latlngd = new google.maps.LatLng(($rootScope.origin.lat), $rootScope.origin.lng);
                      $scope.markerd.coords.latitude = $rootScope.origin.lat;
                      $scope.markerd.coords.longitude = $rootScope.origin.lng;
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
          $scope.error = function (error) { };
          navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.error, $scope.options);
        }
      });
    }]);