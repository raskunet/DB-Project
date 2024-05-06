
const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.loginRender = asyncHandler(async function (req, res, next) {
  res.render("login", {
        pageTitle: "Login",
  });
});


exports.loginUser = asyncHandler(async function (req, res, next) {
  let userMail = req.body.email, userPassword = req.body.password;
  sqlCon.then(async (pool) => {
    try {
      let result = await pool
        .request()
        .input("userMail", msSQL.NVarChar(40), userMail)
        .input("userPwd",msSQL.NVarChar(30),userPassword)
        .query("SELECT * FROM Users WHERE emailAddress=@userMail AND userPassword=@userPwd");
      result = JSON.parse(JSON.stringify(result.recordset));
      req.session.regenerate(function () {
        req.session.userID = result[0].userID;
        req.session.success = "Authenticated user as " + result[0].userID;
        req.session.save(function (err){
          if (err) {
            console.log(err);
            return err;
          }
          setTimeout(() => {
            res.redirect("/");
          }, 2000);
        })
      })
    } catch (err) {
      console.log(err);
    }
  });
})
