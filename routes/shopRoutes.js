const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { authToken, isAdmin } = require('../middlewares/auth');

router.post('/add', authToken, isAdmin, shopController.addShop);
router.get('/getAll', authToken, isAdmin, shopController.getAllShops);
router.patch('/update/:id', authToken, isAdmin, shopController.updateShop);
router.delete('/delete/:id', authToken, isAdmin, shopController.deleteShop);
router.patch('/toggle-status/:id', authToken, isAdmin, shopController.toggleShopStatus);

module.exports = router;
