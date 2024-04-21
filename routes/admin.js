let express = require("express");
let router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.adminRender);

router.get("/users", adminController.getAllUsers);

router.get("/products", adminController.getAllProducts);

router.get("/orders", adminController.getAllOrders);

module.exports = router;
