<?php include("../conexion.php"); ?>
<?php
		$nombre= $_POST ['nombre'];
		$tel= $_POST ['telefono'];
		$web= $_POST ['web'];
		$fb= $_POST ['facebook'];
		$direccion= $_POST ['direccion'];
		$producto= $_POST ['des_producto'];
		$compra= $_POST ['des_compra'];
		$gasto= $_POST ['gasto_men'];
		$tipo= $_POST ['tipo_venta'];
		mysqli_query($connect, "INSERT INTO establecimiento(nombre,telefono,web,facebook,direccion,des_producto,des_compra,gasto_men,tipo_venta) VALUES('".$nombre."','".$tel."','".$web."','".$fb."','".$direccion."','".$producto."','".$compra."','".$gasto."','".$tipo."')");

		$legal= $_POST ['nom_legal'];
		$rfc= $_POST ['RFC'];
		$dir= $_POST ['direccion_fis'];
		$estado= $_POST ['id_estado'];
		$municipio= $_POST ['id_municipio'];
		$cp= $_POST ['cp'];
		$representante= $_POST ['nom_representante'];
		$telefono= $_POST ['tel_contacto'];
		mysqli_query($connect, "INSERT INTO datos_facturacion(nom_legal,RFC,direccion_fis,id_estado,id_municipio,cp,nom_representante,tel_contacto) VALUES('".$legal."','".$rfc."','".$dir."','".$estado."','".$municipio."','".$cp."','".$representante."','".$telefono."')");
		echo"<script>window.location.href=\"establecimientos.php\"</script>";
?>