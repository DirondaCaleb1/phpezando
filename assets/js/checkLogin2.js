//Form Login Element
let formLogin = document.querySelector("#form-login");

if (formLogin !== null) {
  let errorEltLogin = document.querySelector("#error-login");
  let paraLogin = errorEltLogin.querySelectorAll("p");

  //Input Element
  let inputs = formLogin.querySelectorAll("input");
  let emailUserLog = inputs[0];
  let pwdLog = inputs[1];

  const errorsLog = {
    emailUserLogError: "",
    pwdUserLogError: "",
  };

  const getErrorsLog = (emailUserValue, pwdUserValue) => {
    let errors_msg = null;

    if (emailUserValue !== null) {
      if (emailUserValue === "") {
        errorsLog.emailUserLogError = "Veuillez fournir une adresse email";
        errors_msg = errorsLog.emailUserLogError;
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
          emailUserValue
        )
      ) {
        errorsLog.emailUserLogError =
          "Adresse email invalide ou au format non valide(L'adresse Email doit comporter un arobase @)";
        errors_msg = errorsLog.emailUserLogError;
      } else {
        errorsLog.emailUserLogError = "";
        errors_msg = errorsLog.emailUserLogError;
      }
    }

    if (pwdUserValue !== null) {
      if (pwdUserValue === "") {
        errorsLog.pwdUserLogError = "Veuillez fournir un mot de passe";
        errors_msg = errorsLog.pwdUserLogError;
      } else if (pwdUserValue.length < 10) {
        errorsLog.pwdUserLogError =
          "Votre mot de passe doit comporter plus de 10 caractères";
        errors_msg = errorsLog.pwdUserLogError;
      } else {
        errorsLog.pwdUserLogError = "";
        errors_msg = errorsLog.pwdUserLogError;
      }
    }

    return errors_msg;
  };

  const getAllErrorsLog = (emailUserValue, pwdUserValue) => {
    let allErrors = null;

    if (
      emailUserValue === "" ||
      emailUserValue === null ||
      pwdUserValue === "" ||
      pwdUserValue === null
    ) {
      allErrors = "Veuillez obligatoirement remplir les champs vides";
    } else {
      allErrors = getErrorsLog(emailUserValue, pwdUserValue);
    }

    return allErrors;
  };

  /* Input Event Listener */

  /* Event input Listener*/

  /* emailUserReg input event */
  emailUserLog.addEventListener("input", () => {
    emailUserValue = emailUserLog.value;
    pwdUserValue = null;

    if (getErrorsLog(emailUserValue, pwdUserValue) !== "") {
      errorEltLogin.classList.add("showactive");
      paraLogin[0].textContent = getErrorsLog(emailUserValue, pwdUserValue);
    } else {
      errorEltLogin.classList.remove("showactive");
    }
  });

  /*  pwdReg input event  */
  pwdLog.addEventListener("input", (e) => {
    emailUserValue = null;
    pwdUserValue = pwdLog.value;

    if (getErrorsLog(emailUserValue, pwdUserValue) !== "") {
      errorEltLogin.classList.add("showactive");
      paraLogin[0].textContent = getErrorsLog(emailUserValue, pwdUserValue);
    } else {
      errorEltLogin.classList.remove("showactive");
    }
  });

  /* blur event listener */

  /* emailUserReg blur event */
  emailUserLog.addEventListener("blur", () => {
    emailUserValue = emailUserLog.value;
    pwdUserValue = null;

    if (getErrorsLog(emailUserValue, pwdUserValue) !== "") {
      errorEltLogin.classList.add("showactive");
      paraLogin[0].textContent = getErrorsLog(emailUserValue, pwdUserValue);
    } else {
      errorEltLogin.classList.remove("showactive");
    }
  });

  /*  pwdReg blur event  */
  pwdLog.addEventListener("blur", (e) => {
    emailUserValue = null;
    pwdUserValue = pwdLog.value;

    if (getErrorsLog(emailUserValue, pwdUserValue) !== "") {
      errorEltLogin.classList.add("showactive");
      paraLogin[0].textContent = getErrorsLog(emailUserValue, pwdUserValue);
    } else {
      errorEltLogin.classList.remove("showactive");
    }
  });

  /* form validation */
  formLogin.addEventListener("submit", (e) => {
    emailUserValue = emailUserLog.value;
    pwdUserValue = pwdLog.value;

    if (getAllErrorsLog(emailUserValue, pwdUserValue) !== "") {
      e.preventDefault();
      errorEltLogin.classList.add("showactive");
      paraLogin[0].textContent = getAllErrorsLog(emailUserValue, pwdUserValue);
    } else {
      errorEltLogin.classList.remove("showactive");
    }
  });
}
