<?php


//require_once("./backend/database/myparams.inc.php")
//require_once("./backend/database/config.inc.php");
//require_once("./backend/admin/utils/UtilsDB.php");


class UtilsClientDB {
    function __construct(){

    }

    public static function getResult( string $dataBase, string $tableName, array $column ){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResults = UtilsDB::getTotalResult($initConnect, $tableName, $column);

        return $getResults;
    }

    public static function getResultAndOrding(string $dataBase, string $tableName, array $columnsSelect, array $columnOrder, string $ordingOrientation){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResults = UtilsDB::getTotalResultWithOrding($initConnect, $tableName, $columnsSelect, $columnOrder, $ordingOrientation);

        return $getResults;
    }

    //

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

    public static function getResultWithCondition (string $dataBase, string $tableName, array $column, array $closures, array $operators, array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResultWithClosure = UtilsDB::getResultWithClosure($initConnect, $tableName, $column, $closures, $operators, $logicOperator, $values);

        return $getResultWithClosure;

    }



    public static function getResultWithConditionAndLimit (string $dataBase, string $tableName, array $column, array $closures, array $operators, array $logicOperator, array $values, int $limitNumber){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResultWithClosure = UtilsDB::getResultWithClosureAndLimit($initConnect, $tableName, $column, $closures, $operators, $logicOperator, $values, $limitNumber);

        return $getResultWithClosure;

    }

    public static function getResultWithConditionAndOrding(string $dataBase, string $tableName, array $column, array $closures, array $operators, array $logicOperator, array $columnOrder, string $ordingCurrent , array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResultWithClosureAndOrding = UtilsDB::getResultWithClosureAndOrder($initConnect, $tableName, $column, $closures, $operators, $logicOperator, $columnOrder, $ordingCurrent,$values);

        return $getResultWithClosureAndOrding;
    }

    //getResultWithClosureAndOrder(PDO $objectPDO, string $tableName, array $columnsSelect,  array $closures, array $operators, array $logicOperator, array $columnOrder, array $values)

    public static function getResultWithJointureAndCondition(string $dataBase, string $tableName1, string $tableName2, array $columnsSelect, array $closureJoinTab1, array $closureJoinTab2, array $operatorsJoin ,  array $closures,  array $operators, array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResult = UtilsDB::getResultWithClosureAndJointure(
                        $initConnect, 
                        $tableName1, 
                        $tableName2, 
                        $columnsSelect, 
                        $closureJoinTab1, 
                        $closureJoinTab2, 
                        $closures, 
                        $operatorsJoin, 
                        $operators, 
                        $logicOperator, 
                        $values
        );

        return $getResult;
    }

    public static function getResultWithJointureMoreTwoTableAndCondition(
       string $dataBase,
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
    ){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();


        $getResult = UtilsDB::getResultWithClosureAndJointureWithMoreTwoTable(
            $initConnect,
            $tableNameLeft,
            $tableNameRight,
            $columnSelect,
            $columnClosureJoinOpLeft,
            $columnClosureJoinOpRight,
            $columnClosureFilter,
            $operatorsJoin,
            $operatorsFilter,
            $logicOperator,
            $valuesFilter
        );

        return $getResult;

    }

        public static function getResultWithJointureAndConditionAndOrding(string $dataBase,string $tableName1, string $tableName2, array $columnsSelect, array $closureJoinTab1, array $closureJoinTab2,  array $closures, array $operatorsJoin , array $operators, array $logicOperator, array $columnOrder, string $ordingCurrent, array $values)
        {
            $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
            $connect = new ConnectAnyDataBase( $dataBase, $dsn);
            $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

            $getResult = UtilsDB::getResultWithClosureAndJointureAndOrding(
                $initConnect, 
                $tableName1, 
                $tableName2, 
                $columnsSelect, 
                $closureJoinTab1, 
                $closureJoinTab2, 
                $closures, 
                $operatorsJoin, 
                $operators, 
                $logicOperator,
                $columnOrder,
                $ordingCurrent,
                $values
            );
        
        return $getResult;
    }

    public static function getImageClient(string $result){
        if(str_contains($result, ";")){
            $resultArray = explode(";", $result);
          }

        return $resultArray[1];

         
    }


    public static function insertDataByClient(string $dataBase, string  $tableName, array $column ,  array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $sqlInsertByClient = UtilsDB::insertDataBase($initConnect, $tableName, $column, $values);

        return $sqlInsertByClient;
    }

    public static function insertDataByClientAndPDO(string $dataBase, string  $tableName, array $column ,  array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        

        $sqlInsertByClient = UtilsDB::insertDataBase($initConnect, $tableName, $column, $values);

        $lastInsert = $initConnect->lastInsertId($sqlInsertByClient);
        return [ "success" =>$sqlInsertByClient, "lastIndex" => $lastInsert ];
    }

    public static function getPDOObject(string $dataBase){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        return $initConnect;
    }

    public static function UpdateSomethingByClient(string $dataBase, string  $tableName, array $columnUpdate, array $closures, array $operators, array $operatorsClosure , array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $sqlUpdate = UtilsDB::updateColumns($initConnect, $tableName, $columnUpdate, $closures, $operators, $operatorsClosure , $logicOperator, $values);

        return $sqlUpdate;
    }

    public static function deleteSomethingByClient(string $dataBase, string $tableName,  array $closures, array $operatorsClosure , array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $sqlDelete = UtilsDB::deleteRows($initConnect, $tableName, $closures, $operatorsClosure, $logicOperator, $values);

        return $sqlDelete;
    }
}





?>