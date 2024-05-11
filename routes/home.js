let express = require("express");
const { sqlCon, msSQL } = require("../db.config");
let router = express.Router();//  here /home is /

router.get("/", function (req, res, next) {
    // console.log("req.session.userID in home router : ", req.session.userID);
    res.render("home", {
        pageTitle: "home",
        user: req.user,
    }, function (err, html) {
        if (err) console.log(err);
        req.session.save(function (err) {
            if (err) {
                console.log(err);
            }
            res.send(html);
        })
    })
});

router.get("/signUp", function (req, res, next) {
    res.redirect("/signUp");   
});

router.get("/login", function (req, res, next) {
    res.redirect('/login');
})

router.get("/aboutUs", function (req, res, next) {
    res.redirect('/aboutUs');
})

router.get("/contact", function (req, res, next) {
      res.redirect("/contact");
})

router.get("/admin", function (req, res,next) {
    res.redirect("/admin");
})

router.get("/shop", function (req, res, next) {
  res.redirect("/shop");
});


router.get("/cart", function (req, res, next) {
    res.redirect("/cart");
  });


module.exports = router;