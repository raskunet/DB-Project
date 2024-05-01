
const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.loginRender = asyncHandler(async function (req, res, next) {
  // Assuming you have a login page template named "login" (e.g., login.pug)
  res.status(200).render('login');
});


// Function to authenticate user credentials
exports.authenticateUser = asyncHandler(async function (req, res, next) {
    const { email, password } = req.body;

    try {
        // Query the database to check if the user exists and credentials match
        const pool = await sqlCon;
        const result = await pool.request()
            .input('email', msSQL.NVarChar(50), email)
            .input('password', msSQL.NVarChar(50), password)
            .query(
                `SELECT * FROM Users WHERE emailAddress = @email AND userPassword = @password`
            );

        // Check if user exists and credentials match
        if (result.recordset.length > 0) {
            // User authentication successful
            res.status(200).send('Login successful');
        } else {
            // User authentication failed
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send('Internal Server Error');
    }
});