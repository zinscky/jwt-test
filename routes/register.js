"use strict";

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var validator = require("../utils/myValidator");




//==============================================================================
// Middleware to fill new user and validate
// Called before POST
//==============================================================================
router.use(function(req, res, next) {
  var newUser = new User();
  newUser.username = req.body.username || "";
  newUser.password = req.body.password || "";
  newUser.first_name = req.body.first_name || "";
  newUser.last_name = req.body.last_name || "";
  newUser.email = req.body.email || "";
  newUser.created_on = new Date();

  var errors = validator.validateUser(newUser);

  if(errors.length > 0) {
    req.validationErrors = errors;
  } else {
    req.newUser = newUser;
  }
  next();
});

//==============================================================================
// Create a new User.
// POST - api/v1/users
//==============================================================================
router.post("/", function(req, res) {
  if(req.validationErrors) {
    return res.status(400).json({
      success: false,
      errors: req.validationErrors
    });
  }
  User.saveUser(req.newUser, function(err, result) {
    if(err) {
      if(err.name === "MongoError" && err.code === 11000) { // User already exists
        res.status(500);
        res.json({
          success: false,
          errors: ["User already exists!"]
        });
      }
      else { // Some internal server error
        res.status(500).json({
          success: false,
          errors: ["Something went wrong!"]
        });
      }
    } else { // User creaeted sucessfully
      res.status(201);
      res.json({
        success: true,
        result: result
      });
    }
  });
});
