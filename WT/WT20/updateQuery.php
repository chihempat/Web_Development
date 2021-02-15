 <?php
    include "connect.php";
    try{
        $upd_res = "UPDATE Resume SET FirstName='" .$_POST['fname']. "',MiddleName='" .$_POST['mname']. "',LastName='" .$_POST['lname']. "',Gender='" .$_POST['gender']. "',Age='" .$_POST['age']. "',Mail='" .$_POST['mail']. "',Phone='" .$_POST['phone']. "',Address='" .$_POST['address']. "',Phone='" .$_POST['phone']. "',States='" .$_POST['state']. "',Country='" .$_POST['country']. "',Education='" .$_POST['education']. "',Skills='" .$_POST['skills']. "',Experience='" .$_POST['experience']. "'WHERE ResumeID = ".$_GET['id'] ;
        //$conn->query($upd_res);
        //echo "Record modified successfully";
        if (mysqli_query($conn, $upd_res)) {
            $last_id = mysqli_insert_id($conn);
            echo "Record Updated successfully.<br>";
            
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    
    }
    catch(Exception $e){
        echo "Caught exception:" .$e;
    }
?>
<br><br><a href = "home.html">Back to the home page</a>