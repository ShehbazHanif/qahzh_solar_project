const express = require('express');
const router = express.Router();
const engineerController = require('../controllers/engineerController');
const { isAdmin } = require('../middlewares/auth');
// middleware to check if user is admin

router.post('/add', isAdmin, engineerController.addEngineer);
router.get('/get', isAdmin, engineerController.getAllEngineers);
router.patch('/upadte/:id', isAdmin, engineerController.updateEngineer);
router.delete('/delete/:id', isAdmin, engineerController.deleteEngineer);

module.exports = router;
