const form = document.querySelector("form");
const pwdInput = document.querySelector("#user-pwd");
const emailInput = document.querySelector("#mail");

const emailError = document.querySelector("#mail-input-err");
const passwordError = document.querySelector("#password-input-err");

emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showEmailError();
  }
});

pwdInput.addEventListener("input", () => {
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
});

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
