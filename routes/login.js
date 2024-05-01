
let express = require("express");
let router = express.Router();

const loginController = require("../controllers/loginController");

// Route for rendering the login page
router.get('/', loginController.loginRender);

// Route for handling login form submissions and authenticating user
router.post('/authenticateUser', loginController.authenticateUser);

module.exports = router;