<?php

include("./includes/header.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);



if ($checkConn) {//Checking database is connected

    ?>



<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Produits</h4>
                </div>
                <!-- Attribute id using to permite to ajax client side to refresh automatically the products table 
                  without to have to refresh manuelly the web page 
                  after delete item in the products table in
                  database 
                -->
                <div class="card-body" id="products_table">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Modifier</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php

                            //Column Selected
                            $column = ["*"];

                            //TableName
                            $tableName = "products";

                            //Array returning
                            $products = UtilsAdminDB::getResultByAdmin($database, $tableName, $column);
                            
                            //Result of query SELECT in array
                            $resultProducts = $products["result"];

                             //Total number of result fetch
                            $rowTotal = $products["rowTotals"];

                            $j = 0;

                            //Verify if the array $resultCategories contains a less one element
                            if ($rowTotal > 0) { // Iterate
                                while ($j < $rowTotal) {
                                    $prefixeAdmin = "../img/admin/produits/";
                                    ?>
                            <tr>
                                <!-- column id of  products table -->
                                <td><?=$resultProducts[$j][0] ?></td>

                                <!-- column name of  products table -->
                                <td><?= $resultProducts[$j][2] ?></td>
                                <td>
                                    <!-- column image of  products table -->
                                    <img src="<?= $prefixeAdmin.$resultProducts[$j][8] ?>"
                                        alt="<?= $resultProducts[$j][2] ?>" width="50px" height="50px" />
                                </td>
                                <td>
                                    <!-- column status of  products table -->
                                    <?= $resultProducts[$j][10] =='0'?'Visible': 'Caché' ?>
                                </td>
                                <td>
                                    <!-- column id of  products table for update -->
                                    <a href="edit-product.php?id=<?=$resultProducts[$j][0] ?>"
                                        class="btn btn-sm btn-primary">Modifier</a>
                                </td>
                                <td>
                                    <!-- column id of  products table for delete -->
                                    <button type="button" class="btn btn-sm btn-danger delete_product_btn"
                                        value="<?=$resultProducts[$j][0] ?>">Supprimer</button>

                                </td>
                            </tr>
                            <?php
                            $j++;
                                }
                            }else{
                            ?>
                            <?php
                         echo "Pas d'enregistrement trouvé";
                            }
                            ?>
                        </tbody>
                    </table>
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