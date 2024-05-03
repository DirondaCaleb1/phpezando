<?php

include("./includes/header.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);


if ($checkConn) {

?>

<?php



//Initialize Variables

//TableNameLeft orders
$tableNameOrderLeft= "orders o";

//TableName users
$tableNameRight = ["users u"];

//Column Left to join
$columnClosureJoinOpLeft = ["o.user_id"];

//Column Right to join
$columnClosureJoinOpRight = ["u.id"];

//Operator join
$operatorsJoin = ["="];

//Column to filter the orders item
$columnStatut = "o.status";

//Value to filter the orders item
$valueStatut = "0";

    //Array contains the array result in the orders join user table and the total number of row of query SELECT
    $arrayOrder =Utils:: getOrdersHistory(
        $database, 
        $tableNameOrderLeft, 
        $tableNameRight, 
        $columnClosureJoinOpLeft, 
        $columnClosureJoinOpRight,
        $operatorsJoin, 
        $columnStatut, 
        $valueStatut
    );


    //Array contains result of query SELECT
    $resultOrder = $arrayOrder["result"];

    //Total number of rows of query SELECT
    $num_row_count =  $arrayOrder["rowTotals"];


?>


<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary">
                    <h4 class="text-white">
                        Historique des Commandes
                        <a href="orders.php" class="text-decoration-none btn btn-warning float-end">Retour</a>
                    </h4>
                </div>
                <div class="card-body" id="">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Tracking No</th>
                                <th>Prix</th>
                                <th>Date</th>
                                <th>Voir Details</th>
                            </tr>
                        </thead>
                        <?php
                        if(
                          $num_row_count >0
                        ){ //If less one item in the orders table
                        ?>
                        <?php
                        foreach ($resultOrder as $item) { //Iterate all items in the orders table

                            //created_at 
                            $date = Utils::getDateInAnyFormat($item["created_at"], "french", "digit")["dateComplet"];
                            ?>
                        <tbody>

                            <tr>
                                <!-- Id order -->
                                <td><?= $item["id"] ?></td>
                                <!-- name of user order -->
                                <td><?= $item["oname"] ?></td>
                                <!-- Tracking_No order -->
                                <td><?= $item["tracking_no"] ?></td>
                                <!-- Total price of products in the order -->
                                <td><?= $item["total_price"] ?></td>
                                <!-- created_at order -->
                                <td><?= $date  ?></td>
                                <!-- Tracking_no order -->
                                <td><a href="view-order.php?t=<?= $item["tracking_no"] ?>" class="btn btn-primary">Voir
                                        les
                                        détails</a></td>
                            </tr>


                            <?php
                        }
                       }else{
                        ?>
                            <tr>
                                <td colspan="5">Aucune commande</td>

                            </tr>
                            <?php
                       }
                       ?>
                        </tbody>

                    </table>


                </div>
            </div>

        </div>
    </div>
</div>


<?php include("includes/footer.php"); ?>

<?php }else {
    require_once("../error-config.php");
} ?>