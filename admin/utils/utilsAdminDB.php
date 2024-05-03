<?php

class UtilsAdminDB {
    public static function insertDataByAdmin(string $dataBase, string  $tableName, array $column ,  array $values ){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $sqlInsertByClient = UtilsDB::insertDataBase($initConnect, $tableName, $column, $values);
        return $sqlInsertByClient;
    }

    public static function getResultByAdmin( string $dataBase, string $tableName, array $column ){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResults = UtilsDB::getTotalResult($initConnect, $tableName, $column);

        return $getResults;
    }

    public static function getResultWithCondition (string $dataBase, string $tableName, array $column, array $closures, array $operators, array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $getResultWithClosure = UtilsDB::getResultWithClosure($initConnect, $tableName, $column, $closures, $operators, $logicOperator, $values);

        return $getResultWithClosure;

    }

    public static function getResultWithJointureAndCondition(
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

    public static function updateSomethingByAdmin(string $dataBase, string  $tableName, array $columnUpdate, array $closures, array $operators, array $operatorsClosure , array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $sqlUpdate = UtilsDB::updateColumns($initConnect, $tableName, $columnUpdate, $closures, $operators, $operatorsClosure , $logicOperator, $values);

        return $sqlUpdate;
    }

    public static function deleteSomethingByAdmin(string $dataBase, string $tableName,  array $closures, array $operatorsClosure , array $logicOperator, array $values){
        $dsn = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
        $connect = new ConnectAnyDataBase( $dataBase, $dsn);
        $initConnect = $connect->connectToMySQLWithPDO()->initConnect();

        $sqlDelete = UtilsDB::deleteRows($initConnect, $tableName, $closures, $operatorsClosure, $logicOperator, $values);

        return $sqlDelete;
    }
}


?>