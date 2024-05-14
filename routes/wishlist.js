const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Route for rendering the wishlist page
router.get('/', wishlistController.renderwishlist);

module.exports = router;
