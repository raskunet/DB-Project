let express = require("express");
let router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.adminRender);

router.get("/userManage", adminController.usersManage);

router.get("/products", adminController.getAllProducts);

router.get("/orders", adminController.getAllOrders);

router.get("/userManage/searchUser", adminController.searchUser);

router.get("/userManage/insertUser", adminController.insertUserPage);

router.post("/user/getUser", adminController.getUser);

router.get("/user/getUser/:userID", adminController.getUserDetails);

router.post("/user/getUser/:userID/updateUser", adminController.updateUser);

router.post("/user/getUser/:userID/deleteUser", adminController.deleteUser);

router.post("/userManage/insertUser", adminController.insertUser);

module.exports = router;
