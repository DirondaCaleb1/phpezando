$(document).ready(function () {
  //Delete Product Event Listener to button delete in products.php

  $(document).on("click", ".delete_product_btn", function (e) {
    //Disable the default event of click
    e.preventDefault();

    //Getting the id value containing in the attribute value
    let id = $(this).val();

    //Using the swal console
    swal({
      title: "Etes vous sûr ?", //Title of console
      text: "Une fois effacée, vous ne seriez plus capable de le restaurer!", //Message of console
      icon: "warning", //Icon
      buttons: true, //Presence of buttons
      dangerMode: true, // Presence of danger mode
    }).then((willDelete) => {
      //Treatment of form PHP by Ajax
      if (willDelete) {
        //If event exists
        //Create the AJAX variable to listen server (saying the file treat the form) via The POST method
        $.ajax({
          method: "POST", //Treatment method (POST OR GET)
          url: "../server/forms/admin/code.php", //Url of server treatment
          data: {
            product_id: id,
            delete_product_btn: true,
          }, //Data sending by client to server
          success: function (response) {
            //Function execute after the server response
            if (response == 200) {
              //If the deleting operation is successful
              swal(
                "Success!",
                "Un produit a été supprimé avec succès",
                "success"
              ); //Message of success in the swal console
              $("#products_table").load(location.href + " #products_table"); //Automatically Refresh  page products.php
            } else if (response == 500) {
              //If the deleting operation is not successful
              swal("Error!", "Erreur interne au serveur", "error");
            }
          },
        });
      }
    });
  });

  $(document).on("click", ".delete_category", function (e) {
    e.preventDefault();

    let id = $(this).val();

    swal({
      title: "Etes vous sûr ?",
      text: "Une fois effacée, vous ne seriez plus capable de le restaurer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          method: "POST",
          url: "../server/forms/admin/code.php",
          data: {
            category_id: id,
            delete_category: true,
          },
          success: function (response) {
            if (response == 200) {
              swal(
                "Success!",
                "Une catégorie a été supprimé avec succès",
                "success"
              );
              $("#category_table").load(location.href + " #category_table");
            } else if (response == 500) {
              swal("Error!", "Erreur interne au serveur", "error");
            }
          },
        });
      }
    });
  });

  //dataType: "json" if encode the data from servor in the json thanks the function json_encode()
  /*

  $("./#....").addClass("class") add the CSS class to elt
  $("./#....").removeClass() remove the CSS class to elt
  $("./#....").css("attribut", "value") attribute to attribut "attribut" the value "value"
  $("./#....").reset() erase the input value



  */
});
