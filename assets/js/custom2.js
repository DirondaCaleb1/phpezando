$(document).ready(function () {
  $(document).on("click", ".addToShortListBtn", function () {
    let product_id = $(this).val();

    $.ajax({
      method: "POST",
      url: "server/actionsClient/handleToFavorite.php",
      data: {
        product_id: product_id,
        scope: "shortlist-add",
      },
      success: function (response) {
        if (response == 202) {
          alertify.success(
            "Un produit a été ajouté à votre liste de souhaits avec succès"
          );
        } else if (response == "existing") {
          alertify.success(
            "Ce produit est déjà présente dans votre liste de souhaits"
          );
        } else if (response == 401) {
          alertify.success("Veuillez vous connecter pour continuer !");
        } else if (response == 500) {
          alertify.success(
            "Une erreur est survenue (erreur interne au serveur)"
          );
        }
      },
    });
  });

  $(document).on("click", ".deleteItemFavButton", function () {
    let shortlist_id = $(this).val();

    $.ajax({
      method: "POST",
      url: "server/actionsClient/handleToFavorite.php",
      data: {
        shortlist_id: shortlist_id,
        scope: "shortlist-delete",
      },
      success: function (response) {
        if (response == 200) {
          alertify.success(
            "Un produit a été supprimé dans votre liste de souhaits avec succès"
          );
          $("#myshortlist").load(location.href + " #myshortlist");
        } else {
          alertify.success(response);
        }
      },
    });
  });
});
