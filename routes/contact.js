let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
  res.render("contact", {
    pageTitle: "contact",
    user: req.user,
  }, function (err, html) {
    if (err) {
      console.log("Error render : ", err);
    }
    res.send(html);
  })
  
});

module.exports = router;
