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

    if(!isset($_GET['id']) || empty($_GET['id']) || !is_numeric($_GET['id'])){
        echo "Aucune question n'a été trouvée";
        die();
    }


    $idOfQuestion = $_GET['id'];


    $columnSelectedCheckId = ["*"];
    $tableNameCheckId = "questions";
    $columnClosureCheckId = ["id"];
    $operatorClosureCheckId = ["="];
    $logicOperatorCheckId = [""];
    $valuesSelectCheckId = [$idOfQuestion];

    $checkIfQuestionArray = UtilsClientDB::getResultWithCondition(
        $database,
        $tableNameCheckId,
        $columnSelectedCheckId,
        $columnClosureCheckId,
        $operatorClosureCheckId,
        $logicOperatorCheckId,
        $valuesSelectCheckId
    );

    $num_row_checkId = $checkIfQuestionArray["rowTotals"];

    if($num_row_checkId <=0){
        echo "Aucune question n'a été trouvée";
        die();
    }


    $questionInfoArray = $checkIfQuestionArray["result"];

    $questionId = $questionInfoArray[0][0];
    $questionTitle = $questionInfoArray[0][1];
    $questionContent = $questionInfoArray[0][3];
    $questionId_author = $questionInfoArray[0][4];
    $questionPseudo_author = $questionInfoArray[0][5];
    $questionPublish_date = $questionInfoArray[0][6];



    require("includes/showAllAnswers.php");

    var_dump($getAllAnswerThisQuestionAnswerArray);


?>


<div class="py-5">
    <div class="container">

        <section class="show-content">
            <h3 class="fw-bold"><?= $questionTitle ?></h3>
            <hr />
            <p><?= $questionContent ?></p>
            <hr />
            <small><?=$questionPseudo_author. " ".$questionPublish_date ?></small>
        </section>
        <br>
        <section class="show-answers">
            <form class="form-group" action="server/forms/client/forum-action.php" method="post">
                <div class="mb-3">
                    <label class="form-label">Réponse : </label>
                    <textarea class="form-control" name="answer"></textarea>
                    <input type="hidden" name="id_question" value="<?= $questionId ?>">
                    <button type="submit" class="btn btn-primary mt-2" name="answer_btn"> Répondre </button>
                </div>
            </form>

            <?php
               
               if ($num_row_answer_this_question >0) {
                 foreach ($getAllAnswerThisQuestionAnswer as $answer) {      
            ?>
            <div class="card mb-3">
                <div class="card-header">
                    <?= $answer[1] ?>
                </div>
                <div class="card-body">
                    <?= $answer[3] ?>
                </div>
            </div>

            <?php
                 }
               }
            ?>
        </section>
    </div>
</div>



<?php include("includes/footer.php"); ?>


<?php
}else {
    //File Required error page if the database is not connected
    require_once("error-config.php");
} ?>