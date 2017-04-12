<?php
header('Content-Type: text/html; charset=ISO-8859-1');
?>
<?php include("../conexion.php"); ?>
<?php
		$nombre= $_POST ['nombre'];
		$municipio= $_POST ['id_municipio'];
		$altitud= $_POST ['altOrg'];
		$latitud= $_POST ['latOrg'];
		$descripcion= $_POST ['descripcion'];
		mysqli_query($connect, "INSERT INTO pueblos_magicos(nombre,id_municipio,altOrg,latOrg,descripcion) VALUES('".$nombre."','".$municipio."','".$altitud."','".$latitud."','".$descripcion."')");
		echo"<script>window.location.href=\"pueblos.php\"</script>";
?>