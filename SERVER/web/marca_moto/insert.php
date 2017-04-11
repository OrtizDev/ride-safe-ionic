<?php
header('Content-Type: text/html; charset=ISO-8859-1');
?>
<?php include("../conexion.php"); ?>
<?php
		$nombre= $_POST ['nombre'];
		mysqli_query($connect, "INSERT INTO marcas_moto(nombre) VALUES('".$nombre."')");
		echo"<script>window.location.href=\"marca.php\"</script>";
?>