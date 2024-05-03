<?php

//Open session
session_start();

//<!-- File Required header  -->
include("includes/header.php");

//<!-- File Required params  -->
include_once("includes/includes_params.php");

//If user exists and connected
include_once("./authenticate.php");


if ($checkConn) {

   
?>


<div class="py-5">
    <div class="container">
        <!-- Error Client Side -->
        <div id="error-login" class="block-error">
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
        <div class="row">
            <form method="post" action="server/forms/client/forum-action.php">
                <div class="mb-3">
                    <label for="title" class="form-label">Titre de la question</label>
                    <input type="text" name="title" id="" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description de la question</label>
                    <textarea rows="3" name="description" id="" class="form-control"></textarea>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Contenu de la question</label>
                    <textarea rows="3" name="content" id="" class="form-control"></textarea>
                </div>
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary" name="publish_question">Publier la question</button>
                </div>
            </form>

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


<?php
}else {
    //File Required error page if the database is not connected
    require_once("error-config.php");
} ?>