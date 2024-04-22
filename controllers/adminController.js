
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