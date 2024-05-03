<?php

//Required Files 
require_once("admin/database/myparams.inc.php");
require_once("admin/database/config.inc.php");
require_once("admin/utils/UtilsDB.php");
require_once("utilsClient/UtilsDB.php");
require_once("utilsClient/Utils.php");

$database = "ezando";

$checkConn = UtilsClientDB::checkConnection($database);


?>