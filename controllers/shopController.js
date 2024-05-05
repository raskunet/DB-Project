const { msSQL, sqlCon } = require("../db.config");

exports.renderShopProduct = async function (req, res, next) {
    try {
        // Query the database to fetch products
        const pool = await sqlCon;
        const result = await pool.request().query('SELECT * FROM Products');

        // Extract products from the result
        const products = result.recordset;

        // Render the shopProduct page and pass products data to the template
        res.render('shopProduct', { products });
    } catch (error) {
        console.error("Error fetching products:", error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
};
