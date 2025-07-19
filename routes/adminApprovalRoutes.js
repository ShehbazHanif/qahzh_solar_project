const express = require('express');
const router = express.Router();
const adminApprovalController = require('../controllers/AdminApprovalController');
const { isAdmin } = require('../middlewares/auth');

// Admin-only
router.get('/pending', isAdmin, adminApprovalController.getPendingProducts);
router.patch('/update/:id/status', isAdmin, adminApprovalController.updateProductStatus);

module.exports = router;
