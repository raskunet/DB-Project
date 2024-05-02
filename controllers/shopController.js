const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");


exports.shopRender = asyncHandler(async function (req, res, next) {
    // res.redirect('/shop/product');
  sqlCon.then(async (pool) => {
    let queryResult = await pool.query("Select * from Products");
    console.log(queryResult.recordset);
    res.render("shopProduct", {
      pageTitle: "Shop | Products",
      productList: queryResult.recordset,
    });
  });
})

// exports.productRender = asyncHandler(async function (req, res, next) {
    
// })