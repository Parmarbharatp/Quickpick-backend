const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  cartItems: { type: Object, required: true }
});

module.exports = mongoose.model('Cart', CartSchema); 