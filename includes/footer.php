    <noscript> <?php echo  "< div>Veuillez activer Javascript</>" ?> </noscript>

    <!-- Optionnal Javascript; choose one of the two -->
    <script src="assets/js/jquery-3.7.0.min.js"></script>
    <!-- Bootstrap Bundle with Popper -->
    <script src="assets/js/bootstrap.bundle.min.js"></script>

    <!-- Font Awesome Icons JS  -->
    <script src="assets/js/all.js"></script>

    <!-- Owl-Carousel JS  -->
    <script src="assets/js/owl.carousel.min.js"></script>

    <!-- JS Script Files Adding -->
    <!-- Validation Form Client Side -->
    <script src="assets/js/checkLogin2.js"></script>
    <script src="assets/js/signup.js"></script>
    <script src="assets/js/forgetAndResetPwd.js"></script>
    <script src="assets/js/placeorder.js"></script>
    <!-- Animate Other JScript -->
    <script src="assets/js/script2.js"></script>
    <script src="assets/js/animate.js"></script>
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/custom2.js"></script>
    <script src="assets/js/custom3.js"></script>

    <!-- Alertify JS Script  -->
    <script src="assets/js/alertify.min.js"></script>

    <script>
alertify.set('notifier', 'position', 'top-right');
<?php 
                if(isset($_SESSION["message"]))
                { ?>

alertify.success('<?=$_SESSION["message"] ?>');
<?php
                unset($_SESSION["message"]);
                } 
                ?>
    </script>

    <!-- Bootstrap Bundle with Popper -->
    <!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous">
    </script>-->
    </body>

    </html>