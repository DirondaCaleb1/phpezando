<?php

    //Open session
    session_start();

    //File required
    require_once("../../../admin/database/myparams.inc.php");
    require_once("../../../admin/database/config.inc.php");
    require_once("../../../admin/utils/UtilsDB.php");
    require_once("../../../utilsClient/UtilsDB.php");
    require_once("../../../utilsClient/Utils.php");

$database = "ezando";

$checkConn = UtilsDB::checkConnection($database);

if ($checkConn) {
    if(isset($_SESSION['auth']))
    { //If user is connected

        //Processing to partial validate the order
        if (isset($_POST['placeOrderBtn'])) { //If the placeOrderBtn exists

            //Initialize the input value
            $name = htmlentities(strip_tags($_POST["name"])); //Name of product
            $phone = htmlentities(strip_tags($_POST["phone"])); //Phone of product
            $email = htmlentities(strip_tags($_POST["email"])); //Email of product
            $pincode = htmlentities(strip_tags($_POST["pincode"])); //Pin Code of product
            $address = htmlentities(strip_tags($_POST["address"])); //Address of product
            $payment_mode = htmlentities(strip_tags($_POST["payment_mode"])); //Payment mode of product
            $payment_id = htmlentities(strip_tags($_POST["payment_id"])); //Payment id of product

            //Define the RegExp Validate Variable
            $regExpPhone = "/^[0-9]{6,30}$/"; //Regex phone
            $regExpEmail = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"; //Regex email
            $regExpName = "/^[a-zA-Z\s]+$/"; //Regex name
            $regExpCodePin = "/^[0-9]{4,8}$/"; //Regex code pin

            //Define the Validate the value of input Not Empty
            $validatePhone = UtilsClient::validateInputByRegex($regExpPhone, $phone); //Validate phone
            $validateEmail = UtilsClient::validateInputByRegex($regExpEmail, $email); //Validate email
            $validateName  =  UtilsClient::validateInputByRegex($regExpName, $name); //Validate name
            $validateCodePin = UtilsClient::validateInputByRegex($regExpCodePin, $pincode); //Validate pin code
    
            //Define the constant DataBase elt

            //Get the item in the cart table

            //Define the variable

            //TableName carts 
            $tableNameCart = "carts";

            //TableName products
            $tableNameProduct = "products";

            //Column Selected 
            $columnSelect = [
              "carts.id", 
              "carts.product_id", 
              "carts.product_qty",
              "products.id AS pid",  
              "products.name", 
              "products.image", 
              "products.selling_price" 
            ];

            //Column to filter product_id
            $columnNameFilterProduct = "carts.product_id";

            //Column to filter user_id
            $columnNameFilterUser = "carts.user_id";

            //value to filter user_id
            $valueFilterUser = $_SESSION['auth_user']['user_id'];

            //Ording Columns
            $ordingColumns = ["carts.id"];

            //Ording Orientation
            $ordingCurrent = "DESC";


            //Get the result in the associative array (key1 = "result" : is an array multidimensional (2 dimensions) includes the values of columns selecting for each row, key2 : "rowTotals" => total row of query result : integer  ) returning by function
            $arrayItemsInCart = UtilsClient::getDetailsAllProductsToCart(
                $database,
                $tableNameCart, 
                $columnSelect, 
                $tableNameProduct, 
                $columnNameFilterProduct, 
                $columnNameFilterUser,  
                $valueFilterUser, 
                $ordingColumns, 
                $ordingCurrent
            );

            //Result items in cart
            $resultCartItems = $arrayItemsInCart["result"];

            //Number rows of query SELECT
            $num_row_count_cart =  $arrayItemsInCart["rowTotals"];

            //Define and setting initial totalPrice
            $totalPrice = 0;
            if ($num_row_count_cart > 0) { //If it less one item of carts table
                foreach ($resultCartItems as $items) { //Iterate all products to calculate total price of all products

                    //Total price of all products
                    $totalPrice += $items['selling_price'] * $items['product_qty'];
                }
            }
            
            // Values to insert data in the orders table

            //TableName orders
            $tableNameInsertUserOrder = "orders";

            //Column to insert in the orders table
            $columInsertUserOrder = [
              "tracking_no", 
              "user_id",
              "name",
              "email",
              "phone",
              "address",
              "pinCode",
              "total_price",
              "payment_mode",
              "payment_id"
            ];

            //Checking
            if(
               empty($name) || 
               empty($phone) || 
               empty($email) || 
               empty($pincode) || 
               empty($address) 
            ){ //Checking if is empty
                $url = "../../../checkout.php";
                $message = "Veuillez obligatoirement remplir tous les champs";
                UtilsClient::redirectByClient($url, $message);
            }else{
                if(
                  $validateName != true || 
                  $validatePhone != true || 
                  $validateEmail != true ||  
                  $validateCodePin !=true
                ){ //Check if it's not validate
                    $url = "../../../checkout.php";
                    $message = "Une erreur de saisie est survénue (Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et/ou l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et/ou le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et/ou le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)";
                    UtilsClient::redirectByClient($url, $message);
                } else {

                    //Setting Tracking number
                    $tracking_number = "ezando" . rand(11111, 99999).substr($phone, 2);

                    //Getting user_id
                    $user_id = $_SESSION['auth_user']['user_id'];

                    //Column Insertion to orders tableName
                    $valuesInsertOrdersPartial = [
                        $tracking_number,
                        $user_id,
                        $name,
                        $email,
                        $phone,
                        $address,
                        $pincode,
                        $totalPrice,
                        $payment_mode,
                        $payment_id
                    ];


                    //Insert data in the orders table (associative array key success and lastIndex)
                    $insertUserOrder = UtilsClientDB::insertDataByClientAndPDO(
                         $database, 
                        $tableNameInsertUserOrder, 
                        $columInsertUserOrder, 
                        $valuesInsertOrdersPartial
                    );

                    if ($insertUserOrder["success"]) { //If insertion is successful

                        //Getting the id auto-increment of orders table to insert in the order_items
                        $order_id = $insertUserOrder["lastIndex"];
                        
                        //Iterate all products item in the cart to insert in the order_items and update the quantity in the products table
                        foreach ($resultCartItems as $items) { 
                            
                            //TableName order_items
                            $tableNameInsertItemOrder = "order_items";

                            //Column to insert data in order_items
                            $columInsertItemOrder = ["order_id", "product_id", "qty", "price"];

                            //Product id
                            $product_id = $items['product_id'];

                            //Product qty
                            $product_qty = $items['product_qty'];

                            //Product selling_price
                            $product_price = $items['selling_price'];

                             //Values to insert data in order_items
                            $valuesInsertItemOrder = [
                                $order_id, 
                                $product_id, 
                                $product_qty, 
                                $product_price
                            ];
                            
                            //Insert data in the order_items table
                            $insertBoolItemOrderResult = UtilsClientDB::insertDataByClient(
                                $database, 
                                $tableNameInsertItemOrder, 
                                $columInsertItemOrder, 
                                $valuesInsertItemOrder
                            );

                            //TableName Products to extract the value of total qty of product
                            $tableNameProductSelect = "products";
                            
                            //Column to select in the products table
                            $columnProductSelect = ["*"];

                            //Column to filter the product by id (product table)
                            $closuresProductSelect = ["id"];

                            //Operator to filter the product by id (product table)
                            $operatorsProductSelect = ["="];

                            //Logic operator to filter the product by id (product table)
                            $logicOperatorProductSelect = [""];

                            //Values to filter the product by id (product table)
                            $valuesProductSelect = [$product_id];

                            //Limit number of result of query select
                            $limitNumber = 1;

                            //Array containing the result of query SELECT in the products table and the number of rows of result
                            $resultProducSelect = UtilsClientDB::getResultWithConditionAndLimit(
                                $database,
                                $tableNameProductSelect,
                                $columnProductSelect,
                                $closuresProductSelect,
                                $operatorsProductSelect,
                                $logicOperatorProductSelect,
                                $valuesProductSelect,
                                $limitNumber
                            );

                            //Extract product query SELECT in the array
                            $dataProductSelect = $resultProducSelect["result"][0];

                            //Total number row of result 
                            $num_row_count_prod = $resultProducSelect["rowTotals"];

                            //Current qty in the products table
                            $current_qty = $dataProductSelect[9];

                            //New quantity after substrate current quantity (in the table products) with the quantity in the order_items table
                            $new_qty = $current_qty - $product_qty;

                            //Tablename products to update the value of qty 
                            $tableNameProductUpdate = "products";

                            //Column to update in the products table
                            $columnProductUpdate = ["qty"];

                            //Operator to update in the products table
                            $operatorsProductUpdate = ["="];

                            //Column to filter the row to update in the products table
                            $columnClosureProductUpdate = ["id"];

                            //Operator to filter the row to update in the products table
                            $operatorClosureProductUpdate = ["="];

                            //Logic operator to filter the row to update in the products table
                            $logicOperatorClosureProductUpdate = [""];

                            //Values to filter the row  in the products table to update and values to update
                            $valuesProductUpdate = [$new_qty, $product_id];

                            //Processing update the quantity in the products table
                            $updateQtyProduct = UtilsClientDB::UpdateSomethingByClient(
                                $database,
                                $tableNameProductUpdate,
                                $columnProductUpdate,
                                $columnClosureProductUpdate,
                                $operatorsProductUpdate,
                                $operatorClosureProductUpdate,
                                $logicOperatorClosureProductUpdate,
                                $valuesProductUpdate
                            );
                        }
                        
                        //mysqli_object -> mysqli_insert_Id(); 

                        //TableName Carts to delete the products ordered by client
                        $tableNameCartDelete = "carts";

                        //Column to filter the user in the carts table
                        $columnClosureCartDelete = ["user_id"];

                        //Operators to filter the user in the carts table
                        $operatorClosureCartDelete = ["="];

                        //Logic operator to filter the user in the carts table
                        $logicOperatorClosure = [""];

                        //Value to filter the user in the carts table
                        $valuesClosureCartDelete = [$valueFilterUser];


                        //Delete the data in the cart table if the data is inserted in the order_items
                        $deleteCart = UtilsClientDB::deleteSomethingByClient(
                          $database, 
                          $tableNameCartDelete, 
                          $columnClosureCartDelete, 
                          $operatorClosureCartDelete, 
                          $logicOperatorClosure , 
                          $valuesClosureCartDelete 
                        );

                        $_SESSION["message"] = "Votre commande a été prise en compte avec succès";
                        
                        header('Location: ../../../my-orders.php');

                        //Stop immediately the script
                        die();
                        
                    } else {
                        
                    }
                    
                    
                }
                
            }

        }
    }
    else
    {
        header('Location: ../../../index.php');
    }
}else {
    header('Location: ../../../error-config.php');
}

?>