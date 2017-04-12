<?php
header('Content-Type: text/html; charset=ISO-8859-1');
?>
<?php include("../conexion.php"); ?>
<?php
		$nombre= $_POST ['nombre'];
		$latitud= $_POST ['latDes'];
		$altitud= $_POST ['altDes'];
		$concentracion= $_POST ['concentracion'];
		$velocidad= $_POST ['velocidad'];
		$pista= $_POST ['pista_carrera'];
		$estado= $_POST ['id_estado'];
		$tematica= $_POST ['id_tematica'];
		mysqli_query($connect, "INSERT INTO descubrir_ruta(nombre,latDes,altDes,concentracion,velocidad,pista_carrera,id_estado,id_tematica) VALUES('".$nombre."','".$latitud."','".$altitud."','".$concentracion."','".$velocidad."','".$pista."','".$estado."','".$tematica."')");
		echo"<script>window.location.href=\"rutas.php\"</script>";
?>