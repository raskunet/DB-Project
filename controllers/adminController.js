
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
  sqlCon.then(async pool => {
    try {
      pool.request()
        .input('firstName', msSQL.NVarChar(30), req.body.firstName)
        .input('lastName', msSQL.NVarChar(30), req.body.lastName)
        .input('email', msSQL.NVarChar(40), req.body.email)
        .input('userType', msSQL.Int, req.body.userType)
        .input('password', msSQL.NVarChar(30), req.body.password)
        .query(
          'INSERT INTO Users(firstName,lastName,emailAddress,userType,userPassword) ' +
          'values (@firstName,@lastName,@email,@userType,@password) '
      )
      res.render("userInsert", {
        pageTitle: "Admin | Insert User",
        userInsert:true,
      });
      
    } catch (err) {
      
    }
  })
})

exports.searchUser = asyncHandler(async function (req, res, next) {
  res.render("userSearch", {
    pageTitle: 'Admin | Search Users'
  });
})

exports.insertUserPage = asyncHandler(async function (req, res, next) {
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

exports.getUserDetails = asyncHandler(async function (req, res, next) {
  let userID = req.params.userID;
  sqlCon.then(async pool => {
    try {
      let result = await pool.request()
        .input('userID', msSQL.Int, userID)
        .query('SELECT * FROM Users WHERE userID=@userID');
      result = JSON.parse(JSON.stringify(result.recordset));
      console.log(result);
      res.render("userSearchResult", {
        pageTitle:'Admin | User Data',
        userFound: true,
        userData: result[0],
      })
    } catch (err) {
      console.log(err);
      next();
    }
  })
})

exports.updateUser = asyncHandler(async function (req, res, next) {
  console.log("In update User");
  let userID = req.params.userID;
  sqlCon.then(async pool => {
    try {
      pool.request()
        .input('firstName', msSQL.NVarChar(30), req.body.firstName)
        .input('lastName', msSQL.NVarChar(30), req.body.lastName)
        .input('email', msSQL.NVarChar(40), req.body.email)
        .input('userType', msSQL.Int, req.body.userType)
        .input('password', msSQL.NVarChar(30), req.body.password)
        .input('userID', msSQL.Int, userID)
        .query(
          "Update Users " +
          "SET firstName=@firstName, lastName=@lastName, emailAddress=@email, userType=@userType, userPassword=@password " +
          "WHERE userID=@userID"
        );
      let result = await pool.request()
        .input('userID', msSQL.Int, userID)
        .query('SELECT * FROM Users WHERE userID=@userID');
      result = JSON.parse(JSON.stringify(result.recordset));
      console.log(result);
      res.render("userSearchResult", {
        pageTitle: 'Admin | User Data',
        updateUser:true,
        userFound: true,
        userData: result[0],
      })
    } catch (err) {
      console.log(err);
    }
  })
})

exports.deleteUser = asyncHandler(async function (req, res, next) {
  let userID = req.params.userID;
  sqlCon.then(async pool => {
    try {
      pool.request()
        .input('userID', msSQL.Int, userID)
        .query('Delete FROM Users WHERE userID=@userID');
      
      let result = await pool
        .request()
        .input("userID", msSQL.Int, userID)
        .query("SELECT * FROM Users WHERE userID=@userID");
      result = JSON.parse(JSON.stringify(result.recordset));
      console.log(result);
      res.render("userSearchResult", {
        pageTitle: "Admin | User Data",
        userDelete:true,
        updateUser: false,
        userFound: false,
        userData: result[0],
      });
      
    } catch (err) {
      
    }
  })
})