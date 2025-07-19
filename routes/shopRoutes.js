const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { isAdmin } = require('../middlewares/auth');

router.post('/add', isAdmin, shopController.addShop);
router.get('/getAll', isAdmin, shopController.getAllShops);
router.patch('/update/:id', isAdmin, shopController.updateShop);
router.delete('/delete/:id', isAdmin, shopController.deleteShop);

module.exports = router;
