var validator = require("validator");

module.exports.validateUser = function(newUser) {
  var errors = [];
  if(!validator.isEmail(newUser.email)) {
    errors.push("This is not a valid Email.");
  }
  if(!validator.isAlphanumeric(newUser.username)) {
    errors.push("Username must contain only letters and numbers");
  }
  if(!validator.isAlpha(newUser.first_name)) {
    errors.push("First name must contain only letters.");
  }
  if(!validator.isAlpha(newUser.last_name)) {
    errors.push("Last name must contain only letters.");
  }
  return errors;
};
