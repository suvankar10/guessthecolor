<?php
session_start();
include('db_config.php');

if($_POST && !empty($_POST['round']) && (!empty($_POST['credit']) || !empty($_POST['debit'])) && isset($_SESSION['user_id'])){

  
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
     echo FALSE;
    }
    if(!empty($_POST['credit'])){
        $sql = "UPDATE User_Data set ROUND='".$_POST['round']."',SCORE=SCORE+2 where USER_ID='".$_SESSION['user_id']."'";

    }
    else if(!empty($_POST['debit'])){
        $sql = "UPDATE User_Data set ROUND='".$_POST['round']."',SCORE=SCORE-1 where USER_ID='".$_SESSION['user_id']."'";

    }

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
