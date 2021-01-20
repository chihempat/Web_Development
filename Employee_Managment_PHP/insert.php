<?php
    include "connect.php";
    
    $fn = ($_POST['fname']);
    $mn = ($_POST['mname']);
    $ln = ($_POST['lname']);
    $gen = ($_POST['gender']);
    $age = ($_POST['age']);
    $mail = ($_POST['mail']);
    $ph = ($_POST['phone']);
    $add = ($_POST['address']);  
    $conutry = ($_POST['country']);
    $state = ($_POST['state']);
    $skills = ($_POST['skills']);
    $edu = ($_POST['education']);
    $exp = ($_POST['experience']);

    // $fn=$_GET['fname'];
    // $ln=$_GET['mname'];
    // $ln=$_GET['lname'];
    // $age=$_GET['age'];
    // $gender=$_GET['gender'];
    // $state=$_GET['State'];
    // $mail=$_GET["Mail"];
    // $country=$_GET['Country'];
    // $edu=$_GET['eduction'];
    // $exp=$_GET['Exp'];
    // $skills=$_GET["Skills"];


    $in_res = "INSERT INTO Resume(Firstname, MiddleName, LastName, Gender , Age, Mail, Phone, Address, States, Country,Education,Skills,Experience)
    VALUES ('$fn', '$mn', '$ln', '$gen', '$age', '$mail', '$ph', '$add', '$state', '$conutry', '$edu', '$skills', '$exp')";
    
    if (mysqli_query($conn, $in_res)) {
        $last_id = mysqli_insert_id($conn);
        echo "New record created successfully.<br>";
        echo "Your Resume Id is :" . $last_id;
        
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn) ;
?>
