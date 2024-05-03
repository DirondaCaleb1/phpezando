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

    //Define the database;
    $database = "ezando";
    $checkConnet = UtilsClientDB::checkConnection($database);

    //Verify the site is connected to database
    if($checkConnet){
       /*Register Validation*/
        if(isset($_POST["register"])){
            //Initialize the input value
            $name = htmlentities(strip_tags($_POST["exampleInputName1"])); //name of user
            $phone = htmlentities(strip_tags($_POST["exampleInputPhone1"])); //phone of user
            $email = htmlentities(strip_tags($_POST["exampleInputEmail1"])); //email of user
            $password = htmlentities(strip_tags($_POST["examplePassword1"])); //password of user
            $confirmPwd = htmlentities(strip_tags($_POST["examplePassword2"])); //confirm password of user

            //Define the RegExp Validate Variable
            $regExpPhone = "/^[0-9]{6,30}$/"; //Regex phone
            $regExpEmail = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"; //Regex email

            //Define the Validate the value of input Not Empty
            $validatePhone = UtilsClient::validateInputByRegex($regExpPhone, $phone); //Validate phone format
            $validateEmail = UtilsClient::validateInputByRegex($regExpEmail, $email); //Validate email format
            $validatePwd = UtilsClient::validateLengthPassword($password); //Validate password format



            //Define the constant DataBase elt (the table of insert or select)
            //TableName Insert
            $tableNameUserRegister = "users";

            //TableName Select
            $tableNameUserVerify = "users";

            //Column To Insert
            $columnInsertUserRegister = ["name", "email", "phone", "password"];
    
            //For Select Query
            $columnUserVerify = ["*"];
            $closureUserVerify = ["email"];
            $operatorsClosureUserVerify = ["="];
            $logicOperatorUserVerify = [""];

            //Verify is or not Empty
            if(
              empty($name) || 
              empty($phone) || 
              empty($email) || 
              empty($password) || 
              empty($confirmPwd)
            ){
               $url = "../../register.php";
               $message = "Veuillez obligatoirement remplir tous les champs";
               UtilsClient::redirectByClient($url, $message);
            }else{
                //Validate input 
                if(
                  $validatePhone != true || 
                  $validateEmail != true || 
                  $validatePwd != true || 
                  $confirmPwd != $password 
                ){
                    if($validatePhone != true){
                       $url = "../../register.php";
                       $message = "Votre numéro de téléphone ne doit comporter que des chiffres et ne comporter que 6 à 30 chiffres";
                       UtilsClient::redirectByClient($url, $message);
                    }
                    if($validateEmail != true){
                      $url = "../../register.php";
                      $message = "Votre Adresse email est invalide ou est dans un format non valide(L'adresse Email doit comporter un arobase @)";
                      UtilsClient::redirectByClient($url, $message);
                    }
                    if($validatePwd != true){
                       $url = "../../register.php";
                       $message = "Votre mot de passe doit comporter plus de 10 caractères";
                       UtilsClient::redirectByClient($url, $message);               
                    }
                    if($confirmPwd != $password){
                      $url = "../../register.php";
                      $message = "Vos mots de passe ne correspondent pas";
                       UtilsClient::redirectByClient($url, $message); 
                    }
                }else{
                    //Define the variable  DataBase elt

                    //Hashing the password in DataBase
                    $hashingPwd = UtilsClient::hashDefaultPassword($password);

                    //Value Array of Insert
                    $valueInsertUserRegister = [$name, $email, $phone, $hashingPwd];
                    $valueUserVerify = [$email];

                    //Return the array to help to verify the user exists
                    $verifyArrayQueryResult = UtilsClientDB::getResultWithCondition(
                       $database, 
                       $tableNameUserVerify, 
                       $columnUserVerify, 
                       $closureUserVerify, 
                       $operatorsClosureUserVerify, 
                       $logicOperatorUserVerify,
                       $valueUserVerify
                    );

                    /*$queryExecute = $object_mysqli -> mysqli_query(string $sqlQuery); */

                    //Contains the number of rows of result of query SELECT
                    $rowCountVerifyUser = $verifyArrayQueryResult["rowTotals"];

                    //Contains the number of rows of result of query SELECT
                    //Equivalent :  $object_mysqli -> mysqli_num_rows($queryExecute);

                    //If exists the user
                    if($rowCountVerifyUser >0){
                       $url = "../../register.php";
                       $message = "Identifiants existants ou utilisateur déjà existant";
                       //Redirect and display message
                       UtilsClient::redirectByClient($url, $message);                 
                    }else{ //If Not Exists
                
                        //Insertion 
                        $insertBoolResult = UtilsClientDB::insertDataByClient(
                          $database, 
                          $tableNameUserRegister, 
                          $columnInsertUserRegister, 
                          $valueInsertUserRegister
                        );
                        if($insertBoolResult){//Insertion successful
                           $url = "../../login.php";
                           $message = "Inscription réussie";
                           UtilsClient::redirectByClient($url, $message);
                        }else{
                           $url = "../../register.php";
                           $message = "Erreur interne au serveur";
                           UtilsClient::redirectByClient($url, $message);
                        }
                    }

                }
            }
        } 
        
        //Connexion validate
        else if(isset($_POST["login"])){
           //Initialize the input value
           $email = htmlentities(strip_tags($_POST["exampleInputEmail1"])); //Email
           $password = htmlentities(strip_tags($_POST["examplePassword1"])); //Password
    
           //Define the RegExp Validate Variable
           $regExpEmail = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";

           //Define the Validate the value of input Not Empty
           $validateEmail = UtilsClient::validateInputByRegex($regExpEmail, $email);
           $validatePwd = UtilsClient::validateLengthPassword($password);
    
            //Define the constant DataBase elt
            //TableName users
            $tableNameUserLogin = "users";

            //Column selected
            $columnUserLogin = ["*"];

            //Column to filter data user by email 
            $closureUserLogin = ["email"];

            //Operator to filter data user by email
            $operatorsClosureUserLogin = ["="];

            //Logic operator to filter data user by email
            $logicOperatorUserLogin = [""];

            //Verify is or not Empty
            if(empty($email) || empty($password)){
               $url = "../../login.php";
               $message = "Veuillez obligatoirement remplir tous les champs";
               UtilsClient::redirectByClient($url, $message);
            }else{
              //Validate input 
                if( $validateEmail != true || $validatePwd != true ){
                    if($validateEmail != true){
                      $url = "../../login.php";
                      $message = "Email au format invalide";
                      UtilsClient::redirectByClient($url, $message);
                    }
                    if($validatePwd != true){
                       $url = "../../login.php";
                       $message = "Votre mot de passe doit comporter plus de 10 caractères";
                       UtilsClient::redirectByClient($url, $message);
                    }
                }else{

                    //Define the variable  DataBase elt

                    //Value to filter data user by email
                    $valueUserLogin = [$email];

                    //Return the array to help to verify the user exists
                    $loginArrayQueryResult = UtilsClientDB::getResultWithCondition(
                      $database, 
                      $tableNameUserLogin, 
                      $columnUserLogin, 
                      $closureUserLogin, 
                      $operatorsClosureUserLogin, 
                      $logicOperatorUserLogin,
                      $valueUserLogin
                    );

                    //Contains the number of rows of result of query SELECT
                    $rowCountLoginUser = $loginArrayQueryResult["rowTotals"];

                    //Contains the multidimensionnal array of result of query SELECT
                    $arrayRowLoginResult = $loginArrayQueryResult["result"];

                
                    //If exists the user
                    if($rowCountLoginUser >0 ){
            
                        //Verify if the password typing is correct (verify hashing password)
                        $correctPassword = UtilsClient::verifyPwd($password, $arrayRowLoginResult[0][4]);

                        //If password is correct
                        if ($correctPassword == true) {
                            //Setting the session of the authentificate
                            $_SESSION["auth"] = true;
                    
                            //Getting the value 

                            //userid
                            $userid = $arrayRowLoginResult[0][0]; // Column id of users table
                    
                            //username
                            $username = $arrayRowLoginResult[0][1]; // Column name of users table 
                    
                            //useremail
                            $useremail = $arrayRowLoginResult[0][2]; // Column email of users table
                    
                            //user_role_as
                            $role_as = $arrayRowLoginResult[0][5]; // Column role_as of users table

                            //Setting the authenticate of user in associative array
                            $_SESSION["auth_user"] = [
                              'user_id' => $userid, 
                              'name' => $username,
                              'email' => $useremail,
                            ];

                            //Setting the role of user 
                            $_SESSION['role_as'] = $role_as;

                            //Redirect to Admin dashboard if $role_as = 1
                            if ($role_as ==1) {
                               $url = "../../admin/index.php";
                              $message = "Bienvenue au tableau de bord Administrateur";
                              UtilsClient::redirectByClient($url, $message); 
                            } else { //Else to home page
                               $url = "../../admin/index.php";
                               $message = "Connexion réussie";
                               $_SESSION["message"] = "Connexion réussie";
                               header('Location: ../../index.php');
                            }
                        } else {
                            //Redirect to Login page if the authenticate parameters is incorrect
                            $url = "../../login.php";
                            $message = "Identifiant(s) non valide(s) ou incorrectes";
                            UtilsClient::redirectByClient($url, $message);
                        }      
                    }else{
                     //Redirect to Login page if the authenticate parameters is incorrect
                       $url = "../../login.php";
                      $message = "Identifiant(s) non valide(s) ou incorrectes";
                      UtilsClient::redirectByClient($url, $message);
                    }
                }
            }

        
        
        //
        }
        
        else if(isset($_POST["forget_password_btn"])){
         $emailRescue = htmlentities(strip_tags($_POST['email_rescue']));

         //Define the RegExp Validate Variable
         $regExpEmail = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";

         //Define the Validate the value of input Not Empty
         $validateEmail = UtilsClient::validateInputByRegex($regExpEmail, $emailRescue);

         //TableName users
         $tableNameUserRescue = "users";

         //Column selected
         $columnUserRescue = ["*"];

         //Column to filter data user by email 
         $closureUserRescue = ["email"];

         //Operator to filter data user by email
         $operatorsClosureUserRescue = ["="];

         //Logic operator to filter data user by email
         $logicOperatorUserRescue = [""];   
         
         //Verify is or not Empty
         if(empty($emailRescue)){
            $url = "../../forget-password.php";
            $message = "Veuillez obligatoirement fournir une adresse email";
            UtilsClient::redirectByClient($url, $message);
         }else{
            //Validate input 
            if( $validateEmail != true){
               $url = "../../forget-password.php";
               $message = "Email au format invalide";
               UtilsClient::redirectByClient($url, $message);

            }else{
               //Limit the try
                $try = 0;
               //Define the variable  DataBase elt

               //Value to filter data user by email
               $valueUserRescue = [$emailRescue];

               //Return the array to help to verify the user exists
               $rescuePwdArrayQueryResult = UtilsClientDB::getResultWithCondition(
                  $database, 
                  $tableNameUserRescue, 
                  $columnUserRescue, 
                  $closureUserRescue, 
                  $operatorsClosureUserRescue, 
                  $logicOperatorUserRescue,
                  $valueUserRescue
               );

               //Contains the number of rows of result of query SELECT
               $rowCountRescuePwd = $rescuePwdArrayQueryResult["rowTotals"];

               //Contains the multidimensionnal array of result of query SELECT
               $arrayRowRescuePwdResult = $rescuePwdArrayQueryResult["result"];

               if($rowCountRescuePwd <=0){
                  $url = "../../forget-password.php";
                  $message = "Identifiant non valide";
                  UtilsClient::redirectByClient($url, $message);
               }

               var_dump($arrayRowRescuePwdResult);

               $token = bin2hex(random_bytes(16));

               $tableNameInsertPwdVerif = "password_reset_request";

               //`user_id`, `date_time`, `token`

               $columnInsertPwdVerif = ["user_id", "token"];

               $valueInsertPwdVerif = [$arrayRowRescuePwdResult[0][0], $token];

            $insertBoolResult = UtilsClientDB::insertDataByClient(
               $database,
               $tableNameInsertPwdVerif,
               $columnInsertPwdVerif,
               $valueInsertPwdVerif
            );

            if($insertBoolResult){
               header("Location: ../../forget-password.php");
            }

            }
         }
            
         
        }

        else if(isset($_POST["pwd_reset_btn"])){
          var_dump($_POST);
        }
        
        else{
         //Redirect to Login page if forced
          $url = "../../index.php";
          $message = "Accès réfusé";
          UtilsClient::redirectByClient($url, $message);
        }

    }else{
       header('Location: ../../error-config.php');
    }

?>