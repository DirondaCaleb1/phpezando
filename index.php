<?php

//Open session
session_start();

//<!-- File Required header  -->
include("includes/header.php");

//<!-- File Required params  -->
include_once("includes/includes_params.php");


if ($checkConn) {

    //TableName Products
    $tableNameProductView = "products";

    //Column to select
    $columnSelectProductView = ["*"];

    //Column to filter the products if trending is equal to 1
    $columnClosureProductView = ["trending"];

    //Operator to filter the products if trending is equal to 1
    $operatorProductView = ["="];

    //Logic operator to filter the products if trending is equal to 1
    $logicOperatorProductView = [""];

    //Values to filter the products if trending is equal to 1
    $valuesProductView = ["1"];

    //Array to contains the arrays of query SELECT and the number of rows the results of query SELECT
    $getAllTrending = UtilsClientDB::getResultWithCondition(
        $database,
        $tableNameProductView,
        $columnSelectProductView,
        $columnClosureProductView,
        $operatorProductView,
        $logicOperatorProductView,
        $valuesProductView
    );

    //Prefix of image path products
    $prefixeClient = "img/admin/produits/";

    //<!-- File Required slider  -->
    include("includes/slider.php");


?>


<div class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4>Produits Tendances</h4>
                <!--    -->
                <div class="underline mb-2"></div>
                <div class="owl-carousel">
                    <?php
                       $trendingProducts = $getAllTrending["result"];
                       $numRowResult = $getAllTrending["rowTotals"];

                       if($numRowResult >0){
                         foreach ($trendingProducts as $item) {
                            ?>
                    <div class="item">
                        <a href="product-view.php?product=<?= $item[3] ?>" class="text-decoration-none">
                            <div class="card shadow" id="card_product">
                                <div class="card-body">
                                    <img src="<?= $prefixeClient . $item[8] ?>" alt="<?= $item[2] ?>" class="w-100">
                                    <h4 class="text-center"><?= $item[2] ?></h4>
                                </div>
                            </div>
                        </a>
                    </div>
                    <?php }?>
                </div>
                <?php                    
                 }
                  ?>
            </div>
        </div>
    </div>
</div>

<div class="py-5 bg-f2f2f2" id="about">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4>A Propos de Nous</h4>
                <div class="underline mb-2"></div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur commodi iusto fuga
                    architecto atque nam est earum. Animi ad unde, sed est esse voluptatem. Magnam neque blanditiis
                    excepturi quasi?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur commodi iusto fuga
                    architecto atque nam est earum. Animi ad unde, sed est esse voluptatem. Magnam neque blanditiis
                    excepturi quasi?
                    <br>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur commodi iusto fuga
                    architecto atque nam est earum. Animi ad unde, sed est esse voluptatem. Magnam neque blanditiis
                    excepturi quasi?
                </p>
            </div>
        </div>
    </div>
</div>

<div class="py-5 bg-dark">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <h4 class="text-white">E-Zando</h4>
                <div class="underline mb-2"></div>
                <a href="index.php" class="text-decoration-none text-white"><i class="fa fa-angle-right"></i>
                    Accueil</a><br>
                <a href="#about" class="text-decoration-none text-white"><i class="fa fa-angle-right"></i>
                    A propos de nous</a><br>
                <a href="cart.php" class="text-decoration-none text-white"><i class="fa fa-angle-right"></i>
                    Mon Panier</a><br>
                <a href="categories.php" class="text-decoration-none text-white"><i class="fa fa-angle-right"></i>
                    Nos collections</a><br>
            </div>
            <div class="col-md-3">
                <h4 class="text-white">Addresse</h4>
                <p class="text-white">
                    Avenue Patrice Emery Lumumba,
                    Immeuble Latin,xyz Niveau,<br>
                    Pointe-Noire, République du Congo.
                </p>
                <a href="tel: +242067451201" class="text-decoration-none text-white"> <i
                        class="fa fa-phone me-2"></i>+242 06
                    745 12 01</a><br>
                <a href="mailto: contactezando@gmail.com" class="text-decoration-none text-white"> <i
                        class="fa fa-envelope me-2"></i>contactezando@gmail.com</a>
            </div>
            <div class="col-md-6">
                <!-- Gmail Place Direction <iframe></iframe>  -->
            </div>
        </div>
    </div>
</div>
<div class="py-2 bg-danger">
    <div class="text-center">
        <p class="mb-0 text-white">Tous droits reservés. Copyright @ <a href="https://www.e-zando/services/computer.com"
                class="text-decoration-none text-white" target="_blank">EZando-Computer Services</a> - <?= date("Y") ?>
        </p>
    </div>
</div>


<?php include("includes/footer.php"); ?>

<script>
//Using owl-carousel
$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    });

});
</script>

<?php


}else {
    //File Required error page if the database is not connected
    require_once("error-config.php");
} ?>