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
        <form method="get">
            <div class="form-group row">
                <div class="col-8">
                    <input type="search" name="search" class="form-control" />
                </div>
                <div class="col-4">
                    <button class="btn btn-success">Rechercher</button>
                </div>
            </div>
        </form>
        <br>
        <?php
            if($num_rows_question >0){
              $arrayResult = $arrayAllQuestions["result"];

              foreach ($arrayResult as $item) {
        ?>
        <div class="card">
            <div class="card-header">
                <a href="article.php?id=<?=$item[0] ?>">
                    <?= $item[2] ?>
                </a>
            </div>
            <div class="card-body">
                <?= $item[3]  ?>
            </div>
            <div class="card-footer">
                Publié(e) par <?= $item[4]  ?> le <?= $item[5]  ?>
            </div>
        </div>
        <br>
        <?php
              }
            }
        
        ?>
    </div>
</div>



<?php include("includes/footer.php"); ?>


<?php
}else {
    //File Required error page if the database is not connected
    require_once("error-config.php");
} ?>