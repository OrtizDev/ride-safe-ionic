<?php
header('Content-Type: text/html; charset=ISO-8859-1');
?>
<?php include("../conexion.php"); ?>
<!doctype html>
<html lang="es">
<head>
	<meta charset="utf-8" />
	<link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png" />
	<link rel="icon" type="image/png" href="../assets/img/favicon.png" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>Radar Biker | Establecimiento</title>

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
	    <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-1.jpg">
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
	                <li  class="active">
	                    <a href="establecimientos.php">
	                        <i class="material-icons">store</i>
	                        <p>Establecimientos</p>
	                    </a>
	                </li>
	                <li  class="active">
	                    <a href="../facturacion/facturacion.php">
	                        <i class="material-icons">store</i>
	                        <p>Datos de Facturaci&oacuten</p>
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
								<a href="alta_establecimiento.php">
									<i class="material-icons">note_add</i>
									<p class="hidden-lg hidden-md">Añadir nuevo establecimiento</p>
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
	                                <h4 class="title">Nuestros Aliados</h4>
	                                <p class="category">Mostramos la informaci&oacuten general de los establecimientos</p>
	                            </div>
	                            <div class="card-content table-responsive">
	                                <table class="table">
	                                    <thead class="text-primary">
	                                    	<th>Nombre</th>
	                                    	<th>Direcci&oacuten</th>
											<th>Tel&eacutefono</th>
											<th>Descripci&oacuten Producto</th>
											<th>Descripci&oacuten Negocio</th>
											<th>Status</th>
											<th>Tipo de venta</th>
											<th>Opciones</th>
	                                    </thead>
	                                    <tbody>
	                                    <?php
	                                    $result = mysqli_query($connect, "SELECT * FROM establecimiento");

	                                    while($data = mysqli_fetch_assoc($result) ):
	                                    ?>	                                    
	                                        <tr align="center">
	                                        	<td><?php echo $data['nombre'] ?></td>
												<td><?php echo $data['direccion'] ?></td>
												<td><?php echo $data['telefono'] ?></td>
												<td><?php echo $data['des_producto'] ?></td>
												<td><?php echo $data['des_compra'] ?></td>
												<td><?php echo $data['estado'] ?></td>
												<td><?php echo $data['tipo_venta'] ?></td>
												<td><a href="act_establecimiento.php?id_estable=<?php echo $data['id_estable'] ?>">
													<i class="material-icons">edit</i>
													</a>
													<a href="eliminar_establecimiento.php?id_estable=<?php echo $data['id_estable'] ?>" onclick="return confirmation()">
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
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
	<script src="../assets/js/material-dashboard.js"></script>
	<script src="../assets/js/demo.js"></script>
</html>