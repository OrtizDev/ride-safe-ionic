<?php include("../conexion.php"); ?>

<?php

$id =$_GET['id_descubrir_ruta'];
mysqli_query($connect, "DELETE FROM descubrir_ruta where id_descubrir_ruta = '".$id."'"); /** execute the sql delete code **/
echo"<script>window.location.href=\"rutas.php\"</script>";

?>