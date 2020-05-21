<?php
session_start();
include('db_config.php');

if(isset($_SESSION['user_id'])){

  
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
     echo -99;//for connection error
    }
    $sql = "select SCORE as score from User_Data where USER_ID='".$_SESSION['user_id']."'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        if($row = $result->fetch_assoc()) {
            echo $row['score'];
        }
    } else {
        echo -99;//for no entry in table
    }

    $conn->close();


}else{
    echo -99;//if current session is lost
}

?>
