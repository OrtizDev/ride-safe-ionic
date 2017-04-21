<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

require_once '../include/DbOperation.php';
require '.././libs/Slim/Slim.php';

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
  $body = (array) json_decode($app->request->getBody());

  $mail = $body['email'];
  $pass = $body['password'];

  $db =  new DbOperation();

  $response = array();

  if($db -> userLogin($mail,$pass)){
    $user = $db -> getUser($mail);
    $db -> updateUserStatus(1, $user['id_usuario']);
    $response['error'] = false;
    $response['id'] = $user['id_usuario'];
    $response['nombre'] = $user['nombre'] . " " . $user['apPat'] . " ". $user['apMat'];
  } else {
    $response['error'] = true;
    $response['message'] = "Usuario o Contraseña Erronea";
  }

  return echoResponse(200,$response);

});

$app->post('/userlogout',function() use ($app){
  $response = array();
  $idUser = $app->request->post('id');
  $db =  new DbOperation();
  if ($db -> updateUserStatus($idUser,0)) {
    $response['error'] = false;
    $response['message'] = "Estado de usuario actualizado";
  } else {
    $response['error'] = true;
    $response['message'] = "Estado de usuario no actualizado";
  }

  return echoResponse(200,$response);

});

$app->get('/userActive', function() use ($app){

  $db =  new DbOperation();
  $response = array();
  $users = $db -> getUsuariosActivos();
  $response['error'] = false;
  $response['message'] = $users;
  return echoResponse(200,$response);

});

$app->get('/notificaciones', function() use ($app){

  $db =  new DbOperation();
  $response = array();
  $notificaciones = $db -> getNotificaciones();
  $response['error'] = false;
  $response['message'] = $notificaciones;
  return echoResponse(200,$response);

});

$app->post('/notificaciones', function() use ($app){
  $body = (array) json_decode($app->request->getBody());
  $id_notificacion = $body['idnotificacion'];
  $id_usuario = $body['idUsuario'];
  $id_amigo = $body['idAmigo'];
  $descripcion_notificacion = json_encode($body['descripcion']);

  $db =  new DbOperation();
  $response = array();
  if ($db -> postNotificacion($id_notificacion,$id_usuario,$id_amigo,$descripcion_notificacion) ) {
    $response['error'] = false;
    $response['message'] = "Notificacion creada";
  } else {
    $response['error'] = true;
    $response['message'] = "Notificacion no creada";
  }

  return echoResponse(200,$response);
});

$app->delete('/notificaciones', function() use ($app){
  $body = (array) json_decode($app->request->getBody());
  $id_notificacion = $body['idNotificacion'];

  $db =  new DbOperation();
  $response = array();
  if ($db -> deleteNotificacion($id_notificacion) ) {
    $response['error'] = false;
    $response['message'] = "Notificacion eliminada";
  } else {
    $response['error'] = true;
    $response['message'] = "Notificacion no eliminada";
    $response['body'] = $app->request->getBody();
  }

  return echoResponse(200,$response);
});

$app->get('/thematic', function() use ($app){

  $db =  new DbOperation();
  $response = array();
  $thematics = $db -> getThematic();
  $response['error'] = false;
  $response['message'] = json_encode($thematics);
  return echoResponse(200,$response);

});

$app->get('/state', function() use ($app){

  $db =  new DbOperation();
  $response = array();
  $states = $db -> getStates();
  $response['error'] = false;
  $response['message'] = json_encode($states);
  return echoResponse(200,$response);

});

$app->post('/cities', function() use ($app){

  $town = $app->request->post('city');

  $db = new DbOperation();
  $response = array();
  $cities = $db -> getCities($town);
  $response['error'] = false;
  $response['message'] = json_encode($cities);
  return echoResponse(200,$response);

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
  return echoResponse(200,$response);

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
  return echoResponse(200,$response);

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
  return echoResponse(200,$response);

});

$app->get('/brand', function() use ($app) {

  $db =  new DbOperation();
  $response = array();
  $brands = $db -> getBrands();
  $response['error'] = false;
  $response['message'] = json_encode($brands);
  return echoResponse(200,$response);

});

$app->post('/models', function() use ($app){

  $brand = $app->request->post('brand');

  $db = new DbOperation();
  $response = array();
  $models = $db -> getModels($brand);
  $response['error'] = false;
  $response['message'] = json_encode($models);
  return echoResponse(200,$response);

});

$app->post('/filter', function() use ($app){

  $query = $app->request->post('query');

  $db = new DbOperation();
  $response = array();
  $results = $db -> getFilter($query);
  $response['error'] = false;
  $response['message'] = json_encode($results);
  return echoResponse(200,$response);

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
  return echoResponse(200,$response);

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
  return echoResponse(200,$response);

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
  return echoResponse(200,$response);

});

function getFileImagenRuta($images){
  $images['imagen'] = base64_encode(file_get_contents('./img/rutas/' . $images['nombre']));
  return $images;
}

function getNameImages($ruta){
  $db =  new DbOperation();
  $ruta['imagenes'] = $db -> getImgRuta($ruta['id_ruta']);
  $ruta['imagenes'] = array_map('getFileImagenRuta',$ruta['imagenes']);
  return $ruta;
}

$app->get('/routes', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $route = $db -> getRoutes();
  $route2 = array_map('getNameImages',$route);
  $response['error'] = false;
  $response['message'] = $route2;
  return echoResponse(200,$response);

});

$app->get('/emergencia', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $emergencias = $db -> getEme();
  $response['error'] = false;
  $response['message'] = json_encode($emergencias);
  return echoResponse(200,$emergencias);

});

$app->get('/establecimiento', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $establecimiento = $db -> getEsta();
  $response['error'] = false;
  $response['message'] = json_encode($establecimiento);
  return echoResponse(200,$establecimiento);

});

function getFileImagen($images){
  $images['nombre'] = $images['imagen'];
  $images['imagen'] = base64_encode(file_get_contents('./img/anuncios/' . $images['imagen']));
  return $images;
}

function getImagesAnucios($anun){
  $db =  new DbOperation();
  $anun['imagenes'] = $db -> getImgAnuncio($anun['id_img_anuncio']);
  $anun['imagenes'] = array_map('getFileImagen',$anun['imagenes']);
  return $anun;
}

$app->get('/anuncio', function() use ($app){


  $db =  new DbOperation();
  $response = array();
  $anuncio = $db -> getAnuncio();
  $anuncio2 = array_map('getImagesAnucios',$anuncio);
  $response['error'] = false;
  $response['message'] = $anuncio2;
  return echoResponse(200,$response);

});

$app->run();

?>
