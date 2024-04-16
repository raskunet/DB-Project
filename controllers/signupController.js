

const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.signUpRender = asyncHandler(async function (req, res, next) {
    // res.send("Hello Sign Up Page");
    // res.contentType("image/png");
    // res.setHeader("Content-Disposition",'inline;');
    // res.set("Content-Type", "text/html");
    res.status(200).render('signUp')
})

//
//`INSERT INTO Users (UserID,FirstName,LastName,EmailAddress,Password)
                // VALUES
                // (4,${req.body.first_name},${req.body.last_name},${req.body.last_name},${req.body.email},${req.body.password})`

exports.signUpUser = asyncHandler(async function (req, res, next) {
    console.log(req.body.email);
    sqlCon.then(async pool => {
        let result = await pool
            .request()
            .input('first_name', msSQL.NVarChar(20), req.body.first_name)
            .input('last_name', msSQL.NVarChar(25), req.body.last_name)
            .input('email', msSQL.NVarChar(25), req.body.email)
            .input('password',msSQL.NVarChar(25),req.body.password)
          .query(
              `INSERT INTO Users(UserID,FirstName,LastName,EmailAddress,Password) values(7,@first_name,@last_name,@email,@password)`
        );

    })
    res.send('Hello from Post');
    // sqlCon.then(async pool => {
    //     let queryResult = pool.request()
    //         .query(`INSERT INTO USERS VALUES(4,${req.params.first_name})`)
    // })
})



