let express = require("express");
let router = express.Router();


const loginController = require("../controllers/loginController");

router.get('/', loginController.loginRender);

router.post('/loginUser', loginController.loginUser);



module.exports = router;