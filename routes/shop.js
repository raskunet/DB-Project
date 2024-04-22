let express = require("express");
let router = express.Router();

const shopController = require('../controllers/shopController');



router.get('/', shopController.shopRender);


// router.get("/product", shopController.productRender);
module.exports = router;