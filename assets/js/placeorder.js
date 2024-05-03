let formRegisterAb = document.querySelector("#form-register");
let formLoginAb = document.querySelector("#form-login");

let formCheckout = document.querySelector("#form-checkout");

if (formLoginAb === null && formRegisterAb === null && formCheckout !== null) {
  //Inputs
  let inputs = formCheckout.querySelectorAll("input");

  //Global variable
  let nameUserOrder = inputs[0];
  let emailUserOrder = inputs[1];
  let phoneUserOrder = inputs[2];
  let codePinUserOrder = inputs[3];
  let addressUserOrder = formCheckout.querySelector("textarea");

  //Error Elements
  //a-zA-Z\s
  let errorElt = document.querySelector("#error-checkout");
  let para = errorElt.querySelectorAll("p");

  //Object Array Errors
  const errors = {
    nameUserOrderError: "",
    emailUserOrderError: "",
    phoneUserOrderError: "",
    codePinUserOrderError: "",
    addressUserOrderError: "",
  };

  //Set the errors functions of one Element
  const getErrors = (
    nameUserOrderValue,
    emailUserOrderValue,
    phoneUserOrderValue,
    codePinUserOrderValue,
    addressUserOrderValue
  ) => {
    if (nameUserOrderValue !== null) {
      if (nameUserOrderValue === "") {
        errors.nameUserOrderError =
          "Veuillez obligatoirement fournir votre nom";
      } else if (!/^[a-zA-Z\s]+$/i.test(nameUserOrderValue)) {
        errors.nameUserOrderError =
          "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots)";
      } else {
        errors.nameUserOrderError = "";
      }
    }

    if (emailUserOrderValue !== null) {
      if (emailUserOrderValue === "") {
        errors.emailUserOrderError =
          "Veuillez obligatoirement fournir une adresse email";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
          emailUserOrderValue
        )
      ) {
        errors.emailUserOrderError =
          "L'email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple)";
      } else {
        errors.emailUserOrderError = "";
      }
    }

    if (phoneUserOrderValue !== null) {
      if (phoneUserOrderValue === "") {
        errors.phoneUserOrderError =
          "Veuillez obligatoirement fournir votre numero de téléphone";
      } else if (!/^[0-9]{6,30}$/i.test(phoneUserOrderValue)) {
        errors.phoneUserOrderError =
          "Le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)";
      } else {
        errors.phoneUserOrderError = "";
      }
    }

    if (codePinUserOrderValue !== null) {
      if (codePinUserOrderValue === "") {
        errors.codePinUserOrderError =
          "Veuillez obligatoirement fournir votre code PIN";
      } else if (!/^[0-9]{4,8}$/i.test(codePinUserOrderValue)) {
        errors.codePinUserOrderError =
          "Le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)";
      } else {
        errors.codePinUserOrderError = "";
      }
    }

    if (addressUserOrderValue !== null) {
      if (addressUserOrderValue === "") {
        errors.addressUserOrderError =
          "Veuillez obligatoirement fournir une adresse";
      } else {
        errors.addressUserOrderError = "";
      }
    }

    return errors;
  };

  //Event Listener Elements
  //

  //Input Event

  //nameUserOrder input event

  nameUserOrder.addEventListener("input", (e) => {
    let nameUserOrderValue = nameUserOrder.value;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = null;

    if (nameUserOrder.classList.contains("danger")) {
      nameUserOrder.classList.remove("danger");
    }

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).nameUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).nameUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //emailUserOrder input event

  emailUserOrder.addEventListener("input", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = emailUserOrder.value;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = null;

    if (emailUserOrder.classList.contains("danger")) {
      emailUserOrder.classList.remove("danger");
    }

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).emailUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).emailUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //phoneUserOrder input event

  phoneUserOrder.addEventListener("input", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = phoneUserOrder.value;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = null;

    if (phoneUserOrder.classList.contains("danger")) {
      phoneUserOrder.classList.remove("danger");
    }

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).phoneUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).phoneUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //codePinUserOrder input event

  codePinUserOrder.addEventListener("input", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = codePinUserOrder.value;
    let addressUserOrderValue = null;

    if (codePinUserOrder.classList.contains("danger")) {
      codePinUserOrder.classList.remove("danger");
    }

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).codePinUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).codePinUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //addressUserOrder input event

  addressUserOrder.addEventListener("input", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = addressUserOrder.value;

    if (addressUserOrder.classList.contains("danger")) {
      addressUserOrder.classList.remove("danger");
    }

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).addressUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).addressUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  // Event blur Listener

  //nameUserOrder blur event

  nameUserOrder.addEventListener("blur", (e) => {
    let nameUserOrderValue = nameUserOrder.value;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = null;

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).nameUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).nameUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //emailUserOrder blur event

  emailUserOrder.addEventListener("blur", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = emailUserOrder.value;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = null;

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).emailUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).emailUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //phoneUserOrder blur event

  phoneUserOrder.addEventListener("blur", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = phoneUserOrder.value;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = null;

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).phoneUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).phoneUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //codePinUserOrder blur event

  codePinUserOrder.addEventListener("blur", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = codePinUserOrder.value;
    let addressUserOrderValue = null;

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).codePinUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).codePinUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //addressUserOrder blur event

  addressUserOrder.addEventListener("blur", (e) => {
    let nameUserOrderValue = null;
    let emailUserOrderValue = null;
    let phoneUserOrderValue = null;
    let codePinUserOrderValue = null;
    let addressUserOrderValue = addressUserOrder.value;

    if (
      getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).addressUserOrderError !== ""
    ) {
      errorElt.classList.add("showactive");
      para[0].textContent = getErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).addressUserOrderError;
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  const getAllErrorsHandled = (
    nameUserOrderValue,
    emailUserOrderValue,
    phoneUserOrderValue,
    codePinUserOrderValue,
    addressUserOrderValue
  ) => {
    if (
      nameUserOrderValue === "" &&
      emailUserOrderValue === "" &&
      phoneUserOrderValue === "" &&
      codePinUserOrderValue === "" &&
      addressUserOrderValue === ""
    ) {
      return {
        message: "Vous devez obligatoirement remplir les champs vides",
        elements: [
          nameUserOrder,
          emailUserOrder,
          phoneUserOrder,
          codePinUserOrder,
          addressUserOrder,
        ],
      };
    } else {
      if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).nameUserOrderError,
            elements: [nameUserOrder, addressUserOrder],
          };
        } else {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).nameUserOrderError,
            elements: [nameUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).emailUserOrderError,
            elements: [emailUserOrder, addressUserOrder],
          };
        } else {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).emailUserOrderError,
            elements: [emailUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).phoneUserOrderError,
            elements: [phoneUserOrder, addressUserOrder],
          };
        } else {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).phoneUserOrderError,
            elements: [phoneUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).codePinUserOrderError,
            elements: [codePinUserOrder, addressUserOrder],
          };
        } else {
          return {
            message: getErrors(
              nameUserOrderValue,
              emailUserOrderValue,
              phoneUserOrderValue,
              codePinUserOrderValue,
              addressUserOrderValue
            ).codePinUserOrderError,
            elements: [codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple)",
            elements: [nameUserOrder, emailUserOrder, addressUserOrder],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple)",
            elements: [nameUserOrder, emailUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)",
            elements: [nameUserOrder, phoneUserOrder, addressUserOrder],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)",
            elements: [nameUserOrder, phoneUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        let array = [];

        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [nameUserOrder, codePinUserOrder, addressUserOrder],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [nameUserOrder, codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "L'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)",
            elements: [emailUserOrder, phoneUserOrder, addressUserOrder],
          };
        } else {
          return {
            message:
              "L'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)",
            elements: [emailUserOrder, phoneUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "L'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [emailUserOrder, codePinUserOrder, addressUserOrder],
          };
        } else {
          return {
            message:
              "L'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [emailUserOrder, codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [phoneUserOrder, codePinUserOrder, addressUserOrder],
          };
        } else {
          return {
            message:
              "Le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [phoneUserOrder, codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError === ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) ,l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)",
            elements: [
              nameUserOrder,
              emailUserOrder,
              phoneUserOrder,
              addressUserOrder,
            ],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) ,l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères)",
            elements: [nameUserOrder, emailUserOrder, phoneUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) ,l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [
              nameUserOrder,
              emailUserOrder,
              codePinUserOrder,
              addressUserOrder,
            ],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots) ,l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [nameUserOrder, emailUserOrder, codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots),le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [
              nameUserOrder,
              phoneUserOrder,
              codePinUserOrder,
              addressUserOrder,
            ],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots), le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [nameUserOrder, phoneUserOrder, codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError === "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "L'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple), le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [
              emailUserOrder,
              phoneUserOrder,
              codePinUserOrder,
              addressUserOrder,
            ],
          };
        } else {
          return {
            message:
              "L'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple), le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [emailUserOrder, phoneUserOrder, codePinUserOrder],
          };
        }
      } else if (
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).nameUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).emailUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).phoneUserOrderError !== "" &&
        getErrors(
          nameUserOrderValue,
          emailUserOrderValue,
          phoneUserOrderValue,
          codePinUserOrderValue,
          addressUserOrderValue
        ).codePinUserOrderError !== ""
      ) {
        if (addressUserOrderValue === "") {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots),l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple), le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [
              nameUserOrder,
              emailUserOrder,
              phoneUserOrder,
              codePinUserOrder,
              addressUserOrder,
            ],
          };
        } else {
          return {
            message:
              "Le nom que vous avez fourni possède des caractères invalides (Le nom doit posséder que des lettres non accentuées et au moins un espace entre deux mots),l'adresse email que vous avez fourni est dans un format invalide ou incorrect (Une adresse email doit toujours comporter un arobase(@) et est de la forme example@examp.com par exemple), le numéro de telephone que vous avez fourni possède des caractères invalides (Le numéro de telephone doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 6 et 30 caractères) et le code PIN que vous avez fourni possède des caractères invalides (Le code PIN doit posséder que des chiffres et dont le nombre total des caractères (chiffres) varie absolument entre 4 et 6 caractères)",
            elements: [
              nameUserOrder,
              emailUserOrder,
              phoneUserOrder,
              codePinUserOrder,
            ],
          };
        }
      } else {
        if (addressUserOrderValue === "") {
          return {
            message: "",
            elements: [addressUserOrder],
          };
        } else {
          return {
            message: "",
            elements: [],
          };
        }
      }
    }
  };

  const getAllErrors = (
    nameUserOrderValue,
    emailUserOrderValue,
    phoneUserOrderValue,
    codePinUserOrderValue,
    addressUserOrderValue
  ) => {
    let elements = getAllErrorsHandled(
      nameUserOrderValue,
      emailUserOrderValue,
      phoneUserOrderValue,
      codePinUserOrderValue,
      addressUserOrderValue
    ).elements;

    let messageError = getAllErrorsHandled(
      nameUserOrderValue,
      emailUserOrderValue,
      phoneUserOrderValue,
      codePinUserOrderValue,
      addressUserOrderValue
    ).message;

    let message = "";

    if (
      elements.includes(addressUserOrder) &&
      elements.length > 1 &&
      (nameUserOrderValue !== "" ||
        emailUserOrderValue !== "" ||
        phoneUserOrderValue !== "" ||
        codePinUserOrderValue !== "") &&
      messageError !== ""
    ) {
      message =
        messageError +
        " et veuillez obligatoirement remplir les champs qui sont vides";
    } else if (
      elements.includes(addressUserOrder) &&
      elements.length === 1 &&
      messageError === ""
    ) {
      message = "Vous devez obligatoirement remplir les champs vides";
    } else if (
      !elements.includes(addressUserOrder) &&
      elements.length === 0 &&
      messageError === ""
    ) {
      message = "";
    } else {
      message = messageError;
    }

    return {
      elements: elements,
      message: message,
    };
  };

  formCheckout.addEventListener("submit", (e) => {
    nameUserOrderValue = nameUserOrder.value;
    emailUserOrderValue = emailUserOrder.value;
    phoneUserOrderValue = phoneUserOrder.value;
    codePinUserOrderValue = codePinUserOrder.value;
    addressUserOrderValue = addressUserOrder.value;

    if (
      getAllErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).message !== ""
    ) {
      e.preventDefault();
      errorElt.classList.add("showactive");
      para[0].textContent = getAllErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).message;

      let my_elts = getAllErrors(
        nameUserOrderValue,
        emailUserOrderValue,
        phoneUserOrderValue,
        codePinUserOrderValue,
        addressUserOrderValue
      ).elements;

      my_elts.forEach((elt) => {
        elt.classList.add("danger");
      });
    }
  });
}
