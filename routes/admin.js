let express = require("express");
let router = express.Router();

const adminController = require("../controllers/adminController");

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

module.exports = router;
