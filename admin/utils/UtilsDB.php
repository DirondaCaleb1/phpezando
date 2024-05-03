<?php


class UtilsDB{


    function __construct(){
        
    }

    public static function checkConnection(string $dataBase){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        if(gettype($initConnect) !="string"){
            return true;
        }else{
            return false;
        }
    }

  public static function insertDataBase(PDO $objectPDO, string  $tableName, array $column ,  array $values )
  {

        $strColums = "";
        $strMarkerQuest = "?";
        $i = 0;

        while($i < count($column)){
            if($i==0){
                $strColums .= $column[0];
            }
                                 
            if($i>0){
                $strColums .= " , ".$column[$i];
                $strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }


        $sqlInsertPrepare = "INSERT INTO  {$tableName} ({$strColums})  VALUES({$strMarkerQuest}) ";


        $queryPrepare = $objectPDO ->prepare($sqlInsertPrepare);

        $execute =$queryPrepare->execute($values);

        return $execute;
  }


  public static function getResultWithClosure(PDO $objectPDO, string $tableName, array $columnsSelect,  array $closures, array $operators, array $logicOperator, array $values){
        
                $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]." ".$operators[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j] ." ".$closures[$k]." ".$operators[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $sqlClosure = "SELECT {$strColumsSelect}  FROM {$tableName} WHERE {$strColumnClosure}";
        //return  $sqlClosure;
        
         $queryPrepare = $objectPDO ->prepare($sqlClosure);
        $queryPrepare->execute($values);
        
                //PDO::FETCH_ASSOC 
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_NUM);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];
  }

  public static function getResultWithClosureAndOrder(PDO $objectPDO, string $tableName, array $columnsSelect,  array $closures, array $operators, array $logicOperator, array $columnOrder, string $ordingCurrent, array $values){
        
                $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]." ".$operators[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j] ." ".$closures[$k]." ".$operators[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $l = 0;
        
        $strColumnOrder = "";

        while($l < count($columnOrder)){
            if($l==0){
                $strColumnOrder .= $columnOrder[0];
            }
                                 
            if($l>0){
                $strColumnOrder .= " , ".$columnOrder[$l];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $l++;
        }




        $sqlClosure = "SELECT {$strColumsSelect}  FROM {$tableName} WHERE {$strColumnClosure} ORDER BY {$strColumnOrder} {$ordingCurrent}";

        
        $queryPrepare = $objectPDO ->prepare($sqlClosure);
        $queryPrepare->execute($values);
        
                //PDO::FETCH_ASSOC 
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_NUM);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];
  }

  public static function getTotalResult(PDO $objectPDO, string $tableName, array $columnsSelect){
                    $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

                $sqlClosure = "SELECT {$strColumsSelect}  FROM {$tableName}";
        //return  $sqlClosure;
        
         $queryPrepare = $objectPDO ->prepare($sqlClosure);
        $queryPrepare->execute();
        
                //PDO::FETCH_ASSOC 
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_NUM);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];
  }

  public static function getTotalResultWithOrding(PDO $objectPDO, string $tableName, array $columnsSelect, array $columnOrder, string $ordingOrientation){
        $strColumsSelect = "";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $strColumnsOrding = "";
        $j = 0;

        while($j < count($columnOrder)){
            if($j==0){
                $strColumnsOrding .= $columnOrder[0];
            }
                                 
            if($j>0){
                $strColumnsOrding .= " , ".$columnOrder[$j];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $j++;
        }

        $sqlClosure = "SELECT {$strColumsSelect}  FROM {$tableName} ORDER BY {$strColumnsOrding} {$ordingOrientation} LIMIT 0,5";

    
        
         $queryExecute = $objectPDO ->query($sqlClosure);
        
                //PDO::FETCH_ASSOC 
        $queryResult =  $queryExecute -> fetchAll(PDO::FETCH_NUM);
        $numRowsResult =  $queryExecute->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];
  }

    public static function getResultWithClosureAndLimit(PDO $objectPDO, string $tableName, array $columnsSelect,  array $closures, array $operators, array $logicOperator, array $values, int $limitNumber){
        
                $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]." ".$operators[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j] ." ".$closures[$k]." ".$operators[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $sqlClosure = "SELECT {$strColumsSelect}  FROM {$tableName} WHERE {$strColumnClosure} LIMIT $limitNumber";
        //return  $sqlClosure;
        
         $queryPrepare = $objectPDO ->prepare($sqlClosure);
        $queryPrepare->execute($values);
        
                //PDO::FETCH_ASSOC 
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_NUM);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];
  }

  public static function getTotalResultAndLimit(PDO $objectPDO, string $tableName, array $columnsSelect, int $limitNumber){
        $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

                $sqlClosure = "SELECT {$strColumsSelect}  FROM {$tableName} LIMIT $limitNumber";
        //return  $sqlClosure;
        
         $queryPrepare = $objectPDO ->prepare($sqlClosure);
        $queryPrepare->execute();
        
                //PDO::FETCH_ASSOC 
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_NUM);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];
  }


  public static function getResultWithClosureAndJointure(PDO $objectPDO, string $tableName1, string $tableName2, array $columnsSelect, array $closureJoinTab1, array $closureJoinTab2,  array $closures, array $operatorJoin , array $operators, array $logicOperator, array $values){
      
    
        $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]. " ".$operators[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j]." ".$closures[$k]." ".$operators[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $l = 0;
        $m = 0;
        $strColumClosureJoin = "";
        while($l < count($closureJoinTab1) && $l < count($closureJoinTab2)){
            if($l==0){
                $strColumClosureJoin .= $closureJoinTab1[0] . $operatorJoin[0] . $closureJoinTab2[0];
            }

                        if($l>0){
                while($m <count($logicOperator)){
                  $strColumClosureJoin .= $closureJoinTab1[$m] . $operatorJoin[$m] . $closureJoinTab2[$m];
                  $m++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }

            $l++;
        }

        

        $sqlInner = "SELECT {$strColumsSelect} FROM {$tableName1} INNER JOIN {$tableName2} ON {$strColumClosureJoin} WHERE {$strColumnClosure}";

        $queryPrepare = $objectPDO->prepare($sqlInner);

        $queryPrepare->execute($values);
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_ASSOC);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];     
  }

    public static function getResultWithClosureAndJointureAndOrding(PDO $objectPDO, string $tableName1, string $tableName2, array $columnsSelect, array $closureJoinTab1, array $closureJoinTab2,  array $closures, array $operatorJoin , array $operators, array $logicOperator, array $columnOrder, string $ordingCurrent, array $values){
      
    
        $strColumsSelect = "";
        
        //$strOperator = "";
        //$strMarkerQuest = "?";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]. " ".$operators[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j]." ".$closures[$k]." ".$operators[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $l = 0;
        $m = 0;
        $strColumClosureJoin = "";
        while($l < count($closureJoinTab1) && $l < count($closureJoinTab2)){
            if($l==0){
                $strColumClosureJoin .= $closureJoinTab1[0] . $operatorJoin[0] . $closureJoinTab2[0];
            }

            if($l>0){
                while($m <count($logicOperator)){
                  $strColumClosureJoin .= $closureJoinTab1[$m] . $operatorJoin[$m] . $closureJoinTab2[$m];
                  $m++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }

            $l++;
        }

    

        $n = 0;
        
        $strColumnOrder = "";

        while($n < count($columnOrder)){
            if($n==0){
                $strColumnOrder .= $columnOrder[0];
            }
                                 
            if($n>0){
                $strColumnOrder .= " , ".$columnOrder[$n];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $n++;
        }



        

        

        $sqlInner = "SELECT {$strColumsSelect} FROM {$tableName1} INNER JOIN {$tableName2} ON {$strColumClosureJoin} WHERE {$strColumnClosure} ORDER BY {$strColumnOrder} {$ordingCurrent}";

        $queryPrepare = $objectPDO->prepare($sqlInner);

        $queryPrepare->execute($values);
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_ASSOC);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];   
    }

  public static function getResultWithClosureAndJointureAndLimit(PDO $objectPDO, string $tableName1, string $tableName2, array $columnsSelect, array $closureJoinTab1, array $closureJoinTab2,  array $closures, array $operatorJoin , array $operators, array $logicOperator, array $values, int $limitNumber){
      
    
        $strColumsSelect = "";
        $i = 0;

        while($i < count($columnsSelect)){
            if($i==0){
                $strColumsSelect .= $columnsSelect[0];
            }
                                 
            if($i>0){
                $strColumsSelect .= " , ".$columnsSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]. " ".$operators[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j]." ".$closures[$k]." ".$operators[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $l = 0;
        $m = 0;
        $strColumClosureJoin = "";
        while($l < count($closureJoinTab1) && $l < count($closureJoinTab2)){
            if($l==0){
                $strColumClosureJoin .= $closureJoinTab1[0] . $operatorJoin[0] . $closureJoinTab2[0];
            }

                        if($l>0){
                while($m <count($logicOperator)){
                  $strColumClosureJoin .= $closureJoinTab1[$m] . $operatorJoin[$m] . $closureJoinTab2[$m];
                  $m++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }

            $l++;
        }

        

        $sqlInner = "SELECT {$strColumsSelect} FROM {$tableName1} INNER JOIN {$tableName2} ON {$strColumClosureJoin} WHERE {$strColumnClosure} LIMIT $limitNumber";

        $queryPrepare = $objectPDO->prepare($sqlInner);

        $queryPrepare->execute($values);
        $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_ASSOC);
        $numRowsResult = $queryPrepare->rowCount();

        return ["result" => $queryResult, "rowTotals" => $numRowsResult];     
  }



  public static function getResultWithClosureAndJointureWithMoreTwoTable(
    PDO $objectPDO, 
    string $tableNameLeft, 
    array $tableNameRight, 
    array $columnSelect, 
    array $columnClosureJoinOpLeft, 
    array $columnClosureJoinOpRight, 
    array $columnClosureFilter, 
    array $operatorsJoin, 
    array $operatorsFilter, 
    array $logicOperator, 
    array $valuesFilter
  ) 
  {
     
        $strColumnsSelect = "";
        $i = 0;

        while($i < count($columnSelect)){
            if($i==0){
                $strColumnsSelect .= $columnSelect[0];
            }
                                 
            if($i>0){
                $strColumnsSelect .= " , ".$columnSelect[$i];
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $j =0;
        $k = 0;
        $strColumnClosure = "";
        while($k < count($columnClosureFilter)){
            if($k==0){
                $strColumnClosure .= $columnClosureFilter[0]. " ".$operatorsFilter[0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j]." ".$columnClosureFilter[$k]." ".$operatorsFilter[$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }

        $l=0;
        $m = 0;
        $n = 0;
        $p = 0;
        $strColumnJointures= "";

        if(count($tableNameRight) == count($operatorsJoin) && count($columnClosureJoinOpLeft) == count($columnClosureJoinOpRight)){
            while($l <count($tableNameRight) && $m <count($columnClosureJoinOpLeft) && $n <count($columnClosureJoinOpRight)){
                if($l ==0){
                    $strColumnJointures .= "INNER JOIN {$tableNameRight[$l]} ON {$columnClosureJoinOpLeft[0]} {$operatorsJoin[0]} {$columnClosureJoinOpRight[0]} "; 
                }else if(count($tableNameRight) ==2 ){
                    $strColumnJointures .= "INNER JOIN {$tableNameRight[$l]} ON {$columnClosureJoinOpLeft[$m]} {$operatorsJoin[$l]} {$columnClosureJoinOpRight[$n]} ";
                }else {
                    $strColumnJointures .= "INNER JOIN {$tableNameRight[$l]} ON {$columnClosureJoinOpLeft[$m]} {$operatorsJoin[$l]} {$columnClosureJoinOpRight[$n]} ";
                }
                $l++;
                $m++;
                $n++;
            }

            $sqlJoin = "SELECT {$strColumnsSelect} FROM {$tableNameLeft} {$strColumnJointures} WHERE {$strColumnClosure}";

            
            
            $queryPrepare = $objectPDO->prepare($sqlJoin);

            $queryPrepare->execute($valuesFilter);
            $queryResult = $queryPrepare -> fetchAll(PDO::FETCH_ASSOC);
            $numRowsResult = $queryPrepare->rowCount();

            return ["result" => $queryResult, "rowTotals" => $numRowsResult];
        }

        return [];


  }


  

  public static function updateColumns(PDO $objectPDO, string $tableName, array $columnUpdate, array $closures, array $operators, array $operatorsClosure , array $logicOperator, array $values){

        $i = 0;
        $j = 0;
        $k = 0;

        $strUpdate = "";

                while($i < count($columnUpdate)){
            if($i==0){
                $strUpdate .= $columnUpdate[0]."".$operators[0]." ?";
            }
                                 
            if($i>0){
                $strUpdate .= " , ".$columnUpdate[$i]."".$operators[$i]." ?";
                //$strMarkerQuest .= " , " . "?";
            }
                                
            $i++;
        }

        $strColumnClosure = "";

                while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]." ".$operatorsClosure [0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j] ." ".$closures[$k]." ".$operatorsClosure [$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }


    $sqlUpdate = "UPDATE {$tableName} SET {$strUpdate} WHERE {$strColumnClosure} " ;

     $queryPrepare = $objectPDO ->prepare($sqlUpdate);
     return $queryPrepare->execute($values);
  }

  public static function deleteRows(PDO $objectPDO, string $tableName,  array $closures, array $operatorsClosure , array $logicOperator, array $values){
            $j = 0;
        $k = 0;
    $strColumnClosure ="";

                    while($k < count($closures)){
            if($k==0){
                $strColumnClosure .= $closures[0]." ".$operatorsClosure [0]." ? ";
            }
                                 
            if($k>0){
                while($j <count($logicOperator)){
                  $strColumnClosure .= $logicOperator[$j] ." ".$closures[$k]." ".$operatorsClosure [$k]." ? ";
                  $j++;
                }
                
                //$strMarkerQuest .= " , " . "?";
            }
             $k++;                   
           
        }



        $sqlDelete = "DELETE FROM {$tableName} WHERE  {$strColumnClosure} ";

        $queryPrepare = $objectPDO ->prepare($sqlDelete);
        return $queryPrepare->execute($values);
  }

  
}



?>