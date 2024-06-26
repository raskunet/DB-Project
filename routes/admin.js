let express = require("express");
let router = express.Router();

const adminController = require("../controllers/adminController");
const { sqlCon } = require("../db.config");
const expressAsyncHandler = require("express-async-handler");

router.get('/*', adminController.authenticateAdmin);

router.get("/", adminController.adminRender);

router.get("/usersManage", adminController.usersManage);

router.get("/productsManage", adminController.productsManage);

// router.get("/ordersManage", adminController.or);

router.get("/usersManage/searchUser", adminController.searchUser);

router.get("/usersManage/insertUser", adminController.insertUserPage);

router.post("/user/getUser", adminController.getUser);

router.get("/user/getUser/:userID", adminController.getUserDetails);

router.post("/product/getProduct", adminController.getProduct);



router.get("/product/getProduct/:productID", adminController.getProductDetails);

router.post("/product/getProduct/:productID/updateProduct", adminController.updateProduct);

router.post("/product/getProduct/:productID/deleteProduct", adminController.deleteProduct);

router.post("/productsManage/insertProduct", adminController.insertProduct);

router.get("/productsManage/insertProduct",adminController.insertProductPage);

router.post("/user/getUser/:userID/updateUser", adminController.updateUser);

router.post("/user/getUser/:userID/deleteUser", adminController.deleteUser);

router.post("/usersManage/insertUser", adminController.insertUser);

router.get("/productsManage/searchProducts", adminController.searchProducts);

router.get("/ordersManage", adminController.ordersManage);

router.post("/orders/getOrder", adminController.getOrder);

router.get("/orders/getOrder/:orderID", adminController.getOrderDetails);

router.get("/ordersManage/searchOrders", adminController.searchOrders);


module.exports = router;
