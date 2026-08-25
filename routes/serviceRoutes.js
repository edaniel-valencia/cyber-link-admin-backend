const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// El catálogo de servicios es público para que la landing lo lea
router.get('/', serviceController.getServices);
router.post('/', requireAdmin, serviceController.createService);
router.put('/:id', requireAdmin, serviceController.updateService);
router.delete('/:id', requireAdmin, serviceController.deleteService);

module.exports = router;
