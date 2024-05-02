
const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");

exports.adminRender = asyncHandler(async function (req, res, next) {
    res.render("admin", {
      pageTitle: "Admin",
    });
});

exports.usersManage = asyncHandler(async function (req, res, next) {
  res.render("usersManage", {
    pageTitle:'Admin | Users'
  })
})

exports.getAllProducts = asyncHandler(async function (req, res, next) {
  res.render("products", {
    pageTitle:'Admin | Products'
  })
})

exports.getAllOrders = asyncHandler(async function (req, res, next) {
  res.render("orders", {
    pageTitle:'Admin | Orders'
  })
})

exports.insertUser = asyncHandler(async function (req, res, next) {
  res.render("userInsert");
})

exports.searchUser = asyncHandler(async function (req, res, next) {
  res.render("userSearch", {
    pageTitle: 'Admin | Search Users'
  });
})

exports.insertUser = asyncHandler(async function (req, res, next) {
  res.render("userInsert", {
    pageTitle:'Admin | Insert User'
  })
})

exports.getUser = asyncHandler(async function (req, res, next) {
  let userId = req.body.search_users;
  sqlCon.then(async pool => {
    try {
      let result = await pool.request()
        .input('userId', msSQL.Int, userId)
        .query('SELECT * FROM Users WHERE userId=@userID');
      result = JSON.parse(JSON.stringify(result.recordset));
      console.log(result);
      res.render("userSearch", {
        pageTitle: 'Admin | Search User',
        searchList:result
      })
    } catch (err) {
      console.log(err);
    }
  })
});