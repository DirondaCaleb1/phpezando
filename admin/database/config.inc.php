<?php

//require_once("./myparams.inc.php");



// Class of the configuration of database (Class setting the establishment of database)
class Config {

    //Define the attribute of Class 

    private string $dataBase_url; //URL of Database
    private string $dataBase_host; //Host of DataBase Server

    private string $dataBase_name; //Name of Database

    private string $dataBase_password; //Password of database user

    private array $dataBase_security_opts; //Security Options to fight SQL Injections by Users

    private string $dataBase_user; //User of Database

    private int $port; //Port Listen the query of User


    
    //Define the class constructor to initialize the parameter of class
    function __construct(string $dataBase_url, int $port, string $dataBase_host, string $dataBase_user , string $dataBase_password, string $dataBase_name, array $dataBase_security_opts){
        $this->dataBase_host = $dataBase_host;
        $this->dataBase_url = $dataBase_url;
        $this->dataBase_user = $dataBase_user;
        $this->dataBase_password = $dataBase_password;
        $this->dataBase_name = $dataBase_name;
        $this->dataBase_security_opts = $dataBase_security_opts;
        $this->port = $port;
    }

    /*function __destruct(){
        //$this->initConnectToMySQL()->close();
    }*/

    //Define the getters and setters of Class
    public function getDataBaseUrl(): string
    {
        return $this->dataBase_url;
    }

    //:host=localhost'
    public function getDataBaseHost() : string 
    {
        return $this->dataBase_host;
    }

    public function getPort() : int
    {
        return $this -> port;
    }

    public function getDataBaseUser() : string
    {
        return $this->dataBase_user;
    }

    public function getDataBasePassword() : string
    {
        return $this->dataBase_password;
    }

    public function getDataBaseName() : string
    {
        return $this->dataBase_name;
    }

    public function getDataBaseSecurityOpts() : array
    {
        return $this->dataBase_security_opts;
    }

    public function setDataBaseUrl(string $dataBase_url) : void
    {
        $this->dataBase_url = $dataBase_url;
    }

    public function setDataBaseHost(string $dataBase_host) : void
    {
        $this->dataBase_host = $dataBase_host;
    }

    public function setPort(int $port) : void
    {
        $this->port = $port;
    }

    public function setDataBaseUser(string $dataBase_user){
        $this->dataBase_user = $dataBase_user;
    }

    public function setDataBasePassword(string $dataBase_password) : void
    {
        $this->dataBase_password = $dataBase_password;
    }

    public function setDataBaseName(string $dataBase_Name) : void 
    {
        $this->dataBase_name = $dataBase_Name;
    }

    public function setDataBaseSecurityOpts(array $dataBase_security_opts) : void
    {
        $this->dataBase_security_opts = $dataBase_security_opts;
    }


    //Method for establishment the connection to any database SGBDR (MySQL, MongoDB, Oracle, SQLServer SQLite, MariaDB, ....)
    public function initConnect(): PDO| string
    {
        try{
            $dbURI = $this->getDataBaseUrl().":host=".$this->getDataBaseHost() . "; dbname=" . $this ->getDataBaseName();
            $dbUser = $this -> getDataBaseUser() ;
            $dbPassword = $this->getDataBasePassword();
            $dbSecurityOpts = $this->getDataBaseSecurityOpts();
            $initPDO = new PDO($dbURI, $dbUser, $dbPassword, $dbSecurityOpts );
            return $initPDO;
        }catch(PDOException $error){
            $codeError = $error->getMessage();
            $errorMsg = "Une erreur systeme est détectée";
            return $errorMsg;
        }
    }

    public function closeConnection()
    {
        $pdo = $this->initConnect();
        $pdo = null;

        return $pdo;
    }


    //Method to establishment connection with the mysqli class
    public function initConnectToMySQL(){
        $dbHost = $this->getDataBaseHost();
        $dbUser = $this->getDataBaseUser();
        $dbPassword = $this->getDataBasePassword();
        $dbName = $this->getDataBaseName();
        $port = $this->getPort();

        $idConnectMySQL = new mysqli($dbHost, $dbUser, $dbPassword, $dbName, $port);

        return $idConnectMySQL;
    }

    public function throwErrorConnectToMySQL():string|null
    {
        if($this->initConnectToMySQL() === false && $this->initConnectToMySQL()->ping() ===false ){
            $error = "Une erreur de configuration est survenue code" . $this->initConnectToMySQL()->connect_errno;
            return $error;
        }else{
            return null;
        }
    }

    public function checkConnection():bool
    {
        return $this->initConnectToMySQL()->ping();
    }
}

class ConnectAnyDataBase{
   
    private string $dbName;
    private array $dataBase_security_opts;

    function __construct( string $dbName, array $dataBase_security_opts){
        $this -> dbName = $dbName;
        $this->dataBase_security_opts = $dataBase_security_opts;
    }



    public function getDbName() : string
    {
        return $this->dbName;
    }

    public function getDataBaseSecurityOpts(): array 
    {
        return $this->dataBase_security_opts;
    }

    public function setDbName(string $dbName) : void 
    {
        $this->dbName = $dbName;
    }

    public function setDataBaseSecurityOpts(array $dataBase_security_opts) : void
    {
        $this -> dataBase_security_opts = $dataBase_security_opts;
    }

  

    public  function connectToMySQLWithPDO(){
        $objConfigPDO = new Config(URLMYSQL, PORTMYSQLLOCAL, HOSTMYSQLLOCAL, USERMYSQLLOCAL, PASSWORDMYSQLLOCAL, $this->getDbName(), $this->getDataBaseSecurityOpts());
        return $objConfigPDO;
    }

    public function connectToMySQLWithMysqli(){
        $objetConfigMySQLi = new Config(URLMYSQL, PORTMYSQLLOCAL, HOSTMYSQLLOCAL, USERMYSQLLOCAL, PASSWORDMYSQLLOCAL, $this->getDbName(), $this->getDataBaseSecurityOpts());
        $initMySQLi = $objetConfigMySQLi->initConnectToMySQL();
        return $initMySQLi;
    }
}


function connectWithPDO(string $dbName, array $options){
    $connect = new ConnectAnyDataBase($dbName, $options);
    
    return $connect->connectToMySQLWithPDO();
}

function connectWithMysqli(string $dbName, array $options) : mysqli | null
{
    $connect = new ConnectAnyDataBase($dbName, $options);

    if(mysqli_connect_errno() ===0){
       return $connect->connectToMySQLWithMysqli();
    }else{
        return null;
    }
    

}




?>