    <noscript> <?php echo "<div>Veuillez activer Javascript</div>" ?></noscript>
    <footer class="footer pt-5">
        <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
                <div class="col-lg-12">
                    <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                        <li class="nav-item">
                            <a href="#" class="nav-link text-muted">A propos de nous</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link text-muted">Services</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link pe-0 text-muted">Contacts</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    </main>

    <!-- JS Script -->
    <!-- Bootstrap JS Files -->
    <script src="./assets/js/bootstrap.bundle.min.js"></script>

    <!-- JQuery JS Files -->
    <script src="./assets/js/jquery-3.7.0.min.js"></script>

    <!-- Scrollbar JS Files -->
    <script src="./assets/js/perfect-scrollbar.min.js"></script>
    <script src="./assets/js/smooth-scrollbar.min.js"></script>

    <!-- Others JS Files -->
    <script src="./assets/js/script.js"></script>
    <script src="./assets/js/add-category2.js"></script>
    <script src="./assets/js/add-product.js"></script>
    <script src="./assets/js/edit-category-as.js"></script>
    <script src="./assets/js/edit-product2.js"></script>
    <script src="./assets/js/orders.js"></script>

    <!-- Alertify JS Script  -->
    <script src="./assets/js/alertify.min.js"></script>

    <!-- Sweet Alert JS -->
    <!-- The file sweetalert.min.js always above the script that using it -->
    <script src="./assets/js/sweetalert.min.js"></script>
    <!-- Script using the API swal (dialog box)  -->
    <script src="./assets/js/custom.js"></script>

    <!-- Font Awesome Icons JS  -->
    <script src="assets/js/all.js"></script>

    <!--<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>-->
    <script>
<?php 
                if(isset($_SESSION["message_admin"]))
                { ?>
alertify.set('notifier', 'position', 'top-right');
alertify.success('<?=$_SESSION["message_admin"] ?>');
<?php
                unset($_SESSION["message_admin"]);
                } 
                ?>
    </script>
    </body>

    </html>