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
                Ma Liste de souhaits
            </a>

        </h6>
    </div>
</div>

<?php

    $tableNameLeft = "shortlist s";
    $tableNameRight = ["products p"];
    $columnSelected = ["s.*", "s.id AS sid", "p.name", "p.selling_price", "p.image", "s.created_at AS sdate", "p.slug"];
    $columnClosureSelected = ["s.user_id"];
    $columJoinLeft = ["s.product_id"];
    $columnJoinRight = ["p.id"];
    $logicOperator = [""];
    $operatorJoin = ["="];
    $operatorSelect = ["="];
    $user_id = $_SESSION['auth_user']['user_id'];
    $valuesSelect = [$user_id];


    $shorlist = UtilsClientDB::getResultWithJointureMoreTwoTableAndCondition(
        $database,
        $tableNameLeft,
        $tableNameRight,
        $columnSelected,
        $columJoinLeft,
        $columnJoinRight,
        $columnClosureSelected,
        $operatorJoin,
        $operatorSelect,
        $logicOperator,
        $valuesSelect
    );

    $num_row_count = $shorlist["rowTotals"];
    $resultShortList = $shorlist["result"];



?>


<div class="py-5">
    <div class="container">
        <div class="card shadow">
            <div class="row" id="myshortlist">
                <div class="col-md-12">


                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produit</th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Date</th>
                                <th>Voir Details</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <?php
                        if(
                          $num_row_count >0
                        ){
                        ?>
                        <?php

                        $j = $num_row_count-1;

                        while($j >=0){
                            $item = $resultShortList[$j];
                            
                            
                            //Prefix of Path of products image
                            $prefixeClient = "img/admin/produits/";

                            $date = UtilsClient::getDateInAnyFormat($item["sdate"], "french", "digit")["dateComplet"];
                            ?>
                        <tbody>

                            <tr>

                                <td><?= $item["id"] ?></td>
                                <td><img src="<?= $prefixeClient.$item["image"] ?>" alt="produit Image" width="60px" />
                                </td>
                                <td><?= $item["name"] ?></td>
                                <td><?= $item["selling_price"] ?></td>
                                <td><?= $date  ?></td>
                                <td><a href="product-view-favorite.php?product=<?= $item["slug"] ?>"
                                        class="btn btn-primary">Voir
                                        les
                                        détails</a></td>
                                <td><button class="btn btn-danger deleteItemFavButton"
                                        value="<?= $item["id"] ?>">Supprimer</button></td>
                            </tr>


                            <?php
                            $j--;
                        }
                       }else{
                        ?>
                            <tr>
                                <td colspan="7" class="text-center">Aucun produit favori</td>

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