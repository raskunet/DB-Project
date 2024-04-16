const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.loginRender = asyncHandler(async function (req, res, next) {
  res.render("login");
});


exports.loginUser = asyncHandler(async function (req, res, next) {
    // This is for testing ONLY for NOW
    res.send('Hello from Post Function').setTimeout(1000, () => {
        res.redirect("/");
    })
})