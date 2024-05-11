//const asyncHandler = require("express-async-handler");
// const { msSQL, sqlCon } = require("../db.config");


// exports.cartRender = asyncHandler(async function (req, res, next) {

//     res.status(200).render('cart')
// })
const { msSQL, sqlCon } = require("../db.config");

exports.cartRender = async function (req, res, next) {
    try {
        // Query the database to fetch products
        const pool = await sqlCon;
        const productsResult = await pool.request().query('select Products.productID,Cart.Quantity,Products.price,Products.productName,Products.imagepath,Cart.userID from Products join Cart on Products.productID=Cart.productID where Cart.userID= 1');

        // Query the database to fetch categories
        const categoriesResult = await pool.request().query('SELECT * FROM Cart where userID=1');

        // Extract products and categories from the results
        const products = productsResult.recordset;
        const categories = categoriesResult.recordset;

        // Render the shopProduct page and pass products and categories data to the template
        res.render('cart', { products, categories });
    } catch (error) {
        console.error("Error fetching products or categories:", error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
};
exports.insertingValues = async function (req, res, next) {
    try {
        await sqlCon.then(async pool => {
            let result = await pool
                .request()
                .input('fullname', msSQL.NVarChar(20), req.body.full_name)
                .input('address', msSQL.NVarChar(25), req.body.add_ress)
                .input('city', msSQL.NVarChar(25), req.body.cit_y)
                .query(
                    `INSERT INTO Orders(orderDate, shippingStatus, paymentStatus, shippingAddress, userID) 
                    VALUES (GETDATE(), 0, 0, @address, 1)`
                );
        });
        const productsData = req.body.products;

        // Parse the JSON data into an array
        const productsArray = JSON.parse(productsData);

        // Now you can traverse through the products array
        productsArray.forEach(async product => {
            await sqlCon.then(async pool => {
                let result = await pool
                    .request()
                    .input('productId', msSQL.Int, product.productID)
                    .input('quantity', msSQL.Int, product.Quantity)
                    // Add more input parameters as needed
                    .query(
                        `declare @oid int 
                        set @oid = (select top 1 orderID from Orders order by orderID desc)
                        INSERT INTO OrderDetails VALUES (@oid,1,@productId, @quantity)`
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
//exports.use(bodyParser.json());
exports.updateQuantity = async function(req, res,next) {
    // Assuming you have a database connection and a Product model
    // This is just a placeholder, you need to replace it with your actual database code
    // Also, error handling and validation should be added
    try{
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        await sqlCon.then(async pool => {
            let result = await pool
                .request()
                .input('productId', msSQL.Int, productId)
                .input('quantity', msSQL.Int, quantity)
                // Add more input parameters as needed
                .query(
                    `update Cart set Quantity=@quantity where productID=@productId and userID=1 `
                );
        });
        res.redirect('/cart');
    } catch (err) {
        // Handle any errors
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }

    // // Update the quantity in the database
    // // Example code using Mongoose (MongoDB) assuming you have a Product model
    // // Replace it with your actual database code
    // Product.findOneAndUpdate({ _id: productId }, { quantity: quantity }, { new: true }, (err, updatedProduct) => {
    //     if (err) {
    //         console.error('Error updating quantity:', err);
    //         res.status(500).send('Error updating quantity');
    //     } else {
    //         // If the update was successful, send a success response
    //         res.status(200).send('Quantity updated successfully');
    //     }
    // });
};
