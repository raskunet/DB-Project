let express = require("express");
let router = express.Router();


const loginController = require("../controllers/loginController");

router.get('/', loginController.loginRender);

router.post('/authenticateUser', loginController.loginUser);



module.exports = router;