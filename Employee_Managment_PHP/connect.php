<?php
    //session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db_name = "test";
    try
    {
    $conn = new mysqli($servername,$username,$password);
    
    if(mysqli_error($conn)){
        die("Connection failed: " . mysqli_error($conn));
    }
    $sql="CREATE DATABASE IF NOT EXISTS $db_name";
   
    
    mysqli_query($conn,$sql);

    $conn = new mysqli($servername, $username, $password,$db_name);

    //create Table if not there
    $sql="CREATE TABLE IF NOT EXISTS Resume(
        ResumeID INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(30) NOT NULL,
        MiddleName VARCHAR(30)  NULL,
        LastName VARCHAR(30) NOT NULL,
        Gender CHAR(6) NOT NULL,
        Age INT,
        Mail VARCHAR(20) NOT NULL,
        Phone VARCHAR(15),
        Address VARCHAR(30),
        States VARCHAR(20),
        Country VARCHAR(20),
        Education VARCHAR(30) NOT NULL,
        Skills VARCHAR(100) NOT NULL,
        Experience VARCHAR(50)
        );";

    mysqli_query($conn,$sql);
}
catch(Exception $e)
{
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>
