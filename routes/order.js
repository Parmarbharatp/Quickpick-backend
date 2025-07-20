const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Save a new order
router.post('/', async (req, res) => {
  const { userId, items, total, address } = req.body;
  if (!address) {
    return res.status(400).json({ message: 'Address is required.' });
  }
  try {
    const order = new Order({ user: userId, items, total, address });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error saving order', error: err.message });
  }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

module.exports = router; 