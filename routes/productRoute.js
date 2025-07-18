const express= require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkUserVerified = require('../middlewares/checkUserVerified');
router.post('/post', checkUserVerified,productController.sellProduct,);
module.exports = router;