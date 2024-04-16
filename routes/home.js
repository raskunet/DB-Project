let express = require("express");
let router = express.Router();

// router.get('/', function (req, res, next) {
//     res.redirect('/home');
// })

//  herre /home is /



router.get("/", function (req, res, next) {
    res.render("home");
});

router.get("/signUp", function (req, res, next) {
    res.redirect('/signUp');
});

// router.get("/signUp/*.png", function (req, res, next) {
//     console.log('In images route')
//     res.contentType('image/png');
//     next();
// })



module.exports = router;