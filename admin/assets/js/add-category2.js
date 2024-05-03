//Set the global variable
//sidebar variable
let sideBar = document.querySelector("#sidenav-collapse-main");
//form variable
let formCategory = document.querySelector("#form_admin_addCategory");
let formEdit = document.querySelector("#form_admin_editCategory");

if (sideBar !== null) {
  let li = sideBar.querySelectorAll("li");

  li.forEach((elt) => {
    let a = elt.querySelectorAll("a");

    for (let i = 0; i < a.length; i++) {
      if (
        window.location.href ===
          "http://localhost/projetsPerso/ezando/admin/add-category.php" ||
        a[i].href ===
          "http://localhost/projetsPerso/ezando/admin/add-category.php#"
      ) {
        if (
          a[i].classList.contains("active") &&
          a[i].href !==
            "http://localhost/projetsPerso/ezando/admin/add-category.php#"
        ) {
          a[i].classList.remove("active");
          a[i].classList.remove("bg-gradient-primary");
          //a[i].classList.remove("bg-gradient-primary");
        } else {
          if (
            a[i].href ===
            "http://localhost/projetsPerso/ezando/admin/add-category.php#"
          ) {
            a[i].classList.add("active");
            a[i].classList.add("bg-gradient-primary");
          }
        }
      }

      if (
        window.location.href ===
          "http://localhost/projetsPerso/ezando/admin/category.php" ||
        a[i].href === "http://localhost/projetsPerso/ezando/admin/category.php#"
      ) {
        if (
          a[i].classList.contains("active") &&
          a[i].href !==
            "http://localhost/projetsPerso/ezando/admin/category.php#"
        ) {
          a[i].classList.remove("active");
          a[i].classList.remove("bg-gradient-primary");
          //a[i].classList.remove("bg-gradient-primary");
        } else {
          if (
            a[i].href ===
            "http://localhost/projetsPerso/ezando/admin/category.php#"
          ) {
            a[i].classList.add("active");
            a[i].classList.add("bg-gradient-primary");
          }
        }
      }

      a[i].addEventListener("click", () => {
        a[i].classList.add("active");
        a[i].classList.add("bg-gradient-primary");
      });
    }
  });
}

if (formCategory !== null && formEdit === null) {
  //Error Elements
  let errorElt = document.querySelector("#error-addCategory");
  let para = errorElt.querySelectorAll("p");

  //Inputs Elements
  let inputs = formCategory.querySelectorAll("input");
  let nameCategory = inputs[0];
  let slugCategory = inputs[1];
  let imageCategory = inputs[2];
  let meta_titleCategory = inputs[3];
  let statusCategory = inputs[4];
  let popularCategory = inputs[5];

  //TextAreas Elements
  let textareas = formCategory.querySelectorAll("textarea");
  let descriptionCategory = textareas[0];
  let meta_description = textareas[1];
  let meta_keywordCategory = textareas[2];

  //Functions to accept the image

  //Returning the TypeFile of image
  const typeFile = (image) => {
    return typeof image;
  };

  //Setting the accepting type (Boolean Function)
  const acceptType = (filename) => {
    const type = filename?.split(".");
    const userType = type[1];
    const arrayType = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG"];
    const arrayValue = arrayType.filter((elt) => elt === userType);
    if (arrayValue.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  //Object Array Errors
  const errors = {
    nameCategoryError: "",
    slugCategoryError: "",
    imageCategoryError: "",
    meta_titleCategoryError: "",
    statusCategoryError: "",
    popularCategoryError: "",
    descriptionCategoryError: "",
    meta_descriptionCategoryError: "",
    meta_keywordCategoryError: "",
  };

  //Set the errors functions of one Element
  const getErrors = (
    nameCategoryValue,
    slugCategoryValue,
    imageCategoryValue,
    meta_titleCategoryValue,
    statusCategoryValue,
    popularCategoryValue,
    descriptionCategoryValue,
    meta_descriptionCategoryValue,
    meta_keywordCategoryValue
  ) => {
    if (nameCategoryValue !== null) {
      if (nameCategoryValue === "") {
        errors.nameCategoryError =
          "Veuillez obligatoirement fournir un nom à cette catégorie";
      } else if (!/^[a-zA-Z\s]+$/i.test(nameCategoryValue)) {
        errors.nameCategoryError =
          "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres)";
      } else {
        errors.nameCategoryError = "";
      }
    }
    if (slugCategoryValue !== null) {
      if (slugCategoryValue === "") {
        errors.slugCategoryError =
          "Veuillez obligatoirement fournir un slug à cette catégorie";
      } else if (!/^[a-zA-Z\s]+$/i.test(slugCategoryValue)) {
        errors.slugCategoryError =
          "Le slug que vous avez fourni possède des caractères invalides (Le slug doit posséder que des lettres)";
        errors_msg = errors.slugCategoryError;
      } else {
        errors.slugCategoryError = "";
      }
    }

    if (imageCategoryValue !== null) {
      if (typeFile(imageCategoryValue) === "undefined") {
        errors.imageCategoryError =
          "Veuillez fournir une image pour cette catégorie";
        errors_msg = errors.imageCategoryError;
      } else {
        const filename = imageCategoryValue.name;
        const accept = acceptType(filename);
        if (accept !== true) {
          errors.imageCategoryError =
            "Veuillez fournir une image d'extension  .jpg ou .JPG ou .JPEG ou .jpeg ou .png ou .PNG";
        } else {
          errors.imageCategoryError = "";
        }
      }
    }

    if (meta_titleCategoryValue !== null) {
      if (meta_titleCategoryValue === "") {
        errors.meta_titleCategoryError =
          "Veuillez obligatoirement fournir un nom à cette catégorie";
      } else if (!/^[a-zA-Z\s]+$/i.test(meta_titleCategoryValue)) {
        errors.meta_titleCategoryError =
          "Le titre que vous avez fourni possède des caractères invalides (Le titre doit posséder que des lettres)";
      } else {
        errors.meta_titleCategoryError = "";
      }
    }

    if (meta_descriptionCategoryValue !== null) {
      if (meta_descriptionCategoryValue === "") {
        errors.meta_descriptionCategoryError =
          "Veuillez obligatoirement fournir une méta-description à cette catégorie";
      } else {
        errors.meta_descriptionCategoryError = "";
      }
    }

    if (meta_keywordCategoryValue !== null) {
      if (meta_keywordCategoryValue === "") {
        errors.meta_keywordCategoryError =
          "Veuillez obligatoirement fournir un mot clé ou plusieurs mots-clés à cette catégorie";
      } else {
        errors.meta_keywordCategoryError = "";
      }
    }

    return errors;
  };

  //  Input Event Listener

  //  Event input Listener

  //nameCategory input event
  nameCategory.addEventListener("input", (e) => {
    let nameCategoryValue = nameCategory.value;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (nameCategory.classList.contains("danger")) {
      nameCategory.classList.remove("danger");
    }

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).nameCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      // errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).nameCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //slugCategory input event
  slugCategory.addEventListener("input", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = slugCategory.value;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (slugCategory.classList.contains("danger")) {
      slugCategory.classList.remove("danger");
    }

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).slugCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      // errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).slugCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //meta_titleCategory input event
  meta_titleCategory.addEventListener("input", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = meta_titleCategory.value;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (meta_titleCategory.classList.contains("danger")) {
      meta_titleCategory.classList.remove("danger");
    }

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_titleCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      // errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_titleCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //meta_description input event
  meta_description.addEventListener("input", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = meta_description.value;
    let meta_keywordCategoryValue = null;

    if (meta_description.classList.contains("danger")) {
      meta_description.classList.remove("danger");
    }

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_descriptionCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_descriptionCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //meta_keywordCategory input event
  meta_keywordCategory.addEventListener("input", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = meta_keywordCategory.value;

    if (meta_keywordCategory.classList.contains("danger")) {
      meta_keywordCategory.classList.remove("danger");
    }

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_keywordCategoryError !== ""
    ) {
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_keywordCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  Event change Listener

  //imageCategory change Listener
  imageCategory.addEventListener("change", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = imageCategory.files[0];
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).imageCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      // errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).imageCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //Event Click Listener
  //imageCategory event
  imageCategory.addEventListener("click", (e) => {
    if (imageCategory.classList.contains("danger")) {
      imageCategory.classList.remove("danger");
    }
  });

  //  Event blur Listener

  //nameCategory blur event
  nameCategory.addEventListener("blur", (e) => {
    let nameCategoryValue = nameCategory.value;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).nameCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).nameCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //slugCategory blur event
  slugCategory.addEventListener("blur", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = slugCategory.value;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).slugCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).slugCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //meta_titleCategory blur event
  meta_titleCategory.addEventListener("blur", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = meta_titleCategory.value;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = null;

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_titleCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_titleCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //meta_description blur event
  meta_description.addEventListener("blur", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = meta_description.value;
    let meta_keywordCategoryValue = null;

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_descriptionCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_descriptionCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //meta_keywordCategory blur event
  meta_keywordCategory.addEventListener("blur", (e) => {
    let nameCategoryValue = null;
    let slugCategoryValue = null;
    let imageCategoryValue = null;
    let meta_titleCategoryValue = null;
    let statusCategoryValue = null;
    let popularCategoryValue = null;
    let descriptionCategoryValue = null;
    let meta_descriptionCategoryValue = null;
    let meta_keywordCategoryValue = meta_keywordCategory.value;

    if (
      getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_keywordCategoryError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).meta_keywordCategoryError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //Get All Errors after trying submitted
  const getAllErors = (
    nameCategoryValue,
    slugCategoryValue,
    imageCategoryValue,
    meta_titleCategoryValue,
    statusCategoryValue,
    popularCategoryValue,
    descriptionCategoryValue,
    meta_descriptionCategoryValue,
    meta_keywordCategoryValue
  ) => {
    if (
      nameCategoryValue === "" &&
      slugCategoryValue === "" &&
      typeFile(imageCategoryValue) === "undefined" &&
      meta_titleCategoryValue === "" &&
      meta_descriptionCategoryValue === "" &&
      meta_keywordCategoryValue === ""
    ) {
      return {
        message:
          "Vous devez obligatoirement fournir une image et veuillez remplir les champs vides",
        elements: [
          nameCategory,
          slugCategory,
          imageCategory,
          meta_titleCategory,
          meta_description,
          meta_keywordCategory,
        ],
      };
    } else {
      if (
        nameCategoryValue !== "" &&
        slugCategoryValue === "" &&
        typeFile(imageCategoryValue) === "undefined" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image  ",
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image  ",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image  ",
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_description,
              ],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image  ",
              elements: [slugCategory, imageCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        slugCategoryValue !== "" &&
        nameCategoryValue === "" &&
        typeFile(imageCategoryValue) === "undefined" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        typeFile(imageCategoryValue) !== "undefined" &&
        nameCategoryValue === "" &&
        slugCategoryValue === "" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        meta_titleCategoryValue !== "" &&
        typeFile(imageCategoryValue) === "undefined" &&
        nameCategoryValue === "" &&
        slugCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [nameCategory, slugCategory, imageCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        slugCategoryValue !== "" &&
        typeFile(imageCategoryValue) === "undefined" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [imageCategory, meta_titleCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [slugCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [imageCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        typeFile(imageCategoryValue) !== "undefined" &&
        slugCategoryValue === "" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                imageCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                imageCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                imageCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                imageCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                imageCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                imageCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [slugCategory, meta_titleCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [imageCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                imageCategory,
                slugCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [slugCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        meta_titleCategoryValue !== "" &&
        slugCategoryValue === "" &&
        typeFile(imageCategoryValue) === "undefined"
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et meta titre possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et meta titre possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [slugCategory, imageCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et meta titre possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [slugCategory, imageCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [nameCategory, slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [slugCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et meta titre possèdent des caractères invalides(ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [slugCategory, imageCategory],
            };
          }
        }
      }

      if (
        slugCategoryValue !== "" &&
        typeFile(imageCategoryValue) !== "undefined" &&
        nameCategoryValue === "" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                nameCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                nameCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [nameCategory, meta_titleCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides(ce champs ne doit posséder que des lettres) et l'image que vous avez fourni possède une extion invalide (l'extension de l'image doit être le .jpg ou le .JPG ou le .jpeg ou le .JPEG ou le .png ou le .PNG)",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [nameCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        slugCategoryValue !== "" &&
        meta_titleCategoryValue !== "" &&
        nameCategoryValue === "" &&
        typeFile(imageCategoryValue) === "undefined"
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et meta titre possèdent des caractères invalides (ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
                meta_titleCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et meta titre possèdent des caractères invalides (ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [nameCategory, imageCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                imageCategory,
                meta_description,
                meta_titleCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et meta titre possèdent des caractères invalides (ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,
              elements: [nameCategory, slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et meta titre possèdent des caractères invalides (ces champs ne doivent posséder que des lettres)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                imageCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir les champs vides et fournir une image",
              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          }
        }
      }

      if (
        typeFile(imageCategoryValue) !== "undefined" &&
        meta_titleCategoryValue !== "" &&
        nameCategoryValue === "" &&
        slugCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_description,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "L'image que vous avez fourni porte une extension non valide(L'extension doit être .jpeg ou .JPEG ou .jpg ou .JPG ou .png ou .PNG) et le champ meta titre possède des caracctères invalides (seules les lettres sont autorisé pour ce champ) ",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [
                nameCategory,
                slugCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "L'image que vous avez fourni porte une extension non valide(L'extension doit être .jpeg ou .JPEG ou .jpg ou .JPG ou .png ou .PNG) et le champ meta titre possède des caracctères invalides (seules les lettres sont autorisé pour ce champ) ",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [nameCategory, slugCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_description,
                meta_titleCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "L'image que vous avez fourni porte une extension non valide(L'extension doit être .jpeg ou .JPEG ou .jpg ou .JPG ou .png ou .PNG) et le champ meta titre possède des caracctères invalides (seules les lettres sont autorisé pour ce champ) ",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [nameCategory, slugCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "L'image que vous avez fourni porte une extension non valide(L'extension doit être .jpeg ou .JPEG ou .jpg ou .JPG ou .png ou .PNG) et le champ meta titre possède des caracctères invalides (seules les lettres sont autorisé pour ce champ) ",
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              elements: [nameCategory, slugCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        slugCategoryValue !== "" &&
        typeFile(imageCategoryValue) !== "undefined" &&
        meta_titleCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [
                nameCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              elements: [
                nameCategory,
                meta_titleCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug  possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [
                nameCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              elements: [
                nameCategory,
                meta_titleCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug  possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [meta_titleCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [imageCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              elements: [
                nameCategory,
                meta_titleCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug  possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [meta_titleCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              elements: [nameCategory, meta_titleCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug  possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [slugCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [meta_titleCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        slugCategoryValue !== "" &&
        meta_titleCategoryValue !== "" &&
        typeFile(imageCategoryValue) === "undefined"
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [
                nameCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                meta_titleCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom,slug et meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir  les champs vides et/ou fournir une image",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [imageCategory, meta_description, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                meta_titleCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom,slug et meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir  les champs vides et/ou fournir une image",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [imageCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [imageCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                meta_titleCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom,slug et meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement remplir  les champs vides et/ou fournir une image",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [imageCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [nameCategory, meta_titleCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom,slug et meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message:
                "Veuillez obligatoirement  fournir une image pour cette catégorie",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [imageCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        typeFile(imageCategoryValue) !== "undefined" &&
        meta_titleCategoryValue !== "" &&
        slugCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [
                nameCategory,
                meta_description,
                slugCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                meta_titleCategory,
                slugCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [slugCategory, meta_description, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [nameCategory, slugCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [slugCategory, imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                meta_titleCategory,
                slugCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [slugCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [nameCategory, meta_description, slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [slugCategory, imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [
                meta_titleCategory,
                slugCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [slugCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,
              elements: [nameCategory, slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,
              elements: [meta_titleCategory, slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ nom  possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [nameCategory, slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [slugCategory],
            };
          }
        }
      }

      if (
        slugCategoryValue !== "" &&
        typeFile(imageCategoryValue) !== "undefined" &&
        meta_titleCategoryValue !== "" &&
        nameCategoryValue === ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [
                nameCategory,
                meta_description,
                slugCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [
                nameCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [
                meta_titleCategory,
                nameCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ titre possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [nameCategory, meta_description, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [nameCategory, slugCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [nameCategory, imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [
                meta_titleCategory,
                nameCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ titre possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [nameCategory, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [nameCategory, meta_description, slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [nameCategory, imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [meta_titleCategory, nameCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ titre possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",
              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [nameCategory, meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [nameCategory, slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [nameCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [meta_titleCategory, nameCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champ slug possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",

              elements: [nameCategory, slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées)",
              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ titre possède des caractères invalides (seules les lettres sont autorisées) et l'image que vous avez fourni possède une extension non valide (extension valide .jpg, .JPG, .png, .PNG, jpeg, .JPEG)",
              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, meta titre possèdent des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG) ",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [nameCategory],
            };
          }
        }
      }

      if (
        nameCategoryValue !== "" &&
        slugCategoryValue !== "" &&
        typeFile(imageCategoryValue) !== "undefined" &&
        meta_titleCategoryValue !== ""
      ) {
        if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, meta_description, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, meta_description, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [imageCategory, meta_description, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs nom  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs slug  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ  titre possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs  nom, slug possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [meta_description, meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue !== "" &&
          meta_keywordCategoryValue === ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [meta_titleCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, slugCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs nom  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [nameCategory, imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs slug  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [slugCategory, imageCategory, meta_keywordCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ  titre possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs  nom, slug possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_keywordCategory,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [meta_keywordCategory],
            };
          }
        } else if (
          meta_descriptionCategoryValue === "" &&
          meta_keywordCategoryValue !== ""
        ) {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, slugCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs nom  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [nameCategory, imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs slug  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [slugCategory, imageCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [slugCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ  titre possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [imageCategory, meta_titleCategory, meta_description],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs  nom, slug possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [
                nameCategory,
                slugCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
                meta_description,
              ],
            };
          } else {
            return {
              message: "Veuillez obligatoirement remplir les champs vides",
              //Le cham nom possède des caractères invalides (seules les lettres sont autorisées) et l'image a une extension invalide (extensions autorisées .jpg .JPG, .jpeg, .JPEG, .png, .PNG)
              elements: [meta_description],
            };
          }
        } else {
          if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).nameCategoryError,

              elements: [nameCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).slugCategoryError,

              elements: [slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).imageCategoryError,

              elements: [imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message: getErrors(
                nameCategoryValue,
                slugCategoryValue,
                imageCategoryValue,
                meta_titleCategoryValue,
                statusCategoryValue,
                popularCategoryValue,
                descriptionCategoryValue,
                meta_descriptionCategoryValue,
                meta_keywordCategoryValue
              ).meta_titleCategoryError,

              elements: [meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs nom et slug possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, slugCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs nom  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [nameCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs nom et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Le champs slug  possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug et titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Le champ  titre possède des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError === ""
          ) {
            return {
              message:
                "Les champs  nom, slug possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [nameCategory, slugCategory, imageCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées)",

              elements: [nameCategory, slugCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [nameCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError === "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [slugCategory, imageCategory, meta_titleCategory],
            };
          } else if (
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).nameCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).slugCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).imageCategoryError !== "" &&
            getErrors(
              nameCategoryValue,
              slugCategoryValue,
              imageCategoryValue,
              meta_titleCategoryValue,
              statusCategoryValue,
              popularCategoryValue,
              descriptionCategoryValue,
              meta_descriptionCategoryValue,
              meta_keywordCategoryValue
            ).meta_titleCategoryError !== ""
          ) {
            return {
              message:
                "Les champs  nom, slug, titre possèdent des caractères invalides (seules les lettres sont autorisées) et le fichier doit être une image dont l'extension est le .jpeg ou le .JPEG ou le .png ou le .PNG ou le .jpg ou le JPG",

              elements: [
                nameCategory,
                slugCategory,
                imageCategory,
                meta_titleCategory,
              ],
            };
          } else {
            return {
              message: "",
              elements: [],
            };
          }
        }
      }
    }
  };

  formCategory.addEventListener("submit", (e) => {
    let nameCategoryValue = nameCategory.value;
    let slugCategoryValue = slugCategory.value;
    let imageCategoryValue = imageCategory.files[0];
    let meta_titleCategoryValue = meta_titleCategory.value;
    let statusCategoryValue = statusCategory.checked;
    let popularCategoryValue = popularCategory.checked;
    let descriptionCategoryValue = descriptionCategory.value;
    let meta_descriptionCategoryValue = meta_description.value;
    let meta_keywordCategoryValue = meta_keywordCategory.value;

    if (
      getAllErors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).message !== ""
    ) {
      e.preventDefault();
      errorElt.classList.add("showactive");
      para[0].textContent = getAllErors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).message;

      let my_elts = getAllErors(
        nameCategoryValue,
        slugCategoryValue,
        imageCategoryValue,
        meta_titleCategoryValue,
        statusCategoryValue,
        popularCategoryValue,
        descriptionCategoryValue,
        meta_descriptionCategoryValue,
        meta_keywordCategoryValue
      ).elements;

      my_elts.forEach((elt) => {
        elt.classList.add("danger");
      });
    }
  });
}
