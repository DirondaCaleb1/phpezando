<?php


//File Required is to connect in database and use the methods of class Utils, UtilsDB and UtilsAdminDB
require_once("./database/myparams.inc.php");
require_once("./database/config.inc.php");
require_once("./utils/UtilsDB.php");
require_once("./utils/utils.php");
require_once('./utils/utilsAdminDB.php');

if (isset($_SESSION["auth"])) { //If the session auth exists
    if($_SESSION['role_as'] != 1){ //If the user isn't administrator 
      $url = '../index.php';
      $message = "Vous n'êtes pas autorisés à accéder à cette page";
      Utils::redirect($url, $message); //Redirect to home page (index.php)      
    }
} else {
    $url = '../login.php';
    $message = "Veuillez vous conecter pour continuer";
    Utils::redirect($url, $message); //Redirect to login page (login.php)
}


?>