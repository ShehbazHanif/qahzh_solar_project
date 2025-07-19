const express = require('express');
const router = express.Router();


const multer = require('multer');
const storage = multer.memoryStorage(); // we use memory to send buffer to cloud
const upload = multer({ storage });

const adsController = require('../controllers/adsController');
const { authToken, isAdmin } = require('../middlewares/auth');

// Admin routes
router.post('/postads', authToken, isAdmin, upload.single('image'), adsController.postAds);
router.get('/get/allAds', authToken, isAdmin, adsController.getAllAds);
router.put('/update/:id', authToken, isAdmin, upload.single('image'), adsController.updateAd);
router.delete('/delete/:id', authToken, isAdmin, adsController.deleteAd);

// Public
router.get('/placement/:placement', adsController.getAdsByPlacement);

module.exports = router;
