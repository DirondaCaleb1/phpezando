<?php

//Open Session
session_start();

//Files required
include("includes/header.php");

//Files the database parameters
include_once("includes/includes_params.php");

if ($checkConn) { //Check the database is connected

    ?>

<div class="py-3 bg-primary">
    <div class="container">
        <h6 class="text-white">Accueil / Collections</h6>
    </div>
</div>


<div class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>Nos Collections</h1>
                <hr>
                <div class="row">


                    <?php

                //TableName Categories
                $tableName = "categories";

                //Column Selected
                $column = ["*"];

                //Define the column to filter
                $closures = ["status"];

                //Operators and eventually logic operators
                $operators = ["="];
                $logicOperator = [""];

                //value of Filter result
                $values = ['0'];

                //Array contains result in array and the total number of result of query Select
                $categories = UtilsClientDB::getResultWithCondition(
                    $database,
                    $tableName, 
                    $column, 
                    $closures, 
                    $operators, 
                    $logicOperator, 
                    $values
                );

                //Contains the number of rows of result of query SELECT
                $num_row_count = $categories["rowTotals"];

                //Array of data of Categories table
                $categories_result = $categories["result"];

                //Prefixe of path contains the categories images
                $prefixeClient = "img/admin/categories/";

                if($num_row_count >0){ //If a less one category exists
                    foreach ($categories_result as $item) {  //Iterate all Categories if status = 0
                        ?>
                    <div class="col-md-3 mb-2">
                        <!-- Column slug of categories table -->
                        <a href="products.php?category=<?= $item[2] ?>" class="text-decoration-none">
                            <div class="card shadow onfocused-block" id="card">
                                <div class="card-body">
                                    <!-- Columns name and image of categories table  -->
                                    <img src="<?=$prefixeClient.$item[6] ?>" alt="<?= $item[1] ?>" class="w-100">
                                    <!-- Column slug of categories table -->
                                    <h4 class="text-center"><?= $item[1] ?></h4>
                                </div>
                            </div>
                        </a>
                    </div>


                    <?php
                    }
                }
                else{
                    echo "Aucune donnée valable";
                }
                ?>
                </div>
            </div>
        </div>
    </div>
</div>


<?php include("includes/footer.php"); ?>

<?php }else {
    require_once("error-config.php");
} ?>