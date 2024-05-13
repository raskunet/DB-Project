
const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");
const e = require("express");
const { json } = require("body-parser");

exports.authenticateAdmin = asyncHandler(async function (req, res, next) {
  let userID = req.session.userID;
  if (userID !== undefined) {
    sqlCon.then(async pool => {
      let result = await pool.request()
        .input('userID',msSQL.Int,userID)
        .query('SELECT * FROM Users WHERE userID=@userID')
      result = JSON.parse(JSON.stringify(result.recordset));
      if (result[0].userType === 1) {
        next();
      }
      else {
        res.send(
          `
          <h1> Unauthorized Access</h1>
          `
        ).status(403);
      }
    })
  }
  else {
    res.redirect('/login');
  }
})


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
      await pool.request()
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
  let userID = req.params.userID;
  sqlCon.then(async pool => {
    try {
      await pool.request()
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
      await pool.request()
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

exports.productsManage = asyncHandler(async function (req, res, next) {
  res.render('productsManage', {
    pageTitle: 'Admin | Products'
  })
})


exports.searchProducts = asyncHandler(async function (req, res, next) {
  res.render("productSearch", {
    pageTitle:"Admin | Search Products",
  })
})

exports.getProduct = asyncHandler(async function (req, res, next) {
  let productID = req.body.search_products;
  sqlCon.then(async pool => {
    try {
      let result = await pool
        .request()
        .input("productID", msSQL.Int, productID)
        .query("SELECT * From Products WHERE productID=@productID");
      if (result.recordset.length > 0) {
        result = JSON.parse(JSON.stringify(result.recordset));
        console.log(result[0])
        res.render("productSearch", {
          pageTitle: "Admin | Product Search",
          productDat:result[0],
          productFound:true
        })
      }
      else {
        res.render("productSearch", {
          pageTitle: "Admin | Product Search",
          productFound:false,
        })
      }
    } catch (err) {
      console.log(err);
    }
  })
})

exports.getProductDetails = asyncHandler(async function (req, res, next) {
  let productID = req.params.productID;
  sqlCon.then(async pool => {
    try {
      let result = await pool.request()
        .input('productID', msSQL.Int, productID)
        .query('Select P.*,C.categoryName FROM Products P  ' +
          'JOIN Category C on C.categoryID=P.categoryID ' +
          'WHERE P.productID=@productID'
        );
      result = JSON.parse(JSON.stringify(result.recordset));

      let categorysName = await pool.request()
        .query('SELECT * FROM Category C');
      categorysName = JSON.parse(JSON.stringify(categorysName.recordset));
      console.log(result[0])
      res.render("productSearchResult", {
        pageTitle:'Admin | Product Search',
        productData: result[0],
        productFound: true,
        categories:categorysName,
      })
    } catch (err) {
      console.log(err);
    }
  })
})

exports.updateProduct = asyncHandler(async function (req, res, next) {
  let productID = req.params.productID;
  console.log(req.body);
  sqlCon.then(async pool => {
    try {

      let updateResult = await pool.request()
        .input('productID',msSQL.Int,productID)
        .input('productName', msSQL.NVarChar(100), req.body.productName)
        .input('price', msSQL.Decimal(10, 2),req.body.price)
        .input('description', msSQL.NVarChar(255),req.body.description)
        .input('category', msSQL.Int, req.body.category)
        .query(
          "UPDATE Products " +
          "SET productName=@productName, price=@price, description=@description, categoryID=@category " +
          "WHERE productID=@productID"
      )

      let result = await pool
        .request()
        .input("productID", msSQL.Int, productID)
        .query(
          "Select P.*,C.categoryName FROM Products P  " +
            "JOIN Category C on C.categoryID=P.categoryID " +
            "WHERE P.productID=@productID"
        );
      result = JSON.parse(JSON.stringify(result.recordset));

      let categorysName = await pool.request()
        .query('SELECT * FROM Category C');
      categorysName = JSON.parse(JSON.stringify(categorysName.recordset));

      res.render("productSearchResult", {
        pageTitle: 'Admin | Product Search',
        productFound: true,
        productData: result[0],
        categories:categorysName,
        updateProduct:true,
      });
    } catch (err) {
      console.log(err);
      next();
    }
  });
})


exports.deleteProduct = asyncHandler(async function (req, res, next) {
  let productID = req.params.productID;
  sqlCon.then(async pool => {
    await pool.request()
      .input('productID', msSQL.Int, productID)
      .query('DELETE FROM products WHERE productID=@productID');
    res.render("productSearchResult", {
      pageTitle: 'Admin | Product Data',
      productDelete: true,
    })
  })
})


exports.insertProductPage = asyncHandler(async function (req, res, next) {
  sqlCon.then(async pool => {
     let categorysName = await pool.request().query("SELECT * FROM Category C");
    categorysName = JSON.parse(JSON.stringify(categorysName.recordset));
    res.render("productInsert", {
      pageTitle: "Admin | Insert Product",
      categories:categorysName,
    });
  })
  
})


// des 255
// path 100
//
exports.insertProduct = asyncHandler(async function (req, res, next) {
  sqlCon.then(async pool => {
    await pool
      .request()
      .input("productName",
        msSQL.NVarChar(100), req.body.productName)
      .input("price", msSQL.Decimal(10, 2), req.body.price)
      .input("description", msSQL.NVarChar(255), req.body.description)
      .input("category", msSQL.Int, req.body.category)
      .input("imagePath", msSQL.NVarChar(100), req.body.imagePath)
      .query(
        "INSERT INTO Products(productName,price,description,imagePath,categoryID) " +
          "VALUES (@productName,@price,@description,@imagePath,@category) "
      );
   res.render("productInsert", {
     pageTitle: "Admin | Insert Product",
     productInsert:true,
   });
  })
})


exports.ordersManage = asyncHandler(async function (req, res, next) {
  res.render("ordersManage", {
    pageTitle: "Admin | Search Orders",
  })
})

exports.searchOrders = asyncHandler(async function (req, res, next) {
    res.render("ordersSearch", {
      pageTitle: "Admin | Search Orders",
    });  
})

exports.getOrder = asyncHandler(async function (req, res, next) {
  let orderId = req.body.search_orders;
  console.log(req.params);
  sqlCon.then(async pool => {
    let result = await pool
      .request()
      .input("orderID", msSQL.Int, orderId)
      .query(
        "SELECT O.orderID,O.userID,O.orderDate " +
          "FROM Orders O " +
          "WHERE O.orderID=@orderID"
      );
    result = JSON.parse(JSON.stringify(result.recordset));
    console.log(result);
    res.render("ordersSearch", {
      pageTitle: "Admin | Search Order",
      orderDat: result[0],
      orderFound:true,
    })
  })
});

exports.getOrderDetails = asyncHandler(async function (req, res, next) {
  let orderID = req.params.orderID;

  sqlCon.then(async pool => {
    let result = await pool
      .request()
      .input("orderID", msSQL.Int, orderID)
      .query(
        `
          SELECT (U.firstName+' '+U.lastName) AS userName,O.orderID,CONVERT(varchar,O.orderDate,1) as orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus, SUM(P.price*OD.quantityOfProduct) AS totalPrice
          FROM Orders O
          JOIN Users U on U.userID=O.userID
          JOIN OrderDetails OD on  OD.orderID=O.orderID
          JOIN Products P on P.productID=OD.productID
          GROUP BY O.orderID,O.orderDate,O.shippingAddress,O.shippingStatus,O.paymentStatus,O.userID,U.firstName,U.lastName
          HAVING O.orderID=@orderID
        `
      );
    
    result = JSON.parse(JSON.stringify(result.recordset));
    console.log(result[0]);
    res.render("orderSearchResult", {
      pageTitle: 'Admin | Order Search',
      orderData:result[0],
    })
  })
})