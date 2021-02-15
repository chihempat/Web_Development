<?php
    include "connect.php";
    $sel_res= "SELECT * FROM Resume WHERE ResumeID = ". $_GET['id'];
    //$result = $conn->query($sel_res);
    $result = mysqli_query($conn,$sel_res);
    $row_res = mysqli_fetch_array($result); 
?>
<html>
<head><title>Resume</title>
    
</head>
<body>
    <header><h2 align="center">Resume</h2></header>
    <form name="update" method="post" action="updateQuery.php?id= <?php echo $row_res['ResumeID']?>">
    <fieldset>
            <legend><b>Details</b></legend>
            <table width="100%">
                <tr><td>First Name<br><input type="text" name="fname" value="<?php echo $row_res['FirstName']?>"></td>
                    <td>Middle Name<br><input type="text" name="mname" value="<?php echo $row_res['MiddleName']?>"></td>
                    <td>Last Name<br><input type="text" name="lname" value="<?php echo $row_res['LastName']?>"></td>
                </tr>
                <tr colspan="3"></tr>
                <tr><td>Gender<br><input type="radio" name="gender" value="male" <?php echo ($row_res['Gender'] == 'male')     ? "checked" : ""?> >Male
                    <input type="radio" name="gender" value="female" <?php echo ($row_res['Gender'] == 'female') ? "checked" :     ""?>>Female</td>
                    <td>Age<br><input type="text" name="age" value="<?php echo $row_res['Age']?>"></td>
                    <td>Email Address<br><input type="email" name="mail" value="<?php echo $row_res['Mail']?>"></td>
                </tr>
                <tr colspan="3"></tr>
                <tr><td>Phone Number<br><input type="text" name="phone" maxlength="10" value="<?php echo $row_res['Phone']?>"></td>
                </tr>
                <tr colspan="3"></tr>
                <tr>
                    <td>Address<br><input type="text" name="address" size="35" value="<?php echo $row_res['Address']?>"></td>
                    <td>State<br><input type="Text" name="state" size="35" value="<?php echo $row_res['States']?>"></td>
                    <td>Country<br><input type="Text" name="country" size="35" value="<?php echo $row_res['Country']?>"></td>
                </tr>
            </table>
        </fieldset>
        <fieldset>
            <legend><b>Skill-Set</b></legend>
            <table width="100%">
                
                <tr colspan="3"></tr>
                <tr>
                <td><br>Education<br><textarea id="edu" name="education" cols="50" rows="10" ><?php echo $row_res['Education']?></textarea></td>
                <td><br>Skills<br><textarea id="ski" name="skills" cols="50" rows="10" > <?php echo $row_res['Skills']?></textarea></td>
                <td><br>Experience<br><textarea id="exp" name="experience" cols="50" rows="10"> <?php echo $row_res['Experience']?></textarea></td>
                </tr>
                
            </table> 
        </fieldset><br><br>
        <div align="center">
            <input type="submit" value="Update">
            <input type="reset" value="Reset">
        </div>
    </form>
    
</body>
</html>