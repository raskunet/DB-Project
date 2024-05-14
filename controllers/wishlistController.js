const asyncHandler = require("express-async-handler");
const { msSQL, sqlCon } = require("../db.config");



exports.renderwishlist = async function (req, res, next) {
    try {
        // Query the database to fetch products
        const pool = await sqlCon;
        const productsResult = await pool.request().query('select * from Products where productID in (select productID from wishlist where userID=1)');

        // Extract products from the results
        const products = productsResult.recordset;

        // Render the wishlist page and pass products data to the template
        res.render('wishlist', { products });
    } catch (error) {
        console.error("Error fetching products:", error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
};
