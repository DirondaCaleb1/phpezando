//Form register Element
let formRegister = document.querySelector("#form-register");

if (formRegister !== null) {
  let errorElt = document.querySelector("#error");

  //Input Element
  let inputs = formRegister.querySelectorAll("input");
  let nameUserReg = inputs[0];
  let phoneUserReg = inputs[1];
  let emailUserReg = inputs[2];
  let pwdReg = inputs[3];
  let pwdConfirmReg = inputs[4];

  const errors = {
    nameUserRegError: "",
    phoneUserRegError: "",
    emailUserRegError: "",
    pwdUserRegError: "",
    pwdConfirmRegError: "",
  };

  const getErrors = (
    nameUserValue,
    phoneUserValue,
    emailUserValue,
    pwdUserValue,
    pwdConfirmValue
  ) => {
    let errors_msg = null;

    if (nameUserValue !== null) {
      if (nameUserValue === "") {
        errors.nameUserRegError = "Veuillez fournir un nom d'utilisateur";
        errors_msg = errors.nameUserRegError;
      } else {
        errors.nameUserRegError = "";
        errors_msg = errors.nameUserRegError;
      }
    }

    if (phoneUserValue !== null) {
      if (phoneUserValue === "") {
        errors.phoneUserRegError = "Veuillez fournir un numéro de téléphone";
        errors_msg = errors.phoneUserRegError;
      } else if (!/^[0-9]{6,30}$/i.test(phoneUserValue)) {
        errors.phoneUserRegError =
          "Votre numéro de téléphone ne doit comporter que des chiffres et ne comporter que 6 à 30 chiffres";
        errors_msg = errors.phoneUserRegError;
      } else {
        errors.phoneUserRegError = "";
        errors_msg = errors.phoneUserRegError;
      }
    }

    if (emailUserValue !== null) {
      if (emailUserValue === "") {
        errors.emailUserRegError = "Veuillez fournir une adresse email";
        errors_msg = errors.emailUserRegError;
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
          emailUserValue
        )
      ) {
        errors.emailUserRegError =
          "Adresse email invalide ou au format non valide(L'adresse Email doit comporter un arobase @)";
        errors_msg = errors.emailUserRegError;
      } else {
        errors.emailUserRegError = "";
        errors_msg = errors.emailUserRegError;
      }
    }

    if (pwdUserValue !== null) {
      if (pwdUserValue === "") {
        errors.pwdUserRegError = "Veuillez fournir un mot de passe";
        errors_msg = errors.pwdUserRegError;
      } else if (pwdUserValue.length < 10) {
        errors.pwdUserRegError =
          "Votre mot de passe doit comporter plus de 10 caractères";
        errors_msg = errors.pwdUserRegError;
      } else {
        errors.pwdUserRegError = "";
        errors_msg = errors.pwdUserRegError;
      }
    }
    if (pwdConfirmValue !== null) {
      if (pwdUserValue === null || pwdUserValue === "") {
        errors.pwdConfirmRegError =
          "Veuillez obligatoirement remplir le champ du mot de passe avant de remplir le champ de confirmation du mot de passe";
        errors_msg = errors.pwdConfirmRegError;
      } else {
        if (pwdConfirmValue === "") {
          errors.pwdConfirmRegError = "Veuillez retaper votre mot de passe";
          errors_msg = errors.pwdConfirmRegError;
        } else if (pwdConfirmValue !== pwdUserValue) {
          errors.pwdConfirmRegError = "Les mots de passes ne correspondent pas";
          errors_msg = errors.pwdConfirmRegError;
        } else {
          errors.pwdConfirmRegError = "";
          errors_msg = errors.pwdConfirmRegError;
        }
      }
    }

    return errors_msg;
  };

  const getAllErrors = (
    nameUserValue,
    phoneUserValue,
    emailUserValue,
    pwdUserValue,
    pwdConfirmValue
  ) => {
    let allErrors = null;

    if (
      nameUserValue === "" ||
      nameUserValue === null ||
      phoneUserValue === "" ||
      phoneUserValue === null ||
      emailUserValue === "" ||
      emailUserValue === null ||
      pwdUserValue === "" ||
      pwdUserValue === null ||
      pwdConfirmValue === "" ||
      pwdConfirmValue === null
    ) {
      allErrors = "Veuillez obligatoirement remplir les champs vides";
    } else {
      allErrors = getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      );
    }

    return allErrors;
  };

  const getPreviousErrors = (
    nameUserValue,
    phoneUserValue,
    emailUserValue,
    pwdUserValue,
    pwdConfirmValue
  ) => {
    let previousError = null;

    if (phoneUserValue !== null || phoneUserValue !== "") {
      if (nameUserValue === "" || nameUserValue === null) {
        errors.phoneUserRegError =
          "Veuillez obligatoirement remplir le champ nom (le champ qui le precède)";
        previousError = errors.phoneUserRegError;
      } else {
        previousError = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      previousError = getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      );
    }
    if (emailUserValue !== null || emailUserValue !== "") {
      if (
        nameUserValue === "" ||
        nameUserValue === null ||
        phoneUserValue === "" ||
        phoneUserValue === null
      ) {
        errors.emailUserRegError =
          "Veuillez obligatoirement remplir les champs nom et téléphone";
        previousError = errors.emailUserRegError;
      } else {
        previousError = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      previousError = getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      );
    }
    if (pwdUserValue !== null || pwdUserValue !== "") {
      if (
        nameUserValue === "" ||
        nameUserValue === null ||
        phoneUserValue === "" ||
        phoneUserValue === null ||
        emailUserValue === "" ||
        emailUserValue === null
      ) {
        errors.pwdUserRegError =
          "Veuillez obligatoirement remplir les champs nom et téléphone";
        previousError = errors.pwdUserRegError;
      } else {
        previousError = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      previousError = getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      );
    }
    if (emailUserValue !== null || emailUserValue !== "") {
      if (
        nameUserValue === "" ||
        nameUserValue === null ||
        phoneUserValue === "" ||
        phoneUserValue === null ||
        emailUserValue === "" ||
        emailUserValue === null ||
        pwdUserValue === "" ||
        pwdUserValue === null
      ) {
        errors.pwdConfirmRegError =
          "Veuillez obligatoirement remplir les champs nom, téléphone, email et mot de passe";
        previousError = errors.pwdConfirmRegError;
      } else {
        previousError = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      previousError = getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      );
    }

    return previousError;
  };
  //  Input Event Listener

  //  Event input Listener

  //  nameUserReg input event
  nameUserReg.addEventListener("input", () => {
    nameUserValue = nameUserReg.value;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = null;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  phoneUserReg input event
  phoneUserReg.addEventListener("input", () => {
    nameUserValue = null;
    phoneUserValue = phoneUserReg.value;
    emailUserValue = null;
    pwdUserValue = null;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  emailUserReg input event
  emailUserReg.addEventListener("input", () => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = emailUserReg.value;
    pwdUserValue = null;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //   pwdReg input event
  pwdReg.addEventListener("input", (e) => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  pwdConfirmReg input  event
  pwdConfirmReg.addEventListener("input", (e) => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = pwdConfirmReg.value;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  focus event listener

  //  phoneUserReg focus event
  phoneUserReg.addEventListener("focus", () => {
    nameUserValue = null;
    phoneUserValue = phoneUserReg.value;
    emailUserValue = null;
    pwdUserValue = null;
    pwdConfirmValue = null;
  });

  //  emailUserReg focus event
  emailUserReg.addEventListener("focus", () => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = emailUserReg.value;
    pwdUserValue = null;
    pwdConfirmValue = null;
  });

  //  pwdReg focus event
  pwdReg.addEventListener("focus", (e) => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = null;
  });

  //  pwdConfirmReg input  event
  pwdConfirmReg.addEventListener("focus", (e) => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = pwdConfirmReg.value;
  });

  //  blur event listener

  //  nameUserReg blur event
  nameUserReg.addEventListener("blur", () => {
    nameUserValue = nameUserReg.value;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = null;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  phoneUserReg blur event
  phoneUserReg.addEventListener("blur", () => {
    nameUserValue = null;
    phoneUserValue = phoneUserReg.value;
    emailUserValue = null;
    pwdUserValue = null;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  // emailUserReg blur event
  emailUserReg.addEventListener("blur", () => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = emailUserReg.value;
    pwdUserValue = null;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  pwdReg blur event
  pwdReg.addEventListener("blur", (e) => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = null;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  pwdConfirmReg blur event
  pwdConfirmReg.addEventListener("blur", (e) => {
    nameUserValue = null;
    phoneUserValue = null;
    emailUserValue = null;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = pwdConfirmReg.value;

    if (
      getErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });

  //  form validation
  formRegister.addEventListener("submit", (e) => {
    nameUserValue = nameUserReg.value;
    phoneUserValue = phoneUserReg.value;
    emailUserValue = emailUserReg.value;
    pwdUserValue = pwdReg.value;
    pwdConfirmValue = pwdConfirmReg.value;

    if (
      getAllErrors(
        nameUserValue,
        phoneUserValue,
        emailUserValue,
        pwdUserValue,
        pwdConfirmValue
      ) !== ""
    ) {
      e.preventDefault();
      errorElt.classList.add("showactive");
      if (errorElt !== null) {
        let para = errorElt.querySelectorAll("p");
        para[0].textContent = getErrors(
          nameUserValue,
          phoneUserValue,
          emailUserValue,
          pwdUserValue,
          pwdConfirmValue
        );
      }
    } else {
      errorElt.classList.remove("showactive");
    }
  });
}
