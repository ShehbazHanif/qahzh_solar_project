const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const engineerController = require('../controllers/engineerController');
const productController = require('../controllers/productController')

// users get verfied shop
router.get('/getAll',  shopController.getAllShops);

// users get enginer 
router.get('/get', engineerController.getAllEngineers);

//  routes to get products with filters
router.get('/browse-filters-product', productController.browseFiltersProducts);

// routes to get products 
router.get('/browse-products', productController.browseProducts);

module.exports = router;
