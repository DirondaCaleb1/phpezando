<?php


include("./includes/header.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);



if ($checkConn) {

?>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <?php if(isset($_GET['id']) && is_numeric($_GET['id'])){ //Check If the variable $_GET['id'] exists and it's a number
                
                //Define the value Id
                $id = $_GET['id'];

                //Define tableName
                $tableNameProducts = "products";

                //Define column selected
                $columnProduct = ["*"];

                //Define the column to filter
                $closureProduct = ["id"];

                //Operators and eventually logic operators
                $operators = ["="];
                $logicOperators = [""];

                //value of Filter result
                $valueProduct = [$id];

                //Array contains result in array and the total number of result of query Select
                $productsFilterById = UtilsAdminDB::getResultWithCondition(
                  $database, 
                  $tableNameProducts, 
                  $columnProduct, 
                  $closureProduct, 
                  $operators, 
                  $logicOperators, 
                  $valueProduct
                );

            
            ?>
            <div id="error-editProduct" class="block-error">
                <div class="alert alert-warning alert-dismissible fade show flex-direction-row" role="alert">
                    <p class="text-white text-center font-weight-bold text-xl"></p>
                    <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
                </div>
            </div>
            <?php
            //Verify if the array $resultCategories contains a less one element
            if ($productsFilterById['rowTotals'] > 0) {

                //Define column selected
                $column = ["*"];

                //Define Category tableName 
                $tableNameCategory = "categories";

                //Array contains result in array and the total number of result of query Select
                $categories = UtilsAdminDB::getResultByAdmin($database, $tableNameCategory, $column);
                
                //Array of data of Categories table
                $resultCategories = $categories["result"];

                //Contains the number of rows of result of query SELECT
                $rowTotal = $categories["rowTotals"];

                //Array of data of products table
                $data = $productsFilterById['result'][0];
                
                //Prefixe of path contains the product images
                $prefixeAdmin = "../img/admin/produits/";
                ?>

            <div class="card">
                <div class="card-header">
                    <h4>Modifier un Produit
                        <a href="products.php" class="btn btn-primary float-end">RETOUR</a>
                    </h4>
                </div>
                <div class="card-body">
                    <form action="../server/forms/admin/code.php" id="form_admin_editProduct" method="post"
                        enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-12">
                                <label for="name" class="form-label">Selectionner une catégorie</label>
                                <!-- columns id and name of categories table -->
                                <!-- column category_id of products table -->
                                <select class="form-select mb-2" name="category_id">
                                    <option selected>Selectioner une catégorie...</option>
                                    <?php 
                                        if ($rowTotal > 0) { //If a less one category exists
                                    ?>
                                    <?php   
                                          foreach ($resultCategories as $value) {  //Iterate all Categories
                                    ?>
                                    <!-- Selected the default category of product in tableName products thanks to selected property of option tag  -->
                                    <option value="<?= $value[0] ?>" <?= $value[0] == $data[1] ? 'selected' : ''  ?>>
                                        <?= $value[1] ?></option>
                                    <?php } ?>
                                    <?php } else {
                                        echo "Aucune catégorie valable";
                                    } ?>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="name" class="form-label mb-0">Nom</label>
                                <!-- column name of products table -->
                                <input type="text" name="name" id="name" class="form-control mb-2"
                                    placeholder="Entrer un nom d'un produit" required value="<?= $data[2] ?>">
                            </div>
                            <div class="col-md-6">
                                <label for="slug" class="form-label mb-0">Slug</label>
                                <!-- column slug of products table -->
                                <input type="text" name="slug" id="slug" class="form-control mb-2"
                                    placeholder="Entrer un slug" required value="<?= $data[3] ?>">
                            </div>
                            <div class="col-md-12">
                                <label for="small_description" class="form-label mb-0">Petite Description</label>
                                <!-- column small description of products table -->
                                <textarea rows="3" name="small_description" id="small_description"
                                    placeholder="Entrer une petite description pour un produit"
                                    class="form-control mb-2" required><?= $data[4] ?></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label mb-0">Description</label>
                                <!-- column description of products table -->
                                <textarea rows="3" name="description" id="description"
                                    placeholder="Entrer une description pour un produit" class="form-control mb-2"
                                    required><?= $data[5] ?></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="original_price" class="form-label mb-0">Prix de depart</label>
                                <!-- column original_price of products table -->
                                <input type="text" name="original_price" id="original_price" class="form-control mb-2"
                                    placeholder="Entrer le prix de depart d'un produit" required
                                    value="<?= $data[6] ?>">
                            </div>
                            <div class="col-md-6">
                                <label for="selling_price" class="form-label mb-0">Prix de Vente</label>
                                <!-- column selling_price of products table -->
                                <input type="text" name="selling_price" id="selling_price" class="form-control mb-2"
                                    placeholder="Entrer un prix de vente" required value="<?= $data[7] ?>">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="qty" class="form-label mb-0">Quantité</label>
                                    <!-- column qty of products table -->
                                    <input type="number" name="qty" id="qty" class="form-control mb-2"
                                        placeholder="Entrer une quantité" required value="<?= $data[9] ?>">
                                </div>
                                <div class="col-md-3">
                                    <label for="status" class="form-label mb-0">Status</label><br />
                                    <!-- column status of products table -->
                                    <input type="checkbox" name="status" id="status" <?=$data[10] !='0'?"checked":"" ?>>
                                </div>
                                <div class="col-md-3">
                                    <label for="trending" class="form-label mb-0">Tendances</label><br />
                                    <!-- column trending of products table -->
                                    <input type="checkbox" name="trending" id="popular"
                                        <?=$data[11] !='0'?"checked":"" ?>>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="image" class="form-label mb-0">Image à télécharger</label>
                                <!-- column image of products table -->
                                <input type="hidden" name="old_image" value="<?= $data[8] ?>" />
                                <input type="file" name="image" id="image" class="form-control mb-2">
                                <small>Les extensions d'image autorisées : .jpg ou .JPG, .jpeg ou .JPEG, .png ou
                                    .PNG</small><br>
                                <label for="" class="form-label mb-0">Image actuelle</label>
                                <img src="<?= $prefixeAdmin.$data[8] ?>" alt="<?= $data[2] ?>" width="50px"
                                    height="50px" />
                            </div>
                            <div class="col-md-12">
                                <!-- column meta_title of products table -->
                                <label for="meta_title" class="form-label mb-0">Meta Titre</label>
                                <input type="text" name="meta_title" id="meta_title" class="form-control mb-2"
                                    placeholder="Entrer un meta titre pour un produit" required
                                    value="<?= $data[12] ?>">
                                <!-- column category_id of products table -->
                                <input type="hidden" name="category_hidden_id" value="<?= $data[1] ?>">
                                <!-- column id of products table -->
                                <input type="hidden" name="product_id" value="<?= $data[0] ?>">

                            </div>
                            <div class="col-md-12">
                                <label for="meta_description" class="form-label mb-0">Meta Description</label>
                                <!-- column metadescription of products table -->
                                <textarea rows="3" name="meta_description" id="meta_description"
                                    placeholder="Entrer une meta description pour un produit" class="form-control mb-2"
                                    required><?= $data[14] ?></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_keywords" class="form-label mb-0">Meta Mot-clés</label>
                                <!-- column metakeywords of products table -->
                                <textarea rows="3" name="meta_keywords" id="meta_keywords"
                                    placeholder="Entrer une meta des mots-clés pour un produit"
                                    class="form-control mb-2" required><?= $data[13] ?></textarea>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary" name="update_product">Modifier</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>

            <?php
            }else{
                echo "Aucun produit correspondant à cet id";
            }
            ?>
            <?php }else{
                echo "Id absent de l'adresse URL";
            } ?>
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