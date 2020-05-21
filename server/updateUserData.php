<?php
session_start();
include('db_config.php');

if($_POST && !empty($_POST['round']) && (!empty($_POST['credit']) || !empty($_POST['debit'])) && isset($_SESSION['user_id'])){

  
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
     echo FALSE;//for database connection error
    }
    if(!empty($_POST['credit'])){//for correct answer score credited by 2
        $sql = "UPDATE User_Data set ROUND='".$_POST['round']."',SCORE=SCORE+2 where USER_ID='".$_SESSION['user_id']."'";

    }
    else if(!empty($_POST['debit'])){//for incorrect answer score debited by 1
        $sql = "UPDATE User_Data set ROUND='".$_POST['round']."',SCORE=SCORE-1 where USER_ID='".$_SESSION['user_id']."'";

    }

    if ($conn->query($sql) === TRUE) {
      echo TRUE;//if query executed successfully
    } else {
     echo FALSE;//if query execution is unsuccessful
    }

    $conn->close();


}else{
    echo FALSE;//if current session is lost or we encounter post error
}

?>
