<?php include("../conexion.php"); ?>

<?php

$id =$_GET['id_estable'];
mysqli_query($connect, "DELETE FROM establecimiento where id_estable = '".$id."'");
$id2 =$_GET['id_datos_factura'];
mysqli_query($connect, "DELETE FROM datos_facturacion where id_datos_factura = '".$id."'");
echo"<script>window.location.href=\"establecimiento.php\"</script>";

?>