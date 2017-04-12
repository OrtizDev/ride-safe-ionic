<?php include("../conexion.php"); ?>

<?php

$id =$_GET['id_marca_moto'];
mysqli_query($connect, "DELETE FROM marcas_moto where id_marca_moto = '".$id."'");
mysqli_query($connect, "DELETE FROM modelo_moto where id_marca_modelo = '".$id."'");

echo"<script>window.location.href=\"marca.php\"</script>";

?>