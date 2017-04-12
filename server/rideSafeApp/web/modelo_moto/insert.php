<?php include("../conexion.php"); ?>
<?php
		$marca= $_POST ['id_marca_moto'];
		$nombre= $_POST ['nombre'];
		mysqli_query($connect, "INSERT INTO modelo_moto(id_marca_moto,nombre) VALUES('".$marca."','".$nombre."')");
		echo"<script>window.location.href=\"modelo.php\"</script>";
?>