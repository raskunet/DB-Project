const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.shopRender = asyncHandler(async function (req, res, next) {
  sqlCon.then(async (pool) => {
    let queryResult = await pool.query("Select * from Products");
    res.render("shopProduct", {
      pageTitle: "Shop | Products",
      user: req.user,
      productList: queryResult.recordset,
    });
  });
})

// exports.productRender = asyncHandler(async function (req, res, next) {
    
// })