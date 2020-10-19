const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    ingredients: { type: Array, required: true },
    productImage: { type: String}
});

module.exports = mongoose.model('Drink', drinkSchema)