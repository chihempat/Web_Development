<?php
    include "connect.php";
    $sql = "DELETE FROM Resume WHERE ResumeID = " .$_GET['id'];
    if(mysqli_query($conn,$sql) === true)
        echo "Record with ID = " .$_GET['id']. " deleted successfully";
    else 
        echo"<br>Error: " .mysqli_error($conn);
    $conn->close();
?>
<br><div align="center"><a href="home.html">Back to Home Page</a></div>
