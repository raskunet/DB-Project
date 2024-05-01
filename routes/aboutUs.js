let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
    res.render("aboutUs");
})

module.exports = router;
//lol 123 