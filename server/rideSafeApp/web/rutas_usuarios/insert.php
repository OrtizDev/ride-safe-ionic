<?php include("../conexion.php"); ?>
<?php
		$establecimiento= $_POST ['id_estable'];
		$legal= $_POST ['nom_legal'];
		$rfc= $_POST ['RFC'];
		$dir= $_POST ['direccion_fis'];
		$estado= $_POST ['id_estado'];
		$municipio= $_POST ['id_municipio'];
		$cp= $_POST ['cp'];
		$representante= $_POST ['nom_representante'];
		$telefono= $_POST ['tel_contacto'];
		mysqli_query($connect, "INSERT INTO datos_facturacion(id_estable,nom_legal,RFC,direccion_fis,id_estado,id_municipio,cp,nom_representante,tel_contacto) VALUES('".$establecimiento."','".$legal."','".$rfc."','".$dir."','".$estado."','".$municipio."','".$cp."','".$representante."','".$telefono."')");
		echo"<script>window.location.href=\"facturacion.php\"</script>";
?>