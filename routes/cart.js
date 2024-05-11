let express = require("express");
let router = express.Router();

const cartController = require("../controllers/cartController");

// Route for rendering the cart page
router.get('/', cartController.cartRender);

// Route for handling login form submissions and authenticating user
router.post('/insertingValues', cartController.insertingValues);

router.post('/updateQuantity', cartController.updateQuantity);

module.exports = router;