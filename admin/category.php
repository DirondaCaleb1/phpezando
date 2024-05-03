<?php

include("./includes/header.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);



if ($checkConn) { //Check if  connection of database is exist

    ?>



<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Catégories</h4>
                </div>
                <!-- Attribute id using to permite to ajax client side to refresh automatically the categories table 
                  without to have to refresh manuelly the web page 
                  after delete item in the categories table in
                  database 
                -->
                <div class="card-body" id="category_table">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php

                            //Column Selected
                            $column = ["*"];

                            //TableName
                            $tableNameCategories = "categories";

                            //Array returning
                            $categories = UtilsAdminDB::getResultByAdmin($database, $tableNameCategories, $column);
                            
                            //Result of query SELECT in array
                            $resultCategories = $categories["result"];
                            
                            //Total number of result fetch
                            $rowTotal = $categories["rowTotals"];

                            $j = 0;

                            //Verify if the array $resultCategories contains a less one element
                            if ($rowTotal > 0) {
                                while ($j < $rowTotal) { // Iterate
                                    $prefixeAdmin = "../img/admin/categories/";
                                    ?>
                            <tr>
                                <td><?=$resultCategories[$j][0]  ?></td> <!-- column id of categories table -->
                                <td><?=$resultCategories[$j][1] ?></td> <!-- column name of categories table -->
                                <td>
                                    <img src="<?=$prefixeAdmin.$resultCategories[$j][6] ?>"
                                        alt="<?=$resultCategories[$j][1] ?>" width="70px" height="70px" />
                                    <!-- column image of categories table -->
                                </td>
                                <td>
                                    <?=$resultCategories[$j][4] =='0'?'Visible': 'Cachée' ?>
                                    <!-- column status of categories table -->
                                </td>
                                <td>
                                    <a href="edit-category.php?id=<?=$resultCategories[$j][0] ?>"
                                        class="btn btn-sm btn-primary">Modifier</a>
                                    <!-- column id of categories table to update one element -->
                                    <button type="button" class="btn btn-sm btn-danger delete_category"
                                        value="<?=$resultCategories[$j][0] ?>">Supprimer</button>
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