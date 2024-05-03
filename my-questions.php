<?php

//Open session
session_start();

//<!-- File Required header  -->
include("includes/header.php");

//<!-- File Required params  -->
include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");


if ($checkConn) {

    $userId = $_SESSION['auth_user']['user_id'];
    $tableName = "questions";
    $columnSelect =["id", "title", "description"];
    $columnClosure = ["id_author"];
    $operatorsClosure = ["="];
    $logicOperator = [""];
    $valuesSelect = [$userId];

    //Associative Array contains the result of SELECT query and the total number of rows of the result SELECT query
    $allQuestionArray = UtilsClientDB::getResultWithCondition(
        $database,
        $tableName,
        $columnSelect,
        $columnClosure,
        $operatorsClosure,
        $logicOperator,
        $valuesSelect
    );

    //Array of the result of query SELECT
    $arrayResultQuestions = $allQuestionArray["result"];

    //Number of rows of result query SELECT
    $num_row_quest = $allQuestionArray["rowTotals"];




?>


<div class="py-5">
    <div class="container" id="questions">
        <?php if ($num_row_quest >0) { ?>
        <?php 
                     $j = $num_row_quest-1;

                     while ($j >=0) {
                         ?>
        <div class="card">
            <h5 class="card-header">
                <a href="article.php?id=<?=$arrayResultQuestions[$j][0] ?>">
                    <?= $arrayResultQuestions[$j][1] ?>
                </a>
            </h5>
            <div class="card-body">
                <p class="card-text"><?= $arrayResultQuestions[$j][2] ?></p>
                <a href="article.php?id=<?=$arrayResultQuestions[$j][0] ?>" class="btn btn-primary">Acceder à la
                    question</a>
                <a href="edit-question.php?id=<?= $arrayResultQuestions[$j][0] ?>" class="btn btn-warning">Modifier la
                    question</a>
                <button class="btn btn-danger delete-question-btn" value="<?= $arrayResultQuestions[$j][0] ?>">Supprimer
                    la
                    question</button>
            </div>

        </div>
        <br>

        <?php
                       $j--;
                     }
                
            ?>
        <?php 
                 }else {
            echo "Aucune Question !";
                 } ?>
    </div>
</div>



<?php include("includes/footer.php"); ?>


<?php
}else {
    //File Required error page if the database is not connected
    require_once("error-config.php");
} ?>