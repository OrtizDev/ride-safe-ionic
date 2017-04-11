<?php include("../conexion.php"); ?>

<?php

$id =$_GET['id_modelo'];
mysqli_query($connect, "DELETE FROM modelo_moto where id_modelo = '".$id."'");

echo"<script>window.location.href=\"modelo.php\"</script>";

?>