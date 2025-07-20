const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Changed from ObjectId to String
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      subtotal: Number
    }
  ],
  address: { type: String, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema); 