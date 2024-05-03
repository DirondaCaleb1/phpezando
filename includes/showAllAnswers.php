<?php



$tableNameAnswers = "answers";

$columnSelectedAnswers = ["id_author", "pseudo_author", "id_question", "content"];

$columnClosureAnswers = ["id_question"];

$operatorClosureAnswers = ["="];

$logicOperatorAnswers = [""];

$valuesSelectAnswers = [$idOfQuestion];

$columnOrderAnswers = ["id"];

$ordingOrientationAnswers = "DESC";

$getAllAnswerThisQuestionAnswerArray = UtilsClientDB::getResultWithConditionAndOrding(
    $database,
    $tableNameAnswers,
    $columnSelectedAnswers,
    $columnClosureAnswers,
    $operatorClosureAnswers,
    $logicOperatorAnswers,
    $columnOrderAnswers,
    $ordingOrientationAnswers,
    $valuesSelectAnswers
);
$getAllAnswerThisQuestionAnswer = $getAllAnswerThisQuestionAnswerArray["result"];

$num_row_answer_this_question = $getAllAnswerThisQuestionAnswerArray["rowTotals"];



?>