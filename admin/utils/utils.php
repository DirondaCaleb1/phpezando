<?php

/* */
class  Utils 
{
    private float $y;

    function __construct(){
        
    }

    //Static Method to valid one file and return an array including the path of file if the extension is accepted
    public static function validateUploaded(string $keyNameFile, string $secondKey, string $typeFile, array $typeAccepted, string $pathDestinationMoveUploadFile, string $prefixeClient, string $prefixeAdmin){
        switch ($secondKey) {
            case 'tmp_name':
                switch ($_FILES[$keyNameFile][$secondKey]) {
                    case '':
                        return "Veuillez fournir obligatoirement une " . $typeFile;
                    default:
                        $file = $_FILES[$keyNameFile]["name"];
                        $arrayFile = explode(".", $file);
                        $name = $arrayFile[0];
                        $type = "." . $arrayFile[1];

                        if (in_array($type, $typeAccepted, true)) {
                            if(move_uploaded_file($_FILES[$keyNameFile][$secondKey], $prefixeAdmin.$pathDestinationMoveUploadFile.$name. date("Y_M").$type )){
                                $moveAdmin = $prefixeAdmin.$pathDestinationMoveUploadFile.$name. date("Y_M").$type;
                                $moveClient= $prefixeClient.$pathDestinationMoveUploadFile.$name. date("Y_M").$type;
                                return ["nameFile" =>$moveAdmin, "nameFileClient"=>$moveClient , "success" =>true];
                            }else{
                                return "erreur système: impossible d'écrire sur le système de fichiers";
                            }
                        }else{
                            $typeAccepts = "";
                            $i = 0;
                            while($i < count($typeAccepted)){
                                if($i==0){
                                    $typeAccepts .= $typeAccepted[0];
                                }
                                 
                                if($i>0){
                                      $typeAccepts .= " , ".$typeAccepted[$i]; 
                                }
                                
                                $i++;
                            }

                            $pluriel = (count($typeAccepted) ==1) ? "de type" : " l'un des types suivants : ";

                            return "Le fichier " . $typeFile . " doit obligatoirement être" . $pluriel . $typeAccepts;
                        }
                }


            default:
                return "impossible";
        }
    }

         //Static Method to valid one file and return a boolean true if the extension is accepted
    public static function validateUploadedFile(string $keyNameFile, string $secondKey, string $typeFile, array $typeAccepted, string $pathDestinationMoveUploadFile, string $prefixeClient, string $prefixeAdmin){
        switch ($secondKey) {
            case 'tmp_name':
                switch ($_FILES[$keyNameFile][$secondKey]) {
                    case '':
                        return "Veuillez fournir obligatoirement une " . $typeFile;
                    default:
                        $file = $_FILES[$keyNameFile]["name"];
                        $arrayFile = explode(".", $file);
                        $name = $arrayFile[0];
                        $type = "." . $arrayFile[1];

                        if (in_array($type, $typeAccepted, true)) {
                            return true;
                        }else{
                            $typeAccepts = "";
                            $i = 0;
                            while($i < count($typeAccepted)){
                                if($i==0){
                                    $typeAccepts .= $typeAccepted[0];
                                }
                                 
                                if($i>0){
                                      $typeAccepts .= " , ".$typeAccepted[$i]; 
                                }
                                
                                $i++;
                            }

                            $pluriel = (count($typeAccepted) ==1) ? "de type" : " l'un des types suivants : ";

                            return "Le fichier " . $typeFile . " doit obligatoirement être" . $pluriel . $typeAccepts;
                        }
                }


            default:
                return "impossible";
        }
    }

    public static function validateUploadedMyFile(array $typeAccepted, string $pathDirectory, string $prefixeUploaded, string $tmpDirectoryFile, string $nameFile) : array
    {
         if ($tmpDirectoryFile ==='') {
            return ["state" => null, "success" => false , "directoryFile" => "", "path"=>"", "nameFile" => ""];
         } else {
            $image_ext = ".".pathinfo($nameFile, PATHINFO_EXTENSION);
            $name = explode(".", $nameFile)[0];
            $file_name = time() .$name. '_cat' . $image_ext;
            if(!in_array($image_ext, $typeAccepted)){
                return ["state" => false, "success" => false , "directoryFile" => "", "path"=>"", "nameFile" => ""];
            }else{
                if(move_uploaded_file($tmpDirectoryFile, $prefixeUploaded.$pathDirectory."/".$file_name)){
                    return ["state" => true, "success" => true , "directoryFile" => $pathDirectory."/".$file_name, "path"=>$pathDirectory, "nameFile" => $file_name];
                }else{
                    return ["state" => false, "success" => false , "directoryFile" => "", "path"=>"", "nameFile" => ""];
                }
            }

         }
         
    }

    public static function validateInputByRegex(string $regex, string $input){
        if(preg_match($regex, $input)){
            return true;
        }else{
            return false;
        }
    }

   




    //To check the parameter is an boolean (homonym of the native PHP function is_bool())
    public static function isBoolean($elt){
           if (gettype($elt) == "boolean") {
               return true;
           } else {
               return false;
           }
           
    }

    //Static Method to valid above one file (e.g two )  and return a boolean true if the extension is accepted and uploaded in file storage of server with no temporary name
    public static function validateAllFilesUploaded(array $keyNames, string $typeFile, array $typeAccepted, string $pathDestinationMoveUploadFile, string $prefixeClient, string $prefixeAdmin){
        //initialize the compter $i for infinite loop to break
        $i = 0;

        //Rescue the key tempory directory of the global variable
        $secondKey = 'tmp_name';

        //Infinite loop to iterate the array $keyNames including the value of attribute of the file inputs 
        while(true){
            //Initialize the arrays 
            $array = [];
            $superArray = [];
                                    
             //Iterate $keyName       
            foreach ($keyNames as $key => $value) {

                //Checked if the element of $keyName array is string
                if(gettype($value) =="string"){
                    
                    //Push each the value returning by the static method validateUploadedFile in the array $array
                    array_push($array,Utils::validateUploadedFile(
                        $value,
                        $secondKey,
                        $typeFile,
                        $typeAccepted,
                        $pathDestinationMoveUploadFile,
                        $prefixeClient,
                        $prefixeAdmin
                    ));
                    //Rescue each file input
                    $file = $_FILES[$value]["name"];
                    $arrayFile = explode(".", $file);
                    //Push each the value of $arrayFile in the $superArray
                    array_push($superArray, $arrayFile);
                }
                
            }

            //Break condition
            if($i ==count($keyNames)){
                break;
            }

            //Incrémentation
            $i++;
        }

        //Initialize the counter $j
        $j = 0;

        //Initialize the array which contains the value the $array
        $verified = [];
        $noVerified = [];

        //Iterate the array $array 
        while ($j < count($array)) {
            # Test if each element is boolean or not
            if (Utils::isBoolean($array[$j]) ==true){
                //If is boolean; push in the array $verified
                array_push($verified, $array[$j]);
            }else{
                //If is NOT boolean; push in the array $noVerified
                array_push($noVerified, $array[$j]);
            }
                
            $j++;
        }

        //All elements of $verified is boolean and the $noVerified is empty
        if((count($verified) == count($array)) && (count($noVerified) ==0)){
            //Initialise the array of file name and the array of type of file
            $arrayName = [];
            $arrayTypeFile = [];
            //Iterate the $superArray (array multidimensionnal) to extracting the name of file
            foreach ($superArray as $key => $value) {
                # Push each element of $superArray that the name file in the the array $arrayName
                array_push($arrayName, $value[0]);

            }

            //Iterate the $superArray (array multidimensionnal) to extracting the type of file
            foreach ($superArray as $key => $value) {
                
                if(gettype($value[1]) == "string" )
                # Push each element of $superArray that the type file in the the array $arrayTypeFile.
                array_push($arrayTypeFile, ".".$value[1]);
            }

            //Initialise the array of url file for admin, the array of url file for client and the array of path temporary of file
            $urlArrayAdmin = [];
            $pathTemp = [];
            $urlArrayClient = [];
            
            if(count($arrayName) == count($arrayTypeFile)){
                $k = 0;
                while($k< count($arrayName) && $k < count($keyNames) && $k< count($arrayTypeFile)){
                    array_push($pathTemp, $_FILES[$keyNames[$k]][$secondKey]);
                    array_push($urlArrayAdmin, $prefixeAdmin . $pathDestinationMoveUploadFile . $arrayName[$k] . date("Y_M") . $arrayTypeFile[$k]);
                    array_push($urlArrayClient, $prefixeClient . $pathDestinationMoveUploadFile . $arrayName[$k] . date("Y_M") . $arrayTypeFile[$k]);
                    $k++;
                }
                
                $l =0;
                $result = [];
                while ($l <count($pathTemp) && $l <count($urlArrayAdmin) && $l< count($urlArrayClient)) {
                    # code...
                    if(move_uploaded_file($pathTemp[$l], $urlArrayAdmin[$l])){
                        array_push($result, $urlArrayAdmin[$l] . ";" . $urlArrayClient[$l]);
                    }
                    $l++;
                }
            }

            $successArray = ["urlFile" => $result, "success" => true];

            return $successArray;
        }

        //Not All elements of $verified is boolean and the $noVerified is not empty and the array $verified is  greater than the array $noVerified
        if((count($verified) != count($array)) && (count($verified) > count($noVerified))){
            return "Veuillez obligatoirement fournir  " . $typeFile . " restantes";
        }

        //Not All elements of $verified is boolean and the $noVerified is not empty and the array $verified is  less than the array $noVerified
        if((count($verified) != count($array)) && (count($verified) < count($noVerified))){
            return "Veuillez obligatoirement fournir les " . $typeFile . "s restantes"; 
        }

        //All elements is not boolean, because anyone file is upload
        if((count($verified) ==0 ) && (count($noVerified) == count($array))){
            if(count($noVerified) ==1){
               return   "Veuillez obligatoirement fournir l'" . $typeFile ."" ; 
            }else{
                return   "Veuillez obligatoirement fournir les " . $typeFile ."s" ; 
            }
            
        }

        return "impossible" ;
    }


    public static function redirect(string $url, string $message) 
    {
              
      $_SESSION["message"] = $message;
      //echo "<script> window.location='../index.php';</script>";
      header('Location: '.$url);
      exit();
    }

    public static function getAllOrdersItems(
        string $database, 
        string $tableNameLeft, 
        array $tableNameRight, 
        array $columnClosureJoinOpLeft, 
        array $columnClosureJoinOpRight,
        array $operatorsJoin, 
        string $columnStatut, 
        string $valueStatut
    ){

        $columnSelect = ["o.*", "o.name AS oname", "u.name"];
        $columnClosureFilter = [$columnStatut];
        $valuesFilter = [$valueStatut];
        $logicOperators = [""];
        $operatorsFilter = ["="];

        $getResult = UtilsAdminDB:: getResultWithJointureAndCondition(
         $database,
         $tableNameLeft, 
         $tableNameRight, 
         $columnSelect, 
         $columnClosureJoinOpLeft, 
         $columnClosureJoinOpRight, 
         $columnClosureFilter, 
         $operatorsJoin, 
         $operatorsFilter, 
         $logicOperators, 
         $valuesFilter
        );

        return $getResult;
    }

    public static function getOrdersHistory(
        string $database, 
        string $tableNameLeft, 
        array $tableNameRight, 
        array $columnClosureJoinOpLeft, 
        array $columnClosureJoinOpRight,
        array $operatorsJoin, 
        string $columnStatut, 
        string $valueStatut
    ){

        $columnSelect = ["o.*", "o.name AS oname", "u.name"];
        $columnClosureFilter = [$columnStatut];
        $valuesFilter = [$valueStatut];
        $logicOperators = [""];
        $operatorsFilter = ["!="];

        $getResult = UtilsAdminDB:: getResultWithJointureAndCondition(
         $database,
         $tableNameLeft, 
         $tableNameRight, 
         $columnSelect, 
         $columnClosureJoinOpLeft, 
         $columnClosureJoinOpRight, 
         $columnClosureFilter, 
         $operatorsJoin, 
         $operatorsFilter, 
         $logicOperators, 
         $valuesFilter
        );

        return $getResult;
    }

    public static function checkingTrackingNoValidByAdmin (string $database, string $tableNameOrder, string $tracking_number){
        $closure = ["tracking_no"];
        $operators = ["="];
        $logicOperator = [""];
        $columnSelect = ["*"];
        $values = [$tracking_number];

        $getResult = UtilsAdminDB::getResultWithCondition(
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

    public static function isBisextile(int $year): bool
    {
        if($year%4 ==0){
            return true;
        }else {
            return false;
        }
    }

    public static function getDateNextMonth(string $date){
        $dateLeng = explode(" ", $date);
        $dayAndMonth = explode("-", $dateLeng[0]);
        $jour = $dayAndMonth[2];
        $mois = $dayAndMonth[1];
        $year = $dayAndMonth[0];
        settype($jour, "int");
        settype($mois, "int");
        settype($year, "int");

        $isBixextile = Utils::isBisextile($year);

        if($jour >=1 && $jour <=28){
            $jourNexMonth = $jour;
            $nextMonth = $mois + 1;
            if($mois ==12){
                $nextMonth = 1;
                $year = $year + 1;
            }
        }else if($jour >=29 && $jour <=31){
            $nextMonth = $mois + 1;
            if($nextMonth ==2 && $isBixextile == true && $jour ==29 ){
                $jourNexMonth = $jour;
            }else if($nextMonth ==2 && $isBixextile == true && $jour ==30 ){
                $jourNexMonth = 1;
                $nextMonth = 3;
            }else if($nextMonth ==2 && $isBixextile == true && $jour ==31 ){
                $jourNexMonth = 2;
                $nextMonth = 3;
            }else if($nextMonth == 2 && $isBixextile !=true && $jour ==29 ){
                $jourNexMonth = 1;
                $nextMonth = 3; 
            }else if($nextMonth == 2 && $isBixextile !=true && $jour ==30 ){
                $jourNexMonth = 2;
                $nextMonth = 3; 
            }else if($nextMonth == 2 && $isBixextile !=true && $jour ==31 ){
                $jourNexMonth = 3;
                $nextMonth = 3; 
            }
            else if($nextMonth !=2 && $mois >1 || ($isBixextile ==true || $isBixextile !=true)){
                switch ($mois) {
                    case 2:
                        $jourNexMonth = $jour;
                        $nextMonth = $mois + 1;
                        break;
                    case 3:
                        if($jour ==29 || $jour ==30){
                            $jourNexMonth = $jour;
                            $nextMonth = $mois + 1;
                        }else{
                            $jourNexMonth = 1;
                            $nextMonth = $mois + 2;
                        }
                        break;
                    case 4:
                        $jourNexMonth = $jour;
                        $nextMonth = $mois + 1;
                        break;
                    case 5:
                        if($jour ==29 || $jour ==30){
                            $jourNexMonth = $jour;
                            $nextMonth = $mois + 1;
                        }else{
                            $jourNexMonth = 1;
                            $nextMonth = $mois + 2;
                        }
                        break;
                    case 6:
                        $jourNexMonth = $jour;
                        $nextMonth = $mois + 1;
                        break;
                    case 7:
                        $jourNexMonth = $jour;
                        $nextMonth = $mois + 1;
                        break;
                    case 8:
                        if($jour ==29 || $jour ==30){
                            $jourNexMonth = $jour;
                            $nextMonth = $mois + 1;
                        }else{
                            $jourNexMonth = 1;
                            $nextMonth = $mois + 2;
                        }
                        break;
                    case 9:
                        $jourNexMonth = $jour;
                        $nextMonth = $mois + 1;
                        break;
                    case 10:
                        if($jour ==29 || $jour ==30){
                            $jourNexMonth = $jour;
                            $nextMonth = $mois + 1;
                        }else{
                            $jourNexMonth = 1;
                            $nextMonth = $mois + 2;
                        }
                        break;
                    case 11:
                        $jourNexMonth = $jour;
                        $nextMonth = $mois + 1;
                        break;
                    case 12:
                        $jourNexMonth = $jour;
                        $nextMonth = 1;
                        $year += 1;
                        break;
                    
                    default:
                        $jourNexMonth = 0;
                        $nextMonth = 0;
                        $year =0;
                        break;
                }
            }
            
        }
        else{
            $jourNexMonth = 0;
            $nextMonth = 0;
            $year =0;
        }

        if($jourNexMonth <=9){
            settype($jourNexMonth, "string");
            $jourNexMonth = "0" . $jourNexMonth;
        }else{
            settype($jourNexMonth, "string");
        }

        if($nextMonth <=9){
            settype($nextMonth, "string");
            $nextMonth = "0" . $nextMonth;
        }else{
            settype($nextMonth, "string");
        }


        settype($year, "string");


        $date = $year . "-" . $nextMonth . "-" . $jourNexMonth;



        return $date . " ". $dateLeng[1];

    }

    public static function getDatePreviousMonth(string $date){
        $dateLeng = explode(" ", $date);
        $dayAndMonth = explode("-", $dateLeng[0]);
        $jour = $dayAndMonth[2];
        $mois = $dayAndMonth[1];
        $year = $dayAndMonth[0];
        settype($jour, "int");
        settype($mois, "int");
        settype($year, "int");

        $isBixextile = Utils::isBisextile($year);

        if($jour >=1 && $jour <=28){
            $jourPreviousMonth = $jour;
            $previousMonth = $mois - 1;
            if($mois ==1){
                $previousMonth = 12;
                $year = $year - 1;
            }
        }else if($jour >=29 && $jour <=31){
            switch ($mois) {
                case 1:
                    $jourPreviousMonth = $jour;
                    $previousMonth = 12;
                    $year = $year - 1;
                    break;
                case 2:
                    if($isBixextile ==true){
                       $jourPreviousMonth = $jour;
                       $previousMonth = $mois -1;
                    }else{
                         $jourPreviousMonth = 0;
                       $previousMonth = 0;
                    }
                    break;
                case 3:
                    if($isBixextile ==true){
                       $jourPreviousMonth = $jour;
                       $previousMonth = $mois -1;
                    }else{
                         $jourPreviousMonth = $jour;
                       $previousMonth = $mois -2;
                    }
                    break;
                case 4:
                    if($isBixextile !=true){
                       $jourPreviousMonth = $jour;
                       $previousMonth = $mois -1;
                    }else{
                         $jourPreviousMonth = $jour;
                         $previousMonth = $mois -2;
                    }
                    break;
                case 5:
                    if($jour ==29 || $jour ==30){
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -1;
                    }else{
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -2;
                    }
                    break;
                case 6:
                    $jourPreviousMonth = $jour;
                    $previousMonth = $mois -1;
                    break;
                case 7:
                    if($jour ==29 || $jour ==30){
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -1;
                    }else{
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -2;
                    }
                    break;
                case 8:
                    $jourPreviousMonth = $jour;
                    $previousMonth = $mois -1;
                    break;
                case 9:
                    $jourPreviousMonth = $jour;
                    $previousMonth = $mois -1;
                    break;
                case 10:
                    if($jour ==29 || $jour ==30){
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -1;
                    }else{
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -2;
                    }
                    break;
                case 11:
                    $jourPreviousMonth = $jour;
                    $previousMonth = $mois -1;
                    break;
                case 12:
                    if($jour ==29 || $jour ==30){
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -1;
                    }else{
                        $jourPreviousMonth = $jour;
                        $previousMonth = $mois -2;
                    }
                    break;
                default:
                    $jourPreviousMonth = 0;
                    $previousMonth = 0;
                    break;
            }
        }
        else{
            $jourPreviousMonth = 0;
            $previousMonth = 0;
            $year =0;
        }

        if($jourPreviousMonth <=9){
            settype($jourPreviousMonth, "string");
            $jourPreviousMonth = "0" . $jourPreviousMonth;
        }else{
            settype($jourPreviousMonth, "string");
        }

        if($previousMonth <=9){
            settype($previousMonth, "string");
            $previousMonth = "0" . $previousMonth;
        }else{
            settype($previousMonth, "string");
        }


        settype($year, "string");


        $date = $year . "-" . $previousMonth . "-" . $jourPreviousMonth;



        return $date. " ". $dateLeng[1];

    }

    
}







?>