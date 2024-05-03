<?php

//Open session
session_start();
include("includes/header.php");


include_once("includes/includes_params.php");

if ($checkConn) {


   if (isset($_GET['product'])) { //If $_GET['product'] exists

        //Slug of Product
        $slug_product = $_GET['product'];
      
        //Limit the result to one row
        $limitNumber = 1;

        //TableName Products
        $tableNameProduct = "products";

         //Column Selected of Products table
        $columnProduct = ["*"];

        //Define the columns to filter the Products table
        $closuresProduct = ["slug", "status"];

        //Operators to filter the Products table
        $operatorsProduct = ["=", "="];

        //Logic operator to filter the Products table
        $logicOperatorProduct = ["AND"];

        //value of Filter result of categories table
        $valuesProduct = [$slug_product, '0'];
        

        //Array Categories contains result in array and the total number of result of query Select
        $products = UtilsClientDB::getResultWithConditionAndLimit(
            $database, 
            $tableNameProduct, 
            $columnProduct, 
            $closuresProduct, 
            $operatorsProduct, 
            $logicOperatorProduct, 
            $valuesProduct, 
            $limitNumber
        );


        //Contains the number of rows of result of query SELECT of products
        $num_row_count = $products["rowTotals"];

        //Array of data of Products table
        $products_result = $products["result"];


?>

<?php
    if($num_row_count >0){ //If it a less one product

            //Prefix of Path of products image
            $prefixeClient = "img/admin/produits/";
?>
<div class="py-3 bg-primary">
    <div class="container">
        <h6 class="text-white">
            <a href="index.php" class="text-white text-decoration-none">
                Accueil /
            </a>
            <a href="categories.php" class="text-white text-decoration-none">
                Collections /
            </a>
            <!-- Name of Product  -->
            <?=  $products_result[0][2]  ?>
        </h6>
    </div>
</div>


<div class="bg-light py-4">
    <!-- Class product_data using to find the child elements -->
    <div class="container product_data mt-3">
        <div class="row">
            <div class="col-md-4">
                <div class="shadow">
                    <!-- Image of Product  -->
                    <img src="<?=$prefixeClient.$products_result[0][8] ?>" alt="produit Image" class="w-100">
                </div>
            </div>
            <div class="col-md-8">
                <h4 class="fw-bold">
                    <!-- Name of Product  -->
                    <?= $products_result[0][2] ?>
                    <!-- Trending of Product  -->
                    <span class="float-end text-danger"><?php if ($products_result[0][11]) {
                        echo "Tendances"; } ?></span>
                </h4>

                <hr>
                <!-- Small Description of Product  -->
                <p><?= $products_result[0][4] ?></p>
                <div class="row">
                    <div class="col-md-6">
                        <!-- Selling Price of Product  -->
                        <h4> <span class="text-success fw-bold"><?= $products_result[0][7] ?></span> FCFA</h4>
                    </div>
                    <div class="col-md-6">
                        <!-- Original Price of Product  -->
                        <h5><s class="text-danger"><?= $products_result[0][6] ?></s> FCFA</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <!-- Block Increment/Decrement Quantity   -->
                        <div class="input-group mb-3" style="width: 130px;">
                            <!-- Button to Decrement  Qty  -->
                            <button class="input-group-text decrement-btn">-</button>
                            <!-- Value Quantity (Total Quantity)  -->
                            <input type="text" class="form-control bg-white input-qty text-center" disabled
                                value="<?=$products_result[0][9]  ==0 ? '0' : '1'  ?>"
                                aria-label="Montant (le plus précis en franc CFA)" />
                            <!-- Hidden Tota Quantity of product -->
                            <input type="hidden" class="totalQty" value="<?= $products_result[0][9]  ?>" />
                            <!-- Button to Increment  Qty  -->
                            <button class="input-group-text increment-btn">+</button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-6">
                        <!-- Add To Cart Button   --->
                        <!-- Id of Product  -->
                        <button class="btn btn-primary px-4 addToCartBtn" value="<?= $products_result[0][0] ?>">
                            <i class="fa fa-shopping-cart me-2"></i>
                            Ajouter à votre panier</button>
                    </div>
                </div>

                <hr>
                <!-- Description of Product  -->
                <h6>Description du produit</h6>
                <p><?= $products_result[0][5] ?></p>
            </div>
        </div>

    </div>

</div>

<?php
    } else {
            echo "Produit non trouvée";
    }
        ?>

<?php include("includes/footer.php"); ?>

<?php
  }else{
    echo "Aucun produit ne correspond à cette catégorie";
  }
?>

<?php 
}else {
    require_once("error-config.php");
} ?>