<?php

if (!isset($_SESSION["auth"])) { //If user is not connected
    //header('Location: login.php');
    $url = "login.php";

    UtilsClient::redirectByClient($url, 'Veuillez vous connecter pour continuer !');
}

?>