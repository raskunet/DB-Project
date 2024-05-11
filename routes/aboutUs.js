let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
    res.render("aboutUs", {
      pageTitle: "About Us",
      user: req.session.userID,
    });
})

module.exports = router;
//lol 123 