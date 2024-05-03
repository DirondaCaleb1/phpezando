<?php

//Open session
session_start();


include("includes/header.php");

include_once("includes/includes_params.php");

if ($checkConn) {

    if (isset($_GET['category'])) { //If $_GET['category'] exists

        //Slug of Category
        $slug_category = $_GET['category'];

        //TableName Categories
        $tableNameCategory = "categories";

        //Column Selected of Categories table
        $columnCategory = ["*"];

        //Define the columns to filter the Categories table
        $closuresCategory = ["slug", "status"];

        //Operators to filter the categories table
        $operatorsCategory = ["=", "="];

        //Logic operator to filter the categories table
        $logicOperatorCategory = ["AND"];

        //value of Filter result of categories table
        $valuesCategory = [$slug_category, '0'];

        //Limit the result to one row
        $limitNumber = 1;

        //TableName Products
        $tableNameProduct = "products";

        //Column Selected of Products table
        $columnProduct = ["*"];

        //Define the columns to filter the Products table
        $closuresProduct = ["category_id", "status"];

        //Operators to filter the Products table
        $operatorsProduct = ["=", "="];

        //Logic operator to filter the Products table
        $logicOperatorProduct = ["AND"];
        
        //Array Categories contains result in array and the total number of result of query Select
        $categories = UtilsClientDB::getResultWithConditionAndLimit(
          $database, 
          $tableNameCategory, 
          $columnCategory, 
          $closuresCategory, 
          $operatorsCategory, 
          $logicOperatorCategory, 
          $valuesCategory, 
          $limitNumber
        );


        //Array of data of Categories table
        $categories_result = $categories["result"];

        //Contains the number of rows of result of query SELECT of categories
        $category_count = $categories["rowTotals"];

         
        if($category_count >0){ //If it a less one categorie

           //value of Filter result of Products table
           $valuesProduct = [$categories_result[0][0], "0"];

           //Name of Category
           $nameCategory = $categories_result[0][1];
        }else{

            //value of Filter result of Products table
            $valuesProduct = [-1, "0"];

            //Name of Category
            $nameCategory = "";
        }


        
        //Array Products contains result in array and the total number of result of query Select
        $products = UtilsClientDB::getResultWithCondition($database, $tableNameProduct, $columnProduct, $closuresProduct, $operatorsProduct, $logicOperatorProduct, $valuesProduct);

        //Contains the number of rows of result of query SELECT of products
        $num_row_count = $products["rowTotals"];
        
        //Array of data of Products table
        $products_result = $products["result"];


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
            <!-- Name of Category  -->
            <?= $nameCategory  ?>
        </h6>
    </div>
</div>


<div class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <!-- Name of Category  -->
                <h1>Catégorie / <?= $nameCategory ?></h1>
                <hr>
                <h2>Produits trouvés</h2>
                <div class="row">


                    <?php

                    // Prefix of Path of products image
                    $prefixeClient = "img/admin/produits/";

                    if ($num_row_count > 0) { //If it a less one product
                        foreach ($products_result as $item) {  //Iterate a products  array
                            ?>
                    <div class="col-md-3 mb-2">
                        <!-- Slug of Product  -->
                        <a href="product-view.php?product=<?= $item[3] ?>" class="text-decoration-none">
                            <div class="card shadow" id="card_product">
                                <div class="card-body">
                                    <!-- Image of Product  -->
                                    <img src="<?= $prefixeClient . $item[8] ?>" alt="<?= $item[2] ?>" class="w-100">
                                    <!-- Name of Product  -->
                                    <h4 class="text-center"><?= $item[2] ?></h4>
                                    <div class="bg-danger text-white text-center">
                                        <?= $item[9] ==0 ? 'En Rupture de stock' : ''  ?>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>


                    <?php
                        }
                    } else {
                        echo "Aucune donnée valable";
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>


<?php include("includes/footer.php"); ?>

<?php
    }else{
        echo "Aucun produit ne correspond à cette catégorie";
    }
?>

<?php }else {
    require_once("error-config.php");
} ?>