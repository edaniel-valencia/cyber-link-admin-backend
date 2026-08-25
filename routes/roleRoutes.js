const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// Get all roles
router.get('/', requireAdmin, roleController.getRoles);

module.exports = router;
