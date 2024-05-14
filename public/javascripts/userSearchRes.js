

let passwordInput = document.getElementById("userPassword");
let cfmPwdInput = document.getElementById("cfm_password");
let showPassword = document.getElementById("show_password");
console.log(passwordInput);


showPassword.addEventListener("change", (e) => {
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        cfmPwdInput.type = "text";
    }
    else if (passwordInput.type == "text") {
        passwordInput.type = "password";
        cfmPwdInput.type = "password";
    }
})