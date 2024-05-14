const express = require("express");
const router = express.Router();
const productController = require("../controllers/shopController");

// Route for rendering the shopProduct page
router.get('/', productController.renderShopProduct);

// Route for adding a product to the cart
router.post('/addToCart', productController.addToCart);
router.post('/addToWishlist', productController.addToWishlist);

module.exports = router;

