const { msSQL, sqlCon } = require("../db.config");

exports.cartRender = async function (req, res, next) {
    try {
        // Query the database to fetch products
        const userID = req.session.userID;
        const pool = await sqlCon;
        const productsResult = await pool
          .request()
          .input("userID", msSQL.Int, userID)
          .query(
            "select Products.productID,Cart.Quantity,Products.price,Products.productName,Products.imagepath,Cart.userID from Products join Cart on Products.productID=Cart.productID where Cart.userID=@userID"
          );

        // Query the database to fetch categories
        const categoriesResult = await pool.request()
            .input("userID", msSQL.Int, userID)
            .query('SELECT * FROM Cart where userID=@userID');

        // Extract products and categories from the results
        const products = productsResult.recordset;
        const categories = categoriesResult.recordset;

        // Render the shopProduct page and pass products and categories data to the template
        res.render("cart", {
          products,
          categories,
          user:req.session.userID,
          isAdmin: req.session.isAdmin,
        });
    } catch (error) {
        console.error("Error fetching products or categories:", error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
};
exports.insertingValues = async function (req, res, next) {
    try {
        const userID = req.session.userID;
        console.log(userID);
        await sqlCon.then(async pool => {
            let result = await pool
                .request()
                .input('userID',msSQL.Int,userID)
                .input('fullname', msSQL.NVarChar(100), req.body.full_name)
                .input('address', msSQL.NVarChar(50), req.body.add_ress)
                .input('city', msSQL.NVarChar(25), req.body.cit_y)
                .query(
                    `INSERT INTO Orders(orderDate, shippingStatus, paymentStatus, shippingAddress, userID) 
                    VALUES (GETDATE(), 0, 0, @address, @userID)`
                );
        });
        const productsData = req.body.products;

        // Parse the JSON data into an array
        const productsArray = JSON.parse(productsData);

        // Now you can traverse through the products array
        console.log(productsArray);
        productsArray.forEach(async product => {
            await sqlCon.then(async pool => {
                let result = await pool
                  .request()
                  .input("productId", msSQL.Int, product.productID)
                  .input("quantity", msSQL.Int, product.Quantity)
                  .input("userID", msSQL.Int, userID)
                  // Add more input parameters as needed
                  .query(
                    `declare @oid int 
                        set @oid = (select top 1 orderID from Orders order by orderID desc)
                        if(@quantity > 0)
                        INSERT INTO OrderDetails VALUES (@oid,@userID,@productId, @quantity)
                        delete from Cart`
                  );
            });
        });
        res.redirect('/home');
    } catch (err) {
        // Handle any errors
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }
};
