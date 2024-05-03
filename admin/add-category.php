<?php


include("./includes/header.php");

?>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div id="error-addCategory" class="block-error">
                <div class="alert alert-warning alert-dismissible fade show flex-direction-row" role="alert">
                    <p class="text-white text-center font-weight-bold text-xl"></p>
                    <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h4>Ajout d'une Catégorie</h4>
                </div>
                <div class="card-body">
                    <form action="../server/forms/admin/code.php" id="form_admin_addCategory" method="post"
                        enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="name" class="form-label">Nom</label>
                                <input type="text" name="name" id="name" class="form-control"
                                    placeholder="Entrer un nom d'une Catégorie">
                            </div>
                            <div class="col-md-6">
                                <label for="slug" class="form-label">Slug</label>
                                <input type="text" name="slug" id="slug" class="form-control"
                                    placeholder="Entrer un slug">
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Description</label>
                                <textarea rows="3" name="description" id="description"
                                    placeholder="Entrer une description pour une catégorie"
                                    class="form-control"></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="image" class="form-label">Image à télécharger</label>
                                <input type="file" name="image" id="image" class="form-control">
                                <small>Les extensions d'image autorisées : .jpg ou .JPG, .jpeg ou .JPEG, .png ou
                                    .PNG</small>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_title" class="form-label">Meta Titre</label>
                                <input type="text" name="meta_title" id="meta_title" class="form-control"
                                    placeholder="Entrer un meta titre pour une catégorie">
                            </div>
                            <div class="col-md-12">
                                <label for="meta_description" class="form-label">Meta Description</label>
                                <textarea rows="3" name="meta_description" id="meta_description"
                                    placeholder="Entrer une meta description pour une catégorie"
                                    class="form-control"></textarea>
                            </div>
                            <div class="col-md-12">
                                <label for="meta_keywords" class="form-label">Meta Mot-clés</label>
                                <textarea rows="3" name="meta_keywords" id="meta_keywords"
                                    placeholder="Entrer une meta des mots-clés pour une catégorie"
                                    class="form-control"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="status" class="form-label">Status</label>
                                <input type="checkbox" name="status" id="status">
                            </div>
                            <div class="col-md-6">
                                <label for="popular" class="form-label">Popularité</label>
                                <input type="checkbox" name="popular" id="popular">
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary" name="add_category">Enregistrer</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    </div>
</div>

<?php      

include_once("./includes/footer.php");

?>