const express = require('express');
const router = express.Router();
const engineerController = require('../controllers/engineerController');
const { authToken, isAdmin } = require('../middlewares/auth');
// middleware to check if user is admin

router.post('/add', authToken, isAdmin, engineerController.addEngineer);
router.get('/get', authToken, isAdmin, engineerController.getAllEngineers);
router.patch('/upadte/:id', authToken, isAdmin, engineerController.updateEngineer);
router.delete('/delete/:id', authToken, isAdmin, engineerController.deleteEngineer);

module.exports = router;
