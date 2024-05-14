var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let homeRouter = require('./routes/home');
let signUpRouter = require('./routes/signUp');
let loginRouter = require('./routes/login');
let aboutUsRouter = require('./routes/aboutUs');
let contactRouter = require("./routes/contact");
let adminRouter = require("./routes/admin");
let shopRouter = require("./routes/shop");
let wishRouter = require("./routes/wishlist");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// All routers initialization with corresponding paths/urls
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/contact', contactRouter);
app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.use("/wishlist", wishRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set({
  "Content-Type": "text/html",
});
// express.static.mime.define({
//   'image/png':['png'],
// })

module.exports = app;
