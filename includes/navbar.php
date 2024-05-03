<nav class="navbar navbar-expand-lg navbar-dark sticky-top bg-orange shadow">
    <?php
      $url_request = $_SERVER['REQUEST_URI'];

    $scriptArray = explode("/", $_SERVER['SCRIPT_NAME']);

     $page = $scriptArray[3];
     
      if(
        str_contains($url_request, "product-view.php") || 
        str_contains($url_request, "checkout.php") || 
        str_contains($url_request, "my-orders.php") || 
        str_contains($url_request, "view-order.php") || 
        str_contains($url_request, "product-view-favorite.php")
      ){
        $viewStatut = true;
      }else{
        $viewStatut = false;
      }

      


      
      ?>
    <div class="container">

        <a class="navbar-brand" href="<?= $page=="index.php" || $viewStatut ? 'index.php' : "#" ?>">Ezando</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-current="page" aria-labelledby="navbarNavDropdown">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link <?= $page =="index.php" || $viewStatut ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="index.php" || $viewStatut ?'#': 'index.php'?>">Accueil</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link <?= $page =="categories.php"  ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="categories.php" ?'#': 'categories.php'?>">Nos Collections</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link <?= $page =="cart.php"  ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="cart.php" ?'#': 'cart.php'?>">Mon Panier</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= $page =="my-shortlist.php"  ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="my-shortlist.php" ?'#': 'my-shortlist.php'?>">Ma Liste de souhait</a>
                </li>


                <?php if (isset($_SESSION['auth'])) { ?>
                <li class="nav-item dropdown">
                    <a class="nav-link <?= $page == "publish-question.php" || $page == "forum.php" || $page == "my-questions.php" || $page == "edit-question.php" ? 'active' : '' ?> dropdown-toggle"
                        href="#faq" id="navbarDropdownMenuLink" data-bs-toggle="collapse" aria-current="page">
                        FAQ
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="faq">
                        <li><a class="dropdown-item" href="forum.php">Forum</a></li>
                        <li><a class="dropdown-item" href="publish-question.php">Publier une question</a></li>
                        <li><a class="dropdown-item" href="my-questions.php">Mes questions</a></li>

                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= $page =="chat-home.php"  ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="chat-home.php" ?'#': 'chat-home.php'?>">Service client</a>
                </li>

                <?php } ?>


                <?php

                   if (isset($_SESSION['auth'])) {

                ?>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#menu" id="navbarDropdownMenuLink"
                        data-bs-toggle="collapse" aria-current="page">
                        <?= $_SESSION['auth_user']['name']?>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="menu">
                        <?php if ($_SESSION['role_as'] == 1) { ?>
                        <li> <a class="dropdown-item" href="admin/index.php">Administration du site</a></li>
                        <?php } ?>
                        <li> <a class="dropdown-item" href="my-orders.php">Mes commandes</a></li>
                        <li> <a class="dropdown-item" href="my-shortlist.php">Ma Liste de souhaits</a></li>
                        <li> <a class="dropdown-item" href="logout.php">Se déconnecter</a></li>
                    </ul>
                </li>
                <?php } else { ?>
                <li class="nav-item">
                    <a class="nav-link <?= $page =="register.php"  ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="register.php" ?'#': 'register.php'?>">Inscription</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= $page =="login.php"  ? 'active': '' ?>" aria-current="page"
                        href="<?=$page=="login.php" ?'#': 'login.php'?>">Connexion</a>
                </li>
                <?php } ?>

            </ul>
        </div>
    </div>
</nav>