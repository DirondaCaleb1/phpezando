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

    if($checkConnet){ //Check connection database is exists
      if(isset($_SESSION['auth']))
      {  //Check the user is connected
        if(isset($_POST['scope'])){ //If scope is exists
          
          //Getting the scope
          $scope = $_POST['scope'];


          switch ($scope) { //switch the scope value
            //scope equal to add
            case 'add':  //Add product item in the carts table
               
               //Initialize the value

               //Product id
               $product_id = $_POST['product_id'];

               //Product quantity
               $product_qty = $_POST['product_qty']; 
               
               //User id
               $user_id = $_SESSION['auth_user']['user_id'];

               //TableName carts to insertion operation
               $tableNameCart = "carts";

               //Columns to insertion 
               $columnInsertCart = ["user_id", "product_id", "product_qty"];

               //Values to insertion
               $valueInsertCart = [$user_id, $product_id, $product_qty];

               //TableName carts to select and verify 
               $tableNameCartVerify = "carts";

               //Column selected
               $columnCartVerify = ["*"];

               //Column to filter 
               $closureCartVerify = ["product_id", "user_id"];

               //Operators to filter
               $operatorsClosureCartVerify = ["=", "="];

               //Logic operators to filter
               $logicOperatorCartVerify = ["AND"];

               //Values to filter result (select)
               $valueCartVerify = [$product_id, $user_id];

                //Check the item existing in the cart
                $chk_exiting_cart = UtilsClientDB::getResultWithCondition(
                    $database, 
                    $tableNameCartVerify, 
                    $columnCartVerify, 
                    $closureCartVerify, 
                    $operatorsClosureCartVerify, 
                    $logicOperatorCartVerify,
                    $valueCartVerify
                );

                //Number of row existing
                $rowCountVerifyCart = $chk_exiting_cart["rowTotals"];

                if($rowCountVerifyCart >0)
                { //If the item existing in the cart
                    echo "existing";

                } else {
                    if($product_qty ==0){ //If the product qty is equal to 0
                        echo "sold out";
                    }else{
                      
                      //Insertion in the cart table
                      $insertBoolResult = UtilsClientDB::insertDataByClient(
                        $database,
                        $tableNameCart,
                        $columnInsertCart,
                        $valueInsertCart
                      );

                      if ($insertBoolResult) { //Insert successful

                        //If inserting is success, send to browser stream the integer 201 to manipulate by Ajax (running if the Javascript is run in the browser)
                        echo 201;
                      } else {

                        //If inserting is not success, send to browser stream the integer 500 to manipulate by Ajax (running if the Javascript is run in the browser)
                        echo 500;
                      }
                    }

                    

                }



               break;

            //scope equal to update
            case "update": //Update product qty in the carts table

              //Initialize the value

              //Product id
              $product_id = $_POST['product_id'];

              //Product quantity
              $product_qty = $_POST['product_qty']; 

              //User id              
              $user_id = $_SESSION['auth_user']['user_id'];

              //TableName carts to update operation
              $tableNameCart = "carts";

              //TableName carts to select and verify
              $tableNameCartVerify = "carts";

              //Column selected
              $columnCartVerify = ["*"];

              //Column to filter
              $closureCartVerify = ["product_id", "user_id"];

              //Operators to filter
              $operatorsClosureCartVerify = ["=", "="];

              //Logic operators to filter
              $logicOperatorCartVerify = ["AND"];

              //Values to filter result (select)
              $valueCartVerify = [$product_id, $user_id];

            

              //Check the item existing in the cart
              $chk_exiting_cart = UtilsClientDB::getResultWithCondition(
                $database, 
                $tableNameCartVerify, 
                $columnCartVerify, 
                $closureCartVerify, 
                $operatorsClosureCartVerify, 
                $logicOperatorCartVerify,
                $valueCartVerify
              );
              

              //Number of row existing 
              $rowCountVerifyCart = $chk_exiting_cart["rowTotals"];

              if($rowCountVerifyCart >0)
              { //If the item existing in the cart

                //Column to update
                $columnCartUpdate = ["product_qty"];

                //Column to filter the row why may update
                $closureCartUpdate = ["product_id", 'user_id'];

                //Operators of column to update
                $operatorCartUpdate = ["="];

                //Operators of column to filter
                $operatorClosureCartUpdate = ["=", "="];

                //Operator logic of column to filter
                $logicOperatorCartUpdate = ["AND"];

                //Values to update and to filter the row
                $valuesCartUpdate = [$product_qty, $product_id, $user_id];

                //Processing to update
                $updateQtyCart = UtilsClientDB::UpdateSomethingByClient(
                  $database,
                  $tableNameCart,
                  $columnCartUpdate,
                  $closureCartUpdate,
                  $operatorCartUpdate,
                  $operatorClosureCartUpdate,
                  $logicOperatorCartUpdate,
                  $valuesCartUpdate
                );

                if($updateQtyCart)
                { //If update is success
                  echo 200;
                }else{
                  echo 500;
                }
              } else {
                echo "Une erreur est survénue";
              }





              break;

            //scope equal to update
            case "delete": //delete one item  in the carts table           
              //Initialize the value

              //Cart Item Id
              $cart_id = $_POST["cart_id"]; 
              
              //userId in the carts table
              $user_id = $_SESSION['auth_user']['user_id'];

              //TableName Carts 
              $tableNameCart = "carts";

              //TableName Carts to verify (select)
              $tableNameCartVerify = "carts";

              //Column to select
              $columnCartVerify = ["*"];

              //Column to filter a row to delete the row
              $closureCartVerify = ["id", "user_id"];

              //Operators to filter a row to delete the row
              $operatorsClosureCartVerify = ["=", "="];

              //Logic operator to filter a row to delete the row
              $logicOperatorCartVerify = ["AND"];

              //Values to filter a row to delete the row
              $valueCartVerify = [$cart_id, $user_id];

              //Check the item existing in the cart
              $chk_exiting_cart = UtilsClientDB::getResultWithCondition(
                $database, 
                $tableNameCartVerify, 
                $columnCartVerify, 
                $closureCartVerify, 
                $operatorsClosureCartVerify, 
                $logicOperatorCartVerify,
                $valueCartVerify
              );

                //Number of row existing
                $rowCountVerifyCart = $chk_exiting_cart["rowTotals"];

                if($rowCountVerifyCart >0)
              {  //If the item existing in the cart

                //TableName Carts 
                $tableNameCartDelete = "carts";

                //Column to filter the row why may delete
                $columnClosureCartDelete = ["carts.id"];

                //Operators to filter the row why may delete
                $operatorsClosureCartDelete = ["="];

                //Logic operator to filter the row why may delete
                $logicOperatorCartDelete = [""];

                //values to filter the row why may delete
                $valuesCartDelete = [$cart_id];

                

                //Processing to delete
                $deleteCartItem = UtilsClientDB::deleteSomethingByClient(
                  $database, 
                  $tableNameCartDelete, 
                  $columnClosureCartDelete, 
                  $operatorsClosureCartDelete, 
                  $logicOperatorCartDelete, 
                  $valuesCartDelete
                );

                if($deleteCartItem)
                { //If delete is success
                  //If deleting is success, send to browser stream the integer 200 to manipulate by Ajax (running if the Javascript is run in the browser)
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
      }
      else
      {
       echo 401;
      }

    }else{
       header('Location: ../../error-config.php');
   }
    

?>