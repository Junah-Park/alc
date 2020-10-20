const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

// Load input validation
const validateEntry = require("../../validation/drink");

// Load Drink model
const Drink = require("../../models/Drink");

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
  
    Drink.find()
    .limit(10)
    .sort({$natural:-1})
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
  
router.delete("/", (req, res, next) => {
    Drink.deleteMany({})
    .then(result => {
        res.status(200).json({
            message: "Successful deletion"
        });
    })
    .catch(err => {
        res.status(505).json({
            error: err
        });
    });
});

router.delete('/:drinkId', (req, res, next) => {
    Drink.deleteOne({ id: req.params.drinkId})
     .exec()
     .then( result => {
         res.status(200).json({
             message: "Drink deleted"
         })
     })
     .catch( result => {
         console.log(err);
         res.status(500).json({
             error: err
         });
     });
 });

 router.patch('/:drinkId', (req, res, next) => {

    const searchId = req.params.drinkId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ id: searchId }, { $set: updateOps })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/drinks/' + id                    
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;