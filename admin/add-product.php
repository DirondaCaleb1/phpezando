<?php


include("./includes/header.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);



if ($checkConn) { //Check the database connection

?>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div id="error-addProduct" class="block-error">
                <div class="alert alert-warning alert-dismissible fade show flex-direction-row" role="alert">
                    <p class="text-white text-center font-weight-bold text-xl"></p>
                    <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
                </div>
            </div>

            <?php
            
                //Column Selected 
                $column = ["*"];

                //TableName Categories
                $tableNameCategory = "categories";

                //Associative array contains the array of result of query select and the total number of rows of result of SELECT query
                $categories = UtilsAdminDB::getResultByAdmin($database, $tableNameCategory, $column);
                
                //Extracting the array of result
                $resultCategories = $categories["result"];

                //Extracting the total number of rows 
                $rowTotal = $categories["rowTotals"];
            
            ?>

            <div class="card">
                <div class="card-header">
                    <h4>Ajout d'un Produit</h4>
                </div>
                <div class="card-body">
                    <form action="../server/forms/admin/code.php" id="form_admin_addProduct" method="post"
                        enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-12">
                                <label for="name" class="form-label">Selectionner une catégorie</label>
                                <select class="form-select mb-2" name="category_id">
                                    <option selected>Selectioner une catégorie...</option>
                                    <?php 
                                        if($rowTotal >0){ //If exists the category
                                    ?>
                                    <?php  
                                           foreach ($resultCategories as  $value) { //Iterate
                                     ?>
                                    <!-- Columns id and name of Categories table -->
                                    <option value="<?=$value[0] ?>"><?=$value[1] ?></option>

                                    <?php } ?>
                                    <?php }else{
                                        echo "Aucune catégorie valable";
                                    } ?>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="name" class="form-label mb-0">Nom</label>
                                <input type="text" name="name" id="name" class="form-control mb-2"
                                    placeholder="Entrer un nom d'un produit" required>
                            </div>
                            <div class="col-md-6">
                                <label for="slug" class="form-label mb-0">Slug</label>
                                <input type="text" name="slug" id="slug" class="form-control mb-2"
                                    placeholder="Entrer un slug" required>
                            </div>
                            <div class="col-md-12">
                                <label for="small_description" class="form-label mb-0">Petite Description</label>
                                <textarea rows="3" name="small_description" id="small_description"
                                    placeholder="Entrer une petite description pour un produit"
                                    class="form-control mb-2" required></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label mb-0">Description</label>
                                <textarea rows="3" name="description" id="description"
                                    placeholder="Entrer une description pour un produit" class="form-control mb-2"
                                    required></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="original_price" class="form-label mb-0">Prix de depart</label>
                                <input type="text" name="original_price" id="original_price" class="form-control mb-2"
                                    placeholder="Entrer le prix de depart d'un produit" required>
                            </div>
                            <div class="col-md-6">
                                <label for="selling_price" class="form-label mb-0">Prix de Vente</label>
                                <input type="text" name="selling_price" id="selling_price" class="form-control mb-2"
                                    placeholder="Entrer un prix de vente" required>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="qty" class="form-label mb-0">Quantité</label>
                                    <input type="number" name="qty" id="qty" class="form-control mb-2"
                                        placeholder="Entrer une quantité" required>
                                </div>
                                <div class="col-md-3">
                                    <label for="status" class="form-label mb-0">Status</label><br />
                                    <input type="checkbox" name="status" id="status">
                                </div>
                                <div class="col-md-3">
                                    <label for="trending" class="form-label mb-0">Tendances</label><br />
                                    <input type="checkbox" name="trending" id="popular">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="image" class="form-label mb-0">Image à télécharger</label>
                                <input type="file" name="image" id="image" class="form-control mb-2">
                                <small>Les extensions d'image autorisées : .jpg ou .JPG, .jpeg ou .JPEG, .png ou
                                    .PNG</small>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_title" class="form-label mb-0">Meta Titre</label>
                                <input type="text" name="meta_title" id="meta_title" class="form-control mb-2"
                                    placeholder="Entrer un meta titre pour un produit" required>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_description" class="form-label mb-0">Meta Description</label>
                                <textarea rows="3" name="meta_description" id="meta_description"
                                    placeholder="Entrer une meta description pour un produit" class="form-control mb-2"
                                    required></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_keywords" class="form-label mb-0">Meta Mot-clés</label>
                                <textarea rows="3" name="meta_keywords" id="meta_keywords"
                                    placeholder="Entrer une meta des mots-clés pour un produit"
                                    class="form-control mb-2" required></textarea>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary" name="add_product">Enregistrer</button>
                            </div>
                        </div>

                    </form>

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