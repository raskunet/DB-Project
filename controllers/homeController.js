

const asyncHandler = require("express-async-handler");
const sqlCon = require('../db.config');


exports.loginPage = asyncHandler(async (req, res, next) => {
    res.send('Login Page Not Implemented yet');
})