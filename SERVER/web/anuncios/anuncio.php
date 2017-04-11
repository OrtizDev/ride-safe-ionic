<?php
header('Content-Type: text/html; charset=ISO-8859-1');
?>
<?php include("../conexion.php"); ?>
<!doctype html>
<html lang="es">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png" />
	<link rel="icon" type="image/png" href="../assets/img/favicon.png" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>Radar Biker | Anuncios</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/material-dashboard.css" rel="stylesheet"/>
    <link href="../assets/css/demo.css" rel="stylesheet" />
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>
</head>

<body>

	<div class="wrapper">
	    <div class="sidebar" data-color="purple" data-image="../assets/img/sidebar-1.jpg">
			<div class="logo">
				<a href="#" class="simple-text">
					Radar Biker
				</a>
			</div>

	    	<div class="sidebar-wrapper">
	            <ul class="nav">
	                <li>
	                    <a href="../index.html">
	                        <i class="material-icons">dashboard</i>
	                        <p>Home RS</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../establecimientos/establecimientos.php">
	                        <i class="material-icons">store</i>
	                        <p>Establecimientos</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../facturacion/facturacion.php">
	                        <i class="material-icons">store</i>
	                        <p>Datos de Facturaci&oacuten</p>
	                    </a>
	                </li>
	                <li class="active"> 
	                    <a href="anuncio.php">
	                        <i class="material-icons">loyalty</i>
	                        <p>Anuncios</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../rutas/rutas.php">
	                        <i class="material-icons">motorcycle</i>
	                        <p>Nuestras Rutas</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../pueblos/pueblos.php">
	                        <i class="material-icons">flare</i>
	                        <p>Pueblos M&aacutegicos</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../marca_moto/marca.php">
	                        <i class="material-icons">new_releases</i>
	                        <p>Marcas de Motos</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../modelo_moto/modelo.php">
	                        <i class="material-icons">stars</i>
	                        <p>Modelo de Motos</p>
	                    </a>
	                </li>
	            </ul>
	    	</div>
		</div>

	    <div class="main-panel">
			<nav class="navbar navbar-transparent navbar-absolute">
				<div class="container-fluid">
					<div class="collapse navbar-collapse">
						<ul class="nav navbar-nav navbar-right">
							<li>
								<a href="alta_anuncio.php">
									<i class="material-icons">note_add</i>
									<p class="hidden-lg hidden-md">A&ntildeadir Anuncio</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

	        <div class="content">
	            <div class="container-fluid">
	                <div class="row">
	                    <div class="col-md-12">
	                        <div class="card">
	                            <div class="card-header" data-background-color="purple">
	                                <h4 class="title">Nuestros Anuncios</h4>
	                                <p class="category">Mostramos la informaci&oacuten general de los Anuncios de Motocicletas</p>
	                            </div>
	                            <div class="card-content table-responsive">
	                                <table class="table" align="center">
	                                    <thead class="text-primary">
	                                    	<th>Nombre</th>
	                                    	<th>Costo</th>
	                                    	<th>Descipci&oacuten</th>
	                                    	<th>Establecimiento</th>
	                                    	<th>Tem&aacutetica</th>
	                                    	<th>Imagen</th>
	                                    	<th>Opciones</th>
	                                    </thead>
	                                    <tbody>
	                                    <?php
	                                     $result = mysqli_query($connect, "SELECT id_anuncio, nombre_producto, costo, descripcion, establecimiento.nombre AS A, tematica.nombre AS B, img_anuncios.imagen AS C FROM anuncios INNER JOIN establecimiento on anuncios.id_estable = establecimiento.id_estable INNER JOIN tematica on anuncios.id_tematica = tematica.id_tematica INNER JOIN img_anuncios on anuncios.id_img_anuncio = img_anuncios.id_img_anuncio");

	                                    while($data = mysqli_fetch_assoc($result) ):
	                                    ?>	                                    
	                                        <tr align="center">
	                                        	<td><?php echo $data['nombre_producto'] ?></td>
	                                        	<td>$ <?php echo $data['costo'] ?></td>
	                                        	<td><?php echo $data['descripcion'] ?></td>
	                                        	<td><?php echo $data['A'] ?></td>
	                                        	<td><?php echo $data['B'] ?></td>
	                                        	<td><?php echo $data['C'] ?></td>
												<td><a href="act_anuncio.php?id_anuncio=<?php echo $data['id_anuncio'] ?>">
													<i class="material-icons">edit</i>
													</a>
													<a href="eliminar_anuncio.php?id_anuncio=<?php echo $data['id_anuncio'] ?>" onclick="return confirmation()">
													<i class="material-icons">delete</i>
													</a>
												</td>
	                                        </tr>
	                                         <?php
	                                         endwhile;
	                                         ?>
	                                    </tbody>
	                                </table>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <footer class="footer">
	            <div class="container-fluid">
	                <p class="copyright pull-right">
	                    &copy; <script>document.write(new Date().getFullYear())</script> <a href="http://startbluesoft.com/">Startbluesoft</a></p>
	            </div>
	        </footer>
	    </div>
	</div>

</body>
	<script src="../assets/js/jquery-3.1.0.min.js" type="text/javascript"></script>
	<script src="../assets/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="../assets/js/material.min.js" type="text/javascript"></script>
	<script src="../assets/js/chartist.min.js"></script>
	<script src="../assets/js/bootstrap-notify.js"></script>
	<script src="../assets/js/material-dashboard.js"></script>
	<script src="../assets/js/demo.js"></script>
</html>