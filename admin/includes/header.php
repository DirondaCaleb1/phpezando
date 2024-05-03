<?php

//Open session
session_start();

/* Middleware  */

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="../icones/delivery.png">
    <link rel="icon" type="image/png" href="../icones/delivery.png">
    <title>
        E-Market - Admin
    </title>
    <!--     Fonts and icons     
    <link rel="stylesheet" type="text/css"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />-->

    <!-- Font Awesome Icons 
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>-->
    <!-- Material Icons 
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">-->
    <!-- CSS Files -->
    <!-- Dashboard Admin CSS -->
    <link id="pagestyle" href="./assets/css/material-dashboard.min.css" rel="stylesheet" />

    <!-- Othert CSS Styles -->
    <link href="./assets/css/style.css" rel="stylesheet" />
    <link href="./assets/css/responsive.css" rel="stylesheet" />
    <link href="./assets/css/icon-style.css" rel="stylesheet" />
    <link href="./assets/css/add-category.css" rel="stylesheet" />

    <!-- AlertifyJS CSS Files   -->
    <link href="./assets/css/alertify.min.css" rel="stylesheet" />
    <link href="./assets/css/themes/bootstrap.min.css" rel="stylesheet" />

    <!-- Font Awesome Icons -->
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/fontawesome.min.css" rel="stylesheet">-->
    <link href="assets/css/all.css" rel="stylesheet" />

    <style>
    .form-control {
        border: 1px solid #b3a1a1 !important;
        padding: 8px 10px;
    }

    .block-error {
        display: none;
    }

    .block-error.showactive {
        display: contents;
    }

    .form-control.danger {
        border: 1px solid #ff0000 !important;
        padding: 8px 10px;
    }

    .form-select {
        border: 1px solid #b3a1a1 !important;
        padding: 8px 10px;
    }

    .form-select.danger {
        border: 1px solid #ff0000 !important;
        padding: 8px 10px;
    }
    </style>
</head>

<body class="g-sidenav-show  bg-gray-200">
    <!-- File Required sidebar  -->
    <?php include("./includes/sidebar.php"); ?>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <!-- File Required navbar  -->
        <?php  include("./includes/navbar.php"); ?>