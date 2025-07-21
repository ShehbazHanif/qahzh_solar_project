require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');

const cors = require('cors');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json()); // for parsing application/json

// cors

app.use(cors());

app.use(express.urlencoded());

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Qafzh Solar System API is up and running '
  });
});
// Auth Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));

//product Routes
app.use('/api/v1/product', require('./routes/productRoute'));

//admin auth
app.use('/api/v1/admin-auth', require('./routes/adminAuthRoutes'));

// admin approval Routes
app.use('/api/v1/admin-approval-product', require('./routes/adminApprovalRoutes'));

//engineer Routes
app.use('/api/v1/engineer', require('./routes/engineerRoutes'));

//shop Routes
app.use('/api/v1/shop', require('./routes/shopRoutes'));

// ads Routes
app.use('/api/v1/ads', require('./routes/adsRoutes'));

// admin-stats Routes
app.use('/api/v1/admin-stats',require('./routes/adminStatsRoute'));

// user Routes to get product , shop , engineers
app.use('/api/v1/user',require('./routes/userRoutes'));

// 404 Handling
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found'
  });
});

// Global Error Handling (optional)
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server is live at http://localhost:${PORT}`)
);
