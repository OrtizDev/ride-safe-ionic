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
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Radar Biker | Alta Establecimiento</title>

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
	    <?php 
	    	$result = mysqli_query($connect, "SELECT * FROM establecimiento");
	    	$data = mysqli_fetch_assoc( $result );
		?>
		<?php 
	    	$result2 = mysqli_query($connect, "SELECT * FROM tematica");
	    	$data = mysqli_fetch_assoc( $result2 );
		?>
	    <div class="main-panel">
	        <div class="content">
	            <div class="container-fluid">
	                <div class="row">
	                    <div class="col-md-12">
	                        <div class="card">
	                            <div class="card-header" data-background-color="purple">
	                                <h4 class="title">A&ntildeadir Anuncio</h4>
									<p class="category">Completa la siguiente informaci&oacuten del anuncio</p>
	                            </div>
	                            <div class="card-content">
	                                <form action="insert.php" method="post" enctype="multipart/form-data">
	                                    <div class="row">
	                                        <div class="col-md-5">
												<div class="form-group label-floating">
													<label class="control-label">Nombre del Producto: </label>
													<input type="text" class="form-control" name="nombre_producto" required="Este campo es requerido">
												</div>
	                                        </div>
	                                        <div class="col-md-5">
												<div class="form-group label-floating">
													<label class="control-label">Costo: </label>
													<input type="number" class="form-control" name="costo" required="Este campo es requerido">
												</div>
	                                        </div>
	                                    </div>
	                                    <div class="row">
	                                    	<div class="col-12">
												<div class="form-group label-floating">
													<label class="control-label">Descripci&oacuten del producto: </label>
													<input type="text" class="form-control" name="descripcion" required="Este campo es requerido">
												</div>
	                                        </div>
	                                    </div>
	                                    <div class="row">
	                                    <div class="col-md-6">
												<div class="form-group label-floating">
	                                        		<label class="control-label">Establecimiento al que pertenece: </label>
													<select name="id_estable" class="form-control">
													<?php
													while ($valores3 = mysqli_fetch_array($result)) {
													echo '<option value="'.$valores3[id_estable].'">'.$valores3[nombre].'</option>';
													}
													?>
													</select>
												</div>
	                                        </div>
	                                        <div class="col-md-6">
	                                        	<div class="form-group label-floating">
	                                        		<label class="control-label">Tem&aacutetica a la que pertenece: </label>
													<select name="id_tematica" class="form-control">
														<?php
															while ($valores2 = mysqli_fetch_array($result2)) {
															echo '<option value="'.$valores2[id_tematica].'">'.$valores2[nombre].'</option>';
														}
														?>
													</select>
												</div>
	                                        </div>
	                                    </div>
	                                    <div class="row">
	                                    	<label class="control-label">Foto del producto: </label>
	                                    	<input type="file" name="imagen" id="imagen" />
	                                    <button type="submit"  name="create" class="btn btn-success pull-right">Registrar Anuncio</button>
	                                    <div class="clearfix"></div>
	                                </form>
	                            </div>
	                        </div>
	                    </div>
	            </div>
	        </div>

	        <footer class="footer">
	            <div class="container-fluid">
	                <p class="copyright pull-right">
	                    &copy; <script>document.write(new Date().getFullYear())</script> <a href="http://www.startbluesoft.com">Startbluesoft</a>
	                </p>
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
