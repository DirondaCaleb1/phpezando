<?php
//Open session
session_start();

//Include Header
include("includes/header.php");

//Include parameters
include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");

if ($checkConn) { //Check if database is connected

?>

<div class="py-3 bg-primary">
    <div class="container">
        <h6 class="text-white">
            <a href="index.php" class="text-decoration-none text-white">
                Accueil /
            </a>
            <a href="cart.php" class="text-decoration-none text-white">
                Panier de commandes
            </a>

        </h6>
    </div>
</div>

<?php



//Initialize Variables

//TableName Carts
$tableNameCart = "carts";

//TableName Products
$tableNameProduct = "products";

//Column Selected 
$columnSelect = [
    "carts.id", 
    "carts.product_id", 
    "carts.product_qty",
    "products.id AS pid",  
    "products.name", 
    "products.image", 
    "products.qty AS quant_prod",
    "products.selling_price" 
];

//Column To filter the products
$columnNameFilterProduct = "carts.product_id";

//Column To filter the users
$columnNameFilterUser = "carts.user_id";

//Values To filter the products
$valueFilterUser = $_SESSION['auth_user']['user_id'];

//Ording Column 
$ordingColumns = ["carts.id"];

//Ording Orientation
$ordingCurrent = "DESC";


    //Array Items in the cart with all details 
    $arrayItemsInCart = UtilsClient::getDetailsAllProductsToCart(
       $database,
       $tableNameCart, 
       $columnSelect, 
       $tableNameProduct, 
       $columnNameFilterProduct, 
       $columnNameFilterUser,  
       $valueFilterUser, 
       $ordingColumns, 
       $ordingCurrent
    );


    //Array results in the cart
    $resultCartItems = $arrayItemsInCart["result"];

    //Number of rows of the carts table
    $num_row_count =  $arrayItemsInCart["rowTotals"];


?>


<div class="py-5">
    <div class="container">
        <div class="">
            <!-- Attribute id using to permite to ajax client side to refresh automatically the categories table 
                without to have to refresh manuelly the web page 
                after delete item in the categories table in
                database 
            -->
            <div class="row" id="myCart">
                <?php
                  if($num_row_count >0){ //If item exists in the carts
                 ?>
                <div class="col-md-12">
                    <div class="row align-items-center">
                        <div class="col-md-5">
                            <h6>Produit</h6>
                        </div>
                        <div class="col-md-3">
                            <h6>Prix</h6>
                        </div>
                        <div class="col-md-2">
                            <h6>Quantité</h6>
                        </div>
                        <div class="col-md-2">
                            <h6>Supprimer</h6>
                        </div>
                    </div>

                    <?php

                     //Prefix the product image
                     $prefixeClient = "img/admin/produits/";

                     foreach ($resultCartItems as $items) { //Iterate the product in the cart
                        ?>
                    <div class="card shadow-sm mb-3 product_data">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <!-- Image of product -->
                                <img src="<?=$prefixeClient.$items['image'] ?>" alt="image du produit" width="60px" />
                            </div>
                            <div class="col-md-3">
                                <!-- Name of product -->
                                <h5><?=$items['name'] ?></h5>
                            </div>
                            <div class="col-md-3">
                                <!-- Selling price of product -->
                                <h5><?= $items['selling_price'] ?> FCFA</h5>
                            </div>
                            <div class="col-md-2">
                                <!-- Id of product -->
                                <input type="hidden" class="prodId" value="<?=$items["product_id"] ?>">
                                <!-- Block Increment/Decrement Quantity   -->
                                <div class="input-group mb-3" style="width: 130px;">
                                    <!-- Button to Decrement  Qty  -->
                                    <button class="input-group-text decrement-btn  updateQty">-</button>
                                    <!-- Value Quantity (Product Quantity in carts table) -->
                                    <input type="text" class="form-control bg-white input-qty text-center" disabled
                                        value="<?=$items['product_qty'] ?>"
                                        aria-label="Montant (le plus précis en franc CFA)" />
                                    <!-- Hidden Tota Quantity of product -->
                                    <input type="hidden" class="totalQty" value="<?= $items['quant_prod'] ?>" />
                                    <!-- Button to Increment  Qty  -->
                                    <button class="input-group-text increment-btn updateQty">+</button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <!-- Id of product -->
                                <!-- Button to Suppress the item class : .deleteItem  -->
                                <button class="btn btn-danger btn-sm deleteItem" value="<?=$items["id"] ?>">
                                    <i class="fa fa-trash me-2"></i>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                    <?php
                    }

                    ?>
                    <div class="float-end">
                        <!-- Process to verify the selling -->
                        <a href="checkout.php" class="btn btn-outline-primary">Procéder à la vérification</a>
                    </div>

                    <?php
                }else{
                    ?>
                    <div class="card card-body shadow text-center">
                        <h4 class="py-4">Votre panier de commande est vide</h4>
                    </div>

                    <?php
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