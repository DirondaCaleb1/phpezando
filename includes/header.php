<?php

///projetsPerso/ezando/register.php'
///projetsPerso/ezando/login.php'

?>

<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="76x76" href="./icones/delivery.png" />
    <link rel="icon" type="image/png" href="./icones/delivery.png" />

    <!-- Bootstrap CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"> -->

    <!-- CSS Other files -->
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="assets/css/custom2.css" rel="stylesheet">


    <!-- Alertify CSS files   -->
    <link href="assets/css/alertify.min.css" rel="stylesheet" />

    <!-- Bootstrap CSS files -->
    <link href="assets/css/themes/bootstrap.min.css" rel="stylesheet" />

    <!-- Owl-carousel CSS files -->
    <link href="assets/css/owl.theme.default.min.css" rel="stylesheet" />
    <link href="assets/css/owl.carousel.min.css" rel="stylesheet" />

    <!-- Font Awesome Icons -->
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/fontawesome.min.css" rel="stylesheet">-->
    <link href="assets/css/all.css" rel="stylesheet" />

    <!-- Responsive screen (Tablet and Smartphone) -->
    <link href="assets/css/responsive.css" rel="stylesheet">

    <!-- Authentification CSS -->
    <link href="assets/css/auth.css" rel="stylesheet">

    <?php if (isset($_SERVER['REQUEST_URI']) && ($_SERVER['REQUEST_URI'] == "/projetsPerso/ezando/index.php" || $_SERVER['REQUEST_URI'] == "/projetsPerso/ezando/" )) { ?>
    <title>E-Market <?= "- Accueil"?></title>
    <?php } else { ?>
    <?php if (isset($_SERVER['REQUEST_URI']) && ($_SERVER['REQUEST_URI'] == "/projetsPerso/ezando/register.php")) { ?>
    <title>E-Market <?= " - Inscription"?></title>
    <?php } else if (isset($_SERVER['REQUEST_URI']) && ($_SERVER['REQUEST_URI'] == "/projetsPerso/ezando/login.php")) { ?>
    <title>E-Market <?= " - Connexion"?></title>
    <?php } else { ?>
    <title>E-Market <?= ""?></title>
    <?php } ?>
    <?php } ?>

    <style>
    .block-error {
        display: none;
    }

    .block-error.showactive {
        display: contents;
    }

    .form-control.danger {
        border: 4px solid #ff0000 !important;
        padding: 8px 10px;
    }

    .form-select.danger {
        border: 4px solid #ff0000 !important;
        padding: 8px 10px;
    }
    </style>



</head>

<body>
    <?php include("navbar.php"); ?>