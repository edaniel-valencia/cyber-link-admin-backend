const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// CRUD operations (Protected by Admin role)
router.get('/', requireAdmin, settingController.getSettings);
router.post('/', requireAdmin, settingController.createSetting);
router.put('/:id', requireAdmin, settingController.updateSetting);
router.delete('/:id', requireAdmin, settingController.deleteSetting);

module.exports = router;
