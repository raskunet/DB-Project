var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let homeRouter = require("./routes/home");
let signUpRouter = require("./routes/signUp");
let loginRouter = require("./routes/login");
let aboutUsRouter = require("./routes/aboutUs");
let contactRouter = require("./routes/contact");
let adminRouter = require("./routes/admin");
let shopRouter = require("./routes/shop");
let wishRouter = require("./routes/wishlist");
let cartRouter = require("./routes/cart");
let profileRouter = require("./routes/profile");
let editRouter = require("./routes/edit");


var app = express();
//
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const authFunc = (req, res, next) => {
  console.log("req.session : ", req.session);
  if (req.session.userID!==undefined) {
    req.user = req.session.userID;
    req.session.isLogged = true;
    console.log("Req.user is :", req.user);
  }
  else {
    res.redirect("/login");
  }
  next();
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "testkey",
    name: "LoginSession",
    cookie: {
      // max Age : 1000 * (hrs * 3600 + minutes * 60  + seconds) milliseconds
      maxAge: 1000 * (24 * 3600 + 0 * 60 + 0), // 24 hr for now
      secure: false,
      path: "/",
      sameSite: false,
    },
  })
);

// All routers initialization with corresponding paths/urls
app.all("/", authFunc);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/home", homeRouter);
app.use("/signUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/aboutUs", aboutUsRouter);
app.use("/contact", contactRouter);
app.use("/admin", adminRouter);
app.use("/profile", profileRouter);
app.use("/shop", shopRouter);
app.use("/wishlist", wishRouter);
app.use("/cart", cartRouter);
app.use("/edit", editRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

app.set({
  "Content-Type": "text/html",
});

module.exports = app;
