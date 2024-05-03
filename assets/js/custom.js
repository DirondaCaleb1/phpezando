$(document).ready(function () {
  //Event click of increment-btn listener
  $(document).on("click", ".increment-btn", function (e) {
    e.preventDefault();

    //Getting the value of initial quantity (the value of value attribute of input input-qty)
    let qty = $(this).closest(".product_data").find(".input-qty").val();

    //Getting the value of total quantity of product (the value of value attribute of input totalQty)
    let totalqty = $(this).closest(".product_data").find(".totalQty").val();

    let limit = 0; //Define maximal limit

    if (totalqty > 10) {
      //If total qty is greater than 10 : limit = 10
      limit += 10;
    } else if (totalqty >= 0 && totalqty < 10) {
      //If total qty is greater or equal to zero and is less that 10 : limit = totalQuantity
      limit += parseInt(totalqty);
    }

    //Conversion of string qty in number with maximal value : limit
    let value = parseInt(qty, limit);

    //value is equal to 0 if the variable value above is not a number, else is equal to value
    value = isNaN(value) ? 0 : value;

    //Define the condition to operate incrementation
    if (value > 0 && value <= 10) {
      //If value is greater that 0 and less or equal to 10
      value++; //Increment value
      $(this).closest(".product_data").find(".input-qty").val(value); //Affected the value value to field (input) input-qty
    }
  });

  //Operations to Decrement Quantity of product

  //Event click of decrement-btn listener
  $(document).on("click", ".decrement-btn", function (e) {
    e.preventDefault();

    //Getting the value of initial quantity (the value of value attribute of input input-qty)
    let qty = $(this).closest(".product_data").find(".input-qty").val();

    //Conversion of string qty in number with maximal value : 10
    let value = parseInt(qty, 10);

    //value is equal to 0 if the variable value above is not a number, else is equal to value
    value = isNaN(value) ? 0 : value;

    //Define the condition to operate decrementation
    if (value > 1) {
      //If value is greater that 1
      value--; //Decrement value
      $(this).closest(".product_data").find(".input-qty").val(value); //Affected the value value to field (input) input-qty
    }
  });

  //Add to Cart one product

  //Event click of addToCartBtn listener
  $(document).on("click", ".addToCartBtn", function (e) {
    e.preventDefault();

    //Getting the value of initial quantity (the value of value attribute of input input-qty)
    let qty = $(this).closest(".product_data").find(".input-qty").val();

    //Getting the value of product_id (Getting thanks to value of value attribute of addToCartButton)
    let product_id = $(this).val();

    //Setting the ajax variable
    //Create the AJAX variable to listen server (saying the file treat the form) via The POST method
    $.ajax({
      method: "POST", //Treatment method (POST OR GET)
      url: "server/actionsClient/handleCart.php", //Url of server treatment
      data: {
        product_id: product_id,
        product_qty: qty,
        scope: "add",
      }, //Data sending by client to server
      success: function (response) {
        //Function execute after the server response
        if (response == 201) {
          //If the inserting operation is successful
          alertify.success(
            "Un produit a été ajouté à votre panier de commandes avec succès"
          );
        } else if (response == "existing") {
          //If the product is exists
          alertify.success("Ce produit est déjà présente dans votre panier");
        } else if (response == "sold out") {
          //If the quantity of product is equal to 0
          alertify.success(
            "Ce produit est indisponible, vous ne pouvez pas effectuer cette action !"
          );
        } else if (response == 401) {
          //If user is not connected
          alertify.success("Veuillez vous connecter pour continuer !");
        } else if (response == 500) {
          //If the inserting operation is not successful
          alertify.success(
            "Une erreur est survenue (erreur interne au serveur)"
          );
        }
      },
    });
  });

  //Update click of increment-btn and decrement button
  $(document).on("click", ".updateQty", function () {
    //Getting the value of initial quantity (the value of value attribute of input input-qty)
    let qty = $(this).closest(".product_data").find(".input-qty").val();

    //Getting the value of product_id (Getting thanks to value of value attribute of prodId input)
    let product_id = $(this).closest(".product_data").find(".prodId").val();

    $.ajax({
      method: "POST", //Treatment method (POST OR GET)
      url: "server/actionsClient/handleCart.php", //Url of server treatment
      data: {
        product_id: product_id,
        product_qty: qty,
        scope: "update",
      }, //Data sending by client to server
      success: function (response) {
        //alert(response);
      },
    });
  });

  //deleteItem

  //delete click item button listener
  $(document).on("click", ".deleteItem", function () {
    //Getting the value of id cart item (thanks the value of value attribute of button deleteItem)
    let cart_id = $(this).val();

    $.ajax({
      method: "POST", //Treatment method (POST OR GET)
      url: "server/actionsClient/handleCart.php", //Url of server treatment
      data: {
        cart_id: cart_id,
        scope: "delete",
      }, //Data sending by client to server
      success: function (response) {
        if (response == 200) {
          //If the deleting operation is success
          alertify.success(
            "Un produit a été supprimé à votre panier de commandes avec succès"
          );
          $("#myCart").load(location.href + " #myCart"); //Refresh automatically the cart page
        } else {
          //If the deleting operation is not success
          alertify.success(response);
        }
      },
    });
  });
});
