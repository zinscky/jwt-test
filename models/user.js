"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
  username: {type: String, index: true, unique: true, required: true},
  email: {type: String, index: true, unique: true, required: true},
  first_name: String,
  last_name: String,
  password: {type: String, required: true},
  created_on: Date
});

var User = module.exports = mongoose.model("User", userSchema);

// Save User
module.exports.saveUser = function(newUser, done) {
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  newUser.password = bcrypt.hashSync(newUser.password, salt);

  User.create(newUser, function(err, result) {
    if(err) return done(err, false);
    return done(false, result);
  });
};
