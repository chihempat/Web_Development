<?php
    include "connect.php";
    $sel = "SELECT ResumeID,FirstName,LastName,Mail FROM Resume";
    $res = mysqli_query($conn,$sel);
    echo "<center>";
    if(mysqli_num_rows($res)>0){
        echo "<table width=35%><tr><td>ID</td>
                         <td>First Name</td>
                         <td>Last Name</td>
                         <td>Mail</td>
                     </tr>";
        while($row = mysqli_fetch_assoc($res)){
            echo "<tr><td><a href='show.php?id=" .$row['ResumeID']. "'>" . $row['ResumeID']. "</a></td>
                      <td>" .$row['FirstName']. "</td>
                      <td>" .$row['LastName']. "</td>
                      <td>" .$row['Mail']. "</td>
                      <td><a href='updateShow.php?id=" .$row['ResumeID']. "'><img src='https://www.freeiconspng.com/uploads/edit-png-icon-blue-pencil-18.png' width=30 height=30 alt='Edit'></a></td>
                      <td><a href='deleteConfirm.html?id=" .$row['ResumeID']. "'><img src='https://helpdeskgeek.com/wp-content/pictures/2019/08/delete-768x512.png.webp' width=40 height=25 alt='Delete'></a></td>
                  </tr>";
        }
        echo "</table>";
        echo"</center>";
    }
    
?>