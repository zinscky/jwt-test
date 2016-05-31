var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var configServer = require("../configs/server");




//======================================
// LOGIN
//======================================
router.post("/", function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, result) {
    if(err) throw err;
    if(result) {
      if(bcrypt.compareSync(req.body.password, result.password)) {
        // Login Success
        var user = {
          username: result.username,
          email: result.email,
          name: result.first_name + " " result.last_name
        };
        var token = jwt.sign(user, configServer.secret);

        res.status(200).json({
          success: true,
          message: "You are successfully logged in.",
          token: token,

        });
      } else { // Password didnt match
         res.status(400).json({
           success: false,
           message: "Password incorrect"
         });
      }
    } else { // User doesn't exist
        res.status(404).json({
          success: false,
          message: "User doesn't exist."
        });
    }
  });
});

module.exports = router;
