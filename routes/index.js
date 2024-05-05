var express = require('express');
const { sqlCon, msSQL } = require("../db.config");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/home');
});

module.exports = router;
