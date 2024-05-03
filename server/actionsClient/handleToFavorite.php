<?php

     //Open Session
     session_start();

    //Required Files
    require_once("../../admin/database/myparams.inc.php");
    require_once("../../admin/database/config.inc.php");
    require_once("../../admin/utils/UtilsDB.php");
    include("../../utilsClient/UtilsDB.php");
    require_once("../../admin/utils/utils.php");
    include("../../utilsClient/Utils.php");

    $database = "ezando";
    $checkConnet = UtilsClientDB::checkConnection($database);

    if ($checkConnet) {
        if(isset($_SESSION['auth'])){
            if(isset($_POST['scope'])){
              $scope = $_POST['scope'];

              switch($scope){
                case "shortlist-add":
                    //Initialize the value
                    $product_id = $_POST['product_id'];
                    $user_id = $_SESSION['auth_user']['user_id'];

                    //Insert In shortlist table
                    $tableNameShortList = 'shortlist';
                    $columnInsertShortList = ['product_id', 'user_id'];
                    $valuesInsertShortList = [$product_id, $user_id];

                    //Verify if exists
                    $tableNameShortListVerify = 'shortlist';
                    $columnSelectShortListVerify = ["*"];
                    $columnClosureShortListVerify = ['product_id', 'user_id'];
                    $operatorsShortListVerify = ["=", "="];
                    $logicOperatorShortListVerify = ["AND"];
                    $valuesSelectShortListVerify = [$product_id, $user_id];

                    //Check the item existing in the shortlist table
                    $chk_exiting_shortlist = UtilsClientDB::getResultWithCondition(
                       $database, 
                       $tableNameShortListVerify, 
                       $columnSelectShortListVerify, 
                       $columnClosureShortListVerify, 
                       $operatorsShortListVerify, 
                       $logicOperatorShortListVerify,
                       $valuesSelectShortListVerify
                    );

                    $rowCountVerifyShortList = $chk_exiting_shortlist["rowTotals"];

                    if($rowCountVerifyShortList >0)
                    {
                       echo "existing";

                    } else {

                        $insertBoolResult = UtilsClientDB::insertDataByClient(
                           $database,
                           $tableNameShortList,
                           $columnInsertShortList,
                           $valuesInsertShortList
                        );

                        if ($insertBoolResult) {
                           echo 202;
                        } else {
                           echo 500;
                        }

                    }

                    break;
                case "shortlist-delete":
                    //Initialize the value

                    //Deleting Operation 

                    $shortlist_id = $_POST["shortlist_id"];              
                    $user_id = $_SESSION['auth_user']['user_id'];
                    $tableNameShortlist = "shortlist";

                    //Selecting
                    $tableNameShortListVerify = "shortlist";
                    $columnShortListVerify = ["*"];
                    $closureShortListVerify = ["id", "user_id"];
                    $operatorsClosureShortListVerify = ["=", "="];
                    $logicOperatorShortListVerify = ["AND"];
                    $valueShortListVerify = [$shortlist_id, $user_id];

              //Check the item existing in the cart
              $chk_exiting_shortlist = UtilsClientDB::getResultWithCondition(
                $database, 
                $tableNameShortListVerify, 
                $columnShortListVerify, 
                $closureShortListVerify, 
                $operatorsClosureShortListVerify, 
                $logicOperatorShortListVerify,
                $valueShortListVerify
              );

                $rowCountVerifyShortList = $chk_exiting_shortlist["rowTotals"];

                if($rowCountVerifyShortList >0)
              {

                $tableNameShortListDelete = "shortlist";
                $columnClosureShortListDelete = ["shortlist.id"];
                $operatorsClosureShortListDelete = ["="];
                $logicOperatorShortListDelete = [""];
                $valuesShortListDelete = [$shortlist_id];


                $deleteShortListItem = UtilsClientDB::deleteSomethingByClient(
                  $database, 
                  $tableNameShortListDelete, 
                  $columnClosureShortListDelete, 
                  $operatorsClosureShortListDelete, 
                  $logicOperatorShortListDelete, 
                  $valuesShortListDelete
                );

                if($deleteShortListItem)
                {
                  echo 200;
                }else{
                  echo "Une erreur est survénue";
                }



              } else {
                echo "Une erreur est survénue";
              }
                    break;
                default:
                    echo 500;
                    break;
              }
            }
        }else
        {
           echo 401;
        }

    }else{
       header('Location: ../../error-config.php');
    }

?>