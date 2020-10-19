const express = require("express");
const router = express.Router();

// Load input validation
const validateEntry = require("../../validation/drink");

// Load Drink model
const Drink = require("../../models/Drink");


router.post("/drinks", (req, res) => {
    // Form validation  
    const { errors, isValid } = validateEntry(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ name: "Drink already exists" });
      } else {
        const newDrink = new Drink({
          name: req.body.name,
          ingredients: req.body.email,
          password: req.body.password
        });
      }
    });
  });