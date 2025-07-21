const express = require('express');
const router = express.Router();
const engineerController = require('../controllers/engineerController');
const { authToken, isAdmin } = require('../middlewares/auth');
// middleware to check if user is admin

router.post('/add', authToken, isAdmin, engineerController.addEngineer);
router.get('/get', authToken, isAdmin, engineerController.getAllEngineers);
router.patch('/update/:id', authToken, isAdmin, engineerController.updateEngineer);
router.delete('/delete/:id', authToken, isAdmin, engineerController.deleteEngineer);
router.patch('/toggle-status/:id', authToken, isAdmin, engineerController.toggleEngineerStatus);


module.exports = router;
