const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Save or update cart
router.post('/', async (req, res) => {
  const { userId, cartItems } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.cartItems = cartItems;
      await cart.save();
    } else {
      cart = new Cart({ userId, cartItems });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error saving cart', error: err.message });
  }
});

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.cartItems : {});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
});

module.exports = router; 