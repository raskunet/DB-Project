

let passwordInput = document.getElementById("userPassword");
let showPassword = document.getElementById("show_password");
console.log(passwordInput);


showPassword.addEventListener("change", (e) => {
    console.log("Here in eventListner");
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
    }
    else if (passwordInput.type == "text") {
        passwordInput.type = "password";
    }
})