const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const db = require('./src/db');
const UserController = require('./src/controllers/userController');
const AuthController = require('./src/controllers/authController');
const AdminController = require('./src/controllers/adminController');

const app = express();

// Define the port
const port = 7001;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/users', UserController);
app.use('/auth', AuthController);
app.use('/admin', AdminController);

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

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app;
