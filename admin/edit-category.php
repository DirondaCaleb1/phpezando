<?php

include("./includes/header.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);



if ($checkConn) { //Check if  connection is exist

    ?>



<div class="container">
    <div class="row">
        <?php 
        if(isset($_GET['id']) && is_numeric($_GET['id'])){ //Check If the variable $_GET['id'] exists and it's a number
             //Define the value Id
            $id = $_GET['id'];

            //Define tableName
            $tableNameCategories = "categories";

            //Define column selected
            $column = ["*"];

            //Define the column to filter
            $closure = ["id"];

            //Operators and eventually logic operators
            $operators = ["="];
            $logicOperators = [""];

            //value of Filter result
            $value = [$id];

            //Array contains result in array and the total number of result of query Select
            $categoriesFilterById = UtilsAdminDB::getResultWithCondition(
                $database, 
                $tableNameCategories, 
                $column, 
                $closure, 
                $operators, 
                $logicOperators, 
                $value
            );
            
            
         ?>
        <div class="col-md-12">
            <div id="error-updateCategory" class="block-error">
                <div class="alert alert-warning alert-dismissible fade show flex-direction-row" role="alert">
                    <p class="text-white text-center font-weight-bold text-xl"></p>
                    <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
                </div>
            </div>
            <?php 
            //Verify if the array $resultCategories contains a less one element
            if ($categoriesFilterById['rowTotals'] > 0) {

                //Array of data of Categories table
                $data = $categoriesFilterById['result'][0];

                //Prefixe of path contains the category images
                $prefixeAdmin = "../img/admin/categories/";
            ?>
            <div class="card">
                <div class="card-header">
                    <h4>Modifier une Catégorie
                        <a href="category.php" class="btn btn-primary float-end">RETOUR</a>
                    </h4>

                </div>
                <div class="card-body">
                    <form action="../server/forms/admin/code.php" id="form_admin_editCategory" method="post"
                        enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6">
                                <!-- column id of categories table -->
                                <input type="hidden" name="category_id" value="<?= $data[0] ?>">
                                <label for="name" class="form-label">Nom</label>
                                <!-- column name of categories table -->
                                <input type="text" name="name" id="name" class="form-control"
                                    placeholder="Entrer un nom d'une Catégorie" value="<?= $data[1] ?>">

                            </div>
                            <div class="col-md-6">
                                <label for="slug" class="form-label">Slug</label>
                                <!-- column slug of categories table -->
                                <input type="text" name="slug" id="slug" class="form-control"
                                    placeholder="Entrer un slug" value="<?= $data[2] ?>">

                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Description</label>
                                <!-- column description of categories table -->
                                <textarea rows="3" name="description" id="description"
                                    placeholder="Entrer une description pour une catégorie"
                                    class="form-control"><?= $data[3] ?></textarea>

                            </div>
                            <div class="col-md-12">
                                <label for="image" class="form-label">Image à télécharger</label>
                                <input type="file" name="image" id="image" class="form-control">
                                <small>Les extensions d'image autorisées : .jpg ou .JPG, .jpeg ou .JPEG, .png ou
                                    .PNG</small><br>
                                <label class="form-label">Image actuelle</label>
                                <!-- column image of categories table -->
                                <!-- column old image of categories table -->
                                <input type="hidden" name="old_image" value="<?= $data[6] ?>">
                                <img src="<?=$prefixeAdmin.$data[6] ?>" alt="<?= $data[2] ?>" width="50px"
                                    height="50px">
                            </div>
                            <div class="col-md-12">
                                <label for="meta_title" class="form-label">Meta Titre</label>
                                <!-- column metadescription of categories table -->
                                <input type="text" name="meta_title" id="meta_title" class="form-control"
                                    placeholder="Entrer un meta titre pour une catégorie" value="<?= $data[7] ?>">
                            </div>
                            <div class="col-md-12">
                                <label for="meta_description" class="form-label">Meta Description</label>
                                <!-- column meta-description of categories table -->
                                <textarea rows="3" name="meta_description" id="meta_description"
                                    placeholder="Entrer une meta description pour une catégorie"
                                    class="form-control"><?= $data[8] ?></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_keywords" class="form-label">Meta Mot-clés</label>
                                <!-- column keywords of categories table -->
                                <textarea rows="3" name="meta_keywords" id="meta_keywords"
                                    placeholder="Entrer une meta des mots-clés pour une catégorie"
                                    class="form-control"><?= $data[9] ?></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="status" class="form-label">Status</label>
                                <!-- column status of categories table -->
                                <input type="checkbox" name="status" <?=$data[4] !='0'?"checked":"" ?> id="status">
                            </div>
                            <div class="col-md-6">
                                <label for="popular" class="form-label">Popularité</label>
                                <!-- column popular of categories table -->
                                <input type="checkbox" name="popular" <?=$data[5] !='0'?"checked":"" ?> id="popular">
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary" name="update_category">Modifier</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
            <?php }else {
                echo "Catégorie non trouvée";
            } ?>
            <?php }else{
                echo "Id absent de l'adresse URL";
            } ?>
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