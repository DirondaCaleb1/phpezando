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
    $arrayOrder =Utils:: getAllOrdersItems(
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


<?php
    if (isset($_GET['t'])) { //If isset $_GET['t']

        //Tracking No
        $tracking_number = $_GET['t'];

        //TableName Orders
        $tableNameOrder= "orders";


        //Array contains the array result in the orders table and the total number of row of query SELECT
        $arrayTrackingNo = Utils::checkingTrackingNoValidByAdmin(
            $database,
            $tableNameOrder,
            $tracking_number
        );

        //Array contains result of query SELECT
        $resultTrackingNo =  $arrayTrackingNo["result"];

        //Total number of rows of query SELECT
        $num_row_count = $arrayTrackingNo["rowTotals"];

        if($num_row_count < 0){ //If any item in orders table
        ?>
<h4>Une erreur est survénue</h4>
<?php
            die();

        }

        
    } else {
        ?>
<h4>Une erreur est survénue</h4>
<?php
     die();
    }
?>



<?php

    //TableNameLeft orders
    $tableNameLeft = "orders o";

    //TableNameRight order_items and products
    $tableNameRight = ["order_items oi", "products p"];

    //Column to Select
    $columnsSelectJoin = ["o.id AS oid", "o.tracking_no", "o.user_id", "oi.*", "oi.qty AS orderQty", "p.*"];
    
    //Columns Left to join
    $columnClosureJoinOpLeft = ["o.id", "p.id"];

    //Columns Right to join
    $columnClosureJoinOpRight = ["oi.order_id", "oi.product_id"];

    //Column to filter the orders item by tracking_no
    $columnClosureFilter = [ "o.tracking_no"];

    //Operators to join
    $operatorsJoin = ["=", "="];

    //Operators to filter the orders item by tracking_no
    $operatorsFilter = ["="];

    //Logic Operator to filter the orders item by tracking_no
    $logicOperator = [""];

    //Value to filter the orders item by tracking_no
    $valuesFilter = [$tracking_number];

        //Array contains the array result in the orders, order_items and products tables and the total number of row of query SELECT
        $arrayResultOrderAndProductAssoc = UtilsAdminDB::getResultWithJointureAndCondition(
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

        
          //Total number of rows of query SELECT
          $numRowOrderProd = $arrayResultOrderAndProductAssoc["rowTotals"];
          
          //Array contains result of query SELECT
          $resultTotal = $arrayResultOrderAndProductAssoc["result"];

          //Prefix of image product path
          $prefixeAdmin = "../img/admin/produits/";

        
                ?>


<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary">
                    <span class="text-white fs-4">Voir une commande</span>
                    <a href="orders.php" class="btn btn-warning float-end text-decoration-none"><i
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
                                        <!-- Name of user order -->
                                        <?= $resultTrackingNo[0][3] ?>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="fw-bold">Email :</label>
                                    <div class="border p-1">
                                        <!-- Name of email order -->
                                        <?= $resultTrackingNo[0][4] ?>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="fw-bold">Numero de téléphone :</label>
                                    <div class="border p-1">
                                        <!-- Phone of user order -->
                                        <?= $resultTrackingNo[0][5] ?>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="fw-bold">Tracking No :</label>
                                    <div class="border p-1">
                                        <!-- Tracking_no of user order -->
                                        <?= $resultTrackingNo[0][1] ?>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="fw-bold">Adresse :</label>
                                    <div class="border p-1">
                                        <!-- Address of user order -->
                                        <?= $resultTrackingNo[0][6] ?>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="fw-bold">Pin Code</label>
                                    <div class="border p-1">
                                        <!-- Pin Code of user order -->
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
                                            <img src="<?=$prefixeAdmin.$item['image'] ?>" alt="<?=$item['name'] ?>"
                                                width="50px" height="50px">
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
                            <!-- Total Price of Products order  -->
                            <h5>Prix Total : <span class="float-end fw-bold"><?= $resultTrackingNo[0][8] ?></span>
                            </h5>
                            <hr>
                            <label class="fw-bold">Mode de Paiement</label>
                            <div class="border p-1 mb-3">
                                <!-- Mode Payment  -->
                                <?= $resultTrackingNo[0][9]  ?>
                            </div>
                            <label class="fw-bold">Statut</label>
                            <div class="mb-3">
                                <!-- Modify  user status order -->
                                <form action="../server/forms/admin/code.php" method="post">
                                    <!-- Tracking_no of user order -->
                                    <input type="hidden" name="tracking_no" value="<?= $resultTrackingNo[0][1] ?>">
                                    <!-- Status of Products order  -->
                                    <select name="order_status" id="" class="form-select mb-2">
                                        <option value="0" <?=$resultTrackingNo[0][11] ==0?"selected":"" ?>>En cours de
                                            traitement</option>
                                        <option value="1" <?=$resultTrackingNo[0][11] ==1?"selected":"" ?>>Complété
                                        </option>
                                        <option value="2" <?=$resultTrackingNo[0][11] ==2?"selected":"" ?>>Supprimé
                                        </option>
                                    </select>
                                    <button type="submit" name="update_order_btn" class="btn btn-primary">Mettre à jour
                                        du
                                        statut</button>
                                </form>
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