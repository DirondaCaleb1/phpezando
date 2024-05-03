<?php


 //Open session
 session_start();

     //Required Files
    require_once("./admin/database/myparams.inc.php");
    require_once("./admin/database/config.inc.php");
    require_once("./admin/utils/UtilsDB.php");
    include("./utilsClient/UtilsDB.php");
    require_once("./admin/utils/utils.php");
    include("./utilsClient/Utils.php");

if (isset($_SESSION['auth'])) {
    $_SESSION["message"] = "Vous êtes déjà connecté";
    header('Location: index.php');

    $url = 'index.php';

    $message = "Vous êtes déjà connecté";

    UtilsClient::redirectByClient($url, $message);
    //echo "<script>window.location='index.php';</script>";
    //header("Location: index.php");
}

 include("includes/header.php");

?>


<div class="py-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <!-- Error Client Side -->
                <div id="error" class="block-error">
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
                <div class="card shadow-form">
                    <div class="card-header">
                        <h4 class='text-center'>Inscription</h4>
                    </div>
                    <div class="card-body">
                        <form action="server/forms/authcode.php" method="post" id="form-register">
                            <div class="mb-3">
                                <label for="exampleInputName1" class="form-label">Nom</label>
                                <input type="text" class="form-control" id="exampleInputName1"
                                    placeholder="Entrer votre Nom" name="exampleInputName1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPhone1" class="form-label">Telephone</label>
                                <input type="number" class="form-control" id="exampleInputPhone1"
                                    placeholder="Entrer votre numéro de téléphone" name="exampleInputPhone1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Adresse Email</label>
                                <input type="email" class="form-control" placeholder="Entrer votre adresse Email "
                                    id="exampleInputEmail1" name="exampleInputEmail1">
                            </div>
                            <div class="mb-3">
                                <label for="examplePassword1" class="form-label">Mot de Passe</label>
                                <input type="password" class="form-control" placeholder="Entrer votre mot de passe"
                                    id="examplePassword1" name="examplePassword1">
                            </div>
                            <div class="mb-3">
                                <label for="examplePassword2" class="form-label">Confirmation du Mot de
                                    Passe</label>
                                <input type="password" class="form-control" placeholder="Confirmer votre mot de passe"
                                    id="examplePassword2" name="examplePassword2">
                            </div>
                            <button type="submit" class="btn btn-primary" name="register">Inscription</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


<?php include("includes/footer.php"); ?>