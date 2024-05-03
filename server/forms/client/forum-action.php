<?php

    //Open session
    session_start();

    //File required
    require_once("../../../admin/database/myparams.inc.php");
    require_once("../../../admin/database/config.inc.php");
    require_once("../../../admin/utils/UtilsDB.php");
    require_once("../../../utilsClient/UtilsDB.php");
    require_once("../../../utilsClient/Utils.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);

if ($checkConn) {
    if(isset($_SESSION['auth']))
    { //If user is connected
      if(isset($_POST['publish_question'])){
        
        $title_question = htmlentities(strip_tags($_POST["title"])); //Title of question
        $description_question = nl2br(htmlentities(strip_tags($_POST["description"]))); //Description of question
        $content_question = nl2br(htmlentities(strip_tags($_POST["content"]))); //Content of question
        $date_question = date("d/m/Y"); //Date of question
        $id_author_question = $_SESSION['auth_user']['user_id']; //id of question author 
        $pseudo_author_question = $_SESSION['auth_user']['name']; //name of question author 

        if(
           !empty($title_question) && 
           !empty($description_question) && 
           !empty($content_question)
        ){
            //TableName Questions
            $tableNameQuestions = "questions";

            //Column to Insert	
            $columnInsertQst = [
                "title",
                "description",
                "content",
                "id_author",
                "pseudo_author",
                "date_publish",
            ];

            //Values to insert
            $valuesInsertQst = [
                $title_question,
                $description_question,
                $content_question,
                $id_author_question,
                $pseudo_author_question,
                $date_question
            ];

            $insertQst = UtilsClientDB::insertDataByClient(
                $database,
                $tableNameQuestions,
                $columnInsertQst,
                $valuesInsertQst
            );

            if($insertQst){
               $message = "Votre question a bien été publiée avec succès";
               $url = "../../../publish-question.php";
               UtilsClient::redirectByClient($url, $message);
            }

            

        }else{
            $url = "../../../publish-question.php";
            $message = "Veuillez obligatoirement remplir tous les champs...";

            UtilsClient::redirectByClient($url, $message);

        }
      }

      else if(isset($_POST['edit_question'])){

        $new_title_question = htmlentities(strip_tags($_POST["title"])); //Title of question
        $new_description_question = nl2br(htmlentities(strip_tags($_POST["description"]))); //Description of question
        $new_content_question = nl2br(htmlentities(strip_tags($_POST["content"]))); //Content of question
        $id_question = htmlentities(strip_tags($_POST['id_question']));
        //$date_question = date("d/m/Y"); //Date of question

        if(
           !empty($new_title_question) && 
           !empty($new_description_question) && 
           !empty($new_content_question)
        ){
            //TableName Questions
            $tableNameQuestions = "questions";

            //Column to Insert	
            $columnUpdateQst = [
                "title",
                "description",
                "content"
            ];

            $columnClosure = ["id"];

            $operators = ["=", "=", "="];

            $operatorsClosure = ["="];
            
            $logicOperator = [""];

            //Values to insert
            $valuesUpdateQst = [
                $new_title_question,
                $new_description_question,
                $new_content_question,
                $id_question
            ];

                $updateQst = UtilsClientDB::updateSomethingByClient(
                    $database,
                    $tableNameQuestions,
                    $columnUpdateQst,
                    $columnClosure,
                    $operators,
                    $operatorsClosure,
                    $logicOperator,
                    $valuesUpdateQst
                );


            if($updateQst){
               $message = "Votre question a bien été mis à jour avec succès";
               $url = "../../../my-questions.php";
               UtilsClient::redirectByClient($url, $message);
            }else{
              $url = "../../../edit-question.php?id=".$id_question;
              $message = "Une erreur est survenue";
              UtilsClient::redirectByClient($url, $message);
            }

            

        }else{
            $url = "../../../edit-question.php?id=".$id_question;
            $message = "Veuillez obligatoirement remplir tous les champs...";
            UtilsClient::redirectByClient($url, $message);
        }

      }
 
      else if(isset($_POST['scope'])){
        $scope = $_POST['scope'];
        switch($scope){
                case "question-delete":
                    $question_id = $_POST['question_id'];
                    $tableName = "questions";
                    $columnClosure = ["id"];
                    $operatorsClosure = ["="];
                    $logicOperator = [""];
                    $values = [$question_id];

                    if(UtilsClientDB::deleteSomethingByClient(
                        $database,
                        $tableName,
                        $columnClosure,
                        $operatorsClosure,
                        $logicOperator,
                        $values)
                    ){
                        echo 200;
                    }else{
                        echo 500;
                    }
                    break;
                default:
                    break;
        }
      }
      else if(isset($_POST['answer_btn'])){
           if(!empty($_POST['answer'])){
            $user_answer = nl2br(htmlentities(strip_tags($_POST['answer'])));
            $id_question = htmlentities(strip_tags($_POST['id_question']));
            $id_author_answer = $_SESSION['auth_user']['user_id']; //id of question author 
            $pseudo_author_answer = $_SESSION['auth_user']['name']; //name of question author
            
            //TableName Answers
            $tableNameAnswers = "answers";

            //Column to Insert	
            $columnInsertAnswers = [
                "id_author",
                "pseudo_author",
                "id_question",
                "content"
            ];

            //Values to insert
            $valuesInsertAnswers = [
                $id_author_answer,
                $pseudo_author_answer,
                $id_question,
                $user_answer
            ];

            UtilsClientDB::insertDataByClient(
                $database,
                $tableNameAnswers,
                $columnInsertAnswers,
                $valuesInsertAnswers
            );

            header("Location: ../../../article.php?id=$id_question");

             

            
           }
      }
      
      else
      {
        header('Location: ../../../index.php');
      }

      

    }
    else
    {
        header('Location: ../../../index.php');
    }
}else {
    header('Location: ../../../error-config.php');
}

?>