const mongoose = require('mongoose');


const drinkSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    ingredients: { type: Array, required: true },
    image: { type: String}
});

module.exports = mongoose.model('Drink', drinkSchema)