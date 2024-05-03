<?php

//Open session
session_start();
include("includes/header.php");

include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");

if ($checkConn) {

    if (isset($_GET['t'])) { //If $_GET['t'] exists

        //Tracking No 
        $tracking_number = $_GET['t'];

        //TableName orders
        $tableNameOrder= "orders";

        //Column to filter user_id
        $columnNameFilterUser = "user_id";

        //Column to filter user_id
        $valueFilterUser = $_SESSION['auth_user']['user_id'];


        //Array trackingNo contains result array and the number of all rows in the orders table 
        $arrayTrackingNo = UtilsClient::checkingTrackingNoValid(
            $database,
            $tableNameOrder,
            $tracking_number,
            $columnNameFilterUser,
            $valueFilterUser
        );

        //Array result of query SELECT in the orders table
        $resultTrackingNo =  $arrayTrackingNo["result"];

        //Number of total rows in the result SELECT query
        $num_row_count = $arrayTrackingNo["rowTotals"];

        if($num_row_count < 0){ //If it's not item in orders table
        ?>
<h4>Une erreur est survénue</h4>
<?php
            die(); //Stop immediately script

        }

        
    } else {
        ?>
<h4>Une erreur est survénue</h4>
<?php
     die(); //Stop immediately script
    }
?>

<div class="py-3 bg-primary">
    <div class="container">
        <h6 class="text-white">
            <a href="index.php" class="text-decoration-none text-white">
                Accueil /
            </a>
            <a href="my-orders.php" class="text-decoration-none text-white">
                Mes Commandes /
            </a>
            <a href="#" class="text-decoration-none text-white">
                Voir une commande
            </a>

        </h6>
    </div>
</div>

<?php
    
    //TableName orders
    $tableNameLeft = "orders o";

    //TableNames order_items and products
    $tableNameRight = ["order_items oi", "products p"];
    
    //Column Selected
    $columnsSelectJoin = ["o.id AS oid", "o.tracking_no", "o.user_id", "oi.*", "oi.qty AS orderQty", "p.*"];
    
    //Column Lefts to operators Join to join
    $columnClosureJoinOpLeft = ["o.id", "p.id"];

    //Column Rights to operators Join to join
    $columnClosureJoinOpRight = ["oi.order_id", "oi.product_id"];

    //Column to filter the result
    $columnClosureFilter = ["user_id", "o.tracking_no"];

    //Operators to Join
    $operatorsJoin = ["=", "="];

    //Operators to filter the result
    $operatorsFilter = ["=", "="];

    //Logic operator to filter the result
    $logicOperator = ["AND"];

    //Value to filter the result
    $valuesFilter = [$valueFilterUser, $tracking_number];

        //Array result contains the total number of rows of result query SELECT and array the result query
        $arrayResultOrderAndProductAssoc = UtilsClientDB::getResultWithJointureMoreTwoTableAndCondition(
            $database,
            $tableNameLeft,
            $tableNameRight,
            $columnsSelectJoin,
            $columnClosureJoinOpLeft,
            $columnClosureJoinOpRight,
            $columnClosureFilter,
            $operatorsJoin,
            $operatorsFilter,
            $logicOperator,
            $valuesFilter
        );

        

        //Number rows of result query select
        $numRowOrderProd = $arrayResultOrderAndProductAssoc["rowTotals"];

        //Array of result of query select
        $resultTotal = $arrayResultOrderAndProductAssoc["result"];

        //Prefix of image products path
        $prefixeClient = "img/admin/produits/";

        
    ?>


<div class="py-5">
    <div class="container">
        <div class="">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header bg-primary">
                            <span class="text-white fs-4">Voir une commande</span>
                            <a href="my-orders.php" class="btn btn-warning float-end text-decoration-none"><i
                                    class="fa fa-reply me-1"></i>Retour</a>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>Details de la Livraison</h4>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <label class="fw-bold">Nom :</label>
                                            <div class="border p-1">
                                                <!-- Name of User  -->
                                                <?= $resultTrackingNo[0][3] ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <label class="fw-bold">Email :</label>
                                            <div class="border p-1">
                                                <!-- Email of User  -->
                                                <?= $resultTrackingNo[0][4] ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <label class="fw-bold">Numero de téléphone :</label>
                                            <div class="border p-1">
                                                <!-- Phone of User  -->
                                                <?= $resultTrackingNo[0][5] ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <label class="fw-bold">Tracking No :</label>
                                            <div class="border p-1">
                                                <!-- Tracking_no of User order  -->
                                                <?= $resultTrackingNo[0][1] ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <label class="fw-bold">Adresse :</label>
                                            <div class="border p-1">
                                                <!-- Adress of User  -->
                                                <?= $resultTrackingNo[0][6] ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <label class="fw-bold">Pin Code</label>
                                            <div class="border p-1">
                                                <!-- Pin Code of User  -->
                                                <?= $resultTrackingNo[0][7] ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Details of orders -->
                                <div class="col-md-6">
                                    <h4>Details de la Commande</h4>
                                    <hr>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Produit</th>
                                                <th>Prix</th>
                                                <th>Quantité</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                      if($numRowOrderProd >0){ // If a less one element
                                          

                                          foreach ($resultTotal as $item) { //Iterate all products
                                               ?>
                                            <tr>
                                                <td class="align-middle">

                                                    <!-- Image and Name of Product  -->
                                                    <img src="<?=$prefixeClient.$item['image'] ?>"
                                                        alt="<?=$item['name'] ?>" width="50px" height="50px">
                                                    <!-- Name of Product  -->
                                                    <?=$item['name'] ?>
                                                </td>
                                                <td class="align-middle">
                                                    <!-- Price of Product  -->
                                                    <?=$item['price'] ?>
                                                </td>
                                                <td class="align-middle">
                                                    <!-- Qty of Products order  -->
                                                    <?=$item['orderQty'] ?>
                                                </td>
                                            </tr>
                                            <?php
                                          }
                                          

                                      }
                                    ?>



                                        </tbody>
                                    </table>
                                    <hr>
                                    <h5>Prix Total : <span class="float-end fw-bold">
                                            <!-- Total Price of Products order  -->
                                            <?= $resultTrackingNo[0][8] ?>
                                        </span>
                                    </h5>
                                    <hr>
                                    <label class="fw-bold">Mode de Paiement</label>
                                    <div class="border p-1 mb-3">
                                        <!-- Mode Payment  -->
                                        <?= $resultTrackingNo[0][9]  ?>
                                    </div>
                                    <label class="fw-bold">Status</label>
                                    <div class="border p-1 mb-3">
                                        <!-- Status of Products order  -->
                                        <?php
                                        if(
                                          $resultTrackingNo[0][11] == 0 
                                        ){
                                            echo "En cours de traitement";
                                        }else if ( $resultTrackingNo[0][11] == 1){
                                            echo "Complété";
                                        }else if ( $resultTrackingNo[0][11] == 2){
                                            echo "Supprimé";
                                        }
                                          
                                         ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>


<?php include("includes/footer.php"); ?>

<?php


}else {
    require_once("error-config.php");
} ?>