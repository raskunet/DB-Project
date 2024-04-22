let express = require("express");
let router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.adminRender);

router.get("/userManage", adminController.usersManage);

router.get("/products", adminController.getAllProducts);

router.get("/orders", adminController.getAllOrders);

router.get("/user/searchUser", adminController.searchUser);

router.get("/user/insertUser", adminController.insertUser);

module.exports = router;
