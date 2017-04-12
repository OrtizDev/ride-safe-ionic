<?php


require_once '../include/DbOperation.php';
require '.././libs/Slim/Slim.php';
header('Access-Control-Allow-Origin: *');
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

//Method to display response
function echoResponse($status_code, $response)
{
    //Getting app instance
    $app = \Slim\Slim::getInstance();

    //Setting Http response code
    $app->status($status_code);

    //setting response content type to json
    $app->contentType('application/json');

    //displaying the response in json format
    echo json_encode($response);
}

$app->post('/userlogin',function() use ($app){

  $mail = $app->request->post('email');
  $pass = $app->request->post('password');

  $db =  new DbOperation();

  $response = array();

  if($db -> userLogin($mail,$pass)){

    $user = $db -> getUser($mail);
    $response['error'] = false;
    $response['id'] = $user['id_usuario'];
    $response['nombre'] = $user['nombre'] . " " . $user['apPat'] . " ". $user['apMat']; 
  } else {
    $response['error'] = true;
    $response['message'] = "Usuario o Contraseña Erronea";
  }

  echoResponse(200,$response);

});

$app->get('/thematic', function() use ($app){

  $db =  new DbOperation();
  $response = array();
  $thematics = $db -> getThematic();
  $response['error'] = false;
  $response['message'] = json_encode($thematics);
  echoResponse(200,$response);

});

$app->get('/state', function() use ($app){

  $db =  new DbOperation();
  $response = array();
  $states = $db -> getStates();
  $response['error'] = false;
  $response['message'] = json_encode($states);
  echoResponse(200,$response);

});

$app->post('/cities', function() use ($app){

  $town = $app->request->post('city');

  $db = new DbOperation();
  $response = array();
  $cities = $db -> getCities($town);
  $response['error'] = false;
  $response['message'] = json_encode($cities);
  echoResponse(200,$response);

});

$app->post('/registuser',function() use ($app){

  $nam = $app->request->post('name');
  $apa = $app->request->post('apPat');
  $apm = $app->request->post('apmat');
  $pas = $app->request->post('pass');
  $bir = $app->request->post('birthday');
  $gen = $app->request->post('gender');
  $cel = $app->request->post('cellphone');
  $eme = $app->request->post('cellemergency');
  $adm = $app->request->post('admin');
  $ciu = $app->request->post('ciudad');
  $tou = $app->request->post('touring');
  $cir = $app->request->post('circuitos');
  $stu = $app->request->post('stunt');
  $atv = $app->request->post('atv');
  $tra = $app->request->post('trabajo');
  $edu = $app->request->post('enduro');
  $car = $app->request->post('carretera');
  $otr = $app->request->post('otro');
  $mai = $app->request->post('email');

  $db = new DbOperation();
  $response = array();
  $res = $db -> userRegister($nam,$apa,$apm,$mai,$pas,$bir,$gen,$cel,$eme,$adm,$ciu,$tou,$cir,$stu,$atv,$tra,$edu,$car,$otr);
  if($res == 0)
    $response['error'] = false;
  else
    $response['error'] = true;
  echoResponse(200,$response);

});

$app->post('/registmoto', function() use ($app) {

  $brand =  $app->request->post('brand');
  $model =  $app->request->post('model');
  $year  =  $app->request->post('year');
  $plate =  $app->request->post('plate');

  $db = new DbOperation();
  $response = array();
  $res = $db -> motoRegister($brand,$year,$model,$plate);
  if($res == 1)
    $response['error'] = false;
  else
    $response['error'] = true;
  echoResponse(200,$response);

});

$app->post('/alert', function() use ($app) {

  $type_alert = $app->request->post('type_alert');
  $id_trip = $app->request->post('id_trip');
  $lat = $app->request->post('lat');
  $lon = $app->request->post('lon');
  $validation = $app->request->post('validation');
  $state = $app->request->post('state');
  $date = $app->request->post('date');

  $db = new DbOperation();
  $response =  array();
  $res = $db -> postAlert($type_alert,$id_trip,$lat,$lon,$validation,$state,$date);
  $res == 1? $response['error'] = false: $response['error'] = true;
  echoResponse(200,$response);

});

$app->get('/brand', function() use ($app) {

  $db =  new DbOperation();
  $response = array();
  $brands = $db -> getBrands();
  $response['error'] = false;
  $response['message'] = json_encode($brands);
  echoResponse(200,$response);

});

$app->post('/models', function() use ($app){

  $brand = $app->request->post('brand');

  $db = new DbOperation();
  $response = array();
  $models = $db -> getModels($brand);
  $response['error'] = false;
  $response['message'] = json_encode($models);
  echoResponse(200,$response);

});

$app->post('/filter', function() use ($app){

  $query = $app->request->post('query');

  $db = new DbOperation();
  $response = array();
  $results = $db -> getFilter($query);
  $response['error'] = false;
  $response['message'] = json_encode($results);
  echoResponse(200,$response);

});

$app->post('/confUser', function() use ($app) {
  $id = $app->request->post('id');
  $db =  new DbOperation();
  $response = array();
  $user = $db -> getUserById($id);
  $response['error'] = false;
  $response['id'] = $user['id_usuario'];
  $response['username'] = $user['nombre'];
  $response['apat']= $user['apPat'];
  $response['amat']= $user['apMat'];
  $response['gender']= $user['sexo'];
  $response['cellphone']= $user['celular'];
  $response['bdate']= $user['fechaNac'];
  $response['telEmer']= $user['numEmer'];
  $response['emailRe']= $user['correo'];
  $response['idmoto']= $user['id_moto'];
  $response['contrasena']= $user['contrasena'];
  $id = $user['id_moto'];
  $db =  new DbOperation();
  $moto = $db -> getUserMoto($id);
  $response['error'] = false;
  $response['placas'] = $moto['placas'];
  $response['marca']= $moto['marca'];
  $response['anio']= $moto['anio'];
  $response['modelo']= $moto['modelo'];
  $db =  new DbOperation();
  $moto = $db -> getUseMoto($id);
  $response['error'] = false;
  $response['ciudad'] = $moto['ciudad'];
  $response['touring']= $moto['touring'];
  $response['circuitos']= $moto['circuitos'];
  $response['stunt']= $moto['stunt'];
  $response['atv'] = $moto['atv'];
  $response['trabajo']= $moto['trabajo'];
  $response['enduro']= $moto['enduro'];
  $response['carretera']= $moto['carretera'];
  $response['otro'] = $moto['otro'];
  echoResponse(200,$response);

});

$app->post('/updateUser',function() use ($app){

  $id = $app->request->post('id');
  $nam = $app->request->post('name');
  $apa = $app->request->post('appat');
  $apm = $app->request->post('apmat');
  $pas = $app->request->post('password');
  $bir = $app->request->post('birth');
  $gen = $app->request->post('gender');
  $cel = $app->request->post('cell');
  $eme = $app->request->post('cellemer');
  $ciu = $app->request->post('city');
  $mai = $app->request->post('email');
  $est = $app->request->post('estatus');

  $db = new DbOperation();
  $response = array();
  $res = $db -> updateUser($nam,$apa,$apm,$mai,$pas,$bir,$gen,$cel,$eme,$ciu,$id,$est);
  if($res == 1)
    $response['error'] = false;
  else
    $response['error'] = true;
  echoResponse(200,$response);

});

$app->post('/updateMoto',function() use ($app){

  $id = $app->request->post('id');
  $brand =  $app->request->post('marca');
  $model =  $app->request->post('modelo');
  $year  =  $app->request->post('anio');
  $plate =  $app->request->post('placas');
  $ciu = $app->request->post('ciudad');
  $tou = $app->request->post('touring');
  $cir = $app->request->post('circuitos');
  $stu = $app->request->post('stunt');
  $atv = $app->request->post('atv');
  $tra = $app->request->post('trabajo');
  $edu = $app->request->post('enduro');
  $car = $app->request->post('carretera');
  $otr = $app->request->post('otro');

  $db = new DbOperation();
  $response = array();
  $res = $db -> updateMoto($brand,$model,$year,$plate,$id);
  if($res == 1){
    $db = new DbOperation();
    $response = array();
    $res = $db -> updateUse($ciu,$tou,$cir,$stu,$atv,$tra,$edu,$car,$otr,$id);
    if($res == 1)
      $response['error'] = false;
    else
      $response['error'] = true;
  }else
    $response['error'] = true;
  echoResponse(200,$response);

});

$app->get('/routes', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $route = $db -> getRoutes();
  $response['error'] = false;
  $response['message'] = json_encode($route);
  echoResponse(200,$route);

});

$app->get('/emergencia', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $emergencias = $db -> getEme();
  $response['error'] = false;
  $response['message'] = json_encode($emergencias);
  echoResponse(200,$emergencias);

});

$app->get('/establecimiento', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $establecimiento = $db -> getEsta();
  $response['error'] = false;
  $response['message'] = json_encode($establecimiento);
  echoResponse(200,$establecimiento);

});

$app->get('/anuncio', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $anuncio = $db -> getAnuncio();
  $response['error'] = false;
  $response['message'] = json_encode($anuncio);
  echoResponse(200,$anuncio);

});

$app ->get('/amigos/activos',function() use ($app){
   $db = new DbOperation();
   $response = array();
   $amigos_activos = $db -> getUsuariosActivos();
   $response['error'] = false;
   $response['message'] = json_encode($amigos_activos);
   echoResponse(200,$amigos_activos);
 });


 $app ->get('/notificaciones',function() use ($app){
   $query = $app->request->post('query');
  
   $db = new DbOperation();
   $response = array();
   $notificaciones = $db -> getNotificaciones();
   $response['error'] = false;
   $response['message'] = json_encode($notificaciones);
   echoResponse(200,$notificaciones);
   });

$app->post('/send/notificacion', function() use ($app){

  $id_notificacion = $app->request->post('id_notificacion');
  $id_usuario = $app->request->post('id_usuario');
  $id_amigo = $app->request->post('id_amigo');
  $descripcion_notificacion = $app->request->post('descripcion_notificacion');
  $db = new DbOperation();
  $response =  array();
  $res = $db -> postNotificacion($id_notificacion,$id_usuario,$id_amigo,$descripcion_notificacion);
  $res == 1? $response['message'] = false : $response['message'] = true;
  echo json_encode($res);
  echoResponse(200,$response);
});


$app->run();

?>