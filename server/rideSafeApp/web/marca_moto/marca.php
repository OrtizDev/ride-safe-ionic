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

	<title>Road Safe | Marca de Motocicletas</title>

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
					Road Safe
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
	                <li class="active">
	                    <a href="marca.php">
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
								<a href="alta_marca.php">
									<i class="material-icons">note_add</i>
									<p class="hidden-lg hidden-md">A&ntildeadir marca de moto</p>
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
	                            <div class="card-header" data-background-color="blue">
	                                <h4 class="title">Nuestras Marcas de Motocicletas</h4>
	                                <p class="category">Mostramos la informaci&oacuten general de las Marcas de Motocicletas</p>
	                            </div>
	                            <div class="card-content table-responsive">
	                                <table class="table" align="center">
	                                    <thead class="text-primary">
	                                    	<th>Id</th>
	                                    	<th>Nombre</th>
	                                    	<th>Opciones</th>
	                                    </thead>
	                                    <tbody>
	                                    <?php
	                                    $result = mysqli_query($connect, "SELECT * FROM marcas_moto");

	                                    while($data = mysqli_fetch_assoc($result) ):
	                                    ?>	                                    
	                                        <tr align="center">
	                                        	<td><?php echo $data['id_marca_moto'] ?></td>
	                                        	<td><?php echo $data['nombre'] ?></td>
												<td><a href="act_marca.php?id_marca_moto=<?php echo $data['id_marca_moto'] ?>">
													<i class="material-icons">edit</i>
													</a>
													<a href="eliminar_marca.php?id_marca_moto=<?php echo $data['id_marca_moto'] ?>" onclick="return confirmation()">
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