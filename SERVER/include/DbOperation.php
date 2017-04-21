<?php

class DbOperation {

    private $con;

    function __construct(){

      require_once dirname(__FILE__) . '/DbConnect.php';

      $db = new DbConnect();

      $this -> con = $db -> connect();
    }


    public function userLogin($mail,$pass){
      $password = sha1($pass);
      
      $stmt = $this -> con -> prepare("SELECT * FROM usuario WHERE correo = ? AND contrasena = ?");
      $stmt -> bind_param("ss",$mail,$password);
      $stmt -> execute();
      $stmt -> store_result();
      $num_rows = $stmt -> num_rows;
      $stmt -> close();
      return $num_rows > 0;
    }

    public function getUser($mail){
      $stmt = $this -> con -> prepare("SELECT * FROM usuario WHERE correo = ?");
      $stmt -> bind_param("s",$mail);
      $stmt -> execute();
      $user = $stmt -> get_result() -> fetch_assoc();
      $stmt -> close();
      return $user;
    }

    public function getThematic(){
      $query = "SELECT * FROM tematica";
      $result = mysqli_query($this-> con, $query);
      while ($row = mysqli_fetch_assoc($result)) {
        $post [] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getStates(){

      $query = "SELECT * FROM estado";
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getCities($state){

      $query = "SELECT * FROM municipios WHERE id_estado=" . $state;
      $result = mysqli_query($this -> con, $query);
      while ($row = mysqli_fetch_assoc($result)){
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;

    }

    public function getFilter($query){

      $result = mysqli_query($this -> con, $query);
      while ($row = mysqli_fetch_assoc($result)){
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function userRegister($nom,$apa,$ama,$mail,$pas,$bir,$gen,$cel,$emer,$adm,$ciu,$tou,$cir,$stu,$atv,$tra,$edu,$car,$otr){

      $password = sha1($pas);
      $stmt = $this -> con -> prepare("CALL altaUsuario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
      $stmt -> bind_param("sssssssssssssssssss", $nom,$apa,$ama,$mail,$password,$bir,$gen,$cel,$emer,$adm,$ciu,$tou,$cir,$stu,$atv,$tra,$edu,$car,$otr);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result) {
        return 0;
      } else {
        return 1;
      }
    }

    public function motoRegister($brand,$year,$model,$plaques){

      $stmt = $this -> con -> prepare("INSERT INTO moto(marca, anio, modelo, placas) values(?,?,?,?)");
      $stmt -> bind_param("ssss",$brand,$year,$model,$plaques);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result) {
        return 1;
      } else {
        return 0;
      }
    }

    public function postAlert($type_alert,$id_trip,$lat,$lon,$validation,$state,$date){

      $stmt = $this -> con ->prepare("INSERT INTO alerta(id_tipo_alerta, id_viaje, latAct, lonAct, validacion, estado, hora_fecha) VALUES(?,?,?,?,?,?,?)");
      $stmt -> bind_param("sssssss",$type_alert,$id_trip,$lat,$lon,$validation,$state,$date);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result){
        return 1;
      } else {
        return 0;
      }
    }

    public function getBrands() {
      $query = "SELECT * FROM marcas_moto";
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getModels($model){

      $query = "SELECT * FROM modelo_moto WHERE id_marca_moto=" . $model;
      $result = mysqli_query($this -> con, $query);
      while ($row = mysqli_fetch_assoc($result)){
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;

    }
    public function getRoutes(){

      $query = "SELECT * FROM ruta_guardada";
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getEme(){

      $query = "SELECT numEmer FROM usuario WHERE id_usuario=".$emer;
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }
    public function getEsta(){

      $query = "SELECT * FROM establecimiento";
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getUserById($id){

      $stmt = $this -> con -> prepare("SELECT * FROM usuario WHERE id_usuario = ?");
      $stmt -> bind_param("s",$id);
      $stmt -> execute();
      $user = $stmt -> get_result() -> fetch_assoc();
      $stmt -> close();
      return $user;
    }

    public function updateUserStatus($id,$status){
      $stmt = $this -> con -> prepare("UPDATE usuario SET status = ".$status." WHERE id_usuario = ".$id);
      // $stmt -> bind_param("s",$status);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result){
        return 1;
      } else {
        return 0;
      }
    }

    public function updateUser($nam,$apa,$apm,$mai,$pas,$bir,$gen,$cel,$eme,$ciu,$id,$est){

      if($est==1){
        $pas= sha1($pas);
      }
      $stmt = $this -> con -> prepare("UPDATE usuario SET nombre = ?, apPat = ?, apMat = ?, sexo = ?, celular = ?, fechaNac = ?, numEmer = ?, correo = ?, contrasena = ? WHERE id_usuario = ?");
      $stmt -> bind_param("ssssssssss",$nam,$apa,$apm,$gen,$cel,$bir,$eme,$mai,$pas,$id);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result){
        return 1;
      } else {
        return 0;
      }
    }

    public function getUserMoto($id){

      $stmt = $this -> con -> prepare("SELECT * FROM moto WHERE id_moto = ?");
      $stmt -> bind_param("s",$id);
      $stmt -> execute();
      $moto = $stmt -> get_result() -> fetch_assoc();
      $stmt -> close();
      return $moto;
    }

    public function updateMoto($marca,$modelo,$anio,$placas,$id){


      $stmt = $this -> con -> prepare("UPDATE moto SET marca = ?, anio = ?, modelo = ?, placas = ? WHERE id_moto = ?");
      $stmt -> bind_param("sssss",$marca,$modelo,$anio,$placas,$id);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result){
        return 1;
      } else {
        return 0;
      }
    }

    public function getUseMoto($id){

      $stmt = $this -> con -> prepare("SELECT * FROM uso WHERE id_moto = ?");
      $stmt -> bind_param("s",$id);
      $stmt -> execute();
      $moto = $stmt -> get_result() -> fetch_assoc();
      $stmt -> close();
      return $moto;
    }

    public function updateUse($ciu,$tou,$cir,$stu,$atv,$tra,$edu,$car,$otr,$id){

      $stmt = $this -> con -> prepare("UPDATE uso SET ciudad = ?, touring = ?, circuitos = ?, stunt = ?, atv = ?, trabajo = ?, enduro = ?, carretera = ?, otro=? WHERE id_moto = ?");
      $stmt -> bind_param("ssssssssss",$ciu,$tou,$cir,$stu,$atv,$tra,$edu,$car,$otr,$id);
      $result = $stmt -> execute();
      $stmt -> close();
      if($result){
        return 1;
      } else {
        return 0;
      }
    }

    public function getAnuncio(){

      $query = "SELECT * FROM anuncios";
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getImgAnuncio($imganun){

      $query = "SELECT imagen FROM img_anuncios WHERE id_img_anuncio = ".$imganun;
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

    public function getImgRuta($imganun){

      $query = "SELECT * FROM ruta_imagen WHERE id_ruta = ".$imganun;
      $result = mysqli_query($this -> con, $query);
      while ($row =  mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

     public function getUsuariosActivos(){
      $query = "SELECT usuario.nombre, usuario.id_usuario FROM usuario, usuario_amigo WHERE usuario.id_usuario = usuario_amigo.id_usuario AND usuario.status = '1' GROUP BY usuario.nombre";
      $result = mysqli_query($this -> con, $query);
      while ($row = mysqli_fetch_assoc($result)) {
        $post[] = array_map('utf8_encode',$row);
      }
      return $post;
    }


    public function getNotificaciones(){
      $query = "SELECT usuario.nombre, usuario.id_usuario, notificaciones.descripcion_notificacion, notificaciones.id_notificacion
      FROM notificaciones, usuario, usuario_amigo 
      WHERE notificaciones.id_amigo = 17 && usuario.id_usuario = notificaciones.id_usuario
      GROUP BY notificaciones.descripcion_notificacion";
      $result = mysqli_query($this -> con, $query);
      while ($row = mysqli_fetch_assoc($result)){
        $post[] = array_map('utf8_encode', $row);
      }
      return $post;
    }

  public function postNotificacion($id_notificacion,$id_usuario,$id_amigo,$descripcion_notificacion) {
    $stmt = $this -> con ->prepare("INSERT INTO notificaciones(id_usuario, id_amigo, descripcion_notificacion) VALUES(?,?,?)");
    $stmt -> bind_param('iis',$id_usuario,$id_amigo,$descripcion_notificacion);
    $result = $stmt -> execute();
    $stmt -> close();

    if($result) {
      return 1;
    } else {
      return 0;
    }
  }

  public function deleteNotificacion($id_notificacion) {
    $query = "DELETE FROM notificaciones WHERE id_notificacion = $id_notificacion";
    $result = mysqli_query($this->con, $query);
    if($result) {
      return 1;
    } else {
      return 0;
    }
  }
} ?>
