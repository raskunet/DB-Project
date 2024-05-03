let express = require("express");
let router = express.Router();

// router.get('/', function (req, res, next) {
//     res.redirect('/home');
// })

//  herre /home is /

router.get('/*', function (req, res, next) {
    
})

router.get("/", function (req, res, next) {
    res.render("home");
});

router.get("/signUp", function (req, res, next) {
    res.redirect('/signUp');
});

router.get("/login", function (req, res, next) {
    res.redirect('/login');
})

router.get("/aboutUs", function (req, res, next) {
    res.redirect('/aboutUs');
})

router.get("/contact", function (req, res, next) {
    res.redirect('/contact')
})

router.get("/admin", function (req, res,next) {
    res.redirect("/admin");
})

router.get("/shop", function (req, res, next) {
  res.redirect("/shop");
});
// router.get("/signUp/*.png", function (req, res, next) {
//     console.log('In images route')
//     res.contentType('image/png');
//     next();
// })



module.exports = router;