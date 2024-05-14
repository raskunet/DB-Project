const { msSQL, sqlCon } = require("../db.config");

exports.renderShopProduct = async function (req, res, next) {
    try {
        // Query the database to fetch products
        const pool = await sqlCon;
        const productsResult = await pool.request().query('SELECT * FROM Products');

        // Query the database to fetch categories
        const categoriesResult = await pool.request().query('SELECT * FROM Category');

        // Extract products and categories from the results
        const products = productsResult.recordset;
        const categories = categoriesResult.recordset;

        // Fetch reviews for each product
        for (const product of products) {
            const reviewsResult = await pool.request()
                .input('productId', msSQL.Int, product.productID)
                .query(`SELECT * FROM Reviews WHERE productID = @productId`);
            product.reviews = reviewsResult.recordset;
        }

        // Render the shopProduct page and pass products and categories data to the template
        res.render('shopProduct', { products, categories, user: req.session.userID, });
    } catch (error) {
        console.error("Error fetching products or categories:", error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
};
exports.addToCart = async function(req, res, next) {
    try {
        const userId = req.session.userID;
        const quantity = 1; // Fixed quantity
        const productId = req.body.productId; // Retrieve productId from request body

        const pool = await sqlCon;
        await pool.request()
            .input('userId', msSQL.Int, userId)
            .input('productId', msSQL.Int, productId)
            .input('quantity', msSQL.Int, quantity)
            .query('INSERT INTO Cart (userID, productID, Quantity) VALUES (@userId, @productId, @quantity)');

        res.status(200).send('Product added to cart successfully.');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.addToWishlist = async function (req, res, next) {
    try {
        const userId = 1; // Fixed user ID
        const productId = req.body.productId; // Retrieve productId from request body

        const pool = await sqlCon;
        await pool.request()
            .input('userId', msSQL.Int, userId)
            .input('productId', msSQL.Int, productId)
            .query('INSERT INTO wishlist (userID, productID) VALUES (@userId, @productId)');

        res.status(200).send('Product added to wishlist successfully.');
    }catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).send('Internal Server Error');
    }
};