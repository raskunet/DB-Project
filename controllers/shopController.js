const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.shopRender = asyncHandler(async function (req, res, next) {
    res.render("shop", {
        pageTitle:'Shop',
    })
})