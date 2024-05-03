let formRescue = document.querySelector("#form-rescue");

if (formRescue !== null) {
  let emailVerif = formRescue.querySelector("input");

  let emailVerifValue = emailVerif.value;

  let errorEltVerif = document.querySelector("#error-verif");
  let paraVerif = errorEltVerif.querySelectorAll("p");

  let errors = {
    emailError: "",
  };

  const getErrors = (emailVerifValue) => {
    if (emailVerifValue === "") {
      errors.emailError = "Veuillez fournir une adresse email";
      errors_msg = errors.emailError;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(emailVerifValue)
    ) {
      errors.emailError =
        "Adresse email invalide ou au format non valide(L'adresse Email doit comporter un arobase @)";
      errors_msg = errors.emailError;
    } else {
      errors.emailError = "";
      errors_msg = errors.emailError;
    }

    return errors;
  };

  //Event click listener

  /* emailUserReg input event */
  emailVerif.addEventListener("input", () => {
    emailVerifValue = emailVerif.value;

    if (getErrors(emailVerifValue).emailError !== "") {
      errorEltVerif.classList.add("showactive");
      paraVerif[0].textContent = getErrors(emailVerifValue).emailError;
    } else {
      errorEltVerif.classList.remove("showactive");
    }
  });

  /* blur event listener */

  /* emailUserReg blur event */
  emailVerif.addEventListener("blur", () => {
    emailVerifValue = emailVerif.value;

    if (getErrors(emailVerifValue).emailError !== "") {
      errorEltVerif.classList.add("showactive");
      paraVerif[0].textContent = getErrors(emailVerifValue).emailError;
    } else {
      errorEltVerif.classList.remove("showactive");
    }
  });

  /* form validation */
  formRescue.addEventListener("submit", (e) => {
    emailVerifValue = emailVerif.value;

    if (getErrors(emailVerifValue).emailError !== "") {
      e.preventDefault();
      errorEltVerif.classList.add("showactive");
      paraVerif[0].textContent = getErrors(emailVerifValue).emailError;
    } else {
      errorEltVerif.classList.remove("showactive");
    }
  });
}
