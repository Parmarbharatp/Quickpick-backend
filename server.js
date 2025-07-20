require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');


const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const path = require('path');

const app = express();
const PORT = 5000;



// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Adjust origin as needed
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect DB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
//this adding for payment
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentRoutes = require("./routes/payment");
app.use("/", paymentRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
