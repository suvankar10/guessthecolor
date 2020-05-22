<?php
date_default_timezone_set('Asia/Kolkata');
session_start();
include('db_config.php');

if($_POST && !empty($_POST['user_name'])){
//user data---------------------------------
    $_SESSION['user_name'] = $_POST['user_name'];
    $_SESSION['user_id'] = uniqid();
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
     echo FALSE;//for database connection error
    }

    $sql = "INSERT INTO User_Data (USER_ID, USER_NAME) VALUES ('".$_SESSION['user_id']."','".$_SESSION['user_name']."')";

    if ($conn->query($sql) === TRUE) {
      echo TRUE;//if query successfully executed
    } else {
     echo FALSE;//if query execution is unsuccessful
    }

    $conn->close();


}else{
    echo FALSE;//if encounter a post error
}

?>
