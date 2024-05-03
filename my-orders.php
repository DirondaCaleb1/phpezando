<?php

//Open session
session_start();
include("includes/header.php");

include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");

if ($checkConn) {

?>

<div class="py-3 bg-primary">
    <div class="container">
        <h6 class="text-white">
            <a href="index.php" class="text-decoration-none text-white">
                Accueil /
            </a>
            <a href="my-orders.php" class="text-decoration-none text-white">
                Mes Commandes
            </a>

        </h6>
    </div>
</div>

<?php



//Initialize Variables

//TableName Orders
$tableNameOrder= "orders";

//Column to filter user_id
$columnNameFilterUser = "user_id";

//Value to filter user_id
$valueFilterUser = $_SESSION['auth_user']['user_id'];

//Ording Column
$ordingColumns = ["id"];

//Ording Orientation
$ordingCurrent = "DESC";


    //Array contains the result and number of rows of result of SELECT query in the orders table
    $arrayOrder = UtilsClient::getOrdersItems(
       $database,
       $tableNameOrder, 
       $columnNameFilterUser, 
       $valueFilterUser, 
       $ordingColumns,
       $ordingCurrent
    );

    //Result Orders table
    $resultOrder = $arrayOrder["result"];

    //Number of rows of result query SELECT
    $num_row_count =  $arrayOrder["rowTotals"];

?>


<div class="py-5">
    <div class="container">
        <div class="">
            <div class="row">
                <div class="col-md-12">


                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
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

                            //Date of orders
                            $date = UtilsClient::getDateInAnyFormat($item[13], "french", "digit")["dateComplet"];
                            ?>
                        <tbody>

                            <tr>
                                <!-- Id of Orders Table  -->
                                <td><?= $item[0] ?></td>
                                <!-- Tracking_no of Orders Table  -->
                                <td><?= $item[1] ?></td>
                                <!-- Price of Orders Table  -->
                                <td><?= $item[8] ?></td>
                                <!-- Created_at of Orders Table  -->
                                <td><?= $date  ?></td>
                                <!-- Tracking_no of Orders Table  -->
                                <td><a href="view-order.php?t=<?= $item[1] ?>" class="btn btn-primary">Voir les
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
    require_once("error-config.php");
} ?>