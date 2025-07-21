const express = require('express');
const router = express.Router();
const  adminStatsController  = require('../controllers/adminStatsController');
const { authToken, isAdmin } = require('../middlewares/auth');

router.get('/dashboard-stats', authToken ,isAdmin, adminStatsController.getAdminDashboardStats);

module.exports = router;
