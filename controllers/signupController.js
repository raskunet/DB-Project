

const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.signUpRender = asyncHandler(async function (req, res, next) {
    res.render('signUp', {
        pageTitle: "Signup",
        user: req.user,
    })
})


exports.signUpUser = asyncHandler(async function (req, res, next) {
    sqlCon.then(async pool => {
        // Check if the email already exists
        const checkEmailResult = await pool
            .request()
            .input('email', msSQL.NVarChar(25), req.body.email)
            .query(
                `SELECT COUNT(*) AS count FROM Users WHERE emailAddress = @email`
            );

        const emailCount = checkEmailResult.recordset[0].count;
        if (emailCount > 0) {
            // Email already exists, handle accordingly (redirect, error message, etc.)
            res.status(400).send('Email already exists');
        } else {
            // Email doesn't exist, proceed with signup
            let result = await pool
                .request()
                .input('first_name', msSQL.NVarChar(20), req.body.first_name)
                .input('last_name', msSQL.NVarChar(25), req.body.last_name)
                .input('email', msSQL.NVarChar(25), req.body.email)
                .input('password', msSQL.NVarChar(25), req.body.password)
                .query(
                    `INSERT INTO Users(firstName,lastName,emailAddress,userType,userPassword) values(@first_name,@last_name,@email,3,@password)`
                );

            res.redirect('/login');
        }
    }).catch(err => {
        // Handle any errors
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    });
});

