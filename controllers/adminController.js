
const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");

exports.adminRender = asyncHandler(async function (req, res, next) {
    res.render("admin", {
      pageTitle: "Admin",
    });
});

exports.getAllUsers = asyncHandler(async function (req, res, next) {
  res.render("users", {
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

