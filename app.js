var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var session = require("express-session");
var path = require("path");
var mongoose = require("mongoose");
var ejs = require("ejs");

// Import Local Modules
var dbConfig = require("./configs/database");
var serverConfig = require("./configs/server");

// Import Routes Modules
var home = require("./routes/home");

// Import API Modules
var users = require("./routes/users");
var auth = require("./routes/auth");

// MongoDB Connection
mongoose.connect(dbConfig.dbUrl);

// App Init
var app = express();

// Morgan Logger
app.use(morgan("dev"));

// View Engine ejs
app.set("view engine", "ejs");

// Static Path
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser and session
app.use(cookieParser());
app.use(session({
  secret: 'some random string',
  resave: false,
  saveUninitialized: true,
}));

// Routers
app.use("/", home);

// API Routers
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
//app.use("api/v1/login", login_api);
//app.use("api/v1/register", register_api);

// Start Listening
app.listen(serverConfig.port, function() {
  console.log("Server at: http://localhost:" + serverConfig.port);
});
