<!-- Slider image carousel -->
<div id="carouselExampleIndicator" class="carousel slide" data-bs-ride="true">
    <!-- Slider Carousel indicators -->
    <div class="carousel-indicators">
        <!-- Slider Carousel indicator active -->
        <button type="button" data-bs-target="#carouselExampleIndicator" data-bs-slide-to="0" class="active"
            aria-current="page" aria-label="Slider1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicator" data-bs-slide-to="1"
            aria-label="Slider2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicator" data-bs-slide-to="2"
            aria-label="Slider3"></button>
    </div>
    <!-- Slider Carousel inner -->
    <div class="carousel-inner">
        <!-- Slider Carousel item active -->
        <div class="carousel-item active">
            <img src="assets/images/slider-1.jpg" height="500px" alt="Image1" class="d-block w-100" />
        </div>
        <div class="carousel-item">
            <img src="assets/images/slider-2.jpg" height="500px" alt="Image2" class="d-block w-100" />
        </div>
        <div class="carousel-item">
            <img src="assets/images/slider-3.jpg" height="500px" alt="Image3" class="d-block w-100" />
        </div>
    </div>
    <!-- Slider button prev -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicator"
        data-bs-slide-to="previous">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Précédent</span>
    </button>
    <!-- Slider button next -->
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicator"
        data-bs-slide-to="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Suivant</span>
    </button>
</div>