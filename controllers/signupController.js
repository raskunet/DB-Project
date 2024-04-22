

const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.signUpRender = asyncHandler(async function (req, res, next) {

    res.status(200).render('signUp')
})


exports.signUpUser = asyncHandler(async function (req, res, next) {
    sqlCon.then(async pool => {
        let result = await pool
            .request()
            .input('first_name', msSQL.NVarChar(20), req.body.first_name)
            .input('last_name', msSQL.NVarChar(25), req.body.last_name)
            .input('email', msSQL.NVarChar(25), req.body.email)
            .input('password',msSQL.NVarChar(25),req.body.password)
          .query(
              `INSERT INTO Users(firstName,lastName,emailAddress,userType,userPassword) values(@first_name,@last_name,@email,3,@password)`
        );

    })
    res.send('Hello from Post');

})



