<?php
    //Open session
    session_start();

    //Files required to use the database
    require_once("../../../admin/database/myparams.inc.php");
    require_once("../../../admin/database/config.inc.php");
    require_once("../../../admin/utils/UtilsDB.php");
    require_once("../../../admin/utils/utils.php");
    require_once("../../../admin/utils/utilsAdminDB.php");

   $database = "ezando";

   $checkConn = UtilsDB::checkConnection($database);

if ($checkConn) { 
    //Check the database connection

    //Admin Manipulate Category
    if(isset($_POST["add_category"])){ //Form Validating and Submitting the value in the categories table
      //Initialize the input value
       $name = htmlentities(strip_tags($_POST['name'])); // Name of category
       $slug = htmlentities(strip_tags($_POST['slug'])); // Slug of category
       $description = htmlentities(strip_tags($_POST["description"])); // Description of category
       $meta_title = htmlentities(strip_tags($_POST["meta_title"])); // Title of category
       $meta_description = htmlentities(strip_tags($_POST["meta_description"])); // Meta-Description of category
       $meta_keywords = htmlentities(strip_tags($_POST["meta_keywords"])); // Keywords of category
       $status = isset($_POST["status"]) ? '1' : '0' ; // Status of category
       $popular= isset($_POST["popular"]) ? '1' : '0' ; // Popularity of category

       //Define the RegExp Validate Variable
       $regExp = "/^[a-zA-Z\s]+$/";

      //Define the  Validate the value of input Not Empty
       $validateName = Utils::validateInputByRegex($regExp, $name); //Validate Name of category by regular expression
       $validateSlug = Utils::validateInputByRegex($regExp, $slug); //Validate Slug of category by regular expression
       $validateTitle = Utils::validateInputByRegex($regExp, $meta_title); //Validate Title of category by regular expression


    
        //Define the variable of $_FILES
        $keyName = ["image"];
        $keyN = "image";
        $typeFile = "image";
        $tmpDirectoryFile = $_FILES[$keyN]['tmp_name'];
        $nameFile = $_FILES[$keyN]['name'];

        
        //Array of accepted type (extension) of image file
        $typeAccepted =  [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG"];

        //Prefix of upload path of file
        $prefixeUploaded = "../../../";

        //SubPath of upload file
        $pathDirectory = "img/admin/categories";


        

        //Validate and Upload An Image
        $fileUploaded = Utils::validateUploadedMyFile(
            $typeAccepted,
            $pathDirectory,
            $prefixeUploaded,
            $tmpDirectoryFile,
            $nameFile
        );

        //Define the constant DataBase element

        //TableName of Insert
        $tableNameCategory = "categories";

        //Column Insert
        $columnInsertCategory = [
            "name",
            "slug",
            "description",
            "status",
            "popular",
            "image",
            "meta_title",
            "meta_description",
            "meta_keyword"
        ];
         
        //If the field is or not empty
        if(empty($name) || empty($slug) || empty($meta_title) || empty($meta_description) || empty($meta_keywords) || $fileUploaded["state"] ==null ){
            $url = "../../../admin/add-category.php";
            $_SESSION["message_admin"] = "Une erreur est survénue (Veuillez obligatoirement remplir les champs vides(nom, slug, titre, meta description et meta mots-clés) et/ou fournir une image)";
            header("Location: " . $url); 
        }else{
            //Validate the value of name, slug, title and upload of image
            if($validateName != true || $validateSlug != true || $validateTitle != true || $fileUploaded["state"] ===false && $fileUploaded["success"] == false){
                $url = "../../../admin/add-category.php";
                $_SESSION["message_admin"] = "Une erreur est survénue (Le nom et/ou le slug et/ou le titre possède des caractères invalides (seules les lettres sont autorisées pour ses champs) et/ou le fichier que vous avez téléverser ne possède pas la bonne extension (les extensions autorisées sont .jpg, .JPG, .jpeg, .JPEG, .png, .PNG) )";
                header("Location: " . $url);
            }else{
                //Define the image name
                $image = $fileUploaded["nameFile"];

                //Define the array of values insert
                $valueInsertCategory = [
                   $name,
                   $slug, 
                   $description,  
                   $status, 
                   $popular, 
                   $image , 
                   $meta_title,
                   $meta_description, 
                   $meta_keywords
                ];

                //Insert the value in table Categories
                $insertBoolResult = UtilsAdminDB::insertDataByAdmin($database, $tableNameCategory, $columnInsertCategory, $valueInsertCategory);
            
                if($insertBoolResult){ // If the value is insert
                    $url = "../../../admin/add-category.php";
                    $message = "Une Catégorie ajoutée avec succès";
                    $_SESSION["message_admin"] = $message;
                    header('Location: ' . $url); //Display Message and redirect 
                }else{
                   $url = "../../../admin/add-category.php";
                   $message = "Erreur interne au serveur";
                   $_SESSION["message_admin"] = $message;
                   header('Location: ' . $url);                
                }
            }
       }

       //pathinfo($path, PATH)
       //pathinfo()
    }else if(isset($_POST["update_category"])){ //Form Validating and Submitting the value in the categories table after the update
              
       //Initialize the input value
       $name = htmlentities(strip_tags($_POST['name'])); // Name of category
       $slug = htmlentities(strip_tags($_POST['slug'])); // Slug of category
       $description = htmlentities(strip_tags($_POST["description"])); // Description of category
       $meta_title = htmlentities(strip_tags($_POST["meta_title"])); // Title of category
       $meta_description = htmlentities(strip_tags($_POST["meta_description"])); //MetaDescription of category
       $meta_keywords = htmlentities(strip_tags($_POST["meta_keywords"])); // Keywords of category
       $status = isset($_POST["status"]) ? '1' : '0' ; // Status of category
       $popular= isset($_POST["popular"]) ? '1' : '0' ; // Popular of category
        $old_image = $_POST["old_image"]; // old Image of category

       //Define the RegExp Validate Variable
       $regExp = "/^[a-zA-Z\s]+$/";

        //Define the  Validate the value of input Not Empty
       $validateName = Utils::validateInputByRegex($regExp, $name);
       $validateSlug = Utils::validateInputByRegex($regExp, $slug);
       $validateTitle = Utils::validateInputByRegex($regExp, $meta_title);

        //Define the variable of $_FILES
        $keyName = ["image"];
        $keyN = "image";
        $typeFile = "image";
        $tmpDirectoryFile = $_FILES[$keyN]['tmp_name'];
        $newNameFile = $_FILES[$keyN]['name'];

        //Array of accepted type (extension) of image file
        $typeAccepted =  [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG"];

        //Prefix of upload path of file
        $prefixeUploaded = "../../../";

        //SubPath of upload file
        $pathDirectory = "img/admin/categories";
        

        if($newNameFile != ""){ //If the new image is submitted
            
            $updateFileName = $newNameFile;
            
            //Validate and Upload An Image
            $fileUploaded = Utils::validateUploadedMyFile(
                $typeAccepted,
                $pathDirectory,
                $prefixeUploaded,
                $tmpDirectoryFile,
                $updateFileName
            );
        }else{ //If the new image is not submitted
            $updateFileName = $old_image;
            $fileUploaded = null;
        }

        //TableName Update
        $tableNameCategory = "categories";

        //Array of column Update names
        $columnUpdate = [
         "name",
         "slug", 
         "description",
          "status", 
          "popular", 
          "image", 
          "meta_title", 
          "meta_description",
           "meta_keyword"
        ];
        
        //Array contains the row to can permite Filter the row to  Update
        $closuresUpdate = ["id"];

        //Operators of Column Update
        $operators = ["=", "=", "=", "=", "=", "=", "=", "=", "="];
        
        //Operators of Column Filter
        $operatorsClosure = ["="];

         //Operators Logic
        $logicOperators = [""];

         //Category Id
        $categoryId = $_POST['category_id'];


        //If Is Empty
        if(
            empty($name) || 
            empty($slug) || 
            empty($meta_title) || 
            empty($meta_description) || 
            empty($meta_keywords)
        ){
            $url = "../../../admin/edit-category.php?id=$categoryId";
            $_SESSION["message_admin"] = "Une erreur est survénue (Veuillez obligatoirement remplir les champs vides(nom, slug, titre, meta description et meta mots-clés))";
            header("Location: " . $url); 
        }else{
            if($updateFileName != $old_image){ // If the file is submitted ("")
                if(
                    $validateName != true || 
                    $validateSlug != true || 
                    $validateTitle != true || 
                    $fileUploaded["state"] ==false && 
                    $fileUploaded["success"] == false
                ){ //Validate the input and the file
                    $url = "../../../admin/edit-category.php?id=$categoryId";
                    $_SESSION["message_admin"] = "Une erreur est survénue (Le nom et/ou le slug et/ou le titre possède des caractères invalides (seules les lettres sont autorisées pour ses champs) et/ou le fichier que vous avez téléverser ne possède pas la bonne extension (les extensions autorisées sont .jpg, .JPG, .jpeg, .JPEG, .png, .PNG) )";
                    header("Location: " . $url);
                }else{
                    //Setting the name of file
                   $image = $fileUploaded["nameFile"];

                   //Values to update and to filter the row of table to update
                    $values = [
                      $name, 
                      $slug, 
                      $description, 
                      $status, 
                      $popular, 
                      $image, 
                      $meta_title, 
                      $meta_description, 
                      $meta_keywords, 
                      $categoryId
                    ];
                    
                   //To update and return a boolean
                    $update = UtilsAdminDB::updateSomethingByAdmin(
                      $database, 
                      $tableNameCategory, 
                      $columnUpdate, 
                      $closuresUpdate, 
                      $operators, 
                      $operatorsClosure, 
                      $logicOperators, 
                      $values
                    );
               
                   if ($update) { //Update successfull
                        if (file_exists($prefixeUploaded.$pathDirectory."/".$old_image)) { //Verify if the file exists
                            unlink($prefixeUploaded . $pathDirectory . "/" . $old_image); //Erase the file in file system of the server
                        }
                        $url = "../../../admin/edit-category.php?id=$categoryId";
                        $message = "Une Catégorie modifiée  avec succès";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url);
                    }else{
                        $url = "../../../admin/edit-category.php?id=$categoryId";
                        $message = "Erreur interne au serveur";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url); 
                    }
                }

            }else{ //If file is not submitting
                if($validateName != true || $validateSlug != true || $validateTitle != true){
                    $url = "../../../admin/edit-category.php?id=$categoryId";
                    $_SESSION["message_admin"] = "Une erreur est survénue (Le nom et/ou le slug et/ou le titre possède des caractères invalides (seules les lettres sont autorisées pour ses champs))";
                    header("Location: " . $url);
                }else{
                    //Setting the name of file
                    $image = $updateFileName;

                    //Values to update and to filter the row of table to update
                    $values = [
                      $name, 
                      $slug, 
                      $description, 
                      $status, 
                      $popular, 
                      $image, 
                      $meta_title, 
                      $meta_description, 
                      $meta_keywords, 
                      $categoryId
                    ];
                   
                   //To update and return a boolean
                    $update = UtilsAdminDB::updateSomethingByAdmin(
                      $database, 
                      $tableNameCategory, 
                      $columnUpdate,  
                      $closuresUpdate, 
                      $operators, 
                      $operatorsClosure , 
                      $logicOperators, 
                      $values
                    );

                   if ($update) { //Update successfull
                        $url = "../../../admin/edit-category.php?id=$categoryId";
                        $message = "Une Catégorie modifiée  avec succès";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url);
                    }else{
                        $url = "../../../admin/edit-category.php?id=$categoryId";
                        $message = "Erreur interne au serveur";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url); 
                    }
                }
            }
        }



    }else if(isset($_POST["delete_category"])){ //Delete Category Item 
        
        //Category Id
        $category_id = htmlentities(strip_tags($_POST['category_id']));
        
        //TableName
        $tableNameCategory = "categories";

        //Column to filter the row that to delete
        $closures = ["id"];
        
        //operators use to give an conditional expression to delete
        $operatorsClosure = ["="];

        //logic operator to delete query
        $logicOperators = [""];

        //array contains the value of conditional expression to delete
        $values = [$category_id];

        //Column Selected by SELECT query
        $columnSelect = ["*"];

        //Column to filter the row that to select
        $closuresSelect = ["id"];

        //operator use to give an conditional expression to select
        $operatorsClosureSelect = ["="];

        //logic operator to select query 
        $logicOperatorsSelect = [""];

        //array contains the value of conditional expression to select
        $valuesSelect = [$category_id];

        
        //Associative array contains the array of result of query select and the total number of rows of result of SELECT query
        $category = UtilsAdminDB::getResultWithCondition(
          $database, 
          $tableNameCategory, 
          $columnSelect, 
          $closuresSelect, 
          $operatorsClosureSelect, 
          $logicOperatorsSelect, 
          $valuesSelect
        );
        
        //Extracting the array of result
        $data = $category["result"][0];

        //Getting the image name
        $image = $data[6];

        //Prefix of upload path of file
        $prefixeUploaded = "../../../";

        //SubPath of upload file
        $pathDirectory = "img/admin/categories";

        //Delete is or not success
        if( UtilsAdminDB::deleteSomethingByAdmin(
              $database, 
              $tableNameCategory, 
              $closures,
              $operatorsClosure , 
              $logicOperators, 
              $values
            )
        ){
            if (file_exists($prefixeUploaded.$pathDirectory."/".$image)) { //Verify if the file exists
                unlink($prefixeUploaded . $pathDirectory . "/" . $image); //Erase the file in file system of the server
            }
            /*$url = "../../../admin/category.php";
            $message = "Une Catégorie supprimée avec succès";
            $_SESSION["message_admin"] = $message;
            header('Location: ' . $url);*/


            //If deleting is success, send to browser stream the integer 200 to manipulate by Ajax (running if the Javascript is run in the browser)
            echo 200;
        }else{
            /*$url = "../../../admin/category.php";
                $message = "Erreur interne au serveur";
                $_SESSION["message_admin"] = $message;
            header('Location: ' . $url); */

            //If deleting is not success, send to browser stream the integer 500 to manipulate by Ajax (running if the Javascript is run in the browser)
            echo 500;               
        }
    }

    //Admin Manipulate Product
    else if(isset($_POST["add_product"])){ //Form Validating and Submitting the value in the products table
         
        //Add a product
      
        //Initialize the input value
       $category_id = htmlentities(strip_tags($_POST['category_id'])); // category id linked to product
       $nameProduct = htmlentities(strip_tags($_POST['name'])); // Name of product
       $slugProduct = htmlentities(strip_tags($_POST['slug'])); // Slug of product
       $smallDescriptionProduct = htmlentities(strip_tags($_POST['small_description'])); // Small Description of product
       $descriptionProduct = htmlentities(strip_tags($_POST['description'])); // Description of product
       $originalPriceProduct = htmlentities(strip_tags($_POST['original_price'])); // Original Price of product
       $sellingPriceProduct = htmlentities(strip_tags($_POST['selling_price'])); // Selling Price of product
       $quantityProduct = htmlentities(strip_tags($_POST['qty'])); // Quantity of product
       $metaTitleProduct = htmlentities(strip_tags($_POST['meta_title'])); // Title of product
       $metaDescriptionProduct = htmlentities(strip_tags($_POST['meta_description'])); // Meta Description of product
       $metaKeywordProduct = htmlentities(strip_tags($_POST['meta_keywords'])); // Keywords of product
       $status = isset($_POST["status"]) ? '1' : '0' ; // Status of product
       $trending= isset($_POST["trending"]) ? '1' : '0' ; // Trending of product


       
       //Define the RegExp Validate Variable
       $regExpLetter = "/^[a-zA-Z\s]+$/"; //Letter
       $regExpDigit = "/^[0-9]+$/"; //Digit

       //Define validate select
       $validateSelect = is_numeric($category_id); 

      //Define the  Validate the value of input Not Empty
       $validateName = Utils::validateInputByRegex($regExpLetter, $nameProduct);
       $validateSlug = Utils::validateInputByRegex($regExpLetter, $slugProduct);
       $validateTitle = Utils::validateInputByRegex($regExpLetter, $metaTitleProduct);
       $validatePriceOriginal = Utils::validateInputByRegex($regExpDigit, $originalPriceProduct);
       $validatePriceSelling= Utils::validateInputByRegex($regExpDigit, $sellingPriceProduct);
       $validateQuantity = Utils::validateInputByRegex($regExpDigit, $quantityProduct);

        //Define the variable of $_FILES
        $keyName = ["image"];
        $keyN = "image";
        $typeFile = "image";
        $tmpDirectoryFile = $_FILES[$keyN]['tmp_name'];
        $nameFile = $_FILES[$keyN]['name'];

        
        //Array of accepted type (extension) of image file
        $typeAccepted =  [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG"];

         //Prefix of upload path of file
        $prefixeUploaded = "../../../";

        //SubPath of upload file
        $pathDirectory = "img/admin/produits";
        

        //Validate and Upload An Image
        $fileUploaded = Utils::validateUploadedMyFile(
            $typeAccepted,
            $pathDirectory,
            $prefixeUploaded,
            $tmpDirectoryFile,
            $nameFile
        );

        //Define the constant DataBase element

        //TableName 
        $tableNameProduct = "products";

        //Column to Insert
        $columnInsertProduct = [
            "category_id", 
            "name",                  
            "slug", 
            "small_description", 
            "description", 
            "original_price", 
            "selling_price", 
            "image", 
            "qty", 
            "status", 
            "trending", 
            "meta_title", 
            "meta_keywords", 
            "meta_description"
        ];

         
        if(
           $validateSelect == false || 
           empty($nameProduct) || 
           empty($slugProduct) ||
           empty($metaTitleProduct) || 
           empty($smallDescriptionProduct) || 
           empty($descriptionProduct) ||  
           empty($originalPriceProduct) || 
           empty($sellingPriceProduct) || 
           $fileUploaded["state"] ==null || 
           empty($quantityProduct) ||  
           empty($metaKeywordProduct) || 
           empty($metaDescriptionProduct)  
        ){ //Check if the field is submitted or select category or submit an image
            $url = "../../../admin/add-product.php";
            $_SESSION["message_admin"] = "Une erreur est survénue (Veuillez obligatoirement remplir les champs vides et/ou fournir une image et/ou selectionner une catégorie pour ce produit)";
            header("Location: " . $url); 
        }else{
            if(
                $validateName != true || 
                $validateSlug != true || 
                $validateTitle != true || 
                $validatePriceSelling != true || 
                $validatePriceOriginal != true || 
                $validateQuantity != true || 
                ($fileUploaded["state"] ==false && $fileUploaded["success"] == false) 
            ){ //Check if the validate field or select validate category or the extension of image submitted is valid
               
                $url = "../../../admin/add-product.php";
                $_SESSION["message_admin"] = "Une erreur est survénue (Le nom et/ou le slug et/ou le titre possède (nt) des caractères invalides (seules les lettres sont autorisées pour ses champs) et/ou Le prix de depart et/ou le prix de vente et/ou la quantité possède (nt) des caractères invalides (seuls les chiffres sont autorisés pour ses champs) et/ou le fichier que vous avez téléverser ne possède pas la bonne extension (les extensions autorisées sont .jpg, .JPG, .jpeg, .JPEG, .png, .PNG) )";
                header("Location: " . $url);
            }else{

                //Define the image name
                $image = $fileUploaded["nameFile"];

                //Define the array of values insert
                $valueInsertProduct = [
                 $category_id,
                 $nameProduct,
                 $slugProduct,
                 $smallDescriptionProduct,
                 $descriptionProduct,
                 $originalPriceProduct,
                 $sellingPriceProduct,
                 $image,
                 $quantityProduct,
                 $status, 
                 $trending,
                 $metaTitleProduct,
                 $metaKeywordProduct,
                 $metaDescriptionProduct            
                ];
               
                //Insert the value in table Categories
                $insertBoolResult = UtilsAdminDB::insertDataByAdmin($database, $tableNameProduct, $columnInsertProduct, $valueInsertProduct);
            
                if($insertBoolResult){ // If the value is insert
                    $url = "../../../admin/add-product.php";
                    $message = "Un Produit a été ajouté avec succès";
                    $_SESSION["message_admin"] = $message;
                    header('Location: ' . $url);
                }else{
                   $url = "../../../admin/add-product.php";
                   $message = "Erreur interne au serveur";
                   $_SESSION["message_admin"] = $message;
                   header('Location: ' . $url);                
                }
            }
       }

       //pathinfo($path, PATH)
       //pathinfo()
    }else if (isset($_POST["update_product"])) { //Form Validating and Submitting the value in the products table after the update
       
        //Update a product
       
        //Initialize the input value
       $nameProduct = htmlentities(strip_tags($_POST['name']));  // Name of product
       $slugProduct = htmlentities(strip_tags($_POST['slug'])); // Slug of product
       $smallDescriptionProduct = htmlentities(strip_tags($_POST['small_description'])); // Small Description of product
       $descriptionProduct = htmlentities(strip_tags($_POST['description'])); // Description of product
       $originalPriceProduct = htmlentities(strip_tags($_POST['original_price'])); // original price of product
       $sellingPriceProduct = htmlentities(strip_tags($_POST['selling_price'])); // selling price of product
       $quantityProduct = htmlentities(strip_tags($_POST['qty'])); // Quantity of product
       $metaTitleProduct = htmlentities(strip_tags($_POST['meta_title'])); // Title of product
       $metaDescriptionProduct = htmlentities(strip_tags($_POST['meta_description'])); // Meta Description of product
       $metaKeywordProduct = htmlentities(strip_tags($_POST['meta_keywords'])); // Meta Keyword of product
       $status = isset($_POST["status"]) ? '1' : '0' ; // Status of product
       $trending= isset($_POST["trending"]) ? '1' : '0' ; // Trending of product
       $product_id = $_POST['product_id']; // Id of product
       $old_image = $_POST["old_image"]; // Old Image of product

        //Define the RegExp Validate Variable
       $regExpLetter = "/^[a-zA-Z\s]+$/";
       $regExpDigit = "/^[0-9]+$/";

      //Define the  Validate the value of input Not Empty
       $validateName = Utils::validateInputByRegex($regExpLetter, $nameProduct);
       $validateSlug = Utils::validateInputByRegex($regExpLetter, $slugProduct);
       $validateTitle = Utils::validateInputByRegex($regExpLetter, $metaTitleProduct);
       $validatePriceOriginal = Utils::validateInputByRegex($regExpDigit, $originalPriceProduct);
       $validatePriceSelling= Utils::validateInputByRegex($regExpDigit, $sellingPriceProduct);
       $validateQuantity = Utils::validateInputByRegex($regExpDigit, $quantityProduct);

        //Define the variable of $_FILES
        $keyName = ["image"];
        $keyN = "image";
        $typeFile = "image";
        $tmpDirectoryFile = $_FILES[$keyN]['tmp_name'];
        $newNameFile = $_FILES[$keyN]['name'];

        
        //Array of accepted type (extension) of image file
        $typeAccepted =  [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG"];

        //Prefix of upload path of file
        $prefixeUploaded = "../../../";

        //SubPath of upload file
        $pathDirectory = "img/admin/produits";
        

        if($newNameFile != ""){ //If the new image is submitted
            
            //Setting the name of file
            $updateFileName = $newNameFile;

            //Validate and Upload An Image
            $fileUploaded = Utils::validateUploadedMyFile(
                $typeAccepted,
                $pathDirectory,
                $prefixeUploaded,
                $tmpDirectoryFile,
                $updateFileName
            );
        }else{ //If the new image is not submitted
            $updateFileName = $old_image;
            $fileUploaded = null;
        }


        //Category Id Value
        if(is_numeric($_POST['category_id'])){ //Check if the category is selected
            $category_id = htmlentities(strip_tags($_POST['category_id'])); // category id linked to product
        }else{
            $category_id = htmlentities(strip_tags($_POST['category_hidden_id'])); // category id linked to product
        }

        //Define the constant DataBase element

        //TableName Update
        $tableNameProduct = "products";

        //Array of column Update names
        $columnUpdateProduct = [
            "category_id", 
            "name",                  
            "slug", 
            "small_description", 
            "description", 
            "original_price", 
            "selling_price", 
            "image", 
            "qty", 
            "status", 
            "trending", 
            "meta_title", 
            "meta_keywords", 
            "meta_description"
        ];

        //Array contains the row to can permite Filter the row to  Update
        $closuresUpdate = ["id"];


        //Operators of Column Update
        $operators = ["=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "="];
        
        //Operators of Column Filter
        $operatorsClosure = ["="];

         //Operators Logic
        $logicOperators = [""];


        if( 
           empty($nameProduct) || 
           empty($slugProduct) ||
           empty($metaTitleProduct) || 
           empty($smallDescriptionProduct) || 
           empty($descriptionProduct) ||  
           empty($originalPriceProduct) || 
           empty($sellingPriceProduct) || 
           empty($quantityProduct) ||  
           empty($metaKeywordProduct) || 
           empty($metaDescriptionProduct)  
        ){  //If Is Empty
            $url = "../../../admin/edit-product.php?id=$product_id";
            $_SESSION["message_admin"] = "Une erreur est survénue (Veuillez obligatoirement remplir les champs vides)";
            header("Location: " . $url); 
        }else{ 
            if($updateFileName != $old_image){ // If the file is submitted
                if(
                  $validateName != true || 
                  $validateSlug != true || 
                  $validateTitle != true || 
                  $validatePriceSelling != true || 
                  $validatePriceOriginal != true || 
                  $validateQuantity != true || 
                  (
                    $fileUploaded["state"] ==false && 
                    $fileUploaded["success"] == false
                  )
                ){ //Validate the input and the file
                    $url = "../../../admin/edit-product.php?id=$product_id";
                    $_SESSION["message_admin"] = "Une erreur est survénue (Le nom et/ou le slug et/ou le titre possède (nt) des caractères invalides (seules les lettres sont autorisées pour ses champs) et/ou Le prix de depart et/ou le prix de vente et/ou la quantité possède (nt) des caractères invalides (seuls les chiffres sont autorisés pour ses champs) et/ou le fichier que vous avez téléverser ne possède pas la bonne extension (les extensions autorisées sont .jpg, .JPG, .jpeg, .JPEG, .png, .PNG) )";
                    //header("Location: " . $url);
                }else{

                    //Setting the name of file
                    $image = $fileUploaded["nameFile"];

                    //Values to update and to filter the row of table to update
                    $valueUpdateProduct = [
                     $category_id,
                     $nameProduct,
                     $slugProduct,
                     $smallDescriptionProduct,
                     $descriptionProduct,
                     $originalPriceProduct,
                     $sellingPriceProduct,
                     $image,
                     $quantityProduct,
                     $status, 
                     $trending,
                     $metaTitleProduct,
                     $metaKeywordProduct,
                     $metaDescriptionProduct,
                     $product_id
                    ];

                    //To update and return a boolean
                    $update = UtilsAdminDB::updateSomethingByAdmin(
                      $database, 
                      $tableNameProduct, 
                      $columnUpdateProduct, 
                      $closuresUpdate, 
                      $operators, 
                      $operatorsClosure, 
                      $logicOperators, 
                      $valueUpdateProduct
                    );
               
                    if ($update) { //Update successfull
                        if (file_exists($prefixeUploaded.$pathDirectory."/".$old_image)) { //Verify if the file exists
                            unlink($prefixeUploaded . $pathDirectory . "/" . $old_image);  //Erase the file in file system of the server
                        }
                        $url = "../../../admin/edit-product.php?id=$product_id";
                        $message = "Un produit a été modifiée  avec succès";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url);
                    }else{
                        $url = "../../../admin/edit-product.php?id=$product_id";
                        $message = "Erreur interne au serveur";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url); 
                    }
                }

            }else{ //If file is not submitting
                if(
                  $validateName != true || 
                  $validateSlug != true || 
                  $validateTitle != true || 
                  $validatePriceSelling != true || 
                  $validatePriceOriginal != true || 
                  $validateQuantity != true
                ){ //Validate the input 
                    $url = "../../../admin/edit-product.php?id=$product_id";
                    $_SESSION["message_admin"] = "Une erreur est survénue (Le nom et/ou le slug et/ou le titre possède (nt) des caractères invalides (seules les lettres sont autorisées pour ses champs) et/ou Le prix de depart et/ou le prix de vente et/ou la quantité possède (nt) des caractères invalides (seuls les chiffres sont autorisés pour ses champs) et/ou le fichier que vous avez téléverser ne possède pas la bonne extension (les extensions autorisées sont .jpg, .JPG, .jpeg, .JPEG, .png, .PNG))";
                    header("Location: " . $url);
                }else{
                  
                    //Setting the name of file
                    $image = $updateFileName;

                    //Values to update and to filter the row of table to update
                    $valueUpdateProduct = [
                     $category_id,
                     $nameProduct,
                     $slugProduct,
                     $smallDescriptionProduct,
                     $descriptionProduct,
                     $originalPriceProduct,
                     $sellingPriceProduct,
                     $image,
                     $quantityProduct,
                     $status, 
                     $trending,
                     $metaTitleProduct,
                     $metaKeywordProduct,
                     $metaDescriptionProduct,
                     $product_id
                    ];
                   
                    $update = UtilsAdminDB::updateSomethingByAdmin(
                      $database, 
                      $tableNameProduct, 
                      $columnUpdateProduct, 
                      $closuresUpdate, 
                      $operators, 
                      $operatorsClosure, 
                      $logicOperators, 
                      $valueUpdateProduct
                    );
                   if ($update) { //Update successfull
                        $url = "../../../admin/edit-product.php?id=$product_id";
                        $message = "Un produit a été modifiée  avec succès";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url);
                    }else{
                        $url = "../../../admin/edit-product.php?id=$product_id";
                        $message = "Erreur interne au serveur";
                        $_SESSION["message_admin"] = $message;
                        header('Location: ' . $url); 
                    }
                }
            }
       }        



    }else if(isset($_POST["delete_product_btn"])){ //Delete Product Item

        //Product Id
        $product_id = htmlentities(strip_tags($_POST['product_id']));

        //TableName
        $tableNameProduct = "products";

        //Column to filter the row that to delete
        $closures = ["id"];

        //operators use to give an conditional expression to delete
        $operatorsClosure = ["="];

        //logic operator to delete query
        $logicOperators = [""];
      
        //array contains the value of conditional expression to delete
        $values = [$product_id];

        //Column Selected by SELECT query
        $columnSelect = ["*"];

        //array contains the value of conditional expression to select
        $valuesSelect = [$product_id];

        //Column to filter the row that to select
        $closuresSelect = ["id"];

        //operator use to give an conditional expression to select
        $operatorsClosureSelect = ["="];

        //logic operator to select query 
        $logicOperatorsSelect = [""];
        
        //Associative array contains the array of result of query select and the total number of rows of result of SELECT query
        $products = UtilsAdminDB::getResultWithCondition(
          $database, 
          $tableNameProduct, 
          $columnSelect, 
          $closuresSelect, 
          $operatorsClosureSelect, 
          $logicOperatorsSelect, 
          $valuesSelect
        );

        //Extracting the array of result
        $data = $products["result"][0];

        //Getting the image name
        $image = $data[8];

        //Prefix of upload path of file
        $prefixeUploaded = "../../../";

        //SubPath of upload file
        $pathDirectory = "img/admin/produits";

        //Delete is or not success
        if( UtilsAdminDB::deleteSomethingByAdmin(
              $database, 
              $tableNameProduct, 
              $closures,
              $operatorsClosure , 
              $logicOperators, 
              $values
            )
        ){
            if (file_exists($prefixeUploaded.$pathDirectory."/".$image)) { //Verify if the file exists
                unlink($prefixeUploaded . $pathDirectory . "/" . $image); //Erase the file in file system of the server
            }
            /*$url = "../../../admin/products.php";
            $message = "Un produit a été supprimée avec succès";
            $_SESSION["message_admin"] = $message;
            header('Location: ' . $url);*/

            //If deleting is success, send to browser stream the integer 200 to manipulate by Ajax (running if the Javascript is run in the browser)
            echo 200;
        }else{
                /*$url = "../../../admin/products.php";
                $message = "Erreur interne au serveur";
                $_SESSION["message_admin"] = $message;
            header('Location: ' . $url); */

            //If deleting is not success, send to browser stream the integer 500 to manipulate by Ajax (running if the Javascript is run in the browser
            echo 500;                
        }
    }

    //Admin Update status order
    else if(isset($_POST["update_order_btn"])){ //Update status of orders of user
        
        //Tracking_no of order
        $_trackingNo = htmlentities(strip_tags($_POST['tracking_no']));

        //Order status
        $statusOrder = htmlentities(strip_tags($_POST['order_status']));

        //Define the constant DataBase element

        //TableName Orders
        $tableNameOrders = "orders";

        //Column to update
        $columnUpdateOrders = ["status"];

        //Column to filter the row what to update
        $closuresUpdate = ["tracking_no"];

        //Operator to update
        $operators = ["="];

        //Operator to filter the row what to update
        $operatorsClosure = ["="];

        //Logic Operator to filter the row what to update
        $logicOperators = [""];

        $valueUpdateOrders = [$statusOrder, $_trackingNo];

        //Processing to update
        $update = UtilsAdminDB::updateSomethingByAdmin(
            $database, 
            $tableNameOrders, 
            $columnUpdateOrders, 
            $closuresUpdate, 
            $operators, 
            $operatorsClosure, 
            $logicOperators, 
            $valueUpdateOrders
        );

        $message = "Le status de cette commande a été mise à jour avec succès";
        $_SESSION["message_admin"] = $message;
        $url = "../../../admin/view-order.php?t=$_trackingNo";
        header('Location: ' . $url);


    }

    
    else{ //If we try to access to this page without that  one less of all above conditions is true
        $url = "../../../index.php";
            
        header("Location: " . $url);
    }
} else {
    header('Location: ../../../error-config.php');
}


?>