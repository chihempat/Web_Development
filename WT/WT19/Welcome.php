<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>
    <?php
    session_start();
    
 
    if(isset($_SESSION['user'])) 
    {
     echo "Welcome ". $_SESSION['user'];
     echo "<br>Your Password is ". $_SESSION['password'];
    }
    else
    {
        echo "Waiting ...";
    }
    ?>
    </h3>
</body>
</html>