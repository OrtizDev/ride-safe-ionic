<?php include("../conexion.php"); ?>

<?php

$id =$_GET['id_anuncio'];
mysqli_query($connect, "DELETE FROM anuncios where id_anuncio = '".$id."'");
$id2 =$_GET['id_img_anuncio'];
mysqli_query($connect, "DELETE FROM img_anuncios where id_img_anuncio = '".$id2."'");

echo"<script>window.location.href=\"anuncio.php\"</script>";

?>