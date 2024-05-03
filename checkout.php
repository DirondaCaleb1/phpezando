<?php

//Open session
session_start();
include("includes/header.php");

include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");

if ($checkConn) { //Check the database is connected

?>

<div class="py-3 bg-primary">
    <div class="container">
        <h6 class="text-white">
            <a href="index.php" class="text-decoration-none text-white">
                Accueil /
            </a>
            <a href="checkout.php" class="text-decoration-none text-white">
                Verification
            </a>

        </h6>
    </div>
</div>

<?php



//Initialize Variables

//TableName carts
$tableNameCart = "carts";

//TableName products
$tableNameProduct = "products";

//Column to Select
$columnSelect = [
    "carts.id", 
    "carts.product_id", 
    "carts.product_qty",
    "products.id AS pid",  
    "products.name", 
    "products.image", 
    "products.selling_price" 
];

//Column To filter product_id
$columnNameFilterProduct = "carts.product_id";

//Column To filter user_id
$columnNameFilterUser = "carts.user_id";

//value to filter user_id
$valueFilterUser = $_SESSION['auth_user']['user_id'];

//Column to order 
$ordingColumns = ["carts.id"];

//Order orientation
$ordingCurrent = "DESC";

    //Array contains details all products in the cart
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

    //Array contains the array result of query SELECT
    $resultCartItems = $arrayItemsInCart["result"];

    //Total number row of result
    $num_row_count =  $arrayItemsInCart["rowTotals"];


?>


<div class="py-5">
    <div class="container">
        <!-- Error Client Side -->
        <div id="error-checkout" class="block-error">
            <div class="alert alert-warning alert-dismissible fade show flex-direction-row" role="alert">
                <p class="text-danger"></p>
                <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        <?php 
            if(isset($_SESSION["message"]))
            { 
        ?>
        <!-- Error Server Side  -->
        <div class="alert alert-warning alert-dismissible fade show view" id="alert-block" role="alert">
            <strong>Hey !</strong> <?= $_SESSION["message"] ?>
            <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php
             unset($_SESSION["message"]);
            } 
        ?>
        <div class="card">
            <div class="card-body shadow">
                <form action="server/forms/client/placeorder.php" method="post" id="form-checkout">
                    <div class="row">
                        <?php
                  if($num_row_count >0){
                 ?>
                        <div class="col-md-7">
                            <!-- Information of client  -->
                            <h5>Informations du client</h5>
                            <hr>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="fw-bold">Nom</label>
                                    <input type="text" name="name" id="name" required
                                        placeholder="Entrer votre nom complet" class="form-control" />
                                    <small class="text-danger name"></small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="fw-bold">Adresse Email</label>
                                    <input type="text" name="email" id="email" required placeholder="Entrer votre email"
                                        class="form-control" />
                                    <small class="text-danger email"></small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="fw-bold">Numéro de téléphone</label>
                                    <input type="text" name="phone" id="phone" required
                                        placeholder="Entrer votre numéro de téléphone" class="form-control" />
                                    <small class="text-danger phone"></small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="fw-bold">Code Pin</label>
                                    <input type="text" name="pincode" id="pincode" required
                                        placeholder="Entrer votre code PIN" class="form-control" />
                                    <small class="text-danger pincode"></small>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label class="fw-bold">Adresse</label>
                                    <textarea name="address" id="address" required class="form-control"
                                        rows="5"></textarea>
                                    <small class="text-danger address"></small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <h5>Details des commandes</h5>
                            <hr>
                            <?php

                               //Prefix of images path product
                               $prefixeClient = "img/admin/produits/";

                               //Total price initial 
                               $totalPrice = 0; 

                               foreach ($resultCartItems as $items) { //Iterate all products in the cart
                            ?>
                            <div class="mb-1 border">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <!-- Image of product  -->
                                        <img src="<?=$prefixeClient.$items['image'] ?>" alt="image du produit"
                                            width="60px" />
                                    </div>
                                    <div class="col-md-5">
                                        <!-- Name of product  -->
                                        <label><?=$items['name'] ?></label>
                                    </div>
                                    <div class="col-md-3">
                                        <!-- Selling price of product  -->
                                        <label><?=$items['selling_price'] ?></label>
                                    </div>
                                    <div class="col-md-2">
                                        <!-- quantity of product  -->
                                        <label> x <?=$items['product_qty'] ?></label>
                                    </div>
                                </div>
                            </div>
                            <?php
                                 //Calculate the total price of all products
                                 $totalPrice += $items['selling_price'] * $items['product_qty'];
                                }

                            ?>
                            <!-- Total price of all product  -->
                            <h5>Prix Total: <span class="float-end fw-bold"><?=$totalPrice ?></span></h5>
                            <!-- Block to proceed the payment  -->
                            <div class="">
                                <input type="hidden" name="payment_mode" value="COD" />
                                <input type="hidden" name="payment_id" value="" />
                                <button type="submit" class="btn btn-primary w-100" name="placeOrderBtn">Confirmer et
                                    passer commande |
                                    COD</button>
                                <div class="paypal-button-container" class="mt-3"></div>
                            </div>

                            <?php
                }else{
                    header("Location: cart.php");
                }
                
                
                ?>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>


<?php include("includes/footer.php"); ?>

<!-- Payment by PayPal   -->
<!-- <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>   

test: id developper paypal
-->

<!-- 
-->
<script>
let name = $('#name').val();
let email = $('#email').val();
let phone = $('#phone').val();
let pincode = $('#pincode').val();
let address = $('#address').val();



paypal.Buttons({
    onClick() {
        if (name.length == 0) {
            $('.name').text("*Le nom doit obligatoirement fourni");
            //alert("Le nom doit obligatoirement fourni");
            return false;
        }

        if (email.length == 0) {
            $('.email').text("*L'adresse email doit obligatoirement fourni");
            //alert("Le nom doit obligatoirement fourni");
            return false;
        }
    },
    //Set up the transaction when a payment button is clicked
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_unit: [{
                amount: {
                    value: "<?= $totalPrice ?>" // Can also reference a variable or function
                }
            }]
        });
    },
    //Finalize the transaction after payer approval
    onApprove: (data, actions) => {
        return actions.order.capture().then(function(orderData) {
            //Successful capture!  For dev/demo purposes
            console.log('Capture Result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_unit[0].payments.captures[0];
            alert(
                `Transaction ${transaction.status}: ${transaction.id}\n\nSee console all available details`
            );

        });
    }
}).render('#paypal-button-container');
</script>

<!-- Payment by Stripe-->

<?php }else {
    require_once("error-config.php");
} ?>