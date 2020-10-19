const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEntry(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";

  // Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }// else if (!Validator.isEmail(data.name)) {
//     errors.name = "Name is invalid";
//   }
  // Ingredients check
   if (data.ingredients.length == 0) {
     errors.ingredients = "Ingredients required";
   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
