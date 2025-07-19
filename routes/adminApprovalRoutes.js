const express = require('express');
const router = express.Router();
const adminApprovalController = require('../controllers/AdminApprovalController');
const { authToken, isAdmin } = require('../middlewares/auth');

// Admin-only
router.get('/pending', authToken, isAdmin, adminApprovalController.getPendingProducts);
router.patch('/update/:id/status', authToken, isAdmin, adminApprovalController.updateProductStatus);

module.exports = router;
