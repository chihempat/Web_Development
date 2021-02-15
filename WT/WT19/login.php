<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family:Helvetica, sans-serif
        }
    </style>
</head>
<body>
    <h3>
 <p>   
<form   method="get" name="f1">
    <b>Username  : </b><input type="text" name="user" value="User123"><br>
    <b>Password  : </b><input type="password" name="pass" value="Pass123"><br><br>
    <input type="submit" name="submit" value="Submit">
</form>
</p>

<?php
session_start();


$_SESSION["user"]=$_GET["user"];
$_SESSION["password"]=$_GET["pass"];
echo "Sessions variable will be set once you submit<br>";
echo "Reload the page after Submitting <br>";
echo  "Welcome ".$_SESSION["user"];
ECHO '<BR>';
echo  "Your password is ".$_SESSION["password"];
 ?> 
 
 </h3>

</body>
</html>