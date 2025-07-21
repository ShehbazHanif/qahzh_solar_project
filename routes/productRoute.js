const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { checkUserVerified } = require('../middlewares/checkUserVerified')
const productController = require('../controllers/productController')
//post product and check user is verfied
router.post('/post',  upload.array('images'),checkUserVerified,productController.postProduct);

// verfiry otp and post product
router.post('/verfiry-otp-postProduct', upload.array('images'), productController.verifyOtpAndPostProduct)

//  routes to get products with filters
router.get('/browse-filters-product', productController.browseFiltersProducts);

// routes to get products 
router.get('/browse-products', productController.browseProducts);



module.exports = router;