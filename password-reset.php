<?php

    //Required Files
    require_once("./admin/database/myparams.inc.php");
    require_once("./admin/database/config.inc.php");
    require_once("./admin/utils/UtilsDB.php");
    include("./utilsClient/UtilsDB.php");
    require_once("./admin/utils/utils.php");
    include("./utilsClient/Utils.php");

 //Open session
 session_start();

if (isset($_SESSION['auth']) ) {

    $url = 'index.php';

    //$_SESSION["message"] = "Vous êtes déjà connecté";
    $message = "Vous êtes déjà connecté";

    UtilsClient::redirectByClient($url, $message);

    //header('Location: index.php');
    //echo "<script>window.location='index.php';</script>";
    //header("Location : index.php");
}

 include("includes/header.php");

?>


<div class="py-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <!-- Error Client Side -->
                <div id="error-verif" class="block-error">
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
                        <h4 class='text-center'>Reinitialisation du mot de passe</h4>
                    </div>
                    <div class="card-body">
                        <form action="server/forms/authcode.php" method="post" id="form-reset">
                            <div class="mb-3">
                                <label for="pwd_reset" class="form-label">Nouveau mot de passe</label>
                                <input type="password" class="form-control" placeholder="Entrer votre mot de passe"
                                    id="pwd_reset" name="pwd_reset">
                            </div>
                            <div class="mb-3">
                                <label for="pwd_reset_confirm" class="form-label">Confirmer votre mot de passe</label>
                                <input type="password" class="form-control" placeholder="Entrer votre mot de passe"
                                    id="pwd_reset_confirm" name="pwd_reset_confirm">
                            </div>
                            <button type="submit" class="btn btn-primary" name="pwd_reset_btn">Valider</button>
                        </form>
                        <div class="mb-3 text-black text-decoration-underline py-2">
                            <a class="text-decoration-none text-black" href="login.php">Retour à la page de
                                Connexion</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<?php include("includes/footer.php"); ?>