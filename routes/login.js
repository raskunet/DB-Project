
let express = require("express");
let router = express.Router();

const loginController = require("../controllers/loginController");

// Route for rendering the login page
router.get('/', loginController.loginRender);

router.post('/authenticateUser', loginController.loginUser);



module.exports = router;