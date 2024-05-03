<?php

//Open session
session_start();

//<!-- File Required header  -->
include("includes/header.php");

//<!-- File Required params  -->
include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");


if ($checkConn){

    $tableName = "questions";
    $columnSelect = ["id", "id_author", "title", "description", "pseudo_author", "date_publish"];
    $columnOrder = ["id"];
    $ordingOrientation = "DESC";

    $arrayAllQuestions = UtilsClient::getAllQuestionOfForum($database, $tableName, $columnSelect, $columnOrder, $ordingOrientation);


    if(isset($_GET['search']) && !empty($_GET['search'])){
        
        $userSearch = $_GET['search'];

        $columnClosure = ["title"];

        $operatorClosure = ["LIKE"];
        
        $logicOperator = [""];

        $values = ["%".$userSearch."%"];

        $columnOrder = ["id"];

        $ordingOrientation = "DESC";

        $arrayAllQuestions = UtilsClientDB::getResultWithConditionAndOrding(
            $database,
            $tableName,
            $columnSelect,
            $columnClosure,
            $operatorClosure,
            $logicOperator,
            $columnOrder,
            $ordingOrientation,
            $values
        );
    }

    $num_rows_question = $arrayAllQuestions['rowTotals'];

?>


<div class="py-5">
    <div class="container">

    </div>
</div>



<?php include("includes/footer.php"); ?>


<?php
}else {
    //File Required error page if the database is not connected
    require_once("error-config.php");
} ?>