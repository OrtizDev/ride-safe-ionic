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

	<title>Radar Biker | Alta Datos de Facturación</title>

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
	                        <p>Home RB</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="../establecimientos/establecimientos.php">
	                        <i class="material-icons">store</i>
	                        <p>Establecimientos</p>
	                    </a>
	                </li>
	                <li class="active">
	                    <a href="facturacion.php">
	                        <i class="material-icons">new_releases</i>
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
	    <?php 
	    	$result = mysqli_query($connect, "SELECT * FROM establecimiento");
	    	$data = mysqli_fetch_assoc( $result );
	    	$result2 = mysqli_query($connect, "SELECT * FROM estado");
	    	$data2 = mysqli_fetch_assoc( $result2 );
	    	$result3 = mysqli_query($connect, "SELECT * FROM municipios");
	    	$data3 = mysqli_fetch_assoc( $result3 );
		?>

	    <div class="main-panel">
	        <div class="content">
	            <div class="container-fluid">
	                <div class="row">
	                    <div class="col-md-12">
	                        <div class="card">
	                            <div class="card-header" data-background-color="blue">
	                                <h4 class="title">A&ntildeadir Datos de Facturaci&oacuten</h4>
									<p class="category">Completa la siguiente informaci&oacuten de los establecimientos</p>
	                            </div>
	                            <div class="card-content">
	                                <form action="insert.php" method="post" >
	                                    <div class="row">
	                                        <div class="col-md-4">
												<div class="form-group label-floating">
													<label class="control-label">Negocio al que pertenece: </label>
													<select name="id_estable" class="form-control">
													<?php
													while ($valores = mysqli_fetch_array($result)) {
													echo '<option value="'.$valores[id_estable].'">'.$valores[nombre].'</option>';
													}
													?>
													</select>
												</div>
	                                        </div>
	                                        <div class="col-md-4">
												<div class="form-group label-floating">
													<label class="control-label">Nombre F&iacutescal: </label>
													<input type="text" class="form-control" name="nom_legal" required="Este campo es requerido">
												</div>
	                                        </div>
	                                        <div class="col-md-4">
												<div class="form-group label-floating">
													<label class="control-label">RFC: </label>
													<input type="text" class="form-control" name="RFC" required="Este campo es requerido" minlength="13">
												</div>
	                                        </div>
	                                    </div>
	                                    <div class="row">
	                                        <div class="col-md-12">
												<div class="form-group label-floating">
													<label class="control-label">Direcci&oacuten F&iacutescal: </label>
													<input type="text" class="form-control" name="direccion_fis" required="Este campo es requerido">
												</div>
	                                        </div>
	                                    </div>
	                                    <div class="row">
	                                        <div class="col-md-4">
												<div class="form-group label-floating">
													<label class="control-label">Estado: </label>
													<select name="id_estado" class="form-control">
													<?php
													while ($valores2 = mysqli_fetch_array($result2)) {
													echo '<option value="'.$valores2[id_estado].'">'.$valores2[nombre].'</option>';
													}
													?>
													</select>
												</div>
	                                        </div>
	                                        <div class="col-md-4">
												<div class="form-group label-floating">
													<label class="control-label">Municipio: </label>
													<select name="id_municipio" class="form-control">
													<?php
													while ($valores3 = mysqli_fetch_array($result3)) {
													echo '<option value="'.$valores3[id_municipio].'">'.$valores3[nombre].'</option>';
													}
													?>
													</select>
												</div>
	                                        </div>
	                                        <div class="col-md-4">
												<div class="form-group label-floating">
													<label class="control-label">CP : </label>
													<input type="number" class="form-control" name="cp" required="Este campo es requerido">
												</div>
	                                        </div>                                        
	                                    </div>
	                                    <div class="row">
	                                    	<div class="col-md-6">
												<div class="form-group label-floating">
													<label class="control-label">Nombre(s) del representante legal: </label>
													<input type="text" class="form-control" name="nom_representante" required="Este campo es requerido">
												</div>
	                                        </div>
	                                        <div class="col-md-6">
												<div class="form-group label-floating">
													<label class="control-label">Tel&eacutefono: </label>
													<input type="number" class="form-control" name="tel_contacto" required="Este campo es requerido">
												</div>
	                                        </div>
	                                    </div>
	                                    <button type="submit" name="enviar" class="btn btn-info pull-right">Registrar Datos de Facturaci&oacuten</button>
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
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
	<script src="../assets/js/material-dashboard.js"></script>
	<script src="../assets/js/demo.js"></script>
</html>
