const express = require('express');
const router = express.Router();
const Engineer = require('../models/engineer');
const shopController = require('../controllers/shopController');
const engineerController = require('../controllers/engineerController');
const productController = require('../controllers/productController');
const GovernorateData = require('../data/governorates.json');

// users get verfied shop
router.get('/getAll', shopController.getAllShops);

// users get enginer 
router.get('/get', engineerController.getAllEngineers);

//  routes to get products with filters
router.get('/browse-filters-product', productController.browseFiltersProducts);

// routes to get products 
router.get('/browse-products', productController.browseProducts);

// route to get governates
const getGovernorate = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            data: GovernorateData,
            message: "fetch governotaeInfo successful"
        })
    } catch (error) {
        console.log(error.message);


    }

}

// filters governorate & cities

const filtersEngineer = async (req, res) => {
    try {
        const { search_keyword = "" } = req.query;

        if (!search_keyword.trim()) {
            return res.status(400).json({
                status: 400,
                data: [],
                message: "Search keyword is required"
            });
        }

        const response = await Engineer.find({
            $or: [
                { governorate: { $regex: search_keyword, $options: "i" } },
                { cities: { $regex: search_keyword, $options: "i" } },
            ]
        });

        if (response.length === 0) {
            return res.status(404).json({
                status: 404,
                data: [],
                message: "No record found"
            });
        }

        return res.status(200).json({
            status: 200,
            data: response,
            message: "Fetch successful"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            data: [],
            message: "Internal server error"
        });
    }
};

// route get Governorate
router.get('/get/governorate-data', getGovernorate);

//route filter Engineer 

router.get('/filters-engineer',filtersEngineer);





module.exports = router;
