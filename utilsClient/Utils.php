<?php

//require_once("./UtilsDB.php");
//require_once("./../marketponayo/UtilsDB.php");
//require_once("./../marketponayo/backend/admin/utils/utils.php");
//require_once("./backend/admin/utils/utils.php");

class UtilsClient{

    function __construct(){

    }

    public static function getAdressIP(){
        if(!empty($_SERVER["HTTP_CLIENT_IP"])){
            $ip = $_SERVER["HTTP_CLIENT_IP"];
        }else if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }else{
            $ip = $_SERVER["REMOTE_ADDR"];
        }

        return $ip;
    }


    //Cart function 
    public static function cart(mixed $valueGET, string $dataBase, string  $tableName, array $columnInsert , array $columnSelect, array $closures, array $operators, array $logicOperator ){
        //ip_address
        if(isset($valueGET)){
            
            $ip = UtilsClient::getAdressIP();
            $get_product = $valueGET;
            $valuesSelect = [$ip, $get_product];
            //$result = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["result"];
            $count = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["rowTotals"];
            
            if ($count >0) {
                echo "<script>alert('Ce produit est déjà présent dans vos commandes');window.location = 'index.php';</script>";
                //
            }else{
                $valuesInsert = [$get_product, $ip, '0'];
                $boolInsert = UtilsClientDB::insertDataByClient($dataBase, $tableName, $columnInsert, $valuesInsert);
                if($boolInsert){
                    echo "<script>alert('Un produit a été ajouté avec succès avec votre panier');window.location='index.php';</script>";
                }else{
                    
                }
            }
        }
    }

    //Function to get cart item numbers
    public static function cartItems(mixed $valueGET, string $dataBase, string  $tableName , array $columnSelect, array $closures, array $operators, array $logicOperator){
                //ip_address
        if(!is_null($valueGET)){           
            $ip = UtilsClient::getAdressIP();
            $valuesSelect = [$ip];
            //$result = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["result"];
            $countCartItem = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["rowTotals"];
        }else{
            $ip = UtilsClient::getAdressIP();
            $valuesSelect = [$ip];
            //$result = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["result"];
            $countCartItem = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["rowTotals"];
        }

        return $countCartItem;
    } 

    // Static Method to get All details of Product in the Cart

    public static function getDetailsAllProductsToCart(string $database,string $tableNameCart, array $columnSelect, string $tableNameProduct, string $columnNameFilterProduct, string $columnNameFilterUser, string $valueFilterUser, array $ordingColumns, string $ordingCurrent){

        //$tableName = $tableNameCart . ", " . $tableNameProduct;
        $closure = [ $columnNameFilterUser];
        $operators = ["="];
        $logicOperator = [""];
        $closureJoinTab1 = [$columnNameFilterProduct];
        $closureJoinTab2 = ["products.id"];
        $operatorsJoin = ["="];


        
        $values = [ $valueFilterUser];

        $getAllProducts = UtilsClientDB::getResultWithJointureAndConditionAndOrding(
            $database,
            $tableNameCart, 
            $tableNameProduct, 
            $columnSelect, 
            $closureJoinTab1, 
            $closureJoinTab2,  
            $closure, 
            $operatorsJoin , 
            $operators, 
            $logicOperator, 
            $ordingColumns, 
            $ordingCurrent,
            $values
        );

        return $getAllProducts;
    }

    public static function getOrdersItems(string $database,string $tableNameOrder,  string $columnNameFilterUser, string $valueFilterUser, array $ordingColumns, string $ordingCurrent){
          $closure = [ $columnNameFilterUser];
          $operators = ["="];
          $logicOperator = [""];
          $columnSelect = ["*"];
          $values = [ $valueFilterUser];

        $getResult = UtilsClientDB::getResultWithConditionAndOrding(
            $database, 
            $tableNameOrder,
            $columnSelect,
            $closure,
            $operators,
            $logicOperator,
            $ordingColumns,
            $ordingCurrent,
            $values
        );

        return $getResult;
    }

    public static function checkingTrackingNoValid (string $database, string $tableNameOrder, string $tracking_number, string $columnNameFilterUser, string $valueFilterUser){
        $closure = ["tracking_no", $columnNameFilterUser];
        $operators = ["=", "="];
        $logicOperator = ["AND"];
        $columnSelect = ["*"];
        $values = [$tracking_number, $valueFilterUser];

        $getResult = UtilsClientDB::getResultWithCondition(
            $database, 
            $tableNameOrder,
            $columnSelect,
            $closure,
            $operators,
            $logicOperator,
            $values
        );

        return $getResult;
    }

    public static function getDateInAnyFormat (string $date, string $langageFormat, string $dateFormat){
        $arrayYearAndMonth = explode("-", $date);
                $day ="";
                $month = "";
                $year = "";
                $hours = "";
                if(gettype($arrayYearAndMonth) != "boolean"){
                    $dayAndHours = explode(" ",$arrayYearAndMonth[count($arrayYearAndMonth) - 1]);

                    if(gettype($dayAndHours) != "boolean"){
                        $day .= $dayAndHours[0];
                        $hours .= $dayAndHours[1];
                    }else{
                        $day .= "";
                        $hours .="";
                    }

                    $month .= $arrayYearAndMonth[1];
                    $year .= $arrayYearAndMonth[0];
                    
                }else{
                    $day .= "";
                    $month .= "";
                    $year .= "";
                }
        
        $dateF = "";
        switch ($langageFormat) {
            case 'french':
                switch ($dateFormat) {
                    case 'letter':
                        $monthLetter = "";
                        if($day !="" && $month !="" && $year !=""){
                            switch ($month) {
                                case '01':
                                    $monthLetter .= "Janvier";
                                    break;
                                case '02':
                                    $monthLetter .= "Fevrier";
                                    break;
                                case '03':
                                    $monthLetter .= "Mars";
                                    break;
                                case '04':
                                    $monthLetter .= "Avril";
                                    break;
                                case '05':
                                    $monthLetter .= "Mai";
                                    break;
                                case '06':
                                    $monthLetter .= "Juin";
                                    break;
                                case '07':
                                    $monthLetter .= "Juillet";
                                    break;
                                case '08':
                                    $monthLetter .= "Août";
                                    break;
                                case '09':
                                    $monthLetter .= "Septembre";
                                    break;
                                case '10':
                                    $monthLetter .= "Octobre";
                                    break;
                                case '11':
                                    $monthLetter .= "Novembre";
                                    break;
                                case '12':
                                    $monthLetter .= "Décembre";
                                    break;
                                
                                default:
                                     $monthLetter .= "";
                                    break;
                            }

                            $dateF .= $day . " " . $monthLetter . " " . $year; 
                        }else{
                            $monthLetter .= "";
                            $dateF .= "";
                        }
                        break;
                    
                    case 'digit':
                        $monthLetter = "";
                        if($day !="" && $month !="" && $year !=""){
                            
                            $dateF .= $day . "/" . $month . "/" . $year; 
                        }else{
                            $monthLetter .= "";
                            $dateF .= "";
                        }
                        break;

                    default:
                        # code...
                        break;
                }
                break;
            default:
                switch ($dateFormat) {
                    case 'letter':
                        $monthLetter = "";
                        if($day !="" && $month !="" && $year !=""){
                            switch ($month) {
                                case '01':
                                    $monthLetter .= "January";
                                    break;
                                case '02':
                                    $monthLetter .= "February";
                                    break;
                                case '03':
                                    $monthLetter .= "March";
                                    break;
                                case '04':
                                    $monthLetter .= "April";
                                    break;
                                case '05':
                                    $monthLetter .= "May";
                                    break;
                                case '06':
                                    $monthLetter .= "June";
                                    break;
                                case '07':
                                    $monthLetter .= "July";
                                    break;
                                case '08':
                                    $monthLetter .= "August";
                                    break;
                                case '09':
                                    $monthLetter .= "September";
                                    break;
                                case '10':
                                    $monthLetter .= "October";
                                    break;
                                case '11':
                                    $monthLetter .= "November";
                                    break;
                                case '12':
                                    $monthLetter .= "December";
                                    break;
                                
                                default:
                                     $monthLetter .= "";
                                    break;
                            }

                            $dateF .=  $year.  " " . $monthLetter . " " . $day ; 
                        }else{
                            $monthLetter .= "";
                            $dateF .= "";
                        }
                        break;
                    
                    case 'digit':
                        $monthLetter = "";
                        if($day !="" && $month !="" && $year !=""){
                            
                            $dateF .= $year . "-" . $month . "-" . $day; 
                        }else{
                            $monthLetter .= "";
                            $dateF .= "";
                        }
                        break;

                    default:
                        # code...
                        break;
                }
                break;
        }

        $dateWithHours ="";
         if ($dateF !="" && $hours !="") {
            $dateWithHours .= $dateF . " " . $hours; 
         } else {
            $dateWithHours .= "";
         }
         
        

        return ["simpleDate" =>$dateF, "dateComplet" => $dateWithHours];
    }

    public static function getTotalPriceAndResult(string $dataBase, string  $tableName , string $tableName2, array $columnSelect, array $closures, array $closure2 , array $operators, array $operators2 , array $logicOperator, array $logicOperator2){
            $ip = UtilsClient::getAdressIP();
            $valuesSelect = [$ip];
            $result = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["result"];
            $countCartItem = UtilsClientDB::getResultWithCondition($dataBase, $tableName, $columnSelect, $closures, $operators, $logicOperator, $valuesSelect)["rowTotals"];
            $i = 0;
            $j = 0;
        $productPrice = [];
        $product = [];
        $total = 0;
            while($i <$countCartItem){
            $id_product = $result[$i][0];
            $valueProduct = [$id_product];
            $resultProduct = UtilsClientDB::getResultWithCondition($dataBase, $tableName2, $columnSelect, $closure2, $operators2, $logicOperator2, $valueProduct)["result"];
            //$countProduct = UtilsClientDB::getResultWithCondition($dataBase, $tableName2, $columnSelect, $closure2, $operators2, $logicOperator2, $valueProduct)["rowTotals"];
            array_push($productPrice, $resultProduct[$j][8]);
            array_push($product, $resultProduct);
            $productValue = array_sum($productPrice);
            //$total += $productValue; 
            $i++;
            }

            if(isset($productValue)){
                $total += $productValue;
            }
            

            return  ["priceTotal" =>$total, "cartProducts" =>$product, "cartCount" =>count($product)] ;

    }

    public static function ismyInt(mixed $char){
        if(gettype($char) =="string"){
            $pattern = "/^[0-9+]$/";
            $bool = preg_match($pattern, $char);
                

                if($bool ==true){
                    return true;
                }else{
                    return false;
                }
        }else{
            return null;
        }
    }

    public static function removecartItem(array $checkbox, string $dataBase, string $tableName,  array $closures, array $operatorsClosure , array $logicOperator){
        foreach ($checkbox as $key => $value) {
            $values = [$value];
            $delete = UtilsClientDB::deleteSomethingByClient($dataBase, $tableName, $closures, $operatorsClosure, $logicOperator, $values);

            if($delete){
                echo "<script>window.location='cart.php';</script>";
                return true;
            }else{
                return false;
            }
            # code... string $dataBase, string $tableName,  array $closures, array $operatorsClosure , array $logicOperator, array $values;
        }

    }

    public static function validateUploadedByClient(    
    array $keyNames, 
    string $typeFile, 
    array $typeAccepted, 
    string $pathDestinationMoveUploadFile, 
    string $prefixeClient, 
    string $prefixeAdmin){

        return Utils::validateAllFilesUploaded($keyNames, $typeFile, $typeAccepted, $pathDestinationMoveUploadFile, $prefixeClient, $prefixeAdmin);
    }


    public static function validateInputByRegex(string $regex, string $input){
        if(preg_match($regex, $input)){
            return true;
        }else{
            return false;
        }
    }

    public static function validateInputByFilter($inputEmail){
        return filter_var($inputEmail, FILTER_VALIDATE_EMAIL);
    }

    public static function validateLengthPassword(string $password){
        if(strlen($password) >=10){
            return true;
        }else{
            return false;
        }
    }

    public static function hashDefaultPassword(string $password){
        $pwdHash = password_hash($password, PASSWORD_DEFAULT, ["cout" => 8]);

        return $pwdHash;
    }

    public static function verifyPwd(string $password, string $hashingPwd){
        if(password_verify($password, $hashingPwd)){
            return true;
        }else{
            return false;
        }
    }

    public static function strongPassword(array $regexArray, string $password){

        $score = 0;
        $i=0;

        $bool = [];


        while(true){

            if(preg_match($regexArray[$i], $password)){
                $score += 1;
            }

            if($i ==count($regexArray)-1){
                break;
            }

            $i++;
        }

        

        if(strlen($password) >=12){
            $score += 1;
        }

        return $score;
}


    
    public static function redirectByClient(string $url, string $message) 
    {
              
      $_SESSION["message"] = $message;
      //echo "<script> window.location='../index.php';</script>";
      header('Location: '.$url);
      exit();
    }

    public static function getAllQuestionOfForum(string $database, string $tableName, array $column, array $columnOrder, string $ordingOrientation){
        $getAllQuestion = UtilsClientDB::getResultAndOrding($database, $tableName, $column, $columnOrder, $ordingOrientation);

        return $getAllQuestion;
    }
}


?>