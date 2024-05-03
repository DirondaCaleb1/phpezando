<?php


//Open session
session_start();

if(isset($_SESSION['auth'])){ //If the session auth exists

    unset($_SESSION['auth']); //Truncate the value containing in the $_SESSION['auth']
    unset($_SESSION['auth_user']); //Truncate the value containing in the $_SESSION['auth_user']

    $_SESSION["message"] = "Déconnecté avec succès"; //Logout message

}

header("Location: index.php"); //Redirect to index.php 


?>