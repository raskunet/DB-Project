let express = require("express");
let router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.adminRender);

router.get("/userManage", adminController.usersManage);

router.get("/products", adminController.getAllProducts);

router.get("/orders", adminController.getAllOrders);

router.get("/userManage/searchUser", adminController.searchUser);

router.get("/userManage/insertUser", adminController.insertUser);

router.post("/user/getUser", adminController.getUser);

module.exports = router;
