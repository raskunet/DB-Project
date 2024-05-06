const { msSQL, sqlCon } = require("../db.config");

exports.renderShopProduct = async function (req, res, next) {
    try {
        // Query the database to fetch products
        const pool = await sqlCon;
        const productsResult = await pool.request().query('SELECT * FROM Products order by price');

        // Query the database to fetch categories
        const categoriesResult = await pool.request().query('SELECT * FROM Category');

        // Extract products and categories from the results
        const products = productsResult.recordset;
        const categories = categoriesResult.recordset;

        // Render the shopProduct page and pass products and categories data to the template
        res.render('shopProduct', { products, categories });
    } catch (error) {
        console.error("Error fetching products or categories:", error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
};
