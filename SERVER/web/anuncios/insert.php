<?php
	include '../conexion.php'; /** calling of connection.php that has the connection code **/
function redimensionar_imagen($rutaImagenOriginal, $tipo){
	switch($tipo){
		case 'image/jpg':
		case 'image/jpeg':
			$imagen_original = imagecreatefromjpeg($rutaImagenOriginal);
			break;
		case 'image/gif':
			$imagen_original = imagecreatefromgif($rutaImagenOriginal);
			break;
		case 'image/png':
			$imagen_original = imagecreatefrompng($rutaImagenOriginal);
			break;
	}
	$max_ancho = 450;
	$max_alto = 450;
	list($ancho,$alto)=getimagesize($rutaImagenOriginal);
	$x_ratio = $max_ancho / $ancho;
	$y_ratio = $max_alto / $alto;
	if( ($ancho <= $max_ancho) && ($alto <= $max_alto) ){
		$ancho_final = $ancho;
		$alto_final = $alto;
	}
	elseif (($x_ratio * $alto) < $max_alto){
		$alto_final = ceil($x_ratio * $alto);
		$ancho_final = $max_ancho;
	}
	else{
		$ancho_final = ceil($y_ratio * $ancho);
		$alto_final = $max_alto;
	}
	$tmp=imagecreatetruecolor($ancho_final,$alto_final);
	imagecopyresampled($tmp,$imagen_original,0,0,0,0,$ancho_final, $alto_final,$ancho,$alto);
	imagedestroy($imagen_original);
	/*if($alto > $ancho){
		$tmp = imagerotate($tmp, 90, 0);
	}*/
	return $tmp;
}
			
		if( isset( $_POST['create'] ) ): /** A trigger that execute after clicking the submit 	button **/
				
				/*** Putting all the data from text into variables **/
			if ($_FILES["imagen"]["error"] > 0){
				echo "ha ocurrido un error";
			} else {
				//ahora vamos a verificar si el tipo de archivo es un tipo de imagen permitido.
				//y que el tamano del archivo no exceda los 100kb
				$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png");
				$limite_kb = 50000;

				if (in_array($_FILES['imagen']['type'], $permitidos) && $_FILES['imagen']['size'] <= $limite_kb * 1024){
					//esta es la ruta donde copiaremos la imagen
					//recuerden que deben crear un directorio con este mismo nombre
					//en el mismo lugar donde se encuentra el archivo subir.php
					$ruta = "../../v1/img/anuncios/" . $_FILES['imagen']['name'];
					//comprobamos si este archivo existe para no volverlo a copiar.
					//pero si quieren pueden obviar esto si no es necesario.
					//o pueden darle otro nombre para que no sobreescriba el actual.
					if (!file_exists($ruta)){
						//aqui movemos el archivo desde la ruta temporal a nuestra ruta
						//usamos la variable $resultado para almacenar el resultado del proceso de mover el archivo
						//almacenara true o false
						switch($_FILES['imagen']['type']){
							case 'image/jpg':
							case 'image/jpeg':
								$resultado = imagejpeg(redimensionar_imagen($_FILES['imagen']['tmp_name'], $_FILES['imagen']['type']), $ruta, 95);
								break;
							case 'image/gif':
								$resultado = imagegif(redimensionar_imagen($_FILES['imagen']['tmp_name'], $_FILES['imagen']['type']), $ruta);
								break;
							case 'image/png':
								$resultado = imagepng(redimensionar_imagen($_FILES['imagen']['tmp_name'], $_FILES['imagen']['type']), $ruta, 5);
								break;
						}
						//$resultado = @move_uploaded_file($_FILES["imagen"]["tmp_name"], $ruta);
						if ($resultado){
							$nombre = $_FILES['imagen']['name'];
							mysqli_query($connect, "INSERT INTO img_anuncios (imagen) VALUES ('".$nombre."')") ;
							$imagen= mysqli_insert_id($connect);
						} else {
							echo "ocurrio un error al mover el archivo.";
						}
					} else {
						echo $_FILES['imagen']['name'] . ", este archivo existe";
					}
				} else {
					echo "archivo no permitido, es tipo de archivo prohibido o excede el tamano de $limite_kb Kilobytes";
				}
			}

			if($imagen==0 || $imagen == NULL){
					$imagen = 1;
			}

			$nombre = $_POST['nombre_producto']; 
				$costo = $_POST['costo'];
				$des = $_POST['descripcion'];
				$estable = $_POST['id_estable'];
				$tema = $_POST['id_tematica'];
				$imagen_id = $_POST['id_img_anuncio'];

					
				mysqli_query($connect, "INSERT INTO anuncios(nombre_producto,costo,descripcion,id_estable,id_tematica,id_img_anuncio ) 
								VALUES('".$nombre."','".$costo."','".$des."','".$estable."','".$tema."','".$imagen."')"); /*** execute the insert sql code **/
					echo"<script>window.location.href=\"anuncio.php\"</script>";
			
			endif; 
?>

