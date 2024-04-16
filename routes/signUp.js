

let express = require('express');
let router = express.Router();


const signUpController = require("../controllers/signupController");

router.get('/', signUpController.signUpRender);

// router.post('/', function (req, res, next) {
//     res.send('Hello from Post');
// })

router.post("/signUpUser", signUpController.signUpUser);
module.exports = router;