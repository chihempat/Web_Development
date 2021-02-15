<?php
    include "connect.php";
    $sel_res = "SELECT * FROM Resume WHERE ResumeID = ". $_GET['id'];
    $result = mysqli_query($conn,$sel_res);
    $row_res= mysqli_fetch_array($result);
   
?>
<html>
<head><title>RESUME DETAILS</title>
</head>
<body>
    <header><h2 align="center">Resume</h2></header>
    <fieldset>
            <legend><b>Details</b></legend>
            <table width="100%">
                <tr><td>First Name<br><?php echo $row_res['FirstName']?></td>
                    <td>Middle Name<br><?php echo $row_res['MiddleName']?></td>
                    <td>Last Name<br><?php echo $row_res['LastName']?></td>
                </tr>
              
                <tr><td>Gender<br><?php echo $row_res['Gender']?></td>
                    <td>Age<br><?php echo $row_res['Age']?></td>
                    <td>Email Address<br><?php echo $row_res['Mail']?></td>
                </tr>
           
                <tr>
                    <td>Phone Number<br><?php echo $row_res['Phone']?></td>
                </tr>
              
                <tr>
                    <td>Address<br><?php echo $row_res['Address']?></td>
                    <td>State<br><?php echo $row_res['States']?></td>
                    <td>Country<br><?php echo $row_res['Country']?></td>
                </tr>
            </table>
        </fieldset>
        <fieldset>
            <legend><b>Skill-Set</b></legend>
            <table  width="100%">
             <tr>
               <td>Eduction<br><?php echo $row_res['Education']?></td>
               <td>Skills<br><?php echo $row_res['Skills']?></td>
               <td>Experience<br><?php echo $row_res['Experience']?></td>
             </tr>  
            </table>
        </fieldset><br><br>
        <div align="center">
            <a href = "home.html">Back to Home Page</a>
        </div>
</body>
</html>