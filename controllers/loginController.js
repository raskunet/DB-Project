const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.loginRender = asyncHandler(async function (req, res, next) {
  res.render("login", {
    pageTitle:'Login'
  });
});


exports.loginUser = asyncHandler(async function (req, res, next) {
  // This is for testing ONLY for NOW
  console.log(req.body);
    res.send('Hello from post function').setTimeout(1000, () => {
        res.redirect("/");
    })
})