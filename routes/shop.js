const express = require("express");
const router = express.Router();
const productController = require("../controllers/shopController");

// Route for rendering the shopProduct page
router.get('/', productController.renderShopProduct);

module.exports = router;
