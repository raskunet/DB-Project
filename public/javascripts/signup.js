const form = document.querySelector("form");
const pwdInput = document.querySelector("#user-pwd");
const cfmPwdInput = document.querySelector("#cfm-pwd");

const emailInput = document.querySelector("#mail");

const emailError = document.querySelector("#mail-input-err");
const passwordError = document.querySelector("#password-input-err");
const cfmpwdError = document.querySelector("#cfm-password-input-err");




// fetch("../header/Header.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("header").innerHTML = html;
//   });



emailInput.addEventListener("input", (event) => {
  if (emailInput.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
      showEmailError();
  }
});


cfmPwdInput.addEventListener("input", (event) => {
    if (cfmPwdInput.validity.valid) {
        cfmpwdError.textContent = "";
        cfmpwdError.classList = "error";
    } 
    else {
        showCfmPasswordError();
    }
});


pwdInput.addEventListener("input", (event) => {
  if (pwdInput.validity.valid) {
    passwordError.textContent = "";
    passwordError.classList = "error";
  } else {
    showPasswordError();
  }
});



form.addEventListener("submit", (event) => {
  if (!emailInput.validity.valid) {
    showEmailError();
    event.preventDefault();
  }
  if (!pwdInput.validity.valid) {
    showPasswordError(passwordError);
    event.preventDefault();
  } else {
    passwordError.textContent = "";
  }
  if (!cfmPwdInput.validity.valid) {
    showCfmPasswordError(cfmpwdError);
    event.preventDefault();
  } else {
    cfmpwdError.textContent = "";
  }
  if (pwdInput.validity.valid && cfmPwdInput.validity.valid) {
    let matchPassword = passwordMatch();
    if (!matchPassword) {
      event.preventDefault();
    }
  }
});


function passwordMatch() {
  let pwd1 = pwdInput.value;
  let pwd2 = cfmPwdInput.value;
  if (pwd1 !== pwd2) {
    cfmpwdError.textContent = "Password Doesn't Match";
    cfmpwdError.className = "error active";
    return false;
  }
  return true;
}


function showEmailError() {
  if (emailInput.validity.valueMissing) {
    emailError.textContent = "Email Required *";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Invalid Email *";
  }

  emailError.className = "error active";
}


function showPasswordError() {
  if (pwdInput.validity.valueMissing) {
    passwordError.textContent = "Password Required *";
  }
  passwordError.className = "error active";
}

function showCfmPasswordError() {
  if (cfmPwdInput.validity.valueMissing) {
    cfmpwdError.textContent = "Password Required *";
  }
  cfmpwdError.className = "error active";
}
