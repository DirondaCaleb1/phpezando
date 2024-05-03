<?php

include("./includes/header.php");


//echo substr($_SERVER['SCRIPT_NAME'], strrpos($_SERVER['SCRIPT_NAME'], '/')+1);
$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);

if ($checkConn) {

    $tableNameUser = "users";
    $columnSelectUsers = ["*"];
    $closuresSelectUsers = ["role_as"];
    $valuesSelectUsers = ["1"];
    $operatorsSelectUsers = ["!="];
    $logicOperatorsSelectUsers = [""];

    //$columnPourcen

    $arraySelectUsers = UtilsAdminDB::getResultWithCondition(
        $database,
        $tableNameUser,
        $columnSelectUsers,
        $closuresSelectUsers,
        $operatorsSelectUsers,
        $logicOperatorsSelectUsers,
        $valuesSelectUsers
    );


    $dateActuelle = date("Y-m-d h:i:s");
    $dateAnterieur = Utils::getDatePreviousMonth($dateActuelle);

    $dateAny = date("Y-m-d");

    $closuresSelectUsersPreviowsMonth = ["role_as", "created_at", "created_at" ];
    $valuesSelectUsersPreviowsMonth = ["1", $dateAnterieur, $dateActuelle ];
    $operatorsSelectUsersPreviowsMonth = ["!=", ">=", "<="];
    $logicOperatorsSelectUsersPreviowsMonth = ["AND", "AND"];

    $arrayUserS = UtilsAdminDB::getResultWithCondition(
        $database,
        $tableNameUser,
        $columnSelectUsers,
        $closuresSelectUsersPreviowsMonth,
        $operatorsSelectUsersPreviowsMonth,
        $logicOperatorsSelectUsersPreviowsMonth,
        $valuesSelectUsersPreviowsMonth
    );

    $closuresSelectUsersNew = ["role_as",  "created_at" ];
    $valuesSelectUsersNew = ["1",  $dateActuelle ];
    $operatorsSelectUsersNew = ["!=", ">="];
    $logicOperatorsSelectUsersNew = ["AND"];

    $arrayUserNew = UtilsAdminDB::getResultWithCondition(
        $database,
        $tableNameUser,
        $columnSelectUsers,
        $closuresSelectUsersNew,
        $operatorsSelectUsersNew,
        $logicOperatorsSelectUsersNew,
        $valuesSelectUsersNew
    );

    $closuresSelectUserNew = ["role_as",  "created_at" ];
    $valuesSelectUserNew = ["1",  $dateActuelle];
    $operatorsSelectUserNew = ["!=", ">="];
    $logicOperatorsSelectUserNew = ["AND"];

    $arrayNewUser = UtilsAdminDB::getResultWithCondition(
        $database,
        $tableNameUser,
        $columnSelectUsers,
        $closuresSelectUserNew,
        $operatorsSelectUserNew,
        $logicOperatorsSelectUserNew,
        $valuesSelectUserNew
    );

    $pourcent = 0.0;

    $pourcentageUserLastMonth = $arrayUserS['rowTotals']*100/100;
    $pourcentageUserNow = $arrayUserNew['rowTotals']*100/100;

    if ($arrayUserS['rowTotals'] >0){
        $pourcent = $pourcent+ $arrayUserNew['rowTotals'] * 100 / $arrayUserS['rowTotals'];
    }else{
        $pourcent = $pourcent + $arrayUserNew['rowTotals'];
    }

    $pourcentage = $pourcentageUserNow - $pourcentageUserLastMonth;





    $resultSelectUsers = $arraySelectUsers["result"];
    $num_row_count = $arraySelectUsers["rowTotals"];


    //
    $newUserCount = $arrayNewUser["rowTotals"];



?>

<div class="container">
    <div class="col-md-12">
        <div class="row mt-4">
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-header p-3 pt-2">
                        <div
                            class="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute d-flex align-items-center justify-content-center">
                            <i class="fa fa-2x fa-bag-shopping text-white"></i>
                        </div>
                        <div class="text-end pt-1">
                            <p class="text-sm mb-0 text-capitalize">Solde d'aujord'hui</p>
                            <h4 class="mb-0">75K FCFA</h4>
                        </div>
                    </div>
                    <hr class="dark horizontal my-0">
                    <div class="card-footer p-3">
                        <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+55% </span> que la
                            semaine dernière
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-header p-3 pt-2">
                        <div
                            class="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute d-flex align-items-center justify-content-center">
                            <i class="fa fa-2x fa-user text-white"></i>
                        </div>

                        <div class="text-end pt-1">
                            <p class="text-sm mb-0 text-capitalize">Clients actuelle</p>
                            <h4 class="mb-0"><?= $num_row_count ==0 ? 0 : $num_row_count ?></h4>

                        </div>

                    </div>
                    <hr class="dark horizontal my-0">
                    <div class="card-footer p-3">
                        <p class="mb-0"><span class="text-success text-sm font-weight-bolder">
                                <?= $pourcentage>=0 ? "+" : "-" ?><?= $pourcentage ?>% </span>
                            par rapport au
                            dernier mois
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-header p-3 pt-2">
                        <div
                            class="icon icon-lg icon-shape bg-gradient-success shadow-success shadow text-center border-radius-xl mt-n4 position-absolute d-flex align-items-center justify-content-center">
                            <i class="fa fa-2x fa-user text-white"></i>
                        </div>
                        <div class="text-end pt-1">
                            <p class="text-sm mb-0 text-capitalize">Nouveau client</p>
                            <h4 class="mb-0"><?=$newUserCount ?></h4>
                        </div>
                    </div>
                    <hr class="dark horizontal my-0">
                    <div class="card-footer p-3">
                        <p class="mb-0"><span class="text-danger text-sm font-weight-bolder">-2% </span> que
                            hier
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-header p-3 pt-2">
                        <div
                            class="icon icon-lg icon-shape bg-gradient-info shadow-info shadow text-center border-radius-xl mt-n4 position-absolute d-flex align-items-center justify-content-center">
                            <i class="fa fa-2x fa-bag-shopping text-white"></i>
                        </div>
                        <div class="text-end pt-1">
                            <p class="text-sm mb-0 text-capitalize">Ventes</p>
                            <h4 class="mb-0">5000 FCFA</h4>
                        </div>
                    </div>
                    <hr class="dark horizontal my-0">
                    <div class="card-footer p-3">
                        <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+5% </span> que hier
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php      

include_once("./includes/footer.php");

?>


<?php
}else {
    require_once("../error-config.php");
}
?>