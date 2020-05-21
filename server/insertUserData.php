<?php
session_start();
include('db_config.php');

if($_POST && !empty($_POST['user_name'])){

    $_SESSION['user_name'] = $_POST['user_name'];
    $_SESSION['user_id'] = uniqid();
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
     echo FALSE;
    }

    $sql = "INSERT INTO User_Data (USER_ID, USER_NAME) VALUES ('".$_SESSION['user_id']."','".$_SESSION['user_name']."')";

    if ($conn->query($sql) === TRUE) {
      echo TRUE;
    } else {
     echo FALSE;
    }

    $conn->close();


}else{
    echo FALSE;
}

?>
