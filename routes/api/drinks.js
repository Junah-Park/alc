const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

// Load input validation
const validateEntry = require("../../validation/drink");

// Load Drink model
const Drink = require("../../models/Drink");


router.post("/entry", (req, res) => {
    // Form validation  
    const { errors, isValid } = validateEntry(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ name: req.body.name }).then(drink => {
      if (drink) {
        return res.status(400).json({ name: "Drink already exists" });
      } else {
        const newDrink = new Drink({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            ingredients: req.body.ingredients,
            image: req.body.image
        });
        
        newDrink
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
      }

      
    });
});


router.post("/", (req, res) => {
    // Form validation  
    const { errors, isValid } = validateEntry(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ name: req.body.name }).then(drink => {
      if (drink) {
        return res.status(400).json({ name: "Drink already exists" });
      } else {
        const newDrink = new Drink({
            id: req.body.id,
            name: req.body.name,
            ingredients: req.body.ingredients,
            image: req.body.image
        });
        
        newDrink
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
      }

      
    });
});

router.get("/", (req, res) => {
    
  
    // Check validation
    // if (!req.index) {
    //   return res.status(400).json(errors);
    // }
  
    Drink.find()
    .limit(10)
    .select('id name ingredients image')
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});
  
module.exports = router;