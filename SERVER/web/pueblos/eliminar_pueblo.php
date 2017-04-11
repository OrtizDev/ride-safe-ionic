<?php include("../conexion.php"); ?>

<?php

$id =$_GET['id_pueblo'];
mysqli_query($connect, "DELETE FROM pueblos_magicos where id_pueblo = '".$id."'"); /** execute the sql delete code **/
echo"<script>window.location.href=\"pueblos.php\"</script>";

?>