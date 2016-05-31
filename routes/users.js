"use strict";

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var validator = require("../utils/myValidator");
var jwt = require("jsonwebtoken");
var configServer = require("../configs/server");




//==============================================================================
// Middleware to authenticate token
// Called before all api requests
//==============================================================================
router.use(function(req, res, next) {
  var token = req.headers["x-access-token"];
  if(token) {
    jwt.verify(token, configServer.secret, function(err, decoded) {
      if(err) {
        return res.status(400).json(err);
      }
      req.token = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "No token."
    });
  }
});

// GET
router.get("/", function(req, res) {
  res.status(200).json(req.token);
});

module.exports = router;
